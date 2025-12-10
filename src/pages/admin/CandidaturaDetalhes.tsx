/**
 * Página de detalhes da candidatura
 */

import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, FileText, Loader2 } from "lucide-react";
import { useCandidatura, useUpdateCandidaturaStatus } from "@/hooks/useCandidaturas";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const CandidaturaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const { data: candidatura, isLoading } = useCandidatura(id || '');
  const updateStatus = useUpdateCandidaturaStatus();
  const [observacoes, setObservacoes] = useState('');
  const [status, setStatus] = useState<'pendente' | 'em_analise' | 'aprovada' | 'rejeitada'>('pendente');

  // Atualizar observações quando candidatura carregar
  useEffect(() => {
    if (candidatura) {
      setObservacoes(candidatura.observacoes || '');
      setStatus(candidatura.status);
    }
  }, [candidatura]);

  const handleUpdateStatus = async () => {
    if (!id) return;

    try {
      await updateStatus.mutateAsync({
        id,
        status: status,
        observacoes: observacoes || undefined,
      });
      toast.success('Status atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar status');
      console.error(error);
    }
  };

  const handleDownload = (url: string | null | undefined, fileName: string) => {
    if (!url) {
      toast.error('Arquivo não disponível');
      return;
    }
    window.open(url, '_blank');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string }> = {
      pendente: { label: 'Pendente', variant: 'outline', color: 'bg-yellow-500' },
      em_analise: { label: 'Em Análise', variant: 'secondary', color: 'bg-blue-500' },
      aprovada: { label: 'Aprovada', variant: 'default', color: 'bg-green-500' },
      rejeitada: { label: 'Rejeitada', variant: 'destructive', color: 'bg-red-500' },
    };

    const config = statusConfig[status] || statusConfig.pendente;
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
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

  if (!candidatura) {
    return (
      <AdminLayout>
        <div className="container-wide py-12">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Candidatura não encontrada</p>
            <Button asChild className="mt-4">
              <Link to="/admin/candidaturas">Voltar para lista</Link>
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container-wide py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/candidaturas">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              {candidatura.primeiro_nome} {candidatura.ultimo_nome}
            </h1>
            <p className="text-muted-foreground">
              Candidatura recebida em {new Date(candidatura.created_at).toLocaleDateString('pt-AO')}
            </p>
          </div>
          {getStatusBadge(candidatura.status)}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Nome Completo</Label>
                    <p className="font-medium">
                      {candidatura.primeiro_nome} {candidatura.ultimo_nome}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Nacionalidade</Label>
                    <p className="font-medium">{candidatura.nacionalidade}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Data de Nascimento</Label>
                    <p className="font-medium">
                      {new Date(candidatura.data_nascimento).toLocaleDateString('pt-AO')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Residência</Label>
                    <p className="font-medium">{candidatura.residencia}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <p className="font-medium">{candidatura.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contacto
                    </Label>
                    <p className="font-medium">{candidatura.contacto}</p>
                  </div>
                  {candidatura.contacto_alternativo && (
                    <div>
                      <Label className="text-muted-foreground">Contacto Alternativo</Label>
                      <p className="font-medium">{candidatura.contacto_alternativo}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Educação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Educação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Área de Educação</Label>
                    <p className="font-medium">{candidatura.area_educacao}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Grau Académico</Label>
                    <p className="font-medium">{candidatura.grau_academico}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-muted-foreground">Instituição</Label>
                    <p className="font-medium">{candidatura.instituicao}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Situação Profissional</Label>
                    <p className="font-medium">{candidatura.situacao_profissional}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Grau de Experiência</Label>
                    <Badge variant="outline">{candidatura.grau_experiencia}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Empresa Actual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Empresa Actual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Área de Actividade</Label>
                    <p className="font-medium">{candidatura.area_atividade}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Nome da Empresa</Label>
                    <p className="font-medium">{candidatura.nome_empresa}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-muted-foreground">Função / Cargo</Label>
                    <p className="font-medium">{candidatura.funcao_cargo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anexos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Anexos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {candidatura.curriculum_vitae_url && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Curriculum Vitae</p>
                      <p className="text-sm text-muted-foreground">Documento enviado</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(
                        candidatura.curriculum_vitae_url,
                        `${candidatura.primeiro_nome}_${candidatura.ultimo_nome}_CV`
                      )}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
                {candidatura.bilhete_identidade_url && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Bilhete de Identidade</p>
                      <p className="text-sm text-muted-foreground">Documento enviado</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(
                        candidatura.bilhete_identidade_url,
                        `${candidatura.primeiro_nome}_${candidatura.ultimo_nome}_BI`
                      )}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
                {candidatura.certificados_url && (
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Certificados</p>
                      <p className="text-sm text-muted-foreground">Documento enviado</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(
                        candidatura.certificados_url,
                        `${candidatura.primeiro_nome}_${candidatura.ultimo_nome}_Certificados`
                      )}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
                {!candidatura.curriculum_vitae_url && !candidatura.bilhete_identidade_url && !candidatura.certificados_url && (
                  <p className="text-muted-foreground text-sm">Nenhum anexo disponível</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Ações */}
          <div className="space-y-6">
            {/* Atualizar Status */}
            <Card>
              <CardHeader>
                <CardTitle>Atualizar Status</CardTitle>
                <CardDescription>
                  Altere o status e adicione observações sobre esta candidatura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="em_analise">Em Análise</SelectItem>
                      <SelectItem value="aprovada">Aprovada</SelectItem>
                      <SelectItem value="rejeitada">Rejeitada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Observações</Label>
                  <Textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Adicione observações sobre esta candidatura..."
                    rows={6}
                  />
                </div>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={updateStatus.isPending}
                  className="w-full"
                >
                  {updateStatus.isPending && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Atualizar Status
                </Button>
              </CardContent>
            </Card>

            {/* Informações Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Criada em: {new Date(candidatura.created_at).toLocaleString('pt-AO')}</span>
                </div>
                {candidatura.updated_at !== candidatura.created_at && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Atualizada em: {new Date(candidatura.updated_at).toLocaleString('pt-AO')}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CandidaturaDetalhes;

