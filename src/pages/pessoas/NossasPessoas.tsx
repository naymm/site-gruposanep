import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Users, Heart, Globe, Award, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NossasPessoas = () => {
  const diversityStats = [
    { value: "48%", label: "Mulheres na liderança" },
    { value: "12+", label: "Nacionalidades" },
    { value: "18-65", label: "Faixa etária" },
    { value: "100%", label: "Igualdade salarial" },
  ];

  const successStories = [
    {
      name: "Francisca Ndala",
      role: "Diretora de Operações - Agricultura",
      story: "Começou como técnica agrícola há 15 anos. Hoje lidera a maior operação agrícola do grupo.",
      achievement: "Implementou sistema de irrigação que aumentou a produtividade em 40%",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Manuel Sebastião",
      role: "Gerente Regional - Distribuição",
      story: "Entrou como motorista e subiu a gerente regional através do programa de desenvolvimento interno.",
      achievement: "Expandiu a rede de distribuição no sul de Angola em 60%",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Beatriz Lourenço",
      role: "Head de Tecnologia",
      story: "Trainee que se tornou líder de transformação digital do grupo em apenas 7 anos.",
      achievement: "Liderou projeto de digitalização que gerou economia de 5M USD anuais",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "António Domingos",
      role: "Mestre Cervejeiro - Indústria",
      story: "25 anos dedicados à excelência na produção industrial, formando gerações de profissionais.",
      achievement: "Desenvolveu 5 novos produtos que se tornaram líderes de mercado",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const teams = [
    {
      name: "Equipa Comercial",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Equipa de Produção",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Equipa Administrativa",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Equipa de Campo",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Nossas Pessoas"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Pessoas
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              As Nossas Pessoas
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Mais de 12.000 profissionais apaixonados que fazem do Grupo SANEP 
              uma referência em Angola e no mundo.
            </p>
          </div>
        </div>
      </section>

      {/* Diversity Stats */}
      <section className="py-12 bg-secondary">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {diversityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-secondary-foreground">{stat.value}</p>
                <p className="text-secondary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diversity & Inclusion */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heart className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Diversidade e Inclusão
              </h2>
              <p className="text-muted-foreground mb-4">
                Na SANEP, a diversidade não é apenas uma política — é parte do 
                nosso ADN. Acreditamos que equipas diversas são mais criativas, 
                inovadoras e bem-sucedidas.
              </p>
              <p className="text-muted-foreground mb-4">
                Trabalhamos ativamente para criar um ambiente onde todos se 
                sintam respeitados e valorizados, independentemente de género, 
                idade, origem, religião ou qualquer outra característica.
              </p>
              <p className="text-muted-foreground">
                Os nossos programas de igualdade de oportunidades garantem que 
                o mérito seja o único critério para progressão na carreira.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <Globe className="w-8 h-8 text-secondary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Diversidade Cultural</h4>
                <p className="text-sm text-muted-foreground">
                  Colaboradores de mais de 12 países diferentes
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <Users className="w-8 h-8 text-secondary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Equidade de Género</h4>
                <p className="text-sm text-muted-foreground">
                  48% de mulheres em posições de liderança
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-secondary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Inclusão</h4>
                <p className="text-sm text-muted-foreground">
                  Programas específicos para pessoas com deficiência
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <Award className="w-8 h-8 text-secondary mb-3" />
                <h4 className="font-bold text-foreground mb-2">Reconhecimento</h4>
                <p className="text-sm text-muted-foreground">
                  Premiados como melhor empregador para diversidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Star className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça as pessoas que cresceram connosco e que hoje são referências 
              nas suas áreas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="grid md:grid-cols-3">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="md:col-span-2 p-6">
                    <h3 className="text-lg font-bold text-foreground">{story.name}</h3>
                    <p className="text-secondary font-medium text-sm mb-3">{story.role}</p>
                    <p className="text-muted-foreground text-sm mb-3">{story.story}</p>
                    <div className="bg-secondary/10 rounded-lg p-3">
                      <p className="text-xs text-secondary font-medium">Conquista:</p>
                      <p className="text-sm text-foreground">{story.achievement}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Gallery */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Galeria das Nossas Equipas
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Pessoas dedicadas que trabalham todos os dias para fazer a diferença.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teams.map((team, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl">
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end">
                  <p className="p-4 text-primary-foreground font-bold">{team.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Quer Fazer Parte Desta Equipa?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore as nossas oportunidades e descubra como pode contribuir para 
            o sucesso do Grupo SANEP.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/pessoas/carreiras">Ver Vagas Abertas</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pessoas/trabalhar-na-sanep">Cultura SANEP</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NossasPessoas;
