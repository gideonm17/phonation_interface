import React from 'react';
import { useAppStore } from '../store';

export const Navigation = () => {
    const { activeSection, setActiveSection } = useAppStore();

    const sections = [
        { id: 'intro', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'larynx', label: 'Anatomy', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'pneuma', label: 'Physiology', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { id: 'analysis', label: 'Textual Analysis', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
    ] as const;

    return (
        <nav className="bg-white border-r border-ink/10 flex flex-col items-center py-8 gap-8 w-16 md:w-20 shrink-0 z-50 shadow-lg">
            <div className="w-8 h-8 rounded-full bg-galen-red/10 text-galen-red flex items-center justify-center font-serif font-bold text-xl mb-4">
                G
            </div>

            {sections.map(section => (
                <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`p-3 rounded-xl transition-all duration-300 relative group ${activeSection === section.id ? 'bg-galen-red text-white shadow-md' : 'text-black/40 hover:bg-black/5 hover:text-galen-red'}`}
                    title={section.label}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={section.icon}></path>
                    </svg>
                </button>
            ))}
        </nav>
    );
};
