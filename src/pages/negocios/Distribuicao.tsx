import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Truck, Package, BarChart3, Clock, MapPin, Users, Building, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Distribuicao = () => {
  const stats = [
    { value: "500+", label: "Pontos de venda", icon: MapPin },
    { value: "1.800+", label: "Colaboradores", icon: Users },
    { value: "200+", label: "Veículos na frota", icon: Truck },
    { value: "18", label: "Províncias cobertas", icon: Building },
  ];

  const services = [
    {
      icon: Truck,
      title: "Logística Nacional",
      description: "Rede de distribuição que cobre todas as 18 províncias de Angola com eficiência e pontualidade.",
    },
    {
      icon: Package,
      title: "Armazenagem",
      description: "Centros de distribuição modernos com capacidade para gestão de grandes volumes.",
    },
    {
      icon: BarChart3,
      title: "Gestão de Inventário",
      description: "Sistemas avançados de gestão de stock com rastreabilidade total.",
    },
    {
      icon: Clock,
      title: "Entregas Rápidas",
      description: "Compromisso com prazos de entrega e qualidade no serviço ao cliente.",
    },
  ];

  const categories = [
    "Bens de Consumo", "Alimentos e Bebidas", "Produtos de Higiene", 
    "Eletrodomésticos", "Material de Construção", "Equipamentos Agrícolas"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Distribuição"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Negócios
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Distribuição
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              A maior rede de distribuição de Angola, ligando produtores a 
              consumidores em todo o território nacional.
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
                Conectando Angola de Norte a Sul
              </h2>
              <p className="text-muted-foreground mb-4">
                A SANEP Distribuição é a espinha dorsal comercial do Grupo, 
                operando a maior rede de distribuição privada de Angola. 
                Com presença em todas as 18 províncias, garantimos que produtos 
                essenciais cheguem a milhões de angolanos.
              </p>
              <p className="text-muted-foreground mb-4">
                A nossa infraestrutura inclui centros de distribuição estrategicamente 
                localizados, uma frota moderna de mais de 200 veículos e sistemas 
                de gestão de última geração que garantem eficiência e rastreabilidade.
              </p>
              <p className="text-muted-foreground">
                Representamos marcas internacionais de renome e trabalhamos em 
                parceria com produtores locais, contribuindo para o fortalecimento 
                da economia angolana.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Armazém"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Logística"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Transporte"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Entrega"
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
              Oferecemos soluções completas de logística e distribuição adaptadas 
              às necessidades de cada cliente.
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

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Categorias de Produtos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Distribuímos uma ampla gama de produtos para atender às diversas 
              necessidades do mercado angolano.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Network Map */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <TrendingUp className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-6">
                Rede de Distribuição Nacional
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                A nossa rede de distribuição cobre todo o território angolano, 
                com centros de distribuição estrategicamente localizados nas 
                principais cidades e capacidade de entrega em zonas rurais.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">5</p>
                  <p className="text-primary-foreground/70 text-sm">Centros de Distribuição</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">18</p>
                  <p className="text-primary-foreground/70 text-sm">Províncias Cobertas</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">48h</p>
                  <p className="text-primary-foreground/70 text-sm">Tempo Médio de Entrega</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">99%</p>
                  <p className="text-primary-foreground/70 text-sm">Taxa de Entrega no Prazo</p>
                </div>
              </div>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-8 text-center">
              <MapPin className="w-16 h-16 text-secondary mx-auto mb-4" />
              <p className="text-primary-foreground/80">
                Mapa interativo da rede de distribuição
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Precisa de Soluções de Distribuição?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contacte-nos para conhecer as nossas soluções de logística e distribuição 
            adaptadas ao seu negócio.
          </p>
          <Button asChild size="lg">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Distribuicao;
