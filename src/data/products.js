// One place to edit categories and products. Add more items here and every page updates.

export const CATEGORIES = [
 
{ id: "one-sound", name: "One Sound Crackers", color: "#ff5a3c" },
  { id: "rocket", name: "Rocket Bombs", color: "#6aa8ff" },
  { id: "flowerpot", name: "Flower Pots", color: "#e4358a" },
  { id: "ground", name: "Ground Chakkars", color: "#19c3a0" },
  { id: "sparklers", name: "Sparklers", color: "#ffb627" },
  { id: "novelty", name: "Kids Novelties & Fountains", color: "#19c3a0" },
  { id: "sky", name: "Sky Shots & Fancy Pipes", color: "#b06bff" },
  { id: "gift", name: "Gift Boxes", color: "#ffb627" },
];

// image: put files in /public/products/. Missing images fall back to the emoji icon.
export const PRODUCTS = [
  { id: 1, cat: "sparklers", name: "Sparklers, 10 pcs", desc: "30 cm sparklers with golden effects.", price: 80, tag: "Popular", image: "/products/sparklers.png" },
  { id: 2, cat: "flowerpot", name: "Colour Flower Pots, 5 pcs", desc: "Colourful fountain-style effects.", price: 250, tag: "Bestseller", image: "/products/flowerpot.png" },
  { id: 3, cat: "ground", name: "Ground Chakkar, 10 pcs", desc: "A classic spinning celebration effect.", price: 120, image: "/products/chakkra.png" },
  { id: 4, cat: "rocket", name: "Sky Rocket Trio", desc: "Three rockets for outdoor celebrations.", price: 180, image: "/products/rocket.png" },
  { id: 5, cat: "sky", name: "5-Colour Sky Shot, 12 shots", desc: "A colourful aerial display.", price: 650, tag: "Featured", image: "/products/skyshot.jpg" },
  { id: 6, cat: "one-sound", name: "Lakshmi Crackers, 100 pcs", desc: "A traditional string-cracker pack.", price: 140, image: "/products/lakshmi.jpg" },
  { id: 7, cat: "novelty", name: "Magic Pop-Pop, 20 pcs", desc: "Small novelty snap-pops. Follow pack instructions.", price: 60, image: "/products/magicpoppop.jpg" },
  { id: 8, cat: "gift", name: "Family Gift Box, 30 items", desc: "A curated mix of celebration favourites.", price: 1499, tag: "Value pack", image: "/products/familygiftbox.jpg" },
  // Add more, e.g. 22-item and 42-item gift boxes, with your real prices:
  // { id: 9, cat: "gift", name: "Gift Box, 22 items", desc: "...", price: 0, image: "/products/gift22.jpg" },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
