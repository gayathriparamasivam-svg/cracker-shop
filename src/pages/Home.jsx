import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, Chip, Container, Stack, Typography } from "@mui/material";
import bg from "../assets/family diwali.png";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { DIWALI, HEADING_FONT, LIGHT_GOLD, SHOP, rs } from "../theme";

// Add more banner images in /public/slides/ and list them here
const SLIDES = [bg /* , "/slides/diwali1.jpg", "/slides/diwali2.jpg" */];

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const remaining = Math.max(0, DIWALI.getTime() - now);
  const values = [
    ["Days", Math.floor(remaining / 86400000)],
    ["Hours", Math.floor((remaining % 86400000) / 3600000)],
    ["Mins", Math.floor((remaining % 3600000) / 60000)],
  ];
  return (
    <Stack direction="row" spacing={{ xs: 0.75, sm: 1 }} justifyContent="center" sx={{ mt: 3, width: "100%", maxWidth: 360, mx: "auto" }}>
      {values.map(([label, value]) => (
        <Card key={label} sx={{ minWidth: { xs: 68, sm: 88 }, flex: { xs: 1, sm: "initial" }, px: 1, py: 1.1, textAlign: "center", bgcolor: "rgba(36,24,68,.88)", border: "1px solid rgba(255,255,255,.09)" }}>
          <Typography variant="h5" color="primary" fontWeight={700}>{String(value).padStart(2, "0")}</Typography>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
        </Card>
      ))}
    </Stack>
  );
}

function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (SLIDES.length < 2) return undefined;
    const t = window.setInterval(() => setI((v) => (v + 1) % SLIDES.length), 4000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <Box sx={{ position: "relative", aspectRatio: { xs: "16 / 9", md: "21 / 8" }, overflow: "hidden", borderRadius: 3, border: "1px solid rgba(255,255,255,.1)" }}>
      {SLIDES.map((src, n) => (
        <Box key={src} component="img" src={src} alt="Diwali offer"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: n === i ? 1 : 0, transition: "opacity .8s" }} />
      ))}
      <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(19,13,41,.75), transparent 55%)" }} />
      <Box sx={{ position: "absolute", left: { xs: 14, md: 32 }, bottom: { xs: 12, md: 26 } }}>
        <Typography variant="h5" sx={{ fontSize: { xs: "1.1rem", md: "1.8rem" } }}>Happy Diwali Offer</Typography>
        <Button component={RouterLink} to="/estimate" variant="contained" size="small" sx={{ mt: 1 }}>Get estimate</Button>
      </Box>
    </Box>
  );
}

function CategoryCard({ cat }) {
  const items = PRODUCTS.filter((p) => p.cat === cat.id);
  // Uses cat.image if you set one in products.js, otherwise the first product photo in this category
  const image = cat.image || items.find((p) => p.image)?.image;
  const [failed, setFailed] = useState(false);
  return (
    <Card component={RouterLink} to={`/estimate#category_${cat.id}`}
      sx={{
        textDecoration: "none", color: "inherit", overflow: "hidden", bgcolor: "rgba(36,24,68,.92)", border: "1px solid rgba(255,255,255,.08)",
        transition: "transform .2s, border-color .2s",
        "@media (hover: hover)": { "&:hover": { transform: "translateY(-4px)", borderColor: `${cat.color}99` } },
      }}>
      <Box sx={{ aspectRatio: "4 / 3", overflow: "hidden", background: `radial-gradient(circle at 50% 115%, ${cat.color}66, transparent 68%)` }}>
        {image && !failed && (
          <Box component="img" src={image} alt={cat.name} loading="lazy" onError={() => setFailed(true)}
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .4s ease", "@media (hover: hover)": { ".MuiCard-root:hover &": { transform: "scale(1.06)" } } }} />
        )}
      </Box>
      <Box sx={{ p: { xs: 1.25, sm: 1.75 }, textAlign: "center" }}>
        <Typography sx={{ fontFamily: HEADING_FONT, fontWeight: 700, fontSize: { xs: ".95rem", sm: "1.1rem" }, lineHeight: 1.3 }}>{cat.name}</Typography>
        <Typography variant="caption" color="text.secondary">{items.length} {items.length === 1 ? "item" : "items"}</Typography>
      </Box>
    </Card>
  );
}

