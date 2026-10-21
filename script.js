/**
 * GOLDY'S FUNNY DIGITAL PET PORTFOLIO — INTERACTIVE SCRIPT
 * Handles scroll animations, synthesized playful sound effects (Web Audio API),
 * falling cartoon bones generator, comic interactions, and modal dialogs.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. STATE & AUDIO SYNTHESIZER (No external audio files needed!)
  // ------------------------------------------------------------------------
  let soundEnabled = true;
  let treatCounter = 0;
  let audioCtx = null;

  // Initialize or resume Web Audio Context on first user gesture
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play a synthesized cheerful dog bark sound
  function playBarkSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // High pitch woof followed by low pitch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);

      // Second mini woof echo
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(420, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(180, now + 0.28);

      gain2.gain.setValueAtTime(0, now + 0.12);
      gain2.gain.linearRampToValueAtTime(0.2, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now + 0.12);
      osc2.stop(now + 0.34);
    } catch (e) {
      console.warn('Audio playback not supported or blocked:', e);
    }
  }

  // Play a synthesized friendly doorbell chime (Ding-Dong)
  function playDoorbellSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Ding (Higher note: G5 ~ 784Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(784, now);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.75);

      // Dong (Lower note: E5 ~ 659Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.35);
      gain2.gain.setValueAtTime(0.45, now + 0.35);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.35);
      osc2.stop(now + 1.25);
    } catch (e) {
      console.warn(e);
    }
  }

  // Play a synthesized happy treat pop / crunch chime
  function playTreatChime() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const pitches = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.25, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.36);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Play a funny warning comic buzzer
  function playWarningBuzzer() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(95, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {
      console.warn(e);
    }
  }

  // Sound Toggle Button
  const soundToggleBtn = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  if (soundToggleBtn && soundIcon) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      soundToggleBtn.title = soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects';
      if (soundEnabled) {
        playTreatChime();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU
  // ------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinksList = mainNav ? mainNav.querySelector('.nav-links') : null;

  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('is-active');
      const expanded = navLinksList.classList.contains('is-active');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Close mobile nav when clicking any link
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. INTERSECTION OBSERVER FOR SCROLL-TRIGGERED ANIMATIONS
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, unobserve to keep performance high
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: immediately show all elements if IntersectionObserver is unavailable or reduced motion preferred
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // ------------------------------------------------------------------------
  // 4. GIANT FALLING CARTOON BONES (Section 5: What I Love The Most!)
  // Oversized cartoon bones raining playfully behind central content, clipped to section
  // ------------------------------------------------------------------------
  const boneContainer = document.getElementById('boneRainContainer');
  let boneInterval = null;

  // Oversized cartoon bone SVGs with thick outlines and playful colors
  const boneSVGs = [
    // 1. Classic Cream-White Bone with highlight
    `<svg viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFFDF5" stroke="#0F1D38" stroke-width="4.5" stroke-linejoin="round">
        <circle cx="28" cy="22" r="16"/>
        <circle cx="28" cy="48" r="16"/>
        <circle cx="132" cy="22" r="16"/>
        <circle cx="132" cy="48" r="16"/>
        <rect x="26" y="24" width="108" height="22" rx="7"/>
      </g>
      <path d="M 38 28 Q 80 26 122 28" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
    // 2. Golden Yellow Biscuit Bone
    `<svg viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFD166" stroke="#0F1D38" stroke-width="4.5" stroke-linejoin="round">
        <circle cx="28" cy="22" r="16"/>
        <circle cx="28" cy="48" r="16"/>
        <circle cx="132" cy="22" r="16"/>
        <circle cx="132" cy="48" r="16"/>
        <rect x="26" y="24" width="108" height="22" rx="7"/>
      </g>
      <circle cx="55" cy="35" r="3" fill="#E29F1D"/>
      <circle cx="80" cy="35" r="3" fill="#E29F1D"/>
      <circle cx="105" cy="35" r="3" fill="#E29F1D"/>
    </svg>`,
    // 3. Signature Pastel Mint Green Bone
    `<svg viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg">
      <g fill="#A8E6CF" stroke="#0F1D38" stroke-width="4.5" stroke-linejoin="round">
        <circle cx="28" cy="22" r="16"/>
        <circle cx="28" cy="48" r="16"/>
        <circle cx="132" cy="22" r="16"/>
        <circle cx="132" cy="48" r="16"/>
        <rect x="26" y="24" width="108" height="22" rx="7"/>
      </g>
      <path d="M 40 28 Q 80 27 120 28" fill="none" stroke="#D7F9EC" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
    // 4. Soft Warm Coral / Peach Bone
    `<svg viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFCCA7" stroke="#0F1D38" stroke-width="4.5" stroke-linejoin="round">
        <circle cx="28" cy="22" r="16"/>
        <circle cx="28" cy="48" r="16"/>
        <circle cx="132" cy="22" r="16"/>
        <circle cx="132" cy="48" r="16"/>
        <rect x="26" y="24" width="108" height="22" rx="7"/>
      </g>
      <circle cx="58" cy="35" r="2.5" fill="#E68A5C"/>
      <circle cx="80" cy="35" r="2.5" fill="#E68A5C"/>
      <circle cx="102" cy="35" r="2.5" fill="#E68A5C"/>
    </svg>`,
    // 5. Crisp Sage Green Bone
    `<svg viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg">
      <g fill="#C8E6C9" stroke="#0F1D38" stroke-width="4.5" stroke-linejoin="round">
        <circle cx="28" cy="22" r="16"/>
        <circle cx="28" cy="48" r="16"/>
        <circle cx="132" cy="22" r="16"/>
        <circle cx="132" cy="48" r="16"/>
        <rect x="26" y="24" width="108" height="22" rx="7"/>
      </g>
    </svg>`
  ];

  function spawnFallingBone(isBurst = false) {
    if (!boneContainer || prefersReducedMotion) return;

    const boneEl = document.createElement('div');
    boneEl.className = 'falling-bone';

    // Pick random cartoon bone SVG
    const svgIndex = Math.floor(Math.random() * boneSVGs.length);
    boneEl.innerHTML = boneSVGs[svgIndex];

    // Giant oversized dimensions (scaled for mobile vs desktop)
    const isMobile = window.innerWidth < 640;
    const width = isMobile 
      ? Math.floor(Math.random() * 45) + 85  // 85px - 130px on mobile (noticeably big!)
      : Math.floor(Math.random() * 75) + 120; // 120px - 195px on desktop (giant!)

    // Randomize horizontal position across the section
    const leftPercent = Math.random() * 88 + 4; // 4% - 92%

    // Fall speeds: steady gentle vs burst
    const duration = isBurst 
      ? (Math.random() * 2.5 + 3.2)   // 3.2s - 5.7s burst
      : (Math.random() * 3.5 + 5.5);  // 5.5s - 9.0s gentle rain
    const delay = isBurst ? Math.random() * 0.6 : 0;

    // Angles: varied start angle and playful tumble/spin
    const startRot = Math.floor(Math.random() * 120) - 60; // -60deg to +60deg
    const spin = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 180) + 90);
    const endRot = startRot + spin;

    // Fall distance matches section height so it traverses completely through
    const sectionHeight = boneContainer.offsetHeight || 1200;
    const fallDist = sectionHeight + 350;

    boneEl.style.width = `${width}px`;
    boneEl.style.left = `${leftPercent}%`;
    boneEl.style.animationDuration = `${duration}s`;
    boneEl.style.animationDelay = `${delay}s`;
    boneEl.style.setProperty('--bone-start-rot', `${startRot}deg`);
    boneEl.style.setProperty('--bone-end-rot', `${endRot}deg`);
    boneEl.style.setProperty('--fall-dist', `${fallDist}px`);
    boneEl.style.setProperty('--bone-target-opacity', (Math.random() * 0.25 + 0.65).toFixed(2));

    boneContainer.appendChild(boneEl);

    // Remove element from DOM after animation completes to avoid memory build-up
    setTimeout(() => {
      if (boneEl.parentNode === boneContainer) {
        boneContainer.removeChild(boneEl);
      }
    }, (duration + delay + 0.5) * 1000);
  }

  // Observe the Loves Section: only rain bones when visitor is near or on this section
  const lovesSection = document.getElementById('loves');
  if (lovesSection && 'IntersectionObserver' in window) {
    const lovesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!boneInterval && !prefersReducedMotion) {
            // Spawn initial staggered giant bones
            for (let i = 0; i < 5; i++) {
              setTimeout(() => spawnFallingBone(), i * 450);
            }
            // Continuous smooth rain (spawns 1 giant bone every 1.5s to prevent CPU overload)
            boneInterval = setInterval(() => {
              spawnFallingBone();
            }, 1500);
          }
        } else {
          // Pause rain when scrolled far away to save CPU
          if (boneInterval) {
            clearInterval(boneInterval);
            boneInterval = null;
          }
        }
      });
    }, { threshold: 0.1 });

    lovesObserver.observe(lovesSection);
  }

  // "Make It Rain Giant Bones!" Button
  const toggleBoneShowerBtn = document.getElementById('toggleBoneShowerBtn');
  if (toggleBoneShowerBtn) {
    toggleBoneShowerBtn.addEventListener('click', () => {
      playTreatChime();
      for (let i = 0; i < 14; i++) {
        setTimeout(() => spawnFallingBone(true), i * 110);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. HERO SECTION INTERACTIONS
  // ------------------------------------------------------------------------
  const heroDogImg = document.getElementById('heroDogImg');
  const heroBarkBtn = document.getElementById('heroBarkBtn');
  const heroSpeechBubble = document.getElementById('heroSpeechBubble');

  const heroQuotes = [
    "Too cool for obedience school! 😎🐾",
    "Did someone say walkies?! 🎾",
    "I'm 99% fluff, 1% trouble!",
    "Belly rub access granted! 💖",
    "Golden Retriever by birth, food critic by choice! 🍗"
  ];
  let heroQuoteIndex = 0;

  function petGoldy() {
    playBarkSound();
    if (heroDogImg) {
      heroDogImg.classList.remove('heartbeat-anim');
      heroDogImg.style.transform = 'scale(1.08) rotate(-2deg)';
      setTimeout(() => {
        heroDogImg.style.transform = 'scale(1.05) rotate(2deg)';
        setTimeout(() => {
          heroDogImg.style.transform = '';
          heroDogImg.classList.add('heartbeat-anim');
        }, 220);
      }, 180);
    }

    if (heroSpeechBubble) {
      heroQuoteIndex = (heroQuoteIndex + 1) % heroQuotes.length;
      heroSpeechBubble.querySelector('span').textContent = heroQuotes[heroQuoteIndex];
      heroSpeechBubble.style.animation = 'none';
      void heroSpeechBubble.offsetWidth; // Trigger reflow
      heroSpeechBubble.style.animation = 'bubblePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    }
  }

  if (heroDogImg) heroDogImg.addEventListener('click', petGoldy);
  if (heroBarkBtn) heroBarkBtn.addEventListener('click', petGoldy);

  // ------------------------------------------------------------------------
  // 6. SECTION 4: MY HOME — DOORBELL INTERACTION
  // ------------------------------------------------------------------------
  const doorbellBtn = document.getElementById('doorbellBtn');
  const doorbellFeedback = document.getElementById('doorbellFeedback');
  const homeGoldyImg = document.querySelector('.home-goldy-img');

  if (doorbellBtn) {
    doorbellBtn.addEventListener('click', () => {
      playDoorbellSound();

      if (homeGoldyImg) {
        homeGoldyImg.style.transform = 'translateY(-16px) scale(1.05)';
        setTimeout(() => {
          homeGoldyImg.style.transform = '';
          playBarkSound();
        }, 400);
      }

      if (doorbellFeedback) {
        doorbellFeedback.textContent = "🔔 DING-DONG! *Goldy barks excitedly at the door!* 🐶";
        setTimeout(() => {
          doorbellFeedback.textContent = "";
        }, 4500);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. SECTION 5: VIDEO SOUND CONTROLS
  // ------------------------------------------------------------------------
  const leftRightVideo = document.getElementById('leftRightVideo');
  const videoSoundBtn = document.getElementById('videoSoundBtn');

  if (videoSoundBtn && leftRightVideo) {
    videoSoundBtn.addEventListener('click', () => {
      leftRightVideo.muted = !leftRightVideo.muted;
      videoSoundBtn.innerHTML = leftRightVideo.muted ? '<span>🔇</span>' : '<span>🔊</span>';
      videoSoundBtn.title = leftRightVideo.muted ? 'Unmute Video' : 'Mute Video';
    });
  }

  // Ensure TV wall videos autoplay muted reliably
  const wallVideos = document.querySelectorAll('.wall-video');
  wallVideos.forEach(v => {
    v.muted = true;
    v.play().catch(() => {
      // Autoplay with muted is allowed in modern browsers
    });
  });

  // ------------------------------------------------------------------------
  // 8. SECTION 6: BOUNDARIES — SNOOT BOOP WARNING INTERACTION
  // ------------------------------------------------------------------------
  const boopSnootBtn = document.getElementById('boopSnootBtn');
  const boopWarningMsg = document.getElementById('boopWarningMsg');
  const grumpyFrame = document.querySelector('.grumpy-frame');

  const boundaryWarnings = [
    "🚨 HEY! What did the sign say?! Snoot booped, dental security alerted! 😾",
    "⚠️ WARNING: Tooth Zone Violated! Offer bacon immediately to defuse! 🥓",
    "🛑 Tactical Boop Error: Goldy is issuing a high-priority side-eye! 🐶",
    "⚡ Grrr! Belly rubs only! Fingers must remain outside snack perimeter! 🚫"
  ];
  let warningIndex = 0;

  if (boopSnootBtn) {
    boopSnootBtn.addEventListener('click', () => {
      playWarningBuzzer();

      if (grumpyFrame) {
        grumpyFrame.classList.remove('shake-element');
        void grumpyFrame.offsetWidth; // Reflow
        grumpyFrame.classList.add('shake-element');
      }

      if (boopWarningMsg) {
        boopWarningMsg.textContent = boundaryWarnings[warningIndex];
        warningIndex = (warningIndex + 1) % boundaryWarnings.length;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 9. SECTION 7: LOST GOLDY CONTACT MODAL
  // ------------------------------------------------------------------------
  const openContactModalBtn = document.getElementById('openContactModalBtn');
  const contactModal = document.getElementById('contactModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const lostContactForm = document.getElementById('lostContactForm');
  const contactSuccessMsg = document.getElementById('contactSuccessMsg');

  function openModal() {
    if (!contactModal) return;
    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    if (!contactModal) return;
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (contactSuccessMsg) {
      contactSuccessMsg.textContent = '';
    }
  }

  if (openContactModalBtn) {
    openContactModalBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close when clicking modal backdrop
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Handle simulated contact form submission
  if (lostContactForm) {
    lostContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const finderName = document.getElementById('finderName').value.trim();
      playBarkSound();

      if (contactSuccessMsg) {
        contactSuccessMsg.innerHTML = `🎉 Thank you, <strong>${finderName || 'Kind Hooman'}</strong>! Alert registered. Goldy's humans are on their way with treats! 🐾`;
      }

      setTimeout(() => {
        lostContactForm.reset();
      }, 3000);
    });
  }

  // ------------------------------------------------------------------------
  // 10. SECTION 8: FINAL TREAT CELEBRATION & COUNTER
  // ------------------------------------------------------------------------
  const giveTreatBtn = document.getElementById('giveTreatBtn');
  const quickTreatBtn = document.getElementById('quickTreatBtn');
  const treatCountDisplay = document.getElementById('treatCount');
  const globalTreatCount = document.getElementById('globalTreatCount');
  const treatAnimationStage = document.getElementById('treatAnimationStage');

  const treatEmojis = ['🍖', '🥓', '🥩', '🧀', '🎾', '💖', '✨', '🐾', '🍗', '🌭'];

  function spawnTreatCelebration(originX, originY) {
    playTreatChime();
    treatCounter += 1;

    // Update count labels
    if (treatCountDisplay) treatCountDisplay.textContent = treatCounter;
    if (globalTreatCount) globalTreatCount.textContent = treatCounter;

    // Spawn 16 burst particles
    const particleCount = 16;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'burst-particle';
      particle.textContent = treatEmojis[Math.floor(Math.random() * treatEmojis.length)];

      const angle = (i / particleCount) * (Math.PI * 2) + (Math.random() * 0.4);
      const distance = Math.floor(Math.random() * 90) + 70; // 70px - 160px
      const dx = `${Math.cos(angle) * distance}px`;
      const dy = `${Math.sin(angle) * distance}px`;
      const rot = `${(Math.random() * 360) - 180}deg`;

      particle.style.setProperty('--dx', dx);
      particle.style.setProperty('--dy', dy);
      particle.style.setProperty('--rot', rot);

      if (treatAnimationStage) {
        treatAnimationStage.appendChild(particle);
        setTimeout(() => {
          if (particle.parentNode === treatAnimationStage) {
            treatAnimationStage.removeChild(particle);
          }
        }, 1300);
      }
    }
  }

  if (giveTreatBtn) {
    giveTreatBtn.addEventListener('click', (e) => {
      const rect = giveTreatBtn.getBoundingClientRect();
      spawnTreatCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }

  if (quickTreatBtn) {
    quickTreatBtn.addEventListener('click', (e) => {
      const rect = quickTreatBtn.getBoundingClientRect();
      spawnTreatCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }

  // ------------------------------------------------------------------------
  // 11. PERSONALITY CARDS HOVER AUDIO FEEDBACK
  // ------------------------------------------------------------------------
  const personalityCards = document.querySelectorAll('.personality-card');
  personalityCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Gentle soft tone when hovering cards
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      } catch (e) {}
    });
  });

  console.log('🐾 Goldy Portfolio initialized! Professional Good Boy at your service.');
});
