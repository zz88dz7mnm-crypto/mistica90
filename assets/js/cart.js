(() => {
  const STORAGE_KEY = 'mistica90_cart';
  const WHATSAPP_NUMBER = '5493513699837';
  const money = new Intl.NumberFormat('es-AR');

  function parsePrice(value) {
    return Number(String(value || '').replace(/[^\d]/g, '')) || 0;
  }

  function formatPrice(value) {
    return '$' + money.format(value).replace(/,/g, '.');
  }

  function readCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (error) { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderCart();
  }

  function cartTotal(cart) {
    return cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  }

  function cartCount(cart) {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function ensureCartUi() {
    if (document.querySelector('[data-cart-root]')) return;
    const root = document.createElement('div');
    root.setAttribute('data-cart-root', '');
    root.innerHTML = `
      <button class="cart-floating-button" type="button" data-cart-open aria-label="Abrir carrito">
        <span class="material-symbols-outlined" aria-hidden="true">shopping_bag</span>
        <span class="cart-floating-count" data-cart-count>0</span>
      </button>
      <div class="cart-overlay" data-cart-overlay hidden>
        <aside class="cart-panel" aria-label="Carrito de compras">
          <div class="cart-panel-header">
            <div><p class="cart-kicker">Carrito</p><h2>Tu pedido</h2></div>
            <button class="cart-icon-button" type="button" data-cart-close aria-label="Cerrar carrito"><span class="material-symbols-outlined" aria-hidden="true">close</span></button>
          </div>
          <div class="cart-items" data-cart-items></div>
          <div class="cart-footer">
            <div class="cart-total-row"><span>Total</span><strong data-cart-total>$0</strong></div>
            <button class="cart-order-button" type="button" data-order-start>Hacer pedido</button>
          </div>
        </aside>
      </div>
      <div class="cart-name-modal" data-name-modal hidden>
        <form class="cart-name-card" data-name-form>
          <button class="cart-icon-button cart-name-close" type="button" data-name-close aria-label="Cerrar"><span class="material-symbols-outlined" aria-hidden="true">close</span></button>
          <p class="cart-kicker">Pedido por WhatsApp</p>
          <h2>Ingresá tu nombre</h2>
          <input data-customer-name name="customerName" autocomplete="name" placeholder="Tu nombre" required />
          <button class="cart-order-button" type="submit">Hacer pedido</button>
        </form>
      </div>`;
    document.body.appendChild(root);
    document.querySelector('[data-cart-open]').addEventListener('click', openCart);
    document.querySelector('[data-cart-close]').addEventListener('click', closeCart);
    document.querySelector('[data-cart-overlay]').addEventListener('click', (event) => { if (event.target.matches('[data-cart-overlay]')) closeCart(); });
    document.querySelector('[data-order-start]').addEventListener('click', openNameModal);
    document.querySelector('[data-name-close]').addEventListener('click', closeNameModal);
    document.querySelector('[data-name-modal]').addEventListener('click', (event) => { if (event.target.matches('[data-name-modal]')) closeNameModal(); });
    document.querySelector('[data-name-form]').addEventListener('submit', submitOrder);
  }

  function injectStyles() {
    if (document.querySelector('#mistica-cart-styles')) return;
    const style = document.createElement('style');
    style.id = 'mistica-cart-styles';
    style.textContent = `
      .cart-floating-button{position:fixed;right:24px;bottom:104px;z-index:70;width:64px;height:64px;border:0;border-radius:9999px;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 16px 44px rgba(0,0,0,.22);cursor:pointer;transition:transform 180ms ease,background 180ms ease}.cart-floating-button:hover{transform:scale(1.04);background:#236391}.cart-floating-count{position:absolute;top:-4px;right:-4px;min-width:24px;height:24px;border-radius:9999px;background:#91c9fe;color:#0b5583;font:700 12px/24px Inter,sans-serif;text-align:center;padding:0 6px}.cart-overlay,.cart-name-modal{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.38);backdrop-filter:blur(10px)}.cart-overlay[hidden],.cart-name-modal[hidden]{display:none}.cart-panel{position:absolute;top:0;right:0;width:min(100%,420px);height:100%;background:#fff;color:#000;padding:24px;display:flex;flex-direction:column;box-shadow:-18px 0 48px rgba(0,0,0,.16)}.cart-panel-header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding-bottom:20px;border-bottom:1px solid #e5e7eb}.cart-kicker{margin:0 0 8px;color:#4c4546;font:700 11px/1 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase}.cart-panel h2,.cart-name-card h2{margin:0;font:800 32px/1.1 Epilogue,sans-serif;text-transform:uppercase}.cart-icon-button{border:0;border-radius:9999px;width:44px;height:44px;background:#f3f3f4;color:#000;display:flex;align-items:center;justify-content:center;cursor:pointer}.cart-items{flex:1;overflow-y:auto;padding:8px 0}.cart-empty{color:#4c4546;font:400 15px/1.6 Inter,sans-serif;padding:28px 0}.cart-item{display:grid;grid-template-columns:1fr auto auto;gap:12px;padding:18px 0;border-bottom:1px solid #f0f0f0;align-items:start}.cart-item h3{margin:0 0 8px;font:700 15px/1.35 Inter,sans-serif;text-transform:uppercase}.cart-item p{margin:0;color:#4c4546;font:500 13px/1.5 Inter,sans-serif}.cart-item strong{font:800 18px/1 Epilogue,sans-serif;white-space:nowrap}.cart-remove{width:36px;height:36px;border:0;border-radius:9999px;background:#f3f3f4;color:#7e7576;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 180ms ease,color 180ms ease}.cart-remove:hover{background:#000;color:#fff}.cart-remove .material-symbols-outlined{font-size:20px}.cart-footer{border-top:1px solid #e5e7eb;padding-top:20px}.cart-total-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font:700 16px/1 Inter,sans-serif}.cart-total-row strong{font:800 28px/1 Epilogue,sans-serif}.cart-order-button{width:100%;height:56px;border:0;border-radius:9999px;background:#000;color:#fff;font:700 12px/1 Inter,sans-serif;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:background 180ms ease}.cart-order-button:hover{background:#236391}.cart-name-modal{display:flex;align-items:center;justify-content:center;padding:20px}.cart-name-modal[hidden]{display:none}.cart-name-card{position:relative;width:min(100%,420px);background:#fff;border-radius:8px;padding:28px;color:#000;box-shadow:0 22px 60px rgba(0,0,0,.2)}.cart-name-close{position:absolute;top:16px;right:16px}.cart-name-card input{width:100%;height:52px;margin:24px 0 14px;border:1px solid #dadada;border-radius:8px;padding:0 14px;font:500 16px/1 Inter,sans-serif;outline:none}.cart-name-card input:focus{border-color:#000}.cart-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:110;background:#000;color:#fff;border-radius:9999px;padding:12px 18px;font:700 12px/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 16px 44px rgba(0,0,0,.22)}@media (max-width:640px){.cart-floating-button{right:18px;bottom:88px;width:56px;height:56px}.cart-panel{padding:20px}}`;
    document.head.appendChild(style);
  }

  function openCart(){ document.querySelector('[data-cart-overlay]').hidden = false; renderCart(); }
  function closeCart(){ document.querySelector('[data-cart-overlay]').hidden = true; }
  function openNameModal(){ if (!readCart().length){ showToast('El carrito está vacío'); return; } document.querySelector('[data-name-modal]').hidden = false; setTimeout(() => document.querySelector('[data-customer-name]').focus(), 60); }
  function closeNameModal(){ document.querySelector('[data-name-modal]').hidden = true; }

  function renderCart(){
    const cart = readCart();
    const countEl = document.querySelector('[data-cart-count]');
    const itemsEl = document.querySelector('[data-cart-items]');
    const totalEl = document.querySelector('[data-cart-total]');
    if (!countEl || !itemsEl || !totalEl) return;
    countEl.textContent = cartCount(cart);
    totalEl.textContent = formatPrice(cartTotal(cart));
    if (!cart.length){ itemsEl.innerHTML = '<p class="cart-empty">Todavía no agregaste camisetas al carrito.</p>'; return; }
    itemsEl.innerHTML = cart.map((item) => `<div class="cart-item"><div><h3>${escapeHtml(item.name)}</h3><p>Talle: ${escapeHtml(item.size)}${item.quantity > 1 ? ' · Cantidad: ' + item.quantity : ''}</p></div><strong>${formatPrice(item.priceValue * item.quantity)}</strong><button class="cart-remove" type="button" data-cart-remove="${escapeHtml(item.id)}" aria-label="Eliminar ${escapeHtml(item.name)} talle ${escapeHtml(item.size)}"><span class="material-symbols-outlined" aria-hidden="true">delete</span></button></div>`).join('');
    itemsEl.querySelectorAll('[data-cart-remove]').forEach((button) => button.addEventListener('click', () => { saveCart(readCart().filter((item) => item.id !== button.dataset.cartRemove)); showToast('Producto eliminado'); }));
  }

  function addProduct(button){
    const selectedSize = document.querySelector('input[name="size"]:checked');
    const size = selectedSize ? selectedSize.value : 'M';
    const name = button.dataset.productName;
    const price = button.dataset.productPrice;
    const priceValue = parsePrice(price);
    const id = [name, size].join('__').toLowerCase().replace(/s+/g, '-');
    const cart = readCart();
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({ id, name, price, priceValue, size, quantity: 1 });
    saveCart(cart); showToast('Agregado al carrito'); openCart();
  }

  function submitOrder(event){
    event.preventDefault();
    const cart = readCart();
    if (!cart.length){ closeNameModal(); showToast('El carrito está vacío'); return; }
    const customerName = document.querySelector('[data-customer-name]').value.trim();
    if (!customerName) return;
    const products = cart.map((item) => { const quantity = item.quantity > 1 ? ' x' + item.quantity : ''; return `- ${item.name}${quantity} - Talle: ${item.size} - ${formatPrice(item.priceValue * item.quantity)}`; }).join('\n');
    const message = `Hola! Quiero hacer un pedido:\n\nNombre: ${customerName}\n\nProductos:\n${products}\n\nTotal: ${formatPrice(cartTotal(cart))}`;
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function showToast(message){ const current = document.querySelector('.cart-toast'); if (current) current.remove(); const toast = document.createElement('div'); toast.className = 'cart-toast'; toast.textContent = message; document.body.appendChild(toast); setTimeout(() => toast.remove(), 1800); }
  function escapeHtml(value){ return String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
  function wireProductButtons(){ document.querySelectorAll('[data-add-to-cart]').forEach((button) => button.addEventListener('click', () => addProduct(button))); }
  document.addEventListener('DOMContentLoaded', () => { injectStyles(); ensureCartUi(); wireProductButtons(); renderCart(); });
})();