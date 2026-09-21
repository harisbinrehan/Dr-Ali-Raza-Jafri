/*
 * Runs in the <head> of the existing platform's pages.
 * 1. Applies the visitor's light/dark choice (shared with the public site).
 * 2. Sends links to the redesigned public pages through a full page load, so
 *    the platform's own old versions of those pages are never shown.
 * 3. Injects the public site's mobile tab bar (Home/Courses/Cart/Account),
 *    since these pages sit outside the Next.js app and never see that component.
 * It does not touch sign-in, cart, checkout or payment behaviour.
 */
(function () {
  var root = document.documentElement;
  var dashboard = /^\/(teacher|admin)(\/|$)/.test(location.pathname);

  // Hide "Sign in" and "Create account" links early if we have a token, to prevent flashing before JS hydration.
  try {
    if (localStorage.getItem("alignodontic.accessToken")) {
      var style = document.createElement("style");
      style.textContent = "header a[href*='/users/sign_in'], header a[href*='/login'], header a[href*='/users/sign_up'] { display: none !important; }";
      document.documentElement.appendChild(style);
    }
  } catch (e) {}

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

  // Programmatic navigation (e.g. "Browse courses" buttons, navigating lessons).
  ["pushState", "replaceState"].forEach(function (name) {
    var original = history[name];
    history[name] = function (state, title, url) {
      var u = url != null ? target(url) : null;
      if (u && u.pathname !== location.pathname) {
        location.assign(u.href);
        return;
      }
      var oldPath = location.pathname;
      var result = original.apply(this, arguments);
      if (location.pathname !== oldPath) {
        window.scrollTo(0, 0);
      }
      updateBottomNav();
      return result;
    };
  });

  // ---------------------------------------------------------------- Bottom nav
  // The platform's own pages (sign-in, cart, checkout, learning, account,
  // dashboards) are outside the Next.js app, so its <BottomNav> never renders
  // there. This reproduces it: same four destinations, same active-state and
  // cart-count logic as the public site (see AccountLinks.tsx, enrolment.ts).
  var CART_KEY = "alignodontic.cart";
  var TOKEN_KEY = "alignodontic.accessToken";
  var ICONS = {
    home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 9.8V19a1 1 0 0 0 1 1h3v-5.5h4V20h3a1 1 0 0 0 1-1V9.8"/>',
    book: '<path d="M12 6.5c-2-1.3-4.8-1.5-7.5-.7v12.7c2.7-.8 5.5-.6 7.5.7 2-1.3 4.8-1.5 7.5-.7V5.8c-2.7-.8-5.5-.6-7.5.7Z"/><path d="M12 6.5v12.7"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  };

  function icon(name, hasBadge) {
    var badgeHtml = hasBadge ? '<span class="aa-bn-badge" hidden></span>' : '';
    return '<span class="aa-bn-icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>" + badgeHtml + "</span>";
  }

  // Signed-in cart count comes from the platform's own header badge (its cart
  // is server-side once signed in, not the guest localStorage list). That
  // header link is hidden with display:none via CSS, so it's still readable
  // here — this mirrors whatever count it has rather than guessing at how the
  // platform tracks it.
  function readHeaderCartCount() {
    var link = document.querySelector('header a[href="/cart"]');
    if (!link) return null;
    var match = link.textContent.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  function readCartCount() {
    var fromHeader = readHeaderCartCount();
    if (fromHeader !== null) return fromHeader;
    try {
      var parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch (e) {
      return 0;
    }
  }

  function accountHref(cb) {
    var token = null;
    try {
      token = localStorage.getItem(TOKEN_KEY);
    } catch (e) {}
    if (!token) return cb("/login");
    fetch("/api/auth/me", { headers: { Accept: "application/json", Authorization: "Bearer " + token }, credentials: "include" })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (body) {
        var role = body && body.data && body.data.role;
        if (role === "ADMIN") return cb("/admin");
        if (role === "TEACHER") return cb("/teacher");
        return cb("/learn");
      })
      .catch(function () {
        cb("/login");
      });
  }

  var bottomNav = null;
  function buildBottomNav() {
    if (bottomNav) return bottomNav;
    var nav = document.createElement("nav");
    nav.className = "aa-bottom-nav";
    nav.setAttribute("aria-label", "Primary");
    nav.innerHTML =
      '<a class="aa-bn-item" data-key="home" href="/"><span class="aa-bn-content">' + icon("home") + "<span>Home</span><span class=\"aa-bn-bar\"></span></span></a>" +
      '<a class="aa-bn-item" data-key="courses" href="/courses"><span class="aa-bn-content">' + icon("book") + "<span>Courses</span><span class=\"aa-bn-bar\"></span></span></a>" +
      '<a class="aa-bn-item" data-key="cart" href="/cart"><span class="aa-bn-content">' + icon("cart", true) + '<span>Cart</span><span class="aa-bn-bar"></span></span></a>' +
      '<a class="aa-bn-item" data-key="account" href="/login"><span class="aa-bn-content">' + icon("user") + "<span>Account</span><span class=\"aa-bn-bar\"></span></span></a>";
    document.body.appendChild(nav);
    bottomNav = nav;
    return nav;
  }

  function updateBottomNav() {
    var nav = buildBottomNav();
    var path = location.pathname;
    var activeKey = path === "/" ? "home" : path.indexOf("/courses") === 0 ? "courses" : path.indexOf("/cart") === 0 ? "cart" : path.indexOf("/checkout") === 0 ? "cart" : "account";
    nav.querySelectorAll(".aa-bn-item").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-key") === activeKey);
    });

    var badge = nav.querySelector(".aa-bn-badge");
    var count = readCartCount();
    if (count > 0) {
      badge.hidden = false;
      badge.textContent = count > 9 ? "9+" : String(count);
    } else {
      badge.hidden = true;
    }

    var accountLink = nav.querySelector('[data-key="account"]');
    accountHref(function (href) {
      accountLink.setAttribute("href", href);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateBottomNav);
  } else {
    updateBottomNav();
  }
  window.addEventListener("storage", function (e) {
    if (e.key === CART_KEY) updateBottomNav();
  });
  window.addEventListener("pageshow", updateBottomNav);
  window.addEventListener("popstate", updateBottomNav);

  // The platform's own header cart badge updates as its React tree re-renders
  // (e.g. after an add-to-cart call). Mirror those changes onto the bottom
  // bar's badge, ignoring the bottom bar's own DOM so this can't loop on itself.
  var pendingUpdate = null;
  function scheduleUpdate() {
    if (pendingUpdate) return;
    pendingUpdate = setTimeout(function () {
      pendingUpdate = null;
      updateBottomNav();
    }, 50);
  }
  function isInsideBottomNav(node) {
    var el = node.nodeType === 1 ? node : node.parentElement;
    return !!(el && el.closest && el.closest(".aa-bottom-nav"));
  }
  var cartObserver = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (!isInsideBottomNav(mutations[i].target)) {
        scheduleUpdate();
        return;
      }
    }
  });
  // This script runs synchronously in <head>, before <body> exists yet — observing
  // it immediately throws and aborts everything below (the mobile menu setup included).
  function startCartObserver() {
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", startCartObserver, { once: true });
      return;
    }
    cartObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  startCartObserver();

  // ---------------------------------------------------------------- Mobile Menu
  // Intercept the platform's mobile menu toggle and show our own native-style sidebar instead.
  function buildMobileMenu() {
    var dialog = document.getElementById("aa-mobile-menu");
    if (dialog) return dialog;

    dialog = document.createElement("dialog");
    dialog.id = "aa-mobile-menu";
    dialog.className = "aa-drawer";

    var header = document.createElement("div");
    header.className = "aa-drawer-header";
    header.innerHTML = '<a href="/" aria-label="Home" class="aa-drawer-brand"><img src="/apple-icon.png" width="32" height="32" alt="" /><span>Alignodontic Academy</span></a>' +
                       '<button type="button" aria-label="Close menu" class="aa-drawer-close-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>';
    dialog.appendChild(header);

    var nav = document.createElement("nav");
    nav.className = "aa-drawer-nav";
    var links = [
      { href: "/courses", label: "Courses" },
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" }
    ];
    links.forEach(function(l) {
      var a = document.createElement("a");
      a.className = "aa-menu-link";
      a.href = l.href;
      a.textContent = l.label;
      nav.appendChild(a);
    });
    dialog.appendChild(nav);

    var footer = document.createElement("div");
    footer.className = "aa-drawer-footer";
    var footerContainer = document.createElement("div");
    footerContainer.style.cssText = "display:flex;flex-direction:column;gap:0.5rem;";
    footer.appendChild(footerContainer);

    var token = null;
    try { token = localStorage.getItem("alignodontic.accessToken"); } catch (e) {}

    var userIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1rem;height:1rem;"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

    if (token) {
      footerContainer.innerHTML = '<a href="/learn" id="aa-dashboard-link" class="aa-menu-btn aa-menu-btn-outline">' + userIcon + 'Dashboard</a>' +
        '<a href="/learn/purchases" class="aa-menu-btn aa-menu-btn-outline">Purchases</a>' +
        '<a href="/teach" class="aa-menu-btn aa-menu-btn-outline">Teach with us</a>' +
        '<a href="/users/sign_out" id="aa-signout" class="aa-menu-btn aa-menu-btn-danger">Sign out</a>';
      accountHref(function (href) {
        var dashLink = footerContainer.querySelector("#aa-dashboard-link");
        if (dashLink) dashLink.setAttribute("href", href);
      });
    } else {
      footerContainer.innerHTML = '<a href="/login" class="aa-menu-btn aa-menu-btn-outline">' + userIcon + 'Sign in / My learning</a>' +
        '<a href="/teach" class="aa-menu-btn aa-menu-btn-outline">Teach with us</a>' +
        '<a href="/register" class="aa-menu-btn aa-menu-btn-primary">Create account</a>';
    }

    dialog.appendChild(footer);
    document.body.appendChild(dialog);

    header.querySelector("button").addEventListener("click", function() { 
      dialog.close(); 
      dialog.style.display = "none";
    });
    dialog.addEventListener("click", function(e) { 
      if (e.target === dialog) {
        dialog.close(); 
        dialog.style.display = "none";
      }
    });
    
    var signoutBtn = dialog.querySelector("#aa-signout");
    if (signoutBtn) {
       signoutBtn.addEventListener("click", function() {
         localStorage.removeItem("alignodontic.accessToken");
       });
    }

    return dialog;
  }

  // Intercept clicks on the legacy hamburger menu. Its accessible name comes
  // from a child sr-only span (no aria-label attribute), and its icon path
  // doesn't match a guessed heuristic reliably — aria-controls="mobile-menu"
  // is the one attribute confirmed present on the real button.
  document.addEventListener("click", function(e) {
    if (e.defaultPrevented) return;
    var btn = e.target.closest('button[aria-controls="mobile-menu"]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    var menu = buildMobileMenu();
    menu.style.display = "flex";
    menu.showModal();
  }, true);
})();
