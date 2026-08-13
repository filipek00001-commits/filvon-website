export type ProjectStatus =
  | "Discovery"
  | "Design"
  | "Development"
  | "Testing"
  | "Live";

export type ProjectMessage = {
  id: number;
  sender: "filvon" | "client";
  name: string;
  text: string;
  time: string;
};

export type FeedbackItem = {
  id: number;
  title: string;
  category: string;
  status: "Open" | "In behandeling" | "Afgerond";
};

export type ProjectFile = {
  name: string;
  type: string;
  size: string;
};

export type ClientProject = {
  id: number;
  slug: string;
  clientName: string;
  contactName: string;
  email: string;

  projectName: string;
  status: ProjectStatus;
  progress: number;

  deadline: string;
  lastUpdate: string;
  previewUrl: string;

  unreadMessages: number;
  openFeedback: number;

  messages: ProjectMessage[];
  feedback: FeedbackItem[];
  files: ProjectFile[];
};

export const projects: ClientProject[] = [
  {
    id: 1,
    slug: "vermeulen",

    clientName: "Vermeulen Consulting",
    contactName: "Thomas Vermeulen",
    email: "thomas@vermeulen-consulting.be",

    projectName: "Corporate Website",

    status: "Development",
    progress: 68,

    deadline: "18 augustus 2026",
    lastUpdate: "Vandaag, 09:01",

    previewUrl: "preview.filvon.be",

    unreadMessages: 2,
    openFeedback: 2,

    messages: [
      {
        id: 1,
        sender: "filvon",
        name: "Filip",
        text: "De mobiele versie en het contactformulier staan klaar voor controle.",
        time: "09:12",
      },
      {
        id: 2,
        sender: "client",
        name: "Thomas",
        text: "Ziet er goed uit. Kan de hoofdknop nog iets groter worden?",
        time: "09:43",
      },
      {
        id: 3,
        sender: "filvon",
        name: "Filip",
        text: "Zeker. Ik pas dit vandaag nog aan en zet daarna een nieuwe preview klaar.",
        time: "10:01",
      },
    ],

    feedback: [
      {
        id: 1,
        title: "Hoofdknop iets groter maken",
        category: "Design",
        status: "Open",
      },
      {
        id: 2,
        title: "Nieuwe afbeelding bij werkwijze goedgekeurd",
        category: "Design",
        status: "Afgerond",
      },
      {
        id: 3,
        title: "Tekst bij AI Solutions inkorten",
        category: "Tekst",
        status: "In behandeling",
      },
    ],

    files: [
      {
        name: "Projectplanning.pdf",
        type: "PDF",
        size: "1,4 MB",
      },
      {
        name: "Brandguide.pdf",
        type: "PDF",
        size: "3,8 MB",
      },
      {
        name: "Logo-bestanden.zip",
        type: "ZIP",
        size: "8,2 MB",
      },
    ],
  },

  {
    id: 2,
    slug: "nova",

    clientName: "Nova Studio",
    contactName: "Jasper De Smet",
    email: "hello@novastudio.be",

    projectName: "Website & Branding",

    status: "Design",
    progress: 32,

    deadline: "28 augustus 2026",
    lastUpdate: "Gisteren, 16:24",

    previewUrl: "preview.filvon.be/nova",

    unreadMessages: 1,
    openFeedback: 4,

    messages: [],
    feedback: [],
    files: [],
  },

  {
    id: 3,
    slug: "atlas",

    clientName: "Atlas Consulting",
    contactName: "Bram Janssens",
    email: "info@atlas-consulting.be",

    projectName: "Digital Platform",

    status: "Discovery",
    progress: 15,

    deadline: "12 september 2026",
    lastUpdate: "5 augustus, 14:10",

    previewUrl: "preview.filvon.be/atlas",

    unreadMessages: 0,
    openFeedback: 1,

    messages: [],
    feedback: [],
    files: [],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}