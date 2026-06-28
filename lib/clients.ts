export type ClientHub = {
  slug: string;
  name: string;
  title: string;
  logo: string;
  colors: string[];
  strategy: string;
  positioning: string;
  brand: string;
  product: string;
  tone: string;
  designSystem: string;
  figmaUrl?: string;
  assets: { label: string; href: string }[];
};

export const clients: Record<string, ClientHub> = {
  vivolt: {
    slug: "vivolt",
    name: "Vivolt",
    title: "Vivolt Brand & Product HUB",
    logo: "/clients/vivolt/logo.svg",
    colors: ["#073B3A", "#F4C542", "#F7F4ED", "#111111"],
    strategy: "Vivolt is used here as the first client workspace: strategy, brand, product, assets and requests in one private hub.",
    positioning: "A clear, premium and useful brand/product system designed to reduce friction and accelerate decisions.",
    brand: "Brand system placeholder: logo, colors, tone, key messages and campaign rules.",
    product: "Product system placeholder: UX principles, key flows, Figma links, design system and current product priorities.",
    tone: "Clear, direct, useful, premium, human. No corporate noise.",
    designSystem: "Mobile-first, soft cards, high contrast typography, calm interface, fast actions.",
    figmaUrl: "https://figma.com/",
    assets: [
      { label: "Brand guide", href: "#" },
      { label: "Logo pack", href: "#" },
      { label: "Latest deck", href: "#" }
    ]
  },
  arkko: {
    slug: "arkko",
    name: "ARKKO",
    title: "ARKKO Brand & Product HUB",
    logo: "/clients/arkko/logo.svg",
    colors: ["#111111", "#F28D5C", "#F6F4EF", "#D9D9D9"],
    strategy: "ARKKO is a sports-tech brand and product system for tactical basketball knowledge.",
    positioning: "Shape your game: a precise platform for coaches who read, organize and share tactical knowledge.",
    brand: "Minimal, modular, tactical, digital. Avoid literal basketball clichés.",
    product: "Product focus: content, tactical intelligence, structured knowledge and coach experience.",
    tone: "Sharp, precise, useful, expert, never noisy.",
    designSystem: "Black/white base, orange accent, modular cards, tactical diagrams, motion-ready visual language.",
    figmaUrl: "https://figma.com/",
    assets: [
      { label: "Brand direction", href: "#" },
      { label: "Logo explorations", href: "#" }
    ]
  },
  pangea: {
    slug: "pangea",
    name: "Pangea",
    title: "Pangea Brand & Experience HUB",
    logo: "/clients/pangea/logo.svg",
    colors: ["#14213D", "#FCA311", "#F7F4ED", "#111111"],
    strategy: "Pangea workspace for omnichannel travel retail brand and experience thinking.",
    positioning: "A travel experience brand built around discovery, service and memorable retail moments.",
    brand: "Cinematic, experiential, warm, premium and spatial.",
    product: "Product/experience focus: omnichannel journey, store experience, digital layers and content ecosystem.",
    tone: "Inspiring, clear, human and experiential.",
    designSystem: "Editorial layouts, cinematic visuals, strong spatial hierarchy, warm premium accents.",
    figmaUrl: "https://figma.com/",
    assets: [
      { label: "Case study", href: "#" },
      { label: "Visual direction", href: "#" }
    ]
  }
};

export function getClient(slug: string) {
  return clients[slug];
}

export function clientContext(client: ClientHub) {
  return `Client: ${client.name}\nTitle: ${client.title}\nStrategy: ${client.strategy}\nPositioning: ${client.positioning}\nBrand: ${client.brand}\nProduct: ${client.product}\nTone of voice: ${client.tone}\nDesign system: ${client.designSystem}\nColors: ${client.colors.join(", ")}\nAssets: ${client.assets.map((a) => a.label).join(", ")}`;
}
