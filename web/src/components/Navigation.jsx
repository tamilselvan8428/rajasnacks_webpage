import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

/* ─── Style Injection ─── */
const injectStyles = () => {
  if (document.getElementById('rs-nav-styles')) return;
  const style = document.createElement('style');
  style.id = 'rs-nav-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

    @keyframes navSlideDown { from{opacity:0;transform:translateY(-100%)} to{opacity:1;transform:translateY(0)} }
    @keyframes mobileSlideIn { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
    @keyframes mobileSlideOut{ from{opacity:0;transform:translateX(-100%)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeInDown    { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer       { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    @keyframes pulse         { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }

    .rs-nav {
      position:fixed; top:0; left:0; right:0; z-index:1000;
      transition:background 0.35s, box-shadow 0.35s, padding 0.3s;
      font-family:'DM Sans',sans-serif;
    }
    .rs-nav.transparent {
      background:transparent;
      box-shadow:none;
    }
    .rs-nav.solid {
      background:rgba(255,255,255,0.97);
      backdrop-filter:blur(16px);
      box-shadow:0 2px 24px rgba(232,98,26,0.1);
      border-bottom:1px solid rgba(232,98,26,0.08);
      border-top:3px solid #E8621A;
    }

    .rs-nav-inner {
      max-width:1200px; margin:0 auto;
      padding:0 24px;
      display:flex; align-items:center; justify-content:space-between;
      height:68px; transition:height 0.3s;
    }
    .rs-nav.solid .rs-nav-inner { height:60px; }

    /* Logo */
    .rs-logo {
      display:flex; align-items:center; gap:10px;
      text-decoration:none; transition:transform 0.2s;
    }
    .rs-logo:hover { transform:scale(1.03); }
    .rs-logo-icon {
      width:40px; height:40px; border-radius:12px;
      background:linear-gradient(135deg,#F97C35,#C14E0E);
      display:flex; align-items:center; justify-content:center;
      font-size:20px; box-shadow:0 3px 12px rgba(232,98,26,0.35);
      flex-shrink:0; transition:box-shadow 0.2s;
    }
    .rs-logo:hover .rs-logo-icon { box-shadow:0 5px 20px rgba(232,98,26,0.5); }
    .rs-logo-text {
      font-family:'Playfair Display',serif;
      font-size:20px; font-weight:800; line-height:1.1;
      transition:color 0.3s;
    }
    .rs-logo-sub {
      font-family:'DM Sans',sans-serif;
      font-size:10px; font-weight:500; letter-spacing:0.1em;
      text-transform:uppercase; opacity:0.7; display:block;
      transition:color 0.3s;
    }
    .rs-nav.transparent .rs-logo-text { color:#fff; }
    .rs-nav.transparent .rs-logo-sub  { color:rgba(255,255,255,0.75); }
    .rs-nav.solid .rs-logo-text { color:#1A0A00; }
    .rs-nav.solid .rs-logo-sub  { color:#9A8070; }

    /* Desktop links */
    .rs-nav-links {
      display:flex; align-items:center; gap:4px;
    }
    .rs-nav-link {
      position:relative; text-decoration:none;
      padding:8px 16px; border-radius:50px; font-size:14px; font-weight:500;
      transition:color 0.2s, background 0.2s; display:flex; align-items:center; gap:6px;
    }
    .rs-nav.transparent .rs-nav-link { color:rgba(255,255,255,0.88); }
    .rs-nav.transparent .rs-nav-link:hover { color:#fff; background:rgba(255,255,255,0.15); }
    .rs-nav.transparent .rs-nav-link.active { color:#fff; background:rgba(255,255,255,0.2); font-weight:600; }
    .rs-nav.solid .rs-nav-link { color:#4A3728; }
    .rs-nav.solid .rs-nav-link:hover { color:#E8621A; background:#FFF0E6; }
    .rs-nav.solid .rs-nav-link.active { color:#E8621A; background:#FFF0E6; font-weight:600; }

    /* Active indicator dot */
    .rs-nav-link.active::after {
      content:''; position:absolute; bottom:4px; left:50%; transform:translateX(-50%);
      width:4px; height:4px; border-radius:50%; background:currentColor;
    }

    /* CTA button */
    .rs-nav-cta {
      background:linear-gradient(135deg,#F97C35,#C14E0E);
      color:#fff !important; border-radius:50px;
      padding:9px 22px; font-weight:600; font-size:14px;
      box-shadow:0 3px 14px rgba(232,98,26,0.35);
      transition:transform 0.18s, box-shadow 0.18s, background 0.2s !important;
      text-decoration:none; display:inline-flex; align-items:center; gap:6px;
      font-family:'DM Sans',sans-serif;
    }
    .rs-nav-cta:hover { transform:translateY(-1px) !important; box-shadow:0 6px 20px rgba(232,98,26,0.45) !important; background:none !important; }
    .rs-nav.transparent .rs-nav-cta { background:rgba(255,255,255,0.2); box-shadow:none; border:1px solid rgba(255,255,255,0.35); }
    .rs-nav.transparent .rs-nav-cta:hover { background:rgba(255,255,255,0.3) !important; }

    /* Hamburger button */
    .rs-hamburger {
      width:42px; height:42px; border-radius:12px; border:none; cursor:pointer;
      display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px;
      transition:background 0.2s; flex-shrink:0; padding:0; background:transparent;
    }
    .rs-nav.transparent .rs-hamburger:hover { background:rgba(255,255,255,0.15); }
    .rs-nav.solid .rs-hamburger:hover { background:#FFF0E6; }
    .rs-hamburger-bar {
      width:22px; height:2px; border-radius:2px;
      transition:transform 0.3s, opacity 0.3s, width 0.3s;
    }
    .rs-nav.transparent .rs-hamburger-bar { background:#fff; }
    .rs-nav.solid .rs-hamburger-bar { background:#1A0A00; }
    .rs-hamburger.open .rs-hamburger-bar:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
    .rs-hamburger.open .rs-hamburger-bar:nth-child(2) { opacity:0; width:0; }
    .rs-hamburger.open .rs-hamburger-bar:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }

    /* Mobile drawer */
    .rs-mobile-backdrop {
      position:fixed; inset:0; background:rgba(26,10,0,0.5);
      backdrop-filter:blur(4px); z-index:998;
      animation:fadeInDown 0.2s ease;
    }
    .rs-mobile-drawer {
      position:fixed; top:0; right:0; bottom:0; width:300px; max-width:85vw;
      background:#fff; z-index:999; display:flex; flex-direction:column;
      box-shadow:-8px 0 40px rgba(0,0,0,0.18);
      animation:mobileSlideIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    .rs-drawer-header {
      padding:24px; display:flex; align-items:center; justify-content:space-between;
      border-bottom:1px solid #F0E4D8;
    }
    .rs-drawer-close {
      width:36px; height:36px; border-radius:10px; background:#FFF0E6;
      border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
      font-size:18px; color:#E8621A; transition:background 0.2s;
    }
    .rs-drawer-close:hover { background:#FFE0CC; }
    .rs-drawer-link {
      display:flex; align-items:center; gap:14px; padding:14px 24px;
      text-decoration:none; color:#1A0A00; font-size:16px; font-weight:500;
      transition:background 0.18s, color 0.18s; border-radius:0;
      font-family:'DM Sans',sans-serif;
    }
    .rs-drawer-link:hover { background:#FFF8F2; color:#E8621A; }
    .rs-drawer-link.active { background:#FFF0E6; color:#E8621A; font-weight:700; }
    .rs-drawer-link-icon {
      width:38px; height:38px; border-radius:10px;
      display:flex; align-items:center; justify-content:center; font-size:18px;
      background:#FFF0E6; flex-shrink:0; transition:background 0.18s;
    }
    .rs-drawer-link:hover .rs-drawer-link-icon,
    .rs-drawer-link.active .rs-drawer-link-icon { background:#FFE0CC; }

    /* Announcement bar */
    .rs-announcement {
      background:linear-gradient(90deg,#C14E0E,#E8621A,#F97C35,#E8621A,#C14E0E);
      background-size:300% 100%;
      animation:shimmer 4s linear infinite;
      color:#fff; text-align:center; font-size:13px; font-weight:500;
      padding:7px 16px; font-family:'DM Sans',sans-serif;
      display:flex; align-items:center; justify-content:center; gap:8px;
    }
    .rs-announcement-close {
      position:absolute; right:16px; background:none; border:none;
      color:rgba(255,255,255,0.7); cursor:pointer; font-size:16px;
      transition:color 0.2s; line-height:1;
    }
    .rs-announcement-close:hover { color:#fff; }

    /* Spacer pushed down by fixed nav */
    .rs-nav-spacer { height:68px; transition:height 0.3s; }

    @media(max-width:768px) {
      .rs-nav-links, .rs-nav-cta { display:none !important; }
      .rs-hamburger { display:flex !important; }
    }
    @media(min-width:769px) {
      .rs-hamburger { display:none; }
    }
  `;
  document.head.appendChild(style);
};

const NAV_LINKS = [
  { to:'/',         label:'Home',     icon:'🏠' },
  { to:'/products', label:'Products', icon:'🍿' },
  { to:'/contact',  label:'Contact',  icon:'✉️' },
];

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { injectStyles(); }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  // Always solid — reliable visibility on all pages
  const navStyle = 'solid';

  return (
    <>
      {/* ── Main Nav ── */}
      <nav className={`rs-nav ${navStyle}`} style={{ animation:'navSlideDown 0.4s ease' }}>
        <div className="rs-nav-inner">

          {/* Logo */}
          <Link to="/" className="rs-logo">
            <div className="rs-logo-icon">🥜</div>
            <div>
              <span className="rs-logo-text">Raja Snacks</span>
              <span className="rs-logo-sub">Wholesale Snacks</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="rs-nav-links">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to} className={`rs-nav-link ${isActive(l.to) ? 'active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <Link to="/contact" className="rs-nav-cta" style={{ textDecoration:'none' }}>
              Contact Us →
            </Link>

            {/* Hamburger */}
            <button
              className={`rs-hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className="rs-hamburger-bar" />
              <span className="rs-hamburger-bar" />
              <span className="rs-hamburger-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <>
          <div className="rs-mobile-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="rs-mobile-drawer">
            {/* Drawer header */}
            <div className="rs-drawer-header">
              <Link to="/" className="rs-logo" onClick={() => setMobileOpen(false)}>
                <div className="rs-logo-icon">🥜</div>
                <div>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:800, color:'#1A0A00' }}>Raja Snacks</span>
                  <span style={{ fontSize:10, fontWeight:500, color:'#9A8070', letterSpacing:'0.1em', textTransform:'uppercase', display:'block' }}>Wholesale Snacks</span>
                </div>
              </Link>
              <button className="rs-drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            {/* Nav links */}
            <div style={{ flex:1, paddingTop:12, paddingBottom:16 }}>
              {NAV_LINKS.map((l, i) => (
                <Link
                  key={l.to} to={l.to}
                  className={`rs-drawer-link ${isActive(l.to) ? 'active' : ''}`}
                  style={{ animationDelay:`${i * 60}ms`, animation:'fadeInDown 0.3s ease both' }}
                >
                  <span className="rs-drawer-link-icon">{l.icon}</span>
                  <span>{l.label}</span>
                  {isActive(l.to) && <span style={{ marginLeft:'auto', fontSize:12, color:'#E8621A', fontWeight:700 }}>●</span>}
                </Link>
              ))}
            </div>

            {/* Drawer footer */}
            <div style={{ padding:'16px 20px 28px', borderTop:'1px solid #F0E4D8' }}>
              <Link to="/contact" onClick={() => setMobileOpen(false)} style={{
                display:'block', textAlign:'center',
                background:'linear-gradient(135deg,#F97C35,#C14E0E)',
                color:'#fff', borderRadius:14, padding:'13px',
                fontWeight:700, fontSize:15, textDecoration:'none',
                boxShadow:'0 4px 18px rgba(232,98,26,0.35)',
                fontFamily:"'DM Sans',sans-serif",
              }}>
                Contact Us →
              </Link>
              <div style={{ display:'flex', justifyContent:'center', gap:16, marginTop:16 }}>
                {[
                  { icon:'📞', href:'tel:+919876543210', label:'Call' },
                  { icon:'💬', href:'https://wa.me/919876543210', label:'WhatsApp' },
                  { icon:'✉️', href:'mailto:info@rajasnacks.com', label:'Email' },
                ].map(c => (
                  <a key={c.label} href={c.href} style={{
                    display:'flex', flexDirection:'column', alignItems:'center', gap:4,
                    color:'#7A6358', textDecoration:'none', fontSize:11, fontWeight:500,
                  }}>
                    <span style={{ fontSize:22, background:'#FFF0E6', width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center' }}>{c.icon}</span>
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Spacer so page content isn't hidden under fixed nav ── */}
      <div className="rs-nav-spacer" style={{ height:'68px' }} />
    </>
  );
};

export default Navigation;