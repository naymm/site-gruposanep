import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { useNoticiaBySlug } from "@/hooks/useNoticias";
import { useNoticiasRecentes } from "@/hooks/useNoticias";
import { useIncrementarVisualizacoes } from "@/hooks/useNoticias";
import { Loader2 } from "lucide-react";

const NoticiaSingle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: noticia, isLoading, error } = useNoticiaBySlug(slug || '');
  const { data: recentNoticias } = useNoticiasRecentes(3);
  const incrementViews = useIncrementarVisualizacoes();

  // Incrementar visualizações quando a notícia é carregada
  useEffect(() => {
    if (noticia?.id) {
      incrementViews.mutate(noticia.id);
    }
  }, [noticia?.id]);

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-wide text-center py-12">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">A carregar notícia...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !noticia) {
    return <Navigate to="/noticias" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: noticia.titulo,
        text: noticia.resumo,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const relatedNoticias = recentNoticias?.filter(n => n.slug !== slug) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 bg-primary">
        <div className="container-wide">
          <Button
            variant="ghost"
            className="mb-6 text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link to="/noticias">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar às Notícias
            </Link>
          </Button>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-secondary/20 text-secondary text-sm font-medium rounded-full">
                {noticia.categoria?.nome || 'Sem categoria'}
              </span>
              <span className="text-sm text-primary-foreground/80 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(noticia.data_publicacao)}
              </span>
              <span className="text-sm text-primary-foreground/60">
                Por {noticia.autor?.nome || 'Equipa de Comunicação'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
              {noticia.titulo}
            </h1>
            
            <p className="text-xl text-primary-foreground/80 mb-6">
              {noticia.resumo}
            </p>

            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partilhar
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-background">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <img
              src={noticia.imagem_principal}
              alt={noticia.titulo}
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-muted-foreground prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
                prose-li:text-muted-foreground prose-li:mb-2
                prose-strong:text-foreground prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
            />
          </div>
        </div>
      </section>

      {/* Related News */}
      {relatedNoticias.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
              Notícias Relacionadas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedNoticias.map((related) => (
                <article
                  key={related.id}
                  className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={related.imagem_principal}
                      alt={related.titulo}
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-secondary/90 text-secondary-foreground text-xs font-medium rounded">
                        {related.categoria?.nome || 'Sem categoria'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(related.data_publicacao)}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {related.titulo}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {related.resumo}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto text-primary"
                      asChild
                    >
                      <Link to={`/noticias/${related.slug}`}>
                        Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
            Quer Fazer Parte das Próximas Histórias?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Explore as nossas oportunidades de carreira e comece a sua jornada no 
            Grupo SANEP.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/pessoas/carreiras">Ver Vagas Abertas</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/noticias">Ver Todas as Notícias</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NoticiaSingle;
