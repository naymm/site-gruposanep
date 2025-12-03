import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Pill, Stethoscope, FlaskConical, ShieldCheck, Building2, Users, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Farmaceutica = () => {
  const stats = [
    { value: "300+", label: "Farmácias parceiras", icon: Building2 },
    { value: "800+", label: "Colaboradores", icon: Users },
    { value: "2.000+", label: "Produtos no portfólio", icon: Pill },
    { value: "50+", label: "Laboratórios representados", icon: FlaskConical },
  ];

  const services = [
    {
      icon: Pill,
      title: "Distribuição Farmacêutica",
      description: "Distribuição de medicamentos e produtos de saúde com cadeia de frio controlada.",
    },
    {
      icon: FlaskConical,
      title: "Representação de Laboratórios",
      description: "Representamos os principais laboratórios farmacêuticos internacionais.",
    },
    {
      icon: Stethoscope,
      title: "Equipamentos Médicos",
      description: "Fornecimento e manutenção de equipamentos médico-hospitalares.",
    },
    {
      icon: ShieldCheck,
      title: "Garantia de Qualidade",
      description: "Processos rigorosos de controlo de qualidade e rastreabilidade.",
    },
  ];

  const partners = [
    "Bayer", "Pfizer", "Novartis", "Sanofi", "GSK", "Roche",
    "Johnson & Johnson", "AstraZeneca", "Merck", "Abbott"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Farmacêutica"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Negócios
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Farmacêutica
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Contribuímos para a saúde dos angolanos através da distribuição de 
              medicamentos de qualidade e equipamentos médicos de última geração.
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
                Cuidar da Saúde é a Nossa Missão
              </h2>
              <p className="text-muted-foreground mb-4">
                A SANEP Farmacêutica é uma das principais distribuidoras 
                farmacêuticas de Angola, com mais de duas décadas de experiência 
                no setor da saúde. Representamos os maiores laboratórios 
                internacionais e garantimos que medicamentos essenciais estejam 
                disponíveis em todo o país.
              </p>
              <p className="text-muted-foreground mb-4">
                A nossa infraestrutura inclui armazéns climatizados, frota 
                refrigerada e sistemas de rastreabilidade que garantem a 
                integridade dos produtos desde a origem até ao ponto de venda.
              </p>
              <p className="text-muted-foreground">
                Além da distribuição de medicamentos, fornecemos equipamentos 
                médicos, material hospitalar e oferecemos serviços de formação 
                para profissionais de saúde.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Farmácia"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Medicamentos"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Laboratório"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Equipamento médico"
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
              Oferecemos soluções completas para o setor da saúde, desde a 
              distribuição de medicamentos até equipamentos hospitalares.
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

      {/* Partners */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Laboratórios Parceiros
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Representamos os principais laboratórios farmacêuticos mundiais, 
              garantindo acesso a medicamentos de qualidade.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((partner, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-secondary/10 text-secondary rounded-full font-medium"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Award className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-6">
                Compromisso com a Qualidade
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                A qualidade e segurança são as nossas prioridades absolutas. 
                Todos os nossos processos são certificados e auditados regularmente 
                para garantir a conformidade com os mais elevados padrões 
                internacionais.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-lg font-bold text-primary-foreground">GDP</p>
                  <p className="text-primary-foreground/70 text-sm">Boas Práticas de Distribuição</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-lg font-bold text-primary-foreground">ISO 9001</p>
                  <p className="text-primary-foreground/70 text-sm">Gestão de Qualidade</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-lg font-bold text-primary-foreground">INFARMED</p>
                  <p className="text-primary-foreground/70 text-sm">Licença de Distribuição</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <p className="text-lg font-bold text-primary-foreground">Cold Chain</p>
                  <p className="text-primary-foreground/70 text-sm">Cadeia de Frio Certificada</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Heart className="w-24 h-24 text-secondary mx-auto mb-4" />
              <p className="text-primary-foreground/80 text-lg">
                "A saúde dos angolanos é a nossa maior responsabilidade"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Precisa de Produtos Farmacêuticos?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contacte-nos para conhecer o nosso portfólio completo de medicamentos 
            e equipamentos médicos.
          </p>
          <Button asChild size="lg">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Farmaceutica;
