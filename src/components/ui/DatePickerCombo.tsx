'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function DatePickerCombo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const today = new Date();
  const defaultTo = today.toISOString().split('T')[0];
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  const defaultFrom = lastWeek.toISOString().split('T')[0];

  const from = searchParams.get('from') || defaultFrom;
  const to = searchParams.get('to') || defaultTo;

  const handleDateChange = (type: 'from' | 'to', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Start Date</label>
        <input 
          type="date" 
          value={from} 
          onChange={(e) => handleDateChange('from', e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-ple-navy/20 text-gray-900 font-medium"
        />
      </div>
      <span className="text-gray-400 mt-5">-</span>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">End Date</label>
        <input 
          type="date" 
          value={to} 
          min={from}
          onChange={(e) => handleDateChange('to', e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-ple-navy/20 text-gray-900 font-medium"
        />
      </div>
    </div>
  );
}
