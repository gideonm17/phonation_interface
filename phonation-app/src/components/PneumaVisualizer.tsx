import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { SCRIPT_PNEUMA } from '../data/constants';

export const PneumaVisualizer = () => {
    const { currentStepIndex } = useAppStore();
    const step = SCRIPT_PNEUMA[currentStepIndex];
    const stageMap: Record<string, number> = {
        "pneuma_intro": 0,
        "pneuma_brain": 1,
        "pneuma_thorax": 2,
        "pneuma_trachea": 3,
        "pneuma_larynx": 4,
        "pneuma_strike": 5,
        "pneuma_voice": 6
    };

    const stage = step && stageMap[step.id] !== undefined ? stageMap[step.id] : -1;

    // Memoize particles to prevent re-randomization on every render
    const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        r: Math.random() * 2 + 1,
        pathOffset1: 205 + (Math.random() * 20 - 10),
        pathOffset2: 215 + (Math.random() * 10 - 5),
        begin: i * 0.15,
        durStage4: (0.8 + Math.random() * 0.4),
        durStage6: (0.2 + Math.random() * 0.2),
        durDefault: (2.5 + Math.random())
    })), []);

    if (stage === -1) return null;

    return (
        <div className="w-full h-full flex items-center justify-center bg-[#F0EAD6] relative overflow-hidden">
            <svg viewBox="0 0 400 600" className="w-full h-full max-w-lg opacity-90">
                <defs>
                    <filter id="ink-blur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="0.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrow-head" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" fill="#2C3E50">
                        <path d="M0,0 L6,3 L0,6 L1,3 z" />
                    </marker>
                </defs>

                {/* ANATOMICAL SILHOUETTE (INK STYLE) */}
                <g stroke="#2C3E50" strokeWidth="1.5" fill="none" opacity="0.6" filter="url(#ink-blur)">
                    <path d="M150 100 C 150 60, 180 30, 220 30 C 260 30, 270 70, 270 100 C 270 130, 260 140, 255 160 L 255 200 Q 320 210, 360 230" strokeLinecap="round" />
                    <path d="M150 100 Q 150 140, 160 150 Q 175 160, 175 200 Q 120 210, 80 230" strokeLinecap="round" />
                    <path d="M80 230 Q 70 300, 80 450 Q 85 550, 100 580" strokeDasharray="5,5" opacity="0.5" />
                    <path d="M360 230 Q 370 300, 360 450 Q 355 550, 340 580" strokeDasharray="5,5" opacity="0.5" />
                </g>

                {/* ORGANS LAYER */}
                <g stroke="#2C3E50" fill="none">
                    {/* Brain */}
                    <g className={`transition-all duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-10'}`}>
                        <path d="M175 60 C 170 40, 200 35, 210 50 C 220 35, 250 40, 245 60 C 260 70, 250 90, 230 95 C 210 105, 190 95, 175 60 Z" fill="#e8e4da" strokeWidth="1.5" />
                        <path d="M185 60 Q 195 50, 205 65 Q 215 50, 235 60" strokeWidth="0.5" opacity="0.6" />
                    </g>
                    {/* Trachea */}
                    <g className={`transition-all duration-1000 ${stage >= 3 ? 'opacity-100' : 'opacity-20'}`}>
                        <path d="M200 200 L 200 300" strokeWidth="1" />
                        <path d="M230 200 L 230 300" strokeWidth="1" />
                        {[...Array(8)].map((_, i) => (
                            <path key={i} d={`M200 ${210 + i * 12} Q 215 ${215 + i * 12}, 230 ${210 + i * 12}`} opacity="0.4" />
                        ))}
                    </g>
                    {/* Lungs */}
                    <g className={`transition-all duration-1000 ${stage >= 2 ? 'opacity-100' : 'opacity-10'}`}>
                        <path d="M200 300 Q 140 310, 130 400 Q 140 500, 200 480 Z" fill="#e8e4da" strokeWidth="1.5" />
                        <path d="M230 300 Q 290 310, 300 400 Q 290 500, 230 480 Z" fill="#e8e4da" strokeWidth="1.5" />
                        <path d="M130 480 Q 215 450, 300 480" strokeWidth="1" strokeDasharray="4 2" />
                    </g>
                </g>

                {/* DYNAMIC ELEMENTS LAYER */}
                {/* STAGE 1: NERVES */}
                <g className={`transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <path d="M210 95 C 200 150, 190 200, 195 320" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeDasharray="3 3">
                        <animate attributeName="stroke-dashoffset" from="50" to="0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <text x="250" y="80" className="font-serif text-xs fill-[#2C3E50] italic">Hēgemonikon</text>
                </g>

                {/* STAGE 2: MUSCLES & COMPRESSION */}
                <g className={`transition-opacity duration-1000 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    {[0, 1, 2].map(i => (
                        <path key={i} d={`M110 ${350 + i * 30} L 130 ${360 + i * 30}`} stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    ))}
                    {[0, 1, 2].map(i => (
                        <path key={i} d={`M320 ${350 + i * 30} L 300 ${360 + i * 30}`} stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    ))}
                    <path d="M180 500 L 180 550" stroke="#2C3E50" strokeWidth="1" />
                    <path d="M250 500 L 250 550" stroke="#2C3E50" strokeWidth="1" />
                    <path d="M180 525 L 250 525" stroke="#2C3E50" strokeWidth="1" />
                    <path d="M90 400 L 120 400" stroke="#8b0000" strokeWidth="2" markerEnd="url(#arrow-head)">
                        <animate attributeName="d" values="M90 400 L 120 400; M85 400 L 115 400; M90 400 L 120 400" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M340 400 L 310 400" stroke="#8b0000" strokeWidth="2" markerEnd="url(#arrow-head)">
                        <animate attributeName="d" values="M340 400 L 310 400; M345 400 L 315 400; M340 400 L 310 400" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M215 560 L 215 500" stroke="#8b0000" strokeWidth="2" markerEnd="url(#arrow-head)">
                        <animate attributeName="d" values="M215 560 L 215 500; M215 565 L 215 505; M215 560 L 215 500" dur="2s" repeatCount="indefinite" />
                    </path>
                </g>

                {/* STAGE 3: PNEUMA PARTICLES (Memoized) */}
                <g className={`transition-opacity duration-1000 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    {particles.map((p) => (
                        <circle key={p.id} r={p.r} fill="#C0392B" opacity="0.8">
                            <animateMotion
                                dur={stage >= 5 ? (stage >= 6 ? (p.durStage6 + 's') : '0.1s') : (stage >= 4 ? (p.durStage4 + 's') : (p.durDefault + 's'))}
                                repeatCount="indefinite"
                                path={`M${p.pathOffset1} 450 C ${p.pathOffset1} 400, ${p.pathOffset2} 300, 215 150`}
                                begin={`${p.begin}s`}
                                keyPoints={stage >= 5 ? "0;0.9;1" : "0;1"}
                                keyTimes={stage >= 5 ? "0;0.95;1" : "0;1"}
                                calcMode="linear"
                            />
                        </circle>
                    ))}
                </g>

                {/* STAGE 4: GLOTTIS CONSTRICTION */}
                <g className={`transition-opacity duration-1000 ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                    <ellipse cx="215" cy="180" rx="15" ry="5" fill="#fff" stroke="#2C3E50" strokeWidth="2" />
                    <path d="M205 180 L 225 180" stroke="#2C3E50" strokeWidth={stage === 5 ? "3" : "2"}>
                        {stage === 5 && (
                            <animate attributeName="d" values="M200 180 L 230 180; M215 180 L 215 180; M200 180 L 230 180" dur="0.2s" repeatCount="indefinite" />
                        )}
                        {stage !== 5 && (
                            <animate attributeName="d" values="M200 180 L 230 180; M212 180 L 218 180; M200 180 L 230 180" dur="1s" repeatCount="indefinite" />
                        )}
                    </path>
                    {/* STAGE 5: THE STRIKE IMPACT VISUAL */}
                    {stage === 5 && (
                        <g>
                            <circle cx="215" cy="180" r="10" stroke="#C0392B" strokeWidth="2" fill="none" opacity="0">
                                <animate attributeName="r" values="2;20" dur="0.4s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="1;0" dur="0.4s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="215" cy="180" r="5" stroke="#C0392B" strokeWidth="1" fill="none" opacity="0">
                                <animate attributeName="r" values="1;15" dur="0.4s" begin="0.1s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="1;0" dur="0.4s" begin="0.1s" repeatCount="indefinite" />
                            </circle>
                        </g>
                    )}
                    <text x="240" y="180" className="font-serif text-xs fill-[#2C3E50] italic">Stenōsis</text>
                </g>

                {/* STAGE 6: VOICE EMISSION */}
                <g className={`transition-opacity duration-1000 ${stage >= 6 ? 'opacity-100' : 'opacity-0'}`}>
                    <path d="M215 160 Q 250 140, 280 160" fill="none" stroke="#C0392B" strokeWidth="2" opacity="0.6">
                        <animate attributeName="d" values="M215 160 Q 250 140, 280 160; M215 160 Q 300 100, 350 160" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M215 160 Q 180 140, 150 160" fill="none" stroke="#C0392B" strokeWidth="2" opacity="0.6">
                        <animate attributeName="d" values="M215 160 Q 180 140, 150 160; M215 160 Q 130 100, 80 160" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <text x="195" y="130" className="font-serif font-bold fill-[#8b0000] text-2xl tracking-widest">PHŌNĒ</text>
                </g>
            </svg>
        </div>
    );
};
