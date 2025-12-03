import Layout from "@/components/layout/Layout";
import { User, Users, Building2 } from "lucide-react";

// CONSELHO DE ADMINISTRAÇÃO
import luisTroso from "../../img/pessoas/luis-troso.png";
import ailtonSilva from "../../img/pessoas/ailton-silva.png";
import euclidesLuis from "../../img/pessoas/euclides-luis.png";

// DIREÇÃO EXECUTIVA
import anisio from "../../img/pessoas/anisio.webp";
import nestor from "../../img/pessoas/nestor.webp";
import paulo from "../../img/pessoas/paulo.webp";
import policarpo from "../../img/pessoas/policarpo.webp";
import vladimir from "../../img/pessoas/vladimir.webp";

const Organograma = () => {
  const conselho = [
    { name: "Luís Troso", role: "Presidente do Conselho de Administração", image: luisTroso },
    { name: "Ailton da Silva", role: "Administrador Executivo", image: ailtonSilva },
    { name: "Euclides Luís", role: "Administrador Executivo", image: euclidesLuis },
  ];

  const direcao = [
    { name: "Anísio Cerca", role: "Controlo Interno", image: anisio },
    { name: "Nestor Quindai", role: "Capital Humano", image: nestor },
    { name: "Paulo Costa", role: "Jurídico", image: paulo },
    { name: "Policarpo Manuel", role: "Contabilidade", image: policarpo },
    { name: "Vladimir Maior", role: "Finanças", image: vladimir },
  ];

  const unidades = [
    { name: "Inácia Gaspar", role: "Diretor - Agricultura"},
    { name: "Ana Macedo", role: "Nova Fibrex, Food Factory e Sanep Nutrição"},
    { name: "Maria Celeste", role: "Crediangolar"},
    { name: "Adélia Domingos", role: "Sanep Imobiliária" },
    { name: "Luís Francisco", role: "Sanep Lda", area: "Indústria" },
    { name: "José Villalón", role: "Fazenda Kabanguela"},
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
              Organograma
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Conheça a estrutura organizacional do Grupo SANEP e os líderes 
              que conduzem o nosso sucesso.
            </p>
          </div>
        </div>
      </section>

      {/* Conselho de Administração */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <Building2 className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Conselho de Administração
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Órgãos de Governação
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {conselho.map((member, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-secondary shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Connecting Line */}
          <div className="hidden md:block w-0.5 h-16 bg-border mx-auto" />
        </div>
      </section>

      {/* Direção Executiva */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Direcção Executiva
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Comissão Executiva
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            {direcao.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-secondary font-medium">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Connecting Line */}
          <div className="hidden md:block w-0.5 h-16 bg-border mx-auto" />
        </div>
      </section>

      {/* Diretores de Unidades de Negócio */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <User className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Unidades de Negócio
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Directores de Negócio
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unidades.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-secondary animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full mb-3">
                  {member.area}
                </span>
                <h3 className="text-lg font-serif font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Info */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-6">
              Governação Corporativa
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              O Grupo SANEP adopta as melhores práticas de governação corporativa, 
              garantindo transparência, ética e responsabilidade em todas as suas 
              operações. A nossa estrutura organizacional foi desenhada para 
              assegurar uma gestão eficiente e sustentável.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-primary-foreground/10 rounded-xl p-6">
                <h4 className="text-lg font-bold text-primary-foreground mb-2">
                  Transparência
                </h4>
                <p className="text-primary-foreground/70 text-sm">
                  Comunicação clara e aberta com todos os stakeholders
                </p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6">
                <h4 className="text-lg font-bold text-primary-foreground mb-2">
                  Ética
                </h4>
                <p className="text-primary-foreground/70 text-sm">
                  Conduta íntegra em todas as relações comerciais
                </p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-6">
                <h4 className="text-lg font-bold text-primary-foreground mb-2">
                  Responsabilidade
                </h4>
                <p className="text-primary-foreground/70 text-sm">
                  Compromisso com resultados sustentáveis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Organograma;
