module.exports = {
  printWidth: 100, // 코드 한 줄의 최대 길이
  tabWidth: 2, // 탭 클릭시 공백 n개로 설정
  useTabs: false, // 탭 대신 공백 사용 여부
  semi: true, // 문장 끝에 세미콜론 사용 여부
  singleQuote: true, // 문자열에 단일 따옴표를 사용 여부
  jsxSingleQuote: false, // JSX에서 단일 따옴표를 사용 여부
  trailingComma: 'es5', // ES5에서 허용되는 경우 후행 콤마 사용
  // 객체 리터럴에서 중괄호 내부에 공백 추가.
  // true인 경우 {foo:bar}는 { foo: bar }로 변환됨
  bracketSpacing: true,
  arrowParens: 'always', // 화살표 함수 매개변수가 하나일 때 괄호 사용
  endOfLine: 'lf', // 개행 문자로 줄바꿈을 설정 (유닉스/리눅스 스타일)
  proseWrap: 'preserve', // 마크다운 텍스트 줄바꿈 방식을 유지
  jsxBracketSameLine: true, // JSX의 마지막 꺽쇠괄호를 다음 줄에 위치할지 말지
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
};
