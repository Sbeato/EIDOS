export type BrandColor = {
  name: string;
  value: string;
  usage: string;
};

export type FigmaLink = {
  label: string;
  href: string;
};

export type FigmaSource = {
  fileKey: string;
  nodeId: string;
  url: string;
};

export type DownloadableAsset = {
  label: string;
  href: string;
  type: string;
};

export type Deliverable = {
  title: string;
  date: string;
  status: string;
  href: string;
};

export type ClientConfig = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  logo: string;
  positioning: string;
  brand: string;
  tone: string;
  colors: string[];
  product: string;
  designSystem: string;
  figma: FigmaSource;
  brandSystem: {
    colors: BrandColor[];
    typography: string[];
    toneOfVoice: string[];
  };
  strategy: {
    summary: string;
    positioning: string;
    keyMessages: string[];
  };
  productSystem: {
    designSystemNotes: string[];
    figmaLinks: FigmaLink[];
  };
  assets: DownloadableAsset[];
  latestDeliverables: Deliverable[];
};

export type ClientHub = ClientConfig;

export const clients = {
  vivolt: {
    slug: "vivolt",
    name: "Vivolt",
    shortName: "Vivolt",
    description: "Energy transition venture support hub.",
    logo: "/clients/vivolt/logo.svg",
    positioning:
      "For operators and investors moving through the energy transition, Vivolt turns complex energy decisions into clear, actionable intelligence and a cleaner path to adoption.",
    brand: "Credible energy transition intelligence with a technical, investor-ready signal.",
    tone: "Precise, confident, proof-led, and practical.",
    colors: ["#C7F84F", "#101914", "#EAF4E2", "#2C6E93"],
    product: "Decision-support hub for energy transition strategy, proof, and launch momentum.",
    designSystem: "Data clarity, high-contrast cards, restrained signal green, and clear decision states.",
    figma: {
      fileKey: "FDX2dFjn1j1hGhCAVQbvXE",
      nodeId: "739:0",
      url: "https://www.figma.com/design/FDX2dFjn1j1hGhCAVQbvXE?node-id=739-0"
    },
    brandSystem: {
      colors: [
        { name: "Volt Green", value: "#C7F84F", usage: "Primary energy signal and highlight moments." },
        { name: "Deep Grid", value: "#101914", usage: "Core text, dark surfaces, and high-trust sections." },
        { name: "Soft Current", value: "#EAF4E2", usage: "Background tint for calm, technical content." },
        { name: "Signal Blue", value: "#2C6E93", usage: "Data accents, charts, and product proof." }
      ],
      typography: [
        "Use a clean grotesk such as Inter for product UI and investor materials.",
        "Use compact uppercase labels for metrics, modules, and system states.",
        "Keep headings direct, technical, and short."
      ],
      toneOfVoice: [
        "Precise and investor-ready.",
        "Confident without hype.",
        "Grounded in proof, adoption, and operational impact."
      ]
    },
    strategy: {
      summary:
        "Vivolt should read as a credible energy transition platform with a clear commercial edge, measurable outcomes, and a launch story that investors and partners can repeat quickly.",
      positioning:
        "For operators and investors moving through the energy transition, Vivolt turns complex energy decisions into clear, actionable intelligence and a cleaner path to adoption.",
      keyMessages: [
        "Energy decisions need sharper signals, not more noise.",
        "Vivolt connects technical confidence with commercial momentum.",
        "The product should prove value through speed, clarity, and measurable transition outcomes."
      ]
    },
    productSystem: {
      designSystemNotes: [
        "Prioritize data clarity, high-contrast cards, and clear status states.",
        "Use green sparingly as a signal color, not a full-page wash.",
        "Design flows around decision confidence: compare, understand, act."
      ],
      figmaLinks: [
        { label: "Vivolt live Figma node", href: "https://www.figma.com/design/FDX2dFjn1j1hGhCAVQbvXE?node-id=739-0" }
      ]
    },
    assets: [
      { label: "Logo SVG", href: "/clients/vivolt/logo.svg", type: "SVG" },
      { label: "Brand Kit Placeholder", href: "/clients/vivolt/brand-kit-placeholder.txt", type: "TXT" },
      { label: "Latest Deliverables", href: "/clients/vivolt/latest-deliverables.txt", type: "TXT" }
    ],
    latestDeliverables: [
      {
        title: "Investor narrative outline",
        date: "2026-06-28",
        status: "Draft placeholder",
        href: "/clients/vivolt/latest-deliverables.txt"
      },
      {
        title: "Product positioning notes",
        date: "2026-06-28",
        status: "Ready for client input",
        href: "/clients/vivolt/latest-deliverables.txt"
      }
    ]
  },
  arkko: {
    slug: "arkko",
    name: "ARKKO",
    shortName: "ARKKO",
    description: "Architecture and spatial intelligence client hub.",
    logo: "/clients/arkko/logo.svg",
    positioning:
      "For teams shaping built environments, ARKKO translates spatial complexity into clearer planning, stronger presentation, and better project decisions.",
    brand: "Quiet architectural authority for spatial intelligence, project clarity, and commercial presentation.",
    tone: "Measured, spatially aware, editorial, and concrete.",
    colors: ["#171717", "#E8E1D4", "#B86E4B", "#315D7C"],
    product: "Spatial intelligence workspace for planning, presentation, and project decision support.",
    designSystem: "Modular plan-inspired grids, calm surfaces, tactile neutrals, and annotation-led hierarchy.",
    figma: {
      fileKey: "lcrX1XoRuNsUzHM6TjUbda",
      nodeId: "0:1",
      url: "https://www.figma.com/design/lcrX1XoRuNsUzHM6TjUbda?node-id=0-1"
    },
    brandSystem: {
      colors: [
        { name: "Graphite", value: "#171717", usage: "Primary typography and architectural authority." },
        { name: "Limestone", value: "#E8E1D4", usage: "Warm neutral backgrounds and section surfaces." },
        { name: "Copper Line", value: "#B86E4B", usage: "Detail lines, annotations, and selected actions." },
        { name: "Blueprint", value: "#315D7C", usage: "Plans, diagrams, and technical links." }
      ],
      typography: [
        "Use restrained grotesk typography with generous line-height.",
        "Use narrow labels for project metadata, phases, and deliverables.",
        "Avoid decorative type; let proportion and spacing carry the brand."
      ],
      toneOfVoice: [
        "Measured and spatially aware.",
        "Editorial, but never vague.",
        "Useful to architects, developers, and operational teams."
      ]
    },
    strategy: {
      summary:
        "ARKKO should present as a modern spatial intelligence partner: refined enough for design audiences, concrete enough for property and operations decisions.",
      positioning:
        "For teams shaping built environments, ARKKO translates spatial complexity into clearer planning, stronger presentation, and better project decisions.",
      keyMessages: [
        "Better spaces start with better spatial intelligence.",
        "ARKKO bridges design language, operational detail, and commercial clarity.",
        "Every deliverable should make a project easier to understand, approve, or sell."
      ]
    },
    productSystem: {
      designSystemNotes: [
        "Use modular grids inspired by plans, sections, and annotation systems.",
        "Keep surfaces calm, tactile, and legible on mobile.",
        "Let project imagery or diagrams lead when real assets are available."
      ],
      figmaLinks: [
        { label: "ARKKO live Figma node", href: "https://www.figma.com/design/lcrX1XoRuNsUzHM6TjUbda?node-id=0-1" }
      ]
    },
    assets: [
      { label: "Logo SVG", href: "/clients/arkko/logo.svg", type: "SVG" },
      { label: "Brand Kit Placeholder", href: "/clients/arkko/brand-kit-placeholder.txt", type: "TXT" },
      { label: "Latest Deliverables", href: "/clients/arkko/latest-deliverables.txt", type: "TXT" }
    ],
    latestDeliverables: [
      {
        title: "Spatial positioning memo",
        date: "2026-06-28",
        status: "Draft placeholder",
        href: "/clients/arkko/latest-deliverables.txt"
      },
      {
        title: "Website messaging blocks",
        date: "2026-06-28",
        status: "Ready for client input",
        href: "/clients/arkko/latest-deliverables.txt"
      }
    ]
  },
  difrica: {
    slug: "difrica",
    name: "Difrica",
    shortName: "Difrica",
    description: "Culture, commerce, and community platform client hub.",
    logo: "/clients/difrica/logo.svg",
    positioning:
      "For teams building culture-led commerce, Difrica connects creators, products, stories, and markets through a mobile-first platform layer.",
    brand: "Warm culture-led commerce platform with community trust and market clarity.",
    tone: "Warm, direct, culturally aware, specific, and commercially useful.",
    colors: ["#A24E32", "#14110F", "#1F7A5C", "#F6F0E6"],
    product: "Mobile-first discovery and activation platform for creators, products, stories, and markets.",
    designSystem: "Mobile discovery cards, restrained warm accents, creator modules, product modules, and fast action paths.",
    figma: {
      fileKey: "VCsuWhnYxvmLh9NU3ZmfcQ",
      nodeId: "0:1",
      url: "https://www.figma.com/design/VCsuWhnYxvmLh9NU3ZmfcQ?node-id=0-1"
    },
    brandSystem: {
      colors: [
        { name: "Clay", value: "#A24E32", usage: "Warm primary brand signal and campaign moments." },
        { name: "Night Market", value: "#14110F", usage: "Core text, premium contrast, and editorial surfaces." },
        { name: "Palm", value: "#1F7A5C", usage: "Community, growth, and navigation accents." },
        { name: "Ivory", value: "#F6F0E6", usage: "Mobile backgrounds and dense content areas." }
      ],
      typography: [
        "Use confident, readable grotesk typography for mobile-first product surfaces.",
        "Use short editorial headings for campaigns, drops, and stories.",
        "Keep metadata compact for markets, creators, collections, and events."
      ],
      toneOfVoice: [
        "Warm, direct, and culturally aware.",
        "Commercial without feeling generic.",
        "Specific about people, places, products, and proof."
      ]
    },
    strategy: {
      summary:
        "Difrica should feel like a trusted platform for culture-led commerce: clear enough for operators, expressive enough for community, and structured enough to scale.",
      positioning:
        "For teams building culture-led commerce, Difrica connects creators, products, stories, and markets through a mobile-first platform layer.",
      keyMessages: [
        "Culture-led commerce needs trust, story, and operational clarity.",
        "Difrica turns discovery into repeatable market momentum.",
        "The product should make people, products, and proof easy to find and act on."
      ]
    },
    productSystem: {
      designSystemNotes: [
        "Prioritize mobile discovery, clear collection cards, and fast paths to action.",
        "Use warm accents with restrained neutral surfaces so content stays legible.",
        "Design reusable modules for creators, products, markets, and live opportunities."
      ],
      figmaLinks: [
        { label: "Difrica live Figma node", href: "https://www.figma.com/design/VCsuWhnYxvmLh9NU3ZmfcQ?node-id=0-1" }
      ]
    },
    assets: [
      { label: "Logo SVG", href: "/clients/difrica/logo.svg", type: "SVG" },
      { label: "Brand Kit Placeholder", href: "/clients/difrica/brand-kit-placeholder.txt", type: "TXT" },
      { label: "Latest Deliverables", href: "/clients/difrica/latest-deliverables.txt", type: "TXT" }
    ],
    latestDeliverables: [
      {
        title: "Culture commerce positioning",
        date: "2026-06-28",
        status: "Draft placeholder",
        href: "/clients/difrica/latest-deliverables.txt"
      },
      {
        title: "Mobile product module notes",
        date: "2026-06-28",
        status: "Ready for Figma sync",
        href: "/clients/difrica/latest-deliverables.txt"
      }
    ]
  }
} satisfies Record<string, ClientConfig>;

