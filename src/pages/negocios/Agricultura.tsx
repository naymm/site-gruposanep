import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Wheat, Droplets, Tractor, Leaf, TrendingUp, Users, MapPin, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Agricultura = () => {
  const stats = [
    { value: "+50.000", label: "Hectares cultivados", icon: MapPin },
    { value: "+100", label: "Colaboradores", icon: Users },
    { value: "+10", label: "Culturas diferentes", icon: Wheat },
    { value: "30%", label: "Crescimento anual", icon: TrendingUp },
  ];

  const services = [
    {
      icon: Wheat,
      title: "Produção Agrícola",
      description: "Cultivo de cereais, oleaginosas e hortícolas com técnicas modernas de agricultura sustentável.",
    },
    {
      icon: Droplets,
      title: "Irrigação Avançada",
      description: "Sistemas de irrigação por gotejamento e pivots centrais para máxima eficiência hídrica.",
    },
    {
      icon: Tractor,
      title: "Mecanização",
      description: "Frota moderna de equipamentos agrícolas com tecnologia de precisão e GPS integrado.",
    },
    {
      icon: Leaf,
      title: "Agricultura Sustentável",
      description: "Práticas regenerativas que preservam o solo e promovem a biodiversidade.",
    },
  ];

  const products = [
    "Milho", "Soja", "Trigo", "Arroz", "Feijão", "Girassol", 
    "Batata", "Cebola", "Tomate", "Cenoura", "Banana", "Citrinos"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Agricultura"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Negócios
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Agricultura
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 texto-justificado">
              Lideramos a produção agrícola em Angola com práticas sustentáveis, 
              tecnologia de ponta e compromisso com a segurança alimentar.
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
                Alimentando o Futuro de Angola
              </h2>
              <p className="text-muted-foreground mb-4 texto-justificado">
                A divisão agrícola do Grupo SANEP é uma das maiores operações 
                agrícolas privadas de Angola. Com mais de 50.000 hectares de terras 
                cultivadas, produzimos uma vasta gama de produtos que abastecem 
                o mercado nacional e regional.
              </p>
              <p className="text-muted-foreground mb-4 texto-justificado">
                Investimos continuamente em tecnologia e formação, garantindo que 
                as nossas operações sejam eficientes, sustentáveis e responsáveis. 
                O nosso compromisso com a qualidade é reconhecido através de 
                certificações internacionais.
              </p>
              <p className="text-muted-foreground texto-justificado">
                Trabalhamos também em parceria com agricultores locais, fornecendo 
                assistência técnica, sementes de qualidade e acesso a mercados, 
                contribuindo para o desenvolvimento das comunidades rurais.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Campos agrícolas"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Colheita"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Irrigação"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Maquinaria agrícola"
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
              Nossas Capacidades
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combinamos conhecimento tradicional com inovação tecnológica para 
              alcançar os melhores resultados.
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
              Produzimos uma diversidade de culturas de alta qualidade para o 
              mercado nacional e exportação.
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

      {/* Certifications */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Certificações e Qualidade
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              As nossas operações são certificadas pelos mais rigorosos padrões 
              internacionais de qualidade e sustentabilidade.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary-foreground/10 rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold text-primary-foreground mb-2">
                GlobalGAP
              </h4>
              <p className="text-primary-foreground/70 text-sm">
                Boas práticas agrícolas globais
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold text-primary-foreground mb-2">
                ISO 14001
              </h4>
              <p className="text-primary-foreground/70 text-sm">
                Gestão ambiental certificada
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-6 text-center">
              <h4 className="text-lg font-bold text-primary-foreground mb-2">
                Rainforest Alliance
              </h4>
              <p className="text-primary-foreground/70 text-sm">
                Agricultura sustentável certificada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Interessado em Parcerias?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Estamos sempre abertos a novas parcerias e oportunidades de colaboração 
            no setor agrícola.
          </p>
          <Button asChild size="lg">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Agricultura;
