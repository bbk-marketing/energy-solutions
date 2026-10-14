/* Google Analytics 4 con aviso de cookies (Consent Mode v2).
   Para activarlo, pon aquí el ID de medición de tu propiedad (G-XXXXXXXXXX).
   Mientras esté vacío, no se carga nada ni aparece el aviso. */
(function () {
  var GA_ID = "";
  if (!GA_ID) return;

  var KEY = "bbk-cookies";
  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var choice = getChoice();
  gtag("consent", "default", {
    analytics_storage: choice === "granted" ? "granted" : "denied",
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    wait_for_update: 500
  });
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);

  function decide(v) {
    setChoice(v);
    gtag("consent", "update", { analytics_storage: v });
    var b = document.getElementById("cookie-bar");
    if (b) b.remove();
  }

  function showBar() {
    if (document.getElementById("cookie-bar")) return;
    var css = document.createElement("style");
    css.textContent =
      "#cookie-bar{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:50;" +
      "max-width:min(400px,calc(100vw - 32px));background:#0D141C;color:#E8EEF4;border:1px solid rgba(150,185,215,.22);" +
      "border-radius:16px;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.45);font:14px/1.45 'Instrument Sans',system-ui,sans-serif}" +
      "#cookie-bar p{margin:0 0 12px}#cookie-bar a{color:#7FE3FF}" +
      "#cookie-bar .cb-row{display:flex;gap:8px;flex-wrap:wrap}" +
      "#cookie-bar button{flex:1;min-width:120px;min-height:44px;border-radius:999px;font:600 14px 'Instrument Sans',system-ui,sans-serif;cursor:pointer}" +
      "#cookie-bar .cb-ok{background:#FFB547;color:#070B10;border:0}" +
      "#cookie-bar .cb-no{background:transparent;color:#E8EEF4;border:1px solid rgba(150,185,215,.35)}" +
      "@media (max-width:600px){#cookie-bar{right:16px;bottom:calc(88px + env(safe-area-inset-bottom,0px))}}";
    document.head.appendChild(css);
    var bar = document.createElement("div");
    bar.id = "cookie-bar";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Aviso de cookies");
    bar.innerHTML =
      '<p>Usamos cookies de Google Analytics para contar las visitas y mejorar la web. ' +
      '<a href="privacidad.html#s6" target="_blank" rel="noopener">Más información</a></p>' +
      '<div class="cb-row"><button type="button" class="cb-no">Rechazar</button>' +
      '<button type="button" class="cb-ok">Aceptar</button></div>';
    bar.querySelector(".cb-ok").onclick = function () { decide("granted"); };
    bar.querySelector(".cb-no").onclick = function () { decide("denied"); };
    document.body.appendChild(bar);
  }

  window.bbkCookies = function () { showBar(); };
  if (!choice) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showBar);
    else showBar();
  }
})();
