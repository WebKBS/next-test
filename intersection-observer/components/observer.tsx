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
          console.log(
            `${entry.target.textContent} 엘리먼트가 뷰포트 안에 있습니다!`
          );
        } else {
          console.log(
            `${entry.target.textContent} 엘리먼트가 뷰포트 밖에 있습니다!`
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
  }, []); // Empty dependency array means this effect will run once on mount

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
              marginBottom: '50px',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
}
