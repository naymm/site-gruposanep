import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Factory, Cog, Leaf, Award, Users, Building2, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Industria = () => {
  const stats = [
    { value: "3", label: "Unidades industriais", icon: Factory },
    { value: "+100", label: "Colaboradores", icon: Users },
    { value: "+100M", label: "USD investidos", icon: TrendingUp },
    { value: "+100", label: "Produtos fabricados", icon: Building2 },
  ];

  const services = [
    {
      icon: Factory,
      title: "Agroindústria",
      description: "Transformação de matérias-primas agrícolas em produtos alimentares de qualidade.",
    },
    {
      icon: Cog,
      title: "Manufatura",
      description: "Produção de bens de consumo e materiais de construção para o mercado nacional.",
    },
    {
      icon: Zap,
      title: "Energia",
      description: "Geração de energia renovável para as nossas operações e comunidades vizinhas.",
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Processos industriais eco-eficientes com foco na economia circular.",
    },
  ];

  const products = [
    "Farinha de Milho", "Óleo Vegetal", "Ração Animal", "Açúcar",
    "Materiais de Construção", "Embalagens", "Água Mineral", "Sucos"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Indústria"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Negócios
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Indústria
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Transformamos recursos locais em produtos de qualidade, gerando 
              emprego e valor para Angola.
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
                Industrialização para o Desenvolvimento
              </h2>
              <p className="text-muted-foreground mb-4 texto-justificado">
                A SANEP Indústria é o braço de transformação do Grupo, com cinco 
                unidades industriais modernas localizadas em diferentes regiões 
                de Angola. A nossa estratégia é agregar valor às matérias-primas 
                locais, reduzindo importações e criando empregos qualificados.
              </p>
              <p className="text-muted-foreground mb-4 texto-justificado">
                As nossas fábricas processam produtos agrícolas produzidos pelo 
                próprio Grupo e por agricultores parceiros, criando uma cadeia de 
                valor integrada que beneficia toda a economia.
              </p>
              <p className="text-muted-foreground texto-justificado">
                Investimos continuamente em tecnologia de ponta e formação dos 
                nossos colaboradores, garantindo produtos de qualidade internacional 
                produzidos localmente.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Fábrica"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Produção"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Linha de montagem"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Armazém"
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
              Áreas de Actuação
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Operamos em diversos segmentos industriais, sempre com foco na 
              qualidade e sustentabilidade.
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

      {/* Products */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Nossos Produtos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Produzimos uma ampla gama de produtos essenciais para o mercado angolano.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {products.map((product, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-medium"
              >
                {product}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Units */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Nossas Unidades Industriais
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Cinco complexos industriais estrategicamente localizados para 
              servir todo o território nacional.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {["Luanda", "Benguela", "Huambo", "Malanje", "Cabinda"].map((city, index) => (
              <div key={index} className="bg-primary-foreground/10 rounded-xl p-6 text-center">
                <Factory className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h4 className="text-lg font-bold text-primary-foreground">{city}</h4>
                <p className="text-primary-foreground/70 text-sm">Unidade {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Interessado em Parcerias Industriais?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contacte-nos para explorar oportunidades de colaboração no setor industrial.
          </p>
          <Button asChild size="lg">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Industria;
