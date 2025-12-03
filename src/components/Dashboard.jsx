import './Dashboard.css';

function Dashboard({ scripts, onNewScript }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>YouTube 대본 생성기</h1>
        <button className="btn btn-primary" onClick={onNewScript}>
          + 새 대본 만들기
        </button>
      </div>

      <div className="scripts-list">
        {scripts.length === 0 ? (
          <div className="empty-state">
            <p>저장된 대본이 없습니다.</p>
            <p>새 대본을 만들어보세요!</p>
          </div>
        ) : (
          <div className="scripts-grid">
            {scripts.map((script) => (
              <div key={script.id} className="script-card">
                <h3>{script.title}</h3>
                <p className="script-date">{formatDate(script.date)}</p>
                <p className="script-preview">
                  {script.content.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
