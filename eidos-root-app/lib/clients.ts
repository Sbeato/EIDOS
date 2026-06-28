export type BrandColor = {
  name: string;
  value: string;
  usage: string;
};

export type FigmaLink = {
  label: string;
  href: string;
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
  brand: {
    colors: BrandColor[];
    typography: string[];
    toneOfVoice: string[];
  };
  strategy: {
    summary: string;
    positioning: string;
    keyMessages: string[];
  };
  product: {
    designSystemNotes: string[];
    figmaLinks: FigmaLink[];
  };
  assets: DownloadableAsset[];
  latestDeliverables: Deliverable[];
};

export const clients = {
  vivolt: {
    slug: "vivolt",
    name: "Vivolt",
    shortName: "Vivolt",
    description: "Energy transition venture support hub.",
    logo: "/clients/vivolt/logo.svg",
    brand: {
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
    product: {
      designSystemNotes: [
        "Prioritize data clarity, high-contrast cards, and clear status states.",
        "Use green sparingly as a signal color, not a full-page wash.",
        "Design flows around decision confidence: compare, understand, act."
      ],
      figmaLinks: [
        { label: "Vivolt Brand Workspace", href: "https://www.figma.com/files/team/vivolt-placeholder" },
        { label: "Vivolt Product Flow Placeholder", href: "https://www.figma.com/file/vivolt-product-flow-placeholder" }
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
    name: "Arkko",
    shortName: "Arkko",
    description: "Architecture and spatial intelligence client hub.",
    logo: "/clients/arkko/logo.svg",
    brand: {
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
        "Arkko should present as a modern spatial intelligence partner: refined enough for design audiences, concrete enough for property and operations decisions.",
      positioning:
        "For teams shaping built environments, Arkko translates spatial complexity into clearer planning, stronger presentation, and better project decisions.",
      keyMessages: [
        "Better spaces start with better spatial intelligence.",
        "Arkko bridges design language, operational detail, and commercial clarity.",
        "Every deliverable should make a project easier to understand, approve, or sell."
      ]
    },
    product: {
      designSystemNotes: [
        "Use modular grids inspired by plans, sections, and annotation systems.",
        "Keep surfaces calm, tactile, and legible on mobile.",
        "Let project imagery or diagrams lead when real assets are available."
      ],
      figmaLinks: [
        { label: "Arkko Brand Workspace", href: "https://www.figma.com/files/team/arkko-placeholder" },
        { label: "Arkko Design System Placeholder", href: "https://www.figma.com/file/arkko-design-system-placeholder" }
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
  pangea: {
    slug: "pangea",
    name: "Pangea",
    shortName: "Pangea",
    description: "Global venture and platform client hub.",
    logo: "/clients/pangea/logo.svg",
    brand: {
      colors: [
        { name: "Ocean Ink", value: "#102A43", usage: "Primary brand depth and platform trust." },
        { name: "Global Teal", value: "#0B8F7E", usage: "Core actions, wayfinding, and active states." },
        { name: "Coral Signal", value: "#E16F5C", usage: "Launch accents, alerts, and human moments." },
        { name: "Cloud", value: "#F2F6F3", usage: "Neutral backgrounds and dense information areas." }
      ],
      typography: [
        "Use simple global-first typography that works across markets.",
        "Keep headings plain, confident, and easy to translate.",
        "Use structured metadata for regions, segments, and platform modules."
      ],
      toneOfVoice: [
        "Expansive but concrete.",
        "Optimistic without sounding inflated.",
        "Clear about platform logic, trust, and market momentum."
      ]
    },
    strategy: {
      summary:
        "Pangea should communicate a scalable platform thesis: global reach, practical trust-building, and a modular product story that adapts across markets.",
      positioning:
        "For ambitious teams entering or connecting markets, Pangea gives a clearer platform layer for trust, coordination, and expansion.",
      keyMessages: [
        "Pangea makes cross-market work easier to understand and activate.",
        "Trust, coordination, and momentum are the product story.",
        "The brand should feel global, structured, and immediately useful."
      ]
    },
    product: {
      designSystemNotes: [
        "Build reusable modules for markets, partners, proof, and activation.",
        "Use clear navigation and compact cards for repeated mobile use.",
        "Support regional variation without fragmenting the core brand."
      ],
      figmaLinks: [
        { label: "Pangea Brand Workspace", href: "https://www.figma.com/files/team/pangea-placeholder" },
        { label: "Pangea Platform UI Placeholder", href: "https://www.figma.com/file/pangea-platform-ui-placeholder" }
      ]
    },
    assets: [
      { label: "Logo SVG", href: "/clients/pangea/logo.svg", type: "SVG" },
      { label: "Brand Kit Placeholder", href: "/clients/pangea/brand-kit-placeholder.txt", type: "TXT" },
      { label: "Latest Deliverables", href: "/clients/pangea/latest-deliverables.txt", type: "TXT" }
    ],
    latestDeliverables: [
      {
        title: "Platform thesis outline",
        date: "2026-06-28",
        status: "Draft placeholder",
        href: "/clients/pangea/latest-deliverables.txt"
      },
      {
        title: "Global messaging starter set",
        date: "2026-06-28",
        status: "Ready for client input",
        href: "/clients/pangea/latest-deliverables.txt"
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
    `Strategy summary: ${client.strategy.summary}`,
    `Positioning: ${client.strategy.positioning}`,
    `Key messages: ${client.strategy.keyMessages.join(" | ")}`,
    `Tone of voice: ${client.brand.toneOfVoice.join(" | ")}`,
    `Typography: ${client.brand.typography.join(" | ")}`,
    `Design system notes: ${client.product.designSystemNotes.join(" | ")}`,
    `Figma links: ${client.product.figmaLinks.map((link) => `${link.label}: ${link.href}`).join(" | ")}`,
    `Latest deliverables: ${client.latestDeliverables
      .map((deliverable) => `${deliverable.title} (${deliverable.status}, ${deliverable.date})`)
      .join(" | ")}`
  ].join("\n");
}
