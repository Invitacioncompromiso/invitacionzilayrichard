const audio = document.getElementById("bgMusic");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

const introScreen = document.getElementById("introScreen");
const enterBtn = document.getElementById("enterBtn");

document.body.classList.add("locked");

if (introScreen && enterBtn) {
  enterBtn.addEventListener("click", async () => {
    introScreen.classList.add("hidden");
    document.body.classList.remove("locked");
    document.body.classList.add("ready");

    if (audio) {
      try {
        await audio.play();
        if (playPauseBtn) {
          playPauseBtn.textContent = "❚❚";
          playPauseBtn.setAttribute("aria-label", "Pausar música");
        }
      } catch (error) {
        console.error("No se pudo reproducir la música al entrar:", error);
      }
    }
  });
}

if (audio && playPauseBtn && muteBtn) {
  playPauseBtn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playPauseBtn.textContent = "❚❚";
        playPauseBtn.setAttribute("aria-label", "Pausar música");
      } else {
        audio.pause();
        playPauseBtn.textContent = "▶";
        playPauseBtn.setAttribute("aria-label", "Reproducir música");
      }
    } catch (error) {
      console.error("No se pudo reproducir el audio:", error);
      alert("No se pudo reproducir la música. Verifica que el archivo exista en la carpeta music.");
    }
  });

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    muteBtn.setAttribute(
      "aria-label",
      audio.muted ? "Activar sonido" : "Silenciar audio"
    );
  });

  audio.addEventListener("ended", () => {
    playPauseBtn.textContent = "▶";
    playPauseBtn.setAttribute("aria-label", "Reproducir música");
  });
}

const targetDate = new Date("2026-04-18T18:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = formatNumber(days);
  hoursEl.textContent = formatNumber(hours);
  minutesEl.textContent = formatNumber(minutes);
  secondsEl.textContent = formatNumber(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);