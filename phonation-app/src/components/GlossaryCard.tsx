import React from 'react';
import { useAppStore } from '../store';
import { GLOSSARY } from '../data/constants';

export const GlossaryCard = () => {
    const { activeTerm, setActiveTerm } = useAppStore();
    const entry = activeTerm ? GLOSSARY[activeTerm] : null;

    if (!entry) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveTerm(null)}>
            <div
                className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full relative transform transition-all animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-black/30 hover:text-black transition-colors"
                    onClick={() => setActiveTerm(null)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <h3 className="text-2xl font-serif font-bold text-galen-red mb-1">{entry.term}</h3>
                <p className="text-xs font-sans uppercase tracking-wider text-black/40 mb-4">Glossary Entry</p>

                <p className="font-serif text-lg leading-relaxed text-slate-700 mb-6">
                    {entry.def}
                </p>

                {entry.url && (
                    <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#C0392B] hover:underline"
                    >
                        Read full entry on ATLOMY &rarr;
                    </a>
                )}
            </div>
        </div>
    );
};
