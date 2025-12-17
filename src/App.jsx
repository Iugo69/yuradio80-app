import React, { useState, useEffect, useRef } from 'react';
import { Radio, Video, Youtube, Facebook, Instagram, MessageCircle, ExternalLink } from 'lucide-react';

// Componente Analizzatore Spettro
function SpectrumAnalyzer({ isPlaying = true }) {
  const [spectrum, setSpectrum] = useState(Array(20).fill(0));
  const animationRef = useRef(null);
  const bassRef = useRef(0);
  const midRef = useRef(0);
  const trebleRef = useRef(0);

  useEffect(() => {
    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.05;

      if (isPlaying) {
        const bassTarget = Math.abs(Math.sin(time * 2)) * 0.8 + 0.2;
        const midTarget = Math.abs(Math.sin(time * 3 + 1)) * 0.7 + 0.3;
        const trebleTarget = Math.abs(Math.sin(time * 5 + 2)) * 0.9 + 0.1;

        bassRef.current += (bassTarget - bassRef.current) * 0.1;
        midRef.current += (midTarget - midRef.current) * 0.15;
        trebleRef.current += (trebleTarget - trebleRef.current) * 0.2;

        const newSpectrum = Array(20).fill(0).map((_, index) => {
          const noise = Math.random() * 0.2;
          if (index < 7) return Math.min(bassRef.current + noise, 1);
          if (index < 14) return Math.min(midRef.current + noise, 1);
          return Math.min(trebleRef.current + noise, 1);
        });
        setSpectrum(newSpectrum);
      } else {
        setSpectrum(Array(20).fill(0).map(() => Math.random() * 0.3));
      }
    };
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const getBarColor = (height) => {
    const colors = [
      'linear-gradient(to top, #a855f7, #9333ea)',
      'linear-gradient(to top, #9333ea, #22d3ee)',
      'linear-gradient(to top, #22d3ee, #06b6d4)',
      'linear-gradient(to top, #06b6d4, #a855f7)',
      'linear-gradient(to top, #a855f7, #ec4899)',
      'linear-gradient(to top, #ec4899, #a855f7)'
    ];
    const colorIndex = Math.floor(height * colors.length);
    return colors[Math.min(colorIndex, 5)];
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(34, 211, 238, 0.1))',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '2px', height: '80px' }}>
        {spectrum.map((value, index) => {
          const height = Math.max(value * 100, 5);
          return (
            <div
              key={index}
              style={{
                width: '100%',
                height: `${height}%`,
                background: getBarColor(value),
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.075s ease'
              }}
            />
          );
        })}
      </div>
      {isPlaying && (
        <p style={{ textAlign: 'center', color: '#22d3ee', fontSize: '12px', marginTop: '8px' }}>
          🎵 In riproduzione
        </p>
      )}
    </div>
  );
}

