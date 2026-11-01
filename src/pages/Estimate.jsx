import { useState } from "react";
import {
  Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, InputAdornment, Stack, TextField, Tooltip, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CATEGORIES } from "../data/products";
import { PRODUCTS } from "../data/products";
import { useEstimate } from "../context/EstimateContext";
import { HEADING_FONT, rs } from "../theme";

function Thumb({ product, color }) {
  const [failed, setFailed] = useState(false);
  return (
    <Box sx={{ width: 56, height: 56, flexShrink: 0, borderRadius: 2, overflow: "hidden", display: "grid", placeItems: "center", bgcolor: `${color}22`, fontSize: "1.8rem" }}>
      {product.image && !failed
        ? <Box component="img" src={product.image} alt="" loading="lazy" onError={() => setFailed(true)} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : product.name.charAt(0)}
    </Box>
  );
}

function Row({ product, cat }) {
  const { cart, setQty, changeQty } = useEstimate();
  const qty = cart[product.id] || 0;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ py: 1.4, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
      <Thumb product={product} color={cat.color} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
          <Typography fontWeight={600} sx={{ overflowWrap: "anywhere", lineHeight: 1.3 }}>{product.name}</Typography>
          {product.tag && <Chip size="small" label={product.tag} sx={{ height: 20, fontSize: ".68rem" }} />}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: ".78rem" }}>{product.desc}</Typography>
        <Typography color="primary" fontWeight={700} sx={{ mt: 0.3 }}>{rs(product.price)}</Typography>
      </Box>
      <Stack direction="row" alignItems="center" sx={{ flexShrink: 0 }}>
        <IconButton size="small" aria-label={`Remove one ${product.name}`} disabled={!qty} onClick={() => changeQty(product.id, -1)}><RemoveIcon fontSize="small" /></IconButton>
        <TextField
          value={qty || ""} placeholder="0" size="small" variant="standard"
          onChange={(e) => setQty(product.id, e.target.value.replace(/\D/g, ""))}
          inputProps={{ inputMode: "numeric", "aria-label": `Quantity of ${product.name}`, style: { textAlign: "center", width: 36 } }}
          InputProps={{ disableUnderline: true }} />
        <IconButton size="small" aria-label={`Add one ${product.name}`} onClick={() => changeQty(product.id, 1)}><AddIcon fontSize="small" /></IconButton>
      </Stack>
    </Stack>
  );
}

export default function Estimate() {
  const { lines, total, count, clear, whatsappUrl } = useEstimate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", note: "" });
  const term = search.trim().toLowerCase();
  const visible = PRODUCTS.filter((p) => !term || `${p.name} ${p.desc}`.toLowerCase().includes(term));
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 }, pb: 14 }}>
      <Typography component="h1" variant="h2" sx={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>Get your estimate</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 2.5 }}>
        Choose the quantity for each item. Your estimate total updates as you go. Send it to us on WhatsApp and we will confirm availability and the final amount.
      </Typography>

      <TextField fullWidth size="small" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
        inputProps={{ "aria-label": "Search products" }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />

      <Stack direction="row" gap={1} sx={{ my: 2, overflowX: "auto", pb: 0.5, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" }, "& .MuiChip-root": { flexShrink: 0 } }}>
        {CATEGORIES.map((c) => (
          <Chip key={c.id} clickable label={c.name} variant="outlined" component="a" href={`#category_${c.id}`} />
        ))}
      </Stack>

      {CATEGORIES.map((cat) => {
        const items = visible.filter((p) => p.cat === cat.id);
        if (!items.length) return null;
        return (
          <Box key={cat.id} id={`category_${cat.id}`} sx={{ mt: 4, scrollMarginTop: "90px" }}>
            <Typography component="h2" variant="h4" sx={{ fontFamily: HEADING_FONT, mb: 0.5 }}>{cat.name}</Typography>
            {items.map((p) => <Row key={p.id} product={p} cat={cat} />)}
          </Box>
        );
      })}
      {!visible.length && <Typography color="text.secondary" sx={{ mt: 4 }}>No products found. Try another search.</Typography>}

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 4 }}>
        Prices are indicative. Availability, delivery eligibility, service area and charges are confirmed by the shop. Online sale of firecrackers is not permitted; this is an estimate request only.
      </Typography>

      {/* Sticky total bar */}
      <Box sx={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 6, bgcolor: "rgba(19,13,41,.96)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,.12)", pb: "env(safe-area-inset-bottom, 0px)" }}>
        <Container maxWidth="md" sx={{ py: 1.25, px: { xs: 2, sm: 3 } }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">{count} {count === 1 ? "item" : "items"}</Typography>
              <Typography variant="h6" color="primary" fontWeight={700} sx={{ lineHeight: 1.1 }}>{rs(total)}</Typography>
            </Box>
            <Tooltip title="Clear estimate">
              <span><IconButton aria-label="Clear estimate" color="error" disabled={!count} onClick={clear}><DeleteOutlineIcon /></IconButton></span>
            </Tooltip>
            <Button variant="contained" size="large" disabled={!count} onClick={() => setOpen(true)}>Get estimate</Button>
          </Stack>
        </Container>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontFamily: HEADING_FONT }}>Your estimate</DialogTitle>
        <DialogContent dividers>
          {lines.map((l) => (
            <Stack key={l.id} direction="row" justifyContent="space-between" gap={2} sx={{ py: 0.4 }}>
              <Typography variant="body2">{l.qty} × {l.name}</Typography>
              <Typography variant="body2" fontWeight={600}>{rs(l.price * l.qty)}</Typography>
            </Stack>
          ))}
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid rgba(255,255,255,.12)" }}>
            <Typography fontWeight={700}>Estimated total</Typography>
            <Typography color="primary" fontWeight={700}>{rs(total)}</Typography>
          </Stack>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            <TextField size="small" label="Your name" value={form.name} onChange={set("name")} fullWidth />
            <TextField size="small" label="City / delivery area" value={form.city} onChange={set("city")} fullWidth />
            <TextField size="small" label="Note (optional)" value={form.note} onChange={set("note")} fullWidth multiline minRows={2} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button color="inherit" onClick={() => setOpen(false)}>Back</Button>
          <Button variant="contained" startIcon={<WhatsAppIcon />} href={whatsappUrl(form)} target="_blank" rel="noopener noreferrer">Send on WhatsApp</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
