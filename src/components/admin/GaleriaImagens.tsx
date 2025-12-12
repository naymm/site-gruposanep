/**
 * Componente para gerenciar galeria de imagens de uma notícia
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, GripVertical, Image as ImageIcon } from 'lucide-react';
import { uploadNoticiaImage } from '@/lib/supabase/storage';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import type { ImagemGaleria } from '@/types/noticias';

interface GaleriaImagensProps {
  noticiaId?: string;
  imagens: ImagemGaleria[];
  onImagensChange: (imagens: ImagemGaleria[]) => void;
  disabled?: boolean;
}

export function GaleriaImagens({
  noticiaId,
  imagens,
  onImagensChange,
  disabled,
}: GaleriaImagensProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newImagens: ImagemGaleria[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} não é uma imagem válida`);
        continue;
      }

      // Validar tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} é muito grande (máx 5MB)`);
        continue;
      }

      setUploading(true);
      setUploadingIndex(i);

      try {
        const url = await uploadNoticiaImage(file, noticiaId);
        newImagens.push({
          id: `temp-${Date.now()}-${i}`,
          noticia_id: noticiaId || '',
          url,
          ordem: imagens.length + i,
          legenda: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Erro no upload:', error);
        toast.error(`Erro ao fazer upload de ${file.name}`);
      } finally {
        setUploadingIndex(null);
        if (i === files.length - 1) {
          setUploading(false);
        }
      }
    }

    if (newImagens.length > 0) {
      onImagensChange([...imagens, ...newImagens]);
      toast.success(`${newImagens.length} imagem(ns) adicionada(s)!`);
    }

    // Limpar input
    event.target.value = '';
  };

  const handleRemove = (index: number) => {
    const novasImagens = imagens.filter((_, i) => i !== index);
    onImagensChange(novasImagens);
  };

  const handleLegendaChange = (index: number, legenda: string) => {
    const novasImagens = [...imagens];
    novasImagens[index] = { ...novasImagens[index], legenda };
    onImagensChange(novasImagens);
  };

  const handleAddUrl = () => {
    const url = prompt('Cole a URL da imagem:');
    if (url && url.trim()) {
      const novaImagem: ImagemGaleria = {
        id: `temp-${Date.now()}`,
        noticia_id: noticiaId || '',
        url: url.trim(),
        ordem: imagens.length,
        legenda: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      onImagensChange([...imagens, novaImagem]);
      toast.success('Imagem adicionada!');
    }
  };

  return (
    <div className="space-y-4">
      <Label>Galeria de Imagens</Label>
      <p className="text-sm text-muted-foreground">
        Adicione imagens adicionais para a galeria da notícia
      </p>

      {/* Área de Upload */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            disabled={disabled || uploading}
            className="hidden"
            id="galeria-upload"
          />
          <Label
            htmlFor="galeria-upload"
            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Fazer Upload de Imagens</span>
              </>
            )}
          </Label>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddUrl}
          disabled={disabled || uploading}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Adicionar URL
        </Button>
      </div>

      {/* Grid de Imagens */}
      {imagens.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagens.map((imagem, index) => (
            <div
              key={imagem.id}
              className="relative group bg-card rounded-lg border border-border overflow-hidden"
            >
              <div className="aspect-video relative">
                <img
                  src={imagem.url}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(index)}
                    disabled={disabled}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {uploadingIndex === index && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Legenda (opcional)"
                  value={imagem.legenda || ''}
                  onChange={(e) => handleLegendaChange(index, e.target.value)}
                  disabled={disabled}
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {imagens.length === 0 && !uploading && (
        <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nenhuma imagem na galeria</p>
        </div>
      )}
    </div>
  );
}







