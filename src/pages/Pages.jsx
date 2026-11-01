import { useState } from "react";
import { Box, Button, Card, Container, Stack, TextField, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { CategoryGrid } from "./Home";
import { PHONE, SHOP } from "../theme";

function PageShell({ title, intro, children, maxWidth = "md" }) {
  return (
    <Container maxWidth={maxWidth} sx={{ py: { xs: 4, md: 7 }, px: { xs: 2, sm: 3 } }}>
      <Typography component="h1" variant="h2" sx={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{title}</Typography>
      {intro && <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: "65ch", lineHeight: 1.8 }}>{intro}</Typography>}
      <Box sx={{ mt: 3 }}>{children}</Box>
    </Container>
  );
}

const panel = { p: { xs: 2, sm: 3 }, bgcolor: "rgba(36,24,68,.92)", border: "1px solid rgba(255,255,255,.08)" };
const waLink = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

export function About() {
  return (
    <PageShell title={`About ${SHOP.name}`}>
      <Card sx={panel}>
        {/* TODO: replace with your own story */}
        <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
          {SHOP.name} brings celebration essentials from Sivakasi to your doorstep area. We offer sparklers, flower pots, ground chakkars, rockets, sound crackers and gift boxes, selected for quality, colour and value.
        </Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.9, mt: 2 }}>
          Every product should be used as per the label, outdoors, under adult supervision. Celebrate bright and celebrate safe.
        </Typography>
      </Card>
    </PageShell>
  );
}

export function Collections() {
  return (
    <PageShell title="Our collections" intro="Choose a category to jump to its items on the estimate page." maxWidth="lg">
      <CategoryGrid />
    </PageShell>
  );
}

export function Payment() {
  return (
    <PageShell title="Payment" intro="After the shop confirms your estimate and final amount, you can pay using the details below.">
      <Card sx={panel}>
        {/* TODO: fill your real details */}
        <Stack spacing={1}>
          <Typography><b>Account name:</b> Your account name</Typography>
          <Typography><b>Bank:</b> Your bank</Typography>
          <Typography><b>Account number:</b> Add here</Typography>
          <Typography><b>IFSC:</b> Add here</Typography>
          <Typography><b>UPI / GPay:</b> {SHOP.phoneDisplay}</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          Please share the payment screenshot on WhatsApp after paying.
        </Typography>
      </Card>
    </PageShell>
  );
}

export function Contact() {
  return (
    <PageShell title="Contact us" intro="Call, message or visit us. We are happy to help with your celebration list.">
      <Card sx={panel}>
        <Stack spacing={2}>
          <Typography>{SHOP.address}</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button variant="contained" startIcon={<PhoneIcon />} href={`tel:+${PHONE}`}>{SHOP.phoneDisplay}</Button>
            <Button variant="outlined" color="inherit" startIcon={<WhatsAppIcon />} href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer">WhatsApp</Button>
            <Button variant="outlined" color="inherit" startIcon={<EmailIcon />} href={`mailto:${SHOP.email}`}>{SHOP.email}</Button>
          </Stack>
        </Stack>
      </Card>
    </PageShell>
  );
}

export function Feedback() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  return (
    <PageShell title="Feedback" intro="Tell us how we did. Your feedback helps us improve.">
      <Card sx={panel}>
        <Stack spacing={2}>
          <TextField label="Your name" size="small" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Your feedback" multiline minRows={4} value={message} onChange={(e) => setMessage(e.target.value)} fullWidth />
          <Button variant="contained" size="large" disabled={!message.trim()} startIcon={<WhatsAppIcon />} target="_blank" rel="noopener noreferrer"
            href={waLink(`Feedback for ${SHOP.name}${name.trim() ? ` from ${name.trim()}` : ""}:\n${message.trim()}`)}>
            Send feedback on WhatsApp
          </Button>
        </Stack>
      </Card>
    </PageShell>
  );
}

export function TrackOrder() {
  const [ref, setRef] = useState("");
  return (
    <PageShell title="Track your order" intro="Enter your estimate or order reference and we will share the latest status on WhatsApp.">
      <Card sx={panel}>
        <Stack spacing={2}>
          <TextField label="Reference number or name" size="small" value={ref} onChange={(e) => setRef(e.target.value)} fullWidth />
          <Button variant="contained" size="large" disabled={!ref.trim()} startIcon={<WhatsAppIcon />} target="_blank" rel="noopener noreferrer"
            href={waLink(`Hi ${SHOP.name}, please share the status of my order: ${ref.trim()}`)}>
            Ask for status
          </Button>
        </Stack>
      </Card>
    </PageShell>
  );
}
