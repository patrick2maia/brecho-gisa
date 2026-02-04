import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  ShoppingBag, User, X, Trash2, Lock, 
  Settings, QrCode, UserPlus, Camera, Smartphone, Eye
} from 'lucide-react';

/**
 * SISTEMA OPERACIONAL BRECHÓ DA GISA
 * Analista de Sistemas: Patrick (Operador Root)
 * Assistente IA: Jack (Suporte Técnico)
 */
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [view, setView] = useState('store'); 
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Base de Dados Original
  const [products, setProducts] = useState([
    { id: '1', title: 'VESTIDO MIDI SEDA', price: 189.0, originalPrice: 280.0, images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'], inStock: true },
    { id: '2', title: 'BLAZER ALFAIATARIA', price: 145.9, originalPrice: null, images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'], inStock: true },
    { id: '3', title: 'JEANS LEVIS 501', price: 220.0, originalPrice: 350.0, images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'], inStock: true },
    { id: '4', title: 'CAMISA LINHO CRU', price: 89.0, originalPrice: 150.0, images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800'], inStock: true }
  ]);

  const [cart, setCart] = useState([]);
  const [leadData, setLeadData] = useState({ name: '', whatsapp: '', photo: null });
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (p) => {
    setCart([...cart, { ...p, cartId: Date.now() }]);
    setIsCartOpen(true);
    showToast("Adicionado à sacola!");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.cartId !== id));
    showToast("Removido com sucesso");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLeadData({...leadData, photo: reader.result});
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    if(password === 'gisa2024') {
      setIsAdmin(true); setShowLogin(false); setView('admin'); setPassword('');
      showToast("Gestão Ativada");
    } else { showToast("PIN Incorreto"); }
  };

  const cartTotal = useMemo(() => cart.reduce((acc, i) => acc + i.price, 0), [cart]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-50">
      {/* Sistema de Toasts */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900 text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-widest shadow-2xl font-bold border border-slate-700 animate-in fade-in zoom-in-95">
          {notification}
        </div>
      )}

      {/* Header Montserrat */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-[100] border-b border-slate-50 font-sans">
        <div className="flex justify-between items-center px-6 md:px-16 py-6">
          <button onClick={() => setShowQR(true)} className="p-2 hover:bg-slate-50 rounded-full transition-all">
            <QrCode size={20} />
          </button>
          <div className="text-center flex flex-col items-center flex-1 cursor-pointer" onClick={() => setView('store')}>
            <h1 className="text-xl md:text-3xl font-serif uppercase text-black tracking-[0.3em]" style={{fontFamily: 'Playfair Display'}}>Brechó da Gisa</h1>
            <div className="h-[1.5px] w-8 bg-black mt-2"></div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowRegister(true)} className="hidden sm:flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-indigo-600 border border-indigo-100 px-5 py-2.5 rounded-full hover:bg-indigo-100 transition-all">
              <UserPlus size={14} /> Cadastro VIP
            </button>
            <button onClick={() => isAdmin ? setView('admin') : setShowLogin(true)} className="p-2 transition-transform hover:scale-110">
              <Settings size={20} className={isAdmin ? 'text-indigo-600' : ''} />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="p-2 relative transition-transform hover:scale-110">
              <ShoppingBag size={20} />
              {cart.length > 0 && <span className="absolute top-0 right-0 bg-black text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">{cart.length}</span>}
            </button>
          </div>
        </div>
        <nav className="flex justify-center items-center py-4 border-t border-slate-50 gap-10 md:gap-16 overflow-x-auto no-scrollbar px-4 font-sans uppercase font-bold text-[10px]">
          {['Vitrine', 'Vestidos', 'Casacos', 'Calças'].map(c => (
            <button key={c} className="tracking-widest text-slate-500 hover:text-indigo-600 transition-colors whitespace-nowrap">{c}</button>
          ))}
        </nav>
      </header>

      <div className="h-44"></div>

      {/* Vitrine Digital */}
      {view === 'store' && (
        <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 animate-in fade-in duration-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-20 text-left">
            {products.map(p => (
              <div key={p.id} className="group relative">
                <div className="relative aspect-[3/4] w-full bg-slate-50 overflow-hidden mb-6 rounded-sm shadow-sm transition-shadow hover:shadow-xl border border-slate-100">
                  <img src={p.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <button onClick={() => addToCart(p)} className="w-full bg-white text-black py-4 text-[9px] uppercase font-black hover:bg-black hover:text-white transition-all shadow-xl">Por na sacola</button>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-[11px] uppercase font-bold text-slate-400 group-hover:text-black transition-colors font-sans">{p.title}</h3>
                  <span className="text-sm font-bold text-black tracking-tight italic font-serif">R$ {p.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Gestão do Site */}
      {view === 'admin' && (
        <main className="max-w-6xl mx-auto px-6 py-16 animate-in fade-in text-left">
          <div className="flex items-center justify-between mb-12 border-b pb-8">
            <div className="text-left font-sans">
              <h2 className="text-2xl font-serif uppercase tracking-widest text-black font-bold">Gestão do Site</h2>
              <p className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-widest italic font-sans">Analista Patrick // IA Jack</p>
            </div>
            <button onClick={() => setView('store')} className="text-[10px] font-black uppercase border-2 border-black px-10 py-3 rounded-full hover:bg-black hover:text-white transition-all font-sans">Vitrine</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 h-fit font-sans text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-8 flex items-center justify-center gap-2 underline underline-offset-4 font-bold">Nova Peça</p>
              <div className="space-y-6">
                <label className="flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-indigo-400 transition-all overflow-hidden relative group">
                  <Camera size={32} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-3">Adicionar Foto</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
                <input className="w-full bg-white border-none rounded-xl p-5 text-sm shadow-sm outline-none focus:ring-1 ring-indigo-200" placeholder="Nome do Produto" />
                <button className="w-full bg-black text-white py-6 rounded-2xl text-[10px] uppercase font-black hover:bg-indigo-600 transition-all shadow-xl font-bold">Publicar</button>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4 font-bold text-[10px] uppercase text-slate-300 tracking-widest font-sans">
              Inventário ({products.length})
              {products.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm">
                   <div className="flex gap-6 items-center">
                    <img src={p.images[0]} className="w-16 h-20 object-cover rounded-xl" />
                    <p className="text-black font-sans lowercase first-letter:uppercase">{p.title}</p>
                   </div>
                   <button className="p-4 rounded-full text-slate-300 hover:text-rose-500 transition-all border border-transparent hover:border-rose-100"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Cadastro VIP (Compacto com Foto e Botão X) */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/80 z-[500] flex items-center justify-center p-6 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-[4rem] p-12 text-center relative shadow-2xl border border-slate-100 font-sans">
            <button onClick={() => setShowRegister(false)} className="absolute top-8 right-8 text-slate-300 hover:text-black transition-colors"><X size={24} /></button>
            <div className="flex flex-col items-center mb-8">
              <label className="cursor-pointer group relative">
                <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden border-2 border-slate-100 group-hover:border-indigo-400 transition-all">
                  {leadData.photo ? <img src={leadData.photo} className="w-full h-full object-cover" /> : <User size={40} className="text-slate-200" />}
                </div>
                <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-slate-50 text-indigo-500"><Camera size={14} /></div>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
              <p className="text-[8px] font-black text-slate-300 uppercase mt-4 tracking-widest">Sua Foto VIP</p>
            </div>
            <h2 className="text-2xl font-serif mb-2 uppercase tracking-widest font-bold text-black">Seja VIP</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowRegister(false); showToast("Inscrita no Clube!"); }}>
              <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-sm outline-none focus:ring-1 ring-indigo-200 shadow-inner font-semibold uppercase tracking-widest" placeholder="NOME" required />
              <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-sm outline-none focus:ring-1 ring-indigo-200 shadow-inner font-semibold" placeholder="(DDD) WHATSAPP" required />
              <button type="submit" className="w-full bg-black text-white py-5 rounded-3xl text-[10px] uppercase font-black tracking-widest hover:bg-indigo-600 transition-all shadow-xl font-bold">Ativar</button>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal (Compacto com Botão X) */}
      {showQR && (
        <div className="fixed inset-0 bg-black/95 z-[500] flex items-center justify-center p-6 backdrop-blur-2xl animate-in zoom-in-95 duration-300">
          <div className="bg-white w-full max-w-sm rounded-[4rem] p-12 text-center relative shadow-2xl border border-slate-100 font-sans">
            <button onClick={() => setShowQR(false)} className="absolute top-8 right-8 text-slate-300 hover:text-black transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-serif uppercase tracking-widest mb-10 font-bold text-black">Acesso Rápido</h2>
            <div className="aspect-square bg-white border p-8 rounded-[3.5rem] shadow-2xl mb-12 flex items-center justify-center overflow-hidden">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(currentUrl)}`} className="w-full h-auto rounded-3xl" />
            </div>
            <button onClick={() => { navigator.clipboard.writeText(currentUrl); showToast("Link Copiado!"); }} className="text-[10px] font-black uppercase underline underline-offset-8 transition-colors hover:text-indigo-600 font-sans">Copiar Link da Loja</button>
          </div>
        </div>
      )}

      {/* Sacola com Lixeira Operacional e Botão X */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200]" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col slide-in-from-right transition-transform duration-300 font-sans border-l border-slate-50">
            <div className="p-10 flex justify-between items-center border-b text-black font-serif">
              <h2 className="text-xl font-serif uppercase tracking-widest font-bold">Minha Sacola</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 transition-transform hover:rotate-90"><X size={24} className="text-slate-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              {cart.length === 0 ? (
                <div className="py-40 text-center opacity-20"><ShoppingBag size={48} className="mx-auto mb-4" /><p className="text-[10px] font-bold uppercase tracking-widest">Vazia</p></div>
              ) : (
                cart.map((i, idx) => (
                  <div key={idx} className="flex gap-6 bg-slate-50 p-5 rounded-[2rem] relative border border-slate-100 animate-in fade-in">
                    <img src={i.images[0]} className="w-20 h-24 object-cover rounded-2xl shadow-sm" alt="" />
                    <div className="flex-1 text-left">
                      <h4 className="text-[11px] font-bold uppercase text-black mb-1 font-sans">{i.title}</h4>
                      <p className="text-sm font-serif italic text-indigo-600 font-extrabold tracking-tight">R$ {i.price.toFixed(2)}</p>
                      {/* LIXEIRA DE REMOÇÃO */}
                      <button onClick={() => removeFromCart(i.cartId)} className="absolute bottom-4 right-4 p-3 bg-white text-slate-300 hover:text-rose-500 transition-all rounded-full shadow-sm hover:shadow-md border border-slate-50">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-10 border-t bg-slate-50/50 font-sans">
                <div className="flex justify-between items-center mb-10 text-[10px] font-bold uppercase tracking-widest text-black"><span>Subtotal</span><span className="text-2xl font-black italic">R$ {cartTotal.toFixed(2)}</span></div>
                <button className="w-full bg-black text-white py-8 rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-xl transition-all font-bold">Checkout</button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Administração (Login) */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/95 z-[600] flex items-center justify-center p-6 backdrop-blur-3xl fade-in">
          <div className="bg-white w-full max-w-sm rounded-[4rem] p-16 text-center relative shadow-2xl border border-slate-100 font-sans">
            <button onClick={() => setShowLogin(false)} className="absolute top-8 right-8 text-slate-300 hover:text-black transition-colors"><X size={24} /></button>
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-10 text-indigo-500 border border-indigo-100 shadow-xl"><Lock size={32} /></div>
            <h2 className="text-2xl font-serif mb-4 text-black uppercase tracking-widest font-bold leading-tight">Administração</h2>
            <input type="password" placeholder="PIN" className="w-full bg-slate-50 border-none rounded-[1.5rem] px-8 py-8 mb-8 text-center text-3xl tracking-[1.5em] font-black outline-none focus:ring-1 ring-indigo-200 text-black shadow-inner font-sans" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleLogin()} />
            <button onClick={handleLogin} className="w-full bg-black text-white py-7 rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl active:scale-95 font-bold">Entrar</button>
          </div>
        </div>
      )}

      {/* Footer Assinado Jack @2026 */}
      <footer className="py-40 border-t bg-slate-50/20 text-center px-8 font-sans">
        <h3 className="text-3xl md:text-5xl font-serif uppercase tracking-[0.8em] mb-20 text-black opacity-80 select-none">Brechó da Gisa</h3>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-[10px] font-bold uppercase text-slate-400 mb-28 tracking-widest">
           <button onClick={() => isAdmin ? setView('admin') : setShowLogin(true)} className="hover:text-indigo-600 font-bold border-b border-indigo-100 pb-1 uppercase tracking-widest">Gestão</button>
        </div>
        <div className="space-y-4">
          <div className="w-32 h-[1px] bg-slate-200 mx-auto opacity-40"></div>
          <p className="text-[12px] text-slate-400 uppercase tracking-[0.6em] font-extrabold italic select-none">
            spbr/ IA jack @ 2026
          </p>
          <p className="text-[8px] text-slate-300 uppercase tracking-[1.2em] font-light tracking-tighter opacity-50 select-none italic font-sans uppercase">Engineering // Systems Analysis</p>
        </div>
      </footer>
    </div>
  );
};

// Ponto de entrada padrão para React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);