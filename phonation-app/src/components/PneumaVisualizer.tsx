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
    const particles = useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        r: Math.random() * 2 + 1,
        pathOffset1: 205 + (Math.random() * 20 - 10),
        pathOffset2: 215 + (Math.random() * 10 - 5),
        begin: i * 0.18,
        durStage4: (0.7 + Math.random() * 0.3),
        durStage6: (0.18 + Math.random() * 0.15),
        durDefault: (2.8 + Math.random())
    })), []);

    if (stage === -1) return null;

    // Stage label for bottom indicator
    const stageLabels = [
        "Overview",
        "Voluntary Control",
        "ἐκφύσησις Generated",
        "Tracheal Preprocessing",
        "Glōttis Narrows",
        "Πληγή",
        "Φωνή Emerges"
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F3EA] relative overflow-hidden">
            {/* Stage indicator */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-10 px-6">
                {stageLabels.map((label, i) => (
                    <div
                        key={i}
                        title={label}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === stage ? 'bg-[#8b0000] flex-[2]' : i < stage ? 'bg-[#8b0000]/40 flex-1' : 'bg-black/10 flex-1'
                        }`}
                    />
                ))}
            </div>

            {/* Stage label */}
            <div className="absolute top-8 left-0 right-0 text-center">
                <span className="text-[10px] font-serif tracking-widest uppercase text-black/40 select-none">
                    {stageLabels[stage]}
                </span>
            </div>

            <svg viewBox="0 0 400 580" className="w-full h-full max-w-lg" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.04))' }}>
                <defs>
                    <filter id="ink-soft" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="0.4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <marker id="arrow-sm" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto" fill="#5a1a1a">
                        <path d="M0,0 L5,2.5 L0,5 L0.8,2.5 z" />
                    </marker>
                    <linearGradient id="lung-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e8e4da" />
                        <stop offset="100%" stopColor="#d8d4ca" />
                    </linearGradient>
                    <linearGradient id="lung-active" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f0e8d8" />
                        <stop offset="100%" stopColor="#d8c8b0" />
                    </linearGradient>
                </defs>

                {/* ── ANATOMICAL SILHOUETTE ── */}
                <g stroke="#2C3E50" strokeWidth="1.2" fill="none" opacity="0.35" filter="url(#ink-soft)">
                    {/* Head/neck outline */}
                    <path d="M155 105 C 152 65, 178 35, 215 35 C 252 35, 268 65, 265 105 C 265 128, 258 142, 252 158 L 252 195 Q 315 205, 355 225" strokeLinecap="round" />
                    <path d="M155 105 Q 152 138, 162 150 Q 175 160, 175 195 Q 125 205, 85 225" strokeLinecap="round" />
                    {/* Body sides (faint) */}
                    <path d="M85 225 Q 72 300, 80 445 Q 84 540, 100 570" strokeDasharray="4,6" opacity="0.4" />
                    <path d="M355 225 Q 368 300, 360 445 Q 356 540, 340 570" strokeDasharray="4,6" opacity="0.4" />
                </g>

                {/* ── BRAIN ── */}
                <g className={`transition-all duration-700 ${stage >= 1 ? 'opacity-100' : 'opacity-12'}`} style={{ opacity: stage >= 1 ? 1 : 0.08 }}>
                    <path d="M178 62 C 172 42, 200 36, 212 52 C 224 36, 252 42, 247 62 C 263 73, 252 94, 230 99 C 210 108, 190 98, 178 62 Z"
                        fill={stage >= 1 ? "#ede9df" : "#e8e4da"} stroke="#2C3E50" strokeWidth="1.5" />
                    <path d="M188 62 Q 198 52, 208 66 Q 218 52, 236 62" stroke="#2C3E50" strokeWidth="0.5" fill="none" opacity="0.5" />
                    <path d="M184 75 Q 200 68, 216 78" stroke="#2C3E50" strokeWidth="0.5" fill="none" opacity="0.4" />
                </g>

                {/* ── TRACHEA ── */}
                <g className={`transition-all duration-700`} style={{ opacity: stage >= 3 ? 1 : 0.15 }}>
                    <rect x="199" y="198" width="32" height="102" rx="3" fill="none" stroke="#2C3E50" strokeWidth="1" opacity="0.4" />
                    {[...Array(7)].map((_, i) => (
                        <path key={i} d={`M199 ${210 + i * 13} Q 215 ${215 + i * 13}, 231 ${210 + i * 13}`}
                            stroke="#2C3E50" strokeWidth="0.8" fill="none" opacity="0.5" />
                    ))}
                    {/* Trachea label */}
                    {stage === 3 && (
                        <text x="240" y="252" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif" fill="#2C3E50" opacity="0.7">
                            προρρυθμίζει
                        </text>
                    )}
                </g>

                {/* ── LUNGS ── */}
                <g className={`transition-all duration-700`} style={{ opacity: stage >= 2 ? 1 : 0.08 }}>
                    <path d="M199 300 Q 138 312, 128 402 Q 138 498, 199 476 Z"
                        fill={stage >= 2 ? "url(#lung-active)" : "url(#lung-grad)"} stroke="#2C3E50" strokeWidth="1.5" />
                    <path d="M231 300 Q 292 312, 302 402 Q 292 498, 231 476 Z"
                        fill={stage >= 2 ? "url(#lung-active)" : "url(#lung-grad)"} stroke="#2C3E50" strokeWidth="1.5" />
                    {/* Lung texture lines */}
                    <path d="M148 370 Q 165 360, 178 375" stroke="#2C3E50" strokeWidth="0.5" fill="none" opacity={stage >= 2 ? 0.3 : 0} />
                    <path d="M148 400 Q 162 390, 175 405" stroke="#2C3E50" strokeWidth="0.5" fill="none" opacity={stage >= 2 ? 0.3 : 0} />
                    <path d="M252 370 Q 268 360, 280 375" stroke="#2C3E50" strokeWidth="0.5" fill="none" opacity={stage >= 2 ? 0.3 : 0} />
                    <path d="M252 400 Q 266 390, 278 405" stroke="#2C3E50" strokeWidth="0.5" fill="none" opacity={stage >= 2 ? 0.3 : 0} />
                    {/* Diaphragm arch */}
                    <path d="M128 476 Q 215 448, 302 476" stroke="#2C3E50" strokeWidth="1" fill="none" strokeDasharray="5,3" opacity={stage >= 2 ? 0.4 : 0} />
                    {/* ὕλη label */}
                    {stage === 2 && (
                        <text x="310" y="398" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif" fill="#5a1a1a" opacity="0.8">
                            ὕλη τις
                        </text>
                    )}
                    {stage === 2 && (
                        <text x="310" y="412" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif" fill="#5a1a1a" opacity="0.8">
                            οἰκεία
                        </text>
                    )}
                </g>

                {/* ── STAGE 1: PSYCHIC PNEUMA / NERVES ── */}
                <g style={{ opacity: stage >= 1 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {/* Nerve path from brain down to larynx region */}
                    <path d="M212 98 C 205 148, 198 195, 200 300"
                        stroke="#8b0000" strokeWidth="1.5" fill="none" strokeDasharray="4 3">
                        <animate attributeName="stroke-dashoffset" from="56" to="0" dur="2.5s" repeatCount="indefinite" />
                    </path>
                    {/* Label */}
                    <text x="168" y="75" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif" fill="#5a1a1a" opacity="0.9">
                        ψυχικὸν πνεῦμα
                    </text>
                    <line x1="212" y1="78" x2="215" y2="98" stroke="#5a1a1a" strokeWidth="0.6" opacity="0.4" />
                </g>

                {/* ── STAGE 2: COMPRESSION ARROWS ── */}
                <g style={{ opacity: stage >= 2 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {[0, 1, 2].map(i => (
                        <path key={`l${i}`} d={`M108 ${352 + i * 28} L 128 ${360 + i * 28}`}
                            stroke="#5a1a1a" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
                    ))}
                    {[0, 1, 2].map(i => (
                        <path key={`r${i}`} d={`M322 ${352 + i * 28} L 302 ${360 + i * 28}`}
                            stroke="#5a1a1a" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
                    ))}
                    {/* Upward compression arrow */}
                    <path d="M215 555 L 215 498" stroke="#8b0000" strokeWidth="1.8" markerEnd="url(#arrow-sm)">
                        <animate attributeName="d" values="M215 558 L 215 498; M215 562 L 215 502; M215 558 L 215 498" dur="2.2s" repeatCount="indefinite" />
                    </path>
                    {/* Lateral arrows */}
                    <path d="M92 402 L 120 402" stroke="#8b0000" strokeWidth="1.8" markerEnd="url(#arrow-sm)">
                        <animate attributeName="d" values="M88 402 L 118 402; M84 402 L 114 402; M88 402 L 118 402" dur="2.2s" repeatCount="indefinite" />
                    </path>
                    <path d="M338 402 L 310 402" stroke="#8b0000" strokeWidth="1.8" markerEnd="url(#arrow-sm)">
                        <animate attributeName="d" values="M342 402 L 312 402; M346 402 L 316 402; M342 402 L 312 402" dur="2.2s" repeatCount="indefinite" />
                    </path>
                </g>

                {/* ── STAGE 3+: PNEUMA PARTICLES ── */}
                <g style={{ opacity: stage >= 3 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {particles.map((p) => (
                        <circle key={p.id} r={p.r} fill="#8b0000" opacity="0.7">
                            <animateMotion
                                dur={stage >= 5
                                    ? (stage >= 6 ? (p.durStage6 + 's') : '0.08s')
                                    : (stage >= 4 ? (p.durStage4 + 's') : (p.durDefault + 's'))}
                                repeatCount="indefinite"
                                path={`M${p.pathOffset1} 440 C ${p.pathOffset1} 390, ${p.pathOffset2} 290, 215 148`}
                                begin={`${p.begin}s`}
                                keyPoints={stage >= 5 ? "0;0.88;1" : "0;1"}
                                keyTimes={stage >= 5 ? "0;0.94;1" : "0;1"}
                                calcMode="linear"
                            />
                        </circle>
                    ))}
                </g>

                {/* ── STAGE 4: GLOTTIS CONSTRICTION ── */}
                <g style={{ opacity: stage >= 4 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {/* Glottis body */}
                    <ellipse cx="215" cy="178" rx="16" ry="6" fill="#fff" stroke="#2C3E50" strokeWidth="1.8" />
                    {/* Glottic lips — narrowing animation */}
                    <path d="M205 178 L 225 178" stroke="#2C3E50" strokeWidth={stage >= 5 ? "3" : "2"} strokeLinecap="round">
                        {stage >= 5 ? (
                            <animate attributeName="d" values="M202 178 L 228 178; M214 178 L 216 178; M202 178 L 228 178" dur="0.18s" repeatCount="indefinite" />
                        ) : (
                            <animate attributeName="d" values="M202 178 L 228 178; M211 178 L 219 178; M202 178 L 228 178" dur="1.1s" repeatCount="indefinite" />
                        )}
                    </path>
                    {/* Stenōsis label */}
                    <text x="238" y="174" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif" fill="#2C3E50" opacity="0.75">γλωττίς</text>

                    {/* ── STAGE 4: WHIRLPOOL / VENTRICLES ── */}
                    {stage === 4 && (
                        <g opacity="0.6">
                            {/* Left ventricle */}
                            <ellipse cx="197" cy="185" rx="6" ry="3" fill="none" stroke="#8b0000" strokeWidth="0.8" strokeDasharray="2,2">
                                <animateTransform attributeName="transform" type="rotate" from="0 197 185" to="360 197 185" dur="3s" repeatCount="indefinite" />
                            </ellipse>
                            {/* Right ventricle */}
                            <ellipse cx="233" cy="185" rx="6" ry="3" fill="none" stroke="#8b0000" strokeWidth="0.8" strokeDasharray="2,2">
                                <animateTransform attributeName="transform" type="rotate" from="360 233 185" to="0 233 185" dur="3s" repeatCount="indefinite" />
                            </ellipse>
                            <text x="152" y="194" fontSize="8" fontStyle="italic" fontFamily="Georgia, serif" fill="#8b0000" opacity="0.8">ἴλιγγος</text>
                        </g>
                    )}

                    {/* ── STAGE 5: STRIKE IMPACT ── */}
                    {stage === 5 && (
                        <g>
                            <circle cx="215" cy="178" r="8" stroke="#8b0000" strokeWidth="2" fill="none" opacity="0">
                                <animate attributeName="r" values="2;22" dur="0.35s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.9;0" dur="0.35s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="215" cy="178" r="4" stroke="#8b0000" strokeWidth="1.2" fill="none" opacity="0">
                                <animate attributeName="r" values="1;14" dur="0.35s" begin="0.1s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.8;0" dur="0.35s" begin="0.1s" repeatCount="indefinite" />
                            </circle>
                            <text x="238" y="185" fontSize="8" fontStyle="italic" fontFamily="Georgia, serif" fill="#8b0000" opacity="0.85">πληγή</text>
                        </g>
                    )}
                </g>

                {/* ── STAGE 6: VOICE EMISSION ── */}
                <g style={{ opacity: stage >= 6 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    <path d="M215 158 Q 252 138, 282 158" fill="none" stroke="#8b0000" strokeWidth="2" opacity="0.6">
                        <animate attributeName="d" values="M215 158 Q 252 138, 282 158; M215 158 Q 305 96, 358 158" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite" />
                    </path>
                    <path d="M215 158 Q 178 138, 148 158" fill="none" stroke="#8b0000" strokeWidth="2" opacity="0.6">
                        <animate attributeName="d" values="M215 158 Q 178 138, 148 158; M215 158 Q 125 96, 72 158" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite" />
                    </path>
                    <path d="M215 148 Q 252 125, 290 148" fill="none" stroke="#8b0000" strokeWidth="1.2" opacity="0.4">
                        <animate attributeName="d" values="M215 148 Q 252 125, 290 148; M215 148 Q 310 80, 370 148" dur="1.6s" begin="0.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0" dur="1.6s" begin="0.4s" repeatCount="indefinite" />
                    </path>
                    <text x="178" y="126" fontSize="15" fontStyle="italic" fontFamily="Georgia, serif" fill="#8b0000" letterSpacing="3" opacity="0.9">φωνή</text>
                </g>

                {/* ── STAGE 0: OVERVIEW labels (all three pneumata) ── */}
                {stage === 0 && (
                    <g fontFamily="Georgia, serif" fontStyle="italic">
                        <text x="260" y="72" fontSize="8.5" fill="#5a1a1a" opacity="0.75">ψυχικόν</text>
                        <line x1="252" y1="70" x2="235" y2="75" stroke="#5a1a1a" strokeWidth="0.5" opacity="0.4" />
                        <text x="314" y="370" fontSize="8.5" fill="#5a1a1a" opacity="0.75">ζωτικόν</text>
                        <text x="314" y="382" fontSize="8.5" fill="#5a1a1a" opacity="0.75">(heart)</text>
                        <text x="96" y="430" fontSize="8.5" fill="#5a1a1a" opacity="0.75">φυσικόν</text>
                        <text x="96" y="442" fontSize="8.5" fill="#5a1a1a" opacity="0.75">(liver)</text>
                        {/* Three dots to show each locus */}
                        <circle cx="215" cy="75" r="3" fill="#8b0000" opacity="0.4" />
                        <circle cx="310" cy="355" r="3" fill="#8b0000" opacity="0.3">
                            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="110" cy="415" r="3" fill="#8b0000" opacity="0.3">
                            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" begin="0.8s" repeatCount="indefinite" />
                        </circle>
                    </g>
                )}
            </svg>
        </div>
    );
};
