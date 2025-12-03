import Layout from "@/components/layout/Layout";
import { User, Users, Building2 } from "lucide-react";

const Organograma = () => {
  const conselho = [
    { name: "António Manuel Santos", role: "Presidente do Conselho de Administração", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Maria Helena Costa", role: "Vice-Presidente", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "João Pedro Ferreira", role: "Administrador Executivo", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
  ];

  const direcao = [
    { name: "Carlos Alberto Mendes", role: "CEO - Chief Executive Officer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Ana Beatriz Silva", role: "CFO - Chief Financial Officer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Ricardo Jorge Lima", role: "COO - Chief Operating Officer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Teresa Margarida Nunes", role: "CHRO - Chief Human Resources Officer", image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
  ];

  const unidades = [
    { name: "Paulo André Sousa", role: "Diretor - Agricultura", area: "Agricultura" },
    { name: "Marta Cristina Reis", role: "Diretora - Distribuição", area: "Distribuição" },
    { name: "Fernando José Alves", role: "Diretor - Farmacêutica", area: "Farmacêutica" },
    { name: "Sandra Luísa Pinto", role: "Diretora - Finanças", area: "Finanças" },
    { name: "Rui Miguel Correia", role: "Diretor - Indústria", area: "Indústria" },
    { name: "Catarina Isabel Lopes", role: "Diretora - Serviços", area: "Serviços" },
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
                Direção Executiva
              </span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground">
              Comissão Executiva
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {direcao.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
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
              Diretores de Negócio
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
              O Grupo SANEP adota as melhores práticas de governação corporativa, 
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
