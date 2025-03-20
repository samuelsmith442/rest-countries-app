'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeftIcon } from '@/components/Icons';
import { Country } from '@/types';

export default function CountryDetail() {
  const params = useParams();
  const code = params?.code as string;
  
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<{ name: string; code: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        // Fetch all countries to get the current country and its border countries
        const response = await fetch('/api/countries');
        
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        
        const allCountries = await response.json();
        
        // Find the current country by alpha3Code
        const currentCountry = allCountries.find(
          (c: Country) => c.alpha3Code.toLowerCase() === code.toLowerCase()
        );
        
        if (!currentCountry) {
          throw new Error('Country not found');
        }
        
        setCountry(currentCountry);
        
        // Find border countries
        if (currentCountry.borders && currentCountry.borders.length > 0) {
          const borders = currentCountry.borders.map((borderCode: string) => {
            const borderCountry = allCountries.find(
              (c: Country) => c.alpha3Code === borderCode
            );
            return borderCountry 
              ? { name: borderCountry.name, code: borderCountry.alpha3Code } 
              : null;
          }).filter(Boolean);
          
          setBorderCountries(borders);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching country data:', err);
        setError('Failed to load country data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchCountryData();
    }
  }, [code]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-blue dark:border-white"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="space-y-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-blue shadow-md rounded-md"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back</span>
        </Link>
        
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-red-500">{error || 'Country not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-blue shadow-md rounded-md"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Back</span>
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={country.flags.svg}
            alt={`Flag of ${country.name}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="shadow-md"
          />
        </div>
        
        <div className="space-y-8">
          <h1 className="text-2xl md:text-3xl font-extrabold">{country.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 text-detail">
              <p><span className="font-semibold">Native Name:</span> {country.nativeName}</p>
              <p><span className="font-semibold">Population:</span> {formatNumber(country.population)}</p>
              <p><span className="font-semibold">Region:</span> {country.region}</p>
              <p><span className="font-semibold">Sub Region:</span> {country.subregion}</p>
              <p><span className="font-semibold">Capital:</span> {country.capital || 'N/A'}</p>
            </div>
            
            <div className="space-y-2 text-detail">
              <p><span className="font-semibold">Top Level Domain:</span> {country.topLevelDomain.join(', ')}</p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {country.currencies 
                  ? country.currencies.map(c => c.name).join(', ') 
                  : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {country.languages 
                  ? country.languages.map(l => l.name).join(', ') 
                  : 'N/A'}
              </p>
            </div>
          </div>
          
          {borderCountries.length > 0 && (
            <div className="pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-detail">Border Countries:</h3>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((border) => (
                    <Link
                      key={border.code}
                      href={`/country/${border.code.toLowerCase()}`}
                      className="px-4 py-1 text-sm bg-white dark:bg-dark-blue shadow-md rounded-sm"
                    >
                      {border.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
