import { useEffect, useState } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
  AppBar, Badge, Box, Button, Container, Divider, Drawer, Fab, IconButton, List,
  ListItemButton, ListItemText, Stack, Toolbar, Typography,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Fireworks from "./Fireworks";
import bg from "../assets/family diwali.png";
import { useEstimate } from "../context/EstimateContext";
import { HEADING_FONT, LIGHT_GOLD, PHONE, SHOP } from "../theme";

const BG_POSITION_MOBILE = "60% center";

// true = your family photo as the background (default). false = plain night sky instead.
const USE_PHOTO = true;

const stars = [
  [8, 12], [17, 34], [26, 8], [34, 22], [43, 14], [52, 30], [61, 9], [70, 25],
  [78, 15], [86, 33], [93, 11], [12, 52], [30, 60], [47, 48], [64, 58], [82, 50], [95, 64], [22, 78], [58, 82], [88, 85],
].map(([x, y], i) => `radial-gradient(${i % 3 === 0 ? 2 : 1.4}px ${i % 3 === 0 ? 2 : 1.4}px at ${x}% ${y}%, rgba(255,245,230,${i % 2 ? 0.7 : 0.45}), transparent)`);
const SKY = [
  ...stars,
  "radial-gradient(ellipse at 18% 0%, rgba(111,63,168,.38), transparent 55%)",
  "radial-gradient(ellipse at 85% 10%, rgba(236,90,155,.16), transparent 50%)",
  "linear-gradient(180deg, #0d0821 0%, #170f38 55%, #130d29 100%)",
].join(", ");
const NAV = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["Collections", "/collections"],
  ["Estimate", "/estimate"],
  ["Payment", "/payment"],
  ["Contact", "/contact-us"],
  ["Track Order", "/track-order"],
];

// Your logo file: public/products/logo.png (change the path here if you move it)
const LOGO = "/products/logo.png";

function Logo({ height = 40, nameSize = "1.4rem", showName = true }) {
  const [failed, setFailed] = useState(false);
  return (
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0 }}>
      {!failed && (
        <Box component="img" src={LOGO} alt={showName ? "" : SHOP.name} onError={() => setFailed(true)}
          sx={{ height, width: "auto", flexShrink: 0, display: "block" }} />
      )}
      {(showName || failed) && (
        <Typography component="span" noWrap sx={{ color: LIGHT_GOLD, fontFamily: HEADING_FONT, fontWeight: 800, fontSize: nameSize, lineHeight: 1.1, letterSpacing: ".01em" }}>
          {SHOP.name}
        </Typography>
      )}
    </Stack>
  );
}

function AnnouncementBar() {
  return (
    <Box sx={{ bgcolor: "#1b1236", borderBottom: "1px solid rgba(255,233,189,.25)", py: 0.7, overflow: "hidden", position: "relative", zIndex: 2 }}>
      <Typography
        sx={{
          color: LIGHT_GOLD, whiteSpace: "nowrap", fontSize: ".85rem", fontWeight: 500, letterSpacing: ".03em", display: "inline-block", pl: "100%",
          animation: "marquee 20s linear infinite",
          "@keyframes marquee": { to: { transform: "translateX(-100%)" } },
          "@media (prefers-reduced-motion: reduce)": { animation: "none", pl: 2 },
        }}>
        {SHOP.name} wishes Happy Diwali · Celebrate More | Sparkle Brighter | Shine Together
      </Typography>
    </Box>
  );
}

