import { useState } from 'react';
import { generateScript } from '../services/aiService';
import './TopicSelection.css';

function TopicSelection({ topics, selectedTopic, onTopicSelected, onScriptGenerated, originalScript }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateScript = async () => {
    if (!selectedTopic) {
      setError('주제를 선택해주세요.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const script = await generateScript(selectedTopic, originalScript);
      onScriptGenerated(script);
    } catch (err) {
      setError('대본 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="topic-selection">
      <div className="step-header">
        <h2>주제 선택</h2>
        <p className="step-description">원하는 주제를 선택하세요</p>
      </div>

      <div className="topics-container">
        {topics.map((topic, index) => (
          <div
            key={index}
            className={`topic-card ${selectedTopic === topic ? 'selected' : ''}`}
            onClick={() => onTopicSelected(topic)}
          >
            <div className="topic-number">{index + 1}</div>
            <div className="topic-content">{topic}</div>
          </div>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}

      <button
        className="btn btn-primary"
        onClick={handleGenerateScript}
        disabled={isLoading || !selectedTopic}
      >
        {isLoading ? '대본 생성 중...' : '이 주제로 대본 생성'}
      </button>
    </div>
  );
}

export default TopicSelection;
