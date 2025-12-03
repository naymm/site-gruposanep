import { Link } from "react-router-dom";

interface MainBusinessProps {
  image: string;
  logo: string;
  href?: string;
  index: number;
}

const MainBusinessCard = ({ image, logo, href, index }: MainBusinessProps) => {
  const content = (
    <div
      className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-cover bg-center cursor-pointer"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay gradient - darker for better text visibility */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/90 to-[#222222]/40 group-hover:from-[#222222] group-hover:via-[#222222]/95 group-hover:to-[#222222]/50 transition-all duration-300" 
      />
      
      {/* Logo/Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="text-white">
          <div className="font-bold text-base md:text-lg leading-tight whitespace-pre-line drop-shadow-lg">
            {logo}
          </div>
        </div>
      </div>
      
      {/* Hover effect - subtle scale */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-white/5" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="block animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {content}
    </div>
  );
};

const MainBusinessesSection = () => {
  const businesses = [
    {
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "Sanep Vida\nIndústria Farmacêutica",
      href: "/negocios/farmaceutica",
    },
    {
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "Crediangolar\nSociedade de Microcrédito\nby Rimarca",
      href: "/negocios/financas",
    },
    {
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "AGROAWA\nComercialização de Produtos Agrícolas",
      href: "/negocios/agricultura",
    },
    {
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "FAZENDA KABANGUELA\nProdução e Comercialização\nAgropecuária",
      href: "/negocios/agricultura",
    },
    {
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "SANEP NUTRIÇÃO ANIMAL\nSuplementos Vitamínicos\ne Minerais",
      href: "/negocios/agricultura",
    },
    {
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "S sanep\nInfraestruturas",
      href: "/negocios/servicos",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Title with line */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Principais Negócios
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: '#222222' }}></div>
          </div>
        </div>
        
        {/* Grid of business cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business, index) => (
            <MainBusinessCard
              key={index}
              {...business}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainBusinessesSection;

