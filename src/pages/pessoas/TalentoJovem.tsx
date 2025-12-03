import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Rocket, BookOpen, Calendar, Award, Building2, Target } from "lucide-react";
import { Link } from "react-router-dom";

const TalentoJovem = () => {
  const programs = [
    {
      icon: GraduationCap,
      title: "Programa de Estágios",
      duration: "3-6 meses",
      description: "Estágios curriculares e profissionais para estudantes e recém-formados.",
      features: ["Mentoria personalizada", "Projetos reais", "Rotação entre áreas", "Possibilidade de efetivação"],
    },
    {
      icon: Rocket,
      title: "Programa Trainee",
      duration: "18 meses",
      description: "Formação intensiva para jovens talentos com alto potencial de liderança.",
      features: ["Formação executiva", "Projetos estratégicos", "Exposição internacional", "Fast-track de carreira"],
    },
    {
      icon: BookOpen,
      title: "Programa de Bolsas",
      duration: "Até 4 anos",
      description: "Apoio financeiro para estudantes universitários de excelência.",
      features: ["Bolsa de estudos", "Estágio garantido", "Material didático", "Acompanhamento académico"],
    },
  ];

  const universities = [
    "Universidade Agostinho Neto",
    "Universidade Católica de Angola",
    "Universidade Metodista de Angola",
    "Universidade Jean Piaget",
    "ISCTE Angola",
    "Instituto Superior Técnico de Angola",
  ];

  const testimonials = [
    {
      name: "Carlos Eduardo",
      role: "Ex-Trainee, atual Gestor de Projetos",
      quote: "O programa trainee foi transformador. Em 18 meses, aprendi mais do que em anos de estudo teórico.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Ana Luísa",
      role: "Ex-Estagiária, atual Analista Senior",
      quote: "Comecei como estagiária e hoje sou parte da equipa de liderança. A SANEP investe genuinamente nos jovens.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  const stats = [
    { value: "200+", label: "Estagiários por ano" },
    { value: "50", label: "Trainees formados" },
    { value: "85%", label: "Taxa de efetivação" },
    { value: "100+", label: "Bolsas ativas" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Talento Jovem"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Pessoas
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Talento Jovem
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Investimos no futuro através de programas que desenvolvem jovens 
              talentos e preparam os líderes de amanhã.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/pessoas/carreiras">Candidatar-me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-secondary">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-secondary-foreground">{stat.value}</p>
                <p className="text-secondary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Nossos Programas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos diferentes caminhos para jovens talentos iniciarem e 
              desenvolverem as suas carreiras.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-secondary"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                  <program.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {program.title}
                </h3>
                <p className="text-secondary font-medium text-sm mb-4">
                  Duração: {program.duration}
                </p>
                <p className="text-muted-foreground mb-4">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Building2 className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Parcerias com Universidades
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabalhamos em estreita colaboração com as principais instituições 
              de ensino superior de Angola.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {universities.map((uni, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-card rounded-full text-foreground font-medium shadow-sm"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Calendar className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Processo de Candidatura
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Candidatura Online", desc: "Submeta o seu CV e carta de motivação" },
                { step: "2", title: "Triagem", desc: "Análise das candidaturas pela equipa de RH" },
                { step: "3", title: "Entrevistas", desc: "Entrevistas com RH e gestores das áreas" },
                { step: "4", title: "Oferta", desc: "Proposta e início do programa" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
              Histórias de Sucesso
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-primary-foreground/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-primary-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-primary-foreground/70">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-primary-foreground/80 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Pronto para Começar a Sua Jornada?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore as nossas oportunidades para jovens e dê o primeiro passo 
            na sua carreira de sucesso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/pessoas/carreiras">Ver Oportunidades</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contato">Falar com RH</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TalentoJovem;
