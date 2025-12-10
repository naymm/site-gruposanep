import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";


import logoWhite from "../../img/logo-light.png";
import logoDark from "../../img/logo-dark.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutItems = [
    { title: "Quem Somos", href: "/sobre/quem-somos" },
    { title: "Organograma", href: "/sobre/organograma" },
    { title: "Nossa História", href: "/sobre/historia" },
    { title: "Mensagem do PCA", href: "/sobre/mensagem-pca" },
  ];

  const businessItems = [
    { title: "Agricultura", href: "/negocios/agricultura" },
    { title: "Distribuição", href: "/negocios/distribuicao" },
    { title: "Farmacêutica", href: "/negocios/farmaceutica" },
    { title: "Finanças", href: "/negocios/financas" },
    { title: "Imobiliária", href: "/negocios/imobiliaria" },
    { title: "Indústria", href: "/negocios/industria" },
    { title: "Serviços", href: "/negocios/servicos" },
  ];

  const peopleItems = [
    { title: "Trabalhar na SANEP", href: "/pessoas/trabalhar-na-sanep" },
    { title: "Talento Jovem", href: "/pessoas/talento-jovem" },
    { title: "As Nossas Pessoas", href: "/pessoas/nossas-pessoas" },
    { title: "Oportunidades e Carreira", href: "/pessoas/carreiras" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
          <img 
            src={isScrolled ? logoDark : logoWhite}
            alt="SANEP Logotipo"
            className="h-10 w-auto transition-all duration-300 logotipo"
          />
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                        isScrolled
                          ? "text-foreground hover:bg-muted"
                          : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent",
                      isScrolled
                        ? "text-foreground hover:bg-muted"
                        : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    Sobre
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-2">
                      {aboutItems.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent",
                      isScrolled
                        ? "text-foreground hover:bg-muted"
                        : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    Negócios
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-2">
                      {businessItems.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  {/* <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent",
                      isScrolled
                        ? "text-foreground hover:bg-muted"
                        : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    Pessoas
                  </NavigationMenuTrigger> */}
                  {/* <NavigationMenuContent>
                    <ul className="grid w-56 gap-1 p-2">
                      {peopleItems.map((item) => (
                        <li key={item.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent> */}
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/noticias">
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                        isScrolled
                          ? "text-foreground hover:bg-muted"
                          : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      )}
                    >
                      Notícias
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/sustentabilidade">
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                        isScrolled
                          ? "text-foreground hover:bg-muted"
                          : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      )}
                    >
                      Sustentabilidade
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contato">
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                        isScrolled
                          ? "text-foreground hover:bg-muted"
                          : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      )}
                    >
                      Contacto
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              variant="secondary"
              size="sm"
              className="ml-4 font-semibold"
              asChild
            >
              <Link to="/pessoas/carreiras">Trabalhe Connosco</Link>
            </Button>

            <LanguageSelector
              variant="ghost"
              className={cn(
                "ml-2",
                isScrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
              )}
            />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              isScrolled
                ? "text-foreground hover:bg-muted"
                : "text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-card border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col space-y-1">
              <Link
                to="/"
                className="px-4 py-3 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Sobre</div>
              {aboutItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-8 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Negócios</div>
              {businessItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-8 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Pessoas</div>
              {peopleItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-8 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              <Link
                to="/noticias"
                className="px-4 py-3 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Notícias
              </Link>

              <Link
                to="/sustentabilidade"
                className="px-4 py-3 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sustentabilidade
              </Link>

              <Link
                to="/contato"
                className="px-4 py-3 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contato
              </Link>

              <div className="px-4 pt-4 space-y-3">
                <Button variant="secondary" className="w-full font-semibold" asChild>
                  <Link to="/pessoas/carreiras" onClick={() => setIsOpen(false)}>
                    Trabalhe Conosco
                  </Link>
                </Button>
                
                <div className="flex items-center justify-between px-2 py-2 border-t border-border">
                  <span className="text-sm font-medium text-muted-foreground">Idioma</span>
                  <LanguageSelector variant="ghost" className="text-foreground" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;