import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { EstimateProvider } from "./context/EstimateContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Estimate from "./pages/Estimate";
import { About, Collections, Payment, Contact, Feedback, TrackOrder } from "./pages/Pages";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EstimateProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/estimate" element={<Estimate />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </EstimateProvider>
    </ThemeProvider>
  );
}
