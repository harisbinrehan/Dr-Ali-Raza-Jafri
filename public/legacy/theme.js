/*
 * Runs in the <head> of the existing platform's pages.
 * 1. Applies the visitor's light/dark choice (shared with the public site).
 * 2. Sends links to the redesigned public pages through a full page load, so
 *    the platform's own old versions of those pages are never shown.
 * It does not touch sign-in, cart, checkout or payment behaviour.
 */
(function () {
  var root = document.documentElement;
  var dashboard = /^\/(teacher|admin)(\/|$)/.test(location.pathname);

  function resolveTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem("theme");
    } catch (e) {}
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme() {
    root.setAttribute("data-theme", dashboard ? "light" : resolveTheme());
  }
  applyTheme();
  window.addEventListener("storage", function (e) {
    if (e.key === "theme") applyTheme();
  });
  if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);

  // Track scroll position for seamless transparent header (matches homepage design).
  function handleScroll() {
    if (window.scrollY > 20) root.setAttribute("data-scrolled", "true");
    else root.removeAttribute("data-scrolled");
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  var OWNED = ["/courses", "/instructors", "/about", "/faq", "/contact", "/teach", "/pricing", "/terms", "/privacy", "/refunds", "/returns", "/shipping", "/service-policy"];
  function isOwned(path) {
    if (path === "/") return true;
    for (var i = 0; i < OWNED.length; i++) {
      if (path === OWNED[i] || path.indexOf(OWNED[i] + "/") === 0) return true;
    }
    return false;
  }
  function target(url) {
    try {
      var u = new URL(url, location.href);
      return u.origin === location.origin && isOwned(u.pathname) ? u : null;
    } catch (e) {
      return null;
    }
  }

  // Links: capture before the platform's router sees the click.
  document.addEventListener(
    "click",
    function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      var u = target(a.getAttribute("href"));
      if (!u) return;
      e.preventDefault();
      e.stopPropagation();
      location.assign(u.href);
    },
    true,
  );

  // Programmatic navigation (e.g. "Browse courses" buttons).
  ["pushState", "replaceState"].forEach(function (name) {
    var original = history[name];
    history[name] = function (state, title, url) {
      var u = url != null ? target(url) : null;
      if (u && u.pathname !== location.pathname) {
        location.assign(u.href);
        return;
      }
      return original.apply(this, arguments);
    };
  });
})();
