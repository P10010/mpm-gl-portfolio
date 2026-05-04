// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Hero preview mute/unmute toggle
const heroVideo   = document.getElementById('heroVideo');
const muteBtn     = document.getElementById('heroMute');
const iconMuted   = muteBtn?.querySelector('.icon-muted');
const iconUnmuted = muteBtn?.querySelector('.icon-unmuted');

if (heroVideo && muteBtn) {
  muteBtn.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    if (heroVideo.muted) {
      iconMuted.style.display = '';
      iconUnmuted.style.display = 'none';
      muteBtn.setAttribute('aria-label', 'Unmute video');
    } else {
      iconMuted.style.display = 'none';
      iconUnmuted.style.display = '';
      muteBtn.setAttribute('aria-label', 'Mute video');
    }
  });
}

// Only one audio at a time. Hero never pauses, just mutes.
const allVideos = document.querySelectorAll('video');
allVideos.forEach(video => {
  if (video === heroVideo) return;
  video.addEventListener('play', () => {
    heroVideo.muted = true;
    if (iconMuted) iconMuted.style.display = '';
    if (iconUnmuted) iconUnmuted.style.display = 'none';
    if (muteBtn) muteBtn.setAttribute('aria-label', 'Unmute video');
    allVideos.forEach(other => {
      if (other !== video && other !== heroVideo) other.pause();
    });
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});
