import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const injectStyles = () => {
  if (document.getElementById('rs-footer-styles')) return;
  const style = document.createElement('style');
  style.id = 'rs-footer-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    @keyframes rsf-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes rsf-floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
    @keyframes rsf-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    @keyframes rsf-pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.97)} }

    .rsf-body { font-family:'DM Sans',sans-serif; }
    .rsf-title { font-family:'Playfair Display',serif; }

    /* ── Newsletter input ── */
    .rsf-nl-input {
      flex:1; background:rgba(255,255,255,0.08); border:1.5px solid rgba(255,255,255,0.15);
      border-radius:50px 0 0 50px; padding:12px 20px; color:#fff; font-size:14px;
      outline:none; font-family:'DM Sans',sans-serif; transition:border-color 0.2s,background 0.2s;
      min-width:0;
    }
    .rsf-nl-input::placeholder { color:rgba(255,255,255,0.4); }
    .rsf-nl-input:focus { border-color:rgba(232,98,26,0.7); background:rgba(255,255,255,0.12); }
    .rsf-nl-btn {
      background:linear-gradient(135deg,#F97C35,#C14E0E);
      color:#fff; border:none; border-radius:0 50px 50px 0;
      padding:12px 24px; font-size:14px; font-weight:700; cursor:pointer;
      font-family:'DM Sans',sans-serif; transition:opacity 0.18s,transform 0.18s;
      white-space:nowrap; box-shadow:0 3px 14px rgba(232,98,26,0.4);
    }
    .rsf-nl-btn:hover { opacity:0.9; transform:translateX(1px); }
    .rsf-nl-btn:disabled { opacity:0.6; cursor:not-allowed; transform:none; }

    /* ── Links ── */
    .rsf-link {
      color:rgba(255,255,255,0.55); text-decoration:none; font-size:14px;
      transition:color 0.18s,padding-left 0.18s; display:flex; align-items:center; gap:8px;
    }
    .rsf-link:hover { color:#F97C35; padding-left:4px; }

    /* ── Social ── */
    .rsf-social {
      width:38px; height:38px; border-radius:10px;
      background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12);
      display:flex; align-items:center; justify-content:center; font-size:17px;
      cursor:pointer; transition:background 0.18s,transform 0.18s; text-decoration:none;
      color:#fff;
    }
    .rsf-social:hover { background:rgba(232,98,26,0.35); transform:translateY(-2px); }

    /* ── Back to top ── */
    .rsf-top-btn {
      width:42px; height:42px; border-radius:12px; border:none; cursor:pointer;
      background:rgba(255,255,255,0.1); color:#fff; font-size:18px;
      display:flex; align-items:center; justify-content:center;
      transition:background 0.18s,transform 0.2s;
    }
    .rsf-top-btn:hover { background:rgba(232,98,26,0.4); transform:translateY(-3px); }

    /* ── Bottom bar ── */
    .rsf-bottom-bar {
      border-top:1px solid rgba(255,255,255,0.07);
      padding:20px 32px; display:flex; align-items:center;
      justify-content:space-between; flex-wrap:wrap; gap:12px;
    }

    /* ── Divider dot ── */
    .rsf-dot { color:rgba(255,255,255,0.2); margin:0 6px; }

    /* ── Badge ── */
    .rsf-badge {
      display:inline-flex; align-items:center; gap:5px;
      background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12);
      border-radius:50px; padding:4px 12px; font-size:12px;
      color:rgba(255,255,255,0.7); font-weight:500;
    }

    .rsf-col-title {
      font-size:11px; font-weight:700; letter-spacing:0.1em;
      text-transform:uppercase; color:rgba(255,255,255,0.4);
      margin-bottom:16px; display:flex; align-items:center; gap:8px;
    }
    .rsf-col-title::after {
      content:''; flex:1; height:1px; background:rgba(255,255,255,0.07);
    }

    @media(max-width:768px) {
      .rsf-grid { grid-template-columns:1fr 1fr !important; }
      .rsf-logo-col { grid-column:span 2; }
      .rsf-bottom-bar { justify-content:center; text-align:center; }
    }
    @media(max-width:480px) {
      .rsf-grid { grid-template-columns:1fr !important; }
      .rsf-logo-col { grid-column:span 1; }
    }
  `;
  document.head.appendChild(style);
};

const Footer = () => {
  const [email, setEmail]     = useState('');
  const [nlState, setNlState] = useState('idle'); // idle | sending | done

  useEffect(() => { injectStyles(); }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setNlState('sending');
    setTimeout(() => { setNlState('done'); setEmail(''); setTimeout(() => setNlState('idle'), 4000); }, 1200);
  };

  const year = new Date().getFullYear();

  const quickLinks = [
    { to:'/',         label:'Home'     },
    { to:'/products', label:'Products' },
    { to:'/contact',  label:'Contact'  },
  ];

  const categories = ['Masala Peanuts','Bhujia Sev','Kaju Mixture','Chivda','Moong Dal','Namkeen'];

  return (
    <footer className="rsf-body" style={{ background:'linear-gradient(175deg,#1A0A00 0%,#2D1200 60%,#1A0A00 100%)', position:'relative', overflow:'hidden' }}>

      {/* Decorative blobs */}
      {[
        { w:300, h:300, t:'-10%', r:'-5%', op:0.04, dur:'9s' },
        { w:180, h:180, b:'5%',   l:'-3%', op:0.03, dur:'7s' },
        { w:120, h:120, t:'40%',  l:'30%', op:0.025, dur:'6s' },
      ].map((d, i) => (
        <div key={i} style={{
          position:'absolute', width:d.w, height:d.h, borderRadius:'50%',
          background:`rgba(232,98,26,${d.op})`,
          top:d.t, right:d.r, bottom:d.b, left:d.l,
          animation:`rsf-floatY ${d.dur} ease-in-out infinite`,
          animationDelay:`${i*0.8}s`, pointerEvents:'none',
        }} />
      ))}

      {/* ── Newsletter strip ── */}


      {/* ── Main footer grid ── */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'56px 32px 40px' }}>
        <div className="rsf-grid" style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr', gap:40 }}>

          {/* Brand col */}
          <div className="rsf-logo-col">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{
                width:46, height:46, borderRadius:14,
                background:'linear-gradient(135deg,#F97C35,#C14E0E)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:22, boxShadow:'0 4px 16px rgba(232,98,26,0.4)',
              }}>🥜</div>
              <div>
                <div className="rsf-title" style={{ fontSize:20, fontWeight:800, color:'#fff' }}>Raja Snacks</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:500 }}>Wholesale Supplier</div>
              </div>
            </div>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.8, marginBottom:20, maxWidth:260 }}>
              Raja Snacks Wholesale supplier since 2023 — fresh flavours and fair prices.
            </p>

            {/* Trust badges */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
              {[
                { icon:'✓', label:'FSSAI Certified' },
                { icon:'⭐', label:'4.9 Rated' },
              ].map(b => (
                <span key={b.label} className="rsf-badge">
                  <span style={{ color:'#F5A623' }}>{b.icon}</span> {b.label}
                </span>
              ))}
            </div>

            {/* Social icons */}
            <div style={{ display:'flex', gap:8 }}>
              {[
                { icon:'📘', href:'#', label:'Facebook'  },
                { icon:'📸', href:'#', label:'Instagram' },
                { icon:'🐦', href:'#', label:'Twitter'   },
                { icon:'▶️', href:'#', label:'YouTube'   },
                { icon:'💬', href:'https://wa.me/919842263860', label:'WhatsApp' },
              ].map(s => (
                <a key={s.label} href={s.href} className="rsf-social" title={s.label} target="_blank" rel="noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="rsf-col-title">Quick Links</p>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
              {quickLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="rsf-link">
                    <span style={{ color:'#E8621A', fontSize:10 }}>▸</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="rsf-col-title">Contact Us</p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { icon:'📍', lines:['KSC School Road, Kuppusamypuram, Renganatha Puram, Tiruppur, Tamil Nadu 641604'] },
                { icon:'📞', lines:['+91 9842263860', '+91 8428863860'] },
                { icon:'✉️', lines:['manihari364@gmail.com', 'tamilselvan24650@gmail.com'] },
                { icon:'🕐', lines:['Mon–Sun: 7AM – 9PM'] },
              ].map(row => (
                <div key={row.icon} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ fontSize:15, marginTop:1, flexShrink:0 }}>{row.icon}</span>
                  <div>
                    {row.lines.map((l, i) => (
                      <div key={i} style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.7 }}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/contact" style={{
              display:'inline-flex', alignItems:'center', gap:6, marginTop:20,
              background:'linear-gradient(135deg,#F97C35,#C14E0E)',
              color:'#fff', borderRadius:50, padding:'10px 20px', fontSize:13,
              fontWeight:700, textDecoration:'none',
              boxShadow:'0 3px 14px rgba(232,98,26,0.35)',
              transition:'transform 0.18s,box-shadow 0.18s',
            }}
            onMouseOver={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(232,98,26,0.45)'; }}
            onMouseOut={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 3px 14px rgba(232,98,26,0.35)'; }}>
              Contact Us →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="rsf-bottom-bar">
        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:13, margin:0 }}>
          © {year} Raja Snacks. All rights reserved.
          <span className="rsf-dot">•</span>
          <a href="#" style={{ color:'rgba(255,255,255,0.3)', textDecoration:'none', transition:'color 0.18s' }}
            onMouseOver={e=>e.target.style.color='#F97C35'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.3)'}>
            Privacy Policy
          </a>
          <span className="rsf-dot">•</span>
          <a href="#" style={{ color:'rgba(255,255,255,0.3)', textDecoration:'none', transition:'color 0.18s' }}
            onMouseOver={e=>e.target.style.color='#F97C35'} onMouseOut={e=>e.target.style.color='rgba(255,255,255,0.3)'}>
            Terms of Use
          </a>
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button className="rsf-top-btn" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} title="Back to top">
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;