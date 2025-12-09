/**
 * Página para criar nova notícia
 */

import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { NoticiaForm } from "@/components/admin/NoticiaForm";
import { useCreateNoticia } from "@/hooks/useNoticias";
import { adicionarImagens } from "@/lib/supabase/services/galeria";
import { toast } from "sonner";
import type { CreateNoticiaInput, ImagemGaleria } from "@/types/noticias";

const NoticiaNova = () => {
  const navigate = useNavigate();
  const createNoticia = useCreateNoticia();

  const handleSubmit = async (data: CreateNoticiaInput, imagensGaleria?: ImagemGaleria[]) => {
    try {
      const noticia = await createNoticia.mutateAsync(data);
      
      // Adicionar imagens da galeria se houver
      if (imagensGaleria && imagensGaleria.length > 0) {
        try {
          await adicionarImagens(
            noticia.id,
            imagensGaleria.map(img => ({
              url: img.url,
              legenda: img.legenda,
              ordem: img.ordem,
            }))
          );
        } catch (error) {
          console.error('Erro ao adicionar imagens da galeria:', error);
          toast.warning('Notícia criada, mas houve erro ao adicionar algumas imagens');
        }
      }
      
      toast.success("Notícia criada com sucesso!");
      navigate("/admin/noticias");
    } catch (error) {
      toast.error("Erro ao criar notícia");
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="container-wide py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Nova Notícia
          </h1>
          <p className="text-muted-foreground">
            Preencha os campos abaixo para criar uma nova notícia
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <NoticiaForm
            onSubmit={handleSubmit}
            isLoading={createNoticia.isPending}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default NoticiaNova;

