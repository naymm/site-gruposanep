import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Briefcase, Building, Car, Plane, Users, TrendingUp, Globe, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const Servicos = () => {
  const stats = [
    { value: "20+", label: "Empresas de serviços", icon: Building },
    { value: "4.000+", label: "Colaboradores", icon: Users },
    { value: "50+", label: "Clientes corporativos", icon: Briefcase },
    { value: "8", label: "Países de operação", icon: Globe },
  ];

  const services = [
    {
      icon: Building,
      title: "Gestão Imobiliária",
      description: "Administração de propriedades comerciais e residenciais de alto padrão.",
    },
    {
      icon: Car,
      title: "Rent-a-Car",
      description: "Frota diversificada para aluguer de curta e longa duração.",
    },
    {
      icon: Plane,
      title: "Turismo e Viagens",
      description: "Agência de viagens corporativas e turismo de lazer.",
    },
    {
      icon: Wrench,
      title: "Manutenção Industrial",
      description: "Serviços técnicos especializados para indústria e infraestruturas.",
    },
  ];

  const serviceAreas = [
    "Gestão de Facilities", "Segurança Privada", "Limpeza Industrial",
    "Catering Corporativo", "Transporte Executivo", "Consultoria de Gestão",
    "Recursos Humanos", "Tecnologias de Informação"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Serviços"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Negócios
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Serviços
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Soluções integradas de serviços que suportam empresas e particulares 
              nas suas necessidades do dia-a-dia.
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
                Excelência em Serviços
              </h2>
              <p className="text-muted-foreground mb-4">
                A SANEP Serviços agrupa mais de 20 empresas que prestam serviços 
                diversificados a empresas e particulares. Desde gestão imobiliária 
                a serviços de turismo, oferecemos soluções completas com os mais 
                elevados padrões de qualidade.
              </p>
              <p className="text-muted-foreground mb-4">
                A nossa experiência e know-how permitem-nos ser parceiros de 
                confiança para grandes empresas nacionais e multinacionais que 
                operam em Angola.
              </p>
              <p className="text-muted-foreground">
                Investimos continuamente na formação das nossas equipas e na 
                modernização dos nossos serviços, garantindo que os nossos clientes 
                recebam sempre o melhor atendimento.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Escritório"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Reunião"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Equipa"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Atendimento"
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
              Principais Serviços
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos um portfólio diversificado de serviços para atender às 
              necessidades mais exigentes.
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

      {/* Service Areas */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Áreas de Serviço
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cobrimos todas as áreas de suporte que as empresas modernas necessitam.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Clients */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <TrendingUp className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-6">
                Parceiros de Confiança
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Somos o parceiro preferencial de serviços para as maiores empresas 
                que operam em Angola. A nossa abordagem integrada permite oferecer 
                soluções completas com um único ponto de contacto.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">50+</p>
                  <p className="text-primary-foreground/70 text-sm">Clientes corporativos</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">98%</p>
                  <p className="text-primary-foreground/70 text-sm">Taxa de retenção</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">24/7</p>
                  <p className="text-primary-foreground/70 text-sm">Suporte disponível</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">ISO</p>
                  <p className="text-primary-foreground/70 text-sm">Certificação 9001</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Briefcase className="w-24 h-24 text-secondary mx-auto mb-4" />
              <p className="text-primary-foreground/80 text-lg">
                "O seu sucesso é o nosso negócio"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Precisa de Serviços Empresariais?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contacte-nos para conhecer as nossas soluções de serviços integrados 
            para a sua empresa.
          </p>
          <Button asChild size="lg">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Servicos;
