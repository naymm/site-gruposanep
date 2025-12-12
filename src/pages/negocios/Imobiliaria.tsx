import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Building2, Home, Key, MapPin, TrendingUp, Users, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Imobiliaria = () => {
  const stats = [
    { value: "+50", label: "Propriedades geridas", icon: Building2 },
    { value: "+100", label: "Clientes satisfeitos", icon: Users },
    { value: "+10", label: "Anos de experiência", icon: Award },
    { value: "100%", label: "Taxa de satisfação", icon: CheckCircle },
  ];

  const services = [
    {
      icon: Home,
      title: "Gestão de Propriedades",
      description: "Administração completa de imóveis residenciais e comerciais com foco em excelência e rentabilidade.",
    },
    {
      icon: Key,
      title: "Venda e Arrendamento",
      description: "Intermediação imobiliária profissional para compra, venda e arrendamento de propriedades.",
    },
    {
      icon: Building2,
      title: "Desenvolvimento Imobiliário",
      description: "Desenvolvimento de projetos imobiliários residenciais e comerciais de alto padrão.",
    },
    {
      icon: MapPin,
      title: "Consultoria Imobiliária",
      description: "Avaliações, estudos de viabilidade e consultoria especializada para investimentos imobiliários.",
    },
  ];

  const propertyTypes = [
    "Apartamentos", "Moradias", "Escritórios", "Lojas Comerciais",
    "Hotéis", "Armazéns", "Terrenos", "Complexos Residenciais"
  ];

  const projects = [
    {
      name: "Unidade Hoteleira Luanda",
      location: "Luanda",
      type: "Hotel",
      description: "Primeira unidade hoteleira do Grupo SANEP, concluída em 2019.",
    },
    {
      name: "Complexo Residencial Premium",
      location: "Luanda",
      type: "Residencial",
      description: "Desenvolvimento residencial de alto padrão com múltiplas unidades.",
    },
    {
      name: "Centro Comercial",
      location: "Benguela",
      type: "Comercial",
      description: "Espaço comercial moderno com múltiplas lojas e serviços.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Imobiliária"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Negócios
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Imobiliária
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Desenvolvimento, gestão e intermediação imobiliária de excelência, 
              criando valor e transformando o mercado imobiliário angolano.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link to="/contato">Fale Conosco</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/negocios">Ver Todos os Negócios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-secondary">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-secondary-foreground/70 mx-auto mb-2" />
                <p className="text-3xl font-bold text-secondary-foreground">{stat.value}</p>
                <p className="text-secondary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Excelência em Imobiliária
              </h2>
              <p className="text-muted-foreground mb-4 texto-justificado">
                A SANEP Imobiliária é uma das holdings estratégicas do Grupo SANEP, 
                dedicada ao desenvolvimento, gestão e intermediação imobiliária. Com 
                mais de uma década de experiência, consolidámos a nossa posição como 
                referência no mercado imobiliário angolano.
              </p>
              <p className="text-muted-foreground mb-4 texto-justificado">
                A nossa estratégia combina desenvolvimento de projetos próprios com 
                gestão profissional de propriedades de terceiros, sempre com foco na 
                criação de valor e na satisfação dos nossos clientes e parceiros.
              </p>
              <p className="text-muted-foreground texto-justificado">
                Em 2019, marcámos um marco importante com a conclusão da primeira 
                unidade hoteleira do Grupo em Luanda, demonstrando a nossa capacidade 
                de executar projetos complexos e de alto padrão.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Edifício moderno"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Interior moderno"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Propriedade residencial"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Escritórios"
                className="rounded-xl shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Nossos Serviços
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções completas em imobiliária, desde a gestão até o 
              desenvolvimento de projetos de grande escala.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Tipos de Propriedades
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabalhamos com diversos segmentos do mercado imobiliário para atender 
              todas as necessidades dos nossos clientes.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {propertyTypes.map((type, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Projetos em Destaque
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Desenvolvemos e gerimos projetos imobiliários de referência em Angola.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-primary-foreground/10 rounded-xl p-6">
                <div className="w-full h-48 bg-primary-foreground/20 rounded-lg mb-4 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-secondary" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span className="text-primary-foreground/70 text-sm">{project.location}</span>
                  <span className="text-primary-foreground/50">•</span>
                  <span className="text-primary-foreground/70 text-sm">{project.type}</span>
                </div>
                <h4 className="text-xl font-bold text-primary-foreground mb-2">
                  {project.name}
                </h4>
                <p className="text-primary-foreground/70 text-sm">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <TrendingUp className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Porquê Escolher a SANEP Imobiliária?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Experiência Comprovada</h4>
                    <p className="text-muted-foreground text-sm">
                      Mais de 10 anos de experiência no mercado imobiliário angolano.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Portfólio Diversificado</h4>
                    <p className="text-muted-foreground text-sm">
                      Gestão de mais de 50 propriedades em diferentes segmentos.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Gestão Profissional</h4>
                    <p className="text-muted-foreground text-sm">
                      Equipa especializada com conhecimento profundo do mercado local.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Compromisso com Qualidade</h4>
                    <p className="text-muted-foreground text-sm">
                      Padrões elevados em todos os nossos projetos e serviços.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Equipa SANEP Imobiliária"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-sm">Satisfação do Cliente</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Interessado em Serviços Imobiliários?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contacte-nos para conhecer as nossas soluções imobiliárias e descobrir 
            como podemos ajudar com o seu projeto ou propriedade.
          </p>
          <Button asChild size="lg">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Imobiliaria;







