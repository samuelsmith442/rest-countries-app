import React, { Suspense } from 'react';
import CountryList from '@/components/CountryList';

// Loading component to show while CountryList is loading
function CountryListLoading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-blue dark:border-white"></div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-12">
      <Suspense fallback={<CountryListLoading />}>
        <CountryList />
      </Suspense>
    </div>
  );
}