export function CategoryGrid({ items = CATEGORIES }) {
  return (
    <Box sx={{ display: "grid", gap: { xs: 1.25, sm: 2 }, gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" } }}>
      {items.map((cat) => <CategoryCard key={cat.id} cat={cat} />)}
    </Box>
  );
}

const WHY = [
  ["Attractive", "Beautifully packed products that children love."],
  ["Quality made", "Made following government norms with certified materials."],
  ["Colourful", "A wide range of colours across every category."],
  ["Safety first", "Quality checks for every pack. Always follow the label."],
  ["Genuine price", "Competitive pricing for every celebration."],
  ["Satisfaction", "We listen to feedback and keep improving."],
];

const Section = ({ title, subtitle, children }) => (
  <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
    <Typography component="h2" variant="h2" sx={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>{title}</Typography>
    {subtitle && <Typography color="text.secondary" sx={{ mt: 1, mb: 3, maxWidth: "65ch" }}>{subtitle}</Typography>}
    {!subtitle && <Box sx={{ mb: 3 }} />}
    {children}
  </Container>
);

export default function Home() {
  const gifts = PRODUCTS.filter((p) => p.cat === "gift");
  return (
    <>
      <Box sx={{ textAlign: "center", px: { xs: 1.75, sm: 4 }, py: { xs: 6, sm: 9, md: 12 }, background: "radial-gradient(ellipse at 50% 35%, rgba(111,63,168,.25), transparent 58%)" }}>
        <Container maxWidth="md">
          <Chip label="Make every celebration memorable" sx={{ mb: 3, maxWidth: "100%", bgcolor: "rgba(255,233,189,.12)", color: LIGHT_GOLD, border: "1px solid rgba(255,233,189,.3)" }} />
          <Typography component="h1" variant="h1" sx={{ fontSize: "clamp(2.25rem, 8.5vw, 6rem)", lineHeight: 1.08, letterSpacing: "-.02em", textShadow: "0 0 36px rgba(255,233,189,.2)" }}>
            The sky is yours.
            <Box component="span" sx={{ display: "block", color: LIGHT_GOLD }}>Celebrate bright.</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: "54ch", mx: "auto", mt: 2, fontSize: { xs: ".94rem", md: "1.15rem" }, lineHeight: 1.75 }}>
            Explore celebration essentials from Sivakasi, build your estimate and send it to us directly on WhatsApp.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" spacing={1.5} sx={{ mt: 3.5 }}>
            <Button component={RouterLink} to="/estimate" variant="contained" size="large">Get estimate</Button>
            <Button component={RouterLink} to="/collections" variant="outlined" color="inherit" size="large">View collections</Button>
          </Stack>
          <Countdown />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>Diwali countdown · 8 November 2026</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}><HeroSlider /></Container>

      <Section title={`Welcome to ${SHOP.name}`}>
        <Typography color="text.secondary" sx={{ maxWidth: "75ch", lineHeight: 1.8 }}>
          Visit our showroom or place your requirements with us directly. We bring you quality garlands, colourful chakkars, flower pots and magic aerial shots at competitive prices, straight from Sivakasi. {/* TODO: edit this paragraph with your shop story and years of experience */}
        </Typography>
        <Button component={RouterLink} to="/about-us" variant="outlined" color="primary" sx={{ mt: 2 }}>Read more</Button>
      </Section>

      <Section title="Our products" subtitle="Sparklers, rockets, flower pots, chakkars and more. Pick a category to see everything in it.">
        <CategoryGrid />
      </Section>

      {/* {gifts.length > 0 && (
        <Section title="Our gift boxes" subtitle="Curated boxes for every occasion.">
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" } }}>
            {gifts.map((g) => (
              <Card key={g.id} component={RouterLink} to="/estimate#category_gift" sx={{ textDecoration: "none", color: "inherit", overflow: "hidden", bgcolor: "rgba(36,24,68,.92)", border: "1px solid rgba(255,255,255,.08)" }}>
                <Box sx={{ aspectRatio: "4 / 3", display: "grid", placeItems: "center", fontSize: "3rem", background: "radial-gradient(circle at 50% 115%, #ffb62766, transparent 68%)" }}>
                  {g.image ? <Box component="img" src={g.image} alt={g.name} onError={(e) => { e.currentTarget.style.display = "none"; }} sx={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <Typography fontWeight={600} sx={{ fontFamily: HEADING_FONT }}>{g.name}</Typography>
                  <Typography color="primary" fontWeight={700}>{rs(g.price)}</Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Section>
      )} */}

      <Section title="Why choose us?">
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" } }}>
          {WHY.map(([title, text]) => (
            <Card key={title} sx={{ p: 2.5, bgcolor: "rgba(36,24,68,.92)", border: "1px solid rgba(255,255,255,.08)" }}>
              <Typography fontWeight={600}>{title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.7 }}>{text}</Typography>
            </Card>
          ))}
        </Box>
      </Section>

      <Section title="Our brands">
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          {/* TODO: replace with your real brand names or logos */}
          {["Brand One", "Brand Two", "Brand Three", "Brand Four"].map((b) => (
            <Chip key={b} label={b} variant="outlined" sx={{ px: 1, height: 40, fontSize: "1rem" }} />
          ))}
        </Stack>
      </Section>
    </>
  );
}
