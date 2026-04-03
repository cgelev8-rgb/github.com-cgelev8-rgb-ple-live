"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
