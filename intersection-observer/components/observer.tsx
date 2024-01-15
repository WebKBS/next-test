'use client';
import { useEffect, useRef } from 'react';

console.log('11111');
export default function Observer() {
  const ref = useRef<HTMLDivElement>(null);
  console.log('22222');

  useEffect(() => {
    console.log('33333');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 화면에 보일 때만 스케일과 컬러를 추가
          (entry.target as HTMLElement).style.transform = 'scale(1.8)';
          (entry.target as HTMLElement).style.backgroundColor = 'red';
          (entry.target as HTMLElement).style.transition = 'all 1s';
          console.log(
            `${
              (entry.target as HTMLElement).textContent
            } 엘리먼트가 뷰포트 안에 있습니다!`
          );
        } else {
          // 화면에 보이지 않을 때 초기 스타일로 설정
          // 만약 필요하지 않을시 else문은 삭제해도 됨
          (entry.target as HTMLElement).style.transform = 'scale(1)';
          (entry.target as HTMLElement).style.backgroundColor = 'gray';
          console.log(
            `${
              (entry.target as HTMLElement).textContent
            } 엘리먼트가 뷰포트 밖에 있습니다!`
          );
        }
      });
    }, {});

    const targetElements = ref.current?.querySelectorAll('div')!;

    targetElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      targetElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const items = Array.from({ length: 100 }, (_, i) => i + 1);
  return (
    <>
      <div className="your-target-element" ref={ref}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              width: '300px',
              height: '300px',
              backgroundColor: 'gray',
              marginBottom: '400px',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}
