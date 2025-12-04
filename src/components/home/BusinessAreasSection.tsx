import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Import das imagens
import agricultura from "../../img/holdings/agricultura.png";
import distribuicao from "../../img/holdings/distribuicao.png";
import farmaceutica from "../../img/holdings/farmaceutica.png";
import financeira from "../../img/holdings/financas.png";
import imobiliaria from "../../img/holdings/imobiliaria.png";
import industria from "../../img/holdings/industria.png";
import servicos from "../../img/holdings/servicos.png";

interface BusinessAreaProps {
  title: string;
  description: string;
  href: string;
  index: number;
  image: string;
}

const BusinessAreaCard = ({ image, title, description, href, index }: BusinessAreaProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative p-8 rounded-xl bg-card border border-border hover:border-secondary hover:shadow-xl transition-all duration-300 overflow-hidden",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative flex flex-col items-center text-center">
        {/* Imagem menor */}
        <img 
          src={image} 
          alt={title} 
          className="w-44 h-24 object-contain mb-6 group-hover:scale-105 transition-transform duration-500" 
        />

        <p className="text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        
        <span className="inline-flex items-center text-secondary font-semibold text-sm group-hover:gap-2 transition-all">
          Saber mais
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
};

const BusinessAreasSection = () => {
  const areas = [
    {
      image: agricultura,
      title: "Agriculturas",
      description: "Produção agrícola sustentável e inovadora, desde culturas tradicionais até técnicas modernas de agricultura de precisão.",
      href: "/negocios/agricultura",
    },
    {
      image: distribuicao,
      title: "Distribuição",
      description: "Rede logística abrangente que conecta produtores e consumidores em todo o território nacional e internacional.",
      href: "/negocios/distribuicao",
    },
    {
      image: farmaceutica,
      title: "Farmacêutica",
      description: "Distribuição e comercialização de medicamentos e produtos de saúde, garantindo acesso a cuidados de qualidade.",
      href: "/negocios/farmaceutica",
    },
    {
      image: financeira,
      title: "Finanças",
      description: "Serviços financeiros diversificados que apoiam o crescimento empresarial e o desenvolvimento económico.",
      href: "/negocios/financas",
    },
    {
      image: industria,
      title: "Indústria",
      description: "Capacidade industrial diversificada, desde transformação de matérias-primas até manufatura avançada.",
      href: "/negocios/industria",
    },
    {
      image: servicos,
      title: "Serviços",
      description: "Soluções empresariais integradas que suportam operações em múltiplos setores de atividade.",
      href: "/negocios/servicos",
    },
    {
      image: imobiliaria,
      title: "Imobiliária",
      description: "Gestão e desenvolvimento de projetos imobiliários que promovem inovação e sustentabilidade.",
      href: "/negocios/imobiliaria",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Áreas de Negócio
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-4">
            Diversificação e Excelência
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Atuamos em setores estratégicos da economia, criando sinergias que 
            potencializam resultados e geram valor sustentável para todos os stakeholders.
          </p>
        </div>
        
        {/* Grid ajustada para centralizar a última caixa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center caixas">
          {areas.map((area, index) => (
            <BusinessAreaCard key={area.title} {...area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessAreasSection;
