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

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <img
      src={logoAsset.url}
      alt="Anita's Eyes"
      onClick={handleClick}
      className={`fixed z-50 w-auto transition-all duration-700 ease-in-out ${
        scrolled
          ? "top-4 left-6 h-12 md:top-2 md:h-20 cursor-pointer"
          : "top-20 left-1/2 -translate-x-1/2 h-24 md:top-24 md:h-72 pointer-events-none"
      }`}
    />
  );
}

