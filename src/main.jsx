import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Gamepad2, Info, Music2, Music3, Trophy, Volume2, VolumeX, X } from 'lucide-react';
import { siDiscord, siTiktok, siX, siYoutube } from 'simple-icons';
import './styles.css';
import blackOpsCover from '../1.png';
import blackOpsTwoCover from '../2.png';
import warfareTwoCover from '../3.png';
import mw3Cover from '../4.png';
import avatar from '../avatar.png';
import achievementBadge from '../xbox-achievement-badge.png';

// Replace the placeholder URLs in one place when the real profiles are ready.
export const SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@REPLACE_ME',
  discord: 'https://discord.gg/REPLACE_ME',
  twitter: 'https://x.com/REPLACE_ME',
  youtube: 'https://youtube.com/@REPLACE_ME',
};

const LINKS = [
  { id: 'tiktok', title: 'BLUDLUNG: BLACK OPS', platform: 'TikTok', image: blackOpsCover, achievements: '69/69', gamerscore: '4200/4200 G', descriptor: 'short-form tactical nonsense' },
  { id: 'discord', title: 'BLUDLUNG: BLACK OPS II', platform: 'Discord', image: blackOpsTwoCover, achievements: '50/50', gamerscore: '1000/1000 G', descriptor: 'the lobby is probably open' },
  { id: 'twitter', title: 'BLUDLUNG WARFARE 2', platform: 'Twitter / X', image: warfareTwoCover, achievements: '29/29', gamerscore: '555/555 G', descriptor: 'live commentary from underground' },
  { id: 'youtube', title: 'BLUDLUNG MW3', platform: 'YouTube', image: mw3Cover, achievements: '24/24', gamerscore: '470/470 G', descriptor: 'long-form evidence archive' },
];

const PLATFORM_ICONS = { TikTok: siTiktok, Discord: siDiscord, 'Twitter / X': siX, YouTube: siYoutube };

const ACHIEVEMENTS = [
  { id: 'first-contact', title: 'First Contact', description: 'Open your first BLUDLUNG link', gamerscore: 10 },
  { id: 'full-network', title: 'Full Network', description: 'Open all four BLUDLUNG links', gamerscore: 25 },
  { id: 'intel-acquired', title: 'Intel Acquired', description: 'Read the About briefing', gamerscore: 10 },
  { id: 'ambient-protocol', title: 'Ambient Protocol', description: 'Activate menu music', gamerscore: 15 },
  { id: 'touch-grass', title: 'Touch Grass', description: 'Discover the secret controller code', gamerscore: 50 },
];

function BrandIcon({ platform }) {
  const icon = PLATFORM_ICONS[platform];
  return icon ? <svg className={`brand-icon ${platform.toLowerCase().replace(/[^a-z]+/g, '-')}`} viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg> : <span className="brand-fallback" aria-hidden="true">+</span>;
}

function Orb() {
  return <div className="orb" aria-label="BLUDLUNG 360 logo"><span>✦</span></div>;
}

function Header({ muted, setMuted, onAbout, unlockedCount }) {
  return <header className="site-header">
    <div className="profile-status">
      <div className="gamer-profile"><div className="profile-copy"><strong>bludlung</strong><small>69,420 <i className="profile-g-badge">G</i></small><em className="achievement-progress">{unlockedCount}/{ACHIEVEMENTS.length} ACHIEVEMENTS</em></div><div className="profile-avatar"><img src={avatar} alt="bludlung profile" /></div></div>
      <button className="icon-button" onClick={onAbout} aria-label="Open about panel" title="About"><span className="question-mark">?</span></button>
      <button className="icon-button" onClick={() => setMuted(!muted)} aria-label={muted ? 'Unmute interface sounds' : 'Mute interface sounds'} title={muted ? 'Unmute' : 'Mute'}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
    </div>
  </header>;
}

function GameEntry({ item, selected, onSelect, onOpen }) {
  return <article className={`game-entry ${selected ? 'is-selected' : ''}`} onMouseEnter={onSelect}>
    <button className="entry-hit-area" onClick={onOpen} aria-label={`Open ${item.platform}: ${item.title}`}>
      <div className="cover-wrap"><img src={item.image} alt={`${item.title} parody cover`} /><span className="cover-sheen" /></div>
      <div className="entry-copy">
        <div className="entry-heading"><span className="entry-kicker">GAME ACTIVITY</span><ChevronRight className="entry-arrow" size={20} /></div>
        <h2>{item.title}</h2>
        <p className="descriptor">{item.descriptor}</p>
        <div className="entry-meta">
          <span className="achievement"><strong>{item.achievements} <Trophy size={15} fill="currentColor" /></strong><small>ACHIEVEMENTS</small></span>
          <span className="achievement"><strong>{item.gamerscore.replace('/', ' / ')} <i className="g-badge">G</i></strong><small>GAMERSCORE</small></span>
        </div>
        <div className="platform-row">
          <div className="platform"><BrandIcon platform={item.platform} /><span className="platform-name">{item.platform}</span></div>
          <div className="card-actions"><Gamepad2 size={22} fill="currentColor" /><Info size={15} fill="currentColor" /></div>
        </div>
      </div>
    </button>
  </article>;
}

