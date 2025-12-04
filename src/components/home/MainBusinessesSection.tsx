

import { Link } from "react-router-dom";

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

type HighlightSize = "large" | "medium" | "normal";

interface MainBusinessProps {
  image: string;
  logo: string;
  href?: string;
  index: number;
  name: string;
  category?: string;
  percent?: string;
  size?: HighlightSize;
}

const MainBusinessCard = ({
  image,
  logo,
  href,
  index,
  name,
  category,
  percent,
  size = "normal",
}: MainBusinessProps) => {
  // Alturas coerentes para evitar “buracos”
  const heightClass =
    size === "large"
      ? "h-[260px] md:h-[320px] lg:h-[360px]" // altura da faixa de destaques
      : size === "medium"
      ? "h-[124px] md:h-[154px] lg:h-[172px]"  // ~metade da grande, ajustado ao gap da coluna
      : "h-[160px] md:h-[200px] lg:h-[220px]"; // demais cartões

  const content = (
    <div
      className={`relative group overflow-hidden rounded-xl bg-cover bg-center cursor-pointer ${heightClass}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/90 to-[#222222]/40 
        group-hover:from-[#222222] group-hover:via-[#222222]/95 group-hover:to-[#222222]/50 
        transition-all duration-300"
      />

      {/* Categoria */}
      {category && (
        <div className="absolute top-4 left-4 z-10">
          <span className="text-xs md:text-sm uppercase tracking-wide text-white/80">
            
          </span>
        </div>
      )}

      {/* Rodapé */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
        <img
          src={logo}
          alt={name}
          className={`h-12 md:h-14 w-auto drop-shadow-lg logo-empresas 
            logo-${name.toLowerCase().replace(/\s/g, "-")}`}
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs md:text-sm uppercase text-white/80">
           
          </span>
          {percent && (
            <span className="text-xs md:text-sm font-semibold text-white/90">
              {percent}
            </span>
          )}
        </div>
      </div>

      {/* Hover efeito */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-white/5" />
      </div>
    </div>
  );

  const wrapper = (
    <div
      className="animate-fade-in-up w-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {content}
    </div>
  );

  return href ? (
    <Link to={href} className="block w-full" target="_blank">
      {wrapper}
    </Link>
  ) : (
    wrapper
  );
};

const MainBusinessesSection = () => {
  // Três destaques: [grande, médio, médio]
  const FEATURED_INDICES = [0, 1, 2];

  const businesses = [
    {
      image:
        "https://cdn.pixabay.com/photo/2022/07/18/19/23/hand-7330658_960_720.jpg",
      logo: agroawa,
      name: "Agroawa",
      href: "https://agroawa.co.ao/",
      category: "Retalho Alimentar, Saúde e Bem-estar",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2014/08/03/23/41/house-409451_960_720.jpg",
      logo: cooperativa,
      name: "Cooperativa",
      href: "",
      category: "Eletrónica",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/10/09/19/19/coins-1726618_960_720.jpg",
      logo: crediangolar,
      name: "Crediangolar",
      href: "https://crediangolar.co.ao/",
      category: "Serviços Financeiros",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2025/08/17/07/43/tractor-9779346_960_720.jpg",
      logo: fazenda,
      name: "Fazenda",
      href: "",
      category: "Agronegócio",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2021/11/20/09/45/pforphoto-6811307_960_720.jpg",
      logo: fibrex,
      name: "Fibrex",
      href: "",
      category: "Materiais",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2017/01/31/20/48/wine-2027177_960_720.jpg",
      logo: food,
      name: "Food Factory",
      href: "",
      category: "Indústria Alimentar",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2019/01/19/02/49/hercilio-luz-bridge-3941115_960_720.jpg",
      logo: regadio,
      name: "Regadio",
      href: "https://www.regadio-ao.com/",
      category: "Infraestruturas",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2014/08/05/03/19/bulldozer-410118_960_720.jpg",
      logo: saneplda,
      name: "Sanep Lda",
      href: "",
      category: "Serviços",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/02/01/16/26/animal-7760773_960_720.jpg",
      logo: sanepnutricao,
      name: "Sanep Nutricao",
      href: "",
      category: "Nutrição",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_960_720.jpg",
      logo: sanepvida,
      name: "Sanep Vida",
      href: "https://sanepvida.co.ao/",
      category: "Cuidados e Bem-estar",
    },
  ];

  const [firstFeatured, secondFeatured, thirdFeatured] = FEATURED_INDICES.map(
    (i) => businesses[i]
  );
  const others = businesses.filter((_, idx) => !FEATURED_INDICES.includes(idx));

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Título */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Principais Negócios
            </h2>
            <div className="flex-1 h-px bg-[#222222]" />
          </div>
        </div>

        {/* 3 destaques sem buracos */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Esquerda: 1 grande com altura fixa no desktop */}
          <div className="lg:basis-1/2">
            <MainBusinessCard {...firstFeatured} index={0} size="large" />
          </div>

          {/* Direita: coluna com 2 médios que somam a altura do grande */}
          <div className="lg:basis-1/2 flex flex-col gap-6 lg:h-[360px]">
            {/* Cada um ocupa metade da coluna */}
            <div className="flex-1 min-h-0">
              <MainBusinessCard {...secondFeatured} index={1} size="medium" />
            </div>
            <div className="flex-1 min-h-0">
              <MainBusinessCard {...thirdFeatured} index={2} size="medium" />
            </div>
          </div>
        </div>

        {/* Grade dos demais — larguras com calc considerando gap-6 (24px) */}
        <div className="flex flex-wrap gap-6">
          {others.map((business, i) => (
            <div
              key={business.name}
              className="
                w-full 
                sm:flex-[1_1_calc(50%_-_12px)]        /* 2 colunas (gap-6/2) */
                lg:flex-[1_1_calc(33.333%_-_16px)]    /* 3 colunas (aprox. distribuição do gap) */
              "
            >
              <MainBusinessCard {...business} index={i + 3} size="normal" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default MainBusinessesSection;
