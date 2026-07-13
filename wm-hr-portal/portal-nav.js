/**
 * WM Center HR Portal — strip navigasi bersama.
 * Disisipkan otomatis di paling atas tiap halaman modul (ta.html, referral.html, coaching.html).
 * Tidak mengubah nav/tab internal masing-masing modul — ini cuma lapisan tipis di atasnya.
 */
(function () {
  const CURRENT = document.body.getAttribute('data-portal-page') || '';

  const style = document.createElement('style');
  style.textContent = `
    #portal-strip{position:fixed;top:0;left:0;right:0;height:38px;background:#081D3D;
      display:flex;align-items:center;justify-content:space-between;padding:0 16px;
      font-family:Inter,system-ui,sans-serif;font-size:12.5px;z-index:9999;
      box-shadow:0 1px 0 rgba(255,255,255,.06)}
    #portal-strip a{color:#B7C4DF;text-decoration:none;margin-right:16px;font-weight:500;transition:.15s}
    #portal-strip a:hover{color:#fff}
    #portal-strip a.on{color:#fff;font-weight:700;border-bottom:2px solid #0F766E;padding-bottom:11px}
    #portal-strip .left{display:flex;align-items:center;height:100%}
    #portal-strip .right{display:flex;align-items:center;gap:10px;color:#9FB0CE}
    body{padding-top:38px !important}
  `;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.id = 'portal-strip';
  bar.innerHTML = `
    <div class="left">
      <a href="index.html">🏠 Portal</a>
      <a href="ta.html" class="${CURRENT === 'ta' ? 'on' : ''}">Talent Acquisition</a>
      <a href="referral.html" class="${CURRENT === 'referral' ? 'on' : ''}">Employee Referral</a>
      <a href="coaching.html" class="${CURRENT === 'coaching' ? 'on' : ''}">Coaching &amp; SP</a>
    </div>
    <div class="right" id="portal-strip-user"></div>
  `;
  document.body.prepend(bar);

  function paintUser() {
    const el = document.getElementById('portal-strip-user');
    if (typeof WMAuth !== 'undefined' && WMAuth.isLoggedIn()) {
      el.innerHTML = WMAuth.getEmail() + ' <button id="portal-strip-logout" style="margin-left:8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#fff;padding:3px 9px;border-radius:6px;font-size:11px;cursor:pointer">Keluar</button>';
      document.getElementById('portal-strip-logout').onclick = () => { WMAuth.logout(); location.reload(); };
    } else {
      el.textContent = '';
    }
  }
  // Beri waktu WMAuth ter-load lebih dulu
  setTimeout(paintUser, 0);
  window.addEventListener('wm-auth-changed', paintUser);
})();
