import React, { useState, useEffect, useRef } from 'react'
import {
  LayoutGrid,
  BarChart3,
  CreditCard,
  UserCheck,
  Globe,
  Package,
  FileText,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
  Menu,
  X,
  ChefHat,
  TrendingUp,
  CheckCircle,
  MessageSquare,
  User,
  Building2,
  Loader2,
  Monitor,
  Star,
  ChevronDown,
  Quote,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Scroll-reveal hook
// ─────────────────────────────────────────────────────────────────────────────
function useReveal(rootMargin = '-60px') {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.08, rootMargin: `0px 0px ${rootMargin} 0px` }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return [ref, visible] as const
}

// ─────────────────────────────────────────────────────────────────────────────
// Wordmark
// ─────────────────────────────────────────────────────────────────────────────
function Wordmark({ tone = 'light' as 'light' | 'dark' }) {
  const fg   = tone === 'light' ? 'text-white' : 'text-[#1a1410]'
  const tile = tone === 'light'
    ? 'bg-white/10 ring-1 ring-white/20'
    : 'bg-[#1a1410]/5 ring-1 ring-[#1a1410]/10'
  return (
    <div className="flex items-center gap-3">
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${tile}`}>
        <svg viewBox="0 0 24 24" className={`h-6 w-6 ${fg}`} fill="none"
             stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4v16" />
          <path d="M6 4h6.5a3.5 3.5 0 0 1 0 7H6" />
          <path d="M6 11h7.5a3.5 3.5 0 0 1 0 9H6" />
          <circle cx="19" cy="6.5" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div className={`phk-serif text-3xl leading-none ${fg}`}>
        Bhookly<span className="ml-0.5 text-amber-300">.</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────
function LandingNav() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Features',     href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'FAQ',          href: '#faq' },
    { label: 'Contact',      href: '#contact' },
  ]

  const linkClass = scrolled
    ? 'text-[#1a1410]/65 hover:text-[#1a1410] transition-colors'
    : 'text-white/70 hover:text-white transition-colors'

  return (
    <nav className={`phk-nav fixed top-0 z-50 w-full ${scrolled ? 'phk-nav-scrolled' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Wordmark tone={scrolled ? 'dark' : 'light'} />

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className={`text-[13px] font-medium ${linkClass}`}>{l.label}</a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#contact"
             className="phk-cta inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white">
            Get early access <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)}
                className={`grid h-9 w-9 place-items-center rounded-lg md:hidden ${scrolled ? 'text-[#1a1410]' : 'text-white'}`}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#2a1407] px-6 pb-5 pt-3 md:hidden">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
               className="block py-3 text-[14px] font-medium text-white/80 hover:text-white">{l.label}</a>
          ))}
          <a href="#contact"
             className="phk-cta mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold text-white">
            Get early access <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero floating cards
