import type {
  BrandProfile,
  BusinessProfile,
  ContentPost,
  WorkspaceSettings,
} from "@/types/pulsa";

export const DEMO_BUSINESS: BusinessProfile = {
  name: "Clínica Aura Estética",
  instagramHandle: "@clinica.aura",
  segment: "Clínica & Bem-estar",
  city: "São Paulo, SP",
  description:
    "Clínica especializada em estética facial, cuidados com a pele e protocolos naturais de rejuvenescimento com atendimento humanizado.",
  targetAudience: {
    ageRange: "25 a 48 anos",
    interests: "Skincare, autocuidado, saúde preventiva e beleza natural",
    painPoints:
      "Falta de tempo para rotinas complexas, dúvidas sobre procedimentos seguros e busca por resultados naturais",
  },
  products: [
    {
      id: "prod-1",
      name: "Limpeza de Pele Botânica",
      category: "Facial",
      highlight: "Protocolo suave sem vermelhidão",
    },
    {
      id: "prod-2",
      name: "Bioestimulador de Colágeno",
      category: "Rejuvenescimento",
      highlight: "Resultados progressivos e naturais",
    },
    {
      id: "prod-3",
      name: "Consultoria de Skincare",
      category: "Avaliação",
      highlight: "Rotina personalizada em 30 min",
    },
  ],
};

export const DEMO_BRAND: BrandProfile = {
  tone: "acolhedor",
  emojiUsage: "moderado",
  formality: "equilibrado",
  colors: {
    primary: "#E03E52",
    secondary: "#18181B",
    accent: "#F4A261",
    surface: "#FAF7F5",
  },
  logoInitials: "CA",
  logoStyle: "monogram",
  visualStyleNotes:
    "Fotografia com luz natural, fundos neutros em linho e areia, tipografia limpa e bastante respiro visual.",
  aiGuidelines: {
    doUse: [
      "Beleza natural",
      "Cuidado contínuo",
      "Agende sua avaliação",
      "Protocolo personalizado",
    ],
    avoid: [
      "Milagre",
      "Perfeição",
      "Promoção imperdível",
      "Promessas médicas absolutas",
    ],
    extraInstructions:
      "Sempre convidar o seguidor para tirar dúvidas no direct ou agendar uma avaliação presencial. Evitar termos técnicos sem explicação simples.",
  },
};

export const DEMO_POSTS: ContentPost[] = [
  {
    id: "post-1",
    title: "3 sinais de que sua pele precisa de hidratação profunda",
    format: "carrossel",
    status: "agendado",
    date: "2026-11-25",
    time: "18:30",
    objective: "Educar seguidoras sobre barreira cutânea e gerar salvamentos",
    caption:
      "Pele repuxando depois do banho ou maquiagem craquelando? Nem sempre é falta de óleo — muitas vezes é desidratação.\n\nArraste para o lado e veja os 3 sinais mais comuns que observamos nas avaliações aqui na Clínica Aura.",
    hashtags: ["#skincare", "#cuidadoscomapele", "#esteticafacial", "#clinicaaura"],
    cta: "Salve este post para consultar depois",
    slidesCount: 5,
    estimatedReach: "2,4k – 3,1k",
  },
  {
    id: "post-2",
    title: "Bastidores da Limpeza de Pele Botânica",
    format: "reels",
    status: "aprovacao",
    date: "2026-11-27",
    time: "12:00",
    objective: "Mostrar suavidade do protocolo e reduzir medo de dor",
    caption:
      "Quem disse que limpeza de pele precisa deixar o rosto marcado? Nosso protocolo botânico acalma enquanto renova.\n\nQuer sentir a diferença na sua pele esta semana?",
    hashtags: ["#limpezadepele", "#belezaatural", "#esteticahumanizada"],
    cta: "Comente AURA para receber os horários",
    estimatedReach: "4,1k – 5,8k",
  },
  {
    id: "post-3",
    title: "Rotina matinal em 3 passos práticos",
    format: "feed",
    status: "agendado",
    date: "2026-11-29",
    time: "09:30",
    objective: "Reforçar autoridade com dica simples de aplicar",
    caption:
      "Menos etapas, mais constância. Limpeza suave, antioxidante e protetor solar já transformam a saúde da sua pele em 30 dias.",
    hashtags: ["#rotinaskincare", "#autocuidado", "#peleprotegida"],
    cta: "Qual passo você nunca pula?",
    estimatedReach: "1,8k – 2,5k",
  },
  {
    id: "post-4",
    title: "Enquete: qual horário você prefere cuidar da pele?",
    format: "stories",
    status: "rascunho",
    date: "2026-11-30",
    time: "19:00",
    objective: "Aumentar interação nos Stories no fim do dia",
    caption:
      "Time manhã corrida ou time ritual noturno? Vote aqui embaixo e me conta qual é o seu maior desafio na rotina!",
    hashtags: ["#stories", "#rotinanoturna"],
    cta: "Responda na enquete",
  },
  {
    id: "post-5",
    title: "Mitos sobre bioestimuladores de colágeno",
    format: "carrossel",
    status: "publicado",
    date: "2026-11-18",
    time: "18:00",
    objective: "Quebrar objeções sobre aparência artificial",
    caption:
      "Bioestimulador não muda seus traços — ele desperta a firmeza natural que sua pele já produz.",
    hashtags: ["#colageno", "#rejuvenescimento", "#clinicaaura"],
    cta: "Envie para uma amiga que tem dúvidas",
    slidesCount: 6,
    estimatedReach: "3,4k",
  },
  {
    id: "post-6",
    title: "Agenda aberta de dezembro",
    format: "feed",
    status: "aprovacao",
    date: "2026-12-02",
    time: "10:00",
    objective: "Captar agendamentos para festas de fim de ano",
    caption:
      "Dezembro chegou com horários especiais para você preparar a pele com calma antes das confraternizações.",
    hashtags: ["#agendadezembro", "#estetica", "#autocuidado"],
    cta: "Toque no link da bio para reservar",
    estimatedReach: "2,9k – 3,7k",
  },
  {
    id: "post-7",
    title: "Tour rápido pela sala de atendimento",
    format: "reels",
    status: "publicado",
    date: "2026-11-12",
    time: "17:30",
    objective: "Gerar confiança e familiaridade antes da primeira visita",
    caption:
      "Cada detalhe da nossa sala foi pensado para você desacelerar por uma hora inteira.",
    hashtags: ["#bemestar", "#clinicaaura", "#saopaulo"],
    cta: "Agende sua primeira visita",
    estimatedReach: "5,2k",
  },
  {
    id: "post-8",
    title: "Checklist pós-sol para pele sensível",
    format: "stories",
    status: "publicado",
    date: "2026-11-08",
    time: "16:00",
    objective: "Conteúdo rápido de utilidade no fim de semana",
    caption:
      "Pegou sol hoje? Água termal gelada + hidratante reparador fazem toda a diferença à noite.",
    hashtags: ["#possol", "#pelesensivel"],
    cta: "Salve o print",
  },
];

export const DEMO_MONTH = { prefix: "2026-11", label: "Novembro 2026" } as const;

export const DEMO_SETTINGS: WorkspaceSettings = {
  ownerName: "Marina Vasconcelos",
  ownerEmail: "marina@clinicaaura.com.br",
  workspaceName: "Clínica Aura Estética",
  timezone: "America/Sao_Paulo",
  language: "pt-BR",
  theme: "light",
  density: "comfortable",
  emailDigest: true,
  approvalReminders: true,
};
