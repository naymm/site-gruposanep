/**
 * Página administrativa para gerenciar notícias
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { useNoticias } from "@/hooks/useNoticias";
import { useDeleteNoticia } from "@/hooks/useNoticias";
import { useCategorias } from "@/hooks/useCategorias";
import { useAutores } from "@/hooks/useAutores";
import { toast } from "sonner";
import type { NoticiaWithRelations } from "@/types/noticias";

const NoticiasAdmin = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noticiaToDelete, setNoticiaToDelete] = useState<string | null>(null);

  // Buscar todas as notícias (incluindo não publicadas)
  const { data: noticiasData, isLoading } = useNoticias({
    limit: 1000,
    publicada: undefined, // Buscar todas
  });

  const { data: categorias } = useCategorias();
  const deleteNoticia = useDeleteNoticia();

  const noticias = noticiasData?.data || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleDelete = async () => {
    if (!noticiaToDelete) return;

    try {
      await deleteNoticia.mutateAsync(noticiaToDelete);
      toast.success('Notícia deletada com sucesso!');
      setDeleteDialogOpen(false);
      setNoticiaToDelete(null);
    } catch (error) {
      toast.error('Erro ao deletar notícia');
      console.error(error);
    }
  };

  const getCategoriaNome = (categoriaId: string) => {
    return categorias?.find((c) => c.id === categoriaId)?.nome || 'N/A';
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-wide py-12">
          <p>Carregando...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-wide py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              Gerenciar Notícias
            </h1>
            <p className="text-muted-foreground">
              Crie, edite e gerencie as notícias do site
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/noticias/nova">
              <Plus className="w-4 h-4 mr-2" />
              Nova Notícia
            </Link>
          </Button>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data Publicação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visualizações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noticias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhuma notícia encontrada. Crie a primeira!
                  </TableCell>
                </TableRow>
              ) : (
                noticias.map((noticia: NoticiaWithRelations) => (
                  <TableRow key={noticia.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {noticia.destaque && (
                          <Badge variant="secondary" className="text-xs">
                            Destaque
                          </Badge>
                        )}
                        <span className="line-clamp-1">{noticia.titulo}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoriaNome(noticia.categoria_id)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(noticia.data_publicacao)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {noticia.publicada ? (
                        <Badge className="bg-green-500">Publicada</Badge>
                      ) : (
                        <Badge variant="outline">Rascunho</Badge>
                      )}
                    </TableCell>
                    <TableCell>{noticia.visualizacoes || 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link to={`/noticias/${noticia.slug}`} target="_blank">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link to={`/admin/noticias/editar/${noticia.id}`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setNoticiaToDelete(noticia.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Dialog de confirmação de exclusão */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja deletar esta notícia? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setNoticiaToDelete(null);
                }}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Deletar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default NoticiasAdmin;

