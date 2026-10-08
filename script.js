document.addEventListener("DOMContentLoaded", () => {
  const star = document.getElementById("ltStar");
  const wordmarkOffset = document.querySelector(".wordmark-offset");
  const portrait = document.querySelector(".portrait-card");
  const orbOne = document.querySelector(".orb-one");
  const orbTwo = document.querySelector(".orb-two");

  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  /* ================================================
     LIVEXTWIN STAR
     Switch palette and star state.
     The portrait and GitHub borders follow CSS vars.
     ================================================ */

  if (star) {
    star.addEventListener("click", () => {
      const active = document.body.classList.toggle("alt-palette");

      star.setAttribute("aria-pressed", String(active));
    });
  }

  /* ================================================
     OLD-WEB MOUSE MOVEMENT
     Desktop only, disabled for reduced motion.
     ================================================ */

  if (motionPreference.matches) {
    return;
  }

  const isDesktop = () => window.innerWidth > 768;

  window.addEventListener(
    "mousemove",
    (event) => {
      if (!isDesktop()) {
        return;
      }

      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      /* Wordmark registration offset */
      if (wordmarkOffset) {
        wordmarkOffset.style.transform = `translate(${x * 5}px, ${y * 3}px)`;
      }

      /* Portrait movement */
      if (portrait) {
        portrait.style.setProperty("--mouse-x", `${x * 3}px`);
        portrait.style.setProperty("--mouse-y", `${y * 3}px`);
        portrait.style.setProperty("--mouse-rotate", `${x * 2}deg`);
      }

      /* Ambient orbs */
      if (orbOne) {
        orbOne.style.transform = `translate(${x * 15}px, ${y * 10}px)`;
      }

      if (orbTwo) {
        orbTwo.style.transform = `translate(${x * -12}px, ${y * -8}px)`;
      }
    },
    { passive: true },
  );

  /* Clear desktop positioning variables when returning to mobile. */
  window.addEventListener("resize", () => {
    if (isDesktop() || !portrait) {
      return;
    }

    portrait.style.removeProperty("--mouse-x");
    portrait.style.removeProperty("--mouse-y");
    portrait.style.removeProperty("--mouse-rotate");
  });
});
