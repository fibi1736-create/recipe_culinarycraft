// Browser-compatible Cloudinary upload utility
// Uses unsigned upload with preset for client-side uploads

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

export interface CloudinaryUploadResult {
  public_id: string;
  url: string;
  secure_url: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  resource_type: string;
  created_at: string;
}

export const uploadImage = async (
  file: File,
  folder: string = 'culinarycraft'
): Promise<CloudinaryUploadResult> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary configuration missing');
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
  }

  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size exceeds 10MB limit');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);
  formData.append('transformation', 'q_auto,f_auto,w_1200,h_1200,c_limit');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return {
      public_id: data.public_id,
      url: data.url,
      secure_url: data.secure_url,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height,
      resource_type: data.resource_type,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export const uploadVideo = async (
  file: File,
  folder: string = 'culinarycraft'
): Promise<CloudinaryUploadResult> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary configuration missing');
  }

  // Validate file type
  const validTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only MP4, MOV, AVI, and WebM are allowed.');
  }

  // Validate file size (50MB max)
  if (file.size > 50 * 1024 * 1024) {
    throw new Error('File size exceeds 50MB limit');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);
  formData.append('transformation', 'q_auto');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return {
      public_id: data.public_id,
      url: data.url,
      secure_url: data.secure_url,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height,
      resource_type: data.resource_type,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    throw error;
  }
};

export const getOptimizedImageUrl = (
  publicId: string,
  width: number = 800,
  height: number = 600,
  quality: string = 'auto'
): string => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,w_${width},h_${height},q_${quality},f_auto/${publicId}`;
};

export const getVideoThumbnail = (publicId: string): string => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/c_fill,w_400,h_300,f_jpg/${publicId}`;
};