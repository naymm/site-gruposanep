/**
 * Página para criar nova notícia
 */

import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { NoticiaForm } from "@/components/admin/NoticiaForm";
import { useCreateNoticia } from "@/hooks/useNoticias";
import { toast } from "sonner";
import type { CreateNoticiaInput } from "@/types/noticias";

const NoticiaNova = () => {
  const navigate = useNavigate();
  const createNoticia = useCreateNoticia();

  const handleSubmit = async (data: CreateNoticiaInput) => {
    try {
      await createNoticia.mutateAsync(data);
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

