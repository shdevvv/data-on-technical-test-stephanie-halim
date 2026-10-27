import React, { useState, useEffect } from 'react';

// Mock data postingan City News dengan struktur seragam untuk semua orang
const initialNewsFeed = [
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
      { id: 201, author: 'Stephanie', text: 'Langsung gas tanpa ragu 🚀' },
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

  // 2. STATE AUTHENTICATION
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 3. STATE FEED NEWS (Semua data disimpan di state React memori browser)
  const [feed, setFeed] = useState(initialNewsFeed);

  // 4. STATE KOMENTAR AKTIF & TOAST NOTIFIKASI
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // 5. STATE MODAL POST NEWS + UPLOAD GAMBAR
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImagePreview, setNewPostImagePreview] = useState('');

  // Fungsi helper menampilkan toast info
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
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

  // Handle Share (Nyata: Menyalin Link ke Clipboard Pengguna)
  const handleShare = (post) => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast(`🔗 Link berita dari ${post.author} berhasil disalin ke clipboard!`);
      }).catch(() => {
        showToast(`🔗 Link: ${shareUrl}`);
      });
    } else {
      showToast(`🔗 Link: ${shareUrl}`);
    }
  };

  // Toggle Buka/Tutup Komentar
  const handleToggleComment = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
    } else {
      setActiveCommentPostId(postId);
      setCommentInput('');
      // Naikkan views saat postingan dibuka/berinteraksi
      setFeed((prev) =>
        prev.map((item) => (item.id === postId ? { ...item, views: item.views + 1 } : item))
      );
    }
  };

  // Submit Komentar Baru ke useState
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
    showToast('💬 Komentar Anda berhasil diposting!');
  };

  // Handle Pemilihan File Gambar dari Komputer/HP User
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImagePreview(reader.result); // Simpan data URL gambar untuk ditampilkan
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

    const newPost = {
      id: Date.now(),
      author: username || 'Stephanie Halim',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
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
    showToast('🎉 Berita baru Anda berhasil diterbitkan!');
  };

  // ==========================================
  // VIEW 1: SCREEN LOGIN
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="app-frame">
        {/* Status Bar dengan Jam Real-time */}
        <div className="status-bar">
          <span>{currentTime}</span>
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
  // VIEW 2: SCREEN CITY NEWS
  // ==========================================
  return (
    <div className="app-frame">
      {/* 1. Mobile Status Bar dengan Jam Real-Time */}
      <div className="status-bar">
        <span>{currentTime}</span>
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

      {/* Toast Notifikasi Ringan */}
      {toastMessage && <div className="toast-notification">{toastMessage}</div>}

      {/* 3. Feed Area: Semua Kartu Seragam (3 Kartu Pas di Layar Pertama, Scroll ke Bawah untuk Selanjutnya) */}
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

            {/* Baris Interaksi: Share, Views (Mata), Komentar, & Like */}
            <div className="card-footer-stats">
              <span
                className="stat-item"
                title="Salin Link Berita"
                onClick={() => handleShare(item)}
              >
                🔗 Share
              </span>

              <div className="stats-group">
                <span className="stat-item" title="Jumlah pembaca">
                  👁️ {item.views}
                </span>

                <span
                  className="stat-item"
                  title="Lihat / Tulis Komentar"
                  onClick={() => handleToggleComment(item.id)}
                  style={{ color: activeCommentPostId === item.id ? '#65EFFF' : 'inherit', fontWeight: 'bold' }}
                >
                  💬 {item.commentsList.length}
                </span>

                <span
                  className="stat-item"
                  title="Sukai Berita"
                  onClick={() => handleToggleLike(item.id)}
                  style={{ color: item.isLiked ? '#ff4757' : 'inherit' }}
                >
                  {item.isLiked ? '❤️' : '🤍'} {item.likes}
                </span>
              </div>
            </div>

            {/* Kotak Komentar Interaktif (Expandable saat icon komentar diklik) */}
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

      {/* 4. Floating Action Button: POST NEWS (Fixed di Kanan Bawah saat di-scroll) */}
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
