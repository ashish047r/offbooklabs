(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>';
  let lenis = null;

  // Builds the project cards from window.PROJECTS so the markup lives in one place.
  function renderProjects() {
    const grid = document.getElementById("projects");
    grid.innerHTML = window.PROJECTS.map((p, i) => `
      <article class="card reveal${p.wide ? " card--wide" : ""}" data-delay="${p.wide ? 0 : (i + 1) % 2}" data-slug="${p.slug}" data-title="${p.title}">
        <div class="card-media">
          <video muted loop playsinline preload="none" poster="assets/posters/${p.slug}.jpg"
                 data-src="assets/videos/${p.slug}-preview.mp4" aria-hidden="true"></video>
          <button class="card-play" type="button">${PLAY_ICON}Watch demo</button>
        </div>
        <div class="card-body">
          <div class="chips">${p.chips.map(c => `<span class="chip">${c}</span>`).join("")}</div>
          <h3>${p.title}</h3>
          <p>${p.text}</p>
          ${p.client ? `<div class="card-client">Built for <b>${p.client}</b> · see what they said ↓</div>` : ""}
        </div>
      </article>`).join("");
    grid.addEventListener("click", e => {
      const card = e.target.closest(".card");
      if (card) openPlayer(card.dataset.slug, card.dataset.title);
    });
  }

  // Fills each marquee with its word, twice, so the -50% loop is seamless.
  function initMarquees() {
    document.querySelectorAll(".marquee").forEach(m => {
      const half = Array(6).fill(`<span>${m.dataset.word}</span>`).join("");
      m.firstElementChild.innerHTML = half + half;
    });
  }

  // Lenis smooth scroll + in-page anchor links + nav that hides on scroll down.
  function initSmoothScroll() {
    const nav = document.querySelector(".nav");
    let last = 0;
    const onScroll = y => {
      nav.classList.toggle("is-hidden", y > 400 && y > last);
      last = y;
    };
    if (!reduceMotion && window.Lenis) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      lenis.on("scroll", ({ scroll }) => onScroll(scroll));
    } else {
      addEventListener("scroll", () => onScroll(scrollY), { passive: true });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis ? lenis.scrollTo(target, { offset: -20, duration: 1.4 }) : target.scrollIntoView({ behavior: "smooth" });
    }));
  }

  // Fades elements up once, as they enter the viewport.
  function initReveal() {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  }

  // Card previews load only when near the screen, and play only while visible.
  function initVideos() {
    if (reduceMotion) return;                     // posters only
    const io = new IntersectionObserver(entries => entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else v.pause();
    }), { rootMargin: "200px 0px", threshold: 0.25 });
    document.querySelectorAll(".card video").forEach(v => io.observe(v));
  }

  // Full-screen player with sound.
  const player = document.getElementById("player");
  const pv = player.querySelector("video");
  let lastFocus = null;
  function openPlayer(slug, title) {
    lastFocus = document.activeElement;
    pv.src = `assets/videos/${slug}.mp4`;
    pv.poster = `assets/posters/${slug}.jpg`;
    pv.setAttribute("aria-label", `${title} demo`);
    player.hidden = false;
    lenis && lenis.stop();
    pv.play().catch(() => {});
    requestAnimationFrame(() => {
      player.classList.add("is-open");                    // visible now, so it can take focus
      player.querySelector(".player-close").focus();
    });
  }
  function closePlayer() {
    player.classList.remove("is-open");
    pv.pause();
    lenis && lenis.start();
    setTimeout(() => { player.hidden = true; pv.removeAttribute("src"); pv.load(); }, 350);
    lastFocus && lastFocus.focus();
  }
  player.addEventListener("click", e => { if (!e.target.closest(".player-box")) closePlayer(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !player.hidden) closePlayer(); });

  renderProjects();
  initMarquees();
  initSmoothScroll();
  initReveal();
  initVideos();
})();
