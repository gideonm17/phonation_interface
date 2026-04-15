import React, { useEffect, useMemo } from 'react';
import { useAppStore } from '../store';
import { GLOSSARY, SCRIPT_ANALYSIS, SCRIPT_LARYNX, SCRIPT_PNEUMA } from '../data/constants';

const TermLink = ({ termKey, children }: { termKey: string, children: React.ReactNode }) => {
    const { setActiveTerm } = useAppStore();
    const entry = GLOSSARY[termKey];

    if (entry) {
        return (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setActiveTerm(termKey);
                }}
                className="text-[#C0392B] bg-transparent border-0 border-b border-[#C0392B] hover:bg-[#C0392B] hover:text-[#f4f1ea] transition-colors cursor-pointer font-bold inline-block leading-tight px-0.5"
            >
                {children}
            </button>
        );
    }
    return <span className="text-[#C0392B] font-semibold">{children}</span>;
};

export const NarrativePanel = () => {
    const { currentStepIndex, setStep, activeSection, setActiveSection } = useAppStore();
    const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        stepRefs.current = [];
    }, [activeSection]);

    useEffect(() => {
        const activeEl = stepRefs.current[currentStepIndex];
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentStepIndex, activeSection]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            let SCRIPT;
            if (activeSection === 'pneuma') SCRIPT = SCRIPT_PNEUMA;
            else if (activeSection === 'analysis') SCRIPT = SCRIPT_ANALYSIS;
            else if (activeSection === 'larynx') SCRIPT = SCRIPT_LARYNX;
            else return;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                if (currentStepIndex < SCRIPT.length - 1) setStep(currentStepIndex + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                if (currentStepIndex > 0) setStep(currentStepIndex - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSection, currentStepIndex, setStep]);

    if (activeSection === 'intro') {
        return (
            <div className="flex flex-col h-full p-8 md:p-12 overflow-y-auto no-scrollbar">
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-galen-red tracking-tight">Galen's Phonatory System</h1>
                    <p className="text-xl md:text-2xl font-serif italic text-black/60 mb-12 max-w-2xl">
                        An Interactive Scholarly Edition of the Treatise <em>On the Utility of the Parts</em>
                    </p>

                    <div className="grid grid-cols-1 gap-6 w-full max-w-md text-left">
                        <div className="group cursor-pointer hover:bg-black/5 p-4 -mx-4 rounded-xl transition-colors" onClick={() => setActiveSection('larynx')}>
                            <h3 className="text-xl font-bold text-galen-red mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full border border-galen-red flex items-center justify-center text-sm">1</span>
                                Anatomy
                            </h3>
                            <p className="text-black/70 font-serif">Explore the cartilages, muscles, and nerves of the larynx.</p>
                        </div>

                        <div className="group cursor-pointer hover:bg-black/5 p-4 -mx-4 rounded-xl transition-colors" onClick={() => setActiveSection('pneuma')}>
                            <h3 className="text-xl font-bold text-galen-red mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full border border-galen-red flex items-center justify-center text-sm">2</span>
                                Pneuma & Voice
                            </h3>
                            <p className="text-black/70 font-serif">Visualise the physiological transformation of breath into voice.
                                <span className="block mt-1 text-xs font-sans text-galen-red/80 uppercase tracking-wider font-bold">Note: This section is currently experimental.</span>
                            </p>
                        </div>

                        <div className="group cursor-pointer hover:bg-black/5 p-4 -mx-4 rounded-xl transition-colors" onClick={() => setActiveSection('analysis')}>
                            <h3 className="text-xl font-bold text-galen-red mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full border border-galen-red flex items-center justify-center text-sm">3</span>
                                Textual Analysis
                            </h3>
                            <p className="text-black/70 font-serif">Read the original Greek text alongside the English translation.</p>
                        </div>
                    </div>

                    <div className="mt-12 text-sm text-black/40">
                        Based on Galen's <em>De usu partium</em>, Book 7<br />
                        <a href="https://atlomy.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors text-galen-red font-bold">
                            Visit ATLOMY Project
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    let SCRIPT;
    if (activeSection === 'pneuma') SCRIPT = SCRIPT_PNEUMA;
    else if (activeSection === 'analysis') SCRIPT = SCRIPT_ANALYSIS;
    else SCRIPT = SCRIPT_LARYNX;

    if (!SCRIPT) return null;

    const renderContent = useMemo(() => (content: string) => {
        const parts = content.split(/(<[A-Za-z_]+>[^<]+<\/[A-Za-z_]+>)/g);
        return parts.map((part, i) => {
            const match = part.match(/^<([A-Za-z_]+)>([^<]+)<\/\1>$/);
            if (match) {
                const [_, termKey, text] = match;
                if (GLOSSARY[termKey]) {
                    return <TermLink key={i} termKey={termKey}>{text}</TermLink>;
                }
                return <span key={i}>{text}</span>;
            }
            return part;
        });
    }, []);

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex-1 p-8 overflow-y-auto no-scrollbar pb-24">
                <div className="pt-10">
                    <h1 className="text-4xl font-serif font-bold mb-4 text-galen-red">Galen's Phonatory System</h1>
                    <p className="italic text-black/60">An Interactive Scholarly Edition</p>
                </div>

                {SCRIPT.map((step, index) => (
                    <div
                        key={step.id}
                        ref={el => stepRefs.current[index] = el}
                        className={`flex flex-col shrink-0 transition-all duration-500 cursor-pointer ${activeSection === 'analysis'
                            ? 'min-h-0 py-16 justify-start'
                            : 'min-h-[60vh] justify-center'
                            } ${index === currentStepIndex
                                ? 'opacity-100 pl-4 border-l-4 border-galen-red'
                                : 'opacity-30 border-l-4 border-transparent hover:opacity-60'
                            }`}
                        onClick={() => setStep(index)}
                    >
                        <h2 className="text-2xl font-bold mb-4 font-serif text-galen-red">{step.title}</h2>

                        {activeSection === 'analysis' && step.greek && (
                            <div className="mb-6 p-4 bg-parchment/50 border border-ink/10 rounded italic font-serif text-lg leading-relaxed text-black/80">
                                "{step.greek}"
                            </div>
                        )}

                        <p className="text-xl leading-relaxed font-serif text-justify">
                            {renderContent(step.content)}
                        </p>

                        {step.reference && (
                            <div className="mt-4 pt-4 border-t border-black/10 text-xs font-serif text-black/50 italic text-right">
                                {step.reference}
                            </div>
                        )}
                    </div>
                ))}
                <div className="h-[40vh] flex items-center justify-center text-black/30 italic">
                    End of Sequence
                </div>
            </div>

            {/* Fixed Navigation Controls */}
            <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur border-t border-black/10 p-4 flex items-center justify-between z-20">
                <button
                    disabled={currentStepIndex === 0}
                    onClick={() => setStep(Math.max(0, currentStepIndex - 1))}
                    className="px-4 py-2 rounded border border-black/20 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed font-serif flex items-center gap-2"
                >
                    <span>←</span> Previous
                </button>

                <div className="text-sm font-sans text-black/50">
                    Step {currentStepIndex + 1} of {SCRIPT.length}
                </div>

                <button
                    disabled={currentStepIndex === SCRIPT.length - 1}
                    onClick={() => setStep(Math.min(SCRIPT.length - 1, currentStepIndex + 1))}
                    className="px-4 py-2 rounded bg-galen-red text-white hover:bg-[#8b0000] disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed font-serif flex items-center gap-2 shadow-sm transition-all"
                >
                    Next <span>→</span>
                </button>
            </div>
        </div>
    );
};
