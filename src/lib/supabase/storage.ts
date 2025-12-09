/**
 * Serviço para upload de imagens no Supabase Storage
 */

import { supabase } from './client';

const BUCKET_NAME = 'noticias';

/**
 * Upload de imagem para o bucket de notícias
 */
export async function uploadNoticiaImage(
  file: File,
  noticiaId?: string
): Promise<string> {
  // Gerar nome único para o arquivo
  const fileExt = file.name.split('.').pop();
  const fileName = noticiaId
    ? `${noticiaId}-${Date.now()}.${fileExt}`
    : `temp-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  // Upload do arquivo
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Erro no upload:', error);
    throw new Error(`Erro ao fazer upload: ${error.message}`);
  }

  // Obter URL pública
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

/**
 * Deletar imagem do storage
 */
export async function deleteNoticiaImage(imageUrl: string): Promise<void> {
  try {
    // Extrair o caminho do arquivo da URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts[pathParts.length - 1];

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Erro ao deletar imagem:', error);
      // Não lançar erro, apenas logar (a imagem pode não existir)
    }
  } catch (error) {
    console.error('Erro ao processar URL da imagem:', error);
  }
}

/**
 * Verificar se o bucket existe, se não, criar
 */
export async function ensureBucketExists(): Promise<void> {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    console.error('Erro ao listar buckets:', listError);
    return;
  }

  const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);

  if (!bucketExists) {
    console.warn(`Bucket "${BUCKET_NAME}" não existe. Crie-o manualmente no Supabase Dashboard.`);
  }
}

