/**
 * Formulário reutilizável para criar/editar notícias
 */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategorias } from "@/hooks/useCategorias";
import { useAutores } from "@/hooks/useAutores";
import { ImageUpload } from "./ImageUpload";
import { GaleriaImagens } from "./GaleriaImagens";
import { RichTextEditor } from "./RichTextEditor";
import type { Noticia, CreateNoticiaInput, ImagemGaleria } from "@/types/noticias";

const noticiaSchema = z.object({
  titulo: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
  slug: z.string().min(3, "Slug deve ter pelo menos 3 caracteres"),
  resumo: z.string().min(20, "Resumo deve ter pelo menos 20 caracteres"),
  conteudo: z.string().min(50, "Conteúdo deve ter pelo menos 50 caracteres"),
  imagem_principal: z.string().min(1, "Imagem é obrigatória"),
  destaque: z.boolean().default(false),
  publicada: z.boolean().default(false),
  data_publicacao: z.date(),
  categoria_id: z.string().min(1, "Selecione uma categoria"),
  autor_id: z.string().min(1, "Selecione um autor"),
});

type NoticiaFormValues = z.infer<typeof noticiaSchema>;

interface NoticiaFormProps {
  noticia?: Noticia;
  onSubmit: (data: CreateNoticiaInput, imagensGaleria?: ImagemGaleria[]) => Promise<void>;
  isLoading?: boolean;
}

export function NoticiaForm({ noticia, onSubmit, isLoading }: NoticiaFormProps) {
  const { data: categorias } = useCategorias();
  const { data: autores } = useAutores();
  const [imagensGaleria, setImagensGaleria] = useState<ImagemGaleria[]>(
    noticia?.imagens_galeria || []
  );

  const form = useForm<NoticiaFormValues>({
    resolver: zodResolver(noticiaSchema),
    defaultValues: {
      titulo: noticia?.titulo || "",
      slug: noticia?.slug || "",
      resumo: noticia?.resumo || "",
      conteudo: noticia?.conteudo || "",
      imagem_principal: noticia?.imagem_principal || "",
      destaque: noticia?.destaque || false,
      publicada: noticia?.publicada || false,
      data_publicacao: noticia?.data_publicacao
        ? new Date(noticia.data_publicacao)
        : new Date(),
      categoria_id: noticia?.categoria_id || "",
      autor_id: noticia?.autor_id || "",
    },
  });

  // Gerar slug automaticamente a partir do título
  const titulo = form.watch("titulo");
  useEffect(() => {
    if (!noticia && titulo) {
      const slug = titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("slug", slug);
    }
  }, [titulo, noticia, form]);

  const handleSubmit = async (data: NoticiaFormValues) => {
    await onSubmit(
      {
        ...data,
        data_publicacao: data.data_publicacao.toISOString(),
      },
      imagensGaleria
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título *</FormLabel>
                <FormControl>
                  <Input placeholder="Título da notícia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug *</FormLabel>
                <FormControl>
                  <Input placeholder="slug-da-noticia" {...field} />
                </FormControl>
                <FormDescription>
                  URL amigável (gerado automaticamente)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="resumo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resumo *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Breve resumo da notícia..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="conteudo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conteúdo *</FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                  placeholder="Escreva o conteúdo da notícia..."
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Use a barra de ferramentas para formatar o texto
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imagem_principal"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Faça upload de uma imagem ou cole uma URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo alternativo para URL manual */}
        <FormField
          control={form.control}
          name="imagem_principal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ou cole uma URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://exemplo.com/imagem.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Alternativamente, você pode colar uma URL de imagem
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="categoria_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categorias?.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="autor_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um autor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {autores?.map((autor) => (
                      <SelectItem key={autor.id} value={autor.id}>
                        {autor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="data_publicacao"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Publicação *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Galeria de Imagens */}
        <div className="space-y-4">
          <GaleriaImagens
            noticiaId={noticia?.id}
            imagens={imagensGaleria}
            onImagensChange={setImagensGaleria}
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="destaque"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Destaque</FormLabel>
                  <FormDescription>
                    Exibir esta notícia em destaque
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publicada"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Publicada</FormLabel>
                  <FormDescription>
                    Tornar esta notícia visível publicamente
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {noticia ? "Atualizar" : "Criar"} Notícia
          </Button>
        </div>
      </form>
    </Form>
  );
}

