/**
 * SAMPLE CATALOG DATA
 * ------------------------------------------------------------------
 * Every record below is placeholder content for this front-end concept.
 * Replace `products`, `categories`, `guides` and `navigation` with real
 * data (or a Shopify / commerce API) without touching the components.
 */

export type Application = "Residential" | "Commercial" | "Industrial" | "Municipal";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Sample part reference — replace with a real SKU. */
  sku: string;
  /** Slug of the parent category (see `categories`). */
  category: string;
  application: Application;
  /** `fixed` products can be added to cart; `quote` products request a quote. */
  priceKind: "fixed" | "quote";
  price: number | null;
  /** Label shown instead of a price for quote-based equipment. */
  quoteLabel: string | null;
  short: string;
  description: string;
  image: string;
  imagePosition?: string;
  specs: Spec[];
  availability: string;
  featured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  index: string;
  short: string;
  description: string;
  image: string;
  href: string;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  topic: string;
  body: string[];
}

export const PRODUCT_NOTE =
  "Sample product data shown for demonstration. Specifications, pricing and availability are placeholders pending final manufacturer data.";

const IMG = {
  hero: "/images/hero.jpg",
  residential: "/images/cat-residential.jpg",
  commercial: "/images/cat-commercial.jpg",
  industrial: "/images/cat-industrial.jpg",
  plant: "/images/banner-industrial.jpg",
  ro: "/images/product-ro.jpg",
  wholeHome: "/images/product-wholehome.jpg",
  cartridges: "/images/product-cartridges.jpg",
  testing: "/images/guide-testing.jpg",
  workshop: "/images/about.jpg",
};

export const images = IMG;

export const categories: Category[] = [
  {
    slug: "drinking-water-filters",
    name: "Drinking Water Filters",
    index: "01",
    short: "Point-of-use filtration for kitchens, taps and countertop use.",
    description:
      "Compact filtration options for the water you drink and cook with, designed for point-of-use installation at a single tap.",
    image: IMG.residential,
    href: "/products?category=drinking-water-filters",
  },
  {
    slug: "reverse-osmosis",
    name: "Reverse Osmosis Systems",
    index: "02",
    short: "Multi-stage membrane systems with dedicated storage.",
    description:
      "Multi-stage reverse osmosis configurations for households and small operations that want a dedicated drinking water line.",
    image: IMG.ro,
    href: "/products?category=reverse-osmosis",
  },
  {
    slug: "whole-home",
    name: "Whole-Home Filtration",
    index: "03",
    short: "Central filtration installed at the main water line.",
    description:
      "Central filtration installed at the main supply line to treat water used across showers, appliances and fixtures.",
    image: IMG.wholeHome,
    href: "/products?category=whole-home",
  },
  {
    slug: "softening-conditioning",
    name: "Water Softening and Conditioning",
    index: "04",
    short: "Conditioning equipment for hardness and scale management.",
    description:
      "Softening and conditioning equipment considered where hardness, scale build-up or fixture care is a concern.",
    image: IMG.workshop,
    href: "/products?category=softening-conditioning",
  },
  {
    slug: "commercial-filtration",
    name: "Commercial Filtration",
    index: "05",
    short: "Heavy-duty filtration for business operations.",
    description:
      "Filtration equipment for offices, hospitality, retail, food service and light industrial process water.",
    image: IMG.commercial,
    href: "/products?category=commercial-filtration",
  },
  {
    slug: "industrial-treatment",
    name: "Industrial Treatment Equipment",
    index: "06",
    short: "Scalable treatment trains for demanding operations.",
    description:
      "Configurable treatment equipment for manufacturing, processing and facility operations with higher flow requirements.",
    image: IMG.industrial,
    href: "/products?category=industrial-treatment",
  },
  {
    slug: "municipal-solutions",
    name: "Municipal Water Solutions",
    index: "07",
    short: "Infrastructure-scale treatment and delivery projects.",
    description:
      "Large-scale treatment solutions considered for municipal, infrastructure and community water projects.",
    image: IMG.plant,
    href: "/products?category=municipal-solutions",
  },
  {
    slug: "accessories",
    name: "Replacement Filters and Accessories",
    index: "08",
    short: "Cartridges, housings, fittings and service parts.",
    description:
      "Replacement cartridges, housings, mounting hardware and installation accessories for maintained systems.",
    image: IMG.cartridges,
    href: "/products?category=accessories",
  },
];

