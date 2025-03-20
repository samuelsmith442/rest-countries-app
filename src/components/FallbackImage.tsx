'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface FallbackImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function FallbackImage({
  src,
  alt,
  fallbackSrc = '/placeholder-flag.svg',
  fill = false,
  width,
  height,
  style,
  sizes,
  priority = false,
  className = '',
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      style={style}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={handleError}
      unoptimized={process.env.NODE_ENV === 'production'}
    />
  );
}
