"use client";

import Image from "next/image";
import { useState } from "react";

type ProfessionImageProps = {
  src: string, 
  alt: string,
  isSinglePage?: boolean
};

export function ProfessionImage({ src, alt, isSinglePage = false }: ProfessionImageProps) {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    if (isSinglePage) {
      return (
        <div className="relative h-64 sm:h-80 w-full flex items-center justify-center bg-gradient-to-r from-black to-orange-950/30">
          <p className="text-orange-500 text-lg">Изображение временно недоступно</p>
        </div>
      );
    }
    
    return (
      <div className="w-full h-48 bg-gradient-to-r from-black to-orange-950/30 flex items-center justify-center">
        <span className="text-orange-500">Изображение недоступно</span>
      </div>
    );
  }
  
  if (isSinglePage) {
    return (
      <Image 
        src={src} 
        alt={alt} 
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover object-center" 
        priority
        onError={() => setHasError(true)}
      />
    );
  }
  
  return (
    <Image 
      src={src} 
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      onError={() => setHasError(true)}
    />
  );
} 