export const products: Product[] = [
  {
    id: "p-01",
    slug: "under-sink-water-filtration-system",
    name: "Under-Sink Water Filtration System",
    sku: "SAMPLE-US-149",
    category: "drinking-water-filters",
    application: "Residential",
    priceKind: "fixed",
    price: 149,
    quoteLabel: null,
    short: "Compact multi-stage filtration installed beneath the kitchen sink with a dedicated drinking water tap.",
    description:
      "A compact point-of-use filtration system intended for installation inside a kitchen cabinet, feeding a dedicated drinking water faucet. A common starting point for households that want filtered water at a single tap without changing the whole property supply.",
    image: IMG.residential,
    imagePosition: "center 55%",
    specs: [
      { label: "Configuration", value: "Under-sink, multi-stage" },
      { label: "Application", value: "Point-of-use drinking water" },
      { label: "Installation", value: "Cabinet-mounted, dedicated faucet" },
      { label: "Service connection", value: "Standard household supply line" },
      { label: "Cartridge access", value: "In-cabinet, tool-free" },
    ],
    availability: "Sample stock — ships in 3–5 business days",
    featured: true,
  },
  {
    id: "p-02",
    slug: "reverse-osmosis-water-system",
    name: "Reverse Osmosis Water System",
    sku: "SAMPLE-RO-329",
    category: "reverse-osmosis",
    application: "Residential",
    priceKind: "fixed",
    price: 329,
    quoteLabel: null,
    short: "Multi-stage reverse osmosis unit with pressurised storage tank and separate kitchen faucet.",
    description:
      "A multi-stage reverse osmosis configuration combining sediment and carbon stages with a membrane module and a pressurised storage tank. Supplied as a complete kit for under-sink installation with a dedicated faucet.",
    image: IMG.ro,
    specs: [
      { label: "Configuration", value: "Multi-stage with storage tank" },
      { label: "Application", value: "Dedicated drinking water line" },
      { label: "Installation", value: "Under-sink, faucet included" },
      { label: "Storage", value: "Pressurised storage tank" },
      { label: "Service access", value: "Front-replaceable cartridges" },
    ],
    availability: "Sample stock — ships in 3–5 business days",
    featured: true,
  },
  {
    id: "p-03",
    slug: "whole-home-water-filter",
    name: "Whole-Home Water Filter",
    sku: "SAMPLE-WH-449",
    category: "whole-home",
    application: "Residential",
    priceKind: "fixed",
    price: 449,
    quoteLabel: null,
    short: "Central housing and installation components fitted at the main water line for whole-property filtration.",
    description:
      "A central filtration unit installed at the property's main supply line so that water reaching every fixture passes through the housing. Supplied with mounting bracket, unions and a pressure gauge for service monitoring.",
    image: IMG.wholeHome,
    specs: [
      { label: "Configuration", value: "Central, single-housing" },
      { label: "Application", value: "Whole-property filtration" },
      { label: "Installation", value: "Main line, bracket mounted" },
      { label: "Monitoring", value: "Pressure gauge fitted" },
      { label: "Service access", value: "Housing wrench included" },
    ],
    availability: "Sample stock — ships in 5–7 business days",
    featured: true,
  },
  {
    id: "p-04",
    slug: "commercial-filtration-system",
    name: "Commercial Filtration System",
    sku: "SAMPLE-CM-QUOTE",
    category: "commercial-filtration",
    application: "Commercial",
    priceKind: "quote",
    price: null,
    quoteLabel: "Quote Required",
    short: "Heavy-duty multi housing filtration skid for offices, hospitality and business operations.",
    description:
      "A skid-mounted commercial filtration arrangement with multiple filter housings, isolation valves and gauges, configured around the flow and duty of the site. Supplied against a project specification following a review of the application.",
    image: IMG.commercial,
    specs: [
      { label: "Configuration", value: "Multi-housing skid, frame mounted" },
      { label: "Application", value: "Commercial and business operations" },
      { label: "Sizing basis", value: "Site flow rate and duty cycle" },
      { label: "Valving", value: "Isolation and bypass provided" },
      { label: "Documentation", value: "Sample data — pending final spec" },
    ],
    availability: "Made to order — quoted per project",
    featured: true,
  },
  {
    id: "p-05",
    slug: "high-capacity-water-treatment-unit",
    name: "High-Capacity Water Treatment Unit",
    sku: "SAMPLE-IN-QUOTE",
    category: "industrial-treatment",
    application: "Industrial",
    priceKind: "quote",
    price: null,
    quoteLabel: "Request a Quote",
    short: "Configurable treatment train for industrial process and operational water requirements.",
    description:
      "A configurable treatment unit assembled for higher-volume industrial duties. The final arrangement, staging and ancillaries depend on the process, feed conditions and site constraints, all confirmed during the specification stage.",
    image: IMG.industrial,
    specs: [
      { label: "Configuration", value: "Modular treatment train" },
      { label: "Application", value: "Process and operational water" },
      { label: "Sizing basis", value: "Required capacity and flow rate" },
      { label: "Delivery", value: "Sectioned or containerised" },
      { label: "Documentation", value: "Sample data — pending final spec" },
    ],
    availability: "Quoted per project — lead time confirmed on order",
    featured: true,
  },
  {
    id: "p-06",
    slug: "municipal-water-treatment-solution",
    name: "Municipal Water Treatment Solution",
    sku: "SAMPLE-MU-QUOTE",
    category: "municipal-solutions",
    application: "Municipal",
    priceKind: "quote",
    price: null,
    quoteLabel: "Custom Quote",
    short: "Infrastructure-scale treatment solution for municipal and community water projects.",
    description:
      "An infrastructure-scale treatment solution considered for municipal and community water projects. Scope, phasing and equipment schedules are developed with the project team against the applicable brief.",
    image: IMG.plant,
    imagePosition: "center 60%",
    specs: [
      { label: "Configuration", value: "Full treatment plant scope" },
      { label: "Application", value: "Municipal and infrastructure" },
      { label: "Delivery model", value: "Phased project supply" },
      { label: "Documentation", value: "Sample data — pending final spec" },
      { label: "Engagement", value: "Consultative — brief first" },
    ],
    availability: "Project-based — quoted against scope",
    featured: true,
  },
  {
    id: "p-07",
    slug: "countertop-drinking-water-filter",
    name: "Countertop Drinking Water Filter",
    sku: "SAMPLE-CT-099",
    category: "drinking-water-filters",
    application: "Residential",
    priceKind: "fixed",
    price: 99,
    quoteLabel: null,
    short: "Portable countertop filter that connects to a standard faucet without cabinet installation.",
    description:
      "A countertop filtration unit that diverts supply from a standard kitchen faucet, suited to renters or households that cannot modify cabinetry. Requires no permanent plumbing changes.",
    image: IMG.hero,
    imagePosition: "20% center",
    specs: [
      { label: "Configuration", value: "Countertop, faucet diverter" },
      { label: "Application", value: "Point-of-use drinking water" },
      { label: "Installation", value: "No cabinet modification" },
      { label: "Portability", value: "Freestanding, movable" },
      { label: "Cartridge access", value: "Twist-off head" },
    ],
    availability: "Sample stock — ships in 3–5 business days",
    featured: true,
  },
  {
    id: "p-08",
    slug: "whole-property-water-softener",
    name: "Whole-Property Water Softener",
    sku: "SAMPLE-WS-799",
    category: "softening-conditioning",
    application: "Residential",
    priceKind: "fixed",
    price: 799,
    quoteLabel: null,
    short: "Conditioning unit with control valve installed at the main line to manage hardness and scale.",
    description:
      "A softening and conditioning unit with an automatic control valve, installed on the main supply where hardness and scale build-up are a concern. Sized against property demand and local water conditions.",
    image: IMG.wholeHome,
    imagePosition: "80% center",
    specs: [
      { label: "Configuration", value: "Single tank with control valve" },
      { label: "Application", value: "Whole-property conditioning" },
      { label: "Installation", value: "Main line, bypass valving" },
      { label: "Regeneration", value: "Automatic timed control" },
      { label: "Sizing basis", value: "Property demand and feed conditions" },
    ],
    availability: "Sample stock — ships in 5–7 business days",
  },
  {
    id: "p-09",
    slug: "multi-cartridge-commercial-filter-housing",
    name: "Multi-Cartridge Commercial Filter Housing",
    sku: "SAMPLE-CH-QUOTE",
    category: "commercial-filtration",
    application: "Commercial",
    priceKind: "quote",
    price: null,
    quoteLabel: "Quote Required",
    short: "Stainless multi-round housing for higher-volume commercial pre-filtration duties.",
    description:
      "A stainless steel multi-round cartridge housing intended for commercial pre-filtration ahead of downstream equipment. Final cartridge selection follows a review of the water and duty.",
    image: IMG.commercial,
    imagePosition: "80% center",
    specs: [
      { label: "Configuration", value: "Multi-round stainless housing" },
      { label: "Application", value: "Commercial pre-filtration" },
      { label: "Material", value: "Stainless steel body" },
      { label: "Sizing basis", value: "Flow rate and cartridge format" },
      { label: "Documentation", value: "Sample data — pending final spec" },
    ],
    availability: "Made to order — quoted per project",
  },
  {
    id: "p-10",
    slug: "containerised-treatment-plant",
    name: "Containerised Treatment Plant",
    sku: "SAMPLE-CP-QUOTE",
    category: "industrial-treatment",
    application: "Industrial",
    priceKind: "quote",
    price: null,
    quoteLabel: "Request a Quote",
    short: "Prefabricated treatment plant delivered inside a transportable container module.",
    description:
      "A prefabricated treatment arrangement built into a transportable container module, useful where site construction time is limited or where the plant may need to move. Scoped against the project brief.",
    image: IMG.plant,
    imagePosition: "center 40%",
    specs: [
      { label: "Configuration", value: "Prefabricated container module" },
      { label: "Application", value: "Industrial and remote sites" },
      { label: "Delivery", value: "Transportable unit" },
      { label: "Integration", value: "Site connection points defined on order" },
      { label: "Documentation", value: "Sample data — pending final spec" },
    ],
    availability: "Quoted per project — lead time confirmed on order",
  },
  {
    id: "p-11",
    slug: "replacement-cartridge-set",
    name: "Replacement Cartridge Set",
    sku: "SAMPLE-RF-079",
    category: "accessories",
    application: "Residential",
    priceKind: "fixed",
    price: 79,
    quoteLabel: null,
    short: "Three-stage set of sediment and carbon replacement cartridges for maintained systems.",
    description:
      "A matched set of replacement cartridges covering sediment and carbon stages for regularly serviced systems. Confirm the cartridge format against your existing housing before ordering.",
    image: IMG.cartridges,
    specs: [
      { label: "Configuration", value: "Three-cartridge matched set" },
      { label: "Application", value: "Routine service replacement" },
      { label: "Compatibility", value: "Confirm housing format before ordering" },
      { label: "Supplied as", value: "Set of three cartridges" },
      { label: "Service tool", value: "Housing wrench sold separately" },
    ],
    availability: "Sample stock — ships in 2–3 business days",
    featured: true,
  },
  {
    id: "p-12",
    slug: "high-flow-sediment-filter",
    name: "High-Flow Sediment Filter",
    sku: "SAMPLE-HF-039",
    category: "accessories",
    application: "Commercial",
    priceKind: "fixed",
    price: 39,
    quoteLabel: null,
    short: "Wide-format sediment cartridge for higher-flow housings and pre-filtration stages.",
    description:
      "A wide-format pleated sediment cartridge intended for larger housings and pre-filtration stages. Available as a direct-purchase item for sites carrying their own spares.",
    image: IMG.cartridges,
    imagePosition: "80% center",
    specs: [
      { label: "Configuration", value: "Wide-format pleated cartridge" },
      { label: "Application", value: "Pre-filtration, higher flow" },
      { label: "Compatibility", value: "Confirm housing format before ordering" },
      { label: "Supplied as", value: "Single cartridge" },
      { label: "Availability", value: "Sample stock" },
    ],
    availability: "Sample stock — ships in 2–3 business days",
  },
];

