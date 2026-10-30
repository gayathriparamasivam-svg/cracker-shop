import { useEffect, useMemo, useRef, useState } from "react";
import {
  ThemeProvider, createTheme, CssBaseline, Box, Typography, Button, Chip,
  Stack, Card, CardContent, Drawer, Badge, Fab, LinearProgress, IconButton,
  Divider, TextField, InputAdornment, MenuItem, Tooltip, Snackbar, Alert,
  Container, AppBar, Toolbar
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import bg from "./assets/family diwali.png";

const PHONE = "919999999999"; // Replace with your WhatsApp number: country code + number
const FREE_DELIVERY = 1500;
const DIWALI = new Date(2026, 10, 8);
const BG_IMAGE = bg;

// Fonts (add the Google Fonts link in index.html, see instructions)
const HEADING_FONT = "'Playfair Display', Georgia, serif";
const BODY_FONT = "'Poppins', system-ui, sans-serif";

// Soft light button colours that match the night-sky + festival palette
const LIGHT_GOLD = "#ffe9bd";
const LIGHT_PINK = "#ffd0e0";
const BUTTON_GRADIENT = `linear-gradient(135deg, ${LIGHT_GOLD}, ${LIGHT_PINK})`;
const BUTTON_GRADIENT_HOVER = "linear-gradient(135deg, #fff2d6, #ffdce8)";
const ON_LIGHT = "#2a1759";

const PRODUCTS = [
  { id: 1, name: "Sparklers, 10 pcs", desc: "30 cm sparklers with golden effects.", price: 80, cat: "kids", icon: "✨", color: "#ffb627", tag: "Popular", image: "/products/sparklers.png" },
  { id: 2, name: "Colour Flower Pots, 5 pcs", desc: "Colourful fountain-style effects.", price: 250, cat: "ground", icon: "🌸", color: "#e4358a", tag: "Bestseller", image: "/products/flowerpot.png" },
  { id: 3, name: "Ground Chakkar, 10 pcs", desc: "A classic spinning celebration effect.", price: 120, cat: "ground", icon: "🌀", color: "#19c3a0", image: "/products/chakkra.png" },
  { id: 4, name: "Sky Rocket Trio", desc: "Three rockets for outdoor celebrations.", price: 180, cat: "sky", icon: "🚀", color: "#6aa8ff", image: "/products/rocket.png" },
  { id: 5, name: "5-Colour Sky Shot, 12 shots", desc: "A colourful aerial display.", price: 650, cat: "sky", icon: "🎆", color: "#b06bff", tag: "Featured", image: "/products/skyshot.jpg" },
  { id: 6, name: "Lakshmi Crackers, 100 pcs", desc: "A traditional string-cracker pack.", price: 140, cat: "sound", icon: "💥", color: "#ff5a3c", image: "/products/lakshmi.jpg" },
  { id: 7, name: "Magic Pop-Pop, 20 pcs", desc: "Small novelty snap-pops. Follow pack instructions.", price: 60, cat: "kids", icon: "🎈", color: "#19c3a0", image: "/products/magicpoppop.jpg" },
  { id: 8, name: "Family Gift Box, 30 items", desc: "A curated mix of celebration favourites.", price: 1499, cat: "box", icon: "🎁", color: "#ffb627", tag: "Value pack", image: "/products/familygiftbox.jpg" },
];

const CATS = {
  all: "All products", kids: "Sparklers & novelties", ground: "Ground", sky: "Sky", sound: "Sound", box: "Gift boxes"
};
const rs = (value) => "₹" + Number(value).toLocaleString("en-IN");
const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: LIGHT_GOLD, contrastText: ON_LIGHT },
    secondary: { main: "#ec5a9b" },
    success: { main: "#39c9a7" },
    background: { default: "#130d29", paper: "#241844" },
    text: { primary: "#fff5e6", secondary: "#c9bddf" },
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: BODY_FONT,
    h1: { fontFamily: HEADING_FONT, fontWeight: 800 },
    h2: { fontFamily: HEADING_FONT, fontWeight: 800 },
    h3: { fontFamily: HEADING_FONT, fontWeight: 800 },
    h4: { fontFamily: HEADING_FONT, fontWeight: 700 },
    h5: { fontFamily: HEADING_FONT, fontWeight: 700 },
    h6: { fontFamily: HEADING_FONT, fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth", width: "100%", overflowX: "clip" },
        body: { margin: 0, width: "100%", minWidth: 0, overflowX: "clip", backgroundColor: "#130d29" },
        "#root": { width: "100%", minWidth: 0, overflowX: "clip" },
        "*": { boxSizing: "border-box", minWidth: 0 },
        "img, video, canvas, svg": { maxWidth: "100%" },
        "::selection": { background: "#ec5a9b", color: "#fff" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, minHeight: 34, padding: "5px 14px", fontSize: ".85rem", lineHeight: 1.4 },
        sizeSmall: { minHeight: 30, padding: "3px 10px", fontSize: ".8rem" },
        sizeLarge: { minHeight: 40, padding: "7px 20px", fontSize: ".92rem" },
        containedPrimary: {
          background: BUTTON_GRADIENT,
          color: ON_LIGHT,
          boxShadow: "0 6px 18px rgba(255,208,224,.16)",
          "&:hover": { background: BUTTON_GRADIENT_HOVER, boxShadow: "0 8px 22px rgba(255,208,224,.26)" },
          "&.Mui-disabled": { background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.4)" },
        },
        outlinedPrimary: {
          borderColor: "rgba(255,233,189,.55)",
          color: LIGHT_GOLD,
          "&:hover": { borderColor: LIGHT_GOLD, backgroundColor: "rgba(255,233,189,.1)" },
        },
        outlinedInherit: {
          borderColor: "rgba(255,233,189,.4)",
          "&:hover": { borderColor: LIGHT_GOLD, backgroundColor: "rgba(255,233,189,.08)" },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: { borderRadius: 10, height: 44, minHeight: 44 },
        extended: { borderRadius: 10, height: 44, minHeight: 44, padding: "0 16px" },
        primary: {
          background: BUTTON_GRADIENT,
          color: ON_LIGHT,
          "&:hover": { background: BUTTON_GRADIENT_HOVER },
        },
      },
    },
    MuiCard: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

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
        <Card key={label} sx={{ minWidth: { xs: 68, sm: 88 }, flex: { xs: 1, sm: "initial" }, px: { xs: 0.6, sm: 1 }, py: 1.1, textAlign: "center", bgcolor: "rgba(36,24,68,.88)", border: "1px solid rgba(255,255,255,.09)" }}>
          <Typography variant="h5" color="primary" fontWeight={700}>{String(value).padStart(2, "0")}</Typography>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
        </Card>
      ))}
    </Stack>
  );
}

