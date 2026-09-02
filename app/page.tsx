"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  EyeOff,
  Film,
  Headphones,
  LockKeyhole,
  LogOut,
  Menu,
  Mic2,
  Mountain,
  Play,
  Quote,
  Sparkles,
  Volume2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type District = {
  no: string;
  name: string;
  identity: string;
  short: string;
  question: string;
  text: string;
};

const districts: District[] = [
  {
    no: "01",
    name: "Beylikova",
    identity: "Raylar ve Ritimler",
    short: "Aile · toplumsal yaşam · şehrin insana verdiği nizam",
    question: "Bir şehir, hayatın ritmini sesleriyle kurar mı?",
    text: "Demiryolu raylarının zamanı işaretleyen sesi gündelik hayatın ritmine karışır. Kamera, çocuklarının ziyaret haberini raylardan gelen seste arayan bir ailenin günü boyunca hem ilçeyi hem de bekleyişin sesini dinler.",
  },
  {
    no: "02",
    name: "Odunpazarı",
    identity: "Pencereler ve İnsanlar",
    short: "Yaşayan hafıza · zanaat · gündelik hayat",
    question: "Bir kentin hafızası taşlarda mı, insan yüzlerinde mi birikir?",
    text: "Ahşap cumbaların gölgesinde tarih donmuş bir vitrin değildir. Sabah kepengini açan lületaşı ustasının tezgâhında ve yüzyıllık bir pencereden sokağı izleyen insanın çayında, nefes alan bugünün nabzı tutulur.",
  },
  {
    no: "03",
    name: "Çifteler",
    identity: "Suyun İlk Nefesi",
    short: "Yeniden başlamak · yaşam · umut",
    question: "Bir nehrin doğduğu yer, yeni başlangıçların da mekânı olabilir mi?",
    text: "Sakarya’nın toprağı yarıp nefes aldığı ilk yerde, her gün bu doğuma tanıklık eden bir insanın rutinleri izlenir. Balıkçılıkla hayatını kazanan bir yüz üzerinden yaşamın yeniden başlama gücü aranır.",
  },
  {
    no: "04",
    name: "Han",
    identity: "Taşta Biriken Zaman",
    short: "Frigya · geçmiş ve bugün · emek",
    question: "Binlerce yıllık hafıza bugünün ellerinde nasıl yaşar?",
    text: "Han’ın yeraltı dehlizlerine dokunan bir rehberin parmak uçları ile toprağa lavanta fidanı emanet eden üreticinin emeği aynı hikâyede buluşur. Frigya’nın mirası, insanla birlikte ete kemiğe bürünür.",
  },
  {
    no: "05",
    name: "Mahmudiye",
    identity: "Anadolu’nun At Başkenti",
    short: "Bilim · gelenek · sevgi bağı",
    question: "Mahmudiye’yi atların başkenti yapan şey, her şeyden önce sevgi midir?",
    text: "Veteriner hekimin bilimsel titizliği, nal ustasının geleneksel mahareti ve insanla at arasındaki sessiz dostluk aynı kadraja girer. İlçenin asıl mirası, nesilden nesile aktarılan bu bağda aranır.",
  },
  {
    no: "06",
    name: "Günyüzü",
    identity: "Sessizliğin Çağrısı",
    short: "Yavaşlamak · sabır · gökyüzü",
    question: "Şehri duymak için önce yavaşlamak gerekir mi?",
    text: "Bozkırın üzerine çöken karanlık bir yoksunluk değil, evrenin fısıltılarını duymak için bir lütuftur. Kamera hız çağının kibrini reddeder; sessizlikte büyüyen sabrı ve o sessizlikteki devasa hikâyeyi kaydeder.",
  },
  {
    no: "07",
    name: "İnönü",
    identity: "Yer, Gök, Emek",
    short: "Havacılık · üretim · millî mücadele ruhu",
    question: "Bir ilçenin mücadele ruhu, bugünün emeğinde yaşamaya devam eder mi?",
    text: "Havacılık sektörü ile ağır sanayinin şehre yüklediği anlam, İnönü’de doğup büyümüş genç bir çalışanın yüzünden okunur. Toprağın, gökyüzünün ve üretimin ortak hafızası görünür hâle gelir.",
  },
  {
    no: "08",
    name: "Mihalgazi",
    identity: "İnsan ve Toprak",
    short: "Vaha · bereket · memleket bağı",
    question: "Korunaklı bir vadi, insanıyla nasıl karşılıklı bir bağ kurar?",
    text: "Sarp yamaçların arasında Sakarıılıca’nın termal suları ve seraların altında toprağa eğilen emeğin nefesi duyulur. Mihalgazi, insanının kendisiyle kurduğu korunaklı ve bereketli bağı anlatır.",
  },
  {
    no: "09",
    name: "Mihalıççık",
    identity: "Yunus’un Öğretisi",
    short: "Sevgi felsefesi · emek · zanaat",
    question: "Yunus’un sözü, bugünün gündelik emeğinde nasıl okunur?",
    text: "Yunus’un toprağında kelimeler susar; öğretisi kiraz işçisinin emeğinde ve zanaatkârın elinde görünür olur. Kamera, yüzyıllardır şehre işlenmiş sevgi dilini doğrudan kentin kendisinden dinler.",
  },
  {
    no: "10",
    name: "Alpu",
    identity: "Nesil ve Toprak",
    short: "Üretim · akıllı tarım · genç üretici",
    question: "Toprak yalnızca bir üretim aracı mı, nesiller arası bir iletişim bağı mı?",
    text: "Bir çiftçi ailesinin hikâyesi üzerinden nesil, toprak ve insan ilişkisi izlenir. Cevap; geleceği üretirken toprağı koruyan, onu dinleyen ellerde ve kuşaklar arasındaki sessiz aktarımda aranır.",
  },
  {
    no: "11",
    name: "Sarıcakaya",
    identity: "Beraber Üretmek",
    short: "Dayanışma · vadi · bereket",
    question: "Bir vadinin bereketi, dayanışmanın ritmiyle mi çoğalır?",
    text: "İpekböceğinin kozasını örerken çıkardığı ince ses, seradan ürün taşıyan kamyonların homurtusuna karışır. Kamera sıcağa göğüs geren sıradan hayatlarda ruh ile madde arasındaki dayanışma bağını dinler.",
  },
  {
    no: "12",
    name: "Seyitgazi",
    identity: "Ruh ve Madde",
    short: "İnanç · bilim · görünmez köprü",
    question: "Bilimin gerçekliği ile inancın derinliği aynı şehirde nerede kesişir?",
    text: "Bor madenini yüksek teknolojiyle işleyen mühendisin bakışı, Seyyid Battal Gazi Külliyesi’nin gölgesindeki sükûnetle buluşur. İlçe, maddi üretim ile manevi hafıza arasındaki görünmez köprüyü anlatır.",
  },
  {
    no: "13",
    name: "Sivrihisar",
    identity: "Evrensel Mizah",
    short: "Nasreddin Hoca · genç anlatı · söz",
    question: "Yüzyıllar öncesinden gelen bir gülümseme bugünün sesine dönüşebilir mi?",
    text: "Nasreddin Hoca’nın felsefesini podcast mikrofonuyla dünyaya taşımak isteyen bir genç, ilçenin insanlarını dinler. Şehir de kendisini onun merakı, mizahı ve yeni nesil anlatımı üzerinden ifade eder.",
  },
  {
    no: "14",
    name: "Tepebaşı",
    identity: "Öz",
    short: "Geçmiş · sürdürülebilir yaşam · gelecek",
    question: "Bir şehrin vizyonu, kendi özüyle bağını koruyarak kurulabilir mi?",
    text: "Demiryolu atölyelerinin üretim ruhu, üniversite kampüsleri ve sürdürülebilir mahallelerle bugüne taşınır. Bisikletiyle şehri geçen bir öğrencinin rutini, geçmişle gelecek arasındaki bağı kurarak serinin anlamını tamamlar.",
  },
];

