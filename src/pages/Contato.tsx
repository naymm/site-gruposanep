import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contato = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Mapear valores do select para textos legíveis
  const getSubjectLabel = (value: string) => {
    const subjects: Record<string, string> = {
      general: "Informação Geral",
      partnership: "Parceria de Negócio",
      careers: "Carreiras",
      press: "Imprensa",
      other: "Outro",
    };
    return subjects[value] || value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validar variáveis de ambiente
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Erro de configuração",
        description: "O serviço de email não está configurado corretamente. Por favor, entre em contato diretamente.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Preparar parâmetros do template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Não informado",
        subject: getSubjectLabel(formData.subject),
        message: formData.message,
        to_email: "geral@gruposanep.co.ao", // Email de destino
      };

      // Enviar email via EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });

      // Limpar formulário
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato diretamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const offices = [
    {
      city: "Luanda (Sede)",
      address: "Edifício ESCOM, R. Mal. Brós Tito nº35/37, 4º andar, Luanda",
      phone: "+244 926 159 196",
      email: "geral@gruposanep.co.ao",
    },
    {
      city: "Complexo Industrial",
      address: "Vila Flor, Av. Comandante Fidel de Castro Cruz, Luanda, Angola",
      phone: "+244 926 159 196",
      email: "geral@gruposanep.co.ao",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Fale Connosco
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Contacto
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Estamos à sua disposição para esclarecer dúvidas, receber sugestões 
              ou estabelecer parcerias de negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                Envie-nos uma mensagem
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Informação Geral</SelectItem>
                        <SelectItem value="partnership">Parceria de Negócio</SelectItem>
                        <SelectItem value="careers">Carreiras</SelectItem>
                        <SelectItem value="press">Imprensa</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="secondary" 
                  className="w-full font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                Nossos Escritórios
              </h2>
              
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 shadow-md border border-border hover:border-secondary transition-colors"
                  >
                    <h3 className="font-semibold text-lg text-foreground mb-4">
                      {office.city}
                    </h3>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-secondary flex-shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-secondary flex-shrink-0" />
                        <span>{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-muted rounded-xl p-6">
                <div className="flex items-center gap-3 text-foreground mb-2">
                  <Clock size={18} className="text-secondary" />
                  <span className="font-semibold">Horário de Funcionamento</span>
                </div>
                <p className="text-muted-foreground ml-8">
                  Segunda a Sexta: 08:00 - 17:00<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-muted">
        <div className="w-full h-full flex items-center justify-center">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.6903220321856!2d13.241059198058855!3d-8.813886470112593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f3651faf00d5%3A0xa0a91f6638810195!2sGRUPO%20SANEP!5e0!3m2!1spt-PT!2sao!4v1764807265816!5m2!1spt-PT!2sao" width="100%" height="450"></iframe>
          
        </div>
      </section>
    </Layout>
  );
};

export default Contato;