function ControllerFooter({ onOpen, onBack, onAbout, onRandom }) {
  return <footer className="controller-footer">
    <button onClick={onOpen} aria-label="Open selected link"><span className="controller-button a">A</span><b>OPEN</b></button>
    <button onClick={onBack} aria-label="Go back to the first link"><span className="controller-button b">B</span><b>BACK</b></button>
    <button onClick={onAbout} aria-label="Open about panel"><span className="controller-button x">X</span><b>ABOUT</b></button>
    <button onClick={onRandom} aria-label="Choose a random link"><span className="controller-button y">Y</span><b>RANDOM</b></button>
  </footer>;
}

function AboutBlade({ onClose }) {
  return <div className="blade-backdrop" onClick={onClose}>
    <section className="about-blade" role="dialog" aria-modal="true" aria-labelledby="about-title" onClick={e => e.stopPropagation()}>
      <div className="about-titlebar"><span className="about-info">i</span><h2 id="about-title">About</h2></div>
      <div className="about-copy">
        <p>Welcome to bludlung.com.</p>
        <p>This is where you can find BLUDLUNG's projects, socials, experiments, and things currently in development.</p>
        <p>Use the dashboard to find everything BLUDLUNG in one place. New links and projects will be added as they are ready.</p>
        <p>Stay a while. Something new is probably on the way.</p>
      </div>
      <button className="about-continue" onClick={onClose}>Continue</button>
      <div className="about-controls"><span><i className="controller-button a">A</i> Select</span><span><i className="controller-button b">B</i> Back</span></div>
    </section>
  </div>;
}

function XboxBadge() {
  return <div className="xbox-badge" aria-hidden="true"><img src={achievementBadge} alt="" /></div>;
}

function Toast({ toast }) {
  if (!toast) return null;
  return <div className="achievement-toast" role="status" aria-live="polite"><XboxBadge /><div className="toast-copy"><span>Achievement Unlocked</span><strong>{toast.gamerscore}G - {toast.title}</strong></div></div>;
}

function MusicToggle({ enabled, onToggle }) {
  return <button className={`music-toggle ${enabled ? 'is-on' : ''}`} onClick={onToggle} aria-pressed={enabled} aria-label={enabled ? 'Turn menu music off' : 'Turn menu music on'}>
    {enabled ? <Music3 size={16} /> : <Music2 size={16} />}<span>MUSIC {enabled ? 'ON' : 'OFF'}</span>
  </button>;
}

