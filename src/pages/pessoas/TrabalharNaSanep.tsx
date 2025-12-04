import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, Coffee, Briefcase, GraduationCap, Shield, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import naym from "../../img/pessoas/naym.webp";
import isabel from "../../img/pessoas/isabel.webp";
import adelino from "../../img/pessoas/adelino.webp";

const TrabalharNaSanep = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Seguro de Saúde",
      description: "Cobertura médica abrangente para colaboradores e família.",
    },
    {
      icon: GraduationCap,
      title: "Formação Contínua",
      description: "Programas de desenvolvimento pessoal e profissional.",
    },
    {
      icon: Coffee,
      title: "Bem-Estar",
      description: "Espaços de convívio, ginásio e programas de saúde.",
    },
    {
      icon: Briefcase,
      title: "Carreira",
      description: "Oportunidades de crescimento e mobilidade interna.",
    },
  ];

  const testimonials = [
    {
      name: "Adelino Pimpão",
      role: "Relações Públicas",
      years: "8 anos na SANEP",
      quote: "Tive a oportunidade de crescer junto com a empresa e acompanhar cada fase do nosso desenvolvimento. Trabalhar aqui não é apenas sobre atingir metas, mas sobre construir relações sólidas com clientes e parceiros, sempre com confiança e transparência. Sinto-me parte de algo maior, e isso me motiva todos os dias a fazer o meu melhor.",
      image: adelino,
    },
    {
      name: "Naym Mupoia",
      role: "Coordenador de Marketing",
      years: "1 ano na SANEP",
      quote: "Mesmo em apenas um ano, percebi que é um grupo que valoriza inovação, criatividade e resultados concretos. Meu papel como coordenador de marketing me permite implementar ideias que realmente impactam a forma como nos conectamos com nossos clientes. Sinto-me desafiado e motivado a cada dia.",
      image: naym,
    },
    {
      name: "Isabel da Silva",
      role: "Técnica Comercial",
      years: "6 anos na SANEP",
      quote: "Apredi a importância de ouvir os clientes, compreender suas necessidades e entregar soluções reais. Cada desafio é uma oportunidade de aprender e de contribuir para o crescimento da empresa. Aqui, sinto que meu trabalho realmente faz a diferença, e isso é muito gratificante.",
      image: isabel,
    },
  ];

  const values = [
    { title: "Respeito", description: "Valorizamos cada pessoa e as suas contribuições únicas." },
    { title: "Integridade", description: "Agimos com honestidade e transparência em tudo." },
    { title: "Excelência", description: "Buscamos a melhoria contínua em tudo o que fazemos." },
    { title: "Colaboração", description: "Trabalhamos juntos para alcançar objetivos comuns." },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Trabalhar na SANEP"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Pessoas
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Trabalhar na SANEP
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Junte-se a uma equipa de mais de 12.000 profissionais que todos os 
              dias fazem a diferença em Angola e no mundo.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/pessoas/carreiras">Ver Oportunidades</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heart className="w-12 h-12 text-secondary mb-4" />
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Nossa Cultura
              </h2>
              <p className="text-muted-foreground mb-4 texto-justificado">
                Na SANEP, acreditamos que o nosso sucesso começa com as pessoas. 
                Cultivamos um ambiente onde todos podem dar o seu melhor, crescer 
                profissionalmente e sentir-se parte de algo maior.
              </p>
              <p className="text-muted-foreground mb-4 texto-justificado">
                A nossa cultura é construída sobre valores sólidos de respeito, 
                integridade e colaboração. Celebramos a diversidade e acreditamos 
                que diferentes perspetivas nos tornam mais fortes.
              </p>
              <p className="text-muted-foreground texto-justificado">
                Investimos no bem-estar dos nossos colaboradores porque sabemos 
                que pessoas felizes e motivadas são a chave para o sucesso sustentável.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Benefícios e Vantagens
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos um pacote competitivo de benefícios que reconhece e 
              recompensa o talento e dedicação dos nossos colaboradores.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              O Que Dizem os Nossos Colaboradores
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-secondary">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.years}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic texto-justificado">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Environment */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Smile className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Ambiente de Trabalho
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Espaços modernos e inspiradores que promovem a colaboração, 
              criatividade e bem-estar.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Escritório moderno"
              className="rounded-xl aspect-video object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Espaço de trabalho"
              className="rounded-xl aspect-video object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Área de convívio"
              className="rounded-xl aspect-video object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Reunião de equipa"
              className="rounded-xl aspect-video object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Pronto para Fazer Parte da Nossa Equipa?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore as nossas oportunidades de carreira e descubra como pode 
            crescer connosco.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/pessoas/carreiras">Ver Vagas Abertas</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pessoas/talento-jovem">Programas para Jovens</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TrabalharNaSanep;
