import React, { useState } from 'react';
import './App.css';

// 유튜브 비디오 ID 추출 함수
function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// 썸네일 품질 옵션
const THUMBNAIL_QUALITIES = [
  { id: 'maxresdefault', label: '최고 화질', size: '1280 x 720', desc: 'HD 품질' },
  { id: 'sddefault', label: '고화질', size: '640 x 480', desc: '표준 크기' },
  { id: 'hqdefault', label: '중간 화질', size: '480 x 360', desc: '작은 크기' },
  { id: 'mqdefault', label: '저화질', size: '320 x 180', desc: '미리보기용' },
];

function App() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState('');
  const [loadedImages, setLoadedImages] = useState({});
  const [failedImages, setFailedImages] = useState({});

  const handleExtract = () => {
    setError('');
    setLoadedImages({});
    setFailedImages({});

    if (!url.trim()) {
      setError('유튜브 URL을 입력해주세요.');
      return;
    }

    const id = extractVideoId(url.trim());
    if (!id) {
      setError('올바른 유튜브 URL 형식이 아닙니다. 다시 확인해주세요.');
      return;
    }

    setVideoId(id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleExtract();
    }
  };

  const handleImageLoad = (qualityId) => {
    setLoadedImages(prev => ({ ...prev, [qualityId]: true }));
  };

  const handleImageError = (qualityId) => {
    setFailedImages(prev => ({ ...prev, [qualityId]: true }));
  };

  const handleDownload = async (qualityId, label) => {
    const imageUrl = `https://img.youtube.com/vi/${videoId}/${qualityId}.jpg`;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `youtube_thumbnail_${videoId}_${qualityId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // CORS 문제 발생 시 새 탭에서 열기
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="app">
      {/* 헤더 */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </div>
          <h1 className="title">썸네일 추출기</h1>
        </div>
        <p className="subtitle">유튜브 영상의 고화질 썸네일을 쉽게 추출하세요</p>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="main-content">
        {/* 입력 섹션 */}
        <section className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              className="url-input"
              placeholder="유튜브 영상 URL을 붙여넣으세요..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              id="youtube-url-input"
            />
            <button
              className="extract-btn"
              onClick={handleExtract}
              id="extract-button"
            >
              썸네일 추출
            </button>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </section>

        {/* 결과 섹션 - 항상 표시 */}
        <section className="results-section">
          <div className="results-header">
            <h2 className="results-title">🎬 {videoId ? '추출된 썸네일' : '썸네일 미리보기'}</h2>
            {videoId && <span className="video-id-badge">ID: {videoId}</span>}
          </div>

          <div className="thumbnail-grid">
            {THUMBNAIL_QUALITIES.map((quality) => (
              <div key={quality.id} className="thumbnail-card">
                <div className="thumbnail-image-wrapper">
                  {!videoId ? (
                    /* 빈 플레이스홀더 */
                    <div className="image-placeholder">
                      <span className="placeholder-icon">🖼️</span>
                      <span>URL 입력 후 추출</span>
                    </div>
                  ) : !failedImages[quality.id] ? (
                    <>
                      {!loadedImages[quality.id] && (
                        <div className="loading-overlay">
                          <div className="loading-spinner"></div>
                        </div>
                      )}
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/${quality.id}.jpg`}
                        alt={`${quality.label} 썸네일`}
                        className="thumbnail-image"
                        onLoad={() => handleImageLoad(quality.id)}
                        onError={() => handleImageError(quality.id)}
                        style={{ display: loadedImages[quality.id] ? 'block' : 'none' }}
                      />
                    </>
                  ) : (
                    <div className="image-error">
                      <span className="image-error-icon">🖼️</span>
                      <span>이 화질은 사용할 수 없습니다</span>
                    </div>
                  )}
                </div>

                <div className="thumbnail-info">
                  <div className="quality-info">
                    <span className="quality-label">{quality.label}</span>
                    <span className="quality-size">{quality.size} • {quality.desc}</span>
                  </div>

                  {videoId && !failedImages[quality.id] && (
                    <button
                      className="download-btn"
                      onClick={() => handleDownload(quality.id, quality.label)}
                      id={`download-${quality.id}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      다운로드
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="footer">
        <p>유튜브 영상 링크를 입력하면 다양한 해상도의 썸네일을 추출할 수 있습니다.</p>
      </footer>
    </div>
  );
}

export default App;