function App() {
  const [selected, setSelected] = useState(0);
  const [about, setAbout] = useState(false);
  const [muted, setMuted] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const [toast, setToast] = useState(null);
  const [unlocked, setUnlocked] = useState(() => {
    try {
      if (new URLSearchParams(window.location.search).has('reset-achievements')) {
        localStorage.removeItem('bludlung-achievements');
        window.history.replaceState({}, '', window.location.pathname);
        return new Set();
      }
      return new Set(JSON.parse(localStorage.getItem('bludlung-achievements') || '[]'));
    } catch { return new Set(); }
  });
  const opened = useRef(new Set());
  const sequence = useRef([]);
  const entryRefs = useRef([]);
  const audioContext = useRef(null);
  const ambientNodes = useRef([]);

  const unlock = (id) => {
    if (unlocked.has(id)) return;
    const achievement = ACHIEVEMENTS.find(item => item.id === id);
    if (!achievement) return;
    const next = new Set(unlocked); next.add(id);
    setUnlocked(next);
    try { localStorage.setItem('bludlung-achievements', JSON.stringify([...next])); } catch { /* Storage is optional. */ }
    setToast(achievement);
    playTone('toast');
    window.setTimeout(() => setToast(current => current?.id === id ? null : current), 5200);
  };

  const playTone = (type) => {
    if (muted) return;
    try {
      audioContext.current ||= new AudioContext();
      const ctx = audioContext.current;
      const now = ctx.currentTime;
      const patterns = {
        select: [[420, 0, 0.045], [650, 0.035, 0.065]],
        open: [[480, 0, 0.05], [720, 0.045, 0.055], [980, 0.09, 0.1]],
        back: [[300, 0, 0.065], [185, 0.04, 0.09]],
        toast: [[620, 0, 0.05], [820, 0.045, 0.06], [1160, 0.095, 0.14]],
      };
      (patterns[type] || patterns.select).forEach(([frequency, offset, duration]) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(frequency, now + offset);
        gain.gain.setValueAtTime(0.0001, now + offset); gain.gain.exponentialRampToValueAtTime(0.035, now + offset + 0.008); gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + duration);
        osc.connect(gain); gain.connect(ctx.destination); osc.start(now + offset); osc.stop(now + offset + duration + 0.01);
      });
    } catch { /* Audio is a small enhancement and may be unavailable. */ }
  };

  const toggleAmbient = () => {
    if (ambientOn) {
      ambientNodes.current.forEach(node => { try { node.stop(); } catch {} });
      ambientNodes.current = [];
      setAmbientOn(false);
      return;
    }
    try {
      audioContext.current ||= new AudioContext();
      const ctx = audioContext.current;
      const master = ctx.createGain(); master.gain.value = 0.012; master.connect(ctx.destination);
      const notes = [146.83, 220, 293.66];
      ambientNodes.current = notes.map((frequency, index) => {
        const osc = ctx.createOscillator(); const swell = ctx.createGain();
        osc.type = index === 1 ? 'triangle' : 'sine'; osc.frequency.value = frequency; swell.gain.value = index === 1 ? 0.5 : 0.32;
        osc.connect(swell); swell.connect(master); osc.start(); return osc;
      });
      setAmbientOn(true);
    } catch { setAmbientOn(false); }
  };

  useEffect(() => { entryRefs.current[selected]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [selected]);

  const openSelected = () => {
    const item = LINKS[selected]; opened.current.add(item.id); playTone('open');
    window.open(SOCIAL_LINKS[item.id], '_blank', 'noopener,noreferrer');
    if (opened.current.size === 1) unlock('first-contact');
    if (opened.current.size === LINKS.length) unlock('full-network');
  };
  const move = (direction) => { setSelected(current => { const next = (current + direction + LINKS.length) % LINKS.length; playTone('select'); return next; }); };
  const random = () => { let next = selected; while (next === selected) next = Math.floor(Math.random() * LINKS.length); setSelected(next); playTone('select'); };
  const aboutClose = () => { setAbout(false); playTone('back'); };
  const openAbout = () => { setAbout(true); unlock('intel-acquired'); playTone('open'); };

  useEffect(() => {
    const handleKey = (event) => {
      if (about) { if (event.key === 'Escape' || event.key.toLowerCase() === 'b' || event.key.toLowerCase() === 'x') aboutClose(); return; }
      const key = event.key.toLowerCase();
      if (event.key === 'ArrowDown' || key === 's') { event.preventDefault(); move(1); }
      else if (event.key === 'ArrowUp' || key === 'w') { event.preventDefault(); move(-1); }
      else if (event.key === 'Enter' || key === 'a') { event.preventDefault(); openSelected(); }
      else if (event.key === 'Escape' || key === 'b') { event.preventDefault(); setSelected(0); window.scrollTo({ top: 0, behavior: 'smooth' }); playTone('back'); }
      else if (key === 'x') setAbout(true);
      else if (key === 'y') random();
      sequence.current = [...sequence.current, key].slice(-10);
      if (sequence.current.join(' ') === 'arrowup arrowup arrowdown arrowdown arrowleft arrowright arrowleft arrowright b a') unlock('touch-grass');
    };
    window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey);
  });

  const list = useMemo(() => LINKS, []);
  return <div className="app">
    <Header muted={muted} setMuted={setMuted} unlockedCount={unlocked.size} onAbout={openAbout} />
    <main className="shell">
      <div className="topline"><nav className="tabs" aria-label="Library controls">
        <button className="nav-control active"><ChevronDown className="nav-chevron" size={20} strokeWidth={2.5} /><span><strong>show me</strong><em>all games</em></span></button>
        <button className="nav-control"><ChevronDown className="nav-chevron" size={20} strokeWidth={2.5} /><span><strong>sort</strong><em>titles</em></span></button>
      </nav></div>
      <div className="library-heading"><span>BLUDLUNG'S GAMES</span><div className="green-rule" /></div>
      <section className="library" aria-label="BLUDLUNG social links">
        {list.map((item, index) => <div key={item.id} ref={el => entryRefs.current[index] = el}><GameEntry item={item} selected={selected === index} onSelect={() => { if (selected !== index) playTone('select'); setSelected(index); }} onOpen={openSelected} /></div>)}
      </section>
    </main>
    <div className="scroll-hint"><ArrowUp size={13} /> <span>SELECT</span> <ArrowDown size={13} /></div>
    <ControllerFooter onOpen={openSelected} onBack={() => { setSelected(0); window.scrollTo({ top: 0, behavior: 'smooth' }); playTone('back'); }} onAbout={openAbout} onRandom={random} />
    <MusicToggle enabled={ambientOn} onToggle={() => { toggleAmbient(); if (!ambientOn) unlock('ambient-protocol'); }} />
    {about && <AboutBlade onClose={aboutClose} />}
    <Toast toast={toast} />
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
