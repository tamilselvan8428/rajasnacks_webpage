import { useState, useEffect, useRef } from 'react';

/* ─── Style Injection ─── */
const injectStyles = () => {
  if (document.getElementById('rs-admin-styles')) return;
  const style = document.createElement('style');
  style.id = 'rs-admin-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    :root {
      --saffron:#E8621A; --saffron-light:#F97C35; --saffron-dark:#C14E0E;
      --gold:#F5A623; --cream:#FFF8F0; --deep:#1A0A00;
    }
    *,*::before,*::after{box-sizing:border-box;}

    @keyframes fadeUp    {from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes popIn     {from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
    @keyframes shimmer   {0%{background-position:-500px 0}100%{background-position:500px 0}}
    @keyframes spin      {to{transform:rotate(360deg)}}
    @keyframes slideRight{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
    @keyframes checkDraw {from{stroke-dashoffset:60}to{stroke-dashoffset:0}}
    @keyframes shake     {0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}

    .rsa-body  {font-family:'DM Sans',sans-serif; background:#F5F0EB; min-height:100vh;}
    .rsa-title {font-family:'Playfair Display',serif;}

    /* ── Sidebar ── */
    .rsa-sidebar {
      width:240px; background:#1A0A00; min-height:100vh;
      display:flex; flex-direction:column;
      position:relative; z-index:1002; flex-shrink:0;
      box-shadow:4px 0 24px rgba(0,0,0,0.2);
    }
    .rsa-sidebar-logo {
      padding:24px 20px; border-bottom:1px solid rgba(255,255,255,0.08);
      display:flex; align-items:center; gap:12px;
    }
    .rsa-sidebar-icon {
      width:42px; height:42px; border-radius:12px;
      background:linear-gradient(135deg,#F97C35,#C14E0E);
      display:flex; align-items:center; justify-content:center; font-size:20px;
      box-shadow:0 4px 12px rgba(232,98,26,0.4); flex-shrink:0;
    }
    .rsa-nav-item {
      display:flex; align-items:center; gap:12px;
      padding:12px 20px; color:rgba(255,255,255,0.6); font-size:14px; font-weight:500;
      cursor:pointer; transition:all 0.18s; border-radius:0;
      border:none; background:none; width:100%; text-align:left;
      font-family:'DM Sans',sans-serif;
    }
    .rsa-nav-item:hover { color:#fff; background:rgba(255,255,255,0.06); }
    .rsa-nav-item.active { color:#fff; background:rgba(232,98,26,0.18); border-right:3px solid #E8621A; }
    .rsa-nav-item-icon {
      width:34px; height:34px; border-radius:9px; display:flex;
      align-items:center; justify-content:center; font-size:16px;
      background:rgba(255,255,255,0.07); flex-shrink:0; transition:background 0.18s;
    }
    .rsa-nav-item.active .rsa-nav-item-icon { background:rgba(232,98,26,0.25); }

    /* ── Main content ── */
    .rsa-main { flex:1; min-width:0; height:100vh; overflow-y:auto; background:#F5F0EB; }
    .rsa-topbar {
      background:#fff; padding:0 32px; height:64px;
      display:flex; align-items:center; justify-content:space-between;
      border-bottom:1px solid #F0E4D8; position:sticky; top:0; z-index:50;
      box-shadow:0 1px 8px rgba(232,98,26,0.06);
    }
    .rsa-content { padding:32px; }

    /* ── Stat cards ── */
    .rsa-stat-card {
      background:#fff; border-radius:18px; padding:24px;
      border:1.5px solid #F0E4D8; transition:transform 0.22s, box-shadow 0.22s;
      animation:fadeUp 0.5s ease both;
    }
    .rsa-stat-card:hover { transform:translateY(-4px); box-shadow:0 10px 32px rgba(232,98,26,0.1); }

    /* ── Table ── */
    .rsa-table-wrap {
      background:#fff; border-radius:18px; overflow:hidden;
      border:1.5px solid #F0E4D8; box-shadow:0 2px 16px rgba(232,98,26,0.06);
    }
    .rsa-table { width:100%; border-collapse:collapse; }
    .rsa-table th {
      background:#FFF8F2; padding:14px 20px; text-align:left;
      font-size:11px; font-weight:700; color:#9A8070;
      letter-spacing:0.08em; text-transform:uppercase;
      border-bottom:1.5px solid #F0E4D8;
    }
    .rsa-table td {
      padding:14px 20px; border-bottom:1px solid #F8F0E8;
      font-size:14px; color:#1A0A00; vertical-align:middle;
    }
    .rsa-table tr:last-child td { border-bottom:none; }
    .rsa-table tr { transition:background 0.15s; }
    .rsa-table tr:hover td { background:#FFF8F2; }
    .rsa-table tr { animation:slideRight 0.35s ease both; }

    /* ── Inputs ── */
    .rsa-input {
      width:100%; border:1.5px solid #E8D8CC; border-radius:12px;
      padding:12px 16px; font-size:14px; color:#1A0A00; background:#FDFAF7;
      outline:none; transition:border-color 0.2s, box-shadow 0.2s;
      font-family:'DM Sans',sans-serif;
    }
    .rsa-input:focus { border-color:var(--saffron); box-shadow:0 0 0 3px rgba(232,98,26,0.1); background:#fff; }
    .rsa-input.error { border-color:#EF4444; box-shadow:0 0 0 3px rgba(239,68,68,0.08); animation:shake 0.4s ease; }
    .rsa-textarea { resize:vertical; min-height:100px; line-height:1.6; }
    .rsa-label { display:block; font-size:13px; font-weight:600; color:#7A6358; margin-bottom:6px; }
    .rsa-field { margin-bottom:20px; }

    /* ── Drop zone ── */
    .rsa-dropzone {
      border:2px dashed #E8D8CC; border-radius:14px; padding:28px;
      text-align:center; cursor:pointer; transition:border-color 0.2s, background 0.2s;
      background:#FDFAF7;
    }
    .rsa-dropzone:hover, .rsa-dropzone.drag { border-color:var(--saffron); background:#FFF8F2; }
    .rsa-dropzone.has-file { border-color:#22C55E; background:#F0FDF4; }

    /* ── Buttons ── */
    .rsa-btn-primary {
      background:linear-gradient(135deg,var(--saffron-light),var(--saffron-dark));
      color:#fff; border:none; border-radius:12px;
      padding:12px 24px; font-size:14px; font-weight:700;
      cursor:pointer; font-family:'DM Sans',sans-serif;
      box-shadow:0 3px 14px rgba(232,98,26,0.32);
      transition:transform 0.18s, box-shadow 0.18s;
      display:inline-flex; align-items:center; gap:8px;
    }
    .rsa-btn-primary:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 20px rgba(232,98,26,0.42); }
    .rsa-btn-primary:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
    .rsa-btn-ghost {
      background:#F5F0EB; color:#4A3728; border:none; border-radius:12px;
      padding:12px 24px; font-size:14px; font-weight:600;
      cursor:pointer; font-family:'DM Sans',sans-serif; transition:background 0.18s;
    }
    .rsa-btn-ghost:hover { background:#EDE5DB; }
    .rsa-btn-danger {
      background:#FEF2F2; color:#DC2626; border:1.5px solid #FECACA;
      border-radius:8px; padding:6px 14px; font-size:12px; font-weight:700;
      cursor:pointer; font-family:'DM Sans',sans-serif; transition:background 0.18s;
    }
    .rsa-btn-danger:hover { background:#FECACA; }
    .rsa-btn-edit {
      background:#EFF6FF; color:#2563EB; border:1.5px solid #BFDBFE;
      border-radius:8px; padding:6px 14px; font-size:12px; font-weight:700;
      cursor:pointer; font-family:'DM Sans',sans-serif; transition:background 0.18s;
    }
    .rsa-btn-edit:hover { background:#BFDBFE; }

    /* ── Modal ── */
    .rsa-modal-backdrop {
      position:fixed; inset:0; background:rgba(26,10,0,0.55);
      backdrop-filter:blur(4px); z-index:200; display:flex;
      align-items:center; justify-content:center; padding:24px;
      animation:fadeUp 0.2s ease;
    }
    .rsa-modal {
      background:#fff; border-radius:24px; width:100%; max-width:560px;
      max-height:90vh; overflow-y:auto;
      box-shadow:0 24px 80px rgba(0,0,0,0.2);
      animation:popIn 0.28s ease;
    }
    .rsa-modal-header {
      padding:28px 28px 0; display:flex; align-items:center;
      justify-content:space-between; margin-bottom:24px;
    }
    .rsa-modal-body { padding:0 28px 28px; }
    .rsa-modal-close {
      width:34px; height:34px; border-radius:10px; background:#FFF0E6;
      border:none; cursor:pointer; display:flex; align-items:center;
      justify-content:center; color:var(--saffron); font-size:16px;
      transition:background 0.18s;
    }
    .rsa-modal-close:hover { background:#FFE0CC; }

    /* ── Confirm dialog ── */
    .rsa-confirm {
      background:#fff; border-radius:20px; padding:32px; max-width:380px; width:100%;
      text-align:center; animation:popIn 0.25s ease;
      box-shadow:0 24px 80px rgba(0,0,0,0.22);
    }

    /* ── Toast ── */
    .rsa-toast {
      position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
      border-radius:50px; padding:12px 24px;
      font-size:14px; font-weight:500; z-index:500;
      box-shadow:0 8px 28px rgba(0,0,0,0.18);
      display:flex; align-items:center; gap:8px;
      font-family:'DM Sans',sans-serif; animation:fadeUp 0.3s ease;
      white-space:nowrap;
    }
    .rsa-toast.success { background:#1A0A00; color:#fff; }
    .rsa-toast.error   { background:#DC2626; color:#fff; }

    /* ── Badge ── */
    .rsa-badge {
      display:inline-block; border-radius:50px; padding:3px 10px;
      font-size:11px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase;
    }

    /* ── Skeleton ── */
    .rsa-skeleton {
      background:linear-gradient(90deg,#f0e8e0 25%,#faf4ef 50%,#f0e8e0 75%);
      background-size:500px 100%; animation:shimmer 1.4s infinite; border-radius:8px;
    }

    /* ── Login card ── */
    .rsa-login-card {
      background:#fff; border-radius:24px; padding:40px;
      box-shadow:0 8px 48px rgba(232,98,26,0.12);
      border:1.5px solid #F0E4D8; width:100%; max-width:420px;
      animation:popIn 0.4s ease;
    }

    /* ── Spinner ── */
    .rsa-spinner {
      width:18px; height:18px; border-radius:50%;
      border:2px solid rgba(255,255,255,0.35); border-top-color:#fff;
      animation:spin 0.7s linear infinite; flex-shrink:0;
    }

    @media(max-width:768px) {
      .rsa-sidebar { width:64px; }
      .rsa-sidebar-logo span, .rsa-nav-item span { display:none; }
      .rsa-main { flex:1; }
      .rsa-content { padding:16px; }
    }
  `;
  document.head.appendChild(style);
};

/* ─── Image helper ─── */
function imgSrc(image) {
  if (!image) return null;
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `http://localhost:5000/uploads/${image}`;
}

/* ─── Toast ─── */
function Toast({ msg, type }) {
  if (!msg) return null;
  return <div className={`rsa-toast ${type}`}>{type === 'success' ? '✅' : '⚠️'} {msg}</div>;
}

/* ─── Confirm Dialog ─── */
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="rsa-modal-backdrop">
      <div className="rsa-confirm">
        <div style={{ fontSize:44, marginBottom:16 }}>🗑️</div>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:'#1A0A00', marginBottom:10 }}>Delete Product?</h3>
        <p style={{ color:'#9A8070', fontSize:14, lineHeight:1.6, marginBottom:28 }}>{message}</p>
        <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
          <button className="rsa-btn-ghost" onClick={onCancel} style={{ flex:1 }}>Cancel</button>
          <button className="rsa-btn-primary" onClick={onConfirm} style={{ flex:1, background:'linear-gradient(135deg,#EF4444,#DC2626)', boxShadow:'0 3px 14px rgba(220,38,38,0.3)' }}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Image Dropzone ─── */
function Dropzone({ value, onChange, required }) {
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    onChange(file);
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`rsa-dropzone ${drag ? 'drag' : ''} ${value ? 'has-file' : ''}`}
      onClick={() => inputRef.current.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
    >
      <input ref={inputRef} type="file" accept="image/*" style={{ display:'none' }}
        required={required} onChange={e => handleFile(e.target.files[0])} />
      {preview ? (
        <div>
          <img src={preview} alt="preview" style={{ width:100, height:80, objectFit:'cover', borderRadius:10, margin:'0 auto 10px', display:'block' }} />
          <p style={{ fontSize:13, color:'#22C55E', fontWeight:600 }}>✓ {value.name}</p>
          <p style={{ fontSize:11, color:'#9A8070', marginTop:4 }}>Click to change</p>
        </div>
      ) : (
        <div>
          <div style={{ fontSize:36, marginBottom:10 }}>📸</div>
          <p style={{ fontSize:14, fontWeight:600, color:'#4A3728', marginBottom:4 }}>Drop image here or click to browse</p>
          <p style={{ fontSize:12, color:'#C8B8A8' }}>PNG, JPG, WEBP up to 10MB</p>
        </div>
      )}
    </div>
  );
}

/* ─── Product Form Modal ─── */
function ProductModal({ product, onClose, onSave }) {
  const [form, setForm]     = useState({ name: product?.name || '', price: product?.price || '', description: product?.description || '', image: null });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name = 'Required';
    if (!form.price || form.price <= 0) e.price = 'Enter a valid price';
    if (!form.description.trim()) e.description = 'Required';
    if (!product && !form.image)  e.image = 'Image required for new product';
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('price', form.price);
    fd.append('description', form.description);
    if (form.image) fd.append('image', form.image);
    try {
      const url    = product ? `http://localhost:5000/api/products/${product._id}` : 'http://localhost:5000/api/products';
      const method = product ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, body: fd });
      if (res.ok) { onSave(product ? 'updated' : 'added'); }
      else        { onSave(null, 'Failed to save product'); }
    } catch { onSave(null, 'Network error'); }
    setLoading(false);
  };

  const field = (name, label, type = 'text', opts = {}) => (
    <div className="rsa-field">
      <label className="rsa-label">{label}{opts.required !== false && ' *'}</label>
      <input className={`rsa-input ${errors[name] ? 'error' : ''}`} type={type}
        value={form[name]} placeholder={opts.placeholder || ''}
        onChange={e => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: null }); }}
        {...(type === 'number' ? { min:0, step:'0.01' } : {})} />
      {errors[name] && <p style={{ fontSize:12, color:'#EF4444', marginTop:4 }}>{errors[name]}</p>}
    </div>
  );

  return (
    <div className="rsa-modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="rsa-modal">
        <div className="rsa-modal-header">
          <div>
            <p style={{ fontSize:11, color:'#C8B8A8', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4 }}>{product ? 'Edit' : 'New'} Product</p>
            <h2 className="rsa-title" style={{ fontSize:24, color:'#1A0A00', margin:0 }}>{product ? `Editing: ${product.name}` : 'Add Product'}</h2>
          </div>
          <button className="rsa-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="rsa-modal-body">
          {field('name', 'Product Name', 'text', { placeholder:'e.g. Masala Peanuts' })}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {field('price', 'Price (₹)', 'number', { placeholder:'0.00' })}
            <div className="rsa-field">
              <label className="rsa-label">Category</label>
              <select className="rsa-input" style={{ cursor:'pointer' }}
                value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="">Select category</option>
                {['Nuts','Sev','Mixture','Dal','Snack'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="rsa-field">
            <label className="rsa-label">Description *</label>
            <textarea className={`rsa-input rsa-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Describe the product..." value={form.description}
              onChange={e => { setForm({ ...form, description: e.target.value }); setErrors({ ...errors, description: null }); }} />
            {errors.description && <p style={{ fontSize:12, color:'#EF4444', marginTop:4 }}>{errors.description}</p>}
          </div>
          <div className="rsa-field">
            <label className="rsa-label">Product Image {!product && '*'}</label>
            <Dropzone value={form.image} onChange={img => { setForm({ ...form, image: img }); setErrors({ ...errors, image: null }); }} required={!product} />
            {product && <p style={{ fontSize:12, color:'#C8B8A8', marginTop:8 }}>Leave empty to keep existing image</p>}
            {errors.image && <p style={{ fontSize:12, color:'#EF4444', marginTop:4 }}>{errors.image}</p>}
          </div>
          <div style={{ display:'flex', gap:12, marginTop:8 }}>
            <button className="rsa-btn-ghost" onClick={onClose} style={{ flex:1 }}>Cancel</button>
            <button className="rsa-btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex:2 }}>
              {loading ? <><span className="rsa-spinner" /> Saving...</> : <>{product ? '✓ Update Product' : '+ Add Product'}</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════ MAIN ══════════════════════ */
const Admin = () => {
  const [auth, setAuth]         = useState(false);
  const [creds, setCreds]       = useState({ username:'', password:'' });
  const [loginErr, setLoginErr] = useState('');
  const [loginLoad, setLoginLoad] = useState(false);

  const [products, setProducts] = useState([]);
  const [prodLoad, setProdLoad] = useState(false);
  const [search, setSearch]     = useState('');
  const [activeTab, setActiveTab] = useState('products');

  const [modal, setModal]     = useState(null); // null | { mode: 'add'|'edit', product? }
  const [confirm, setConfirm] = useState(null); // null | { id, name }
  const [toast, setToast]     = useState(null); // null | { msg, type }
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    if (localStorage.getItem('adminToken')) { setAuth(true); loadProducts(); }
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Auth ── */
  const handleLogin = async (e) => {
    e.preventDefault(); setLoginErr(''); setLoginLoad(true);
    try {
      const res  = await fetch('http://localhost:5000/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(creds) });
      const data = await res.json();
      if (data.success) { localStorage.setItem('adminToken', data.token); setAuth(true); loadProducts(); }
      else { setLoginErr('Invalid username or password'); }
    } catch { setLoginErr('Connection failed. Is the server running?'); }
    setLoginLoad(false);
  };

  const handleLogout = () => { localStorage.removeItem('adminToken'); setAuth(false); setProducts([]); };

  /* ── Products ── */
  const loadProducts = async () => {
    setProdLoad(true);
    try {
      const res  = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch { showToast('Failed to load products', 'error'); }
    setProdLoad(false);
  };

  const handleSave = async (result, errMsg) => {
    setModal(null);
    if (result) { await loadProducts(); showToast(`Product ${result} successfully!`); }
    else        { showToast(errMsg || 'Save failed', 'error'); }
  };

  const handleDelete = async () => {
    if (!confirm) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${confirm.id}`, { method:'DELETE' });
      if (res.ok) { await loadProducts(); showToast('Product deleted.'); }
      else        { showToast('Delete failed', 'error'); }
    } catch { showToast('Network error', 'error'); }
    setConfirm(null);
  };

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = products.reduce((s, p) => s + Number(p.price || 0), 0);

  /* ══ LOGIN SCREEN ══ */
  if (!auth) return (
    <div className="rsa-body" style={{ position:'fixed', inset:0, zIndex:1001, overflowY:'auto', display:'flex', alignItems:'center', justifyContent:'center', padding:24,
      background:'linear-gradient(145deg,#BF4E0C,#E8621A,#F97C35)' }}>
      <div className="rsa-login-card">
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:60, height:60, borderRadius:18, background:'linear-gradient(135deg,#F97C35,#C14E0E)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, margin:'0 auto 16px', boxShadow:'0 6px 20px rgba(232,98,26,0.4)' }}>🥜</div>
          <h1 className="rsa-title" style={{ fontSize:28, color:'#1A0A00', marginBottom:6 }}>Admin Panel</h1>
          <p style={{ color:'#9A8070', fontSize:14 }}>Raja Snacks Management</p>
        </div>

        {loginErr && (
          <div style={{ background:'#FEF2F2', border:'1.5px solid #FECACA', borderRadius:12, padding:'10px 14px', marginBottom:20, color:'#DC2626', fontSize:13, display:'flex', alignItems:'center', gap:8 }}>
            ⚠️ {loginErr}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="rsa-field">
            <label className="rsa-label">Username</label>
            <input className="rsa-input" placeholder="admin" value={creds.username}
              onChange={e => setCreds({ ...creds, username: e.target.value })} required />
          </div>
          <div className="rsa-field">
            <label className="rsa-label">Password</label>
            <input className="rsa-input" type="password" placeholder="••••••••" value={creds.password}
              onChange={e => setCreds({ ...creds, password: e.target.value })} required />
          </div>
          <button type="submit" className="rsa-btn-primary" disabled={loginLoad}
            style={{ width:'100%', justifyContent:'center', marginTop:8, padding:'14px' }}>
            {loginLoad ? <><span className="rsa-spinner" /> Signing in...</> : 'Sign In →'}
          </button>
        </form>
      </div>
      <Toast msg={toast?.msg} type={toast?.type} />
    </div>
  );

  /* ══ DASHBOARD ══ */
  return (
    <div className="rsa-body" style={{ position:'fixed', inset:0, zIndex:1001, display:'flex', flexDirection:'row', overflow:'hidden' }}>

      {/* ── Sidebar ── */}
      <aside className="rsa-sidebar">
        <div className="rsa-sidebar-logo">
          <div className="rsa-sidebar-icon">🥜</div>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:800, color:'#fff' }}>Raja Snacks</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase' }}>Admin Panel</div>
          </div>
        </div>
        <nav style={{ flex:1, padding:'16px 0' }}>
          {[
            { id:'dashboard', icon:'📊', label:'Dashboard' },
            { id:'products',  icon:'📦', label:'Products'  },
          ].map(item => (
            <button key={item.id} className={`rsa-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}>
              <span className="rsa-nav-item-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding:'16px 12px 24px' }}>
          <button className="rsa-nav-item" onClick={handleLogout} style={{ color:'rgba(239,68,68,0.8)', width:'100%' }}>
            <span className="rsa-nav-item-icon" style={{ background:'rgba(239,68,68,0.1)' }}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="rsa-main">

        {/* Topbar */}
        <div className="rsa-topbar">
          <div>
            <h2 className="rsa-title" style={{ fontSize:20, color:'#1A0A00', margin:0 }}>
              {activeTab === 'dashboard' ? 'Dashboard' : 'Products'}
            </h2>
            <p style={{ fontSize:12, color:'#C8B8A8', margin:0 }}>
              {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
            </p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#F97C35,#C14E0E)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:14 }}>A</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'#1A0A00' }}>Admin</div>
              <div style={{ fontSize:11, color:'#C8B8A8' }}>Super Admin</div>
            </div>
          </div>
        </div>

        <div className="rsa-content">

          {/* ── DASHBOARD TAB ── */}
          {activeTab === 'dashboard' && (
            <div style={{ animation:'fadeUp 0.4s ease' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:20, marginBottom:32 }}>
                {[
                  { icon:'📦', label:'Total Products',  value: products.length,               color:'#E8621A', bg:'#FFF0E6' },
                  { icon:'💰', label:'Avg. Price (₹)',   value:`₹${products.length ? Math.round(totalValue/products.length) : 0}`, color:'#7C3AED', bg:'#EDE9FE' },
                  { icon:'⭐', label:'Avg. Rating',      value:'4.8 / 5',                      color:'#D97706', bg:'#FEF3C7' },
                  { icon:'🚚', label:'Delivery Cities',  value:'500+',                         color:'#059669', bg:'#D1FAE5' },
                ].map((s, i) => (
                  <div key={s.label} className="rsa-stat-card" style={{ animationDelay:`${i*80}ms` }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, marginBottom:14 }}>{s.icon}</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:800, color:s.color, lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontSize:12, color:'#9A8070', marginTop:6, fontWeight:500 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent products preview */}
              <div className="rsa-table-wrap">
                <div style={{ padding:'20px 24px', borderBottom:'1.5px solid #F0E4D8', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <h3 className="rsa-title" style={{ fontSize:18, color:'#1A0A00', margin:0 }}>Recent Products</h3>
                  <button className="rsa-btn-primary" onClick={() => setActiveTab('products')} style={{ padding:'8px 18px', fontSize:13 }}>View All →</button>
                </div>
                <table className="rsa-table">
                  <thead><tr><th>Product</th><th>Price</th><th>Actions</th></tr></thead>
                  <tbody>
                    {products.slice(0, 5).map((p, i) => (
                      <tr key={p._id} style={{ animationDelay:`${i*50}ms` }}>
                        <td>
                          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                            <div style={{ width:42, height:42, borderRadius:10, overflow:'hidden', background:'#FFF0E6', flexShrink:0 }}>
                              {imgErrors[p._id] || !p.image
                                ? <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🍿</div>
                                : <img src={imgSrc(p.image)} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={() => setImgErrors(e => ({ ...e, [p._id]: true }))} />}
                            </div>
                            <div style={{ fontWeight:600, fontSize:14 }}>{p.name}</div>
                          </div>
                        </td>
                        <td><span style={{ fontWeight:700, color:'#E8621A' }}>₹{p.price}</span></td>
                        <td>
                          <div style={{ display:'flex', gap:8 }}>
                            <button className="rsa-btn-edit" onClick={() => setModal({ mode:'edit', product:p })}>Edit</button>
                            <button className="rsa-btn-danger" onClick={() => setConfirm({ id:p._id, name:p.name })}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {products.length === 0 && <div style={{ textAlign:'center', padding:'48px 20px', color:'#C8B8A8', fontSize:15 }}>No products yet. <button style={{ color:'var(--saffron)', fontWeight:700, background:'none', border:'none', cursor:'pointer' }} onClick={() => setModal({ mode:'add' })}>Add your first →</button></div>}
              </div>
            </div>
          )}

          {/* ── PRODUCTS TAB ── */}
          {activeTab === 'products' && (
            <div style={{ animation:'fadeUp 0.4s ease' }}>
              {/* Toolbar */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, gap:16, flexWrap:'wrap' }}>
                <div style={{ position:'relative', flex:1, maxWidth:320 }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, pointerEvents:'none' }}>🔍</span>
                  <input style={{ width:'100%', border:'1.5px solid #E8D8CC', borderRadius:50, padding:'10px 16px 10px 42px', fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:'none', color:'#1A0A00', background:'#fff', transition:'border-color 0.2s' }}
                    placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
                    onFocus={e => e.target.style.borderColor='#E8621A'} onBlur={e => e.target.style.borderColor='#E8D8CC'} />
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:13, color:'#9A8070' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
                  <button className="rsa-btn-primary" onClick={() => setModal({ mode:'add' })}>
                    + Add Product
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="rsa-table-wrap">
                {prodLoad ? (
                  <div style={{ padding:32 }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{ display:'flex', gap:16, marginBottom:20, alignItems:'center' }}>
                        <div className="rsa-skeleton" style={{ width:48, height:48, borderRadius:12 }} />
                        <div style={{ flex:1 }}>
                          <div className="rsa-skeleton" style={{ height:14, width:'40%', marginBottom:8 }} />
                          <div className="rsa-skeleton" style={{ height:12, width:'70%' }} />
                        </div>
                        <div className="rsa-skeleton" style={{ width:60, height:14 }} />
                      </div>
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'60px 20px' }}>
                    <div style={{ fontSize:48, marginBottom:12 }}>{search ? '🔍' : '📦'}</div>
                    <p style={{ color:'#9A8070', fontSize:15, marginBottom:16 }}>{search ? `No products matching "${search}"` : 'No products yet'}</p>
                    {!search && <button className="rsa-btn-primary" onClick={() => setModal({ mode:'add' })}>+ Add First Product</button>}
                  </div>
                ) : (
                  <table className="rsa-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p, i) => (
                        <tr key={p._id} style={{ animationDelay:`${i*40}ms` }}>
                          <td>
                            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                              <div style={{ width:52, height:48, borderRadius:12, overflow:'hidden', background:'#FFF0E6', flexShrink:0 }}>
                                {imgErrors[p._id] || !p.image
                                  ? <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>🍿</div>
                                  : <img src={imgSrc(p.image)} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}
                                      onError={() => setImgErrors(e => ({ ...e, [p._id]:true }))} />}
                              </div>
                              <div>
                                <div style={{ fontWeight:700, fontSize:14, color:'#1A0A00' }}>{p.name}</div>
                                <div style={{ fontSize:11, color:'#C8B8A8', marginTop:2 }}>ID: {p._id?.slice(-6)}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="rsa-badge" style={{ background:'#FFF0E6', color:'#E8621A' }}>
                              {p.category || 'Snack'}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontWeight:700, color:'#E8621A', fontSize:15 }}>₹{p.price}</div>
                          </td>
                          <td>
                            <div style={{ maxWidth:240, fontSize:13, color:'#7A6358', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                              {p.description}
                            </div>
                          </td>
                          <td>
                            <div style={{ display:'flex', gap:8 }}>
                              <button className="rsa-btn-edit" onClick={() => setModal({ mode:'edit', product:p })}>✏️ Edit</button>
                              <button className="rsa-btn-danger" onClick={() => setConfirm({ id:p._id, name:p.name })}>🗑️ Del</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Product Modal ── */}
      {modal && (
        <ProductModal
          product={modal.product}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* ── Confirm Delete ── */}
      {confirm && (
        <ConfirmDialog
          message={`"${confirm.name}" will be permanently removed from your catalogue.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
};

export default Admin;