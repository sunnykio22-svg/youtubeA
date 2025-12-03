import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ScriptInput from './components/ScriptInput';
import TopicSelection from './components/TopicSelection';
import ScriptEditor from './components/ScriptEditor';
import { loadScripts, saveScript } from './utils/storage';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('dashboard');
  const [scripts, setScripts] = useState([]);
  const [currentScript, setCurrentScript] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');

  useEffect(() => {
    const savedScripts = loadScripts();
    setScripts(savedScripts);
  }, []);

  const handleNewScript = () => {
    setCurrentStep('input');
    setCurrentScript('');
    setTopics([]);
    setSelectedTopic('');
    setGeneratedScript('');
  };

  const handleTopicsGenerated = (generatedTopics) => {
    setTopics(generatedTopics);
    setCurrentStep('selection');
  };

  const handleTopicSelected = (topic) => {
    setSelectedTopic(topic);
  };

  const handleScriptGenerated = (script) => {
    setGeneratedScript(script);
    setCurrentStep('editor');
  };

  const handleSaveScript = (title, content) => {
    const newScript = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString(),
    };
    
    const updatedScripts = [...scripts, newScript];
    setScripts(updatedScripts);
    saveScript(newScript);
    
    setCurrentStep('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentStep('dashboard');
  };

  return (
    <div className="app">
      {currentStep === 'dashboard' && (
        <Dashboard
          scripts={scripts}
          onNewScript={handleNewScript}
        />
      )}
      
      {currentStep === 'input' && (
        <ScriptInput
          currentScript={currentScript}
          setCurrentScript={setCurrentScript}
          onTopicsGenerated={handleTopicsGenerated}
          onBack={handleBackToDashboard}
        />
      )}
      
      {currentStep === 'selection' && (
        <TopicSelection
          topics={topics}
          selectedTopic={selectedTopic}
          onTopicSelected={handleTopicSelected}
          onScriptGenerated={handleScriptGenerated}
          originalScript={currentScript}
        />
      )}
      
      {currentStep === 'editor' && (
        <ScriptEditor
          initialScript={generatedScript}
          onSave={handleSaveScript}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;
