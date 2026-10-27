import React, { useState } from 'react';

// Mock data postingan City News sesuai screenshot soal tes
const initialNewsFeed = [
  {
    id: 1,
    type: 'featured',
    author: 'Andrée-Ann Labranche',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    banner: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    text: 'We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.',
    views: 250,
    comments: 4,
    likes: 18,
    isLiked: false,
  },
  {
    id: 2,
    type: 'standard',
    author: 'Adrien Stone',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
    text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
  },
  {
    id: 3,
    type: 'standard',
    author: 'Bernard Nolan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
    text: "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",
  },
  {
    id: 4,
    type: 'standard',
    author: 'Adrien Stone',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
  },
  {
    id: 5,
    type: 'standard',
    author: 'Bernard Nolan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=300&q=80',
    text: "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",
  },
  {
    id: 6,
    type: 'standard',
    author: 'Adrien Stone',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80',
    text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
  },
  {
    id: 7,
    type: 'standard',
    author: 'Bernard Nolan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=300&q=80',
    text: "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",
  },
];

export default function App() {
  // 1. STATE AUTHENTICATION
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 2. STATE FEED
  const [feed, setFeed] = useState(initialNewsFeed);

  // Handle Login Submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Harap isi username dan password terlebih dahulu!');
      return;
    }
    setLoginError('');
    setIsLoggedIn(true);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  // Handle Like Toggle pada Card Featured
  const handleToggleLike = (id) => {
    setFeed((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = !item.isLiked;
          return {
            ...item,
            isLiked,
            likes: isLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  // Handle Post News Action (Interactive Demo)
  const handlePostNews = () => {
    const textPrompt = prompt('Tulis berita baru untuk City News:');
    if (textPrompt && textPrompt.trim()) {
      const newPost = {
        id: Date.now(),
        type: 'standard',
        author: username || 'Stephanie Halim',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        thumb: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=300&q=80',
        text: textPrompt.trim(),
      };
      setFeed([newPost, ...feed]);
    }
  };

  // ==========================================
  // VIEW 1: SCREEN LOGIN (JIKA BELUM LOGIN)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="app-frame">
        {/* Mobile Status Bar */}
        <div className="status-bar">
          <span>12:30</span>
          <div className="status-icons">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="login-screen">
          <div className="login-brand">
            <div className="login-brand-icon">CN</div>
            <h1 className="login-title">City News</h1>
            <p className="login-subtitle">Masuk untuk melihat update berita terkini</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {loginError && <div className="login-error-msg">{loginError}</div>}

            <div className="login-input-group">
              <label className="login-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username Anda..."
                className="login-input"
                autoFocus
              />
            </div>

            <div className="login-input-group">
              <label className="login-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda..."
                className="login-input"
              />
            </div>

            <button type="submit" className="btn-login-submit">
              MASUK KE CITY NEWS
            </button>
          </form>

          <p className="login-hint">
            * Anda dapat mengisi username dan password apa saja untuk pengujian.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: SCREEN CITY NEWS (SETELAH LOGIN)
  // ==========================================
  return (
    <div className="app-frame">
      {/* 1. Mobile Status Bar */}
      <div className="status-bar">
        <span>12:30</span>
        <div className="status-icons">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* 2. Top Header Navigation */}
      <header className="app-header">
        <div className="header-left">
          <button onClick={handleLogout} title="Kembali ke Login" className="header-back-btn">
            &larr;
          </button>
          <h2 className="header-title">City News</h2>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>

      {/* 3. Feed Area: 3 Kartu Memenuhi 1 Layar Penuh, Lalu Di-scroll untuk Melihat Selanjutnya */}
      <main className="feed-content">
        {feed.map((item) => {
          if (item.type === 'featured') {
            return (
              <article key={item.id} className="card-featured">
                <img src={item.banner} alt="News Banner" className="card-banner" />
                <div className="card-body">
                  <div className="card-author-row">
                    <img src={item.avatar} alt={item.author} className="author-avatar" />
                    <span className="author-name">{item.author}</span>
                  </div>
                  <p className="card-quote-text">{item.text}</p>
                  <div className="card-footer-stats">
                    <span className="stat-item" title="Bagikan">
                      🔗
                    </span>
                    <div className="stats-group">
                      <span className="stat-item">👁️ {item.views}</span>
                      <span className="stat-item">💬 {item.comments}</span>
                      <span
                        className="stat-item"
                        onClick={() => handleToggleLike(item.id)}
                        style={{ color: item.isLiked ? '#ff4757' : 'inherit' }}
                      >
                        {item.isLiked ? '❤️' : '🤍'} {item.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article key={item.id} className="card-standard">
              <div className="card-left-col">
                <div className="card-author-row">
                  <img src={item.avatar} alt={item.author} className="author-avatar" />
                  <span className="author-name">{item.author}</span>
                </div>
                <p className="card-quote-text">{item.text}</p>
              </div>
              <img src={item.thumb} alt="News Thumbnail" className="card-thumb" />
            </article>
          );
        })}
      </main>

      {/* 4. Floating Action Button: POST NEWS (Fixed di Kanan Bawah saat di-scroll) */}
      <button onClick={handlePostNews} className="btn-post-news">
        POST NEWS
      </button>
    </div>
  );
}
