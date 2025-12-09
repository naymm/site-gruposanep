import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuemSomos from "./pages/sobre/QuemSomos";
import Historia from "./pages/sobre/Historia";
import Organograma from "./pages/sobre/Organograma";
import MensagemPCA from "./pages/sobre/MensagemPCA";
import Negocios from "./pages/negocios/Negocios";
import Agricultura from "./pages/negocios/Agricultura";
import Distribuicao from "./pages/negocios/Distribuicao";
import Farmaceutica from "./pages/negocios/Farmaceutica";
import Financas from "./pages/negocios/Financas";
import Industria from "./pages/negocios/Industria";
import Servicos from "./pages/negocios/Servicos";
import Imobiliaria from "./pages/negocios/Imobiliaria";
import TrabalharNaSanep from "./pages/pessoas/TrabalharNaSanep";
import TalentoJovem from "./pages/pessoas/TalentoJovem";
import NossasPessoas from "./pages/pessoas/NossasPessoas";
import Carreiras from "./pages/pessoas/Carreiras";
import Novidades from "./pages/pessoas/Novidades";
import Noticias from "./pages/Noticias";
import NoticiaSingle from "./pages/NoticiaSingle";
import Contato from "./pages/Contato";
import Sustentabilidade from "./pages/Sustentabilidade";
import NotFound from "./pages/NotFound";
import NoticiasAdmin from "./pages/admin/NoticiasAdmin";
import NoticiaNova from "./pages/admin/NoticiaNova";
import NoticiaEditar from "./pages/admin/NoticiaEditar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre/quem-somos" element={<QuemSomos />} />
          <Route path="/sobre/historia" element={<Historia />} />
          <Route path="/sobre/organograma" element={<Organograma />} />
          <Route path="/sobre/mensagem-pca" element={<MensagemPCA />} />
          <Route path="/negocios" element={<Negocios />} />
          <Route path="/negocios/agricultura" element={<Agricultura />} />
          <Route path="/negocios/distribuicao" element={<Distribuicao />} />
          <Route path="/negocios/farmaceutica" element={<Farmaceutica />} />
          <Route path="/negocios/financas" element={<Financas />} />
          <Route path="/negocios/industria" element={<Industria />} />
          <Route path="/negocios/servicos" element={<Servicos />} />
          <Route path="/negocios/imobiliaria" element={<Imobiliaria />} />
          <Route path="/pessoas/trabalhar-na-sanep" element={<TrabalharNaSanep />} />
          <Route path="/pessoas/talento-jovem" element={<TalentoJovem />} />
          <Route path="/pessoas/nossas-pessoas" element={<NossasPessoas />} />
          <Route path="/pessoas/carreiras" element={<Carreiras />} />
          <Route path="/pessoas/novidades" element={<Novidades />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:slug" element={<NoticiaSingle />} />
          <Route path="/sustentabilidade" element={<Sustentabilidade />} />
          <Route path="/contato" element={<Contato />} />
          {/* Rotas Administrativas */}
          <Route path="/admin/noticias" element={<NoticiasAdmin />} />
          <Route path="/admin/noticias/nova" element={<NoticiaNova />} />
          <Route path="/admin/noticias/editar/:id" element={<NoticiaEditar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
