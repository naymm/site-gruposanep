import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Newspaper, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNoticias } from "@/hooks/useNoticias";
import { useCategorias } from "@/hooks/useCategorias";
import { useNoticiasDestaque } from "@/hooks/useNoticias";
import type { NoticiaWithRelations } from "@/types/noticias";

const Noticias = () => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  // Buscar categorias
  const { data: categorias, isLoading: loadingCategorias } = useCategorias();

  // Buscar notícias em destaque
  const { data: destaqueData, isLoading: loadingDestaque } = useNoticiasDestaque(1);

  // Buscar categoria selecionada para obter o ID
  const selectedCategory = categorias?.find(c => c.slug === selectedCategorySlug);

  // Buscar todas as notícias
  const { data: noticiasData, isLoading: loadingNoticias } = useNoticias({
    categoria: selectedCategory?.id || undefined,
    limit: 100,
    publicada: true,
  });

  const isLoading = loadingNoticias || loadingCategorias || loadingDestaque;

  const featuredNoticia = destaqueData && destaqueData.length > 0 
    ? destaqueData[0] 
    : noticiasData?.data && noticiasData.data.length > 0
      ? noticiasData.data.find((n: NoticiaWithRelations) => n.destaque) || noticiasData.data[0]
      : null;

  const regularNoticias = noticiasData?.data 
    ? noticiasData.data.filter((n: NoticiaWithRelations) => 
        !n.destaque || (featuredNoticia && n.id !== featuredNoticia.id)
      )
    : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const categories = categorias 
    ? [{ id: null, nome: "Todos", slug: "todos" }, ...categorias]
    : [{ id: null, nome: "Todos", slug: "todos" }];

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategorySlug(slug === "todos" ? null : slug);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Notícias
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Últimas Notícias
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Fique a par das últimas notícias, eventos e conquistas do Grupo SANEP.
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="section-padding bg-background">
          <div className="container-wide text-center py-12">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">A carregar notícias...</p>
          </div>
        </section>
      )}

      {/* Featured Article */}
      {!isLoading && featuredNoticia && (
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={featuredNoticia.imagem_principal}
                  alt={featuredNoticia.titulo}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">
                    Destaque
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
                    {featuredNoticia.categoria?.nome || 'Sem categoria'}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredNoticia.data_publicacao)}
                  </span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  {featuredNoticia.titulo}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredNoticia.resumo}
                </p>
                <Button asChild>
                  <Link to={`/noticias/${featuredNoticia.slug}`}>
                    Ler Mais <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      {!isLoading && (
        <section className="py-6 bg-muted/30 border-y border-border">
          <div className="container-wide">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategorySlug === category.slug || (selectedCategorySlug === null && category.slug === "todos")
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-secondary/10"
                  }`}
                >
                  {category.nome}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      {!isLoading && (
        <section className="section-padding bg-background">
          <div className="container-wide">
            {regularNoticias.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularNoticias.map((article: NoticiaWithRelations) => (
                    <article
                      key={article.id}
                      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={article.imagem_principal}
                          alt={article.titulo}
                          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-secondary/90 text-secondary-foreground text-xs font-medium rounded">
                            {article.categoria?.nome || 'Sem categoria'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.data_publicacao)}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.titulo}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {article.resumo}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto text-primary"
                          asChild
                        >
                          <Link to={`/noticias/${article.slug}`}>
                            Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  Nenhuma notícia encontrada nesta categoria.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="section-padding bg-primary">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
            Mantenha-se Atualizado
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Subscreva a nossa newsletter e receba as últimas notícias diretamente no seu email.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Seu email"
              className="flex-1 px-4 py-2 rounded-lg bg-background text-foreground"
            />
            <Button variant="secondary" size="lg">
              Subscrever
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Noticias;
