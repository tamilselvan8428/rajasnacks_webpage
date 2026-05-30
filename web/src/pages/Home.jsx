import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

/* ─── Style Injection ─── */
const injectStyles = () => {
  if (document.getElementById('raja-snacks-styles')) return;
  const style = document.createElement('style');
  style.id = 'raja-snacks-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    :root {
      --saffron: #E8621A; --saffron-light: #F97C35; --saffron-dark: #C14E0E;
      --gold: #F5A623; --cream: #FFF8F0; --deep: #1A0A00;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    @keyframes slideIn  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes popIn    { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
    @keyframes countUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    /* ── 3D Hero Shop Name ── */
    @keyframes text3dFloat  { 0%,100%{transform:translateY(0) rotateX(0deg)} 50%{transform:translateY(-6px) rotateX(4deg)} }
    @keyframes shimmerGold  { 0%{background-position:200% center} 100%{background-position:-200% center} }
    @keyframes glowPulse    { 0%,100%{filter:drop-shadow(0 0 8px rgba(249,124,53,0.6)) drop-shadow(0 4px 16px rgba(200,78,14,0.5))} 50%{filter:drop-shadow(0 0 24px rgba(249,124,53,1)) drop-shadow(0 6px 24px rgba(200,78,14,0.9))} }
    @keyframes letterPop    { 0%{opacity:0;transform:translateY(20px) scale(0.8)} 100%{opacity:1;transform:translateY(0) scale(1)} }

    .rs-shop-name-3d {
      font-family:'Playfair Display',serif;
      font-size:clamp(48px,7vw,92px);
      font-weight:800;
      letter-spacing:0.08em;
      line-height:1;
      color:#FFE566;
      display:block;
      white-space:nowrap;
      text-shadow:
        1px 1px 0 #C14E0E,
        2px 2px 0 #A84010,
        3px 3px 0 #8B3510,
        4px 4px 0 #6B2508,
        5px 5px 0 #4A1800,
        6px 6px 0 #2A0D00,
        0 0 40px rgba(255,200,80,0.55),
        0 0 80px rgba(249,124,53,0.3);
      animation:text3dFloat 4s ease-in-out infinite;
      cursor:default;
    }
    .rs-shop-name-3d:hover {
      color:#fff;
      text-shadow:
        1px 1px 0 #C14E0E,
        2px 2px 0 #A84010,
        3px 3px 0 #8B3510,
        4px 4px 0 #6B2508,
        5px 5px 0 #4A1800,
        6px 6px 0 #2A0D00,
        0 0 60px rgba(255,220,120,0.9),
        0 0 120px rgba(249,124,53,0.6);
      animation:text3dFloat 4s ease-in-out infinite;
    }

    .rs-shop-letter {
      display:inline-block;
      animation:letterPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
    }


    .rs-hero-title { font-family:'Playfair Display',serif; }
    .rs-body       { font-family:'DM Sans',sans-serif; }

    /* Hero buttons */
    .rs-btn-primary {
      position:relative; overflow:hidden; background:#fff; color:var(--saffron);
      border:none; border-radius:50px; padding:14px 32px; font-size:15px; font-weight:600;
      cursor:pointer; transition:transform 0.2s,box-shadow 0.2s;
      font-family:'DM Sans',sans-serif; text-decoration:none;
      display:inline-flex; align-items:center; gap:8px;
      box-shadow:0 4px 24px rgba(0,0,0,0.18);
    }
    .rs-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(0,0,0,0.22); }
    .rs-btn-outline {
      background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,0.7);
      border-radius:50px; padding:13px 32px; font-size:15px; font-weight:500;
      cursor:pointer; transition:all 0.25s; font-family:'DM Sans',sans-serif;
      text-decoration:none; display:inline-flex; align-items:center; gap:8px;
      backdrop-filter:blur(8px);
    }
    .rs-btn-outline:hover { background:rgba(255,255,255,0.15); transform:translateY(-2px); }

    /* Product list row */
    .rs-product-row { display:flex; flex-direction:column; gap:0; }

    .rs-product-item {
      display:grid; grid-template-columns:auto 1fr;
      align-items:center; gap:20px;
      padding:20px 24px; background:#fff; border-bottom:1px solid #F0E4D8;
      transition:background 0.2s, transform 0.18s;
      cursor:pointer; text-decoration:none;
    }
    .rs-product-item:first-child { border-radius:16px 16px 0 0; }
    .rs-product-item:last-child  { border-radius:0 0 16px 16px; border-bottom:none; }
    .rs-product-item:only-child  { border-radius:16px; }
    .rs-product-item:hover { background:#FFF8F2; transform:translateX(4px); }
    .rs-product-item:hover .rs-item-img { transform:scale(1.06); }

    .rs-item-img-wrap {
      width:100px; height:80px; border-radius:12px; overflow:hidden;
      background:linear-gradient(135deg,#FFE0C0,#FFD0A0); flex-shrink:0;
    }
    .rs-item-img { width:100%; height:100%; object-fit:cover; transition:transform 0.35s; display:block; }
    .rs-item-emoji { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:32px; }

    .rs-item-rank {
      width:28px; height:28px; border-radius:50%; display:flex;
      align-items:center; justify-content:center;
      font-size:12px; font-weight:700; flex-shrink:0;
    }

    .rs-skeleton {
      background:linear-gradient(90deg,#f0e8e0 25%,#f8f0e8 50%,#f0e8e0 75%);
      background-size:400px 100%; animation:shimmer 1.4s infinite; border-radius:8px;
    }

    /* Comment section */
    .rs-comment-card {
      background:#fff; border-radius:16px; padding:20px;
      border:1.5px solid #F0E4D8;
      transition:box-shadow 0.2s, transform 0.2s;
      animation: popIn 0.4s ease both;
    }
    .rs-comment-card:hover { box-shadow:0 8px 28px rgba(232,98,26,0.1); transform:translateY(-2px); }

    .rs-comment-input {
      width:100%; border:1.5px solid #E8D8CC; border-radius:12px;
      padding:14px 16px; font-size:15px; font-family:'DM Sans',sans-serif;
      color:#1A0A00; background:#fff; resize:vertical; min-height:100px;
      outline:none; transition:border-color 0.2s, box-shadow 0.2s;
    }
    .rs-comment-input:focus { border-color:var(--saffron); box-shadow:0 0 0 3px rgba(232,98,26,0.1); }
    .rs-name-input {
      border:1.5px solid #E8D8CC; border-radius:10px;
      padding:10px 14px; font-size:14px; font-family:'DM Sans',sans-serif;
      color:#1A0A00; background:#fff; outline:none; transition:border-color 0.2s;
      width:100%;
    }
    .rs-name-input:focus { border-color:var(--saffron); }

    .rs-submit-btn {
      background:linear-gradient(135deg,var(--saffron-light),var(--saffron-dark));
      color:#fff; border:none; border-radius:10px;
      padding:12px 28px; font-size:15px; font-weight:600;
      cursor:pointer; font-family:'DM Sans',sans-serif;
      transition:transform 0.18s, box-shadow 0.18s;
      box-shadow:0 4px 16px rgba(232,98,26,0.3);
    }
    .rs-submit-btn:hover { transform:translateY(-1px); box-shadow:0 6px 24px rgba(232,98,26,0.4); }
    .rs-submit-btn:active { transform:scale(0.97); }
    .rs-submit-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }

    .rs-star-btn { background:none; border:none; cursor:pointer; font-size:26px; padding:2px; transition:transform 0.15s; }
    .rs-star-btn:hover { transform:scale(1.25); }

    .rs-view-all-btn {
      background:linear-gradient(135deg,var(--saffron-light),var(--saffron-dark));
      color:#fff; border:none; border-radius:50px;
      padding:14px 36px; font-size:15px; font-weight:600;
      cursor:pointer; text-decoration:none; display:inline-flex;
      align-items:center; gap:8px;
      box-shadow:0 4px 20px rgba(232,98,26,0.35);
      transition:transform 0.2s, box-shadow 0.2s; font-family:'DM Sans',sans-serif;
    }
    .rs-view-all-btn:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 8px 32px rgba(232,98,26,0.45); }

    .rs-badge {
      display:inline-block; background:#FFF0E6; color:var(--saffron);
      border-radius:50px; padding:4px 14px; font-size:12px; font-weight:700;
      letter-spacing:0.05em; text-transform:uppercase;
    }
    .rs-spice-dot {
      position:absolute; border-radius:50%; background:rgba(255,255,255,0.08);
      animation:floatY var(--dur,4s) ease-in-out infinite;
      animation-delay:var(--delay,0s);
    }
    .rs-feature-row {
      display:flex; align-items:flex-start; gap:16px; padding:16px;
      border-radius:14px; transition:background 0.2s;
    }
    .rs-feature-row:hover { background:rgba(232,98,26,0.05); }
    .rs-icon-wrap {
      width:44px; height:44px; border-radius:12px;
      background:linear-gradient(135deg,#F97C35,#E8621A);
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; font-size:20px; box-shadow:0 4px 12px rgba(232,98,26,0.3);
    }
    .rs-why-card {
      background:#fff; border-radius:20px; padding:28px 24px;
      box-shadow:0 2px 24px rgba(232,98,26,0.07);
      transition:transform 0.28s, box-shadow 0.28s;
      border:1.5px solid rgba(232,98,26,0.08);
    }
    .rs-why-card:hover { transform:translateY(-6px); box-shadow:0 12px 40px rgba(232,98,26,0.14); }
    .rs-stat-num { font-family:'Playfair Display',serif; font-size:38px; font-weight:800; color:var(--saffron); line-height:1; }

    .reveal { opacity:0; }
    .reveal.visible { animation:fadeUp 0.6s ease forwards; }

    /* Like button */
    .rs-like-btn {
      background:none; border:1px solid #E8D8CC; border-radius:50px;
      padding:5px 12px; font-size:13px; color:#9A8070; cursor:pointer;
      display:inline-flex; align-items:center; gap:5px; transition:all 0.2s;
      font-family:'DM Sans',sans-serif;
    }
    .rs-like-btn:hover, .rs-like-btn.liked {
      background:#FFF0E6; border-color:var(--saffron); color:var(--saffron);
    }
    .rs-like-btn.liked { font-weight:600; }

    /* Sort tabs */
    .rs-tab {
      background:none; border:1.5px solid #E8D8CC; border-radius:50px;
      padding:7px 18px; font-size:13px; font-weight:500; color:#7A6358;
      cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif;
    }
    .rs-tab.active, .rs-tab:hover { background:var(--saffron); border-color:var(--saffron); color:#fff; }

    @media (max-width:768px) {
      .rs-product-item { grid-template-columns:72px 1fr; }
      .rs-product-item > *:last-child { display:none; }
    }
  `;
  document.head.appendChild(style);
};

/* ─── Intersection Observer Hook ─── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── Counter ─── */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let v = 0;
      const tick = () => {
        v += Math.ceil(target / 45);
        if (v >= target) { setVal(target); return; }
        setVal(v); requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.disconnect();
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Star Rating ─── */
function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display:'flex', gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <button
          key={s} type="button" className="rs-star-btn"
          onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          style={{ color: s <= (hover || value) ? '#F5A623' : '#D8C8B8' }}
          aria-label={`Rate ${s} star`}
        >★</button>
      ))}
    </div>
  );
}

/* ─── Comment Section ─── */
function CommentSection() {
  const STORAGE_KEY = 'raja_snacks_comments';
  const [comments, setComments] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  });
  const [name, setName]     = useState('');
  const [text, setText]     = useState('');
  const [rating, setRating] = useState(0);
  const [sort, setSort]     = useState('newest');
  const [liked, setLiked]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('raja_liked')) || {}; } catch { return {}; }
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const save = (updated) => {
    setComments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (!name.trim())  { setError('Please enter your name.'); return; }
    if (!text.trim())  { setError('Please write a comment.'); return; }
    if (rating === 0)  { setError('Please select a star rating.'); return; }
    setError('');
    const newComment = {
      id: Date.now(), name: name.trim(), text: text.trim(),
      rating, likes: 0, date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
    };
    save([newComment, ...comments]);
    setName(''); setText(''); setRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2800);
  };

  const toggleLike = (id) => {
    const isLiked = liked[id];
    const newLiked = { ...liked, [id]: !isLiked };
    setLiked(newLiked);
    localStorage.setItem('raja_liked', JSON.stringify(newLiked));
    save(comments.map(c => c.id === id ? { ...c, likes: c.likes + (isLiked ? -1 : 1) } : c));
  };

  const sorted = [...comments].sort((a, b) => {
    if (sort === 'newest')  return b.id - a.id;
    if (sort === 'top')     return b.likes - a.likes;
    if (sort === 'highest') return b.rating - a.rating;
    return 0;
  });

  const avgRating = comments.length
    ? (comments.reduce((s, c) => s + c.rating, 0) / comments.length).toFixed(1)
    : null;

  const initials = (n) => n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
  const avatarColors = ['#E8621A','#F5A623','#2E7D32','#1565C0','#6A1B9A','#00838F','#C62828'];
  const colorFor = (id) => avatarColors[id % avatarColors.length];

  const secRef = useReveal(0.1);

  return (
    <section ref={secRef} className="reveal" style={{ padding:'72px 24px', background:'#FFF8F0' }}>
      <div style={{ maxWidth:880, margin:'0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom:40, display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div>
            <span className="rs-badge" style={{ marginBottom:10, display:'inline-block' }}>Community</span>
            <h2 className="rs-hero-title" style={{ fontSize:'clamp(26px,3.5vw,38px)', color:'#1A0A00' }}>
              Leave a Review
            </h2>
            {avgRating && (
              <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
                <span style={{ fontSize:28, fontWeight:800, color:'#F5A623', fontFamily:"'Playfair Display',serif" }}>{avgRating}</span>
                <div>{[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= Math.round(avgRating) ? '#F5A623' : '#D8C8B8', fontSize:16 }}>★</span>)}</div>
                <span style={{ color:'#9A8070', fontSize:13 }}>({comments.length} {comments.length === 1 ? 'review' : 'reviews'})</span>
              </div>
            )}
          </div>
          {comments.length > 1 && (
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {[['newest','Latest'],['top','Most Liked'],['highest','Top Rated']].map(([k,label]) => (
                <button key={k} className={`rs-tab ${sort === k ? 'active' : ''}`} onClick={() => setSort(k)}>{label}</button>
              ))}
            </div>
          )}
        </div>

        {/* Write a comment */}
        <div style={{
          background:'#fff', borderRadius:20, padding:'28px',
          border:'1.5px solid #F0E4D8', marginBottom:36,
          boxShadow:'0 2px 20px rgba(232,98,26,0.06)',
        }}>
          <p style={{ fontWeight:600, color:'#1A0A00', fontSize:16, marginBottom:20 }}>✍️ Share your experience</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
            <input
              className="rs-name-input" placeholder="Your name" value={name}
              onChange={e => setName(e.target.value)} maxLength={40}
            />
            <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', background:'#FFF8F2', borderRadius:10, border:'1.5px solid #E8D8CC' }}>
              <span style={{ fontSize:13, color:'#9A8070', fontWeight:500 }}>Rating:</span>
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>
          <textarea
            className="rs-comment-input" placeholder="What do you love about Raja Snacks? Tell us about the quality, delivery, variety..."
            value={text} onChange={e => setText(e.target.value)} maxLength={400}
          />
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, flexWrap:'wrap', gap:12 }}>
            <div>
              {error && <p style={{ color:'#C62828', fontSize:13 }}>{error}</p>}
              {submitted && <p style={{ color:'#2E7D32', fontSize:13, fontWeight:600 }}>✅ Thanks for your review!</p>}
              <p style={{ fontSize:12, color:'#C8B8A8', marginTop:4 }}>{text.length}/400 characters</p>
            </div>
            <button className="rs-submit-btn" onClick={handleSubmit} disabled={submitted}>
              {submitted ? '✓ Posted!' : 'Post Review →'}
            </button>
          </div>
        </div>

        {/* Comments list */}
        {sorted.length === 0 ? (
          <div style={{ textAlign:'center', padding:'48px 20px', background:'#fff', borderRadius:20, border:'2px dashed #F0D8C0' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>💬</div>
            <p style={{ color:'#9A8070', fontSize:15 }}>Be the first to leave a review!</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {sorted.map((c, i) => (
              <div key={c.id} className="rs-comment-card" style={{ animationDelay:`${i*60}ms` }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                  <div style={{
                    width:42, height:42, borderRadius:'50%', flexShrink:0,
                    background:colorFor(c.id), display:'flex', alignItems:'center',
                    justifyContent:'center', color:'#fff', fontWeight:700, fontSize:14,
                  }}>{initials(c.name)}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, flexWrap:'wrap' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontWeight:600, color:'#1A0A00', fontSize:15 }}>{c.name}</span>
                        <div>{[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= c.rating ? '#F5A623' : '#D8C8B8', fontSize:13 }}>★</span>)}</div>
                      </div>
                      <span style={{ fontSize:12, color:'#C8B8A8' }}>{c.date}</span>
                    </div>
                    <p style={{ color:'#4A3728', fontSize:14, lineHeight:1.7, marginTop:8 }}>{c.text}</p>
                    <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:8 }}>
                      <button className={`rs-like-btn ${liked[c.id] ? 'liked' : ''}`} onClick={() => toggleLike(c.id)}>
                        {liked[c.id] ? '❤️' : '🤍'} Helpful {c.likes > 0 && `(${c.likes})`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Fallback / demo products when API is empty ─── */
const DEMO_PRODUCTS = [
  { _id:'d1', name:'Masala Peanuts', emoji:'🥜' },
  { _id:'d2', name:'Bhujia Sev', emoji:'🍜' },
  { _id:'d3', name:'Kaju Mixture', emoji:'🫘' },
  { _id:'d4', name:'Chivda', emoji:'🌾' },
  { _id:'d5', name:'Moong Dal Fry', emoji:'🟡' },
  { _id:'d6', name:'Aloo Bhujia', emoji:'🥔' },
];

/* ─── Product List Item ─── */
function ProductItem({ product, index, isDemo }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="rs-product-item"
      style={{ animationDelay:`${index * 60}ms`, animation:'slideIn 0.45s ease both' }}
    >
      {/* Rank number */}
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <div className="rs-item-rank" style={{
          background: index < 3 ? 'linear-gradient(135deg,#F5A623,#E8621A)' : '#F0E4D8',
          color: index < 3 ? '#fff' : '#9A8070',
        }}>
          {index < 3 ? ['🥇','🥈','🥉'][index] : `#${index+1}`}
        </div>

        {/* Image */}
        <div className="rs-item-img-wrap">
          {isDemo || imgError ? (
            <div className="rs-item-emoji">{product.emoji || '🍿'}</div>
          ) : (
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              className="rs-item-img"
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5, flexWrap:'wrap' }}>
          <span style={{ fontWeight:600, color:'#1A0A00', fontSize:16 }}>{product.name}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:8 }}>
          {[1,2,3,4,5].map(s => <span key={s} style={{ color:'#F5A623', fontSize:12 }}>★</span>)}
          <span style={{ fontSize:12, color:'#C8B8A8' }}>(4.8)</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton Row ─── */
function SkeletonRow() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:20, padding:'20px 24px', background:'#fff', borderBottom:'1px solid #F0E4D8', alignItems:'center' }}>
      <div className="rs-skeleton" style={{ width:100, height:80, borderRadius:12 }} />
      <div>
        <div className="rs-skeleton" style={{ height:16, width:'50%', marginBottom:10 }} />
        <div className="rs-skeleton" style={{ height:12, width:'30%' }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN HOME COMPONENT
══════════════════════════════════════════ */
const Home = () => {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [isDemo, setIsDemo]       = useState(false);

  const heroRef  = useReveal(0.05);
  const featRef  = useReveal(0.08);
  const aboutRef = useReveal(0.08);
  const statsRef = useReveal(0.1);
  const whyRef   = useReveal(0.1);

  useEffect(() => {
    injectStyles();
    fetch('http://localhost:5000/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 8));
          setIsDemo(false);
        } else {
          setProducts(DEMO_PRODUCTS);
          setIsDemo(true);
        }
        setLoading(false);
      })
      .catch(() => { setProducts(DEMO_PRODUCTS); setIsDemo(true); setLoading(false); });
  }, []);

  return (
    <div className="rs-body" style={{ minHeight:'100vh', background:'#FFF8F0', overflowX:'hidden' }}>

      {/* ══ HERO ══ */}
      <section style={{
        position:'relative', overflow:'hidden', minHeight:'100vh',
        background:'linear-gradient(145deg,#BF4E0C 0%,#E8621A 40%,#F97C35 70%,#FFAA5A 100%)',
        display:'flex', alignItems:'center',
      }}>
        {[
          {size:180,top:'8%',left:'-5%',dur:'7s',delay:'0s'},
          {size:120,top:'60%',left:'2%',dur:'5s',delay:'1s'},
          {size:240,top:'-10%',right:'-6%',dur:'9s',delay:'0.5s'},
          {size:80,bottom:'15%',right:'10%',dur:'6s',delay:'2s'},
          {size:60,top:'40%',right:'22%',dur:'4s',delay:'0.8s'},
        ].map((d,i) => (
          <div key={i} className="rs-spice-dot" style={{ width:d.size,height:d.size,top:d.top,left:d.left,right:d.right,bottom:d.bottom,'--dur':d.dur,'--delay':d.delay }} />
        ))}

        <div style={{ maxWidth:1200,margin:'0 auto',padding:'120px 24px 100px',width:'100%',position:'relative',zIndex:2 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            {/* Copy */}
            <div ref={heroRef} className="reveal">
              {/* 3D Shop Name */}
              <div style={{ marginBottom:20 }}>
                <span className="rs-shop-name-3d"> RAJA <br />SNACKS</span>
              </div>

              <div style={{
                display:'inline-flex', alignItems:'center', gap:8,
                background:'rgba(255,255,255,0.15)', backdropFilter:'blur(12px)',
                borderRadius:50, padding:'6px 18px', marginBottom:28,
                border:'1px solid rgba(255,255,255,0.3)',
              }}>
                <span style={{ fontSize:14 }}>🏆</span>
                <span style={{ color:'#fff', fontSize:13, fontWeight:500, letterSpacing:'0.05em' }}>India's Most Trusted Snack Wholesaler</span>
              </div>
              <h1 className="rs-hero-title" style={{ fontSize:'clamp(40px,5vw,68px)', fontWeight:800, color:'#fff', lineHeight:1.1, marginBottom:20, textShadow:'0 2px 20px rgba(0,0,0,0.2)' }}>
                Premium Snacks,<br /><span style={{ color:'#FFE0A0' }}>Wholesale</span> Prices.
              </h1>
              <p style={{ fontSize:18, color:'rgba(255,255,255,0.88)', lineHeight:1.7, marginBottom:36, maxWidth:460 }}>
                From crispy namkeen to festive sweets — Raja Snacks delivers freshness and flavour straight to your business.
              </p>
              <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <Link to="/products" className="rs-btn-primary">Browse Products →</Link>
                <Link to="/contact" className="rs-btn-outline">Get a Quote</Link>
              </div>
              <div style={{ display:'flex', gap:32, marginTop:48 }}>
                {[{n:'100+',label:'Products'},{n:'10K+',label:'Retailers'},{n:'15+',label:'Years'}].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize:28,fontWeight:800,color:'#FFE0A0',fontFamily:"'Playfair Display',serif" }}>{s.n}</div>
                    <div style={{ fontSize:13,color:'rgba(255,255,255,0.7)',marginTop:2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orbit visual */}
            <div style={{ position:'relative',display:'flex',justifyContent:'center',animation:'floatY 5s ease-in-out infinite' }}>
              <div style={{
                width:340,height:340,borderRadius:'50%',
                background:'rgba(255,255,255,0.12)',backdropFilter:'blur(20px)',
                border:'2px solid rgba(255,255,255,0.25)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:110,boxShadow:'0 24px 80px rgba(0,0,0,0.2)',
              }}>🍿</div>
              <div style={{
                position:'absolute',inset:-20,border:'1.5px dashed rgba(255,255,255,0.25)',
                borderRadius:'50%',animation:'rotateSlow 20s linear infinite',
              }}>
                {['🌶️','🥜','🫘','🧆'].map((e,i) => (
                  <div key={i} style={{
                    position:'absolute',top:'50%',left:'50%',
                    transform:`rotate(${i*90}deg) translateX(190px) rotate(-${i*90}deg)`,
                    fontSize:26,marginLeft:-13,marginTop:-13,
                    background:'rgba(255,255,255,0.18)',borderRadius:'50%',
                    width:48,height:48,display:'flex',alignItems:'center',justifyContent:'center',
                    backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.3)',
                  }}>{e}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position:'absolute',bottom:0,left:0,right:0,lineHeight:0 }}>
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
            <path d="M0 90L60 78C120 66 240 42 360 33C480 24 600 30 720 36C840 42 960 48 1080 51C1200 54 1320 54 1380 54L1440 54V90H0Z" fill="#FFF8F0"/>
          </svg>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statsRef} className="reveal" style={{ padding:'40px 24px',background:'#fff',borderBottom:'1px solid #F0E8E0' }}>
        <div style={{ maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24 }}>
          {[
            {icon:'📦',n:100,suffix:'+',label:'Snack Varieties'},
            {icon:'🤝',n:5000,suffix:'+',label:'Wholesale Partners'},
            {icon:'⚡',n:24,suffix:'hr',label:'Express Delivery'},
            {icon:'⭐',n:4,suffix:'.9★',label:'Avg. Rating'},
          ].map((s,i) => (
            <div key={s.label} style={{ textAlign:'center',animationDelay:`${i*100}ms` }}>
              <div style={{ fontSize:28,marginBottom:8 }}>{s.icon}</div>
              <div className="rs-stat-num"><Counter target={s.n} suffix={s.suffix} /></div>
              <div style={{ fontSize:13,color:'#9A8070',marginTop:4,fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED PRODUCT LIST ══ */}
      <section ref={featRef} className="reveal" style={{ padding:'72px 24px',background:'#FFF8F0' }}>
        <div style={{ maxWidth:900,margin:'0 auto' }}>
          {/* Header */}
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:36,flexWrap:'wrap',gap:16 }}>
            <div>
              <span className="rs-badge" style={{ marginBottom:10,display:'inline-block' }}>Featured</span>
              <h2 className="rs-hero-title" style={{ fontSize:'clamp(28px,4vw,42px)',color:'#1A0A00' }}>
                Our Bestselling Snacks
              </h2>
              {isDemo && (
                <p style={{ fontSize:13,color:'#C8B8A8',marginTop:6 }}>
                  Showing sample products — connect your backend to display real inventory.
                </p>
              )}
            </div>
            <Link to="/products" style={{ color:'#E8621A',fontWeight:600,textDecoration:'none',display:'flex',alignItems:'center',gap:6,fontSize:15 }}>
              View All <span style={{ fontSize:20 }}>→</span>
            </Link>
          </div>

          {/* Product list */}
          <div style={{
            borderRadius:16,overflow:'hidden',
            boxShadow:'0 4px 40px rgba(232,98,26,0.1)',
            border:'1.5px solid #F0E4D8',
          }}>
            {loading
              ? [1,2,3,4,5].map(i => <SkeletonRow key={i} />)
              : products.map((p, i) => (
                  <ProductItem key={p._id} product={p} index={i} isDemo={isDemo} />
                ))
            }
          </div>

          <div style={{ textAlign:'center',marginTop:40 }}>
            <Link to="/products" className="rs-view-all-btn">Explore All Products ✦</Link>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section ref={aboutRef} className="reveal" style={{ padding:'72px 24px',background:'#fff' }}>
        <div style={{ maxWidth:1200,margin:'0 auto' }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center' }}>
            <div>
              <span className="rs-badge" style={{ marginBottom:16,display:'inline-block' }}>About Us</span>
              <h2 className="rs-hero-title" style={{ fontSize:'clamp(26px,3.5vw,40px)',color:'#1A0A00',marginBottom:20 }}>
                Crafted with Tradition,<br />Delivered with Care
              </h2>
              <p style={{ color:'#7A6358',lineHeight:1.8,marginBottom:16,fontSize:16 }}>
                A leading wholesale snacks supplier with deep roots in traditional Indian flavours — crispy namkeen, festive sweets, roasted nuts, and much more, all made to the highest quality standards.
              </p>
              <p style={{ color:'#7A6358',lineHeight:1.8,marginBottom:28,fontSize:16 }}>
                With over 15 years serving retailers and businesses across India, we offer timely delivery, consistent freshness, and prices that protect your margins.
              </p>
              {[
                { icon:'✦', title:'Premium Quality',    desc:'Rigorous quality checks at every stage' },
                { icon:'⚡', title:'Fast Delivery',      desc:'Same-day dispatch for orders before 2 PM' },
                { icon:'💬', title:'Dedicated Support',  desc:'Account managers for every wholesale partner' },
                { icon:'📦', title:'Bulk Discounts',     desc:'Tiered pricing for high-volume orders' },
              ].map(f => (
                <div key={f.title} className="rs-feature-row">
                  <div className="rs-icon-wrap"><span style={{ color:'#fff',fontSize:18 }}>{f.icon}</span></div>
                  <div>
                    <div style={{ fontWeight:600,color:'#1A0A00',marginBottom:3,fontSize:15 }}>{f.title}</div>
                    <div style={{ color:'#9A8070',fontSize:13,lineHeight:1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div ref={whyRef} className="reveal" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
              {[
                {icon:'🌿',n:'100%',label:'Natural Ingredients',bg:'#E8F5E9',accent:'#2E7D32'},
                {icon:'🏭',n:'15+', label:'Manufacturing Units', bg:'#FFF3E0',accent:'#E65100'},
                {icon:'🚚',n:'500+',label:'Cities Covered',      bg:'#E3F2FD',accent:'#1565C0'},
                {icon:'🎁',n:'50K+',label:'Orders Delivered',    bg:'#FCE4EC',accent:'#880E4F'},
              ].map((c,i) => (
                <div key={c.label} className="rs-why-card" style={{ animationDelay:`${i*80}ms` }}>
                  <div style={{ width:52,height:52,borderRadius:14,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,marginBottom:14 }}>{c.icon}</div>
                  <div style={{ fontSize:30,fontWeight:800,color:c.accent,fontFamily:"'Playfair Display',serif",lineHeight:1 }}>{c.n}</div>
                  <div style={{ fontSize:13,color:'#9A8070',marginTop:6,fontWeight:500 }}>{c.label}</div>
                </div>
              ))}
              <div style={{
                gridColumn:'span 2',borderRadius:20,overflow:'hidden',
                background:'linear-gradient(135deg,#BF4E0C,#E8621A,#F97C35)',
                padding:28,display:'flex',alignItems:'center',justifyContent:'space-between',
                gap:16,boxShadow:'0 8px 32px rgba(232,98,26,0.35)',
              }}>
                <div>
                  <div style={{ fontSize:14,color:'rgba(255,255,255,0.7)',marginBottom:4 }}>Ready to order wholesale?</div>
                  <div style={{ fontSize:20,fontWeight:700,color:'#fff',fontFamily:"'Playfair Display',serif" }}>Get your free price list today</div>
                </div>
                <Link to="/contact" style={{
                  background:'#fff',color:'#E8621A',borderRadius:50,padding:'10px 24px',
                  fontWeight:700,fontSize:14,textDecoration:'none',whiteSpace:'nowrap',flexShrink:0,
                  boxShadow:'0 4px 16px rgba(0,0,0,0.12)',
                }}>Contact Us →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMMENT SECTION ══ */}
      <CommentSection />

      {/* ══ FOOTER CTA ══ */}
      <section style={{ padding:'60px 24px',background:'#fff',textAlign:'center',borderTop:'1px solid #F0E8E0' }}>
        <div style={{ maxWidth:560,margin:'0 auto' }}>
          <div style={{ fontSize:40,marginBottom:16 }}>🛒</div>
          <h2 className="rs-hero-title" style={{ fontSize:'clamp(24px,3vw,36px)',color:'#1A0A00',marginBottom:14 }}>
            Ready to Stock Up?
          </h2>
          <p style={{ color:'#9A8070',fontSize:16,lineHeight:1.7,marginBottom:32 }}>
            Browse our full catalogue and place your wholesale order today. Minimum order: ₹500 only.
          </p>
          <div style={{ display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap' }}>
            <Link to="/products" className="rs-view-all-btn">Shop Now</Link>
            <Link to="/contact" style={{
              background:'transparent',color:'#E8621A',border:'1.5px solid #E8621A',borderRadius:50,
              padding:'13px 32px',fontWeight:600,fontSize:15,textDecoration:'none',
              fontFamily:"'DM Sans',sans-serif",transition:'background 0.2s,color 0.2s',
            }}>Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;