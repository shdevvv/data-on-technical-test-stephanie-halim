import React, { useState, useEffect } from 'react';

// Mock data postingan City News awal
const defaultNewsFeed = [
  {
    id: 1,
    author: 'Andrée-Ann Labranche',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=300&q=80',
    text: 'We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.',
    views: 250,
    likes: 18,
    isLiked: false,
    commentsList: [
      { id: 101, author: 'Adrien Stone', text: 'Inspiratif sekali!' },
      { id: 102, author: 'Bernard Nolan', text: 'Setuju banget dengan kutipan ini.' },
    ],
  },
  {
    id: 2,
    author: 'Adrien Stone',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
    text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    views: 189,
    likes: 24,
    isLiked: false,
    commentsList: [
      { id: 201, author: 'Stephanie', text: 'Langsung gas tanpa ragu!' },
    ],
  },
  {
    id: 3,
    author: 'Bernard Nolan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
    text: "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",
    views: 312,
    likes: 42,
    isLiked: false,
    commentsList: [],
  },
  {
    id: 4,
    author: 'Adrien Stone',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    views: 145,
    likes: 12,
    isLiked: false,
    commentsList: [],
  },
  {
    id: 5,
    author: 'Bernard Nolan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=300&q=80',
    text: "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",
    views: 205,
    likes: 30,
    isLiked: false,
    commentsList: [],
  },
  {
    id: 6,
    author: 'Adrien Stone',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80',
    text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    views: 98,
    likes: 7,
    isLiked: false,
    commentsList: [],
  },
  {
    id: 7,
    author: 'Bernard Nolan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    thumb: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=300&q=80',
    text: "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",
    views: 167,
    likes: 19,
    isLiked: false,
    commentsList: [],
  },
];

