const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const suffix = element.textContent.replace(/[0-9.]/g, "");
      const steps = 36;
      let frame = 0;

      const tick = () => {
        frame += 1;
        const progress = Math.min(frame / steps, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;

        if (target % 1 === 0) {
          element.textContent = `${Math.round(value)}${suffix}`;
        } else {
          element.textContent = `${value.toFixed(1)}${suffix}`;
        }

        if (progress < 1) requestAnimationFrame(tick);
      };

      tick();
      counterObserver.unobserve(element);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

document.querySelectorAll(".accordion button").forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    const answer = button.nextElementSibling;

    button.setAttribute("aria-expanded", String(!isOpen));
    button.querySelector("span").textContent = isOpen ? "+" : "-";
    answer.hidden = isOpen;
  });
});