function Header() {
  const { count } = useEstimate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(19,13,41,.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 70, md: 84 }, gap: 1 }}>
          <IconButton aria-label="Open menu" color="inherit" onClick={() => setMenuOpen(true)} sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box component={RouterLink} to="/" aria-label={`${SHOP.name} home`} sx={{ display: "inline-flex", textDecoration: "none", maxWidth: "100%" }}>
              <Logo height={{ xs: 46, md: 60 }} nameSize={{ xs: "1.1rem", md: "1.65rem" }} />
            </Box>
          </Box>
          <Stack direction="row" spacing={{ md: 0.5, lg: 1.5 }} justifyContent="center" alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
            {NAV.filter(([, to]) => to !== "/estimate").map(([label, to]) => (
              <Button key={to} component={RouterLink} to={to} color="inherit"
                sx={{ color: pathname === to ? LIGHT_GOLD : "text.primary", borderBottom: pathname === to ? `2px solid ${LIGHT_GOLD}` : "2px solid transparent", borderRadius: 0, px: 1.75 }}>
                {label}
              </Button>
            ))}
          </Stack>
          <Box sx={{ flex: { xs: "none", md: 1 }, display: "flex", justifyContent: "flex-end" }}>
            <Button component={RouterLink} to="/estimate" variant="outlined" color="inherit" startIcon={<ShoppingBagIcon />}>
              <Badge badgeContent={count} color="secondary" max={999}><Box component="span" sx={{ pr: 1 }}>Estimate</Box></Badge>
            </Button>
          </Box>
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)} PaperProps={{ sx: { width: 260, bgcolor: "background.paper" } }}>
        <Box sx={{ p: 2 }}><Logo height={52} nameSize="1.3rem" /></Box>
        <Divider />
        <List>
          {NAV.map(([label, to]) => (
            <ListItemButton key={to} component={RouterLink} to={to} selected={pathname === to} onClick={() => setMenuOpen(false)}>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
          <ListItemButton component={RouterLink} to="/feedback" onClick={() => setMenuOpen(false)}>
            <ListItemText primary="Feedback" />
          </ListItemButton>
          <ListItemButton component="a" href="/pricelist.pdf" download onClick={() => setMenuOpen(false)}>
            <ListItemText primary="Download price list" />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
}

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "rgba(19,13,41,.92)", borderTop: "1px solid rgba(255,255,255,.08)", mt: 6, pb: { xs: 14, sm: 6 } }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" } }}>
          <Box>
            <Logo height={68} nameSize="1.6rem" />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Celebration essentials from Sivakasi. Select your products and request an estimate.</Typography>
          </Box>
          <Box>
            <Typography fontWeight={600} sx={{ mb: 1 }}>Quick links</Typography>
            <Stack spacing={0.5}>
              {[...NAV, ["Feedback", "/feedback"]].map(([label, to]) => (
                <Typography key={to} component={RouterLink} to={to} variant="body2" color="text.secondary" sx={{ textDecoration: "none", "&:hover": { color: LIGHT_GOLD } }}>{label}</Typography>
              ))}
              <Typography component="a" href="/pricelist.pdf" download variant="body2" color="text.secondary" sx={{ textDecoration: "none", "&:hover": { color: LIGHT_GOLD } }}>Download price list</Typography>
            </Stack>
          </Box>
          <Box>
            <Typography fontWeight={600} sx={{ mb: 1 }}>Contact us</Typography>
            <Typography variant="body2" color="text.secondary">{SHOP.address}</Typography>
            <Typography variant="body2" color="text.secondary">{SHOP.phoneDisplay}</Typography>
            <Typography variant="body2" color="text.secondary">{SHOP.email}</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
          As per the 2018 Supreme Court order, online sale of firecrackers is not permitted. Please select your products on the Estimate page and submit your request; the shop will confirm availability, charges and final amount. Add your licence details here.
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>© 2026 {SHOP.name}. All rights reserved.</Typography>
      </Container>
    </Box>
  );
}

function FloatingActions() {
  const { pathname } = useLocation();
  const raised = pathname === "/estimate"; // keep clear of the estimate bar
  const bottom = `calc(${raised ? 84 : 12}px + env(safe-area-inset-bottom, 0px))`;
  return (
    <>
      {/* Phones: two small round icon buttons only (price list is in the menu and footer) */}
      <Stack spacing={1} sx={{ display: { xs: "flex", sm: "none" }, position: "fixed", right: 10, bottom, zIndex: 5 }}>
        <Fab size="small" color="success" aria-label="Chat on WhatsApp" href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" sx={{ color: "#06281f", boxShadow: 3 }}>
          <WhatsAppIcon />
        </Fab>
        <Fab size="small" color="primary" aria-label="Call now" href={`tel:+${PHONE}`} sx={{ boxShadow: 3 }}>
          <PhoneIcon />
        </Fab>
      </Stack>

      {/* Tablet and desktop: labelled buttons */}
      <Stack spacing={1} sx={{ display: { xs: "none", sm: "flex" }, position: "fixed", left: 20, bottom, zIndex: 5 }}>
        <Button variant="contained" size="small" startIcon={<PictureAsPdfIcon />} href="/pricelist.pdf" download sx={{ boxShadow: 3 }}>Price list</Button>
        <Button variant="contained" size="small" startIcon={<PhoneIcon />} href={`tel:+${PHONE}`} sx={{ boxShadow: 3 }}>Call now</Button>
        <Button variant="contained" size="small" color="success" startIcon={<WhatsAppIcon />} href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" sx={{ boxShadow: 3, color: "#06281f" }}>Chat now</Button>
      </Stack>
    </>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Scroll to top on page change, or to #category_x when a hash is present
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return undefined; }
    const timer = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return (
    <>
      <Box aria-hidden="true" sx={{
        position: "fixed", top: 0, left: 0, right: 0, height: "100lvh", zIndex: 0, backgroundColor: "#130d29",
        backgroundImage: !USE_PHOTO ? SKY : {
          xs: `linear-gradient(180deg, rgba(19,13,41,.7) 0%, rgba(19,13,41,.88) 55%, rgba(19,13,41,.97) 100%), url("${bg}")`,
          md: `linear-gradient(180deg, rgba(19,13,41,.55) 0%, rgba(19,13,41,.82) 60%, rgba(19,13,41,.95) 100%), url("${bg}")`,
        },
        backgroundSize: "cover", backgroundPosition: { xs: BG_POSITION_MOBILE, md: "center" }, backgroundRepeat: "no-repeat",
        transform: "translateZ(0)",
      }} />
      <Fireworks />
      <Box sx={{ position: "relative", zIndex: 1, minHeight: "100vh", width: "100%", overflowX: "clip" }}>
        <AnnouncementBar />
        <Header />
        <Box component="main"><Outlet /></Box>
        <Footer />
        <FloatingActions />
      </Box>
    </>
  );
}
