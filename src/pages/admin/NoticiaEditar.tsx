/**
 * Página para editar notícia existente
 */

import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { NoticiaForm } from "@/components/admin/NoticiaForm";
import { useNoticiaBySlug, useUpdateNoticia } from "@/hooks/useNoticias";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { UpdateNoticiaInput } from "@/types/noticias";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const NoticiaEditar = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const updateNoticia = useUpdateNoticia();

  // Buscar notícia por ID (não por slug)
  const { data: noticia, isLoading } = useQuery({
    queryKey: ['noticia-admin', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleSubmit = async (data: UpdateNoticiaInput) => {
    if (!id) return;

    try {
      await updateNoticia.mutateAsync({
        id,
        ...data,
      });
      toast.success("Notícia atualizada com sucesso!");
      navigate("/admin/noticias");
    } catch (error) {
      toast.error("Erro ao atualizar notícia");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-wide py-12">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!noticia) {
    return (
      <Layout>
        <div className="container-wide py-12">
          <p>Notícia não encontrada</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-wide py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Editar Notícia
          </h1>
          <p className="text-muted-foreground">
            Atualize os campos abaixo para editar a notícia
          </p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <NoticiaForm
            noticia={noticia}
            onSubmit={handleSubmit}
            isLoading={updateNoticia.isPending}
          />
        </div>
      </div>
    </Layout>
  );
};

export default NoticiaEditar;

