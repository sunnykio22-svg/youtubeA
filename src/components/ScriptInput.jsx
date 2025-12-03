import { useState } from 'react';
import { generateTopics } from '../services/aiService';
import './ScriptInput.css';

function ScriptInput({ currentScript, setCurrentScript, onTopicsGenerated, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateTopics = async () => {
    if (!currentScript.trim()) {
      setError('대본을 입력해주세요.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const topics = await generateTopics(currentScript);
      onTopicsGenerated(topics);
    } catch (err) {
      setError('주제 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="script-input">
      <div className="step-header">
        <button className="btn-back" onClick={onBack}>
          ← 돌아가기
        </button>
        <h2>기존 대본 입력</h2>
      </div>

      <div className="input-container">
        <textarea
          className="script-textarea"
          placeholder="기존 대본을 입력하거나 붙여넣기 하세요..."
          value={currentScript}
          onChange={(e) => setCurrentScript(e.target.value)}
          rows={15}
        />
        
        {error && <p className="error-message">{error}</p>}

        <button
          className="btn btn-primary"
          onClick={handleGenerateTopics}
          disabled={isLoading || !currentScript.trim()}
        >
          {isLoading ? '주제 생성 중...' : '주제 추천받기'}
        </button>
      </div>
    </div>
  );
}

export default ScriptInput;
