import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import { PHONE, SHOP, rs, readStorage } from "../theme";

const EstimateContext = createContext(null);
export const useEstimate = () => useContext(EstimateContext);

export function EstimateProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("pyrogang-estimate", {}));

  useEffect(() => {
    try { localStorage.setItem("pyrogang-estimate", JSON.stringify(cart)); } catch { /* ignore */ }
  }, [cart]);

  const setQty = (id, qty) =>
    setCart((current) => {
      const next = { ...current };
      const q = Math.max(0, Math.floor(Number(qty) || 0));
      if (q === 0) delete next[id]; else next[id] = q;
      return next;
    });
  const changeQty = (id, delta) => setQty(id, (Number(cart[id]) || 0) + delta);
  const clear = () => setCart({});

  const lines = useMemo(
    () => PRODUCTS.filter((p) => Number(cart[p.id]) > 0).map((p) => ({ ...p, qty: Number(cart[p.id]) })),
    [cart]
  );
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  const whatsappUrl = ({ name = "", city = "", note = "" } = {}) => {
    const message = [
      `Hi ${SHOP.name}, please send me an estimate for these items:`,
      ...lines.map((l) => `• ${l.qty} × ${l.name} — ${rs(l.price * l.qty)}`),
      `Estimated total: ${rs(total)}`,
      name.trim() && `Name: ${name.trim()}`,
      city.trim() && `City: ${city.trim()}`,
      note.trim() && `Note: ${note.trim()}`,
      "Please confirm availability, delivery charges and the final amount.",
    ].filter(Boolean).join("\n");
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  };

  const value = { cart, lines, total, count, setQty, changeQty, clear, whatsappUrl };
  return <EstimateContext.Provider value={value}>{children}</EstimateContext.Provider>;
}
