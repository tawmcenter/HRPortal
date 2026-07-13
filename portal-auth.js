/**
 * WM Center HR Portal — shared auth helper.
 * Dipakai oleh ta.html, referral.html, coaching.html.
 * Butuh variabel global PORTAL_SCRIPT_URL dan PORTAL_CLIENT_ID sudah didefinisikan
 * SEBELUM file ini di-load.
 */
const WMAuth = (function () {
  const TOKEN_KEY = 'wm_portal_id_token';
  const EMAIL_KEY = 'wm_portal_email';

  function getToken() { return sessionStorage.getItem(TOKEN_KEY) || ''; }
  function getEmail() { return sessionStorage.getItem(EMAIL_KEY) || ''; }
  function isLoggedIn() { return !!getToken(); }

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EMAIL_KEY);
  }

  /** Verifikasi token ke backend (cek allowlist). Return {ok, email, error} */
  async function verify(idToken) {
    const url = PORTAL_SCRIPT_URL + '?module=auth&action=verify&idToken=' + encodeURIComponent(idToken);
    const r = await fetch(url);
    const j = await r.json();
    if (j.ok) {
      sessionStorage.setItem(TOKEN_KEY, idToken);
      sessionStorage.setItem(EMAIL_KEY, j.email);
    }
    return j;
  }

  /** Render tombol "Sign in with Google" ke dalam elemen target. */
  function renderButton(elId, onSuccess, onError) {
    if (typeof google === 'undefined') {
      console.error('Google Identity Services belum ter-load. Cek koneksi / script tag.');
      return;
    }
    google.accounts.id.initialize({
      client_id: PORTAL_CLIENT_ID,
      callback: async (resp) => {
        const result = await verify(resp.credential);
        if (result.ok) onSuccess(result.email);
        else onError(result.error || 'Akses ditolak');
      },
    });
    google.accounts.id.renderButton(
      document.getElementById(elId),
      { theme: 'outline', size: 'large', width: 320, text: 'signin_with' }
    );
  }

  /** Tambahkan header/param auth ke fetch call admin. */
  function withAuth(paramsObj) {
    return Object.assign({}, paramsObj, { idToken: getToken() });
  }

  return { getToken, getEmail, isLoggedIn, logout, verify, renderButton, withAuth };
})();
