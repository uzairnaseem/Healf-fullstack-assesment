'use client';

import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

interface LoadMoreTriggerProps {
  onVisible: () => void;
}

export default function LoadMoreTrigger({ onVisible }: LoadMoreTriggerProps) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <Typography
      ref={ref}
      variant="body2"
      color="text.secondary"
      textAlign="center"
      sx={{ mt: 2 }}
      onClick={onVisible}>
      Loading more...
    </Typography>
  );
}
