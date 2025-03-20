'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CountryCard from './CountryCard';
import SearchFilter from './SearchFilter';
import { Country } from '@/types';

export default function CountryList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const region = searchParams.get('region') || '';
  
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/countries');
        
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let result = [...countries];

    // Filter by region
    if (region) {
      result = result.filter(country => 
        country.region.toLowerCase() === region.toLowerCase()
      );
    }

    // Filter by search query
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(country => 
        country.name.toLowerCase().includes(query) ||
        (country.capital && country.capital.toLowerCase().includes(query))
      );
    }

    setFilteredCountries(result);
  }, [countries, search, region]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-blue dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SearchFilter />
      
      {filteredCountries.length === 0 ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-lg">No countries found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredCountries.map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
