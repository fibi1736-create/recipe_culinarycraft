import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Check, 
  Trash2, 
  Plus, 
  Copy, 
  Printer, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Share2,
  FileText,
  Download,
  ExternalLink,
  Users,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ShoppingListItem } from '../types';

export const ShoppingListView: React.FC = () => {
  const { 
    shoppingList, 
    toggleShoppingItem, 
    removeShoppingItem, 
    clearCheckedShoppingItems, 
    clearAllShoppingItems, 
    addCustomShoppingItem,
    importSharedShoppingList,
    setActiveView
  } = useApp();

  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('item');
  const [newItemCategory, setNewItemCategory] = useState<ShoppingListItem['category']>('Produce');
  const [copiedToast, setCopiedToast] = useState(false);
  const [shareLinkToast, setShareLinkToast] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [incomingSharedList, setIncomingSharedList] = useState<ShoppingListItem[] | null>(null);

  // Group items by aisle category
  const categoriesOrder: ShoppingListItem['category'][] = [
    'Produce',
    'Meat & Poultry',
    'Seafood',
    'Dairy & Eggs',
    'Pantry & Grains',
    'Spices & Seasonings',
    'Bakery',
    'Beverages',
    'Other'
  ];

  const groupedItems = categoriesOrder.reduce((acc, cat) => {
    const items = shoppingList.filter(item => item.category === cat);
    if (items.length > 0) {
      acc[cat] = items;
    }
    return acc;
  }, {} as Record<string, ShoppingListItem[]>);

  const totalItems = shoppingList.length;
  const checkedItems = shoppingList.filter(i => i.checked).length;

  // Check URL parameters or hash for shared list on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedDataParam = urlParams.get('sharedList');
      let encodedData = sharedDataParam;

      if (!encodedData && window.location.hash.startsWith('#sharedList=')) {
        encodedData = window.location.hash.replace('#sharedList=', '');
      }

      if (encodedData) {
        const decodedJson = decodeURIComponent(atob(encodedData));
        const parsedItems: ShoppingListItem[] = JSON.parse(decodedJson);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setIncomingSharedList(parsedItems);
        }
      }
    } catch (err) {
      console.warn('Could not parse shared shopping list from URL:', err);
    }
  }, []);

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      addCustomShoppingItem(
        newItemName.trim(),
        newItemQty.trim() || '1',
        newItemUnit.trim() || 'item',
        newItemCategory
      );
      setNewItemName('');
      setNewItemQty('1');
    }
  };

  // Generate plain text formatted list
  const getPlainTextList = () => {
    if (shoppingList.length === 0) return '';
    
    let text = `🛒 CulinaryCraft Shopping Checklist\n`;
    text += `Generated: ${new Date().toLocaleDateString()} | Progress: ${checkedItems}/${totalItems} items completed\n`;
    text += `==========================================\n\n`;
    
    (Object.entries(groupedItems) as [string, ShoppingListItem[]][]).forEach(([category, items]) => {
      text += `📁 ${category.toUpperCase()} (${items.length})\n`;
      items.forEach(item => {
        const checkMark = item.checked ? '[x]' : '[ ]';
        const recipeInfo = item.recipeTitle ? ` (for ${item.recipeTitle})` : '';
        text += `  ${checkMark} ${item.quantity} ${item.unit} ${item.name}${recipeInfo}\n`;
      });
      text += '\n';
    });

    text += `==========================================\n`;
    text += `Shared from CulinaryCraft Recipe Discovery Platform\n`;
    return text;
  };

  const handleCopyFormattedList = () => {
    const text = getPlainTextList();
    if (!text) return;
    
    navigator.clipboard?.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Generate URL for multi-user sync / sharing
  const getShareableURL = () => {
    if (shoppingList.length === 0) return window.location.origin;
    try {
      const minimalItems = shoppingList.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category,
        checked: item.checked,
        recipeTitle: item.recipeTitle
      }));
      const jsonStr = JSON.stringify(minimalItems);
      const encoded = btoa(encodeURIComponent(jsonStr));
      const url = new URL(window.location.href);
      url.searchParams.set('sharedList', encoded);
      return url.toString();
    } catch (e) {
      return window.location.href;
    }
  };

  const handleCopyShareLink = () => {
    const link = getShareableURL();
    navigator.clipboard?.writeText(link);
    setShareLinkToast(true);
    setTimeout(() => setShareLinkToast(false), 3000);
  };

  const handleImportShared = (replace: boolean) => {
    if (incomingSharedList) {
      importSharedShoppingList(incomingSharedList, replace);
      setIncomingSharedList(null);
      // Clean URL params without reloading
      const url = new URL(window.location.href);
      url.searchParams.delete('sharedList');
      window.history.replaceState({}, document.title, url.pathname);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="shopping-list-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Shared List Import Banner */}
      {incomingSharedList && (
        <div className="mb-6 p-5 rounded-3xl bg-amber-500/15 border-2 border-amber-500/40 text-stone-900 shadow-lg animate-in slide-in-from-top-4 duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center shrink-0 shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base font-['Outfit',sans-serif] text-stone-950">
                Shared Grocery List Detected!
              </h3>
              <p className="text-xs text-stone-700">
                Someone shared a shopping list containing <strong className="font-bold">{incomingSharedList.length} items</strong> with you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleImportShared(false)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm transition-all"
            >
              Merge with My List
            </button>
            <button
              type="button"
              onClick={() => handleImportShared(true)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs transition-all"
            >
              Replace Current List
            </button>
            <button
              type="button"
              onClick={() => setIncomingSharedList(null)}
              className="p-2 text-stone-400 hover:text-stone-700"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
            <span>Smart Supermarket Aisle Grouping</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
            Interactive Shopping List
          </h1>
          <p className="text-stone-500 text-sm mt-0.5">
            {totalItems === 0 ? 'Your grocery list is currently empty' : `${checkedItems} of ${totalItems} items completed`}
          </p>
        </div>

        {/* Global List Actions */}
        {totalItems > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Export Plain-Text Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
              title="Export plain-text checklist"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Export Plain Text</span>
            </button>

            {/* Shareable Link Generator Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
              title="Generate shareable URL"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Share Sync Link</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs hidden sm:flex"
              title="Print grocery checklist"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Print</span>
            </button>

            {checkedItems > 0 && (
              <button
                onClick={clearCheckedShoppingItems}
                className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
              >
                Clear Checked ({checkedItems})
              </button>
            )}

            <button
              onClick={clearAllShoppingItems}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs transition-colors"
              title="Clear entire list"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Add Custom Item Card Form */}
      <div className="mt-8 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-amber-500" />
          <span>Add Custom Grocery Item</span>
        </h3>

        <form onSubmit={handleAddCustom} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name (e.g. Organic Basil, Greek Yogurt)..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 text-sm bg-stone-50"
            />
          </div>

          <div className="sm:col-span-2">
            <input
              type="text"
              value={newItemQty}
              onChange={(e) => setNewItemQty(e.target.value)}
              placeholder="Qty (1)"
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 text-sm bg-stone-50 text-center"
            />
          </div>

          <div className="sm:col-span-2">
            <input
              type="text"
              value={newItemUnit}
              onChange={(e) => setNewItemUnit(e.target.value)}
              placeholder="Unit (bunch)"
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 text-sm bg-stone-50 text-center"
            />
          </div>

          <div className="sm:col-span-3 flex gap-2">
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 text-xs bg-stone-50 font-medium"
            >
              {categoriesOrder.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-colors shrink-0 shadow-xs"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Main Shopping List Content */}
      <div className="mt-8 space-y-6">
        {totalItems > 0 ? (
          (Object.entries(groupedItems) as [string, ShoppingListItem[]][]).map(([category, items]) => (
            <div 
              key={category}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                <h3 className="font-bold text-base font-['Outfit',sans-serif] text-stone-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{category}</span>
                </h3>
                <span className="text-xs text-stone-400 font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                      item.checked
                        ? 'bg-stone-50/70 text-stone-400 line-through'
                        : 'bg-stone-50 hover:bg-amber-50/30 text-stone-800'
                    }`}
                  >
                    <div 
                      onClick={() => toggleShoppingItem(item.id)}
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                    >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                        item.checked
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-stone-300 bg-white'
                      }`}>
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <span className="text-sm font-semibold text-stone-900">
                          {item.quantity} {item.unit}
                        </span>{' '}
                        <span className="text-sm font-medium">{item.name}</span>
                        {item.recipeTitle && (
                          <span className="block text-[11px] text-stone-400">
                            From: {item.recipeTitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeShoppingItem(item.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 transition-colors ml-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          /* Empty Shopping List State */
          <div className="bg-white rounded-3xl p-12 border border-stone-200 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              Your shopping list is empty
            </h3>
            <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
              Add ingredients from any recipe with one click or create custom grocery items above.
            </p>
            <button
              onClick={() => setActiveView('recipes')}
              className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-sm shadow-md inline-flex items-center gap-2 transition-all"
            >
              <span>Discover Recipes to Cook</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Export Plain-Text Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in-50">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-stone-900 font-['Outfit',sans-serif]">
                    Export Plain-Text Grocery List
                  </h3>
                  <span className="text-xs text-stone-400">Ready to paste into WhatsApp, Notes, or SMS</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <textarea
              readOnly
              rows={12}
              value={getPlainTextList()}
              className="w-full p-4 rounded-2xl bg-stone-50 border border-stone-200 font-mono text-xs text-stone-800 focus:outline-none leading-relaxed"
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-xs text-stone-500">
                {totalItems} items formatted by supermarket aisle
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyFormattedList}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedToast ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shareable Link Generator Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in-50">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-stone-900 font-['Outfit',sans-serif]">
                    Share & Sync Shopping List
                  </h3>
                  <span className="text-xs text-stone-400">Shareable URL keeping list in sync for multiple shoppers</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Anyone opening this link can view and import your exact current shopping checklist into their browser:
            </p>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={getShareableURL()}
                className="w-full bg-transparent text-xs font-mono text-stone-700 focus:outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{shareLinkToast ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-0.5">Family & Household Sync:</strong>
                <span>Send this link to family members or roommates. When they open it, they can merge the list with 1-click.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

