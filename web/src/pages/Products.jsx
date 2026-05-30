import { useEffect, useState, useRef } from 'react';

/* ─── Style Injection ─── */
const injectStyles = () => {
  if (document.getElementById('rs-products-styles')) return;
  const style = document.createElement('style');
  style.id = 'rs-products-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --saffron: #E8621A; --saffron-light: #F97C35; --saffron-dark: #C14E0E;
      --gold: #F5A623; --cream: #FFF8F0; --deep: #1A0A00;
    }
    *, *::before, *::after { box-sizing: border-box; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer  { 0%{background-position:-500px 0} 100%{background-position:500px 0} }
    @keyframes popIn    { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes slideDown{ from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes badgePop { 0%{transform:scale(1)} 40%{transform:scale(1.3)} 100%{transform:scale(1)} }

    .rsp-body { font-family:'DM Sans',sans-serif; }
    .rsp-title { font-family:'Playfair Display',serif; }

    /* ── Loader ── */
    .rsp-spinner {
      width:52px; height:52px; border-radius:50%;
      border:3px solid rgba(232,98,26,0.15);
      border-top-color:var(--saffron);
      animation:spin 0.8s linear infinite;
    }

    /* ── Skeleton ── */
    .rsp-skeleton {
      background:linear-gradient(90deg,#f0e8e0 25%,#faf4ef 50%,#f0e8e0 75%);
      background-size:500px 100%;
      animation:shimmer 1.4s infinite;
      border-radius:10px;
    }

    /* ── Filter bar ── */
    .rsp-filter-btn {
      border:1.5px solid #E8D8CC; border-radius:50px;
      padding:8px 20px; font-size:13px; font-weight:500; color:#7A6358;
      background:#fff; cursor:pointer; transition:all 0.2s;
      font-family:'DM Sans',sans-serif; display:inline-flex; align-items:center; gap:6px;
      white-space:nowrap;
    }
    .rsp-filter-btn:hover { border-color:var(--saffron); color:var(--saffron); }
    .rsp-filter-btn.active { background:var(--saffron); border-color:var(--saffron); color:#fff; font-weight:600; }

    /* ── Sort select ── */
    .rsp-select {
      border:1.5px solid #E8D8CC; border-radius:10px;
      padding:8px 36px 8px 14px; font-size:13px; color:#4A3728;
      background:#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23E8621A' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E") no-repeat right 12px center;
      -webkit-appearance:none; cursor:pointer; outline:none;
      font-family:'DM Sans',sans-serif; font-weight:500;
      transition:border-color 0.2s;
    }
    .rsp-select:focus { border-color:var(--saffron); }

    /* ── Search ── */
    .rsp-search-wrap { position:relative; }
    .rsp-search {
      border:1.5px solid #E8D8CC; border-radius:50px;
      padding:10px 16px 10px 42px; font-size:14px; color:#1A0A00;
      background:#fff; outline:none; width:260px;
      font-family:'DM Sans',sans-serif; transition:border-color 0.2s, box-shadow 0.2s;
    }
    .rsp-search:focus { border-color:var(--saffron); box-shadow:0 0 0 3px rgba(232,98,26,0.1); }
    .rsp-search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); font-size:16px; pointer-events:none; }

    /* ── Grid view card ── */
    .rsp-card {
      background:#fff; border-radius:20px; overflow:hidden;
      border:1.5px solid #F0E4D8;
      transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
      position:relative; display:flex; flex-direction:column;
      animation:popIn 0.4s ease both;
    }
    .rsp-card:hover { transform:translateY(-8px) scale(1.015); box-shadow:0 20px 50px rgba(232,98,26,0.16); }
    .rsp-card:hover .rsp-card-img { transform:scale(1.07); }
    .rsp-card:hover .rsp-enquire-btn { opacity:1; transform:translateY(0); }

    .rsp-card-img-wrap { overflow:hidden; position:relative; height:210px; background:linear-gradient(135deg,#FFE0C0,#FFD0A0); }
    .rsp-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.5s ease; }
    .rsp-card-emoji { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:60px; }

    .rsp-card-overlay {
      position:absolute; inset:0;
      background:linear-gradient(to top, rgba(26,10,0,0.55) 0%, transparent 55%);
      opacity:0; transition:opacity 0.3s;
    }
    .rsp-card:hover .rsp-card-overlay { opacity:1; }

    .rsp-enquire-btn {
      position:absolute; bottom:14px; left:50%; transform:translate(-50%,6px);
      opacity:0; transition:opacity 0.25s, transform 0.25s;
      background:#fff; color:var(--saffron); border:none;
      border-radius:50px; padding:9px 24px; font-size:13px; font-weight:700;
      cursor:pointer; white-space:nowrap; font-family:'DM Sans',sans-serif;
      box-shadow:0 4px 16px rgba(0,0,0,0.18);
    }
    .rsp-enquire-btn:hover { background:var(--saffron); color:#fff; }

    .rsp-tag {
      position:absolute; top:12px; left:12px;
      border-radius:50px; padding:3px 12px; font-size:11px; font-weight:700;
      letter-spacing:0.05em; text-transform:uppercase;
    }
    .rsp-wish-btn {
      position:absolute; top:10px; right:10px;
      width:34px; height:34px; border-radius:50%;
      background:rgba(255,255,255,0.9); border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center; font-size:16px;
      backdrop-filter:blur(4px); transition:transform 0.2s, background 0.2s;
      box-shadow:0 2px 8px rgba(0,0,0,0.1);
    }
    .rsp-wish-btn:hover { transform:scale(1.15); }
    .rsp-wish-btn.wished { background:#FFF0E6; animation:badgePop 0.35s ease; }

    /* ── List view row ── */
    .rsp-list-row {
      background:#fff; border-radius:16px; overflow:hidden;
      border:1.5px solid #F0E4D8; display:grid;
      grid-template-columns:140px 1fr auto;
      align-items:center; gap:0;
      transition:transform 0.2s, box-shadow 0.25s;
      animation:fadeUp 0.4s ease both;
    }
    .rsp-list-row:hover { transform:translateX(4px); box-shadow:0 8px 28px rgba(232,98,26,0.12); }
    .rsp-list-row:hover .rsp-list-img { transform:scale(1.06); }
    .rsp-list-img-wrap { height:120px; overflow:hidden; background:linear-gradient(135deg,#FFE0C0,#FFD0A0); flex-shrink:0; }
    .rsp-list-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.4s ease; }
    .rsp-list-emoji { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:40px; }

    /* ── View toggle ── */
    .rsp-view-btn {
      width:36px; height:36px; border-radius:8px; border:1.5px solid #E8D8CC;
      background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center;
      font-size:16px; transition:all 0.18s;
    }
    .rsp-view-btn.active { background:var(--saffron); border-color:var(--saffron); }

    /* ── Add to cart / enquire ── */
    .rsp-cta-btn {
      background:linear-gradient(135deg,var(--saffron-light),var(--saffron-dark));
      color:#fff; border:none; border-radius:10px; padding:10px 20px;
      font-size:13px; font-weight:700; cursor:pointer;
      font-family:'DM Sans',sans-serif; transition:transform 0.18s, box-shadow 0.18s;
      box-shadow:0 3px 12px rgba(232,98,26,0.3); white-space:nowrap;
    }
    .rsp-cta-btn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(232,98,26,0.4); }

    /* ── Enquiry modal ── */
    .rsp-modal-backdrop {
      position:fixed; inset:0; background:rgba(26,10,0,0.55);
      display:flex; align-items:center; justify-content:center;
      z-index:999; padding:20px; backdrop-filter:blur(4px);
      animation:fadeUp 0.2s ease;
    }
    .rsp-modal {
      background:#fff; border-radius:24px; padding:36px;
      width:100%; max-width:480px; position:relative;
      box-shadow:0 24px 80px rgba(0,0,0,0.2);
      animation:popIn 0.28s ease;
    }
    .rsp-modal-input {
      width:100%; border:1.5px solid #E8D8CC; border-radius:12px;
      padding:12px 14px; font-size:14px; font-family:'DM Sans',sans-serif;
      color:#1A0A00; outline:none; transition:border-color 0.2s;
      background:#fff;
    }
    .rsp-modal-input:focus { border-color:var(--saffron); box-shadow:0 0 0 3px rgba(232,98,26,0.08); }
    .rsp-modal-textarea { resize:vertical; min-height:80px; }
    .rsp-modal-submit {
      width:100%; background:linear-gradient(135deg,var(--saffron-light),var(--saffron-dark));
      color:#fff; border:none; border-radius:12px; padding:14px;
      font-size:15px; font-weight:700; cursor:pointer;
      font-family:'DM Sans',sans-serif; transition:transform 0.18s, box-shadow 0.18s;
      box-shadow:0 4px 20px rgba(232,98,26,0.35);
    }
    .rsp-modal-submit:hover { transform:translateY(-1px); box-shadow:0 8px 28px rgba(232,98,26,0.45); }
    .rsp-modal-close {
      position:absolute; top:16px; right:16px;
      width:32px; height:32px; border-radius:50%; background:#FFF0E6;
      border:none; cursor:pointer; font-size:18px; display:flex;
      align-items:center; justify-content:center; color:var(--saffron);
      transition:background 0.2s;
    }
    .rsp-modal-close:hover { background:#FFE0CC; }

    /* ── Toast ── */
    .rsp-toast {
      position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
      background:#1A0A00; color:#fff; border-radius:50px;
      padding:12px 28px; font-size:14px; font-weight:500;
      z-index:1000; box-shadow:0 8px 28px rgba(0,0,0,0.2);
      animation:slideDown 0.3s ease;
      font-family:'DM Sans',sans-serif; display:flex; align-items:center; gap:8px;
    }

    /* ── Badges ── */
    .rsp-badge-new       { background:#E8F5E9; color:#2E7D32; }
    .rsp-badge-popular   { background:#FFF3E0; color:#E65100; }
    .rsp-badge-premium   { background:#EDE7F6; color:#4527A0; }
    .rsp-badge-hot       { background:#FCE4EC; color:#880E4F; }
    .rsp-badge-fresh     { background:#E3F2FD; color:#1565C0; }
    .rsp-badge-bestseller{ background:#FFF8E1; color:#F57F17; }

    .reveal { opacity:0; }
    .reveal.visible { animation:fadeUp 0.6s ease forwards; }

    @media(max-width:640px) {
      .rsp-list-row { grid-template-columns:100px 1fr; }
      .rsp-list-row > *:last-child { display:none; }
    }
  `;
  document.head.appendChild(style);
};

/* ─── Demo data ─── */
const DEMO_PRODUCTS = [
  { _id:'d1', name:'Masala Peanuts', emoji:'🥜' },
  { _id:'d2', name:'Bhujia Sev', emoji:'🍜' },
  { _id:'d3', name:'Kaju Mixture', emoji:'🫘' },
  { _id:'d4', name:'Chivda', emoji:'🌾' },
  { _id:'d5', name:'Moong Dal Fry', emoji:'🟡' },
  { _id:'d6', name:'Aloo Bhujia', emoji:'🥔' },
  { _id:'d7', name:'Cornflakes Mixture', emoji:'🌽' },
  { _id:'d8', name:'Namkeen Cashews', emoji:'🤍' },
  { _id:'d9', name:'Masala Chana', emoji:'🟤' },
  { _id:'d10',name:'Rice Crispies', emoji:'⭕' },
  { _id:'d11',name:'Farsan Mix', emoji:'🎉' },
  { _id:'d12',name:'Methi Mathri', emoji:'🍪' },
];

const BADGE_POOL  = ['Bestseller','Popular','Fresh','Hot','New','Premium'];
const CAT_POOL    = ['Mixture','Sev','Nuts','Dal','Snack'];
const EMOJI_POOL  = ['🥜','🍜','🫘','🌾','🟡','🥔','🌽','🤍','🟤','⭕','🎉','🍪'];

/* Normalise a raw API product so every field the UI needs exists */
function normalise(p, i) {
  return {
    ...p,
    emoji:    p.emoji    || EMOJI_POOL[i % EMOJI_POOL.length],
  };
}

/* ─── Smart image src ─── */
function imgSrc(image) {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')) return image;
  return `http://localhost:5000/uploads/${image}`;
}
function useReveal(threshold = 0.08, deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    // Already visible from a previous observation
    if (el.classList.contains('visible')) return;
    // Immediately visible if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { el.classList.add('visible'); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, ...deps]);
  return ref;
}

/* ─── Enquiry Modal ─── */
function EnquiryModal({ product, onClose }) {
  const [form, setForm]       = useState({ name:'', phone:'', qty:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          qty: form.qty,
          message: form.message,
          productName: product.name
        })
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => { setSent(false); onClose(); }, 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send enquiry.');
      }
    } catch {
      setError('Network error. Failed to send enquiry.');
    }
    setLoading(false);
  };

  return (
    <div className="rsp-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="rsp-modal">
        <button className="rsp-modal-close" onClick={onClose}>✕</button>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
          <div style={{
            width:52, height:52, borderRadius:14, fontSize:28,
            background:'linear-gradient(135deg,#FFE0C0,#FFD0A0)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>{product.emoji || '🍿'}</div>
          <div>
            <p style={{ fontSize:12, color:'#9A8070', fontWeight:500, marginBottom:2 }}>Enquiring about</p>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'#1A0A00' }}>{product.name}</h3>
          </div>
        </div>

        {sent ? (
          <div style={{ textAlign:'center', padding:'24px 0' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
            <p style={{ fontWeight:600, color:'#2E7D32', fontSize:16 }}>Enquiry sent!</p>
            <p style={{ color:'#9A8070', fontSize:13, marginTop:4 }}>We'll reach out within 24 hours.</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {error && <p style={{ color:'#DC2626', fontSize:13, margin:'0 0 4px', textAlign:'center', fontWeight:500 }}>⚠️ {error}</p>}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <input className="rsp-modal-input" placeholder="Your name *" value={form.name}
                onChange={e => setForm({...form, name:e.target.value})} disabled={loading} />
              <input className="rsp-modal-input" placeholder="Phone number *" value={form.phone}
                onChange={e => setForm({...form, phone:e.target.value})} disabled={loading} />
            </div>
            <input className="rsp-modal-input" placeholder="Quantity needed (e.g. 50 kg, 100 pcs)" value={form.qty}
              onChange={e => setForm({...form, qty:e.target.value})} disabled={loading} />
            <textarea className="rsp-modal-input rsp-modal-textarea" placeholder="Any specific requirements or questions?"
              value={form.message} onChange={e => setForm({...form, message:e.target.value})} disabled={loading} />
            <button className="rsp-modal-submit" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Sending...' : 'Send Enquiry →'}
            </button>
            <p style={{ fontSize:12, color:'#C8B8A8', textAlign:'center' }}>
              We respond within 24 hours • No spam, ever
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Product Card (grid) ─── */
function ProductCard({ product, index, isDemo, onEnquire }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rsp-card" style={{ animationDelay:`${(index % 8) * 55}ms` }}>
      <div className="rsp-card-img-wrap">
        {isDemo || imgError || !product.image ? (
          <div className="rsp-card-emoji">{product.emoji || '🍿'}</div>
        ) : (
          <img src={imgSrc(product.image)}
            alt={product.name} className="rsp-card-img" onError={() => setImgError(true)} />
        )}
        <div className="rsp-card-overlay" />
        <button className="rsp-enquire-btn" onClick={() => onEnquire(product)}>Enquire Now</button>
      </div>
      <div style={{ padding:'18px 20px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ marginBottom:16 }}>
          <h3 style={{ fontSize:17, fontWeight:700, color:'#1A0A00', lineHeight:1.3, margin:0 }}>{product.name}</h3>
        </div>
        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <button className="rsp-cta-btn" onClick={() => onEnquire(product)}>Enquire Now →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Product List Row ─── */
function ProductListRow({ product, index, isDemo, onEnquire }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rsp-list-row" style={{ animationDelay:`${index * 50}ms` }}>
      <div className="rsp-list-img-wrap" style={{ position:'relative' }}>
        {isDemo || imgError || !product.image ? (
          <div className="rsp-list-emoji">{product.emoji || '🍿'}</div>
        ) : (
          <img src={imgSrc(product.image)}
            alt={product.name} className="rsp-list-img" onError={() => setImgError(true)} />
        )}
      </div>

      <div style={{ padding:'18px 20px' }}>
        <h3 style={{ fontSize:16, fontWeight:700, color:'#1A0A00', margin:0 }}>{product.name}</h3>
      </div>

      <div style={{ padding:'18px 24px', display:'flex', flexDirection:'column', alignItems:'flex-end', gap:10, minWidth:140 }}>
        <button className="rsp-cta-btn" onClick={() => onEnquire(product)}>Enquire →</button>
      </div>
    </div>
  );
}

/* ─── Skeleton ─── */
function SkeletonGrid() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:24 }}>
      {[1,2,3,4,5,6,7,8].map(i => (
        <div key={i} style={{ background:'#fff', borderRadius:20, overflow:'hidden', border:'1.5px solid #F0E4D8' }}>
          <div className="rsp-skeleton" style={{ height:210 }} />
          <div style={{ padding:'18px 20px' }}>
            <div className="rsp-skeleton" style={{ height:18, width:'70%', marginBottom:16 }} />
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <div className="rsp-skeleton" style={{ height:36, width:110, borderRadius:10 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════ MAIN COMPONENT ══════════════════════ */
const Products = () => {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [isDemo, setIsDemo]       = useState(false);
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('default');
  const [view, setView]           = useState('grid'); // 'grid' | 'list'
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [toast, setToast] = useState('');

  const headerRef = useReveal(0.05, []);
  const listRef   = useReveal(0.05, [loading]);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map(normalise)); setIsDemo(false);
        } else {
          setProducts(DEMO_PRODUCTS); setIsDemo(true);
        }
        setLoading(false);
      })
      .catch(() => { setProducts(DEMO_PRODUCTS); setIsDemo(true); setLoading(false); });
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  /* ─ Filter + sort ─ */
  const filtered = products
    .filter(p => {
      return !search || p.name.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sort === 'name')      return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="rsp-body" style={{ minHeight:'100vh', background:'#FFF8F0', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div className="rsp-spinner" style={{ margin:'0 auto 20px' }} />
          <p style={{ color:'#9A8070', fontSize:15, fontWeight:500 }}>Loading fresh snacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rsp-body" style={{ minHeight:'100vh', background:'#FFF8F0' }}>

      {/* ── Page header ── */}
      <div style={{
        background:'linear-gradient(145deg,#BF4E0C,#E8621A,#F97C35)',
        padding:'48px 24px 80px', position:'relative', overflow:'hidden',
      }}>
        {/* Decorative blobs */}
        {[{s:200,t:'-20%',r:'-5%'},{s:120,b:'10%',l:'3%'}].map((d,i) => (
          <div key={i} style={{
            position:'absolute', width:d.s, height:d.s, borderRadius:'50%',
            background:'rgba(255,255,255,0.07)',
            top:d.t, right:d.r, bottom:d.b, left:d.l,
            animation:`floatY ${5+i}s ease-in-out infinite`,
          }} />
        ))}
        <div ref={headerRef} style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:2, textAlign:'center', animation:'fadeUp 0.6s ease both' }}>
          <span style={{
            display:'inline-block', background:'rgba(255,255,255,0.15)',
            backdropFilter:'blur(8px)', borderRadius:50, padding:'5px 18px',
            fontSize:12, fontWeight:600, color:'#fff', letterSpacing:'0.08em',
            textTransform:'uppercase', marginBottom:16, border:'1px solid rgba(255,255,255,0.25)',
          }}>Our Catalogue</span>
          <h1 className="rsp-title" style={{ fontSize:'clamp(36px,5vw,58px)', color:'#fff', marginBottom:12, textShadow:'0 2px 16px rgba(0,0,0,0.18)' }}>
            Premium Snacks
          </h1>
          <p style={{ color:'rgba(255,255,255,0.85)', fontSize:17, maxWidth:480, margin:'0 auto 28px' }}>
            {products.length}+ varieties of authentic Indian snacks at wholesale prices
          </p>

          {/* Search bar */}
          <div className="rsp-search-wrap" style={{ display:'inline-block' }}>
            <span className="rsp-search-icon">🔍</span>
            <input className="rsp-search" placeholder="Search snacks..." value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Wave */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, lineHeight:0 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
            <path d="M0 60L48 52C96 44 192 28 288 22C384 16 480 20 576 24C672 28 768 32 864 34C960 36 1056 36 1152 34C1248 32 1344 28 1392 26L1440 24V60H0Z" fill="#FFF8F0"/>
          </svg>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'28px 24px 0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:16, flexWrap:'wrap' }}>
          {/* Right controls */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <select className="rsp-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Sort: Default</option>
              <option value="name">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
            </select>
            <button className={`rsp-view-btn ${view==='grid'?'active':''}`} onClick={() => setView('grid')}
              title="Grid view" style={{ color: view==='grid'?'#fff':'#9A8070', fontSize:14 }}>⊞</button>
            <button className={`rsp-view-btn ${view==='list'?'active':''}`} onClick={() => setView('list')}
              title="List view" style={{ color: view==='list'?'#fff':'#9A8070', fontSize:14 }}>☰</button>
          </div>
        </div>

        {/* Result count */}
        <div style={{ marginTop:16, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
          <p style={{ fontSize:13, color:'#9A8070' }}>
            Showing <strong style={{ color:'#1A0A00' }}>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
            {search && <> matching "<strong style={{ color:'var(--saffron)' }}>{search}</strong>"</>}
          </p>
          {isDemo && (
            <span style={{ fontSize:12, color:'#C8B8A8', background:'#F0E8E0', borderRadius:50, padding:'3px 12px' }}>
              Sample data — connect backend for live products
            </span>
          )}
        </div>
      </div>

      {/* ── Product Grid / List ── */}
      <div ref={listRef} style={{ maxWidth:1200, margin:'0 auto', padding:'28px 24px 80px', animation:'fadeUp 0.5s ease both' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <div style={{ fontSize:56, marginBottom:16 }}>🔍</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:'#1A0A00', marginBottom:10 }}>No snacks found</h3>
            <p style={{ color:'#9A8070', fontSize:15, marginBottom:24 }}>Try a different search term</p>
            <button className="rsp-filter-btn active" onClick={() => { setSearch(''); }}>
              Clear search
            </button>
          </div>
        ) : view === 'grid' ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:24 }}>
            {filtered.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} isDemo={isDemo}
                onEnquire={setEnquiryProduct} />
            ))}
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {filtered.map((p, i) => (
              <ProductListRow key={p._id} product={p} index={i} isDemo={isDemo}
                onEnquire={setEnquiryProduct} />
            ))}
          </div>
        )}
      </div>

      {/* ── Enquiry Modal ── */}
      {enquiryProduct && (
        <EnquiryModal product={enquiryProduct} onClose={() => setEnquiryProduct(null)} />
      )}

      {/* ── Toast ── */}
      {toast && <div className="rsp-toast">{toast}</div>}
    </div>
  );
};

export default Products;