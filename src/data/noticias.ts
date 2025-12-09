export interface Noticia {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  featured?: boolean;
}

export const noticias: Noticia[] = [
  {
    id: "1",
    slug: "sanep-reconhecida-melhor-empregador-2024",
    title: "SANEP reconhecida como Melhor Empregador de Angola 2024",
    excerpt: "O Grupo SANEP foi distinguido pelo terceiro ano consecutivo como o melhor empregador de Angola, reconhecimento das nossas políticas de gestão de pessoas e desenvolvimento de talento.",
    content: `
      <p>O Grupo SANEP foi distinguido pelo terceiro ano consecutivo como o melhor empregador de Angola, reconhecimento das nossas políticas de gestão de pessoas e desenvolvimento de talento.</p>
      
      <p>Este prémio reflete o nosso compromisso contínuo com a criação de um ambiente de trabalho excecional, onde os nossos colaboradores podem crescer, desenvolver-se e alcançar o seu potencial máximo. A distinção reconhece as nossas práticas inovadoras em gestão de capital humano, programas de desenvolvimento profissional e políticas de bem-estar.</p>
      
      <h3>Compromisso com as Pessoas</h3>
      <p>Acreditamos que o sucesso do Grupo SANEP está diretamente ligado ao bem-estar e desenvolvimento dos nossos colaboradores. Por isso, investimos continuamente em:</p>
      <ul>
        <li>Programas de formação e desenvolvimento profissional</li>
        <li>Políticas de conciliação trabalho-vida pessoal</li>
        <li>Iniciativas de saúde e bem-estar</li>
        <li>Oportunidades de crescimento e progressão na carreira</li>
        <li>Ambiente de trabalho inclusivo e diversificado</li>
      </ul>
      
      <p>Este reconhecimento é um testemunho do trabalho árduo e dedicação de toda a equipa SANEP, e motiva-nos a continuar a melhorar e a inovar nas nossas práticas de gestão de pessoas.</p>
    `,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Prémios",
    date: "2024-11-28",
    author: "Equipa de Comunicação",
    featured: true,
  },
  {
    id: "2",
    slug: "programa-trainee-2025-abre-candidaturas",
    title: "Programa Trainee 2025 Abre Candidaturas",
    excerpt: "As inscrições para o programa trainee mais prestigiado de Angola estão abertas até 31 de janeiro.",
    content: `
      <p>O Grupo SANEP anuncia a abertura das candidaturas para o Programa Trainee 2025, uma oportunidade única para jovens talentos iniciarem a sua carreira numa das maiores empresas de Angola.</p>
      
      <h3>O Programa</h3>
      <p>O Programa Trainee SANEP é um programa de desenvolvimento de talentos de 18 meses, desenhado para recém-licenciados e jovens profissionais que procuram uma carreira desafiant e gratificante.</p>
      
      <h3>O que Oferecemos</h3>
      <ul>
        <li>Rotação por diferentes áreas de negócio do Grupo</li>
        <li>Mentoria de executivos seniores</li>
        <li>Formação técnica e comportamental intensiva</li>
        <li>Oportunidade de integração permanente</li>
        <li>Salário competitivo e pacote de benefícios completo</li>
      </ul>
      
      <h3>Requisitos</h3>
      <ul>
        <li>Licenciatura concluída nos últimos 3 anos</li>
        <li>Média final igual ou superior a 14 valores</li>
        <li>Fluência em português e inglês</li>
        <li>Disponibilidade para mobilidade geográfica</li>
        <li>Idade até 28 anos</li>
      </ul>
      
      <p>As candidaturas estão abertas até 31 de janeiro de 2025. Não perca esta oportunidade de fazer parte do futuro do Grupo SANEP!</p>
    `,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Recrutamento",
    date: "2024-11-15",
    author: "Recursos Humanos",
  },
  {
    id: "3",
    slug: "sanep-celebra-35-anos-evento-especial",
    title: "SANEP Celebra 35 Anos com Evento Especial",
    excerpt: "Mais de 5.000 colaboradores participaram das celebrações dos 35 anos do grupo em Luanda.",
    content: `
      <p>O Grupo SANEP celebrou os seus 35 anos de história com um evento memorável que reuniu mais de 5.000 colaboradores, parceiros e convidados especiais em Luanda.</p>
      
      <h3>Uma Celebração Histórica</h3>
      <p>O evento, realizado no Centro de Convenções de Talatona, marcou três décadas e meia de crescimento, inovação e contribuição para o desenvolvimento económico de Angola.</p>
      
      <p>Durante a cerimónia, foram homenageados colaboradores que fazem parte da família SANEP há mais de 20 anos, reconhecendo o seu compromisso e dedicação ao longo dos anos.</p>
      
      <h3>Momentos Destacados</h3>
      <ul>
        <li>Apresentação da visão estratégica para os próximos 5 anos</li>
        <li>Lançamento de novos programas de responsabilidade social</li>
        <li>Reconhecimento de colaboradores de longa data</li>
        <li>Apresentações culturais e entretenimento</li>
      </ul>
      
      <p>O Presidente do Conselho de Administração, Luís Troso, destacou a importância do trabalho em equipa e do compromisso com a excelência que caracteriza o Grupo SANEP desde a sua fundação.</p>
    `,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Eventos",
    date: "2024-11-10",
    author: "Equipa de Comunicação",
  },
  {
    id: "4",
    slug: "novo-centro-formacao-inaugurado",
    title: "Novo Centro de Formação Inaugurado",
    excerpt: "O novo campus de formação em Benguela vai formar 2.000 profissionais por ano.",
    content: `
      <p>O Grupo SANEP inaugurou o seu novo Centro de Formação em Benguela, uma infraestrutura moderna que vai formar mais de 2.000 profissionais por ano em diversas áreas técnicas e de gestão.</p>
      
      <h3>Infraestrutura de Excelência</h3>
      <p>O novo centro, com uma área de 5.000 metros quadrados, inclui:</p>
      <ul>
        <li>12 salas de formação equipadas com tecnologia de ponta</li>
        <li>Laboratórios especializados para formação técnica</li>
        <li>Biblioteca digital com mais de 10.000 recursos</li>
        <li>Espaços de coworking e colaboração</li>
        <li>Alojamento para formandos de outras províncias</li>
      </ul>
      
      <h3>Programas Disponíveis</h3>
      <p>O centro oferece programas de formação em:</p>
      <ul>
        <li>Gestão e Liderança</li>
        <li>Tecnologias de Informação</li>
        <li>Operações e Logística</li>
        <li>Vendas e Marketing</li>
        <li>Segurança e Qualidade</li>
      </ul>
      
      <p>Este investimento reforça o compromisso do Grupo SANEP com o desenvolvimento do capital humano e a capacitação dos seus colaboradores.</p>
    `,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Infraestrutura",
    date: "2024-11-05",
    author: "Equipa de Comunicação",
  },
  {
    id: "5",
    slug: "parceria-universidade-agostinho-neto",
    title: "Parceria com Universidade Agostinho Neto",
    excerpt: "Acordo vai criar 100 novas bolsas de estudo e estágios para estudantes de engenharia.",
    content: `
      <p>O Grupo SANEP assinou um protocolo de cooperação com a Universidade Agostinho Neto que vai criar 100 novas oportunidades de bolsas de estudo e estágios para estudantes de engenharia.</p>
      
      <h3>Compromisso com a Educação</h3>
      <p>Esta parceria reflete o compromisso do Grupo SANEP com o desenvolvimento da educação superior em Angola e a formação de futuros profissionais.</p>
      
      <h3>O que Inclui o Acordo</h3>
      <ul>
        <li>50 bolsas de estudo anuais para estudantes de engenharia</li>
        <li>50 vagas de estágio por ano em diferentes áreas do Grupo</li>
        <li>Programas de mentoria com profissionais seniores</li>
        <li>Oportunidades de integração após conclusão dos estudos</li>
        <li>Projetos de investigação conjuntos</li>
      </ul>
      
      <p>O reitor da Universidade Agostinho Neto destacou a importância desta parceria para o desenvolvimento dos estudantes e a criação de oportunidades de carreira.</p>
    `,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Parcerias",
    date: "2024-11-01",
    author: "Equipa de Comunicação",
  },
  {
    id: "6",
    slug: "dia-voluntariado-sanep-2024",
    title: "Dia do Voluntariado SANEP 2024",
    excerpt: "Colaboradores dedicaram mais de 10.000 horas a projetos sociais em todas as províncias.",
    content: `
      <p>O Dia do Voluntariado SANEP 2024 foi um sucesso, com colaboradores de todo o Grupo dedicando mais de 10.000 horas a projetos sociais em todas as províncias de Angola.</p>
      
      <h3>Impacto Social</h3>
      <p>Este ano, o foco foi em três áreas principais:</p>
      <ul>
        <li>Educação: Apoio a escolas e bibliotecas comunitárias</li>
        <li>Saúde: Campanhas de sensibilização e rastreios</li>
        <li>Meio Ambiente: Ações de limpeza e reflorestação</li>
      </ul>
      
      <h3>Projetos Realizados</h3>
      <p>Em Luanda, os voluntários renovaram três escolas primárias. Em Benguela, organizaram uma campanha de doação de sangue. Em Huambo, plantaram mais de 1.000 árvores em áreas degradadas.</p>
      
      <p>O compromisso com a responsabilidade social é um dos valores fundamentais do Grupo SANEP, e este dia de voluntariado demonstra o espírito de solidariedade que caracteriza a nossa equipa.</p>
    `,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Responsabilidade Social",
    date: "2024-10-25",
    author: "Equipa de Comunicação",
  },
  {
    id: "7",
    slug: "programa-saude-mental-lancado",
    title: "Programa de Saúde Mental Lançado",
    excerpt: "Novo programa oferece apoio psicológico gratuito a todos os colaboradores e familiares.",
    content: `
      <p>O Grupo SANEP lançou um programa pioneiro de saúde mental que oferece apoio psicológico gratuito a todos os colaboradores e seus familiares.</p>
      
      <h3>Compromisso com o Bem-Estar</h3>
      <p>Reconhecendo a importância da saúde mental, o Grupo SANEP criou este programa abrangente que inclui:</p>
      <ul>
        <li>Consultas psicológicas gratuitas</li>
        <li>Linha de apoio 24/7</li>
        <li>Workshops sobre gestão de stress e ansiedade</li>
        <li>Programas de mindfulness e bem-estar</li>
        <li>Apoio em situações de crise</li>
      </ul>
      
      <h3>Acesso Fácil</h3>
      <p>O programa está disponível através de:</p>
      <ul>
        <li>Plataforma digital com agendamento online</li>
        <li>Consultas presenciais e por videoconferência</li>
        <li>App móvel com recursos de autoajuda</li>
      </ul>
      
      <p>Este programa reforça o compromisso do Grupo SANEP com o bem-estar integral dos seus colaboradores e suas famílias.</p>
    `,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Bem-Estar",
    date: "2024-10-20",
    author: "Recursos Humanos",
  },
  {
    id: "8",
    slug: "sanep-expande-operacoes-mocambique",
    title: "Grupo expande operações para Moçambique",
    excerpt: "Nova subsidiária irá atuar no setor de distribuição farmacêutica, reforçando presença na região austral.",
    content: `
      <p>O Grupo SANEP anuncia a expansão das suas operações para Moçambique, com a criação de uma nova subsidiária focada na distribuição farmacêutica.</p>
      
      <h3>Expansão Estratégica</h3>
      <p>Esta expansão representa um marco importante na estratégia de crescimento regional do Grupo SANEP, reforçando a nossa presença na região austral de África.</p>
      
      <h3>Oportunidades</h3>
      <p>A nova subsidiária em Moçambique vai:</p>
      <ul>
        <li>Criar mais de 100 novos postos de trabalho</li>
        <li>Distribuir produtos farmacêuticos em todo o país</li>
        <li>Estabelecer parcerias com farmácias e hospitais</li>
        <li>Investir em infraestrutura logística moderna</li>
      </ul>
      
      <p>Esta expansão alinha-se com a nossa missão de melhorar o acesso a cuidados de saúde de qualidade em toda a região.</p>
    `,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Expansão",
    date: "2024-11-15",
    author: "Equipa de Comunicação",
  },
  {
    id: "9",
    slug: "programa-agricultura-sustentavel",
    title: "Iª Reunião Extraordinária do Conselho de Administração do Grupo SANEP de 2025",
    excerpt: "Iniciativa visa reduzir emissões de carbono e promover práticas agrícolas regenerativas em todas as operações.",
    content: `
      <p>Nesta sexta-feira, 17, realizamos a primeira Reunião Extraordinária do Conselho de Administração do Grupo SANEP. Este encontro foi marcado por discussões estratégicas e tomadas de decisões essenciais para o fortalecimento do crescimento e a promoção da inovação em todas as nossas unidades de negócios.</p>
      <p>A reunião foi presidida pelo Presidente do Conselho de Administração, Luís Troso, e contou com a presença de todos os membros do Conselho, bem como de representantes das diferentes unidades de negócios do Grupo.
      </p>
      <p>As principais discussões centraram-se no planeamento estratégico para o ano de 2026, incluindo a definição de metas claras para o crescimento da empresa e a promoção da inovação em todas as áreas.
      </p>
      <p>Foi também abordada a necessidade de fortalecer a gestão de riscos e a implementação de medidas de segurança em todas as operações, garantindo a estabilidade e a sustentabilidade do Grupo.</p>
      <h3>Metas Ambientais</h3>
      <p>O programa estabelece metas ambiciosas para 2025:</p>
     
      
      <p>Este programa reforça o compromisso do Grupo SANEP com a sustentabilidade e a responsabilidade ambiental.</p>
    `,
    image: "https://gruposanep.co.ao/wp-content/uploads/2025/01/CapaN-2.webp",
    category: "Sustentabilidade",
    date: "2024-11-28",
    author: "Equipa de Comunicação",
  },
];

export const getNoticiaBySlug = (slug: string): Noticia | undefined => {
  return noticias.find(noticia => noticia.slug === slug);
};

export const getNoticiasByCategory = (category: string): Noticia[] => {
  if (category === "Todos") return noticias;
  return noticias.filter(noticia => noticia.category === category);
};

export const getFeaturedNoticias = (): Noticia[] => {
  return noticias.filter(noticia => noticia.featured);
};

export const getRecentNoticias = (limit: number = 6): Noticia[] => {
  return [...noticias]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};


