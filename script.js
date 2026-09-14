const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const cursor = document.querySelector(".cursor-dot");

enterBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  document.body.classList.add("entered");
});

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("active"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section-head, .theory-note, .theory-statement, .archive-card, .pink__content, .finale__main").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

const theoryLines = [
  "RANDOM CLIP → PERFECT TRANSITION.",
  "THE PLUH WAS IN THE ROOM WITH US.",
  "FPS FOOTAGE. PINK TEXT. NO NOTES.",
  "30 THEORY DETECTED.",
  "THIS IS NOT A DRILL.",
  "THE ALGORITHM HAS SPOKEN."
];

document.getElementById("glitchBtn").addEventListener("click", (e) => {
  const button = e.currentTarget;
  button.textContent = "THEORY CONFIRMED";
  document.querySelector(".huge-copy").style.transform = "skewX(-4deg)";
  setTimeout(() => {
    document.querySelector(".huge-copy").style.transform = "";
    button.textContent = "RUN THE THEORY";
  }, 900);
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  const vibe = document.getElementById("vibeText");
  vibe.textContent = theoryLines[Math.floor(Math.random() * theoryLines.length)];
  vibe.animate(
    [{ transform: "translateX(-8px)", opacity: .2 }, { transform: "translateX(0)", opacity: 1 }],
    { duration: 300, easing: "cubic-bezier(.2,.8,.2,1)" }
  );
});

document.getElementById("copyBtn").addEventListener("click", async (e) => {
  try {
    await navigator.clipboard.writeText("#30theory #30core #bludlung #pinkcore");
    e.currentTarget.textContent = "COPIED ✓";
    setTimeout(() => e.currentTarget.textContent = "COPY #30THEORY", 1600);
  } catch {
    e.currentTarget.textContent = "COPY FAILED";
    setTimeout(() => e.currentTarget.textContent = "COPY #30THEORY", 1600);
  }
});