const navItems = [
  { id: "manifesto", label: "Manifesto" },
  { id: "bolumler", label: "14 Bölüm" },
  { id: "sinema", label: "Sinema Dili" },
  { id: "etki", label: "Etki" },
  { id: "uyum", label: "Stratejik Uyum" },
  { id: "uretim", label: "Üretim" },
];

const USER_HASH = "f1e27f89bedae8952a576434b0fc2ec851ebbd7b0391407ed7181d0347acfa61";
const PASS_HASH = "95f5c93cdf6f7d46d7c7cd41d2b6199ee390f2cc82259ce2233bad2cab194ad3";

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function RatelMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`ratel-mark${compact ? " ratel-mark--compact" : ""}`}>
      <span className="ratel-symbol" aria-hidden="true"><span>R</span></span>
      <span className="ratel-wordmark"><strong>RATEL</strong><small>DİJİTAL</small></span>
    </div>
  );
}

function RatelLoginLogo() {
  return (
    <div className="ratel-login-logo">
      <img src="./images/ratel-dijital-logo.webp" alt="Ratel Dijital" />
    </div>
  );
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const [userHash, passHash] = await Promise.all([
      sha256(username.trim().toLocaleLowerCase("tr-TR")),
      sha256(password),
    ]);
    await new Promise((resolve) => window.setTimeout(resolve, 420));
    if (userHash === USER_HASH && passHash === PASS_HASH) {
      sessionStorage.setItem("bide-beni-tek-cek-access", "granted");
      onSuccess();
    } else {
      setError("Kullanıcı adı veya şifre hatalı. Bilgilerinizi kontrol edin.");
    }
    setLoading(false);
  }

  return (
    <main className="login-shell">
      <div className="login-grain" aria-hidden="true" />
      <div className="login-orbit login-orbit--one" aria-hidden="true" />
      <div className="login-orbit login-orbit--two" aria-hidden="true" />

      <section className="login-story" aria-label="Proje tanıtımı">
        <div className="login-story__brandline"><span aria-hidden="true" /> Ratel Dijital yapım sunumu</div>
        <div className="login-story__center">
          <p className="eyebrow eyebrow--light">Özel proje karşılama alanı</p>
          <div className="login-project-lockup">
            <span className="login-project-lockup__frame" aria-hidden="true">14</span>
            <div><p>Belgesel Dizi Projesi</p><h1>Bi’de Beni Tek Çek</h1></div>
          </div>
          <p className="login-lead">Eskişehir’in on dört ilçesini, o şehirle bağ kurmuş insanların yüzünden ve sesinden dinleyen bir belgesel yolculuğu.</p>
        </div>
        <div className="login-story__foot"><span>14 ilçe</span><span>14 insan portresi</span><span>tek yaşayan hafıza</span></div>
      </section>

      <section className="login-panel" aria-label="Giriş alanı">
        <div className="login-panel__inner">
          <RatelLoginLogo />
          <p className="login-kicker"><LockKeyhole size={15} aria-hidden="true" /> Korumalı sunum</p>
          <h2>Proje dosyasına giriş</h2>
          <p className="login-helper">Bu alan yalnızca yetkilendirilmiş proje paydaşlarının erişimine açıktır.</p>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <span>Kullanıcı adı</span>
              <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" inputMode="text" placeholder="Kullanıcı adınızı yazın" required />
            </label>
            <label>
              <span>Şifre</span>
              <div className="password-field">
                <input value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" type={showPassword ? "text" : "password"} placeholder="Şifrenizi yazın" required />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            <div className={`login-error${error ? " is-visible" : ""}`} role="alert">{error || "Giriş bilgileri doğrulanamadı."}</div>
            <button className="login-submit" type="submit" disabled={loading}>
              <span>{loading ? "Doğrulanıyor" : "Sunuma giriş yap"}</span>
              {loading ? <span className="button-loader" /> : <ArrowRight size={18} />}
            </button>
          </form>
          <div className="login-secure-note"><span className="secure-dot" /> Ratel Dijital korumalı karşılama alanı</div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({ index, kicker, title, text, light = false }: { index: string; kicker: string; title: string; text?: string; light?: boolean }) {
  return (
    <header className={`section-heading${light ? " section-heading--light" : ""}`}>
      <div className="section-heading__index">{index}</div>
      <div><p className="eyebrow">{kicker}</p><h2>{title}</h2>{text ? <p className="section-heading__text">{text}</p> : null}</div>
    </header>
  );
}

function SoundWave() {
  const bars = useMemo(() => [24, 42, 68, 34, 78, 50, 90, 58, 38, 72, 46, 84, 54, 30, 62, 40, 76, 48], []);
  return <div className="sound-wave" aria-hidden="true">{bars.map((height, index) => <span key={`${height}-${index}`} style={{ height: `${height}%`, animationDelay: `${index * -0.08}s` }} />)}</div>;
}

function ProjectSite({ onLogout }: { onLogout: () => void }) {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [activeSection, setActiveSection] = useState("manifesto");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -64%", threshold: [0.05, 0.25, 0.55] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  function goTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

  return (
    <main className="site-shell">
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <header className="site-header">
        <button className="project-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Sayfa başına dön">
          <span className="project-brand__frame">14</span><span><strong>Bi’de Beni Tek Çek</strong><small>Belgesel Dizi Projesi</small></span>
        </button>
        <nav className="desktop-nav" aria-label="Ana menü">
          {navItems.map((item) => <button key={item.id} className={activeSection === item.id ? "is-active" : ""} onClick={() => goTo(item.id)}>{item.label}</button>)}
        </nav>
        <div className="header-actions">
          <button className="logout-button" onClick={onLogout} aria-label="Oturumu kapat"><LogOut size={16} /><span>Çıkış</span></button>
          <Sheet>
            <SheetTrigger asChild><button className="mobile-menu-button" aria-label="Menüyü aç"><Menu size={22} /></button></SheetTrigger>
            <SheetContent side="right" className="mobile-sheet">
              <SheetHeader><SheetTitle>Bi’de Beni Tek Çek</SheetTitle><SheetDescription>Proje sunumu</SheetDescription></SheetHeader>
              <nav className="mobile-nav" aria-label="Mobil menü">
                {navItems.map((item, index) => <SheetClose asChild key={item.id}><button onClick={() => goTo(item.id)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}<ChevronRight size={18} /></button></SheetClose>)}
              </nav>
              <div className="mobile-sheet__foot"><RatelMark compact /></div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img className="hero__image" src="./images/hero-steppe.webp" alt="Bozkıra ve uzaktan geçen trene bakan bir Eskişehir sakini için oluşturulmuş sinematik atmosfer görseli" />
        <div className="hero__shade" /><div className="hero__grain" /><div className="hero__frame hero__frame--tl" aria-hidden="true" /><div className="hero__frame hero__frame--br" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__pretitle"><span /> Eskişehir’in yaşayan hafızası</p>
          <h1 id="hero-title"><span>Bi’de Beni</span><strong>Tek Çek</strong></h1>
          <blockquote>“Şehir, anlatırken dinler.”</blockquote>
          <p className="hero__lead">Şehri anlatma kaygısından arınmış bir kameranın, şehirle bağ kurmuş sıradan ve sessiz insanların portreleri üzerinden Eskişehir’in on dört ilçesini dinlediği belgesel seri.</p>
          <div className="hero__actions"><button className="primary-action" onClick={() => goTo("manifesto")}><Play size={16} fill="currentColor" /> Hikâyeyi keşfet</button><button className="text-action" onClick={() => goTo("bolumler")}>14 bölüme bak <ArrowDown size={16} /></button></div>
        </div>
        <div className="hero__stats" aria-label="Proje bilgileri"><div><strong>14</strong><span>İlçe</span></div><div><strong>14</strong><span>Bölüm</span></div><div><strong>18–24</strong><span>Dakika / Bölüm</span></div></div>
        <p className="creative-visual-note">Yaratıcı atmosfer görseli</p>
      </section>

      <section id="manifesto" className="manifesto section-anchor">
        <div className="page-width">
          <SectionHeading index="01" kicker="Manifesto" title="Bir şehri göstermek yetmez. Onu dinlemek gerekir." text="Bi’de Beni Tek Çek, tanıtımın parlak yüzeyini değil; insan, mekân ve hafıza arasındaki gerçek bağı kadraja alır." />
          <div className="manifesto-grid">
            <div className="manifesto-quote"><Quote size={28} aria-hidden="true" /><p>Bir mekân, onunla bağ kuran insan yanımızda yoksa bizimle konuşmaz.</p><span>Projenin logline’ından</span></div>
            <div className="manifesto-copy"><p className="dropcap">Kamera bu projede bir anlatıcı değil, izleyiciyle birlikte yürüyen bir <em>flanördür</em>. Önceden verilmiş bir hükmü kanıtlamaz; gündelik hayatın içinde şehrin kendi sözünü bulmasını bekler.</p><p>İnsan portresi yaşadığı kentle bütünleşir; emek, zanaat, üretim, inanç, mizah, tabiat ve gelecek aynı yüzün çizgilerinde görünür olur. Her bölüm tek bir sonuç dayatmak yerine, izleyiciye şehirle kendi bağını kuracağı bir alan açar.</p></div>
          </div>
          <div className="principles" aria-label="Anlatı ilkeleri">
            <article><span>01</span><Mic2 size={22} /><h3>Anlatmak değil, dinlemek</h3><p>Şehrin insanı, ritmi ve gündelik sesi anlatının merkezindedir.</p></article>
            <article><span>02</span><Eye size={22} /><h3>Gerçekliğe sadakat</h3><p>Kurulmuş bir turizm vitrini yerine hayatın organik akışı izlenir.</p></article>
            <article><span>03</span><Mountain size={22} /><h3>İnsan–mekân bağı</h3><p>Mekân, onunla yaşayan insanın hafızasıyla birlikte anlam kazanır.</p></article>
            <article><span>04</span><Headphones size={22} /><h3>Kentin kendi sesi</h3><p>Dış sesin yerini ray, rüzgâr, su, emek ve gündelik yaşam alır.</p></article>
          </div>
        </div>
      </section>

      <section id="bolumler" className="districts-section section-anchor">
        <div className="page-width">
          <SectionHeading index="02" kicker="Bölüm Evreni" title="On dört ilçe. On dört ayrı ses." text="Her bölüm, ilçeyi bir katalog maddesine indirgemeden; o coğrafyayla gerçek bağ kurmuş bir insanın gündelik yaşamından okur. Kartlara dokunarak bölüm yaklaşımını açın." light />
          <div className="districts-topline"><p><span className="live-dot" /> 14 bölüm seçkisi</p><span>İnsan · mekân · hafıza</span></div>
          <div className="district-grid">
            {districts.map((district) => <button key={district.name} className="district-card" onClick={() => setSelectedDistrict(district)}><span className="district-card__no">{district.no}</span><span className="district-card__body"><small>{district.identity}</small><strong>{district.name}</strong><em>{district.short}</em></span><span className="district-card__arrow"><ArrowRight size={18} /></span></button>)}
          </div>
        </div>
      </section>

      <Dialog open={Boolean(selectedDistrict)} onOpenChange={(open) => !open && setSelectedDistrict(null)}>
        <DialogContent className="district-dialog">
          {selectedDistrict ? <><DialogHeader><div className="district-dialog__meta"><span>Bölüm {selectedDistrict.no}</span><span>{selectedDistrict.identity}</span></div><DialogTitle>{selectedDistrict.name}</DialogTitle><DialogDescription>{selectedDistrict.short}</DialogDescription></DialogHeader><div className="district-dialog__question">“{selectedDistrict.question}”</div><p className="district-dialog__text">{selectedDistrict.text}</p><div className="district-dialog__foot"><span><Film size={16} /> 18–24 dakika</span><span><Mic2 size={16} /> İnsan portresi</span></div></> : null}
        </DialogContent>
      </Dialog>

      <section id="sinema" className="cinema-section section-anchor">
        <div className="page-width">
          <SectionHeading index="03" kicker="Görsel ve İşitsel Yaklaşım" title="Görüntü gösterir. Ses şehri içeri alır." text="Projenin sinema dili, dijital keskinlik ve tanıtım filmi doygunluğu yerine sıcak, dokulu ve gözlemci bir gerçeklik kurar." />
          <div className="cinema-collage">
            <figure className="cinema-image cinema-image--craft"><img src="./images/craft-memory.webp" alt="Bir zanaatkârın taş işleyen elleri için oluşturulmuş sinematik atmosfer görseli" /><figcaption><span>Görsel doku</span> İnsan yüzü kadar eller, malzeme ve emek de hikâyeyi taşır.</figcaption></figure>
            <div className="cinema-notes">
              <article><span>01 / RENK</span><h3>Organik pelikül hissi</h3><p>Pastel toprak tonları, bozkırın soluk sarısı ve günün yatay sıcak ışığı; insanla mekân arasındaki derinliği görünür kılar.</p></article>
              <article><span>02 / KAMERA</span><h3>Akıcı ve görünmez</h3><p>Flanör kamera doğal akışı bozmadan mekâna süzülür; seyirciyi dışarıdaki gözlemciden içerideki yol arkadaşına dönüştürür.</p></article>
              <article><span>03 / IŞIK</span><h3>Atmosfer kuran gölge</h3><p>Işık düz bir aydınlatma değil; yüzleri, coğrafyayı ve zamanı birbirine bağlayan anlatı katmanıdır.</p></article>
            </div>
            <div className="sound-card"><div className="sound-card__icon"><Volume2 size={22} /></div><p className="eyebrow">İşitsel sinematografi</p><h3>Şehrin nefesini duymak</h3><p>Didaktik dış ses yerine ilçenin kendi ritmi konuşur: raylar, rüzgâr, su, atölye, tarla ve insan sesi.</p><SoundWave /><div className="sound-card__labels"><span>Ray</span><span>Rüzgâr</span><span>Emek</span><span>Hafıza</span></div></div>
            <figure className="cinema-image cinema-image--horse"><img src="./images/horse-bond.webp" alt="Bir at bakıcısı ile at arasındaki bağı gösteren sinematik atmosfer görseli" /><figcaption><span>İnsan–mekân bağı</span> Büyük anlatı, sessiz ve sahici bir temasın içinde bulunur.</figcaption></figure>
          </div>
        </div>
      </section>

      <section id="etki" className="impact-section section-anchor">
        <div className="page-width">
          <SectionHeading index="04" kicker="Projenin Değeri" title="Ekranda başlayan bağ, şehirde devam eder." text="Belgesel yalnızca izlenen bir içerik değil; Eskişehir’in bugününü kaydeden ve gelecekteki şehir anlatısını besleyen kalıcı bir kültürel varlıktır." />
          <div className="impact-grid">
            <article className="impact-card impact-card--large"><span className="impact-card__number">01</span><Sparkles size={25} /><h3>Deneyimsel turizm</h3><p>İlçeleri tüketilecek turizm nesneleri değil, hissedilecek yaşam evrenleri olarak konumlandırır. İzleyicide yüzeysel meraktan daha derin bir destinasyon ilgisi kurmayı amaçlar.</p><div className="impact-card__line"><span /></div></article>
            <article className="impact-card"><span className="impact-card__number">02</span><Film size={25} /><h3>Yaşayan görsel arşiv</h3><p>Zanaatları, üretim pratiklerini, sözlü belleği ve insan–mekân bağını bugünün gerçekliği içinde kayıt altına alır.</p></article>
            <article className="impact-card"><span className="impact-card__number">03</span><Mountain size={25} /><h3>İlçe görünürlüğü</h3><p>Şehir anlatısını merkezden ilçelere yayar; on dört farklı kimliği ortak bir Eskişehir hafızasında buluşturur.</p></article>
            <article className="impact-card impact-card--quote"><Quote size={22} /><p>Geleceğin kent araştırmacıları için yaşayan bir sözlü ve görsel tarih referansı.</p></article>
          </div>
        </div>
      </section>

      <section id="uyum" className="alignment-section section-anchor">
        <div className="page-width">
          <SectionHeading index="05" kicker="Stratejik Konum" title="Bağımsız proje. Ortak şehir vizyonu." text="Bi’de Beni Tek Çek herhangi bir projenin alt bileşeni değildir. Kendi sahiplik, başvuru, yapım ve hak yapısına sahip müstakil bir projedir; şehir ölçeğindeki iki stratejik çalışmayla yalnızca vizyon ve kullanım bakımından uyumludur." light />
          <div className="alignment-map">
            <article className="alignment-node alignment-node--vision"><span>Stratejik çatı vizyon</span><h3>Vizyon Eskişehir 2036</h3><p>Merkezden kırsala bütüncül bakış, dengeli gelişim, kültürel değerlerin korunması ve on dört ilçenin ortak gelecek anlatısı.</p></article>
            <div className="alignment-link"><span>vizyon uyumu</span><div><i /><i /></div></div>
            <article className="alignment-node alignment-node--project"><span>Müstakil proje</span><h3>Bi’de Beni Tek Çek</h3><p>Bağımsız kurumsal yapı, üretim, bütçe, satın alma, yayın ve fikrî hak süreci.</p><strong><Check size={16} /> İdari bağlılık yok</strong></article>
            <div className="alignment-link"><span>eşgüdüm imkânı</span><div><i /><i /></div></div>
            <article className="alignment-node alignment-node--eco"><span>Ayrı proje</span><h3>Eko Turizm Alt Yapı Birliği</h3><p>Rota, QR hikâye alanı, yerel deneyim ve destinasyon iletişiminde belgesel içeriklerinden karşılıklı mutabakatla yararlanılabilir.</p></article>
          </div>
          <div className="alignment-rule"><LockKeyhole size={19} /><p><strong>Ortak vizyon, idari bağlılık anlamına gelmez.</strong> Her projenin başvuru, sözleşme, bütçe, satın alma, teslim ve kullanım hakları ayrı yürütülür.</p></div>
        </div>
      </section>

      <section className="distribution-section">
        <div className="page-width distribution-layout">
          <div><p className="eyebrow">Dağıtım Mimarisi</p><h2>İzleyiciyi çağıran, içeriği dayatmayan üç aşama.</h2></div>
          <ol className="distribution-steps">
            <li><span>01</span><div><h3>İnsan hikâyesiyle ilk temas</h3><p>Her bölümden 30–60 saniyelik güçlü kesitler, niş ilgi alanlarına göre dijital mecralarda izleyiciyle buluşur.</p></div></li>
            <li><span>02</span><div><h3>Odaklı dijital gösterim</h3><p>Hikâye anlatıcılığına değer veren ulusal ve bağımsız dijital platformlar, anlaşma ve proje gelişimine bağlı hedef mecralar olarak değerlendirilir.</p></div></li>
            <li><span>03</span><div><h3>Şehre geri dönüş</h3><p>Uygun paydaşlıklarla karşılama alanları, müzeler ve ulaşım noktaları; “kenti bir de kendi insanından dinleyin” deneyimine dönüşür.</p></div></li>
          </ol>
        </div>
      </section>

      <section id="uretim" className="production-section section-anchor">
        <div className="page-width">
          <SectionHeading index="06" kicker="Üretim Modeli" title="Her bölüm, keşiften yayına yaşayan bir süreç." text="Proje dosyasındaki bölüm bazlı öngörü; saha, müzik ve post-prodüksiyon aşamalarını tek bir sinema dili altında birleştirir. Kurumsal sunum ve geri bildirim süresi iletişim takvimine göre ayrıca yönetilir." />
          <div className="production-summary"><div><Clock3 size={22} /><strong>35</strong><span>öngörülen iş günü / bölüm</span></div><p>Kurumsal sunum ve geri bildirim süresi hariç bölüm bazlı planlama.</p></div>
          <div className="production-timeline" aria-label="Bölüm üretim aşamaları">
            {[["01", "Keşif ve plan", "3 gün"], ["02", "Karakter çekimleri", "3 gün"], ["03", "Şehir planları", "2 gün"], ["04", "Tema müziği", "5 gün"], ["05", "Offline edit", "5 gün"], ["06", "Online edit", "10 gün"], ["07", "Renk", "2 gün"], ["08", "Afiş ve kapak", "2 gün"], ["09", "Yayın hazırlığı", "3 gün"]].map(([no, title, time]) => <article key={no}><span>{no}</span><div><h3>{title}</h3><p>{time}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="finale"><div className="finale__grain" /><div className="page-width finale__content"><p className="eyebrow eyebrow--light">Bi’de Beni Tek Çek</p><h2>Şehri anlatmak yerine<br />dinlemeye hazır mıyız?</h2><p>14 ilçe · 14 insan portresi · tek yaşayan hafıza</p><button onClick={() => goTo("bolumler")}><span>Bölümleri yeniden keşfet</span><ArrowRight size={18} /></button></div></section>
      <footer className="site-footer"><div className="page-width site-footer__inner"><RatelMark compact /><p>Özel proje sunum alanı</p><span>© 2026 Ratel Dijital</span></div></footer>
    </main>
  );
}

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => { setAuthorized(sessionStorage.getItem("bide-beni-tek-cek-access") === "granted"); setHydrated(true); }, []);
  function logout() { sessionStorage.removeItem("bide-beni-tek-cek-access"); setAuthorized(false); window.scrollTo({ top: 0 }); }
  if (!hydrated) return <div className="page-loader" aria-label="Sunum yükleniyor"><span /></div>;
  if (!authorized) return <LoginScreen onSuccess={() => setAuthorized(true)} />;
  return <ProjectSite onLogout={logout} />;
}
