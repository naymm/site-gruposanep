import { Link } from "react-router-dom";
import { 
  Wheat, 
  Truck, 
  Pill, 
  Landmark, 
  Factory, 
  Briefcase,
  ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessAreaProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  index: number;
}

const BusinessAreaCard = ({ icon, title, description, href, index }: BusinessAreaProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative p-8 rounded-xl bg-card border border-border hover:border-secondary hover:shadow-xl transition-all duration-300 overflow-hidden",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative">
        <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center text-secondary-foreground mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        
        <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
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
      icon: <Wheat size={24} />,
      title: "Agricultura",
      description: "Produção agrícola sustentável e inovadora, desde culturas tradicionais até técnicas modernas de agricultura de precisão.",
      href: "/negocios/agricultura",
    },
    {
      icon: <Truck size={24} />,
      title: "Distribuição",
      description: "Rede logística abrangente que conecta produtores e consumidores em todo o território nacional e internacional.",
      href: "/negocios/distribuicao",
    },
    {
      icon: <Pill size={24} />,
      title: "Farmacêutica",
      description: "Distribuição e comercialização de medicamentos e produtos de saúde, garantindo acesso a cuidados de qualidade.",
      href: "/negocios/farmaceutica",
    },
    {
      icon: <Landmark size={24} />,
      title: "Finanças",
      description: "Serviços financeiros diversificados que apoiam o crescimento empresarial e o desenvolvimento económico.",
      href: "/negocios/financas",
    },
    {
      icon: <Factory size={24} />,
      title: "Indústria",
      description: "Capacidade industrial diversificada, desde transformação de matérias-primas até manufatura avançada.",
      href: "/negocios/industria",
    },
    {
      icon: <Briefcase size={24} />,
      title: "Serviços",
      description: "Soluções empresariais integradas que suportam operações em múltiplos setores de atividade.",
      href: "/negocios/servicos",
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <BusinessAreaCard key={area.title} {...area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessAreasSection;