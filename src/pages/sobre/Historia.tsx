import Layout from "@/components/layout/Layout";
// IMAGENS
import img1 from "../../img/outras/01.webp";
import img2 from "../../img/outras/02.webp";
import img3 from "../../img/outras/03.webp";
import img4 from "../../img/outras/04.webp";
import img5 from "../../img/outras/05.webp";

const Historia = () => {
  const timeline = [
    {
      year: "20213",
      title: "Fundação",
      description: "O Grupo SANEP é fundado em Luanda com foco inicial no setor de distribuição.",
    },
    {
      year: "2014",
      title: "Diversificação da Sanep",
      description: "A diversificação da carteira de negócios da SANEP marca um passo estratégico e visionário na trajectória da empresa, ao se aventurar em novos sectores através da criação das sociedades Road Plus, Lda, dedicada à Construção Civil e Obras Públicas, e BASIAELIA, focada na Indústria Panificadora. Essa expansão representa não apenas um marco importante para a SANEP, mas também evidencia sua capacidade de adaptar-se e prosperar em ambientes empresariais diversificados.",
    },
    {
      year: "2015",
      title: "Diversificação através de aquisição",
      description: "A estratégia de diversificação da empresa foi ampliada através de uma significativa aquisição: a compra de 25% do capital da Sociedade ZEEPACK, uma fábrica de papel cartão, pelo valor de USD 2.000.000,00. Essa decisão representa um passo estratégico ousado que posiciona a empresa em um novo mercado e oferece oportunidades emocionantes para o crescimento e o desenvolvimento a longo prazo.",
    },
    {
      year: "2016",
      title: "Crescimento e Expansão",
      description: "O crescimento e a expansão internacional das várias insígnias da SANEP para locais tão diversos como Brasil, Emirados Árabes Unidos (EAU) e Portugal representam uma estratégia audaciosa e visionária da empresa, com o objetivo de consolidar sua presença global e aproveitar oportunidades em mercados estratégicos em todo o mundo. Essa expansão demonstra a capacidade da SANEP de se adaptar e prosperar em ambientes de negócios diversos e competitivos.",
    },
    {
      year: "2017",
      title: "Novos Negócios",
      description: "A estratégia de diversificação da empresa se destacou por meio de aquisições e pela criação de novos negócios, demonstrando a visão empreendedora e o compromisso da organização em explorar uma ampla gama de oportunidades nos mercados em que atua. Aquisição da RMARCA (Sociedade de Microcrédito) Criação das empresas: FAZENDA KABANGUELA (Produção Agropecuária) REGADIO (Gestão, Engenharia e Mecanização Agrícola) AGROAWA (Distribuição de Produtos Agropecuarios) FOOD FACTORY (Retálho e Distribuição Alimentar) MEGA CALÇADOS (Produção e Comercialização de Calçados) Alienação da participação na sociedade ZEEPACK por USD 5.000.000,00 Reforço da posição na FIBREX.",
    },
    {
      year: "2018",
      title: "Novos Negócios",
      description: "A criação do Grupo SANEP marcou um importante marco na estratégia de crescimento e expansão da empresa. Essa iniciativa representou não apenas a consolidação das diversas operações da SANEP em diferentes setores, mas também a organização dessas operações em holdings específicas, cada uma focada em áreas de negócios distintas. Essa estrutura de holdings permite uma gestão mais eficiente e estratégica dos diversos segmentos em que a SANEP atua.As holdings do Grupo SANEP são:- Sanep SGPS,- Sanep Agricultura SGPS,-Sanep Distribuição SGPS,- Sanep Indústria SGPS,- Sanep Imobiliária SGPS,- Sanep Serviços SGPS.Eleição do Conselho de Administração das Sociedades Holdings.",
    },
    {
      year: "2019",
      title: "Aprovação da Constituíção do Grupo SANEP",
      description: "A aprovação da Convenção e regulamentos de constituição do Grupo SANEP marcou o início de uma fase emocionante e estratégica para a empresa. Essa aprovação formalizou a visão da SANEP de reorganizar e expandir seu portfólio de negócios, com um foco claro na criação de valor para os acionistas e no atendimento às necessidades de seus clientes e comunidades onde atua.(Apresentação da estrategia corporativa e reorganizaçãodas áreas de negócios)Criação da Sanep Finanças SGPS (Área denegócio dedicada a gestão de investimentos financeirosdo grupo)Criação da Sanep VIDA (Produ- tos e Serviços deSaúde)Criação da Sanep Palm Life (Indústria Agroalimentar)Sanep Imobiliária conclui a primeira unidadehoteleira do Grupo em Luanda.",
    },
    {
      year: "2020",
      title: "Pandemia de COVID-19",
      description: "O início de 2020 foi marcado por um evento sem precedentes que apresentou desafios de uma natureza invulgar: a epidemia de Covid-19. Essa epidemia, que rapidamente se transformou em uma pandemia global, teve um impacto significativo em todos os aspectos da sociedade, indo além das questões de saúde e afetando profundamente o sistema econômico e financeiro em todo o mundo. A rapidez com que a pandemia se espalhou e as incertezas que gerou quanto à sua evolução tornaram-na um desafio incomparável.",
    },
    {
      year: "2024",
      title: "Novos Negócios",
      description: "A estratégia de diversificação da empresa se destacou por meio de criação de novos negócios, demonstrando a visão empreendedora e o compromisso da organização em explorar uma ampla gama de oportunidades nos mercados em que actua.Criação das empresas:OKAVANGO (Produção Medicamentos Genéricos Orais)ZAMBEZI (Produção e Distribuição de Medicamentos Genéricos)PETRISLAB (Laboratório de Investigação em Biotecnologia e Ciências Farmacêuticas)SQA - SANEP QUÍMICOS DE ANGOLAAKIESE FARMA (Distribuição de Medicamentos & Equipamentos)Fibrex PharmaTech (Fabrcação de embalagens para medicamentos).",
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
                      <p className="text-muted-foreground texto-justificado">{item.description}</p>
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
              <p className="text-muted-foreground mb-4 texto-justificado">
                Ao longo de mais de 10 anos, o Grupo SANEP tem sido um catalisador 
                do desenvolvimento económico e social em Angola e na região.
              </p>
              <p className="text-muted-foreground mb-4 texto-justificado">
                Desde a nossa fundação, investimos consistentemente em pessoas, 
                infraestruturas e tecnologia, sempre com o objetivo de criar valor 
                sustentável para todas as partes interessadas.
              </p>
              <p className="text-muted-foreground texto-justificado">
                O nosso compromisso com a excelência e a responsabilidade social 
                continua a guiar cada decisão que tomamos, enquanto trabalhamos 
                para construir um futuro mais próspero para todos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={img1}
                alt="Operações agrícolas"
                className="rounded-xl shadow-lg"
              />
              <img
                src={img2}
                alt="Operações industriais"
                className="rounded-xl shadow-lg mt-8"
              />
              <img
                src={img3}
                alt="Equipa SANEP"
                className="rounded-xl shadow-lg"
              />
              <img
                src={img4}
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