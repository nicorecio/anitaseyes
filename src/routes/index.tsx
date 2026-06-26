import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { Loader2, Instagram, ArrowRight, Mail, Sparkles, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Anitas Eyes — Ropa para mujer con mirada propia" },
      { name: "description", content: "Tienda online de ropa de Anitas Eyes: tops, camisas, vestidos, faldas y pijamas. Envío en 2–4 días y pago seguro." },
    ],
  }),
});

// Categorías de ropa (foco principal)
const CLOTHING_CATEGORIES = [
  {
    name: "Tops",
    keywords: ["top", "tops"],
    image: "https://images.unsplash.com/photo-1564257577-2d3ee9c8e3a6?w=900&q=80",
  },
  {
    name: "Camisas y blusas",
    keywords: ["camisa", "camisas", "blusa", "blusas"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80",
  },
  {
    name: "Vestidos",
    keywords: ["vestido", "vestidos"],
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=80",
  },
  {
    name: "Faldas",
    keywords: ["falda", "faldas"],
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d75?w=900&q=80",
  },
  {
    name: "Pijamas",
    keywords: ["pijama", "pijamas"],
    image: "https://images.unsplash.com/photo-1573612664822-d7d347da7b80?w=900&q=80",
  },
];

const ALL_TAB = "Todo";
const ACCESSORIES_TAB = "Accesorios";

function matchesCategory(p: ShopifyProduct, keywords: string[]) {
  const hay = `${p.node.title} ${p.node.tags?.join(" ") ?? ""} ${(p.node as any).productType ?? ""}`.toLowerCase();
  return keywords.some((k) => hay.includes(k));
}

function isAccessory(p: ShopifyProduct) {
  const hay = `${p.node.title} ${p.node.tags?.join(" ") ?? ""} ${(p.node as any).productType ?? ""}`.toLowerCase();
  return ["pendiente", "collar", "anillo", "pulsera", "accesorio", "joya", "joyer"].some((k) => hay.includes(k));
}

function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState<string>(ALL_TAB);

  useEffect(() => {
    storefrontApiRequest(PRODUCTS_QUERY, { first: 50 })
      .then((d) => setProducts(d?.data?.products?.edges ?? []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  // React to category selection coming from URL ?cat=... or from MobileNav events
  useEffect(() => {
    const applyFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("cat");
      if (cat) {
        setActiveTab(cat);
        setTimeout(() => {
          document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      }
    };
    applyFromUrl();
    const onCat = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (!detail) return;
      setActiveTab(detail);
      setTimeout(() => {
        document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    };
    window.addEventListener("anitas:set-category", onCat);
    window.addEventListener("popstate", applyFromUrl);
    return () => {
      window.removeEventListener("anitas:set-category", onCat);
      window.removeEventListener("popstate", applyFromUrl);
    };
  }, []);

  const clothingProducts = useMemo(
    () => products.filter((p) => !isAccessory(p)),
    [products]
  );
  const accessoryProducts = useMemo(
    () => products.filter(isAccessory),
    [products]
  );

  const filtered = useMemo(() => {
    if (activeTab === ALL_TAB) return clothingProducts.length ? clothingProducts : products;
    if (activeTab === ACCESSORIES_TAB) return accessoryProducts;
    const cat = CLOTHING_CATEGORIES.find((c) => c.name === activeTab);
    if (!cat) return products;
    return products.filter((p) => matchesCategory(p, cat.keywords));
  }, [activeTab, products, clothingProducts, accessoryProducts]);

  const featured = useMemo(
    () => (clothingProducts.length ? clothingProducts : products).slice(0, 4),
    [clothingProducts, products]
  );

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("¡Gracias!", { description: "Te avisaremos cuando salga una pieza nueva." });
    setEmail("");
  };

  const goToCategory = (name: string) => {
    setActiveTab(name);
    setTimeout(() => {
      document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Nueva colección · Mujer
            </p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              Ropa para vestir <em className="italic text-accent">como tú</em>, todos los días.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Tops, camisas, vestidos, faldas y pijamas seleccionados con mimo. Prendas cómodas, bonitas y pensadas para durar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#tienda" onClick={() => setActiveTab(ALL_TAB)}>
                  Ver colección <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.instagram.com/anitas.eyes/" target="_blank" rel="noreferrer">
                  <Instagram className="mr-2 h-4 w-4" /> @anitas.eyes
                </a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80"
              alt="Anitas Eyes — nueva colección de ropa"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur p-4">
              <p className="font-serif text-xl">Nueva temporada</p>
              <p className="text-sm text-muted-foreground">Las prendas favoritas de Anita</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {[
            { Icon: Sparkles, title: "Seleccionado con mimo", text: "Tejidos cuidados y prendas pensadas para sentirte bien." },
            { Icon: Truck, title: "Envío gratis +60€", text: "A toda España en 2–4 días laborables." },
            { Icon: RotateCcw, title: "Devoluciones 14 días", text: "Cambios de talla y devoluciones sin complicaciones." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="h-10 w-10 flex items-center justify-center border border-border flex-shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-medium mb-1">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS DE ROPA */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Compra por categoría</p>
            <h2 className="font-serif text-4xl md:text-5xl">Nuestra ropa</h2>
          </div>
          <a href="#tienda" onClick={() => setActiveTab(ALL_TAB)} className="hidden md:inline-flex items-center text-sm uppercase tracking-widest hover:text-accent">
            Ver todo <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {CLOTHING_CATEGORIES.map((c) => (
            <button
              key={c.name}
              onClick={() => goToCategory(c.name)}
              className="group relative aspect-[3/4] overflow-hidden bg-secondary text-left"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
                <p className="font-serif text-xl md:text-2xl">{c.name}</p>
              </div>
            </button>
          ))}
        </div>
      </section>



      {/* TESTIMONIO */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">En palabras de Anita</p>
          <blockquote className="font-serif text-3xl md:text-5xl leading-tight italic">
            “Quería una marca de ropa cercana —
            <span className="text-accent"> bonita, cómoda y para llevar todos los días.</span>”
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-widest text-muted-foreground">
            Anita · Fundadora
          </p>
        </div>
      </section>

      {/* TIENDA */}
      <section id="tienda" className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Tienda</p>
            <h2 className="font-serif text-4xl md:text-5xl">Colección</h2>
          </div>
          <p className="text-sm text-muted-foreground hidden md:block">
            Envíos a toda España · Pago seguro
          </p>
        </div>

        {/* Tabs categorías */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-border pb-4">
          {[ALL_TAB, ...CLOTHING_CATEGORIES.map((c) => c.name), ACCESSORIES_TAB].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`text-xs uppercase tracking-widest px-3 py-2 border transition ${
                activeTab === t
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border">
            <p className="font-serif text-2xl mb-2">
              {activeTab === ACCESSORIES_TAB ? "Sin accesorios disponibles" : "Próximamente"}
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              {activeTab === ALL_TAB
                ? "Cuéntale a Anita qué quieres añadir a la tienda."
                : `Aún no hay piezas en “${activeTab}”. Vuelve pronto.`}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filtered.map((p) => <ProductCard key={p.node.id} product={p} />)}
            </div>
          </>
        )}
      </section>

      {/* ACCESORIOS — sección secundaria */}
      {accessoryProducts.length > 0 && (
        <section className="bg-secondary border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Para completar el look</p>
                <h2 className="font-serif text-3xl md:text-4xl">Accesorios</h2>
              </div>
              <button
                onClick={() => goToCategory(ACCESSORIES_TAB)}
                className="hidden md:inline-flex items-center text-sm uppercase tracking-widest hover:text-accent"
              >
                Ver todos <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {accessoryProducts.slice(0, 4).map((p) => <ProductCard key={p.node.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <Mail className="mx-auto h-6 w-6 mb-6 opacity-70" />
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Sé la primera en saberlo.
          </h2>
          <p className="opacity-70 max-w-md mx-auto mb-8">
            Avisos de nuevas prendas, ediciones limitadas y descuentos. Sin ruido.
          </p>
          <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12"
            />
            <Button type="submit" size="lg" variant="secondary">
              Suscribirme
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="font-serif text-2xl mb-3">anitas.eyes</p>
            <p className="text-muted-foreground max-w-sm">
            Ropa seleccionada por Anita. Joyas hechas por Anita. Todo con cariño.
            </p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3">Tienda</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#tienda" className="hover:text-accent">Toda la colección</a></li>
              {CLOTHING_CATEGORIES.slice(0, 4).map((c) => (
                <li key={c.name}>
                  <button onClick={() => goToCategory(c.name)} className="hover:text-accent text-left">
                    {c.name}
                  </button>
                </li>
              ))}
              <li><Link to="/sobre" className="hover:text-accent">Sobre Anita</Link></li>
            </ul>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3">Ayuda</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/envios" className="hover:text-accent">Envíos</Link></li>
              <li><Link to="/cambios" className="hover:text-accent">Cambios</Link></li>
              <li><Link to="/devoluciones" className="hover:text-accent">Devoluciones</Link></li>
            </ul>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3">Contacto</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="https://www.instagram.com/anitas.eyes/" target="_blank" rel="noreferrer" className="hover:text-accent">
                  Instagram @anitas.eyes
                </a>
              </li>
              <li>
                <a href="mailto:hola@anitaseyes.com" className="hover:text-accent">hola@anitaseyes.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-3">
            <p>© {new Date().getFullYear()} Anitas Eyes. Hecho con cariño.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/aviso-legal" className="hover:text-accent">Aviso legal</Link>
              <Link to="/privacidad" className="hover:text-accent">Privacidad</Link>
              <Link to="/cookies" className="hover:text-accent">Cookies</Link>
              <span>Envíos a toda España · Pago seguro</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
