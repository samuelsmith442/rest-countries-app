'use client';

import React from 'react';
import Link from 'next/link';
import FallbackImage from './FallbackImage';
import { Country } from '@/types';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const { name, population, region, capital, flags, alpha3Code } = country;

  const formatPopulation = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Link 
      href={`/country/${alpha3Code.toLowerCase()}`}
      className="block rounded-md overflow-hidden shadow-md bg-white dark:bg-dark-blue hover:transform hover:scale-105 transition-transform duration-300"
    >
      <div className="relative h-40 w-full">
        <FallbackImage
          src={flags.svg}
          alt={`Flag of ${name}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="p-6 pb-10 text-very-dark-blue-text dark:text-white">
        <h2 className="font-extrabold text-lg mb-4 line-clamp-1">{name}</h2>
        <div className="space-y-1 text-sm">
          <p><span className="font-semibold">Population:</span> {formatPopulation(population)}</p>
          <p><span className="font-semibold">Region:</span> {region}</p>
          <p><span className="font-semibold">Capital:</span> {capital || 'N/A'}</p>
        </div>
      </div>
    </Link>
  );
}
