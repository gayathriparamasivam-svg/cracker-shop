import { createTheme } from "@mui/material";

export const PHONE = "918870322567"; // country code + number, no + or spaces
export const SHOP = {
  name: "PyroGang",
  phoneDisplay: "+91 88703 22567",
  email: "yourshop@email.com", // TODO
  address: "Add your shop address here", // TODO
};
export const DIWALI = new Date(2026, 10, 8);

export const HEADING_FONT = "'Playfair Display', Georgia, serif";
export const BODY_FONT = "'Poppins', system-ui, sans-serif";
export const LIGHT_GOLD = "#ffe9bd";
export const LIGHT_PINK = "#ffd0e0";
export const ON_LIGHT = "#2a1759";
export const BUTTON_GRADIENT = `linear-gradient(135deg, ${LIGHT_GOLD}, ${LIGHT_PINK})`;
export const BUTTON_GRADIENT_HOVER = "linear-gradient(135deg, #fff2d6, #ffdce8)";

export const rs = (value) => "₹" + Number(value).toLocaleString("en-IN");

export const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const theme = createTheme({
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
    MuiInputBase: {
      styleOverrides: { input: { "@media (max-width:600px)": { fontSize: "16px" } } },
    },
    MuiIconButton: {
      styleOverrides: { root: { "@media (pointer: coarse)": { minWidth: 40, minHeight: 40 } } },
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
        primary: { background: BUTTON_GRADIENT, color: ON_LIGHT, "&:hover": { background: BUTTON_GRADIENT_HOVER } },
      },
    },
    MuiCard: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});
