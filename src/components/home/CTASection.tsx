import { Link } from "react-router-dom";
import { ArrowRight, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container-wide relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Junte-se a Nós
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Faça Parte da Nossa Equipa
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              No Grupo SANEP, acreditamos que o nosso maior activo são as pessoas. 
              Procuramos talentos que partilhem a nossa visão de excelência e 
              compromisso com o desenvolvimento sustentável.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
                asChild
              >
                <Link to="/pessoas/carreiras">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Ver Oportunidades
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="font-semibold border-primary-foreground/30 text-primary-foreground texto hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link to="/pessoas/trabalhar-na-sanep">
                  <Users className="mr-2 h-5 w-5" />
                  Conhecer a Cultura
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">98%</div>
              <p className="text-primary-foreground/70 text-sm">
                Satisfação dos Colaboradores
              </p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">45%</div>
              <p className="text-primary-foreground/70 text-sm">
                Mulheres em Cargos de Liderança
              </p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">200+</div>
              <p className="text-primary-foreground/70 text-sm">
                Formações Anuais
              </p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">8</div>
              <p className="text-primary-foreground/70 text-sm">
                Anos de Experiência Média
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;