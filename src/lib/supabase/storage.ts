/**
 * Service para gerenciar uploads de arquivos no Supabase Storage
 */

import { supabase } from './client';

export interface UploadFileResult {
  url: string;
  path: string;
}

/**
 * Upload de arquivo para o Supabase Storage
 */
export async function uploadFile(
  bucket: string,
  folder: string,
  file: File,
  fileName?: string
): Promise<UploadFileResult> {
  // Gerar nome único para o arquivo
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = file.name.split('.').pop();
  const finalFileName = fileName || `${timestamp}-${randomString}.${fileExtension}`;
  const filePath = `${folder}/${finalFileName}`;

  // Upload do arquivo
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false, // Não sobrescrever arquivos existentes
    });

  if (error) {
    console.error('Erro ao fazer upload:', error);
    throw new Error(`Erro ao fazer upload: ${error.message}`);
  }

  // Obter URL pública do arquivo
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    url: urlData?.publicUrl || '',
    path: filePath,
  };
}

/**
 * Deletar arquivo do Storage
 */
export async function deleteFile(
  bucket: string,
  filePath: string
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    console.error('Erro ao deletar arquivo:', error);
    throw new Error(`Erro ao deletar arquivo: ${error.message}`);
  }
}

/**
 * Upload de múltiplos arquivos
 */
export async function uploadMultipleFiles(
  bucket: string,
  folder: string,
  files: File[]
): Promise<UploadFileResult[]> {
  const uploadPromises = files.map((file) => uploadFile(bucket, folder, file));
  return Promise.all(uploadPromises);
}

/**
 * Upload de imagem de notícia (função específica para compatibilidade)
 */
export async function uploadNoticiaImage(file: File): Promise<string> {
  const result = await uploadFile(
    'noticias',
    'imagens',
    file,
    `noticia-${Date.now()}.${file.name.split('.').pop()}`
  );
  return result.url;
}
