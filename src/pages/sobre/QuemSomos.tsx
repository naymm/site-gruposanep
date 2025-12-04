import Layout from "@/components/layout/Layout";
import { Check, Award, Globe, Target } from "lucide-react";
import grupo from "../../img/outras/grupo.webp";

const QuemSomos = () => {
  const values = [
    {
      title: "Integridade",
      description: "Agimos com ética e transparência em todas as nossas relações.",
    },
    {
      title: "Excelência",
      description: "Buscamos a qualidade superior em tudo o que fazemos.",
    },
    {
      title: "Inovação",
      description: "Abraçamos a mudança e procuramos soluções criativas.",
    },
    {
      title: "Sustentabilidade",
      description: "Comprometemo-nos com o desenvolvimento responsável.",
    },
    {
      title: "Colaboração",
      description: "Trabalhamos em equipa para alcançar objetivos comuns.",
    },
    {
      title: "Responsabilidade Social",
      description: "Contribuímos para o bem-estar das comunidades onde operamos.",
    },
  ];

  const certifications = [
    "ISO 9001:2015 - Gestão da Qualidade",
    "ISO 14001:2015 - Gestão Ambiental",
    "ISO 45001:2018 - Saúde e Segurança",
    "ISO 22000:2018 - Segurança Alimentar",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Sobre Nós
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Quem Somos
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Somos um grupo empresarial angolano líder, comprometido com a excelência 
              e o desenvolvimento sustentável do país há mais de uma década.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Um Legado de Excelência
              </h2>
              <p className="text-muted-foreground mb-4 texto-justificado">
                Fundado em 2013, o Grupo SANEP nasceu com a visão de contribuir para o 
                desenvolvimento económico de Angola através da diversificação empresarial 
                e da criação de valor sustentável.
              </p>
              <p className="text-muted-foreground mb-4 texto-justificado">
                Ao longo dos anos, expandimos as nossas operações para 
                múltiplos sectores estratégicos, incluindo agricultura, distribuição, 
                farmacêutica, finanças, imobiliária, indústria e serviços.
              </p>
              <p className="text-muted-foreground texto-justificado">
                Hoje, somos reconhecidos como um dos maiores grupos empresariais privados 
                de Angola, com presença em 8 países e mais de 500 colaboradores dedicados 
                à nossa missão de excelência.
              </p>
            </div>
            <div className="relative">
              <img
                src={grupo}
                alt="Sede do Grupo SANEP"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold">+10</div>
                <div className="text-sm">Anos de História</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 rounded-xl gradient-corporate flex items-center justify-center text-primary-foreground mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Missão</h3>
              <p className="text-muted-foreground texto-justificado">
              Desenvolver negócios e produtos com padrões de excelência internacional, que agreguem valor económico e social duradouros e contribuam para o desenvolvimento sustentável das comunidades.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center text-secondary-foreground mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Visão</h3>
              <p className="text-muted-foreground texto-justificado">
              Ser um Grupo Multinacional, culturalmente coeso e em continua transformação em direcção ao progresso e a excelência.
              </p>
            </div>

            {/* Awards */}
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 rounded-xl gradient-corporate flex items-center justify-center text-primary-foreground mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Reconhecimento</h3>
              <p className="text-muted-foreground texto-justificado">
                Premiados múltiplas vezes como melhor empregador, empresa mais 
                inovadora e líder em responsabilidade social corporativa em Angola.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">
              Nossos Valores
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-card rounded-xl shadow-md"
                >
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center flex-shrink-0">
                    <Check size={20} className="text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Qualidade Certificada
            </span>
            <h2 className="text-3xl font-serif font-bold text-foreground mt-2">
              Certificações em curso
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-secondary transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Award size={28} className="text-secondary" />
                </div>
                <p className="font-medium text-foreground">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QuemSomos;