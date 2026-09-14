const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const cursor = document.querySelector(".cursor-dot");

if (enterBtn && intro) {
  enterBtn.addEventListener("click", () => {
    intro.classList.add("hidden");
    document.body.classList.add("entered");
  });
}

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".section-head, .theory-note, .theory-statement, .archive-card, .pink__content, .finale__main").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

const theoryLines = [
  "RANDOM CLIP → PERFECT TRANSITION.",
  "THE PLUH WAS IN THE ROOM WITH US.",
  "FPS FOOTAGE. PINK TEXT. NO NOTES.",
  "30 THEORY DETECTED.",
  "THIS IS NOT A DRILL.",
  "THE ALGORITHM HAS SPOKEN."
];

const glitchBtn = document.getElementById("glitchBtn");
if (glitchBtn) {
  glitchBtn.addEventListener("click", (e) => {
    const button = e.currentTarget;
    button.textContent = "THEORY CONFIRMED";
    const hugeCopy = document.querySelector(".huge-copy");
    if (hugeCopy) hugeCopy.style.transform = "skewX(-4deg)";
    setTimeout(() => {
      if (hugeCopy) hugeCopy.style.transform = "";
      button.textContent = "RUN THE THEORY";
    }, 900);
  });
}

const shuffleBtn = document.getElementById("shuffleBtn");
if (shuffleBtn) {
  shuffleBtn.addEventListener("click", () => {
    const vibe = document.getElementById("vibeText");
    if (vibe) {
      vibe.textContent = theoryLines[Math.floor(Math.random() * theoryLines.length)];
      vibe.animate(
        [{ transform: "translateX(-8px)", opacity: .2 }, { transform: "translateX(0)", opacity: 1 }],
        { duration: 300, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    }
  });
}

const copyBtn = document.getElementById("copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", async (e) => {
    try {
      await navigator.clipboard.writeText("#30theory #30core #bludlung #pinkcore");
      e.currentTarget.textContent = "COPIED ✓";
      setTimeout(() => e.currentTarget.textContent = "COPY #30THEORY", 1600);
    } catch {
      e.currentTarget.textContent = "COPY FAILED";
      setTimeout(() => e.currentTarget.textContent = "COPY #30THEORY", 1600);
    }
  });
}

const daysValue = document.getElementById("countdownDays");
const hoursValue = document.getElementById("countdownHours");
const minutesValue = document.getElementById("countdownMinutes");
const secondsValue = document.getElementById("countdownSeconds");
const countdownYear = document.getElementById("countdownYear");

function updateCountdown() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 9, 1, 0, 0, 0);

  if (target < now) {
    target = new Date(now.getFullYear() + 1, 9, 1, 0, 0, 0);
  }

  if (countdownYear) {
    countdownYear.textContent = target.getFullYear();
  }

  const distance = Math.max(target - now, 0);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  if (daysValue) daysValue.textContent = String(days).padStart(2, "0");
  if (hoursValue) hoursValue.textContent = String(hours).padStart(2, "0");
  if (minutesValue) minutesValue.textContent = String(minutes).padStart(2, "0");
  if (secondsValue) secondsValue.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
