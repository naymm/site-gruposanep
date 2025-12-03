import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  Wheat, 
  Truck, 
  Pill, 
  Landmark, 
  Factory, 
  Briefcase,
  ArrowRight 
} from "lucide-react";

const Negocios = () => {
  const businesses = [
    {
      icon: <Wheat size={32} />,
      title: "Agricultura",
      description: "Produção agrícola moderna e sustentável, desde culturas tradicionais até agricultura de precisão. Operamos mais de 50.000 hectares de terras cultiváveis.",
      stats: ["50.000+ hectares", "12 fazendas", "3.000 colaboradores"],
      href: "/negocios/agricultura",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Truck size={32} />,
      title: "Distribuição",
      description: "Rede logística abrangente que conecta produtores e consumidores. Frota moderna e centros de distribuição estrategicamente localizados.",
      stats: ["500+ veículos", "15 centros", "Cobertura nacional"],
      href: "/negocios/distribuicao",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Pill size={32} />,
      title: "Farmacêutica",
      description: "Distribuição de medicamentos e produtos de saúde, garantindo acesso a cuidados de qualidade em todo o território nacional.",
      stats: ["10.000+ produtos", "800 farmácias", "ISO certificada"],
      href: "/negocios/farmaceutica",
      image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Landmark size={32} />,
      title: "Finanças",
      description: "Serviços financeiros diversificados incluindo seguros, microcrédito e gestão de ativos, apoiando o crescimento empresarial.",
      stats: ["$500M ativos", "50.000 clientes", "3 subsidiárias"],
      href: "/negocios/financas",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Factory size={32} />,
      title: "Indústria",
      description: "Capacidade industrial diversificada, desde transformação agroalimentar até manufatura de embalagens e materiais de construção.",
      stats: ["5 fábricas", "2.000+ produtos", "Exportação"],
      href: "/negocios/industria",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Briefcase size={32} />,
      title: "Serviços",
      description: "Soluções empresariais integradas incluindo consultoria, tecnologia, recursos humanos e gestão de facilities.",
      stats: ["100+ clientes", "8 serviços", "Suporte 24/7"],
      href: "/negocios/servicos",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Áreas de Atuação
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Nossos Negócios
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Atuamos em setores estratégicos da economia, criando sinergias que 
              potencializam resultados e geram valor sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="space-y-16">
            {businesses.map((business, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-xl gradient-gold flex items-center justify-center text-secondary-foreground mb-6">
                    {business.icon}
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                    {business.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {business.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    {business.stats.map((stat, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={business.href}
                    className="inline-flex items-center text-secondary font-semibold hover:gap-3 transition-all"
                  >
                    Saber mais sobre {business.title}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <img
                    src={business.image}
                    alt={business.title}
                    className="rounded-xl shadow-xl w-full aspect-video object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Synergies Section */}
      <section className="section-padding bg-primary">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-6">
            Sinergias que Criam Valor
          </h2>
          <p className="text-primary-foreground/80 max-w-3xl mx-auto text-lg mb-12">
            A diversificação estratégica do nosso portfólio permite criar sinergias 
            únicas entre os diferentes setores, otimizando recursos e maximizando 
            o impacto positivo em toda a cadeia de valor.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-primary-foreground/10 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">85%</div>
              <p className="text-primary-foreground/70">
                Integração Vertical na Cadeia Alimentar
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">40%</div>
              <p className="text-primary-foreground/70">
                Redução de Custos Logísticos
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">100%</div>
              <p className="text-primary-foreground/70">
                Cobertura Nacional de Distribuição
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Negocios;