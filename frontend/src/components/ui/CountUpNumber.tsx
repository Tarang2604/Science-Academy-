import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
