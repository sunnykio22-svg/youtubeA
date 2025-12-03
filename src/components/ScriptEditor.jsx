import { useState } from 'react';
import './ScriptEditor.css';

function ScriptEditor({ initialScript, onSave, onBack }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(initialScript);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      setError('대본 내용을 입력해주세요.');
      return;
    }

    setError('');
    onSave(title, content);
  };

  return (
    <div className="script-editor">
      <div className="step-header">
        <h2>대본 편집</h2>
        <p className="step-description">생성된 대본을 확인하고 수정하세요</p>
      </div>

      <div className="editor-container">
        <input
          type="text"
          className="title-input"
          placeholder="대본 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="script-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
        />

        {error && <p className="error-message">{error}</p>}

        <div className="editor-actions">
          <button className="btn btn-secondary" onClick={onBack}>
            취소
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScriptEditor;
