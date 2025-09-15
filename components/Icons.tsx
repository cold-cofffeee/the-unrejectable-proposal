import React from 'react';

export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C8.633 19.45 3.237 15.44 2.308 11.252 1.378 7.065 4.314 3.75 8.165 3.75c1.802 0 3.44.825 4.5 2.122a.75.75 0 0 1 1.06 0c1.06-1.297 2.698-2.122 4.5-2.122 3.85 0 6.788 3.314 5.858 7.502-1.02 4.188-6.326 8.198-8.288 9.658Z" />
  </svg>
);

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.5 3A2.5 2.5 0 0 0 8 5.5v2.33a2.5 2.5 0 0 1 5 0V5.5A2.5 2.5 0 0 0 10.5 3Zm-2.5 5.33V5.5a2.5 2.5 0 0 1 5 0v2.83a4.5 4.5 0 0 0-5 0Zm2.5-2.08a.75.75 0 0 0-1.5 0V7a.75.75 0 0 0 1.5 0V6.25Z" clipRule="evenodd" />
    <path d="M12 10.5a.75.75 0 0 0-1.5 0v2.25a.75.75 0 0 0 1.5 0v-2.25Z" />
    <path d="M8.25 10.5a.75.75 0 0 0-1.5 0v5.25a.75.75 0 0 0 1.5 0v-5.25Z" />
    <path d="M15.75 10.5a.75.75 0 0 0-1.5 0v5.25a.75.75 0 0 0 1.5 0v-5.25Z" />
    <path fillRule="evenodd" d="M3 10.5a2.5 2.5 0 0 0-2.5 2.5v4.5A2.5 2.5 0 0 0 3 20h18a2.5 2.5 0 0 0 2.5-2.5v-4.5A2.5 2.5 0 0 0 21 10.5H3Zm-1.5 2.5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4.5Z" clipRule="evenodd" />
  </svg>
);

export const ScrollIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
);

export const FingerprintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.588 8.188a7.5 7.5 0 0 1-16.324 0A7.5 7.5 0 0 1 7.864 4.243ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75h.008v.008H12V9.75Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h.008v.008H15V12Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h.008v.008H9V12Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 15h.008v.008H10.5V15Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 15h.008v.008H13.5V15Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18A3.375 3.375 0 0 1 7.125 15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.875 15A3.375 3.375 0 0 1 13.5 18" />
    </svg>
);