function Fireworks() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let raf = 0;
    let lastLaunch = 0;
    let particles = [];
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const burst = (x, y) => {
      const hue = Math.random() * 360;
      for (let i = 0; i < 24; i += 1) {
        const angle = (Math.PI * 2 * i) / 24;
        const speed = 0.8 + Math.random() * 2.1;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, hue });
      }
    };
    const frame = (time) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (!reduceMotion && !document.hidden && time - lastLaunch > 1900) {
        burst(Math.random() * window.innerWidth, 70 + Math.random() * Math.min(260, window.innerHeight * 0.35));
        lastLaunch = time;
      }
      particles = particles.filter((p) => p.life > 0.04);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.018; p.life -= 0.014;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 68%, ${p.life * 0.65})`;
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = window.requestAnimationFrame(frame);
    };
    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) raf = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

function ProductCard({ product, quantity, favorite, onAdd, onFavorite }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <Card sx={{
      height: "100%", minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden",
      bgcolor: "rgba(36,24,68,.92)", border: "1px solid rgba(255,255,255,.08)",
      transition: "transform .2s ease, border-color .2s ease, box-shadow .2s ease",
      "@media (hover: hover)": { "&:hover": { transform: "translateY(-5px)", borderColor: `${product.color}88`, boxShadow: "0 16px 38px rgba(0,0,0,.22)" } },
    }}>
      <Box sx={{ position: "relative", height: { xs: 150, sm: 170, md: 190 }, overflow: "hidden", display: "grid", placeItems: "center", background: `radial-gradient(circle at 50% 115%, ${product.color}66, transparent 68%)` }}>
        {product.image && !imgFailed ? (
          <Box component="img" src={product.image} alt={product.name} loading="lazy" onError={() => setImgFailed(true)}
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .4s ease", "@media (hover: hover)": { ".MuiCard-root:hover &": { transform: "scale(1.06)" } } }} />
        ) : (
          <Typography aria-hidden="true" sx={{ fontSize: { xs: "3.1rem", sm: "3.8rem" }, filter: "drop-shadow(0 8px 18px rgba(0,0,0,.22))" }}>{product.icon}</Typography>
        )}
        {product.tag && <Chip size="small" label={product.tag} sx={{ position: "absolute", top: 12, left: 12, bgcolor: "rgba(19,13,41,.6)", color: "text.primary", backdropFilter: "blur(8px)" }} />}
        <Tooltip title={favorite ? "Remove from favourites" : "Add to favourites"}>
          <IconButton aria-label={favorite ? "Remove from favourites" : "Add to favourites"} onClick={() => onFavorite(product.id)}
            sx={{ position: "absolute", top: 6, right: 6, bgcolor: "rgba(19,13,41,.55)", backdropFilter: "blur(6px)", color: favorite ? "secondary.main" : "text.primary", "&:hover": { bgcolor: "rgba(19,13,41,.75)" } }}>
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1, p: { xs: 1.7, sm: 2.2 } }}>
        <Typography component="h3" sx={{ fontFamily: HEADING_FONT, fontSize: { xs: "1rem", sm: "1.08rem", md: "1.12rem" }, lineHeight: 1.3, fontWeight: 700, overflowWrap: "anywhere" }}>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: { xs: "auto", sm: 40 }, overflowWrap: "anywhere" }}>{product.desc}</Typography>
        <Box sx={{ mt: "auto", pt: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Typography variant="h6" color="primary" fontWeight={700}>{rs(product.price)}</Typography>
            <Button variant={quantity ? "outlined" : "contained"} size="small" sx={{ flexShrink: 0, minWidth: 0, px: 1.6 }} onClick={() => onAdd(product)}>
              {quantity ? `Add more · ${quantity}` : "Add to box"}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => readStorage("sparks-favorites", []));
  const [cart, setCart] = useState(() => readStorage("sparks-cart", {}));
  const [cartOpen, setCartOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => { localStorage.setItem("sparks-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("sparks-favorites", JSON.stringify(favorites)); }, [favorites]);

  const lines = useMemo(
    () => PRODUCTS.filter((product) => Number(cart[product.id]) > 0).map((product) => ({ ...product, qty: Number(cart[product.id]) })),
    [cart]
  );
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const remainingForDelivery = Math.max(0, FREE_DELIVERY - total);
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => category === "all" || product.cat === category);
    if (favoritesOnly) result = result.filter((product) => favorites.includes(product.id));
    const term = search.trim().toLowerCase();
    if (term) result = result.filter((product) => `${product.name} ${product.desc} ${CATS[product.cat]}`.toLowerCase().includes(term));
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [category, favoritesOnly, favorites, search, sort]);

  const add = (product) => {
    setCart((current) => ({ ...current, [product.id]: (Number(current[product.id]) || 0) + 1 }));
    setToast(`${product.name} added to your box`);
  };
  const changeQuantity = (id, delta) => {
    setCart((current) => {
      const next = { ...current };
      const qty = Math.max(0, (Number(next[id]) || 0) + delta);
      if (qty === 0) delete next[id]; else next[id] = qty;
      return next;
    });
  };
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const orderMessage = [
    "Hi PyroGang, I’d like to place an order:",
    ...lines.map((line) => `• ${line.qty} × ${line.name} — ${rs(line.price * line.qty)}`),
    `Subtotal: ${rs(total)}`,
    remainingForDelivery === 0 ? "Delivery: Free (subject to service availability)" : `Free-delivery threshold remaining: ${rs(remainingForDelivery)}`,
    orderNote.trim() ? `Note: ${orderNote.trim()}` : "",
    "Please confirm availability, delivery charges and final total."
  ].filter(Boolean).join("\n");
  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(orderMessage)}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Background photo with a dark overlay so text stays readable.
          Lower the rgba alpha values to show more of the photo. */}
      <Box
        aria-hidden="true"
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `linear-gradient(180deg, rgba(19,13,41,.55) 0%, rgba(19,13,41,.82) 60%, rgba(19,13,41,.95) 100%), url("${BG_IMAGE}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Fireworks />

      <Box sx={{ position: "relative", zIndex: 1, minHeight: "100vh", width: "100%", minWidth: 0, overflowX: "clip" }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(19,13,41,.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: { xs: 58, sm: 68, md: 72 }, gap: { xs: 0.75, sm: 2 }, px: { xs: 0.25, sm: 0 } }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography component="a" href="#" sx={{ color: LIGHT_GOLD, fontFamily: HEADING_FONT, fontWeight: 800, fontSize: { xs: "1.2rem", sm: "1.45rem", md: "1.6rem" }, letterSpacing: ".01em", textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                  PyroGang
                </Typography>
              </Box>
              <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center" sx={{ flexShrink: 0 }}>
                <Button color="inherit" href="#shop" sx={{ display: { xs: "none", sm: "inline-flex" } }}>Shop</Button>
                <Button color="inherit" href="#safety" sx={{ display: { xs: "none", sm: "inline-flex" } }}>Safety</Button>
                <Button variant="outlined" color="inherit" onClick={() => setCartOpen(true)} startIcon={<ShoppingBagIcon />} sx={{ minWidth: { xs: 0, sm: "auto" }, px: { xs: 1, sm: 2 }, fontSize: { xs: ".78rem", sm: ".875rem" } }}>
                  <Badge badgeContent={count} color="secondary"> <Box component="span" sx={{ pr: 1 }}>Cart</Box> </Badge>
                </Button>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        <Box component="main">
          <Box sx={{
            minHeight: { xs: "auto", md: "min(760px, calc(100svh - 72px))" },
            display: "grid", placeItems: "center", textAlign: "center",
            px: { xs: 1.75, sm: 4 }, py: { xs: 7, sm: 10, md: 14 }, width: "100%", minWidth: 0,
            background: "radial-gradient(ellipse at 50% 35%, rgba(111,63,168,.25), transparent 58%)",
          }}>
            <Container maxWidth="md">
              <Chip label="Make every celebration memorable" sx={{ mb: 3, px: 0.5, bgcolor: "rgba(255,233,189,.12)", color: LIGHT_GOLD, border: "1px solid rgba(255,233,189,.3)" }} />
              <Typography component="h1" variant="h1" sx={{ fontSize: "clamp(2.25rem, 8.5vw, 6rem)", lineHeight: { xs: 1.1, sm: 1.05 }, overflowWrap: "anywhere", letterSpacing: "-.02em", textShadow: "0 0 36px rgba(255,233,189,.2)" }}>
                The sky is yours.
                <Box component="span" sx={{ display: "block", color: LIGHT_GOLD }}>Celebrate bright.</Box>
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: "54ch", mx: "auto", mt: 2, fontSize: { xs: ".94rem", sm: "1.05rem", md: "1.15rem" }, lineHeight: 1.75, px: { xs: 0.5, sm: 0 } }}>
                Explore celebration essentials from Sivakasi, build your order and send it to us directly on WhatsApp.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" spacing={1.5} sx={{ mt: 3.5 }}>
                <Button fullWidth sx={{ width: { xs: "100%", sm: "auto" } }} variant="contained" size="large" href="#shop">Explore collection</Button>
                <Button fullWidth sx={{ width: { xs: "100%", sm: "auto" } }} variant="outlined" color="inherit" size="large" href="#safety">Read safety guide</Button>
              </Stack>
              <Countdown />
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                Diwali countdown · 8 November 2026
              </Typography>
            </Container>
          </Box>

          <Container id="shop" maxWidth="lg" sx={{ py: { xs: 5, sm: 7, md: 10 }, px: { xs: 0, sm: 1 }, scrollMarginTop: "84px", minWidth: 0 }}>
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", md: "end" }} gap={2} sx={{ mb: 3 }}>
              <Box>
                <Typography component="h2" variant="h2" sx={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>Pick your sparks</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>Find your favourites, compare prices and build your celebration box.</Typography>
              </Box>
              <Chip icon={<LocalShippingOutlinedIcon />} label={`Free delivery above ${rs(FREE_DELIVERY)}*`} color="success" variant="outlined" sx={{ alignSelf: { xs: "flex-start", md: "center" } }} />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 2.5 }}>
              <TextField fullWidth size="small" placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)}
                inputProps={{ "aria-label": "Search products" }}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
              <TextField select size="small" value={sort} onChange={(event) => setSort(event.target.value)} sx={{ minWidth: { xs: "100%", sm: 190 } }} label="Sort by">
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-low">Price: low to high</MenuItem>
                <MenuItem value="price-high">Price: high to low</MenuItem>
                <MenuItem value="name">Name: A to Z</MenuItem>
              </TextField>
            </Stack>

            <Stack direction="row" alignItems="center" gap={1} useFlexGap sx={{ mb: 2, pb: 0.5, flexWrap: "wrap", width: "100%", "& .MuiChip-root": { maxWidth: "100%" }, "& .MuiChip-label": { whiteSpace: "normal", display: "block" } }}>
              <FilterListIcon color="action" />
              {Object.entries(CATS).map(([key, label]) => (
                <Chip key={key} label={label} clickable onClick={() => setCategory(key)} color={category === key ? "secondary" : "default"} variant={category === key ? "filled" : "outlined"} />
              ))}
              <Chip label="Favourites" clickable icon={<FavoriteIcon />} onClick={() => setFavoritesOnly((value) => !value)} color={favoritesOnly ? "secondary" : "default"} variant={favoritesOnly ? "filled" : "outlined"} />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} aria-live="polite">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </Typography>
            {filteredProducts.length ? (
              <Box sx={{ width: "100%", minWidth: 0, display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: { xs: 1.5, sm: 2, md: 2.5 }, "@media (min-width: 420px) and (max-width: 599.95px)": { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" } }}>
                {filteredProducts.map((product) => <ProductCard key={product.id} product={product} quantity={cart[product.id] || 0} favorite={favorites.includes(product.id)} onAdd={add} onFavorite={toggleFavorite} />)}
              </Box>
            ) : (
              <Card sx={{ p: 4, textAlign: "center", bgcolor: "background.paper" }}>
                <Typography variant="h6">No products found</Typography>
                <Typography color="text.secondary" sx={{ my: 1 }}>Try another search or clear your filters.</Typography>
                <Button onClick={() => { setSearch(""); setCategory("all"); setFavoritesOnly(false); }}>Clear filters</Button>
              </Card>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2.5 }}>
              *Delivery eligibility, service area and charges must be confirmed by the shop before order confirmation.
            </Typography>
          </Container>

          <Box id="safety" sx={{ bgcolor: "rgba(36,24,68,.72)", borderTop: "1px solid rgba(255,255,255,.07)", borderBottom: "1px solid rgba(255,255,255,.07)", scrollMarginTop: "80px" }}>
            <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7, md: 8 }, minWidth: 0 }}>
              <Typography component="h2" variant="h2" sx={{ fontSize: "clamp(2rem, 5vw, 3rem)", mb: 1 }}>Celebrate safely</Typography>
              <Typography color="text.secondary" sx={{ mb: 3, maxWidth: "65ch" }}>Fireworks can cause serious injuries and fires. Follow the product label and local rules every time.</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" }, gap: 2.5 }}>
                {[
                  ["Use an open outdoor area", "Keep well away from buildings, vehicles, dry leaves and crowds."],
                  ["Keep water nearby", "Keep a bucket of water or hose ready and dispose of used items safely."],
                  ["Adult supervision", "Children should not handle or light fireworks. Keep spectators at a safe distance."],
                  ["Never relight a dud", "Do not approach or relight a firework that fails. Follow its label and local safety guidance."],
                ].map(([title, description]) => (
                  <Box key={title} sx={{ borderLeft: "3px solid", borderColor: "success.main", pl: 2 }}>
                    <Typography fontWeight={600}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: .7, lineHeight: 1.7 }}>{description}</Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>
        </Box>

        <Box component="footer" sx={{ px: 2, py: 5, pb: { xs: 12, sm: 5 }, textAlign: "center", color: "text.secondary" }}>
          <Typography sx={{ fontFamily: HEADING_FONT, fontSize: "1.3rem", color: LIGHT_GOLD }} fontWeight={800}>PyroGang</Typography>
          <Typography variant="body2" sx={{ mt: .5 }}>Add your shop address, verified phone number and applicable licence details here.</Typography>
          <Typography variant="caption" sx={{ display: "block", mt: 1 }}>Product availability and orders are subject to shop confirmation and applicable local regulations.</Typography>
        </Box>

        <Fab color="primary" variant="extended" aria-label="Open shopping cart" onClick={() => setCartOpen(true)}
          sx={{ position: "fixed", right: { xs: 12, sm: 24 }, bottom: "calc(12px + env(safe-area-inset-bottom, 0px))", zIndex: 5, maxWidth: "calc(100vw - 24px)", boxShadow: "0 8px 28px rgba(0,0,0,.35)", fontSize: { xs: ".78rem", sm: ".875rem" }, whiteSpace: "nowrap" }}>
          <Badge badgeContent={count} color="secondary" sx={{ mr: 1.5 }}><ShoppingBagIcon /></Badge>
          Your box · {rs(total)}
        </Fab>

        <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}
          PaperProps={{ sx: { width: { xs: "100vw", sm: 430 }, maxWidth: "100vw", minWidth: 0, p: { xs: 1.5, sm: 3 }, display: "flex", flexDirection: "column", bgcolor: "background.paper", pb: "calc(16px + env(safe-area-inset-bottom, 0px))", overflowX: "hidden" } }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} gap={1}>
            <Box>
              <Typography variant="h5">Your celebration box</Typography>
              <Typography variant="caption" color="text.secondary">{count} {count === 1 ? "item" : "items"}</Typography>
            </Box>
            <Button size="small" color="inherit" onClick={() => setCartOpen(false)} sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}>Continue shopping</Button>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ flex: 1, overflowY: "auto", minHeight: 120 }}>
            {!lines.length ? (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography sx={{ fontSize: "3rem" }}>🛍️</Typography>
                <Typography fontWeight={600}>Your box is waiting</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Add a few favourites to get started.</Typography>
                <Button sx={{ mt: 2 }} onClick={() => setCartOpen(false)}>Browse products</Button>
              </Box>
            ) : lines.map((line) => (
              <Box key={line.id}>
                <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }} sx={{ py: 1.6, minWidth: 0 }}>
                  <Box sx={{ width: 48, height: 48, flexShrink: 0, borderRadius: 2, overflow: "hidden", display: "grid", placeItems: "center", bgcolor: `${line.color}22`, fontSize: "1.7rem" }}>{line.image ? <Box component="img" src={line.image} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} /> : line.icon}</Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={600} sx={{ lineHeight: 1.3, overflowWrap: "anywhere" }}>{line.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{rs(line.price)} each</Typography>
                    <Typography variant="body2" color="primary.main" fontWeight={600}>{rs(line.price * line.qty)}</Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" sx={{ flexShrink: 0 }}>
                    <IconButton size="small" aria-label={`Remove one ${line.name}`} onClick={() => changeQuantity(line.id, -1)}><RemoveIcon fontSize="small" /></IconButton>
                    <Typography sx={{ minWidth: 22, textAlign: "center" }}>{line.qty}</Typography>
                    <IconButton size="small" aria-label={`Add one ${line.name}`} onClick={() => changeQuantity(line.id, 1)}><AddIcon fontSize="small" /></IconButton>
                  </Stack>
                </Stack>
                <Divider />
              </Box>
            ))}
          </Box>
          {lines.length > 0 && (
            <>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">{remainingForDelivery === 0 ? "Free-delivery threshold reached*" : `Add ${rs(remainingForDelivery)} to reach free-delivery threshold`}</Typography>
                <Tooltip title="Clear your box">
                  <IconButton aria-label="Clear cart" color="error" onClick={() => setCart({})}><DeleteOutlineIcon /></IconButton>
                </Tooltip>
              </Stack>
              <LinearProgress variant="determinate" value={Math.min(100, (total / FREE_DELIVERY) * 100)} color="secondary" sx={{ height: 9, borderRadius: 10, my: 1 }} />
              <TextField label="Order note (optional)" placeholder="Any preferences or delivery details?" multiline minRows={2} maxRows={3} value={orderNote} onChange={(event) => setOrderNote(event.target.value)} fullWidth size="small" sx={{ mt: 1, mb: 2 }} />
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="h6" color="primary" fontWeight={700}>{rs(total)}</Typography>
              </Stack>
              <Button component="a" href={whatsappUrl} target="_blank" rel="noopener noreferrer" variant="contained" size="large" fullWidth startIcon={<WhatsAppIcon />}>
                Send order on WhatsApp
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.2, textAlign: "center" }}>
                Your order is not confirmed until the shop verifies stock, delivery and final charges.
              </Typography>
            </>
          )}
        </Drawer>

        <Snackbar open={Boolean(toast)} autoHideDuration={2200} onClose={() => setToast("")} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
          <Alert onClose={() => setToast("")} severity="success" variant="filled" sx={{ width: "100%" }}>{toast}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
