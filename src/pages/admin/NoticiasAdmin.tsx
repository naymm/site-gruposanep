/**
 * Página administrativa para gerenciar notícias
 * Com busca, filtros e ordenação
 */

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Calendar, Search, Filter, ArrowUpDown } from "lucide-react";
import { useNoticias } from "@/hooks/useNoticias";
import { useDeleteNoticia } from "@/hooks/useNoticias";
import { useCategorias } from "@/hooks/useCategorias";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { NoticiaWithRelations } from "@/types/noticias";

type SortField = 'data_publicacao' | 'created_at' | 'visualizacoes';
type SortDirection = 'asc' | 'desc';

const NoticiasAdmin = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noticiaToDelete, setNoticiaToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("data_publicacao");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Buscar todas as notícias (incluindo não publicadas)
  const { data: noticiasData, isLoading } = useNoticias({
    limit: 1000,
    publicada: undefined, // Buscar todas
    orderBy: sortField,
    orderDirection: sortDirection,
  });

  const { data: categorias } = useCategorias();
  const deleteNoticia = useDeleteNoticia();

  // Filtrar e buscar notícias
  const filteredNoticias = useMemo(() => {
    let filtered = noticiasData?.data || [];

    // Busca por texto
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (noticia: NoticiaWithRelations) =>
          noticia.titulo.toLowerCase().includes(search) ||
          noticia.resumo.toLowerCase().includes(search) ||
          noticia.slug.toLowerCase().includes(search)
      );
    }

    // Filtro por categoria
    if (filterCategoria !== "all") {
      filtered = filtered.filter(
        (noticia: NoticiaWithRelations) => noticia.categoria_id === filterCategoria
      );
    }

    // Filtro por status
    if (filterStatus !== "all") {
      const isPublished = filterStatus === "published";
      filtered = filtered.filter(
        (noticia: NoticiaWithRelations) => noticia.publicada === isPublished
      );
    }

    return filtered;
  }, [noticiasData?.data, searchTerm, filterCategoria, filterStatus]);

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container-wide py-12">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
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

        {/* Filtros e Busca */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro por Categoria */}
            <Select value={filterCategoria} onValueChange={setFilterCategoria}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categorias?.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro por Status */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="published">Publicadas</SelectItem>
                <SelectItem value="draft">Rascunhos</SelectItem>
              </SelectContent>
            </Select>

            {/* Ordenação */}
            <Select
              value={`${sortField}-${sortDirection}`}
              onValueChange={(value) => {
                const [field, direction] = value.split('-') as [SortField, SortDirection];
                setSortField(field);
                setSortDirection(direction);
              }}
            >
              <SelectTrigger>
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data_publicacao-desc">Data (Mais recente)</SelectItem>
                <SelectItem value="data_publicacao-asc">Data (Mais antiga)</SelectItem>
                <SelectItem value="visualizacoes-desc">Mais visualizadas</SelectItem>
                <SelectItem value="visualizacoes-asc">Menos visualizadas</SelectItem>
                <SelectItem value="created_at-desc">Criadas recentemente</SelectItem>
                <SelectItem value="created_at-asc">Criadas primeiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort('data_publicacao')}
                  >
                    Título
                  </Button>
                </TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort('data_publicacao')}
                  >
                    Data Publicação
                    {sortField === 'data_publicacao' && (
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSort('visualizacoes')}
                  >
                    Visualizações
                    {sortField === 'visualizacoes' && (
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNoticias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchTerm || filterCategoria !== "all" || filterStatus !== "all"
                      ? "Nenhuma notícia encontrada com os filtros aplicados."
                      : "Nenhuma notícia encontrada. Crie a primeira!"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredNoticias.map((noticia: NoticiaWithRelations) => (
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
                          title="Visualizar"
                        >
                          <Link to={`/noticias/${noticia.slug}`} target="_blank">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          title="Editar"
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
                          title="Deletar"
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

        {/* Estatísticas */}
        <div className="mt-4 text-sm text-muted-foreground">
          Mostrando {filteredNoticias.length} de {noticiasData?.data.length || 0} notícias
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
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteNoticia.isPending}
              >
                {deleteNoticia.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Deletar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default NoticiasAdmin;
