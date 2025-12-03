// AI API 서비스
// 실제 사용 시에는 OpenAI API, Anthropic Claude API 등을 연동하세요.

// 주제 추천 API
export async function generateTopics(originalScript) {
  // 시뮬레이션을 위한 지연
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 실제 구현 시:
  // const response = await fetch('YOUR_AI_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${YOUR_API_KEY}`
  //   },
  //   body: JSON.stringify({
  //     prompt: `다음 대본을 분석하고 연관된 주제 5개를 추천해주세요:\n\n${originalScript}`
  //   })
  // });
  // const data = await response.json();
  // return data.topics;

  // 데모용 더미 데이터
  return [
    '새로운 관점에서 바라본 주제 확장',
    '실제 사례를 통한 심화 분석',
    '반대 의견에 대한 균형잡힌 고찰',
    '최신 트렌드와의 연결',
    '실생활 적용 방안 제시'
  ];
}

// 대본 생성 API
export async function generateScript(topic, originalScript) {
  // 시뮬레이션을 위한 지연
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 실제 구현 시:
  // const response = await fetch('YOUR_AI_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${YOUR_API_KEY}`
  //   },
  //   body: JSON.stringify({
  //     prompt: `다음 주제로 서론-본론-결론 구조의 YouTube 대본을 작성해주세요.\n주제: ${topic}\n참고 대본: ${originalScript}`
  //   })
  // });
  // const data = await response.json();
  // return data.script;

  // 데모용 더미 데이터
  return `[서론]
안녕하세요, 여러분! 오늘은 "${topic}"에 대해 이야기해보려고 합니다.
이전 영상에서 다뤘던 내용을 바탕으로, 더욱 깊이 있는 관점에서 접근해보겠습니다.

[본론]
먼저, 이 주제가 왜 중요한지 살펴보겠습니다.
${originalScript.substring(0, 100)}... 에서 언급했던 것처럼, 이러한 관점은 매우 중요합니다.

핵심 포인트 1: 실제 사례를 통해 알아보기
구체적인 예시를 들어보자면...

핵심 포인트 2: 실생활 적용 방법
이것을 우리 일상에 어떻게 적용할 수 있을까요?

핵심 포인트 3: 주의해야 할 점
물론 이러한 접근에도 한계는 있습니다.

[결론]
오늘은 "${topic}"에 대해 자세히 알아봤습니다.
핵심을 요약하자면...

여러분의 생각은 어떠신가요? 댓글로 의견을 나눠주세요!
다음 영상에서 더 유익한 내용으로 찾아뵙겠습니다. 감사합니다!`;
}
