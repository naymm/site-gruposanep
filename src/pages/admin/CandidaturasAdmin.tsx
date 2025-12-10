/**
 * Página administrativa para gerenciar candidaturas
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
import { Eye, Trash2, Calendar, Search, Filter, ArrowUpDown, Loader2, Download } from "lucide-react";
import { useCandidaturas, useDeleteCandidatura } from "@/hooks/useCandidaturas";
import { toast } from "sonner";
import type { Candidatura } from "@/lib/supabase/services/candidaturas";

type SortField = 'created_at' | 'primeiro_nome' | 'email' | 'status';
type SortDirection = 'asc' | 'desc';

const CandidaturasAdmin = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candidaturaToDelete, setCandidaturaToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Buscar todas as candidaturas
  const { data: candidaturasData, isLoading } = useCandidaturas({
    limit: 1000,
    orderBy: sortField,
    orderDirection: sortDirection,
  });

  const deleteCandidatura = useDeleteCandidatura();

  // Filtrar e buscar candidaturas
  const filteredCandidaturas = useMemo(() => {
    let filtered = candidaturasData?.data || [];

    // Busca por texto
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (candidatura: Candidatura) =>
          candidatura.primeiro_nome.toLowerCase().includes(search) ||
          candidatura.ultimo_nome.toLowerCase().includes(search) ||
          candidatura.email.toLowerCase().includes(search) ||
          `${candidatura.primeiro_nome} ${candidatura.ultimo_nome}`.toLowerCase().includes(search)
      );
    }

    // Filtro por status
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (candidatura: Candidatura) => candidatura.status === filterStatus
      );
    }

    return filtered;
  }, [candidaturasData?.data, searchTerm, filterStatus]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: Candidatura['status']) => {
    const statusConfig = {
      pendente: { label: 'Pendente', variant: 'outline' as const, color: 'bg-yellow-500' },
      em_analise: { label: 'Em Análise', variant: 'secondary' as const, color: 'bg-blue-500' },
      aprovada: { label: 'Aprovada', variant: 'default' as const, color: 'bg-green-500' },
      rejeitada: { label: 'Rejeitada', variant: 'destructive' as const, color: 'bg-red-500' },
    };

    const config = statusConfig[status] || statusConfig.pendente;
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const handleDelete = async () => {
    if (!candidaturaToDelete) return;

    try {
      await deleteCandidatura.mutateAsync(candidaturaToDelete);
      toast.success('Candidatura deletada com sucesso!');
      setDeleteDialogOpen(false);
      setCandidaturaToDelete(null);
    } catch (error) {
      toast.error('Erro ao deletar candidatura');
      console.error(error);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleDownloadCV = (url: string | null | undefined, nome: string) => {
    if (!url) {
      toast.error('Arquivo não disponível');
      return;
    }
    window.open(url, '_blank');
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
              Gerenciar Candidaturas
            </h1>
            <p className="text-muted-foreground">
              Visualize e gerencie as candidaturas espontâneas recebidas
            </p>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro por Status */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="aprovada">Aprovada</SelectItem>
                <SelectItem value="rejeitada">Rejeitada</SelectItem>
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
                <SelectItem value="created_at-desc">Mais recentes</SelectItem>
                <SelectItem value="created_at-asc">Mais antigas</SelectItem>
                <SelectItem value="primeiro_nome-asc">Nome (A-Z)</SelectItem>
                <SelectItem value="primeiro_nome-desc">Nome (Z-A)</SelectItem>
                <SelectItem value="email-asc">Email (A-Z)</SelectItem>
                <SelectItem value="email-desc">Email (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleSort('primeiro_nome')}
                    >
                      Candidato
                      {sortField === 'primeiro_nome' && (
                        <ArrowUpDown className="w-3 h-3 ml-1" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Experiência</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleSort('status')}
                    >
                      Status
                      {sortField === 'status' && (
                        <ArrowUpDown className="w-3 h-3 ml-1" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleSort('created_at')}
                    >
                      Data
                      {sortField === 'created_at' && (
                        <ArrowUpDown className="w-3 h-3 ml-1" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidaturas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {searchTerm || filterStatus !== "all"
                        ? "Nenhuma candidatura encontrada com os filtros aplicados."
                        : "Nenhuma candidatura encontrada."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCandidaturas.map((candidatura: Candidatura) => (
                    <TableRow key={candidatura.id}>
                      <TableCell className="font-medium">
                        {candidatura.primeiro_nome} {candidatura.ultimo_nome}
                      </TableCell>
                      <TableCell>{candidatura.email}</TableCell>
                      <TableCell>{candidatura.contacto}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{candidatura.area_educacao}</div>
                          <div className="text-muted-foreground text-xs">
                            {candidatura.grau_academico}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {candidatura.grau_experiencia}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(candidatura.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(candidatura.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            title="Ver detalhes"
                          >
                            <Link to={`/admin/candidaturas/${candidatura.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          {candidatura.curriculum_vitae_url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadCV(
                                candidatura.curriculum_vitae_url,
                                `${candidatura.primeiro_nome}_${candidatura.ultimo_nome}_CV`
                              )}
                              title="Download CV"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setCandidaturaToDelete(candidatura.id);
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
        </div>

        {/* Estatísticas */}
        <div className="mt-4 text-sm text-muted-foreground">
          Mostrando {filteredCandidaturas.length} de {candidaturasData?.data.length || 0} candidaturas
        </div>

        {/* Dialog de confirmação de exclusão */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja deletar esta candidatura? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setCandidaturaToDelete(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteCandidatura.isPending}
              >
                {deleteCandidatura.isPending && (
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

export default CandidaturasAdmin;

