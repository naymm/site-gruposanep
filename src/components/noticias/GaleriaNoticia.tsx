/**
 * Componente para exibir galeria de imagens na página de notícia
 */

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ImagemGaleria } from '@/types/noticias';

interface GaleriaNoticiaProps {
  imagens: ImagemGaleria[];
}

export function GaleriaNoticia({ imagens }: GaleriaNoticiaProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!imagens || imagens.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % imagens.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + imagens.length) % imagens.length);
    }
  };

  return (
    <>
      {/* Grid de Imagens */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
            Galeria de Imagens
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagens.map((imagem, index) => (
              <div
                key={imagem.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={imagem.url}
                  alt={imagem.legenda || `Imagem ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {imagem.legenda && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm line-clamp-2">{imagem.legenda}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl max-h-full">
            <img
              src={imagens[selectedIndex].url}
              alt={imagens[selectedIndex].legenda || `Imagem ${selectedIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {imagens[selectedIndex].legenda && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg max-w-2xl">
                <p className="text-center">{imagens[selectedIndex].legenda}</p>
              </div>
            )}

            {/* Botão Fechar */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Botão Anterior */}
            {imagens.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            )}

            {/* Botão Próximo */}
            {imagens.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            )}

            {/* Indicador de posição */}
            {imagens.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {selectedIndex + 1} / {imagens.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}