// App principale
function App() {
  const [currentPage, setCurrentPage] = useState('radio');
  const [isPlaying, setIsPlaying] = useState(false);

  const playlists = [
    { id: 1, title: "80's Hits Collection", url: "https://www.youtube.com/playlist?list=PLjD7QY4r-t34s39dCISmpbS3WrmvhlVNF" },
    { id: 2, title: "ItalianMix", url: "https://www.youtube.com/playlist?list=PLjD7QY4r-t34pgwcygpY3ZRlK8w4DHsGK" },
    { id: 3, title: "Best of Italo Disco", url: "https://www.youtube.com/playlist?list=PLjD7QY4r-t36BAI46GepKuvsIVKB35dxG" },
    { id: 4, title: "Cartoons Mix", url: "https://www.youtube.com/playlist?list=PLjD7QY4r-t37WvVW2KWeGKkDdOzdt0Zhp" },
    { id: 5, title: "Ambient Style", url: "https://www.youtube.com/playlist?list=PLjD7QY4r-t366N83v-PuFlmZ2QVL9c2nv" },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', flexDirection: 'column' }}>
    {/* Header */}
    <header style={{
      background: 'linear-gradient(to right, #9333ea, #22d3ee, #9333ea)',
      padding: '16px',
      boxShadow: '0 4px 20px rgba(168, 85, 247, 0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        {/* Logo con fallback */}
        <img 
          src="/images/logo.png"
          alt="YURADIO80 Logo" 
          style={{ 
            width: '48px', 
            height: '48px',
            flexShrink: 0,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'block';
          }}
        />
        <Radio 
          color="white" 
          size={40} 
          style={{ display: 'none', flexShrink: 0 }}
        />
        
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>YURADIO80</h1>
          <a 
            href="https://www.yuradio80.it" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#d1fae5', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
          >
            www.yuradio80.it
          </a>
        </div>
      </div>
    </header>

      {/* Navigation */}
      <nav style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex' }}>
        {[
          { id: 'radio', label: 'OnAir', icon: Radio },
          { id: 'live', label: 'MixCloud Live', icon: Video },
          { id: 'playlist', label: 'Youtube Playlist', icon: Youtube }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentPage(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '16px',
              flex: 1,
              background: 'none',
              border: 'none',
              borderBottom: currentPage === id ? '2px solid #22d3ee' : '2px solid transparent',
              color: currentPage === id ? '#22d3ee' : '#9ca3af',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {/* Radio Page */}
        {currentPage === 'radio' && (
          <div style={{ padding: '32px 16px', maxWidth: '1024px', margin: '0 auto' }}>
            <h2 style={{
              background: 'linear-gradient(to right, #a855f7, #22d3ee, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '32px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              NoStress DanceMusicMix 80' 90'
            </h2>

            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #9333ea, #22d3ee)',
                borderRadius: '16px',
                padding: '2px',
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.5)'
              }}>
                <div style={{ backgroundColor: '#000', borderRadius: '14px', padding: '16px' }}>
                  <iframe 
                    src="https://zeno.fm/player/yuradio80" 
                    width="768" 
                    height="300" 
                    frameBorder="0" 
                    scrolling="no"
                    title="YURADIO80 Player"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                    onLoad={() => setIsPlaying(true)}
                  />
                  <a 
                    href="https://zeno.fm/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'block', textAlign: 'center', marginTop: '8px', color: '#9ca3af', fontSize: '12px', textDecoration: 'none' }}
                  >
                    A Zeno.FM Station
                  </a>
                </div>
              </div>
            </div>

            <SpectrumAnalyzer isPlaying={isPlaying} />
          </div>
        )}

        {/* Live Page */}
        {currentPage === 'live' && (
          <div style={{ padding: '32px 16px', maxWidth: '1024px', margin: '0 auto' }}>
            <h2 style={{
              background: 'linear-gradient(to right, #a855f7, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '32px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              Live su Mixcloud
            </h2>

            <div style={{
              background: 'linear-gradient(135deg, #9333ea, #22d3ee)',
              borderRadius: '16px',
              padding: '2px',
              boxShadow: '0 20px 40px rgba(168, 85, 247, 0.5)',
              marginBottom: '24px'
            }}>
              <img 
                src="/images/live-bg.png"
                alt="YURADIO80 Live"
                style={{ width: '100%', borderRadius: '14px' }}
              />
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(34, 211, 238, 0.1))',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <p style={{ color: '#d1d5db', fontSize: '14px', marginBottom: '16px' }}>
                La diretta Mixcloud si apre in una nuova finestra per una migliore esperienza di streaming.
              </p>
              <a
                href="https://www.mixcloud.com/live/YURADIO80/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(to right, #9333ea, #22d3ee)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 10px rgba(168, 85, 247, 0.3)',
                  cursor: 'pointer'
                }}
              >
                <ExternalLink size={20} />
                Apri Mixcloud Live
              </a>
            </div>
          </div>
        )}

        {/* Playlist Page */}
        {currentPage === 'playlist' && (
          <div style={{ padding: '32px 16px', maxWidth: '1024px', margin: '0 auto' }}>
            <h2 style={{
              background: 'linear-gradient(to right, #a855f7, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '32px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              Playlist YouTube
            </h2>

            <div style={{
              background: 'linear-gradient(135deg, #9333ea, #22d3ee)',
              borderRadius: '16px',
              padding: '2px',
              boxShadow: '0 20px 40px rgba(34, 211, 238, 0.5)',
              marginBottom: '24px'
            }}>
              <img 
                src="/images/playlist-bg.png"
                alt="YURADIO80 Playlist"
                style={{ width: '100%', borderRadius: '14px' }}
              />
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(34, 211, 238, 0.1))',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              marginBottom: '24px',
              maxWidth: '700px',
              margin: '0 auto 24px'
            }}>
              <h3 style={{ color: '#22d3ee', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                Le Nostre Playlist:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {playlists.map((playlist) => (
                  <a
                    key={playlist.id}
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '12px',
                      border: '1px solid rgba(168, 85, 247, 0.2)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)';
                      e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                    }}
                  >
                    <Youtube color="#a855f7" size={24} />
                    <span style={{ color: 'white', fontWeight: 600, flex: 1 }}>{playlist.title}</span>
                    <ExternalLink color="#6b7280" size={16} />
                  </a>
                ))}
              </div>
              <p style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
                Clicca su una playlist per aprirla su YouTube
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(34, 211, 238, 0.1))',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              <a
                href="https://www.youtube.com/@YURADIO80/playlists"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(to right, #9333ea, #22d3ee)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 10px rgba(168, 85, 247, 0.3)',
                  cursor: 'pointer'
                }}
              >
                <Youtube size={20} />
                Vedi Tutte le Playlist
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid rgba(168, 85, 247, 0.3)', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '8px' }}>
          {[
            { icon: Youtube, url: 'https://www.youtube.com/@YURADIO80', color: '#22d3ee' },
            { icon: Facebook, url: 'https://www.facebook.com/YURADIO80', color: '#a855f7', fill: true },
            { icon: Instagram, url: 'https://www.instagram.com/yuradio80/', color: '#ec4899' },
            { icon: MessageCircle, url: 'https://whatsapp.com/channel/0029Vb7Ksgh4inoiCS37uf07', color: '#22c55e', fill: true }
          ].map(({ icon: Icon, url, color, fill }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'white', cursor: 'pointer', transition: 'transform 0.3s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Icon size={28} fill={fill ? 'currentColor' : 'none'} />
            </a>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '12px', margin: 0 }}>
          © 2021 YURADIO80. All right reserved -- info@yuradio80.it 
          </p>
      </footer>
    </div>
  );
}

export default App;