import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Landmark, CreditCard, Shield, TrendingUp, Users, Building2, Wallet, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";

const Financas = () => {
  const stats = [
    { value: "50.000+", label: "Clientes ativos", icon: Users },
    { value: "500M+", label: "USD em ativos geridos", icon: Wallet },
    { value: "25+", label: "Agências", icon: Building2 },
    { value: "15", label: "Anos de experiência", icon: TrendingUp },
  ];

  const services = [
    {
      icon: Landmark,
      title: "Microcrédito",
      description: "Soluções de crédito acessíveis para pequenos empresários e empreendedores.",
    },
    {
      icon: Shield,
      title: "Seguros",
      description: "Proteção para pessoas, empresas e patrimônio com coberturas abrangentes.",
    },
    {
      icon: CreditCard,
      title: "Serviços de Pagamento",
      description: "Soluções de pagamento digital e transferências nacionais e internacionais.",
    },
    {
      icon: PiggyBank,
      title: "Poupança e Investimento",
      description: "Produtos de poupança e investimento adaptados a diferentes perfis.",
    },
  ];

  const insuranceTypes = [
    "Seguro de Vida", "Seguro Automóvel", "Seguro Saúde", "Seguro Habitação",
    "Seguro Empresarial", "Seguro Agrícola", "Seguro de Carga", "Responsabilidade Civil"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Finanças"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Negócios
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Finanças
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Soluções financeiras inovadoras que impulsionam o crescimento de 
              pessoas e empresas em Angola.
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
                Parceiros no Seu Crescimento Financeiro
              </h2>
              <p className="text-muted-foreground mb-4">
                A SANEP Finanças oferece um portfólio diversificado de serviços 
                financeiros desenhados para atender às necessidades de particulares 
                e empresas. A nossa missão é democratizar o acesso a serviços 
                financeiros de qualidade.
              </p>
              <p className="text-muted-foreground mb-4">
                Através das nossas operações de microcrédito, já apoiámos milhares 
                de pequenos empresários a concretizar os seus sonhos. A nossa 
                seguradora oferece proteção abrangente, desde seguros pessoais 
                a coberturas empresariais complexas.
              </p>
              <p className="text-muted-foreground">
                Investimos continuamente em tecnologia para oferecer serviços 
                digitais que tornam a gestão financeira mais acessível e conveniente.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Serviços financeiros"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Investimento"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Consultoria"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Análise financeira"
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
              Oferecemos soluções financeiras completas para todas as fases da 
              sua vida pessoal e empresarial.
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

      {/* Insurance Types */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Tipos de Seguros
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Proteção abrangente para todos os aspectos da sua vida e do seu negócio.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {insuranceTypes.map((type, index) => (
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

      {/* Microfinance Impact */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Landmark className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-6">
                Impacto Social do Microcrédito
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                O nosso programa de microcrédito tem transformado vidas em todo o 
                país. Apoiamos empreendedores que não têm acesso ao sistema bancário 
                tradicional, permitindo-lhes criar e expandir os seus negócios.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">30.000+</p>
                  <p className="text-primary-foreground/70 text-sm">Microempresários apoiados</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">65%</p>
                  <p className="text-primary-foreground/70 text-sm">Clientes mulheres</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">95%</p>
                  <p className="text-primary-foreground/70 text-sm">Taxa de reembolso</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-2xl font-bold text-secondary">12</p>
                  <p className="text-primary-foreground/70 text-sm">Províncias abrangidas</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <PiggyBank className="w-24 h-24 text-secondary mx-auto mb-4" />
              <p className="text-primary-foreground/80 text-lg">
                "Transformamos sonhos em realidade, um crédito de cada vez"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Precisa de Soluções Financeiras?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contacte-nos para conhecer os nossos produtos de crédito, seguros e 
            serviços de pagamento.
          </p>
          <Button asChild size="lg">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Financas;
