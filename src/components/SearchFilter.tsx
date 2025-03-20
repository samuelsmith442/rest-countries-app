'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [region, setRegion] = useState(searchParams.get('region') || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (region) params.set('region', region);
    
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/');
  }, [search, region, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRegionSelect = (selectedRegion: string) => {
    setRegion(selectedRegion === region ? '' : selectedRegion);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const clearFilter = () => {
    setRegion('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10">
      <div className="relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-dark-gray dark:text-white" />
        </div>
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={handleSearchChange}
          className="w-full py-4 pl-14 pr-4 rounded-md shadow-md bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white placeholder-dark-gray focus:outline-none"
        />
      </div>

      <div className="relative w-full md:w-48" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="w-full flex items-center justify-between py-4 px-6 rounded-md shadow-md bg-white dark:bg-dark-blue text-very-dark-blue-text dark:text-white"
        >
          <span>{region || 'Filter by Region'}</span>
          {isDropdownOpen ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white dark:bg-dark-blue">
            <ul className="py-2">
              {region && (
                <li>
                  <button
                    onClick={clearFilter}
                    className="w-full text-left px-6 py-2 text-very-dark-blue-text dark:text-white hover:bg-very-light-gray dark:hover:bg-very-dark-blue"
                  >
                    Clear Filter
                  </button>
                </li>
              )}
              {regions.map((r) => (
                <li key={r}>
                  <button
                    onClick={() => handleRegionSelect(r)}
                    className={`w-full text-left px-6 py-2 text-very-dark-blue-text dark:text-white hover:bg-very-light-gray dark:hover:bg-very-dark-blue ${
                      region === r ? 'font-semibold' : ''
                    }`}
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
