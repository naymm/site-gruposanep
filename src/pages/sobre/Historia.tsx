import Layout from "@/components/layout/Layout";

const Historia = () => {
  const timeline = [
    {
      year: "1989",
      title: "Fundação",
      description: "O Grupo SANEP é fundado em Luanda com foco inicial no setor de distribuição.",
    },
    {
      year: "1995",
      title: "Expansão para Agricultura",
      description: "Início das operações agrícolas com aquisição de fazendas no sul de Angola.",
    },
    {
      year: "2001",
      title: "Entrada no Setor Farmacêutico",
      description: "Criação da divisão farmacêutica, tornando-se um dos principais distribuidores do país.",
    },
    {
      year: "2008",
      title: "Serviços Financeiros",
      description: "Lançamento da holding financeira, expandindo para seguros e microcrédito.",
    },
    {
      year: "2012",
      title: "Industrialização",
      description: "Inauguração do primeiro complexo industrial de transformação agroalimentar.",
    },
    {
      year: "2016",
      title: "Internacionalização",
      description: "Expansão para Moçambique, Namíbia e República Democrática do Congo.",
    },
    {
      year: "2020",
      title: "Transformação Digital",
      description: "Implementação de programa de digitalização em todas as unidades de negócio.",
    },
    {
      year: "2024",
      title: "Sustentabilidade",
      description: "Lançamento do programa ESG com metas ambiciosas de neutralidade carbónica até 2040.",
    },
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
              Nossa História
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Uma jornada de mais de três décadas de crescimento, inovação e 
              compromisso com o desenvolvimento de Angola.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-secondary rounded-full md:-translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div
                    className={`ml-20 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm font-bold rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Um Legado de Impacto
              </h2>
              <p className="text-muted-foreground mb-4">
                Ao longo de mais de 35 anos, o Grupo SANEP tem sido um catalisador 
                do desenvolvimento económico e social em Angola e na região.
              </p>
              <p className="text-muted-foreground mb-4">
                Desde a nossa fundação, investimos consistentemente em pessoas, 
                infraestruturas e tecnologia, sempre com o objetivo de criar valor 
                sustentável para todas as partes interessadas.
              </p>
              <p className="text-muted-foreground">
                O nosso compromisso com a excelência e a responsabilidade social 
                continua a guiar cada decisão que tomamos, enquanto trabalhamos 
                para construir um futuro mais próspero para todos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Operações agrícolas"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Operações industriais"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Equipa SANEP"
                className="rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Sustentabilidade"
                className="rounded-xl shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Historia;