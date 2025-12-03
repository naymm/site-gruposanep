import { Link } from "react-router-dom";

// IMAGENS DAS EMPRESAS:
import agroawa from "../../img/empresas/agroawa.png";
import cooperativa from "../../img/empresas/cooperativa.png";
import crediangolar from "../../img/empresas/crediangolar.png";
import fazenda from "../../img/empresas/fazenda.png";
import fibrex from "../../img/empresas/fibrex.png";
import food from "../../img/empresas/food-factory.png";
import regadio from "../../img/empresas/regadio.png";
import saneplda from "../../img/empresas/sanep-lda.png";
import sanepnutricao from "../../img/empresas/sanep-nutricao.png";
import sanepvida from "../../img/empresas/sanep-vida.png";

interface MainBusinessProps {
  image: string;
  logo: string; // agora recebe a imagem importada
  href?: string;
  index: number;
}

const MainBusinessCard = ({ image, logo, href, index }: MainBusinessProps) => {
  const content = (
    <div
      className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-cover bg-center cursor-pointer"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/90 to-[#222222]/40 
        group-hover:from-[#222222] group-hover:via-[#222222]/95 group-hover:to-[#222222]/50 
        transition-all duration-300"
      />

      {/* Logo em imagem */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <img
          src={logo}
          alt="Logo da empresa"
          className="h-12 md:h-14 w-auto drop-shadow-lg brightness-0 invert"
        />
      </div>

      {/* Hover effect */}
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
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
      logo: agroawa,
      href: "/negocios/farmaceutica",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
      logo: cooperativa,
      href: "/negocios/financas",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
      logo: crediangolar,
      href: "/negocios/agricultura",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
      logo: fazenda,
      href: "/negocios/agricultura",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80",
      logo: fibrex,
      href: "/negocios/agricultura",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
      logo: food,
      href: "/negocios/servicos",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
      logo: regadio,
      href: "/negocios/servicos",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
      logo: saneplda,
      href: "/negocios/servicos",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
      logo: sanepnutricao,
      href: "/negocios/servicos",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
      logo: sanepvida,
      href: "/negocios/servicos",
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Title */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Principais Negócios
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: "#222222" }} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business, index) => (
            <MainBusinessCard key={index} {...business} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainBusinessesSection;
