import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import luanda from "../../img/outras/luanda.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${luanda})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide py-32 mt-20">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-6 animate-fade-in">
            Excelência em Diversificação
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Construindo o Futuro de{" "}
            <span className="text-gradient">Angola</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-fade-in-up delay-100">
            O Grupo SANEP é um conglomerado empresarial líder, actuando nos sectores 
            de agricultura, distribuição, farmacêutica, finanças, Imobiliária, indústria e serviços, 
            impulsionando o desenvolvimento económico sustentável.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <Button
              size="lg"
              variant="secondary"
              className="text-base font-semibold"
              asChild
            >
              <Link to="/sobre/quem-somos">
                Conheça-nos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="ghost"
              className="text-base font-semibold bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 textoBtn-bugado"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Vídeo Institucional
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;