import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { noticias, getNoticiasByCategory, Noticia } from "@/data/noticias";

const Noticias = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  const categories = [
    "Todos",
    ...Array.from(new Set(noticias.map(n => n.category)))
  ];

  const filteredNoticias = getNoticiasByCategory(selectedCategory);
  const featuredNoticia = noticias.find(n => n.featured) || noticias[0];
  const regularNoticias = filteredNoticias.filter(n => !n.featured || n.id === featuredNoticia.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
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

      {/* Featured Article */}
      {featuredNoticia && (
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={featuredNoticia.image}
                  alt={featuredNoticia.title}
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
                    {featuredNoticia.category}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredNoticia.date)}
                  </span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  {featuredNoticia.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredNoticia.excerpt}
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
      <section className="py-6 bg-muted/30 border-y border-border">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-secondary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          {regularNoticias.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNoticias.map((article) => (
                  <article
                    key={article.id}
                    className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-secondary/90 text-secondary-foreground text-xs font-medium rounded">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.date)}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {article.excerpt}
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

      {/* Newsletter */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <Newspaper className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Receba as Nossas Notícias
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Subscreva a nossa newsletter e fique a par de todas as oportunidades 
              e novidades do Grupo SANEP.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="O seu email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button variant="secondary">
                Subscrever
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Noticias;

