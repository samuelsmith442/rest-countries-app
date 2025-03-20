import React from 'react';
import CountryList from '@/components/CountryList';

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-12">
      <CountryList />
    </div>
  );
}
