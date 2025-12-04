import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoWhite from "../../img/logo-light.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-wide py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">
                Subscreva a nossa newsletter
              </h3>
              <p className="text-primary-foreground/70">
                Receba as últimas novidades e oportunidades do Grupo SANEP
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 w-full md:w-64"
              />
              <Button variant="secondary" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img src={logoWhite} alt="Grupo SANEP" className="w-100 h-12" />
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm t">
              Um grupo empresarial diversificado, comprometido com a excelência, 
              inovação e desenvolvimento sustentável em Angola e além.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Sobre Nós</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/sobre/quem-somos" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/sobre/historia" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link to="/sobre/organograma" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Organograma
                </Link>
              </li>
              <li>
                <Link to="/sobre/mensagem-pca" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Mensagem do PCA
                </Link>
              </li>
              <li>
                <Link to="/sustentabilidade" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Sustentabilidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Areas */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Negócios</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/negocios/agricultura" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Agricultura
                </Link>
              </li>
              <li>
                <Link to="/negocios/distribuicao" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Distribuição
                </Link>
              </li>
              <li>
                <Link to="/negocios/farmaceutica" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Farmacêutica
                </Link>
              </li>
              <li>
                <Link to="/negocios/financas" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Finanças
                </Link>
              </li>
              <li>
                <Link to="/negocios/industria" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Indústria
                </Link>
              </li>
              <li>
                <Link to="/negocios/servicos" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Serviços
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-secondary mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/70">
                Edifício ESCOM, R. Mal. Brós Tito nº35/37, 4º andar,<br />
                  Luanda - Angola
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/70">+244 926 159 196 </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/70">geral@gruposanep.co.ao</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} Grupo SANEP. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacidade" className="text-primary-foreground/60 text-sm hover:text-secondary transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="text-primary-foreground/60 text-sm hover:text-secondary transition-colors">
                Termos de Uso
              </Link>
              <Link to="/cookies" className="text-primary-foreground/60 text-sm hover:text-secondary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;