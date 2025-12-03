import Layout from "@/components/layout/Layout";
import { Leaf, Users, Building, TrendingUp, Target, Award } from "lucide-react";

const Sustentabilidade = () => {
  const pillars = [
    {
      icon: <Leaf size={32} />,
      title: "Ambiente",
      description: "Compromisso com a neutralidade carbónica até 2040, gestão responsável de recursos naturais e promoção da economia circular.",
      metrics: [
        { value: "30%", label: "Redução de emissões desde 2020" },
        { value: "85%", label: "Resíduos reciclados" },
        { value: "50%", label: "Energia renovável" },
      ],
    },
    {
      icon: <Users size={32} />,
      title: "Social",
      description: "Investimento nas comunidades, promoção da diversidade e inclusão, e garantia de condições de trabalho dignas.",
      metrics: [
        { value: "10.000+", label: "Beneficiários de programas sociais" },
        { value: "45%", label: "Mulheres em liderança" },
        { value: "100%", label: "Fornecedores auditados" },
      ],
    },
    {
      icon: <Building size={32} />,
      title: "Governança",
      description: "Transparência, ética empresarial e gestão de riscos robusta, assegurando a confiança dos stakeholders.",
      metrics: [
        { value: "100%", label: "Compliance regulatório" },
        { value: "A+", label: "Rating de governança" },
        { value: "12", label: "Políticas ESG implementadas" },
      ],
    },
  ];

  const initiatives = [
    {
      title: "Agricultura Regenerativa",
      description: "Implementação de práticas agrícolas que restauram os solos e capturam carbono.",
      impact: "15.000 hectares em regeneração",
    },
    {
      title: "Programa SANEP Educa",
      description: "Bolsas de estudo e formação profissional para jovens das comunidades locais.",
      impact: "500 bolsas anuais",
    },
    {
      title: "Logística Verde",
      description: "Modernização da frota com veículos elétricos e otimização de rotas.",
      impact: "25% redução de emissões",
    },
    {
      title: "Saúde Comunitária",
      description: "Campanhas de saúde e acesso a medicamentos essenciais em áreas rurais.",
      impact: "50.000 pessoas beneficiadas",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              ESG
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Sustentabilidade
            </h1>
            <p className="text-xl text-primary-foreground/80">
              O nosso compromisso com o desenvolvimento sustentável está no centro 
              de tudo o que fazemos. Criamos valor para as gerações futuras.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-secondary">
        <div className="container-wide text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-secondary-foreground max-w-4xl mx-auto">
            "Acreditamos que o sucesso empresarial e a responsabilidade ambiental 
            e social não são mutuamente exclusivos. São, na verdade, indissociáveis 
            para criar um futuro próspero."
          </blockquote>
          <p className="mt-6 text-secondary-foreground/80 font-semibold">
            — Presidente do Conselho de Administração
          </p>
        </div>
      </section>

      {/* ESG Pillars */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Pilares ESG
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
              Nossa Abordagem
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-lg border border-border hover:border-secondary transition-colors"
              >
                <div className="w-16 h-16 rounded-xl gradient-gold flex items-center justify-center text-secondary-foreground mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground mb-6">{pillar.description}</p>
                
                <div className="space-y-4">
                  {pillar.metrics.map((metric, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">{metric.label}</span>
                      <span className="text-xl font-bold text-primary">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Metas 2030
              </span>
              <h2 className="text-3xl font-serif font-bold text-foreground mt-2 mb-6">
                Compromissos Ambiciosos
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-corporate flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Neutralidade Carbónica</h4>
                    <p className="text-muted-foreground">
                      Alcançar emissões líquidas zero em todas as operações até 2040.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-corporate flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">100% Energia Renovável</h4>
                    <p className="text-muted-foreground">
                      Transição completa para fontes de energia limpa até 2030.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-corporate flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Zero Resíduos para Aterro</h4>
                    <p className="text-muted-foreground">
                      Eliminar completamente a deposição de resíduos em aterros.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {initiatives.map((initiative, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-md"
                >
                  <h4 className="font-semibold text-foreground mb-2">{initiative.title}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{initiative.description}</p>
                  <span className="text-secondary font-semibold text-sm">{initiative.impact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Report CTA */}
      <section className="section-padding bg-primary">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
            Relatório de Sustentabilidade 2023
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Conheça em detalhe as nossas iniciativas, métricas de desempenho e 
            progresso em direção aos nossos objetivos ESG.
          </p>
          <button className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Descarregar Relatório PDF
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Sustentabilidade;