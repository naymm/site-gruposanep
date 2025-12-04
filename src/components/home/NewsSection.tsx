import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRecentNoticias } from "@/data/noticias";

interface NewsCardProps {
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
}

const NewsCard = ({ image, category, date, title, excerpt, href }: NewsCardProps) => {
  return (
    <article className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
          {category}
        </Badge>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Calendar size={14} className="mr-2" />
          {date}
        </div>
        
        <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <Link
          to={href}
          className="inline-flex items-center text-secondary font-semibold text-sm group-hover:gap-2 transition-all"
        >
          Ler mais
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

const NewsSection = () => {
  const recentNoticias = getRecentNoticias(3);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const news = recentNoticias.map(noticia => ({
    image: noticia.image,
    category: noticia.category,
    date: formatDate(noticia.date),
    title: noticia.title,
    excerpt: noticia.excerpt,
    href: `/noticias/${noticia.slug}`,
  }));

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Novidades
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
              Últimas Notícias
            </h2>
          </div>
          
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link to="/noticias">
              Ver todas as notícias
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;