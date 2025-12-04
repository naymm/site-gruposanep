import Layout from "@/components/layout/Layout";
import { Quote, Play, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import luisTrosoSM from "../../img/outras/luis-trosoSM.png";

const MensagemPCA = () => {
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
              Mensagem do PCA
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Uma palavra do Presidente do Conselho de Administração sobre a 
              visão e o compromisso do Grupo SANEP.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* PCA Profile */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={luisTrosoSM}
                    alt="António Manuel Santos - PCA"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-serif font-bold text-foreground mb-1">
                      Luís Manuel Troso
                    </h2>
                    <p className="text-secondary font-medium mb-4">
                      Presidente do Conselho de Administração
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Video CTA */}
                <div className="mt-6 bg-primary rounded-xl p-6 text-center">
                  <Play className="w-12 h-12 text-secondary mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-primary-foreground mb-2">
                    Vídeo Institucional
                  </h4>
                  <p className="text-primary-foreground/70 text-sm mb-4">
                    Assista à mensagem do PCA em vídeo
                  </p>
                  <Button variant="secondary" className="w-full">
                    Ver Vídeo
                  </Button>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <Quote className="w-16 h-16 text-secondary/30 mb-6" />
                
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Caros Stakeholders,
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6 texto-justificado">
                  É com grande orgulho que me dirijo a vós enquanto Presidente do 
                  Conselho de Administração do Grupo SANEP. Ao longo de uma 
                  década, temos construído um legado de excelência, inovação e 
                  compromisso com o desenvolvimento de Angola e da região.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6 texto-justificado">
                  O ano que passou foi marcado por desafios significativos, mas também 
                  por conquistas notáveis. Mantivemos o nosso compromisso inabalável 
                  com a qualidade, a sustentabilidade e a criação de valor para todas 
                  as partes interessadas. Os nossos resultados reflectem a dedicação 
                  incansável das nossas equipas e a confiança depositada pelos nossos 
                  parceiros e clientes.
                </p>

                <h4 className="text-xl font-serif font-bold text-foreground mb-4 mt-8">
                  Visão Estratégica
                </h4>

                <p className="text-muted-foreground leading-relaxed mb-6 texto-justificado">
                  Olhando para o futuro, continuamos focados na nossa estratégia de 
                  crescimento sustentável e diversificação. Os nossos investimentos 
                  em tecnologia, sustentabilidade e capital humano posicionam-nos 
                  como líderes em todos os sectores onde actuamos.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6 texto-justificado">
                  A transformação digital é uma prioridade estratégica. Estamos a 
                  implementar soluções inovadoras que aumentam a nossa eficiência 
                  operacional e melhoram a experiência dos nossos clientes. 
                  Simultaneamente, o nosso compromisso com a sustentabilidade 
                  ambiental e social mantém-se firme, com metas ambiciosas de 
                  neutralidade carbónica até 2040.
                </p>

                <h4 className="text-xl font-serif font-bold text-foreground mb-4 mt-8">
                  As Nossas Pessoas
                </h4>

                <p className="text-muted-foreground leading-relaxed mb-6 texto-justificado">
                  O sucesso do Grupo SANEP é, acima de tudo, o sucesso das nossas 
                  pessoas. Investimos continuamente na formação e desenvolvimento 
                  dos nossos colaboradores, porque acreditamos que são eles o nosso 
                  maior activo. A diversidade, a inclusão e o bem-estar das nossas 
                  equipas são pilares fundamentais da nossa cultura organizacional.
                </p>

                <h4 className="text-xl font-serif font-bold text-foreground mb-4 mt-8">
                  Compromisso com Angola
                </h4>

                <p className="text-muted-foreground leading-relaxed mb-6 texto-justificado">
                  Enquanto empresa angolana de referência, temos um papel crucial 
                  no desenvolvimento económico e social do nosso país. Através dos 
                  nossos programas de responsabilidade social, apoiamos comunidades, 
                  promovemos a educação e contribuímos para um futuro mais próspero 
                  para todos os angolanos.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6 texto-justificado">
                  Agradeço a todos os nossos colaboradores, clientes, parceiros e 
                  acionistas pela confiança e apoio contínuos. Juntos, continuaremos 
                  a construir um Grupo SANEP cada vez mais forte, sustentável e 
                  comprometido com a excelência.
                </p>

                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-foreground font-serif text-xl italic mb-4">
                    "O nosso compromisso é criar valor sustentável para todas as 
                    partes interessadas, contribuindo para o desenvolvimento de 
                    Angola e da região."
                  </p>
                  <p className="text-muted-foreground font-bold">
                    Luís Manuel Troso
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Presidente do Conselho de Administração
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
              Biografia
            </h2>
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-4">
                    Formação Académica
                  </h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                      <span>Licenciatura em Gestão de Recursos Humanos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                      <span>Banca e Finanças - Nível III e IV</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                      <span>Pós-graduação em Investimentos em Mercados Financeiros</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-4">
                    Percurso Profissional
                  </h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0 texto-justificado" />
                      <span>Possui mais de 22 anos de actividade profissional e vasta experiência na liderança e gestão de pessoas, projectos e empresas, com destaque para o sector financeiro onde iniciou a carreira profissional e hoje possui participações em empresas no sector.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-lg font-bold text-foreground mb-4">
                  Reconhecimentos
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="font-bold text-foreground">2020</p>
                    <p className="text-sm text-muted-foreground">
                      Empresário do Ano - Angola
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="font-bold text-foreground">2018</p>
                    <p className="text-sm text-muted-foreground">
                      Medalha de Mérito Empresarial
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="font-bold text-foreground">2015</p>
                    <p className="text-sm text-muted-foreground">
                      Líder Africano em Negócios
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MensagemPCA;