export default function App() {
  // 1. STATE JAM REAL-TIME DINAMIS
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. STATE AUTHENTICATION & PROFIL PENGGUNA (Tanpa dummy foto sebelum di-upload)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileAvatar, setProfileAvatar] = useState(null); // Default null (tidak ada dummy foto)
  const [loginError, setLoginError] = useState('');

  // 3. STATE FEED NEWS (Dengan localStorage Persistence)
  const [feed, setFeed] = useState(() => {
    try {
      const savedFeed = localStorage.getItem('city_news_feed');
      return savedFeed ? JSON.parse(savedFeed) : defaultNewsFeed;
    } catch {
      return defaultNewsFeed;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('city_news_feed', JSON.stringify(feed));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [feed]);

  // 4. STATE KOMENTAR AKTIF & TOAST NOTIFIKASI
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // 5. STATE MODAL POST NEWS + UPLOAD GAMBAR
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImagePreview, setNewPostImagePreview] = useState('');

  // Helper menampilkan notifikasi toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handle Upload Foto Profil sebelum Login
  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  // Handle Like Toggle
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

  // Handle Share (Salin Link ke Clipboard Pengguna)
  const handleShare = (post) => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast(`Link berita dari ${post.author} berhasil disalin ke clipboard!`);
      }).catch(() => {
        showToast(`Link: ${shareUrl}`);
      });
    } else {
      showToast(`Link: ${shareUrl}`);
    }
  };

  // Toggle Buka/Tutup Komentar
  const handleToggleComment = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
    } else {
      setActiveCommentPostId(postId);
      setCommentInput('');
      setFeed((prev) =>
        prev.map((item) => (item.id === postId ? { ...item, views: item.views + 1 } : item))
      );
    }
  };

  // Submit Komentar Baru
  const handleAddComment = (postId) => {
    if (!commentInput.trim()) return;

    setFeed((prev) =>
      prev.map((item) => {
        if (item.id === postId) {
          const newComment = {
            id: Date.now(),
            author: username || 'Stephanie Halim',
            text: commentInput.trim(),
          };
          return {
            ...item,
            commentsList: [...item.commentsList, newComment],
          };
        }
        return item;
      })
    );

    setCommentInput('');
    showToast('Komentar Anda berhasil diposting!');
  };

  // Handle Pemilihan File Gambar Berita
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Post News Baru
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) {
      alert('Tuliskan teks berita terlebih dahulu!');
      return;
    }

    const fallbackAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';

    const newPost = {
      id: Date.now(),
      author: username || 'Stephanie Halim',
      avatar: profileAvatar || fallbackAvatar,
      thumb: newPostImagePreview || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
      text: newPostText.trim(),
      views: 1,
      likes: 0,
      isLiked: false,
      commentsList: [],
    };

    setFeed([newPost, ...feed]);
    setNewPostText('');
    setNewPostImagePreview('');
    setIsPostModalOpen(false);
    showToast('Berita baru Anda berhasil diterbitkan!');
  };

  // ==========================================
  // VIEW 1: SCREEN LOGIN (TANPA DUMMY FOTO PROFILE)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="app-frame">
        {/* Status Bar dengan Jam Real-time */}
        <div className="status-bar">
          <span>{currentTime}</span>
          <div className="status-icons">
            <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
              <rect x="0" y="8" width="2" height="3" rx="0.5"/>
              <rect x="4" y="5.5" width="2" height="5.5" rx="0.5"/>
              <rect x="8" y="3" width="2" height="8" rx="0.5"/>
              <rect x="12" y="0" width="2" height="11" rx="0.5"/>
            </svg>
            <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM4.1 6.8a5.5 5.5 0 0 1 7.8 0 .8.8 0 0 1-1.1 1.1 4 4 0 0 0-5.6 0 .8.8 0 0 1-1.1-1.1zm-3-3a9.8 9.8 0 0 1 13.8 0 .8.8 0 0 1-1.1 1.1 8.3 8.3 0 0 0-11.6 0 .8.8 0 0 1-1.1-1.1z"/>
            </svg>
            <svg width="16" height="11" viewBox="0 0 20 12" fill="currentColor">
              <rect x="1" y="1" width="16" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="3" y="3" width="10" height="6" rx="1"/>
              <path d="M18 4.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="login-screen">
          <div className="login-brand">
            {/* Upload Foto Profil (Placeholder Bersih Tanpa Dummy Foto) */}
            <div className="login-avatar-upload-wrap">
              {profileAvatar ? (
                <img src={profileAvatar} alt="Foto Profil" className="login-avatar-preview" />
              ) : (
                <div className="login-avatar-placeholder">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#A3ABB4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              )}
              <label className="login-avatar-badge" title="Pilih Foto Profil (Opsional)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <h1 className="login-title">City News</h1>
            <p className="login-subtitle">
              {profileAvatar ? 'Foto profil terpilih ✓' : 'Klik ikon kamera untuk pasang foto profil (opsional)'}
            </p>
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
  // VIEW 2: SCREEN CITY NEWS
  // ==========================================
  return (
    <div className="app-frame">
      {/* 1. Mobile Status Bar dengan Jam Real-Time */}
      <div className="status-bar">
        <span>{currentTime}</span>
        <div className="status-icons">
          <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
            <rect x="0" y="8" width="2" height="3" rx="0.5"/>
            <rect x="4" y="5.5" width="2" height="5.5" rx="0.5"/>
            <rect x="8" y="3" width="2" height="8" rx="0.5"/>
            <rect x="12" y="0" width="2" height="11" rx="0.5"/>
          </svg>
          <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM4.1 6.8a5.5 5.5 0 0 1 7.8 0 .8.8 0 0 1-1.1 1.1 4 4 0 0 0-5.6 0 .8.8 0 0 1-1.1-1.1zm-3-3a9.8 9.8 0 0 1 13.8 0 .8.8 0 0 1-1.1 1.1 8.3 8.3 0 0 0-11.6 0 .8.8 0 0 1-1.1-1.1z"/>
          </svg>
          <svg width="16" height="11" viewBox="0 0 20 12" fill="currentColor">
            <rect x="1" y="1" width="16" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="3" y="3" width="10" height="6" rx="1"/>
            <path d="M18 4.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* 2. Top Header Navigation */}
      <header className="app-header">
        <div className="header-left">
          <button onClick={handleLogout} title="Kembali ke Login" className="header-back-btn">
            &larr;
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {profileAvatar ? (
              <img src={profileAvatar} alt={username} className="header-user-avatar" />
            ) : (
              <div className="header-user-avatar header-user-initial">
                {username ? username.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <h2 className="header-title">City News</h2>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>

      {/* Toast Notifikasi Ringan */}
      {toastMessage && <div className="toast-notification">{toastMessage}</div>}

      {/* 3. Feed Area: 3 Kartu Memenuhi 1 Layar Penuh, Scroll ke Bawah untuk Selanjutnya */}
      <main className="feed-content">
        {feed.map((item) => (
          <article key={item.id} className="card-standard">
            <div className="card-main-row">
              <div className="card-left-col">
                <div className="card-author-row">
                  <img src={item.avatar} alt={item.author} className="author-avatar" />
                  <span className="author-name">{item.author}</span>
                </div>
                <p className="card-quote-text">{item.text}</p>
              </div>
              <img src={item.thumb} alt="News Thumbnail" className="card-thumb" />
            </div>

            {/* Baris Interaksi: 2D Minimal Flat Vector Icons */}
            <div className="card-footer-stats">
              <span
                className="stat-item"
                title="Salin Link Berita"
                onClick={() => handleShare(item)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                <span>Share</span>
              </span>

              <div className="stats-group">
                <span className="stat-item" title="Jumlah pembaca">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>{item.views}</span>
                </span>

                <span
                  className="stat-item"
                  title="Lihat / Tulis Komentar"
                  onClick={() => handleToggleComment(item.id)}
                  style={{ color: activeCommentPostId === item.id ? '#65EFFF' : 'inherit', fontWeight: 'bold' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>{item.commentsList.length}</span>
                </span>

                <span
                  className="stat-item"
                  title="Sukai Berita"
                  onClick={() => handleToggleLike(item.id)}
                  style={{ color: item.isLiked ? '#ff4757' : 'inherit' }}
                >
                  {item.isLiked ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#ff4757" stroke="#ff4757" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  )}
                  <span>{item.likes}</span>
                </span>
              </div>
            </div>

            {/* Kotak Komentar Interaktif (Expandable) */}
            {activeCommentPostId === item.id && (
              <div className="comment-box-area">
                <div className="comment-list">
                  {item.commentsList.length === 0 ? (
                    <p className="comment-empty-text">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                  ) : (
                    item.commentsList.map((c) => (
                      <div key={c.id} className="comment-item">
                        <span className="comment-author">{c.author}:</span> {c.text}
                      </div>
                    ))
                  )}
                </div>

                <div className="comment-input-row">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Tulis komentar Anda..."
                    className="comment-input-field"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(item.id);
                    }}
                  />
                  <button
                    onClick={() => handleAddComment(item.id)}
                    className="comment-submit-btn"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </main>

      {/* 4. Floating Action Button: POST NEWS (SELALU TAMPAK DI KANAN BAWAH CONTAINER, TIDAK TERPENGARUH SCROLL) */}
      <button onClick={() => setIsPostModalOpen(true)} className="btn-post-news">
        POST NEWS
      </button>

      {/* 5. Modal Dialog: Form Post News dengan Upload Gambar */}
      {isPostModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3 className="modal-title">Buat Berita Baru</h3>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="modal-close-btn"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="modal-form">
              <div className="login-input-group">
                <label className="login-label">Isi Berita / Kutipan</label>
                <textarea
                  rows="3"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Ketik berita atau kutipan yang ingin dibagikan..."
                  className="login-input"
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              <div className="login-input-group">
                <label className="login-label">Upload Foto Berita</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="login-input"
                  style={{ padding: '8px' }}
                />
              </div>

              {/* Preview Gambar yang dipilih */}
              {newPostImagePreview && (
                <div style={{ textAlign: 'center', marginTop: '6px' }}>
                  <img
                    src={newPostImagePreview}
                    alt="Preview"
                    style={{ maxHeight: '110px', borderRadius: '8px', objectFit: 'cover', maxWidth: '100%' }}
                  />
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="btn-modal-cancel"
                >
                  Batal
                </button>
                <button type="submit" className="btn-modal-submit">
                  Terbitkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
