import Observer from '@/components/observer';

export default function Home() {
  console.log('[Home] render');
  return (
    <div>
      <h1>페이지 소스가 살아있는것을 확인</h1>
      <Observer />
    </div>
  );
}
