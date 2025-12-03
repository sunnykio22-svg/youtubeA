// LocalStorage 관리 유틸리티

const STORAGE_KEY = 'youtube_scripts';

// 모든 대본 불러오기
export function loadScripts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load scripts:', error);
    return [];
  }
}

// 대본 저장하기
export function saveScript(script) {
  try {
    const scripts = loadScripts();
    scripts.push(script);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
    return true;
  } catch (error) {
    console.error('Failed to save script:', error);
    return false;
  }
}

// 대본 삭제하기
export function deleteScript(id) {
  try {
    const scripts = loadScripts();
    const filtered = scripts.filter(script => script.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete script:', error);
    return false;
  }
}

// 대본 업데이트하기
export function updateScript(id, updatedScript) {
  try {
    const scripts = loadScripts();
    const index = scripts.findIndex(script => script.id === id);
    if (index !== -1) {
      scripts[index] = { ...scripts[index], ...updatedScript };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to update script:', error);
    return false;
  }
}