export const clientList = Object.values(clients);

export function getClient(slug: string) {
  return clients[slug as keyof typeof clients];
}

export function getClientAiContext(client: ClientConfig) {
  return [
    `Client: ${client.name} (${client.slug})`,
    `Description: ${client.description}`,
    `Figma file key: ${client.figma.fileKey}`,
    `Figma node ID: ${client.figma.nodeId}`,
    `Strategy summary: ${client.strategy.summary}`,
    `Positioning: ${client.strategy.positioning}`,
    `Key messages: ${client.strategy.keyMessages.join(" | ")}`,
    `Brand: ${client.brand}`,
    `Tone: ${client.tone}`,
    `Colors: ${client.colors.join(" | ")}`,
    `Product: ${client.product}`,
    `Design system: ${client.designSystem}`,
    `Tone of voice: ${client.brandSystem.toneOfVoice.join(" | ")}`,
    `Typography: ${client.brandSystem.typography.join(" | ")}`,
    `Design system notes: ${client.productSystem.designSystemNotes.join(" | ")}`,
    `Figma links: ${client.productSystem.figmaLinks.map((link) => `${link.label}: ${link.href}`).join(" | ")}`,
    `Latest deliverables: ${client.latestDeliverables
      .map((deliverable) => `${deliverable.title} (${deliverable.status}, ${deliverable.date})`)
      .join(" | ")}`
  ].join("\n");
}
