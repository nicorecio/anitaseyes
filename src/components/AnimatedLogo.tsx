import { useEffect, useState } from "react";
import logoAsset from "@/assets/anitas-eyes-logo.png.asset.json";

export function AnimatedLogo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <img
      src={logoAsset.url}
      alt="Anita's Eyes"
      className={`fixed z-50 w-auto pointer-events-none transition-all duration-700 ease-in-out ${
        scrolled
          ? "top-4 left-6 h-12 md:top-2 md:h-20"
          : "top-24 left-1/2 -translate-x-1/2 h-48 md:top-28 md:h-72"
      }`}
    />
  );
}
