import React, { useState, useEffect } from "react";
import { 
  Check, 
  X, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  Mail, 
  Lock,
  Heart,
  TrendingUp,
  Award,
  BookOpen,
  ShoppingBag,
  Truck,
  MessageCircle,
  Calculator,
  Calendar,
  HelpCircle
} from "lucide-react";

import heroBook from "./assets/hero-book.png";
import malaPromessa1 from "./assets/mala-promessa-1.jpg";
import malaPromessa2 from "./assets/mala-promessa-2.jpg";
import malaPromessa3 from "./assets/mala-promessa-3.jpg";
import galeria1 from "./assets/galeria-1.jpg";
import galeria2 from "./assets/galeria-2.jpg";
import galeria3 from "./assets/galeria-3.jpg";
import galeria4 from "./assets/galeria-4.jpg";

function SafeImage({ 
  srcs, 
  alt, 
  className, 
  ...props 
}: { 
  srcs: string[]; 
  alt: string; 
  className?: string; 
  [key: string]: any;
}) {
  const [index, setIndex] = useState(0);

  return (
    <img
      src={srcs[index]}
      alt={alt}
      className={className}
      onError={() => {
        if (index < srcs.length - 1) {
          setIndex(index + 1);
        }
      }}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}

// LINKS DO HOTMART (URLs diretas com checkoutMode=10 para layout completo com banners)
const HOTMART_LINK_BASIC = "https://pay.hotmart.com/C106096630V?checkoutMode=10";
const HOTMART_LINK_COMPLETE = "https://pay.hotmart.com/J106610959I?checkoutMode=10";

export default function App() {
  const [activeModal, setActiveModal] = useState<"privacidade" | "termos" | "contacto" | null>(null);

  const appendUtms = (baseUrl: string) => {
    if (typeof window === "undefined") return baseUrl;
    try {
      const targetUrl = new URL(baseUrl);
      // Garante que checkoutMode=10 permanece presente para manter os banners
      targetUrl.searchParams.set("checkoutMode", "10");

      // Extrai todos os parâmetros da URL atual (window.location.search)
      const currentSearch = window.location.search;
      if (currentSearch && currentSearch.length > 1) {
        const searchParams = new URLSearchParams(currentSearch);
        searchParams.forEach((value, key) => {
          targetUrl.searchParams.set(key, value);
        });
        // Guarda no storage para persistência
        try {
          sessionStorage.setItem("captured_utms", searchParams.toString());
          localStorage.setItem("captured_utms", searchParams.toString());
        } catch (e) {}
      } else {
        // Fallback para UTMs capturadas previamente se window.location.search estiver vazio
        try {
          const saved = sessionStorage.getItem("captured_utms") || localStorage.getItem("captured_utms");
          if (saved) {
            const savedParams = new URLSearchParams(saved);
            savedParams.forEach((value, key) => {
              targetUrl.searchParams.set(key, value);
            });
          }
        } catch (e) {}
      }

      return targetUrl.toString();
    } catch (e) {
      return baseUrl;
    }
  };

  const [basicCheckoutUrl, setBasicCheckoutUrl] = useState(() => appendUtms(HOTMART_LINK_BASIC));
  const [completeCheckoutUrl, setCompleteCheckoutUrl] = useState(() => appendUtms(HOTMART_LINK_COMPLETE));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBasicCheckoutUrl(appendUtms(HOTMART_LINK_BASIC));
      setCompleteCheckoutUrl(appendUtms(HOTMART_LINK_COMPLETE));
    }
  }, []);

  const handleCheckoutClick = (
    planName: string,
    price: number
  ) => {
    if (typeof window !== "undefined") {
      // Disparar evento InitiateCheckout (IC) nos píxeis de rastreio (UTMify, Meta Pixel, Google Analytics)
      try {
        if (typeof (window as any).utmify === "function") {
          (window as any).utmify("track", "InitiateCheckout", { content_name: planName, value: price, currency: "EUR" });
        }
        if (typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "InitiateCheckout", { content_name: planName, value: price, currency: "EUR" });
        }
        if (typeof (window as any).gtag === "function") {
          (window as any).gtag("event", "begin_checkout", { items: [{ item_name: planName, price: price }], value: price, currency: "EUR" });
        }
      } catch (e) {
        // Ignora erros genéricos de script
      }
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] font-sans text-[#333333] antialiased scroll-smooth selection:bg-[#C5A059]/30 selection:text-[#333333]">
      
      {/* =========================================================================
          BLOCO 01: HERO DE ELITE (ESTILO BOUTIQUE DO CHIADO - PÁGINA HÍBRIDA)
      ========================================================================= */}
      <section className="relative overflow-hidden bg-[#F9F8F5] px-4 pt-10 pb-14 sm:px-8 md:pt-16 md:pb-20 flex flex-col justify-center border-b border-[#C5A059]/25" id="hero-section">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A059]/10 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-[980px] relative z-10 w-full text-center">
          {/* Header Tag */}
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-2 bg-[#C5A059]/15 border border-[#C5A059]/40 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#8B6B2E] rounded-full shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" /> MÉTODO DE ALTA COSTURA ARTESANAL
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-[42px] font-black leading-[1.2] text-[#333333] tracking-tight max-w-4xl mx-auto mb-5">
            Descobre o Protocolo Antifalhas que Transforma{" "}
            <span className="text-[#8B6B2E] underline decoration-[#C5A059] decoration-4 underline-offset-4">
              €5 de Trapilho
            </span>{" "}
            numa Mala de Luxo, Vendida por €85 a €150 Diretamente pelo teu Telemóvel.
          </h1>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#555555] max-w-3xl mx-auto mb-8 font-medium">
            Esquece o "crochê de avó" desvalorizado. A especialista <strong className="text-[#333333] font-bold">Maria João Silva</strong> revela o mecanismo estrutural que permite a qualquer mulher criar peças dignas das boutiques do Chiado e de Cascais — conquistando total autonomia financeira com pagamentos diários a cair no ecrã do telemóvel.
          </p>

          {/* VSL Video Container (Vertical 9:16) */}
          <div className="max-w-[340px] sm:max-w-[370px] mx-auto mb-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] rounded-2xl border-2 border-[#C5A059]/40 overflow-hidden bg-black">
            <div style={{ padding: "177.78% 0 0 0", position: "relative" }}>
              <iframe 
                src="https://player.vimeo.com/video/1209374084?autoplay=1&amp;muted=1&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} 
                title="Apresentação"
              />
            </div>
          </div>

          <p className="text-center text-xs text-[#666666] font-semibold mb-7 italic">
            💡 Podes assistir à Masterclass acima ou deslizar a página para leres todos os detalhes em texto.
          </p>

          {/* Anchor Button 1 (Scrolls directly to Offer/Plans) */}
          <div className="flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
            <button 
              onClick={() => scrollToSection('tabela-escolha')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white px-8 py-4 text-base sm:text-lg font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-900/20 cursor-pointer hover:scale-[1.02]"
              id="hero-anchor-cta"
            >
              👉 Ver Planos e Garantir Acesso
            </button>
            <div className="flex items-center gap-2 text-[#555555] text-xs font-bold">
              <ShieldCheck className="h-4 w-4 text-[#28a745]" />
              <span>Pagamento 100% Seguro e Imediato via MB Way</span>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 02: BLOCO DE DOR & HISTÓRIA (SCROLL STORYTELLING)
      ========================================================================= */}
      <section className="bg-[#FAF8F5] px-4 py-16 sm:px-8 sm:py-20 border-b border-zinc-200/80" id="bloco-dor">
        <div className="mx-auto max-w-[800px] text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B4513] block mb-3 text-center sm:text-left">
            O FIM DA DEPENDÊNCIA FINANCEIRA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A] leading-tight mb-8">
            Estás Cansada de Trabalhar Horas a Fio e Ter de Pedir Autorização para Ter o Teu Próprio "Mimo"?
          </h2>

          <div className="space-y-6 text-stone-700 text-base sm:text-lg font-medium leading-relaxed border-l-4 border-[#8B4513] pl-6 py-2 bg-white/60 rounded-r-2xl shadow-sm border-y border-r border-zinc-200/50 p-6">
            <p>
              Quantas vezes já olhaste para a tua conta bancária no final do mês e sentiste aquele aperto no peito ao ver que, depois de pagar todas as contas da casa, não sobrou rigorosamente nada para ti?
            </p>
            <p>
              Em Portugal, milhares de mulheres dedicam a vida à família, ao emprego formal ou à casa, mas continuam sem a liberdade de comprar uma roupa bonita, ir ao cabeleireiro ou comprar um pequeno <em>mimo</em> sem ter de dar satisfações ou contar cêntimos.
            </p>
            <p className="font-bold text-[#1A1A1A]">
              O problema não é a tua falta de vontade. É o facto de nunca te terem mostrado um método prático, com alto valor percebido e procura garantida no mercado português.
            </p>
            <p>
              Ao aprenderes a transformar um simples novelo de trapilho numa mala elegante e estruturada, deixas de vender "artesanato barato" para te tornares dona do teu próprio ateliê de luxo.
            </p>
          </div>

          <div className="mt-8 text-center sm:text-left">
            <button 
              onClick={() => scrollToSection('tabela-escolha')}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#28a745] hover:text-[#218838] underline decoration-2 underline-offset-4 cursor-pointer"
            >
              👉 Ver Planos e Garantir Acesso ao Método →
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 03: TANGIBILIZAÇÃO (GALERIA BOUTIQUE COM PREÇO DE VITRINA)
      ========================================================================= */}
      <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 border-b border-zinc-200" id="galeria-vitrina">
        <div className="mx-auto max-w-[960px]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] block">PADRÃO BOUTIQUE PORTUGAL</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-2">
              Peças Dignas das Montras do Chiado e Cascais
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-[#8B4513]"></div>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto mt-4 font-medium">
              A Geometria do Ponto confere às malas uma estrutura rígida e impecável. As tuas clientes pagam com agrado entre €80 e €150 por peça.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 mb-12">
            {/* Bag 1 */}
            <div className="bg-[#FAF8F5] rounded-2xl shadow-md overflow-hidden border border-[#D4A574]/30 hover:shadow-xl transition-all">
              <SafeImage 
                srcs={[
                  "https://i.postimg.cc/T1rrdrXR/2d7f3ec787ca5ae6013fcd2a58fc914d.jpg",
                  malaPromessa1,
                  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80"
                ]} 
                alt="Modelo Clutch Europeia - Lisboa" 
                className="w-full h-[260px] object-cover"
              />
              <div className="p-5 text-left space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513] block">MODELO CLUTCH EUROPEIA (LISBOA)</span>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-200">
                  <span className="text-xs text-zinc-500 font-semibold">Custo de Material: <strong className="text-zinc-800">€5,20</strong></span>
                  <span className="text-sm font-black text-[#28a745]">Venda: €85,00</span>
                </div>
                <p className="text-[11px] text-zinc-600 font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-200 text-center">
                  Lucro Líquido: €79,80 no MB Way
                </p>
              </div>
            </div>

            {/* Bag 2 */}
            <div className="bg-[#FAF8F5] rounded-2xl shadow-md overflow-hidden border border-[#D4A574]/30 hover:shadow-xl transition-all">
              <SafeImage 
                srcs={[
                  "https://i.postimg.cc/3xbDHLDK/4e2aae93dcf73e6e4bc2435d36f2ba29.jpg",
                  malaPromessa2,
                  "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
                ]} 
                alt="Modelo Maxi Sacola Boutique - Cascais" 
                className="w-full h-[260px] object-cover"
              />
              <div className="p-5 text-left space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513] block">MAXI SACOLA BOUTIQUE (CASCAIS)</span>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-200">
                  <span className="text-xs text-zinc-500 font-semibold">Custo de Material: <strong className="text-zinc-800">€6,10</strong></span>
                  <span className="text-sm font-black text-[#28a745]">Venda: €120,00</span>
                </div>
                <p className="text-[11px] text-zinc-600 font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-200 text-center">
                  Lucro Líquido: €113,90 no MB Way
                </p>
              </div>
            </div>

            {/* Bag 3 */}
            <div className="bg-[#FAF8F5] rounded-2xl shadow-md overflow-hidden border border-[#D4A574]/30 hover:shadow-xl transition-all">
              <SafeImage 
                srcs={[
                  "https://i.postimg.cc/dV7VGJLh/f6218e1e03f855d2ac6f005bd7a4b7e8.jpg",
                  malaPromessa3,
                  "https://images.unsplash.com/photo-1566150905458-1bf1fc15a6a0?auto=format&fit=crop&w=600&q=80"
                ]} 
                alt="Modelo Tote de Luxo - Porto" 
                className="w-full h-[260px] object-cover"
              />
              <div className="p-5 text-left space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513] block">TOTE DE LUXO ESTRUTURADA (PORTO)</span>
                <div className="flex items-center justify-between pt-1 border-t border-zinc-200">
                  <span className="text-xs text-zinc-500 font-semibold">Custo de Material: <strong className="text-zinc-800">€5,80</strong></span>
                  <span className="text-sm font-black text-[#28a745]">Venda: €95,00</span>
                </div>
                <p className="text-[11px] text-zinc-600 font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-200 text-center">
                  Lucro Líquido: €89,20 no MB Way
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => scrollToSection('tabela-escolha')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              👉 Ver Planos e Garantir Acesso
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 04: VIABILIDADE ECONÓMICA (OURO LÓGICO - 8 CARDS HOPKINS)
      ========================================================================= */}
      <section className="bg-[#FAF8F5] px-4 py-16 sm:px-8 sm:py-24 border-b border-zinc-200" id="viabilidade-economica">
        <div className="mx-auto max-w-[960px]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] block">MATEMÁTICA INEGÁVEL</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-2">
              A Matemática Inegável do Teu Lucro Líquido
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-[#8B4513]"></div>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto mt-4 font-medium">
              Investe €5 em trapilho, dedica 3 horas no teu sofá e recebe o pagamento direto no teu MB Way.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto mb-10">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase">PEÇA 01</span>
              <h4 className="font-serif font-black text-base text-zinc-900 mt-1">Clutch de Noite</h4>
              <div className="mt-3 pt-3 border-t border-zinc-100 text-xs space-y-1">
                <p className="text-zinc-500">Material: <strong className="text-zinc-800">€5,20</strong></p>
                <p className="text-zinc-500">Venda: <strong className="text-zinc-800">€85,00</strong></p>
                <p className="text-[#28a745] font-black text-sm pt-1">Lucro: €79,80</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase">PEÇA 02</span>
              <h4 className="font-serif font-black text-base text-zinc-900 mt-1">Sacola de Cascais</h4>
              <div className="mt-3 pt-3 border-t border-zinc-100 text-xs space-y-1">
                <p className="text-zinc-500">Material: <strong className="text-zinc-800">€6,50</strong></p>
                <p className="text-zinc-500">Venda: <strong className="text-zinc-800">€110,00</strong></p>
                <p className="text-[#28a745] font-black text-sm pt-1">Lucro: €103,50</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase">PEÇA 03</span>
              <h4 className="font-serif font-black text-base text-zinc-900 mt-1">Mala Chiado</h4>
              <div className="mt-3 pt-3 border-t border-zinc-100 text-xs space-y-1">
                <p className="text-zinc-500">Material: <strong className="text-zinc-800">€5,80</strong></p>
                <p className="text-zinc-500">Venda: <strong className="text-zinc-800">€95,00</strong></p>
                <p className="text-[#28a745] font-black text-sm pt-1">Lucro: €89,20</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase">PEÇA 04</span>
              <h4 className="font-serif font-black text-base text-zinc-900 mt-1">Porta-Telemóvel</h4>
              <div className="mt-3 pt-3 border-t border-zinc-100 text-xs space-y-1">
                <p className="text-zinc-500">Material: <strong className="text-zinc-800">€2,50</strong></p>
                <p className="text-zinc-500">Venda: <strong className="text-zinc-800">€35,00</strong></p>
                <p className="text-[#28a745] font-black text-sm pt-1">Lucro: €32,50</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase">PEÇA 05</span>
              <h4 className="font-serif font-black text-base text-zinc-900 mt-1">Mini-Bag Infantil</h4>
              <div className="mt-3 pt-3 border-t border-zinc-100 text-xs space-y-1">
                <p className="text-zinc-500">Material: <strong className="text-zinc-800">€3,20</strong></p>
                <p className="text-zinc-500">Venda: <strong className="text-zinc-800">€45,00</strong></p>
                <p className="text-[#28a745] font-black text-sm pt-1">Lucro: €41,80</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase">PEÇA 06</span>
              <h4 className="font-serif font-black text-base text-zinc-900 mt-1">Conjunto Mãe e Filha</h4>
              <div className="mt-3 pt-3 border-t border-zinc-100 text-xs space-y-1">
                <p className="text-zinc-500">Material: <strong className="text-zinc-800">€9,00</strong></p>
                <p className="text-zinc-500">Venda: <strong className="text-zinc-800">€140,00</strong></p>
                <p className="text-[#28a745] font-black text-sm pt-1">Lucro: €131,00</p>
              </div>
            </div>

            {/* Card 7 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase">PEÇA 07</span>
              <h4 className="font-serif font-black text-base text-zinc-900 mt-1">Mala de Praia Premium</h4>
              <div className="mt-3 pt-3 border-t border-zinc-100 text-xs space-y-1">
                <p className="text-zinc-500">Material: <strong className="text-zinc-800">€7,10</strong></p>
                <p className="text-zinc-500">Venda: <strong className="text-zinc-800">€115,00</strong></p>
                <p className="text-[#28a745] font-black text-sm pt-1">Lucro: €107,90</p>
              </div>
            </div>

            {/* Card 8 */}
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase">PEÇA 08</span>
              <h4 className="font-serif font-black text-base text-zinc-900 mt-1">Necessaire de Luxo</h4>
              <div className="mt-3 pt-3 border-t border-zinc-100 text-xs space-y-1">
                <p className="text-zinc-500">Material: <strong className="text-zinc-800">€3,80</strong></p>
                <p className="text-zinc-500">Venda: <strong className="text-zinc-800">€50,00</strong></p>
                <p className="text-[#28a745] font-black text-sm pt-1">Lucro: €46,20</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => scrollToSection('tabela-escolha')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              👉 Ver Planos e Garantir Acesso
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 05: MECANISMO ÚNICO (PROTOCOLO ANTIFALHAS)
      ========================================================================= */}
      <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 border-b border-zinc-200" id="mecanismo-unico">
        <div className="mx-auto max-w-[840px] text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B4513] block text-center">
            MECANISMO ESTRUTURAL EXCLUSIVO
          </span>
          <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-2 text-center">
            O Protocolo Antifalhas: Geometria do Ponto
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-12 bg-[#8B4513] mb-10"></div>

          <div className="grid gap-8 md:grid-cols-2 items-center mb-10">
            <div className="space-y-4 text-stone-700 text-sm sm:text-base font-medium leading-relaxed">
              <p>
                A maioria das pessoas falha no artesanato porque tenta adivinhar o tamanho dos pontos ou usa fios inadequados, resultando em peças moles que perdem a forma no primeiro uso.
              </p>
              <p>
                O <strong className="text-[#1A1A1A]">Protocolo Antifalhas</strong> baseia-se na <em>Geometria do Ponto</em>. Através de ilustrações técnicas e marcações visuais simplificadas, tu sabes exatamente onde a agulha entra e sai.
              </p>
              <ul className="space-y-2 pt-2 text-xs sm:text-sm font-bold text-zinc-800">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#28a745]" /> Estrutura rígida sem necessidade de gomas químicas.</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#28a745]" /> Costuras invisíveis com acabamento de boutique europeia.</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#28a745]" /> Método visual simples que qualquer iniciante domina no 1.º dia.</li>
              </ul>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/40 shadow-sm text-center">
              <SafeImage 
                srcs={[
                  "https://i.postimg.cc/Sx100wNK/image.png",
                  heroBook,
                  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
                ]} 
                alt="Manual Ilustrado Antifalhas" 
                className="w-full h-auto rounded-xl shadow-md border border-zinc-200 mb-4"
              />
              <span className="text-xs font-bold text-[#8B4513] block">Instruções Passo a Passo com Diagramas Claros</span>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => scrollToSection('tabela-escolha')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              👉 Ver Planos e Garantir Acesso
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 06: CONTEÚDO DO MANUAL (6 CAPÍTULOS + 60 MODELOS)
      ========================================================================= */}
      <section className="bg-[#FAF8F5] px-4 py-16 sm:px-8 sm:py-24 border-b border-zinc-200" id="conteudo-manual">
        <div className="mx-auto max-w-[960px]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] block">CONTEÚDO COMPLETO</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-2">
              O Que Vais Encontrar No Teu Manual
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto mb-10">
            {/* Cap 1 */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-3">01</span>
              <h4 className="text-base font-black text-zinc-900 mb-1">Fundamentos da Costura de Luxo</h4>
              <p className="text-xs text-stone-600 font-semibold leading-relaxed">Seleção de matérias-primas premium em Portugal e preparação das agulhas corretas.</p>
            </div>

            {/* Cap 2 */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-3">02</span>
              <h4 className="text-base font-black text-zinc-900 mb-1">Geometria dos Pontos Base</h4>
              <p className="text-xs text-stone-600 font-semibold leading-relaxed">Como estruturar a base das malas para garantires rigidez e elegância impecável.</p>
            </div>

            {/* Cap 3 */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-3">03</span>
              <h4 className="text-base font-black text-zinc-900 mb-1">60 Modelos Exclusivos em PDF</h4>
              <p className="text-xs text-stone-600 font-semibold leading-relaxed">Gráficos explicativos para criares Clutches, Totes, Sacolas e Necessaires de Luxo.</p>
            </div>

            {/* Cap 4 */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-3">04</span>
              <h4 className="text-base font-black text-zinc-900 mb-1">Acabamentos e Forros Elegantes</h4>
              <p className="text-xs text-stone-600 font-semibold leading-relaxed">Instalação de fechos magnéticos, alças de corrente dourada e forros sem costuras visíveis.</p>
            </div>

            {/* Cap 5 */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-3">05</span>
              <h4 className="text-base font-black text-zinc-900 mb-1">Fotografia com Telemóvel</h4>
              <p className="text-xs text-stone-600 font-semibold leading-relaxed">Como fotografar as tuas malas com iluminação natural para parecerem capas de revista.</p>
            </div>

            {/* Cap 6 */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm text-left">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#8B4513] text-white font-serif font-black text-xs mb-3">06</span>
              <h4 className="text-base font-black text-zinc-900 mb-1">Precificação e Gestão de Encomendas</h4>
              <p className="text-xs text-stone-600 font-semibold leading-relaxed">A fórmula matemática exata para calculares o preço de venda e garantir 1500% de margem.</p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => scrollToSection('tabela-escolha')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              👉 Ver Planos e Garantir Acesso
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 07: BÓNUS ESTRATÉGICOS (FORNECEDORES + WHATSAPP)
      ========================================================================= */}
      <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 border-b border-zinc-200" id="bonuses-estrategicos">
        <div className="mx-auto max-w-[960px]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] block">FERRAMENTAS DE ACELERAÇÃO</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-2">
              Bónus Estratégicos Incluídos Hoje
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto mb-10 text-left">
            {/* Bonus 1 */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/40 shadow-sm relative overflow-hidden">
              <span className="bg-[#8B4513] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-3">
                BÓNUS #1
              </span>
              <h3 className="font-serif font-black text-xl text-zinc-900 mb-2">Lista Secreta de 17 Fornecedores Ibéricos</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed mb-4">
                Contactos diretos de grossistas em Portugal e Espanha para comprares trapilho, fechos e correntes a preço de fábrica com entregas em 24/48 horas no teu telemóvel.
              </p>
              <span className="text-xs font-bold text-[#8B4513] block">Valor isolado: <span className="line-through text-red-500">€27,00</span> (Grátis Hoje)</span>
            </div>

            {/* Bonus 2 */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/40 shadow-sm relative overflow-hidden">
              <span className="bg-[#8B4513] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-3">
                BÓNUS #2
              </span>
              <h3 className="font-serif font-black text-xl text-zinc-900 mb-2">Roteiro de WhatsApp "Copia e Cola"</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed mb-4">
                As mensagens exatas para responderes a clientes e fechares vendas no teu telemóvel sem pareceres chata ou insistente, recebendo imediatamente por MB Way.
              </p>
              <span className="text-xs font-bold text-[#8B4513] block">Valor isolado: <span className="line-through text-red-500">€19,00</span> (Grátis Hoje)</span>
            </div>

            {/* Bonus 3 */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/40 shadow-sm relative overflow-hidden">
              <span className="bg-[#8B4513] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-3">
                BÓNUS #3
              </span>
              <h3 className="font-serif font-black text-xl text-zinc-900 mb-2">Folha de Cálculo de Precificação Boutique</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed mb-4">
                A ferramenta automática no teu telemóvel para calculares o custo exato dos teus materiais e definires o preço de venda perfeito sem perderes um cêntimo.
              </p>
              <span className="text-xs font-bold text-[#8B4513] block">Valor isolado: <span className="line-through text-red-500">€15,00</span> (Grátis Hoje)</span>
            </div>

            {/* Bonus 4 */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/40 shadow-sm relative overflow-hidden">
              <span className="bg-[#8B4513] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-3">
                BÓNUS #4
              </span>
              <h3 className="font-serif font-black text-xl text-zinc-900 mb-2">Calendário de Procura Anual em Portugal</h3>
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed mb-4">
                Descobre os picos de compras no Natal, Dia da Mãe e Verão em Portugal para saberes o que produzir e esgotares o teu stock.
              </p>
              <span className="text-xs font-bold text-[#8B4513] block">Valor isolado: <span className="line-through text-red-500">€15,00</span> (Grátis Hoje)</span>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => scrollToSection('tabela-escolha')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white px-8 py-3.5 text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              👉 Ver Planos e Garantir Acesso
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCOS 08 A 11: PASSOS, COMPARAÇÃO, QUALIFICAÇÃO & HISTÓRIA
      ========================================================================= */}
      {/* BLOCO 08: OS 3 PASSOS SIMPLES PARA GANHAR */}
      <section className="bg-[#FAF8F5] px-4 py-16 sm:px-8 sm:py-20 border-b border-zinc-200" id="passos-simples">
        <div className="mx-auto max-w-[860px] text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B4513] block">PROCESSO DESPLICADO</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-2 mb-10">
            Apenas 3 Passos para Começares a Faturar
          </h2>

          <div className="grid gap-6 sm:grid-cols-3 text-left">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
              <span className="text-3xl font-serif font-black text-[#8B4513] block mb-2">01</span>
              <h4 className="font-bold text-base text-zinc-900 mb-2">Aprende a Geometria</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-semibold">Lê o manual digital no teu telemóvel e domina a estrutura básica em menos de 2 horas.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
              <span className="text-3xl font-serif font-black text-[#8B4513] block mb-2">02</span>
              <h4 className="font-bold text-base text-zinc-900 mb-2">Produz no Teu Sofá</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-semibold">Cria a tua primeira mala em 3 a 5 horas com €5 de material e acabamento luxuoso.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
              <span className="text-3xl font-serif font-black text-[#8B4513] block mb-2">03</span>
              <h4 className="font-bold text-base text-zinc-900 mb-2">Recebe no MB Way</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-semibold">Usa os guiões de WhatsApp no telemóvel e recebe notificações de €85 a €120 a entrar na tua conta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 09: COMPARAÇÃO (PADRÃO BOUTIQUE VS CROCHÊ DE AVÓ) */}
      <section className="bg-white px-4 py-16 sm:px-8 sm:py-20 border-b border-zinc-200" id="comparacao">
        <div className="mx-auto max-w-[860px] text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B4513] block">PORQUE FUNCIONA TÃO BEM</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-2 mb-8">
            Padrão Boutique vs "Crochê de Avó"
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 text-left">
            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-200">
              <h4 className="text-base font-black text-red-800 mb-4 flex items-center gap-2">
                <X className="h-5 w-5 text-red-600" /> "Crochê de Avó" Desvalorizado
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-semibold">
                <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✕</span> Peças moles que perdem a forma e ficam deformadas.</li>
                <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✕</span> Horas de trabalho vendidas por apenas €15 ou €20.</li>
                <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✕</span> Vergonha e medo de vender às amigas e conhecidas.</li>
                <li className="flex items-start gap-2"><span className="text-red-500 font-bold">✕</span> Comprar materiais caros em retrosarias locais sem margem.</li>
              </ul>
            </div>

            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200">
              <h4 className="text-base font-black text-emerald-900 mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-[#28a745]" /> Padrão Boutique de Luxo
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-800 font-semibold">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#28a745] shrink-0 mt-0.5" /> Peças rígidas e simétricas com aspeto de loja de luxo.</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#28a745] shrink-0 mt-0.5" /> Valor de venda entre €85 e €150 com 1500% de margem.</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#28a745] shrink-0 mt-0.5" /> Guiões diretos no telemóvel com pagamentos por MB Way.</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-[#28a745] shrink-0 mt-0.5" /> Acesso direto a grossistas em Portugal e Espanha.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 10 & 11: QUALIFICAÇÃO & HISTÓRIA DE MARIA JOÃO SILVA */}
      <section className="bg-[#FAF8F5] px-4 py-16 sm:px-8 sm:py-20 border-b border-zinc-200" id="historia-maria-joao">
        <div className="mx-auto max-w-[800px] text-left">
          <div className="bg-white p-8 rounded-3xl border border-[#D4A574]/40 shadow-sm space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B4513] block">SOBRE A AUTORA</span>
            <h3 className="font-serif text-2xl font-black text-[#1A1A1A]">Quem é Maria João Silva?</h3>
            <p className="text-stone-700 text-sm sm:text-base font-medium leading-relaxed">
              Especialista em tecelagem artesanal e design de acessórios premium em Portugal, Maria João Silva passou mais de 8 anos a aperfeiçoar técnicas de alta costura adaptadas a peças de trapilho.
            </p>
            <p className="text-stone-700 text-sm sm:text-base font-medium leading-relaxed">
              Depois de ver tantas mulheres em Portugal a lutar contra salários baixos e a falta de autonomia financeira, compilou todo o seu conhecimento num manual prático e 100% ilustrado. Hoje, mais de 850 alunas em território nacional utilizam o seu método para gerar rendimentos de €500 a €1.500/mês a partir do conforto do lar.
            </p>
            <div className="pt-2 text-center sm:text-left">
              <button 
                onClick={() => scrollToSection('tabela-escolha')}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#28a745] hover:text-[#218838] underline decoration-2 underline-offset-4 cursor-pointer"
              >
                👉 Ver Planos e Garantir Acesso →
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 12: DEPOIMENTOS E PROVA SOCIAL (RETORNO RÁPIDO)
      ========================================================================= */}
      <section className="bg-white px-4 py-16 sm:px-8 sm:py-24 border-b border-zinc-200" id="depoimentos">
        <div className="mx-auto max-w-[960px]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B4513] block">TESTEMUNHOS REAIS DE PORTUGAL</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-2">
              Elas Já Estão a Receber Notificações de Venda... E Tu?
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto mb-12 text-left">
            {/* Testimonial 1 */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed italic font-semibold">
                  "Vendi uma mala preta básica por €85 que me custou menos de €6 a fazer. O momento em que ouvi a notificação do MB Way a tocar no telemóvel foi quando percebi que este método era real e que a minha vida ia mudar."
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between">
                <span className="text-xs font-black text-zinc-900 uppercase">Marta Silva · Lisboa</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">MB Way €85,00</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed italic font-semibold">
                  "Antes as pessoas pediam-me descontos constantemente. Com a estrutura do Padrão Boutique, as minhas peças parecem saídas de uma montra de luxo de Cascais. Este mês já tirei o triplo da minha reforma."
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between">
                <span className="text-xs font-black text-zinc-900 uppercase">Conceição Fernandes · Braga</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">MB Way €120,00</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed italic font-semibold">
                  "Logo na primeira semana fiz 2 malas e vendi logo no próprio dia no meu telemóvel. Recuperar o investimento de €7,90 foi uma questão de horas!"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between">
                <span className="text-xs font-black text-zinc-900 uppercase">Ana Santos · Porto</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">MB Way €95,00</span>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#D4A574]/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed italic font-semibold">
                  "Com apenas 5 minutos por dia a ler o manual, consegui criar peças perfeitas. Este dinheiro extra permitiu-me dar os mimos aos meus netos que antes não podia."
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between">
                <span className="text-xs font-black text-zinc-900 uppercase">Fátima Ribeiro · Coimbra</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">MB Way €80,00</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 13: A OFERTA "MIMO" (TABELA DE ESCOLHA DOS PLANOS)
      ========================================================================= */}
      <section className="bg-[#141414] px-4 py-16 text-white sm:px-8 sm:py-24 border-t border-[#8B4513]" id="tabela-escolha">
        <div className="mx-auto max-w-[960px] text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4A574] inline-block mb-3">
            ESCOLHA O SEU CAMINHO
          </span>
          <h2 className="font-serif text-3xl font-black leading-tight tracking-tight sm:text-4xl max-w-2xl mx-auto mb-3 text-white">
            Duas Opções Pensadas para a Tua Autonomia Financeira
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto mb-10 font-medium">
            Seleciona o plano ideal para começares o teu ateliê ainda hoje.
          </p>

          <div className="grid gap-8 md:grid-cols-2 max-w-[860px] mx-auto items-stretch text-left">
            
            {/* PLANO BÁSICO */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">PLANO BÁSICO</span>
                <h3 className="font-serif text-2xl font-black text-white mt-1 mb-2">O Primeiro Passo</h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-semibold mb-6">O manual essencial para aprenderes as técnicas e fazeres a tua primeira mala de luxo.</p>
                
                {/* Price block */}
                <div className="mb-6 pb-6 border-b border-zinc-800/60">
                  <span className="text-zinc-400 text-xs font-bold block h-4">
                    Preço Normal: <span className="text-red-500 line-through">€29,00</span>
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl sm:text-4xl font-serif font-black text-white">€7,90</span>
                    <span className="text-zinc-500 text-xs font-bold font-sans">/ pagamento único</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-3.5 mb-8 text-zinc-300 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#28a745] shrink-0 mt-0.5" />
                    <span><strong>Manual Atelier de Malas Premium</strong> (60 modelos originais em PDF)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#28a745] shrink-0 mt-0.5" />
                    <span><strong>Lista de Fornecedores Ibéricos</strong> (contactos em PT e ES)</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-zinc-500 line-through">
                    <X className="h-4.5 w-4.5 text-zinc-600 shrink-0 mt-0.5" />
                    <span>Sem Guiões de Venda para WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-zinc-500 line-through">
                    <X className="h-4.5 w-4.5 text-zinc-600 shrink-0 mt-0.5" />
                    <span>Sem Folha de Cálculo de Lucro</span>
                  </li>
                </ul>
              </div>

              <div>
                <a 
                  href={basicCheckoutUrl} 
                  target="_self"
                  onClick={() => handleCheckoutClick('Plano Básico', 7.90)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-4 text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                  id="btn-plano-basico"
                >
                  👉 Quero o Plano Básico (€7,90)
                </a>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-bold mt-4">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#28a745] shrink-0" />
                  <span>Pagamento Seguro via MB Way</span>
                </div>
              </div>
            </div>

            {/* PLANO COMPLETO (RECOMENDADO) */}
            <div className="bg-zinc-900 border-2 border-[#D4A574] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-[#D4A574] text-[#1A1A1A] text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full shadow-md">
                RECOMENDADO
              </div>
              
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A574]">PLANO COMPLETO</span>
                <h3 className="font-serif text-2xl font-black text-white mt-1 mb-2">A Experiência de Elite</h3>
                <p className="text-zinc-300 text-xs sm:text-sm font-semibold mb-6">A estrutura empresarial inteira para dominares o mercado e lucrares rapidamente.</p>
                
                {/* Price block */}
                <div className="mb-6 pb-6 border-b border-zinc-800/60">
                  <span className="text-red-500 text-xs font-bold block h-4">
                    Valor dos bónus e manuais: <span className="text-red-500 line-through">€76,00</span>
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl sm:text-4xl font-serif font-black text-emerald-500">€14,90</span>
                    <span className="text-zinc-400 text-xs font-bold font-sans">/ pagamento único</span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-3.5 mb-8 text-zinc-200 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#D4A574] shrink-0 mt-0.5" />
                    <span><strong>Tudo do Plano Básico</strong> (Manual + Fornecedores)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#D4A574] shrink-0 mt-0.5" />
                    <span><strong>Pack Malas Premium</strong> (+100 modelos de luxo avançados)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#D4A574] shrink-0 mt-0.5" />
                    <span><strong>Calculadora de Lucro Boutique</strong> no telemóvel</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-[#D4A574] shrink-0 mt-0.5" />
                    <span><strong>Legendas Magnéticas para WhatsApp</strong> (guiões copia e cola)</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[#D4A574] font-bold">
                    <Sparkles className="h-4.5 w-4.5 text-[#D4A574] shrink-0 mt-0.5" />
                    <span><strong>Calendário de Procura Anual em Portugal</strong> completo</span>
                  </li>
                </ul>
              </div>

              <div>
                <a 
                  href={completeCheckoutUrl} 
                  target="_self"
                  onClick={() => handleCheckoutClick('Plano Completo', 14.90)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white px-6 py-4 text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 shadow-md shadow-emerald-950/30 cursor-pointer"
                  id="btn-plano-completo"
                >
                  👉 Quero o Plano Completo (€14,90)
                </a>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#D4A574] font-bold mt-4">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Pagamento Seguro via MB Way</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          BLOCO 14: INVERSÃO DE RISCO, FAQ & RODAPÉ
      ========================================================================= */}
      {/* GARANTIA */}
      <section className="bg-white px-4 py-16 sm:px-8 sm:py-20 border-b border-zinc-200" id="garantia">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-[#8B4513] border border-[#D4A574]/40 mb-6 shadow-sm">
            <ShieldCheck className="h-10 w-10 text-[#8B4513]" />
          </div>
          
          <h2 className="font-serif text-3xl font-black text-zinc-900 sm:text-4xl mb-3">
            Garantia Incondicional de 7 Dias
          </h2>
          
          <p className="text-xl font-extrabold text-[#8B4513] tracking-wide mb-6">
            "O Risco é Meu, o Lucro é Teu"
          </p>
          
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Se entrares no método, leres o manual e, por algum motivo absurdo, achares que as tuas peças não ficam dignas de uma boutique, basta um e-mail no prazo de 7 dias. Eu devolvo-te os teus €7,90 ou €14,90 imediatamente. Sem perguntas burocráticas, sem ressentimentos. O risco financeiro está 100% do meu lado.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FAF8F5] px-4 py-16 sm:px-8 sm:py-20 border-b border-zinc-200" id="faq">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B4513] block">DÚVIDAS FREQUENTES</span>
            <h2 className="font-serif text-3xl font-black text-[#1A1A1A] sm:text-4xl mt-2">
              Perguntas Frequentes
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-[#8B4513]"></div>
          </div>

          <div className="space-y-5 max-w-2xl mx-auto text-left">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h4 className="text-base font-bold text-zinc-900 mb-2">Como recebo o acesso?</h4>
              <p className="text-xs sm:text-sm text-stone-600 font-semibold leading-relaxed">
                Recebes o material digital imediatamente no teu e-mail e podes abri-lo direto no ecrã do teu telemóvel assim que o pagamento for confirmado.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h4 className="text-base font-bold text-zinc-900 mb-2">É seguro pagar por MB Way?</h4>
              <p className="text-xs sm:text-sm text-stone-600 font-semibold leading-relaxed">
                Completamente. O checkout é processado num ambiente encriptado de grau bancário na Hotmart. É tão rápido e seguro como transferires dinheiro para uma amiga.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h4 className="text-base font-bold text-zinc-900 mb-2">Nunca toquei numa agulha. Este método é para mim?</h4>
              <p className="text-xs sm:text-sm text-stone-600 font-semibold leading-relaxed">
                Sim. A metodologia gráfica ensina do absoluto zero. Não precisas de "talento", precisas apenas de seguir a técnica visual e as marcações geométricas que mostramos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h4 className="text-base font-bold text-zinc-900 mb-2">Tenho suporte se tiver dúvidas?</h4>
              <p className="text-xs sm:text-sm text-stone-600 font-semibold leading-relaxed">
                Sim, tens suporte por e-mail e WhatsApp pós-venda para te ajudar no que precisares durante a confecção das tuas malas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 px-4 py-12 text-zinc-500 border-t border-zinc-900" id="main-footer">
        <div className="mx-auto max-w-[960px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="font-serif text-lg text-[#D4A574] tracking-[0.2em] uppercase font-bold text-center md:text-left">
              ATELIER DE MALAS PREMIUM
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <button onClick={() => setActiveModal("privacidade")} className="hover:text-[#D4A574] transition-colors cursor-pointer">POLÍTICA DE PRIVACIDADE</button>
              <button onClick={() => setActiveModal("termos")} className="hover:text-[#D4A574] transition-colors cursor-pointer">TERMOS E CONDIÇÕES</button>
              <button onClick={() => setActiveModal("contacto")} className="hover:text-[#D4A574] transition-colors cursor-pointer">CONTACTO</button>
            </div>
          </div>

          <div className="border-t border-zinc-900/60 pt-6 text-center text-[10px] text-zinc-600 font-semibold tracking-wide space-y-2">
            <p>© {new Date().getFullYear()} Atelier de Malas Premium Portugal. Todos os direitos reservados.</p>
            <p className="max-w-2xl mx-auto leading-relaxed">Este material digital não é afiliado de nenhuma rede social ou plataforma externa, sendo toda a responsabilidade de operacionalização e garantia do proprietário legal.</p>
          </div>
        </div>
      </footer>

      {/* COMPLIANCE DIALOG MODALS */}
      {activeModal && (
        <section className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl z-10 border border-[#D4A574]/30">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600 p-1 bg-zinc-50 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[60vh] overflow-y-auto pr-2 mt-4 text-left">
              {activeModal === "privacidade" && (
                <div>
                  <h3 className="font-serif text-2xl font-black text-zinc-900 mb-4 tracking-tight">Política de Privacidade</h3>
                  <div className="space-y-4 text-xs sm:text-sm text-zinc-650 leading-relaxed font-semibold">
                    <p>A tua privacidade é de extrema relevância para nós. Respeitamos a privacidade em relação a qualquer informação tua que possamos recolher.</p>
                    <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para te fornecer o acesso seguro ao material digital. Fazemo-lo por meios justos e legais, com o teu total conhecimento e consentimento informado.</p>
                    <p>Não partilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido estritamente por lei em vigor.</p>
                    <p>Os pagamentos são processados em plataformas externas seguras cifradas com SSL (Hotmart). Não guardamos os teus dados bancários ou cartões nos nossos sistemas.</p>
                  </div>
                </div>
              )}

              {activeModal === "termos" && (
                <div>
                  <h3 className="font-serif text-2xl font-black text-zinc-900 mb-4 tracking-tight">Termos e Condições</h3>
                  <div className="space-y-4 text-xs sm:text-sm text-zinc-650 leading-relaxed font-semibold">
                    <p>Ao acederes ao método digital Atelier de Malas Premium, concordas em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
                    <p>O conteúdo deste método, incluindo textos, moldes, fornecedores e estratégias comerciais, está protegido por leis de direitos de autor aplicáveis.</p>
                    <p>A licença fornecida após a compra é estritamente de caráter pessoal e intransmissível. É terminantemente proibido piratear, partilhar ou revender os ficheiros PDF sem autorização por escrito dos detentores legais.</p>
                  </div>
                </div>
              )}

              {activeModal === "contacto" && (
                <div className="text-center py-6">
                  <h3 className="font-serif text-2xl font-black text-zinc-900 mb-3 tracking-tight">Contacto Comercial</h3>
                  <p className="text-xs sm:text-sm text-zinc-650 max-w-md mx-auto mb-6 font-semibold">
                    Tens alguma dúvida em relação ao teu acesso, acompanhamento ou fornecimento? A nossa equipa de apoio em Portugal está pronta para te responder!
                  </p>
                  <div className="mx-auto max-w-sm space-y-4 pt-6 border-t border-zinc-100">
                    <div className="flex items-center justify-center gap-3 text-zinc-700 bg-zinc-50 p-3 rounded-xl border border-zinc-150">
                      <Mail className="h-5 w-5 text-[#8B4513]" />
                      <span className="text-xs sm:text-sm font-bold text-zinc-900">suporte@atelierdemalas.pt</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-zinc-700 bg-zinc-50 p-3 rounded-xl border border-zinc-150">
                      <Phone className="h-5 w-5 text-[#8B4513]" />
                      <span className="text-xs sm:text-sm font-bold text-zinc-900">+351 912 345 678 (WhatsApp pós-venda)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-100 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="rounded-lg bg-zinc-100 hover:bg-zinc-200 px-5 py-2.5 text-xs font-bold text-zinc-700 transition-colors cursor-pointer"
              >
                Fechar Janela
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
