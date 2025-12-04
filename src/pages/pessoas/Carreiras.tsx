import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";

const Carreiras = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Assistente de Marketing",
      area: "Agricultura",
      location: "Luanda",
      type: "Tempo Integral",
      posted: "2 dias atrás",
      description: "Responsável pela gestão de redes sociais e campanhas de marketing.",
    },
    {
      id: 2,
      title: "Técnico de Planeamento",
      area: "Distribuição",
      location: "Luanda",
      type: "Tempo Integral",
      posted: "5 dias atrás",
      description: "Responsável pela gestão de projectos e planeamento de operações.",
    },
    {
      id: 3,
      title: "Técnico de Compliance",
      area: "Farmacêutica",
      location: "Luanda",
      type: "Tempo Integral",
      posted: "1 semana atrás",
      description: "Responsável pela gestão de compliance e regulamentação.",
    },
    {
      id: 4,
      title: "Analista Financeiro",
      area: "Finanças",
      location: "Luanda",
      type: "Tempo Integral",
      posted: "3 dias atrás",
      description: "Análise financeira e suporte à tomada de decisão estratégica.",
    },
    {
      id: 5,
      title: "Engenheiro de Produção",
      area: "Indústria",
      location: "Viana",
      type: "Tempo Integral",
      posted: "1 dia atrás",
      description: "Otimização de processos produtivos e gestão de qualidade industrial.",
    },
    {
      id: 6,
      title: "Especialista em RH",
      area: "Serviços",
      location: "Luanda",
      type: "Tempo Integral",
      posted: "4 dias atrás",
      description: "Gestão de processos de recrutamento e desenvolvimento de talento.",
    },
  ];

  const areas = ["all", "Agricultura", "Distribuição", "Farmacêutica", "Finanças", "Indústria", "Serviços"];
  const locations = ["all", "Luanda", "Benguela", "Malanje", "Viana", "Huambo"];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "all" || job.area === selectedArea;
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
    return matchesSearch && matchesArea && matchesLocation;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Carreiras
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mt-2 mb-6">
              Oportunidades de Carreira
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Junte-se a uma equipa de excelência e construa o seu futuro no 
              Grupo SANEP. Descubra as oportunidades disponíveis.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-muted/30 sticky top-20 z-40 border-b border-border">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Pesquisar por cargo ou palavras-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Área de Negócio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Áreas</SelectItem>
                {areas.slice(1).map((area) => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Localizações</SelectItem>
                {locations.slice(1).map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="mb-8">
            <p className="text-muted-foreground">
              {filteredJobs.length} oportunidade{filteredJobs.length !== 1 ? "s" : ""} encontrada{filteredJobs.length !== 1 ? "s" : ""}
            </p>
          </div>
          
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-border hover:border-secondary group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <Badge variant="secondary">{job.area}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {job.posted}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="secondary" className="shrink-0">
                    Candidatar-se
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhuma oportunidade encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              Não encontrou a vaga ideal?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Envie a sua candidatura espontânea. Mantemos uma base de dados de 
              talentos e entramos em contato quando surgir uma oportunidade adequada 
              ao seu perfil.
            </p>
            <Button size="lg" variant="secondary" className="font-semibold">
              Enviar CV Espontâneo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Carreiras;