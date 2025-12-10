import { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Upload, X, FileText, File, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createCandidatura } from "@/lib/supabase/services/candidaturas";
import { uploadFile } from "@/lib/supabase/storage";

const Carreiras = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Dados Pessoais
    primeiroNome: "",
    ultimoNome: "",
    nacionalidade: "",
    dataNascimento: "",
    residencia: "",
    contacto: "",
    contactoAlternativo: "",
    email: "",
    // Educação
    areaEducacao: "",
    grauAcademico: "",
    instituicao: "",
    situacaoProfissional: "",
    grauExperiencia: "",
    // Empresa Actual
    areaAtividade: "",
    nomeEmpresa: "",
    funcaoCargo: "",
    // Anexos
    curriculumVitae: null as File | null,
    bilheteIdentidade: null as File | null,
    certificados: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  // Função para formatar tamanho do arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Função para obter ícone do arquivo
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <FileText className="w-5 h-5 text-red-500" />;
    if (["doc", "docx"].includes(ext || "")) return <FileText className="w-5 h-5 text-blue-500" />;
    if (["jpg", "jpeg", "png"].includes(ext || "")) return <FileText className="w-5 h-5 text-green-500" />;
    return <File className="w-5 h-5 text-muted-foreground" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validar variáveis de ambiente do Supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        toast({
          title: "Erro de configuração",
          description: "O serviço não está configurado corretamente. Por favor, entre em contato diretamente.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Upload dos arquivos para o Supabase Storage
      let curriculumVitaeUrl: string | undefined;
      let bilheteIdentidadeUrl: string | undefined;
      let certificadosUrl: string | undefined;

      // Upload do Curriculum Vitae
      if (formData.curriculumVitae) {
        try {
          const curriculumResult = await uploadFile(
            'candidaturas',
            'curriculums',
            formData.curriculumVitae,
            `${formData.email}-cv-${Date.now()}.${formData.curriculumVitae.name.split('.').pop()}`
          );
          curriculumVitaeUrl = curriculumResult.url;
        } catch (error) {
          console.error('Erro ao fazer upload do CV:', error);
          toast({
            title: "Erro ao enviar arquivo",
            description: "Não foi possível fazer upload do Curriculum Vitae. Por favor, tente novamente.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }

      // Upload do Bilhete de Identidade
      if (formData.bilheteIdentidade) {
        try {
          const bilheteResult = await uploadFile(
            'candidaturas',
            'bilhetes',
            formData.bilheteIdentidade,
            `${formData.email}-bi-${Date.now()}.${formData.bilheteIdentidade.name.split('.').pop()}`
          );
          bilheteIdentidadeUrl = bilheteResult.url;
        } catch (error) {
          console.error('Erro ao fazer upload do BI:', error);
          toast({
            title: "Erro ao enviar arquivo",
            description: "Não foi possível fazer upload do Bilhete de Identidade. Por favor, tente novamente.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }

      // Upload dos Certificados (opcional)
      if (formData.certificados) {
        try {
          const certificadosResult = await uploadFile(
            'candidaturas',
            'certificados',
            formData.certificados,
            `${formData.email}-cert-${Date.now()}.${formData.certificados.name.split('.').pop()}`
          );
          certificadosUrl = certificadosResult.url;
        } catch (error) {
          console.error('Erro ao fazer upload dos certificados:', error);
          // Não bloquear o envio se os certificados falharem (são opcionais)
          toast({
            title: "Aviso",
            description: "Não foi possível fazer upload dos certificados, mas a candidatura será enviada.",
            variant: "default",
          });
        }
      }

      // Criar candidatura no Supabase
      await createCandidatura({
        primeiro_nome: formData.primeiroNome,
        ultimo_nome: formData.ultimoNome,
        nacionalidade: formData.nacionalidade,
        data_nascimento: formData.dataNascimento,
        residencia: formData.residencia,
        contacto: formData.contacto,
        contacto_alternativo: formData.contactoAlternativo || undefined,
        email: formData.email,
        area_educacao: formData.areaEducacao,
        grau_academico: formData.grauAcademico,
        instituicao: formData.instituicao,
        situacao_profissional: formData.situacaoProfissional,
        grau_experiencia: formData.grauExperiencia,
        area_atividade: formData.areaAtividade,
        nome_empresa: formData.nomeEmpresa,
        funcao_cargo: formData.funcaoCargo,
        curriculum_vitae_url: curriculumVitaeUrl,
        bilhete_identidade_url: bilheteIdentidadeUrl,
        certificados_url: certificadosUrl,
      });

      toast({
        title: "Candidatura enviada!",
        description: "A sua candidatura espontânea foi enviada com sucesso. Entraremos em contato em breve.",
      });

      // Reset form
      setFormData({
        primeiroNome: "",
        ultimoNome: "",
        nacionalidade: "",
        dataNascimento: "",
        residencia: "",
        contacto: "",
        contactoAlternativo: "",
        email: "",
        areaEducacao: "",
        grauAcademico: "",
        instituicao: "",
        situacaoProfissional: "",
        grauExperiencia: "",
        areaAtividade: "",
        nomeEmpresa: "",
        funcaoCargo: "",
        curriculumVitae: null,
        bilheteIdentidade: null,
        certificados: null,
      });
    } catch (error) {
      console.error('Erro ao enviar candidatura:', error);
      toast({
        title: "Erro ao enviar candidatura",
        description: error instanceof Error 
          ? error.message 
          : "Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Carreiras
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Candidatura Espontânea
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Envie a sua candidatura espontânea. Mantemos uma base de dados de 
              talentos e entramos em contato quando surgir uma oportunidade adequada 
              ao seu perfil.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 md:p-12 shadow-lg">
              {/* Dados Pessoais */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 pb-3 border-b border-border">
                  Dados Pessoais
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primeiroNome">Primeiro Nome *</Label>
                    <Input
                      id="primeiroNome"
                      value={formData.primeiroNome}
                      onChange={(e) => handleInputChange("primeiroNome", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ultimoNome">Último Nome *</Label>
                    <Input
                      id="ultimoNome"
                      value={formData.ultimoNome}
                      onChange={(e) => handleInputChange("ultimoNome", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nacionalidade">Nacionalidade *</Label>
                    <Input
                      id="nacionalidade"
                      value={formData.nacionalidade}
                      onChange={(e) => handleInputChange("nacionalidade", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residencia">Residência/País *</Label>
                    <Input
                      id="residencia"
                      value={formData.residencia}
                      onChange={(e) => handleInputChange("residencia", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contacto">Contacto *</Label>
                    <Input
                      id="contacto"
                      type="tel"
                      value={formData.contacto}
                      onChange={(e) => handleInputChange("contacto", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactoAlternativo">Contacto Alternativo</Label>
                    <Input
                      id="contactoAlternativo"
                      type="tel"
                      value={formData.contactoAlternativo}
                      onChange={(e) => handleInputChange("contactoAlternativo", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Educação */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 pb-3 border-b border-border">
                  Educação
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="areaEducacao">Área de Educação *</Label>
                    <Input
                      id="areaEducacao"
                      value={formData.areaEducacao}
                      onChange={(e) => handleInputChange("areaEducacao", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grauAcademico">Grau Académico *</Label>
                    <Select
                      value={formData.grauAcademico}
                      onValueChange={(value) => handleInputChange("grauAcademico", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grau académico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="licenciatura">Licenciatura</SelectItem>
                        <SelectItem value="mestrado">Mestrado</SelectItem>
                        <SelectItem value="doutoramento">Doutoramento</SelectItem>
                        <SelectItem value="tecnico">Técnico Médio</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instituicao">Instituição *</Label>
                    <Input
                      id="instituicao"
                      value={formData.instituicao}
                      onChange={(e) => handleInputChange("instituicao", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="situacaoProfissional">Situação Profissional Actual *</Label>
                    <Select
                      value={formData.situacaoProfissional}
                      onValueChange={(value) => handleInputChange("situacaoProfissional", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a situação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empregado">Empregado</SelectItem>
                        <SelectItem value="desempregado">Desempregado</SelectItem>
                        <SelectItem value="estudante">Estudante</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="grauExperiencia">Grau de Experiência *</Label>
                    <Select
                      value={formData.grauExperiencia}
                      onValueChange={(value) => handleInputChange("grauExperiencia", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grau de experiência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sem-experiencia">Sem experiência</SelectItem>
                        <SelectItem value="junior">Júnior (0-2 anos)</SelectItem>
                        <SelectItem value="pleno">Pleno (2-5 anos)</SelectItem>
                        <SelectItem value="senior">Sénior (5-10 anos)</SelectItem>
                        <SelectItem value="especialista">Especialista (10+ anos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Empresa Actual */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 pb-3 border-b border-border">
                  Empresa Actual (ou última experiência)
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="areaAtividade">Área de Actividade *</Label>
                    <Input
                      id="areaAtividade"
                      value={formData.areaAtividade}
                      onChange={(e) => handleInputChange("areaAtividade", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                    <Input
                      id="nomeEmpresa"
                      value={formData.nomeEmpresa}
                      onChange={(e) => handleInputChange("nomeEmpresa", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="funcaoCargo">Função / Cargo *</Label>
                    <Input
                      id="funcaoCargo"
                      value={formData.funcaoCargo}
                      onChange={(e) => handleInputChange("funcaoCargo", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Anexos */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 pb-3 border-b border-border">
                  ANEXOS
                </h2>
                <div className="space-y-6">
                  {/* Curriculum Vitae */}
                  <FileUploadField
                    id="curriculumVitae"
                    label="Curriculum Vitae *"
                    accept=".pdf,.doc,.docx"
                    file={formData.curriculumVitae}
                    onFileChange={(file) => handleFileChange("curriculumVitae", file)}
                    required
                    formats="PDF, DOC, DOCX"
                    maxSize={10 * 1024 * 1024} // 10MB
                    getFileIcon={getFileIcon}
                    formatFileSize={formatFileSize}
                  />
                  
                  {/* Bilhete de Identidade */}
                  <FileUploadField
                    id="bilheteIdentidade"
                    label="Bilhete de Identidade *"
                    accept=".pdf,.jpg,.jpeg,.png"
                    file={formData.bilheteIdentidade}
                    onFileChange={(file) => handleFileChange("bilheteIdentidade", file)}
                    required
                    formats="PDF, JPG, PNG"
                    maxSize={5 * 1024 * 1024} // 5MB
                    getFileIcon={getFileIcon}
                    formatFileSize={formatFileSize}
                  />
                  
                  {/* Certificados */}
                  <FileUploadField
                    id="certificados"
                    label="Certificados"
                    accept=".pdf,.jpg,.jpeg,.png"
                    file={formData.certificados}
                    onFileChange={(file) => handleFileChange("certificados", file)}
                    required={false}
                    formats="PDF, JPG, PNG (opcional)"
                    maxSize={5 * 1024 * 1024} // 5MB
                    getFileIcon={getFileIcon}
                    formatFileSize={formatFileSize}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-border">
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="secondary" 
                  className="font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Candidatura
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Componente de Upload de Arquivo Dinâmico
interface FileUploadFieldProps {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  required?: boolean;
  formats: string;
  maxSize: number;
  getFileIcon: (fileName: string) => React.ReactNode;
  formatFileSize: (bytes: number) => string;
}

const FileUploadField = ({
  id,
  label,
  accept,
  file,
  onFileChange,
  required = false,
  formats,
  maxSize,
  getFileIcon,
  formatFileSize,
}: FileUploadFieldProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    setError(null);
    
    // Validar tamanho
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      setError(`O arquivo é muito grande. Tamanho máximo: ${maxSizeMB}MB`);
      toast({
        title: "Arquivo muito grande",
        description: `O arquivo deve ter no máximo ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return false;
    }

    // Validar extensão
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    const acceptedExts = accept
      .split(",")
      .map((ext) => ext.trim().replace(".", "").toLowerCase());
    
    if (!fileExt || !acceptedExts.includes(fileExt)) {
      setError(`Formato não aceite. Formatos aceites: ${formats}`);
      toast({
        title: "Formato inválido",
        description: `Formatos aceites: ${formats}`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) {
      onFileChange(null);
      setError(null);
      return;
    }

    if (validateFile(selectedFile)) {
      onFileChange(selectedFile);
      toast({
        title: "Arquivo selecionado",
        description: `${selectedFile.name} foi adicionado com sucesso`,
      });
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileSelect(selectedFile);
  };

  const handleRemove = () => {
    onFileChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      
      {file ? (
        // Preview do arquivo selecionado
        <div className="relative border border-border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {getFileIcon(file.name)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        // Área de upload
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary hover:bg-muted/30",
            error && "border-destructive"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground mb-1">
            Clique para fazer upload ou arraste o arquivo aqui
          </p>
          <p className="text-xs text-muted-foreground">
            Formatos aceites: {formats}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Tamanho máximo: {formatFileSize(maxSize)}
          </p>
        </div>
      )}

      <Input
        ref={fileInputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        required={required}
      />

      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};

export default Carreiras;