export const guides: Guide[] = [
  {
    slug: "understanding-residential-water-filtration",
    title: "Understanding Residential Water Filtration",
    topic: "Residential",
    readTime: "6 min read",
    excerpt:
      "An introduction to point-of-use and point-of-entry filtration, and the questions worth answering before you buy.",
    image: IMG.residential,
    body: [
      "Residential filtration generally falls into two positions in a home. Point-of-use equipment treats water at a single tap — usually the kitchen sink — while point-of-entry equipment is installed at the main supply line and treats water used across the whole property.",
      "The right position depends on what you want to address. If the goal is drinking and cooking water, a compact under-sink or countertop unit is usually the simplest starting point. If the concern extends to showers, laundry and appliances, a central installation is more appropriate.",
      "Before selecting equipment, it helps to know something about the supply itself. A recent water test, the property's flow rate, the available space at the installation point and the existing plumbing all influence what will fit and what will be practical to maintain.",
      "Filter formats differ in how often they need service and how easy they are to access. Cartridges hidden behind cabinetry are easy to forget; a housing that can be reached without moving appliances tends to stay maintained.",
      "This guide is general information for planning purposes. It does not assess your specific water quality, and no single treatment technology is appropriate for every supply or every concern.",
    ],
  },
  {
    slug: "how-to-choose-a-commercial-water-treatment-system",
    title: "How to Choose a Commercial Water Treatment System",
    topic: "Commercial",
    readTime: "7 min read",
    excerpt:
      "What to prepare before approaching a supplier: flow rates, duty cycles, space, and the operating context of your site.",
    image: IMG.commercial,
    body: [
      "Commercial treatment decisions usually start with demand rather than with a product. Peak flow, operating hours and the number of outlets served determine the size of the equipment far more than the brand on the front of it.",
      "Gather what you already know before the first conversation: the operating hours, the busiest period of the day, the available plant space, the incoming supply connection, and any existing equipment the new system has to sit alongside.",
      "Space and access are frequently overlooked. Equipment needs room for cartridge changes, valve operation and drainage. A system that fits on paper but cannot be serviced tends to become a maintenance problem.",
      "Consider the operating model as well as the equipment. Who performs service, how often cartridges are replaced, and whether parts are held on site all affect the running cost of the installation.",
      "This article is general guidance for planning a project. It does not evaluate your site or guarantee that any particular system will meet your requirements; suitability is confirmed during specification against your water testing and application data.",
    ],
  },
  {
    slug: "key-considerations-for-large-scale-water-treatment",
    title: "Key Considerations for Large-Scale Water Treatment",
    topic: "Industrial & Municipal",
    readTime: "8 min read",
    excerpt:
      "Phasing, redundancy, site integration and documentation — the factors that shape infrastructure-scale treatment projects.",
    image: IMG.plant,
    body: [
      "Large-scale treatment projects are rarely a single equipment purchase. They are phased works that have to integrate with existing infrastructure, operating schedules and the people who will run the plant afterwards.",
      "Capacity and flow rate set the frame for everything else. Redundancy — whether one train can be taken offline while another continues to operate — is a decision that is much cheaper to make during planning than after construction.",
      "Site integration deserves early attention: incoming supply, discharge routes, power supply, control system interfaces and access for delivery all influence the final arrangement.",
      "Documentation and handover matter at this scale. Equipment schedules, operating manuals, spares lists and training for the operating team are part of the deliverable, not an extra.",
      "This is general planning information for project teams. Final configurations are developed against the project brief, applicable standards and site-specific water data, and no treatment arrangement should be assumed suitable without that review.",
    ],
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  items?: NavLink[];
}

export const navigation: NavGroup[] = [
  {
    label: "Shop Products",
    href: "/products",
    items: [
      { label: "All Products", href: "/products" },
      { label: "Drinking Water Filters", href: "/products?category=drinking-water-filters" },
      { label: "Reverse Osmosis Systems", href: "/products?category=reverse-osmosis" },
      { label: "Whole-Home Filtration", href: "/products?category=whole-home" },
      { label: "Replacement Filters", href: "/products?category=accessories" },
    ],
  },
  {
    label: "Home Water Systems",
    href: "/solutions/residential",
    items: [
      { label: "Residential Solutions", href: "/solutions/residential" },
      { label: "Drinking Water Filters", href: "/products?category=drinking-water-filters" },
      { label: "Reverse Osmosis Systems", href: "/products?category=reverse-osmosis" },
      { label: "Whole-Home Filtration", href: "/products?category=whole-home" },
      { label: "Softening and Conditioning", href: "/products?category=softening-conditioning" },
    ],
  },
  {
    label: "Commercial Solutions",
    href: "/solutions/commercial",
    items: [
      { label: "Commercial Overview", href: "/solutions/commercial" },
      { label: "Commercial Filtration", href: "/products?category=commercial-filtration" },
      { label: "Commercial Products", href: "/products?application=Commercial" },
      { label: "Request a Quote", href: "/quote" },
    ],
  },
  {
    label: "Industrial & Municipal",
    href: "/solutions/industrial-municipal",
    items: [
      { label: "Industrial & Municipal Overview", href: "/solutions/industrial-municipal" },
      { label: "Industrial Treatment Equipment", href: "/products?category=industrial-treatment" },
      { label: "Municipal Water Solutions", href: "/products?category=municipal-solutions" },
      { label: "Discuss Your Requirements", href: "/quote" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "All Guides", href: "/resources" },
      { label: "Solution Finder", href: "/#solution-finder" },
      { label: "About Us", href: "/about" },
      { label: "Contact Support", href: "/contact" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const money = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const productsInCategory = (slug: string) => products.filter((p) => p.category === slug);

export const priceLabel = (p: Product) =>
  p.priceKind === "fixed" && p.price !== null ? money(p.price) : (p.quoteLabel ?? "Quote Required");