// ─────────────────────────────────────────────────────────────────────────────
function HeroMocks() {
  return (
    <div className="relative flex-shrink-0 py-10" style={{ height: 520, width: 460 }}>

      {/* Kitchen ticket — top, slightly right of centre */}
      <div className="phk-card-a absolute right-0 top-0 w-[272px] rounded-2xl bg-white p-4 text-[#1a1410] shadow-2xl ring-1 ring-black/6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-amber-100 text-amber-700">
              <ChefHat className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Kitchen · #A-218</div>
              <div className="text-sm font-semibold">Table 12 · 4 guests</div>
            </div>
          </div>
          <span className="text-[11px] font-medium text-amber-600">02:14</span>
        </div>
        <div className="mt-3 space-y-1.5 text-sm">
          {[{qty:2,name:'Butter Chicken',tag:'Spicy'},{qty:1,name:'Garlic Naan',tag:undefined},{qty:2,name:'Mango Lassi',tag:'No sugar'}].map((item) => (
            <div key={item.name} className="flex items-center justify-between text-zinc-700">
              <div className="flex items-center gap-2">
                <span className="inline-grid h-5 w-5 place-items-center rounded bg-zinc-100 text-[10px] font-semibold text-zinc-600">{item.qty}</span>
                <span>{item.name}</span>
              </div>
              {item.tag && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-600">{item.tag}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Floor plan — middle-left, overlaps slightly */}
      <div className="phk-card-b absolute left-0 w-[272px] rounded-2xl bg-white p-4 text-[#1a1410] shadow-2xl ring-1 ring-black/6"
           style={{ top: 168 }}>
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Floor Plan · Dining</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />12 tables
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[{id:'T1',s:'busy'},{id:'T2',s:'busy'},{id:'T3',s:'open'},{id:'T4',s:'open'},{id:'T5',s:'busy'},{id:'T6',s:'rsv'},{id:'T7',s:'open'},{id:'T8',s:'busy'}].map((t) => (
            <div key={t.id} className={`rounded-lg py-2 text-center text-[11px] font-semibold ${t.s==='busy'?'bg-amber-100 text-amber-700':t.s==='rsv'?'bg-orange-50 text-orange-500':'bg-zinc-100 text-zinc-400'}`}>{t.id}</div>
          ))}
        </div>
      </div>

      {/* Payment card — bottom-right */}
      <div className="phk-card-c absolute bottom-0 right-0 w-[252px] rounded-2xl bg-white p-5 text-[#1a1410] shadow-2xl ring-1 ring-black/6">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Order · #B-491</div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Paid
          </span>
        </div>
        <div className="mt-2 phk-serif text-3xl">Rs 4,820</div>
        <div className="mt-1 text-xs text-zinc-500">Visa · 4242 · 1 tap</div>
        <div className="mt-4 flex items-center justify-between border-t border-dashed border-zinc-200 pt-3">
          <div className="text-[11px] uppercase tracking-wider text-zinc-500">Server</div>
          <div className="text-xs font-medium">Sarah K.</div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="phk-hero-bg relative min-h-screen text-white">
      <div className="phk-grain pointer-events-none absolute inset-0 overflow-hidden" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 lg:px-12">
        <div className="h-28" />

        <div className="flex flex-1 items-center gap-8 pb-16 pt-2 xl:gap-0 xl:justify-between">

          {/* Left: copy */}
          <div className="w-full max-w-[540px] flex-shrink-0">
            <div className="phk-hero-badge mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-200 ring-1 ring-white/15">
              <Sparkles className="h-3 w-3" />Restaurant POS, reimagined
            </div>

            <h1 className="phk-hero-title phk-serif text-[54px] leading-[1.03] tracking-tight xl:text-[66px]">
              Run your restaurant.
              <br />
              <span className="italic text-amber-200">Not your software.</span>
            </h1>

            <p className="phk-hero-body mt-6 max-w-[440px] text-[15px] leading-relaxed text-white/75">
              Bhookly is the front-of-house, kitchen and back-office workspace your team
              actually wants to open every shift. Tickets in seconds, payments in one tap,
              inventory that manages itself.
            </p>

            <div className="phk-hero-cta mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact"
                 className="phk-cta group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white">
                Get early access
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#how-it-works"
                 className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-[15px] font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/15">
                See how it works
              </a>
            </div>

            <dl className="phk-hero-stats mt-12 grid max-w-xs grid-cols-3 gap-5">
              {[
                { value: '14k+',  label: 'orders / day' },
                { value: '98.4%', label: 'on-time tickets' },
                { value: '6 sec', label: 'avg checkout' },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="phk-serif text-[28px] leading-none text-white">{s.value}</dt>
                  <dd className="mt-1.5 text-[10px] uppercase tracking-wider text-white/50">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: floating cards — hidden below xl */}
          <div className="hidden xl:flex xl:flex-1 xl:justify-end xl:pr-4">
            <HeroMocks />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pb-8">
          <div className="flex items-center gap-2 text-[12px] text-white/35">
            <ShieldCheck className="h-3.5 w-3.5" />
            PCI-aware · End-to-end encrypted · Your data stays yours
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// How It Works
// ─────────────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: '01',
    icon: FileText,
    title: 'Set up your menu & floor.',
    body: 'Add your dishes, categories, and pricing. Draw your dining room. Takes about 15 minutes — no IT, no spreadsheets.',
  },
  {
    n: '02',
    icon: UserCheck,
    title: 'Assign roles to your team.',
    body: 'Waitstaff, kitchen, counter, manager — every role gets exactly the interface they need. Nothing more, nothing less.',
  },
  {
    n: '03',
    icon: Sparkles,
    title: 'Go live. First order in seconds.',
    body: 'Your entire operation runs from the moment you switch on. Real-time data from the very first shift.',
  },
]

function HowItWorksSection() {
  const [ref, visible] = useReveal()
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#fdf8f1] py-28">
      <div className="phk-light-wash" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

        <div ref={ref}
             className={`mb-16 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-700 ring-1 ring-amber-100">
            <Sparkles className="h-3 w-3" />Simple by design
          </div>
          <h2 className="phk-serif text-[44px] leading-[1.05] text-[#1a1410]">
            Up and running
            <br />
            <span className="italic text-orange-600">before lunch service.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-zinc-600">
            Most POS systems need a 2-day installation and a training manual. Bhookly needs a morning.
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px lg:block"
               style={{ background: 'linear-gradient(to right, transparent 8%, rgba(234,88,12,0.2) 20%, rgba(234,88,12,0.2) 80%, transparent 92%)' }} />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <CardReveal key={step.n} delay={i * 120}>
                <div className="relative flex flex-col items-start rounded-2xl bg-white p-8 ring-1 ring-[rgba(120,53,15,0.10)]"
                     style={{ boxShadow: '0 4px 24px -8px rgba(234,88,12,0.10)' }}>
                  <div className="relative mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-2xl ring-4 ring-[#fdf8f1]"
                       style={{ background: 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)', boxShadow: '0 8px 20px -6px rgba(234,88,12,0.45)' }}>
                    <span className="phk-serif text-xl text-white">{step.n}</span>
                  </div>
                  <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                    <Icon style={{ height: 16, width: 16 }} />
                  </div>
                  <h3 className="phk-serif text-[22px] leading-snug text-[#1a1410]">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{step.body}</p>
                </div>
              </CardReveal>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="inline-flex items-center gap-2 text-[14px] font-semibold text-orange-600 hover:text-orange-700">
            Ready to get started? <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature mini-mockups
// ─────────────────────────────────────────────────────────────────────────────
function TableMockup() {
  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-[#fdf8f1] p-3.5 ring-1 ring-amber-100/60">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Dining · Main Hall</span>
        <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Live
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[{id:'T1',s:'busy'},{id:'T2',s:'busy'},{id:'T3',s:'open'},{id:'T4',s:'open'},{id:'T5',s:'busy'},{id:'T6',s:'rsv'},{id:'T7',s:'open'},{id:'T8',s:'busy'}].map((t) => (
          <div key={t.id} className={`rounded-lg py-2 text-center text-[10px] font-semibold ${t.s==='busy'?'bg-amber-100 text-amber-700':t.s==='rsv'?'bg-orange-50 text-orange-500':'bg-zinc-100 text-zinc-400'}`}>{t.id}</div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-3 text-[9px] text-zinc-400">
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Occupied</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-orange-300" />Reserved</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />Open</span>
      </div>
    </div>
  )
}

function AnalyticsMockup() {
  const bars = [55, 72, 48, 85, 62, 78, 96]
  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-[#fdf8f1] p-3.5 ring-1 ring-amber-100/60">
      <div className="mb-0.5 text-[10px] text-zinc-400">Today's Revenue</div>
      <div className="phk-serif text-2xl text-[#1a1410]">Rs 48,420</div>
      <div className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-emerald-600">
        <TrendingUp className="h-3 w-3" /> +12.4% vs yesterday
      </div>
      <div className="mt-3 flex h-10 items-end gap-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i===6?'#ea580c':'rgba(234,88,12,0.18)' }} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[9px] text-zinc-400">
        {['M','T','W','T','F','S','S'].map((d, i) => <span key={i}>{d}</span>)}
      </div>
    </div>
  )
}

function CheckoutMockup() {
  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-[#fdf8f1] p-3.5 ring-1 ring-amber-100/60">
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Order #B-491 · Table 7</div>
      <div className="phk-serif text-2xl text-[#1a1410]">Rs 4,820</div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {['Cash','Card','Online'].map((m) => (
          <div key={m} className={`rounded-lg py-1.5 text-center text-[10px] font-semibold ${m==='Card'?'bg-[#1a1410] text-white':'bg-zinc-100 text-zinc-500'}`}>{m}</div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-zinc-200 pt-2">
        <span className="text-[10px] text-zinc-400">Split · 3 guests</span>
        <span className="text-[10px] font-semibold text-emerald-700">Rs 1,607 each</span>
      </div>
    </div>
  )
}

function WaiterMockup() {
  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-[#fdf8f1] p-3.5 ring-1 ring-amber-100/60">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Table 5 · 3 guests</div>
        <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-100">Modifying</span>
      </div>
      <div className="space-y-1.5">
        {[{name:'Paneer Tikka',qty:1,note:'No onion'},{name:'Dal Makhani',qty:2,note:null},{name:'Jeera Rice',qty:2,note:null}].map((item) => (
          <div key={item.name} className="flex items-center justify-between text-[11px] text-zinc-700">
            <div>
              <span className="font-medium">{item.name}</span>
              {item.note && <span className="ml-1 text-zinc-400">· {item.note}</span>}
            </div>
            <span className="font-mono text-zinc-400">×{item.qty}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg py-1.5 text-center text-[11px] font-semibold text-white"
           style={{ background: 'linear-gradient(180deg, #f97316 0%, #ea580c 100%)' }}>
        Fire to Kitchen →
      </div>
    </div>
  )
}

function OnlineMockup() {
  const qrPattern = [1,1,1,0,1,1,0,1,1,0,1,0,1,0,0,1,0,0,1,1,1,0,1,0,1]
  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-[#fdf8f1] p-3.5 ring-1 ring-amber-100/60">
      <div className="flex items-start gap-3.5">
        <div className="flex-shrink-0 rounded-xl bg-white p-2 ring-1 ring-zinc-100">
          <div className="grid grid-cols-5 gap-px" style={{ width: 44 }}>
            {qrPattern.map((on, i) => (
              <div key={i} className="rounded-[1px]" style={{ height: 7, width: 7, background: on ? '#1a1410' : 'transparent' }} />
            ))}
          </div>
        </div>
        <div className="flex-1 pt-0.5">
          <div className="text-[11px] font-semibold text-[#1a1410]">Scan to order</div>
          <div className="mt-0.5 text-[10px] text-zinc-400">bhookly.menu/your-restaurant</div>
          <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />4 active orders
          </div>
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            {['Dine-in','Takeaway','Delivery','Pre-order'].map((t) => (
              <div key={t} className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] font-medium text-zinc-500">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function InventoryMockup() {
  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-[#fdf8f1] p-3.5 ring-1 ring-amber-100/60">
      <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Live Stock</div>
      <div className="space-y-2">
        {[{name:'Chicken',pct:72,s:'ok'},{name:'Paneer',pct:28,s:'low'},{name:'Rice (kg)',pct:88,s:'ok'},{name:'Cooking Oil',pct:14,s:'critical'}].map((item) => (
          <div key={item.name}>
            <div className="mb-0.5 flex items-center justify-between text-[10px]">
              <span className="text-zinc-600">{item.name}</span>
              <span className={item.s==='critical'?'font-semibold text-[#e11d48]':item.s==='low'?'font-medium text-amber-600':'text-zinc-400'}>
                {item.pct}%{item.s==='critical'?' · Reorder!':item.s==='low'?' · Low':''}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-zinc-200">
              <div className="h-full rounded-full" style={{ width:`${item.pct}%`, background:item.s==='critical'?'#e11d48':item.s==='low'?'#f59e0b':'#ea580c' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function KDSMockup() {
  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-[#fdf8f1] p-3.5 ring-1 ring-amber-100/60">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Kitchen Display</span>
        <div className="flex items-center gap-px rounded-lg bg-zinc-100 p-0.5">
          {['KOT','KDS'].map((m, i) => (
            <span key={m} className={`rounded-md px-2 py-0.5 text-[9px] font-semibold ${i===1?'bg-amber-500 text-white':'text-zinc-400'}`}>{m}</span>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          {id:'#218',items:'Butter Chicken ×2, Naan ×3',time:'02:14',s:'cooking'},
          {id:'#219',items:'Dal Makhani ×1, Rice ×2',time:'00:48',s:'new'},
          {id:'#220',items:'Paneer Tikka ×2',time:'05:30',s:'ready'},
        ].map((t) => (
          <div key={t.id} className={`rounded-lg px-2.5 py-2 ${t.s==='ready'?'bg-emerald-50 ring-1 ring-emerald-200':t.s==='cooking'?'bg-amber-50 ring-1 ring-amber-200':'bg-white ring-1 ring-zinc-200'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-[#1a1410]">{t.id}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-zinc-400">{t.time}</span>
                <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold uppercase ${t.s==='ready'?'bg-emerald-500 text-white':t.s==='cooking'?'bg-amber-500 text-white':'bg-zinc-200 text-zinc-500'}`}>{t.s}</span>
              </div>
            </div>
            <div className="mt-0.5 truncate text-[10px] text-zinc-500">{t.items}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReceiptFeatureMockup() {
  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-[#fdf8f1] p-3.5 ring-1 ring-amber-100/60">
      <div className="flex items-start gap-3">
        <div className="w-[88px] flex-shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm ring-1 ring-zinc-100">
          <div className="h-1 w-full rounded-full" style={{ background: 'linear-gradient(90deg,#ea580c,#f97316)' }} />
          <div className="mt-1.5 text-center text-[7px] font-semibold text-[#1a1410]">The Grand Kitchen</div>
          <div className="my-1 border-t border-dashed border-zinc-100" />
          <div className="space-y-0.5">
            {['Butter Chicken','Garlic Naan','Mango Lassi'].map((n) => (
              <div key={n} className="flex justify-between text-[7px] text-zinc-500">
                <span className="truncate">{n}</span><span>Rs 650</span>
              </div>
            ))}
          </div>
          <div className="my-1 border-t border-dashed border-zinc-100" />
          <div className="flex justify-between text-[7px] font-semibold text-[#1a1410]">
            <span>TOTAL</span><span>Rs 1,950</span>
          </div>
          <div className="mt-1.5 rounded bg-amber-50 py-0.5 text-center text-[6px] font-medium text-amber-700">
            ✦ 10% off next visit
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 text-[10px] font-semibold text-[#1a1410]">Customise</div>
          <div className="space-y-1.5">
            {[{label:'Logo',on:true},{label:'Brand color',on:true},{label:'Promo code',on:true},{label:'Social handles',on:false}].map((opt) => (
              <div key={opt.label} className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">{opt.label}</span>
                <div className={`flex h-3 w-5 items-center rounded-full px-0.5 ${opt.on?'bg-emerald-400 justify-end':'bg-zinc-200 justify-start'}`}>
                  <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-1">
            {['Print','Email','WA'].map((m) => (
              <div key={m} className="flex-1 rounded-md bg-zinc-100 py-0.5 text-center text-[9px] font-medium text-zinc-500">{m}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature Card + Grid
// ─────────────────────────────────────────────────────────────────────────────
type FeatureDef = { icon: React.ElementType; title: string; body: string; mockup: React.ReactNode; id?: string }

function FeatureCard({ icon: Icon, title, body, mockup, id }: FeatureDef) {
  return (
    <div id={id} className="phk-feature-card group flex flex-col rounded-2xl p-6">
      {mockup}
      <div className="mt-auto">
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100 transition-colors group-hover:bg-orange-100 group-hover:text-orange-700">
          <Icon style={{ height: 18, width: 18 }} />
        </div>
        <h3 className="phk-serif text-[22px] leading-snug text-[#1a1410]">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{body}</p>
      </div>
    </div>
  )
}

function CardReveal({ children, delay }: { children: React.ReactNode; delay: number }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref}
         style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
         className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  )
}

const FEATURES_ROW_1: FeatureDef[] = [
  {
    icon: LayoutGrid,
    title: 'Build your floor, your way.',
    body: 'Drag-and-drop table management with zones, sections, and capacity tracking. Design your dining room exactly how it looks.',
    mockup: <TableMockup />,
    id: 'features',
  },
  {
    icon: BarChart3,
    title: 'Your numbers, always.',
    body: 'Live revenue, expense breakdowns, sales reports, peak-hour trends, and your top-selling dishes — all in one dashboard.',
    mockup: <AnalyticsMockup />,
  },
  {
    icon: CreditCard,
    title: 'Payments in one tap.',
    body: 'Split bills, multiple payment methods, and printed or digital receipts. Every checkout done in under 10 seconds.',
    mockup: <CheckoutMockup />,
  },
  {
    icon: UserCheck,
    title: 'Built for the floor.',
    body: 'Intuitive order-taking, course management, and real-time kitchen sync — the interface your waitstaff will actually love.',
    mockup: <WaiterMockup />,
    id: 'waiter',
  },
  {
    icon: Globe,
    title: 'Orders from anywhere.',
    body: 'QR menus, delivery integrations, and takeaway orders flow directly into your POS — no manual re-entry, ever.',
    mockup: <OnlineMockup />,
    id: 'online-ordering',
  },
  {
    icon: Package,
    title: 'Never run out again.',
    body: 'Live stock tracking with automatic deductions on every order. Low-stock and reorder alerts before you hit zero.',
    mockup: <InventoryMockup />,
  },
]

const FEATURES_ROW_2: FeatureDef[] = [
  {
    icon: Monitor,
    title: 'Kitchen Display System.',
    body: 'Works as a KOT printing system or a full KDS kitchen display. Tickets appear the instant an order is placed — colour-coded by status, timed to the second. No more lost tickets, no more shouting across the pass.',
    mockup: <KDSMockup />,
  },
  {
    icon: FileText,
    title: 'Your brand on every receipt.',
    body: 'Add your logo, brand colour, custom thank-you messages, promo codes, and social handles. Deliver by print, email, or WhatsApp. Every receipt is a brand touchpoint — make it yours.',
    mockup: <ReceiptFeatureMockup />,
    id: 'receipts',
  },
]

function FeaturesSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="relative overflow-hidden bg-white py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

        <div ref={ref}
             className={`mb-16 max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-700 ring-1 ring-amber-100">
            <Sparkles className="h-3 w-3" />Everything you need
          </div>
          <h2 className="phk-serif text-[44px] leading-[1.05] text-[#1a1410]">
            One platform.
            <br />
            <span className="italic text-orange-600">Built for every shift.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
            From the first table seated to last call — Bhookly runs your entire operation.
            No duct tape. No spreadsheets. No 11 separate apps.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES_ROW_1.map((feat, i) => (
            <CardReveal key={feat.title} delay={i * 70}>
              <FeatureCard {...feat} />
            </CardReveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {FEATURES_ROW_2.map((feat, i) => (
            <CardReveal key={feat.title} delay={i * 100}>
              <FeatureCard {...feat} />
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "We were managing everything on paper and WhatsApp. Bhookly changed that in a single day. Our kitchen team actually wants to use it — which has never happened with any software before.",
    name: 'Riya Desai',
    role: 'Owner',
    restaurant: 'Spice Route Bistro',
    city: 'Mumbai',
  },
  {
    quote: "The table layout builder alone saved us from so much confusion during peak hours. And the analytics finally gave us a real picture of what's actually selling versus what we think is selling.",
    name: 'Arjun Mehta',
    role: 'Co-founder',
    restaurant: 'The Breakfast Club',
    city: 'Pune',
  },
  {
    quote: "Setup took less than a morning. By dinner service we were fully live. I've onboarded three POS systems over the years — this is by far the fastest I've ever seen a team get comfortable.",
    name: 'Fatima Shaikh',
    role: 'Operations Manager',
    restaurant: 'Harbour House',
    city: 'Chennai',
  },
]

function TestimonialsSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="phk-dark-bg relative overflow-hidden py-28 text-white">
      <div className="phk-grain pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

        <div ref={ref}
             className={`mb-14 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-200 ring-1 ring-white/15">
            <Star className="h-3 w-3" />From our restaurants
          </div>
          <h2 className="phk-serif text-[44px] leading-[1.05]">
            Real shifts.
            <br />
            <span className="italic text-amber-200">Real kitchens.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <CardReveal key={t.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl bg-white/8 p-7 ring-1 ring-white/12 backdrop-blur-sm">
                <div className="mb-5 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="mb-3 h-5 w-5 flex-shrink-0 text-amber-400/60" />
                <p className="flex-1 text-[14px] leading-relaxed text-white/80">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-amber-500/20 text-[14px] font-semibold text-amber-300">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-white/50">{t.role} · {t.restaurant}, {t.city}</div>
                  </div>
                </div>
              </div>
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Does Bhookly work without internet?',
    a: "Core POS features — order-taking, checkout, and kitchen display — are designed to keep working even if your connection drops. Orders sync automatically the moment you're back online. You won't lose a ticket.",
  },
  {
    q: 'How many devices or terminals can I use?',
    a: "As many as you need. Bhookly is built for multi-device environments — a tablet for every waiter, a counter terminal, a kitchen display, and a manager's dashboard can all run simultaneously on the same restaurant account.",
  },
  {
    q: 'Does it integrate with Foodpanda or other delivery platforms?',
    a: "Delivery platform integrations are actively in development. In the meantime, online orders can be manually entered into the system in seconds. We'll notify early-access restaurants the moment integrations go live.",
  },
  {
    q: 'How long does it take to set up and go live?',
    a: "Most restaurants are fully live within a single morning. You add your menu, map your floor plan, create staff accounts, and you're done. No vendor visits, no installation fees, no multi-day onboarding process.",
  },
  {
    q: 'Is there a setup fee or a long-term contract?',
    a: 'No setup fee. No long-term contract. Early-access pricing is flat monthly, billed month-to-month. Cancel any time. We earn your business every month, not just on day one.',
  },
  {
    q: 'Can I use Bhookly across multiple branches?',
    a: "Yes. Each branch gets its own workspace — separate menus, floor plans, and staff. A unified manager dashboard gives you a consolidated view across all locations from a single login.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-[#1a1410]">{q}</span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform duration-300 ${open ? 'rotate-180 text-orange-500' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}>
        <p className="text-[14px] leading-relaxed text-zinc-500">{a}</p>
      </div>
    </div>
  )
}

function FAQSection() {
  const [ref, visible] = useReveal()
  return (
    <section id="faq" className="relative overflow-hidden bg-[#fdf8f1] py-28">
      <div className="phk-light-wash" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-start">

          <div ref={ref}
               className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-700 ring-1 ring-amber-100">
              <MessageSquare className="h-3 w-3" />Common questions
            </div>
            <h2 className="phk-serif text-[44px] leading-[1.05] text-[#1a1410]">
              Things people
              <br />
              <span className="italic text-orange-600">usually ask us.</span>
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-zinc-500">
              Still have questions? Reach out — we reply on the same day.
            </p>
            <a href="mailto:hello@bhookly.com"
               className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-orange-600 hover:text-orange-700">
              hello@bhookly.com <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-2xl bg-white p-2 ring-1 ring-[rgba(120,53,15,0.08)]"
               style={{ boxShadow: '0 4px 24px -8px rgba(234,88,12,0.08)' }}>
            <div className="px-4">
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sign-up / Contact
// ─────────────────────────────────────────────────────────────────────────────
function SignupSection() {
  const [ref, visible] = useReveal()
  const [form, setForm]             = useState({ name: '', restaurant: '', whatsapp: '', email: '', message: '' })
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1200)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-28">
      <div className="phk-light-wash" />
      <div ref={ref}
           className={`relative z-10 mx-auto max-w-7xl px-6 transition-all duration-700 lg:px-12 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid items-start gap-16 lg:grid-cols-2">

          <div className="pt-2">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-700 ring-1 ring-amber-100">
              <Sparkles className="h-3 w-3" />Early access
            </div>
            <h2 className="phk-serif text-[44px] leading-[1.05] text-[#1a1410]">
              Ready to transform
              <br />
              <span className="italic text-orange-600">your restaurant?</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-600">
              Fill in your details and we'll reach out to get you set up. No contracts,
              no commitments — just a conversation about what your restaurant needs.
            </p>
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Email us</div>
                  <a href="mailto:hello@bhookly.com" className="font-medium text-orange-600 hover:text-orange-700">hello@bhookly.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">WhatsApp / Call</div>
                  <a href="tel:+919800000000" className="font-medium text-orange-600 hover:text-orange-700">+91 98000 00000</a>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {['Table management','Live analytics','KDS / KOT','Custom receipts','Online ordering','Inventory'].map((tag) => (
                <span key={tag} className="rounded-full bg-[#fdf8f1] px-3 py-1 text-[11px] font-medium text-zinc-600 ring-1 ring-zinc-200">{tag}</span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[#fdf8f1] p-8 ring-1 ring-[rgba(120,53,15,0.10)]"
               style={{ boxShadow: '0 24px 64px -16px rgba(234,88,12,0.10), 0 4px 24px -4px rgba(0,0,0,0.05)' }}>
            <div className="phk-light-wash rounded-3xl" />

            {submitted ? (
              <div className="relative z-10 flex min-h-[440px] flex-col items-center justify-center text-center">
                <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-200">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="phk-serif text-[32px] text-[#1a1410]">You're on the list.</h3>
                <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-zinc-500">
                  We'll reach out to <strong className="font-semibold text-[#1a1410]">{form.email}</strong> within 24 hours to get your restaurant set up on Bhookly.
                </p>
                <div className="mt-6 flex items-center gap-2 text-[12px] text-zinc-400">
                  <ShieldCheck className="h-3.5 w-3.5" />We never share your details.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div className="mb-6">
                  <h3 className="phk-serif text-[28px] leading-tight text-[#1a1410]">Get early access.</h3>
                  <p className="mt-1 text-[13px] text-zinc-500">We'll reach out within 24 hours.</p>
                </div>

                <FormField label="Your Name" required>
                  <div className="phk-input flex h-12 items-center rounded-xl px-3.5">
                    <User className="mr-2.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                    <input type="text" required value={form.name} onChange={set('name')} placeholder="e.g. Rahul Sharma"
                           className="h-full w-full border-0 bg-transparent px-0 text-[15px] text-[#1a1410] placeholder:text-zinc-300 outline-none" />
                  </div>
                </FormField>

                <FormField label="Restaurant Name" required>
                  <div className="phk-input flex h-12 items-center rounded-xl px-3.5">
                    <Building2 className="mr-2.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                    <input type="text" required value={form.restaurant} onChange={set('restaurant')} placeholder="e.g. The Grand Kitchen"
                           className="h-full w-full border-0 bg-transparent px-0 text-[15px] text-[#1a1410] placeholder:text-zinc-300 outline-none" />
                  </div>
                </FormField>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="WhatsApp" required>
                    <div className="phk-input flex h-12 items-center rounded-xl px-3.5">
                      <Phone className="mr-2.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                      <input type="tel" required value={form.whatsapp} onChange={set('whatsapp')} placeholder="+91 9800…"
                             className="h-full w-full border-0 bg-transparent px-0 text-[15px] text-[#1a1410] placeholder:text-zinc-300 outline-none" />
                    </div>
                  </FormField>

                  <FormField label="Email" required>
                    <div className="phk-input flex h-12 items-center rounded-xl px-3.5">
                      <Mail className="mr-2.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                      <input type="email" required value={form.email} onChange={set('email')} placeholder="you@restaurant.com"
                             className="h-full w-full border-0 bg-transparent px-0 text-[15px] text-[#1a1410] placeholder:text-zinc-300 outline-none" />
                    </div>
                  </FormField>
                </div>

                <FormField label="Message (optional)">
                  <div className="phk-input flex items-start rounded-xl px-3.5 py-3">
                    <MessageSquare className="mr-2.5 mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400" />
                    <textarea rows={3} value={form.message} onChange={set('message')}
                              placeholder="Tell us about your restaurant — size, cuisine, challenges…"
                              className="w-full resize-none border-0 bg-transparent px-0 text-[15px] text-[#1a1410] placeholder:text-zinc-300 outline-none" />
                  </div>
                </FormField>

                <button type="submit" disabled={submitting}
                        className="phk-cta group flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white disabled:cursor-wait disabled:opacity-70">
                  {submitting
                    ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</>
                    : <>Request Early Access <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
                </button>

                <p className="text-center text-[11px] text-zinc-400">No credit card. No commitment. We'll reach out to you.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{label}</span>
        {required && <span className="text-[10px] text-orange-500">*</span>}
      </div>
      {children}
    </label>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function LandingFooter() {
  return (
    <footer className="phk-dark-bg relative overflow-hidden py-12 text-white">
      <div className="phk-grain pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Wordmark tone="light" />
          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/50">
            <a href="#features"     className="hover:text-white/80 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white/80 transition-colors">How it works</a>
            <a href="#faq"          className="hover:text-white/80 transition-colors">FAQ</a>
            <a href="#contact"      className="hover:text-white/80 transition-colors">Contact</a>
          </div>
          <div className="phk-credit relative inline-flex items-center gap-1 text-[12px] text-white/45 whitespace-nowrap">
            <span aria-hidden className="pointer-events-none absolute -top-5 right-0 flex select-none gap-1.5">
              {['🎨','✨','🍴','💫'].map((e, i) => (
                <span key={e} className="phk-credit-emoji" style={{ animationDelay: `${i * 70}ms` }}>{e}</span>
              ))}
            </span>
            <span>Built with <span aria-label="love">🤍</span> by{' '}
              <a href="https://artyreal.com" target="_blank" rel="noopener noreferrer"
                 className="font-medium text-amber-300/80 underline-offset-2 hover:text-amber-200 hover:underline">
                Artyreal
              </a>
            </span>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-3 text-[11px] text-white/20">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)' }} />
          <span>© {new Date().getFullYear()} Bhookly. All rights reserved.</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)' }} />
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <div className="bhookly-landing min-h-screen bg-[#fdf8f1]">
      <LandingNav />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <SignupSection />
      <LandingFooter />
    </div>
  )
}

export default LandingPage
