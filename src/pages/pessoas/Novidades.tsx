import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Newspaper, Calendar, Tag, ArrowRight, Trophy, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Novidades = () => {
  const featuredNews = {
    title: "SANEP reconhecida como Melhor Empregador de Angola 2024",
    excerpt: "O Grupo SANEP foi distinguido pelo terceiro ano consecutivo como o melhor empregador de Angola, reconhecimento das nossas políticas de gestão de pessoas e desenvolvimento de talento.",
    date: "28 Nov 2024",
    category: "Prémios",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  };

  const news = [
    {
      title: "Programa Trainee 2025 Abre Candidaturas",
      excerpt: "As inscrições para o programa trainee mais prestigiado de Angola estão abertas até 31 de janeiro.",
      date: "15 Nov 2024",
      category: "Recrutamento",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "SANEP Celebra 35 Anos com Evento Especial",
      excerpt: "Mais de 5.000 colaboradores participaram das celebrações dos 35 anos do grupo em Luanda.",
      date: "10 Nov 2024",
      category: "Eventos",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Novo Centro de Formação Inaugurado",
      excerpt: "O novo campus de formação em Benguela vai formar 2.000 profissionais por ano.",
      date: "5 Nov 2024",
      category: "Infraestrutura",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Parceria com Universidade Agostinho Neto",
      excerpt: "Acordo vai criar 100 novas bolsas de estudo e estágios para estudantes de engenharia.",
      date: "1 Nov 2024",
      category: "Parcerias",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Dia do Voluntariado SANEP 2024",
      excerpt: "Colaboradores dedicaram mais de 10.000 horas a projetos sociais em todas as províncias.",
      date: "25 Out 2024",
      category: "Responsabilidade Social",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Programa de Saúde Mental Lançado",
      excerpt: "Novo programa oferece apoio psicológico gratuito a todos os colaboradores e familiares.",
      date: "20 Out 2024",
      category: "Bem-Estar",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const categories = [
    "Todos", "Prémios", "Recrutamento", "Eventos", "Parcerias", "Responsabilidade Social", "Bem-Estar"
  ];

  const highlights = [
    {
      icon: Trophy,
      title: "3x Melhor Empregador",
      description: "Reconhecidos como melhor empregador de Angola pelo terceiro ano consecutivo",
    },
    {
      icon: Users,
      title: "+500 Novas Contratações",
      description: "Mais de 500 novos colaboradores juntaram-se à equipa em 2024",
    },
    {
      icon: Heart,
      title: "95% Satisfação",
      description: "Taxa de satisfação dos colaboradores no último inquérito interno",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Pessoas
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Novidades
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Fique a par das últimas notícias, eventos e conquistas da família SANEP.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-8 bg-secondary">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-foreground/20 rounded-xl flex items-center justify-center shrink-0">
                  <highlight.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary-foreground">{highlight.title}</h4>
                  <p className="text-sm text-secondary-foreground/70">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
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
                  {featuredNews.category}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {featuredNews.date}
                </span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                {featuredNews.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {featuredNews.excerpt}
              </p>
              <Button>
                Ler Mais <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 bg-muted/30 border-y border-border">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <article
                key={index}
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
                    {article.date}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                    Ler mais <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar Mais Notícias
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <Newspaper className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Receba as Nossas Novidades
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

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Quer Fazer Parte das Próximas Histórias?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore as nossas oportunidades de carreira e comece a sua jornada no 
            Grupo SANEP.
          </p>
          <Button asChild size="lg">
            <Link to="/pessoas/carreiras">Ver Vagas Abertas</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Novidades;
