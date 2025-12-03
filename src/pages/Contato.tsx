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
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const offices = [
    {
      city: "Luanda (Sede)",
      address: "Rua Major Kanhangulo, 290",
      phone: "+244 222 123 456",
      email: "luanda@gruposanep.ao",
    },
    {
      city: "Benguela",
      address: "Av. Norton de Matos, 158",
      phone: "+244 272 234 567",
      email: "benguela@gruposanep.ao",
    },
    {
      city: "Huambo",
      address: "Rua Dr. António Agostinho Neto, 42",
      phone: "+244 241 345 678",
      email: "huambo@gruposanep.ao",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Fale Conosco
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Contato
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
                
                <Button type="submit" size="lg" variant="secondary" className="w-full font-semibold">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensagem
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
                  Sábado: 08:00 - 12:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-muted">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-secondary mx-auto mb-4" />
            <p className="text-muted-foreground">
              Mapa interativo será exibido aqui
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;