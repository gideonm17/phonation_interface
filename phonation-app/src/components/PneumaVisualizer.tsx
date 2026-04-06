import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { SCRIPT_PNEUMA } from '../data/constants';

export const PneumaVisualizer = () => {
    const { currentStepIndex } = useAppStore();
    const step = SCRIPT_PNEUMA[currentStepIndex];
    const stageMap: Record<string, number> = {
        "pneuma_intro": 0, "pneuma_brain": 1, "pneuma_thorax": 2,
        "pneuma_trachea": 3, "pneuma_larynx": 4, "pneuma_strike": 5, "pneuma_voice": 6
    };
    const stage = step && stageMap[step.id] !== undefined ? stageMap[step.id] : -1;

    const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        r: +(1.4 + Math.random() * 1.6).toFixed(2),
        x: +(208 + Math.random() * 10 - 5).toFixed(1),
        begin: +(i * 0.17).toFixed(2),
        dSlow: +(2.6 + Math.random() * 0.7).toFixed(2),
        dMed:  +(0.65 + Math.random() * 0.2).toFixed(2),
        dFast: +(0.08 + Math.random() * 0.04).toFixed(2),
    })), []);

    if (stage === -1) return null;

    const stageLabels = ["Overview","Voluntary Control","Ekphysēsis","Tracheal Preprocessing","Glōttis Narrows","Πληγή — The Strike","Φωνή Emerges"];

    const pdur = (p: typeof particles[0]) =>
        stage >= 6 ? `${p.dFast}s` : stage >= 5 ? '0.09s' : stage >= 4 ? `${p.dMed}s` : `${p.dSlow}s`;

    const show = (from: number): React.CSSProperties => ({
        opacity: stage >= from ? 1 : stage === 0 ? 0.15 : 0.07,
        transition: 'opacity 0.7s ease',
    });

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F3EA] relative overflow-hidden">
            {/* Progress bar */}
            <div className="absolute top-3 left-0 right-0 flex justify-center gap-1 z-10 px-8">
                {stageLabels.map((label, i) => (
                    <div key={i} title={label} className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === stage ? 'bg-[#8b0000] flex-[2]' : i < stage ? 'bg-[#8b0000]/35 flex-1' : 'bg-black/10 flex-1'
                    }`} />
                ))}
            </div>
            <div className="absolute top-7 left-0 right-0 text-center">
                <span style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Georgia,serif', color: 'rgba(0,0,0,0.38)' }}>
                    {stageLabels[stage]}
                </span>
            </div>

            <svg viewBox="0 0 400 570" className="w-full h-full max-w-lg">
                <defs>
                    <marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                        <path d="M0,0 L7,3.5 L0,7 L1,3.5 z" fill="#8b0000" />
                    </marker>
                    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="5" result="b"/>
                        <feComposite in="SourceGraphic" in2="b" operator="over"/>
                    </filter>
                    <linearGradient id="body-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f3ede2"/>
                        <stop offset="100%" stopColor="#ede5d8"/>
                    </linearGradient>
                    <linearGradient id="ll" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d8cfc0"/><stop offset="100%" stopColor="#bfb49e"/>
                    </linearGradient>
                    <linearGradient id="lr" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#d8cfc0"/><stop offset="100%" stopColor="#bfb49e"/>
                    </linearGradient>
                    <linearGradient id="ll-on" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dfc490"/><stop offset="100%" stopColor="#b88848"/>
                    </linearGradient>
                    <linearGradient id="lr-on" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#dfc490"/><stop offset="100%" stopColor="#b88848"/>
                    </linearGradient>
                </defs>

                {/* ═══════════════════════════════════════
                    BODY — filled silhouette drawn first
                ═══════════════════════════════════════ */}

                {/* Torso */}
                <path d="M197 108 L 197 122 C 164 129, 110 152, 102 176 L 98 468 Q 215 490, 332 468 L 328 176 C 320 152, 266 129, 233 122 L 233 108 Z"
                    fill="url(#body-fill)" stroke="#3d3220" strokeWidth="1.6" strokeLinejoin="round"/>

                {/* Head */}
                <ellipse cx="215" cy="62" rx="41" ry="46" fill="url(#body-fill)" stroke="#3d3220" strokeWidth="1.6"/>

                {/* Neck */}
                <path d="M197 107 L 197 124 Q 215 130, 233 124 L 233 107" fill="url(#body-fill)" stroke="#3d3220" strokeWidth="1.3"/>

                {/* Ribcage — sternum + paired ribs */}
                <line x1="215" y1="195" x2="215" y2="418" stroke="#3d3220" strokeWidth="0.8" opacity="0.22"/>
                {[0,1,2,3,4,5,6].map(i => (
                    <React.Fragment key={`rib${i}`}>
                        <path d={`M214 ${202+i*33} C 197 ${206+i*33}, 156 ${220+i*33}, 132 ${232+i*33}`}
                            fill="none" stroke="#3d3220" strokeWidth="0.85" opacity="0.18" strokeLinecap="round"/>
                        <path d={`M216 ${202+i*33} C 233 ${206+i*33}, 274 ${220+i*33}, 298 ${232+i*33}`}
                            fill="none" stroke="#3d3220" strokeWidth="0.85" opacity="0.18" strokeLinecap="round"/>
                    </React.Fragment>
                ))}
                {/* Costal margin */}
                <path d="M132 418 Q 175 436, 215 438 Q 255 436, 298 418"
                    fill="none" stroke="#3d3220" strokeWidth="0.8" opacity="0.16"/>

                {/* Larynx — thyroid cartilage always visible in neck */}
                <path d="M204 128 L 200 158 L 215 166 L 230 158 L 226 128 Z"
                    fill="#ece6da" stroke="#3d3220" strokeWidth="1.2" opacity="0.6" strokeLinejoin="round"/>
                <ellipse cx="215" cy="164" rx="13" ry="5" fill="none" stroke="#3d3220" strokeWidth="0.9" opacity="0.3"/>
                {/* Resting glottis slit */}
                <line x1="208" y1="145" x2="222" y2="145" stroke="#3d3220" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
                {/* λάρυγξ label — always, very faint */}
                <text x="238" y="140" fontSize="7.5" fontStyle="italic" fontFamily="Georgia,serif" fill="#3d3220" opacity="0.3">λάρυγξ</text>

                {/* ═══════════════════════════════════════
                    ORGANS (activated per stage)
                ═══════════════════════════════════════ */}

                {/* BRAIN */}
                <g style={{ opacity: stage >= 1 ? 1 : stage === 0 ? 0.32 : 0.1, transition: 'opacity 0.7s' }}>
                    {stage >= 1 && (
                        <ellipse cx="215" cy="53" rx="32" ry="28" fill="#f5a060" opacity="0.18" filter="url(#glow)">
                            <animate attributeName="opacity" values="0.12;0.28;0.12" dur="2.2s" repeatCount="indefinite"/>
                        </ellipse>
                    )}
                    <path d="M187 50 C 181 30, 200 22, 213 33 C 219 22, 236 22, 243 35 C 253 28, 258 46, 250 57 C 246 66, 236 72, 224 73 C 218 76, 210 76, 204 73 C 189 68, 184 60, 187 50 Z"
                        fill={stage >= 1 ? "#dfc898" : "#dad5ca"} stroke="#3d3220" strokeWidth="1.2"/>
                    {/* Gyri */}
                    <path d="M195 46 Q 205 37, 213 45 Q 220 36, 231 45 Q 237 37, 245 48"
                        fill="none" stroke="#3d3220" strokeWidth="0.75" opacity="0.42"/>
                    <path d="M190 58 Q 202 50, 213 57 Q 224 49, 234 58"
                        fill="none" stroke="#3d3220" strokeWidth="0.65" opacity="0.34"/>
                    <path d="M192 68 Q 205 61, 215 67 Q 225 61, 236 68"
                        fill="none" stroke="#3d3220" strokeWidth="0.55" opacity="0.26"/>
                    <line x1="215" y1="24" x2="215" y2="73" stroke="#3d3220" strokeWidth="0.65" opacity="0.28"/>
                </g>

                {/* TRACHEA */}
                <g style={show(3)}>
                    <line x1="207" y1="166" x2="207" y2="300" stroke="#3d3220" strokeWidth="1.2"/>
                    <line x1="223" y1="166" x2="223" y2="300" stroke="#3d3220" strokeWidth="1.2"/>
                    {[...Array(9)].map((_, i) => (
                        <path key={i} d={`M207 ${177+i*14} Q 215 ${182+i*14}, 223 ${177+i*14}`}
                            fill="none" stroke="#3d3220" strokeWidth="1" opacity="0.46"/>
                    ))}
                    {/* Carina */}
                    <path d="M207 300 Q 215 308, 223 300" fill="none" stroke="#3d3220" strokeWidth="1" opacity="0.4"/>
                </g>

                {/* LUNGS */}
                <g style={show(2)}>
                    {/* Left */}
                    <path d="M208 300 C 186 307, 142 328, 130 402 C 124 448, 146 474, 200 472 L 208 460 Z"
                        fill={stage >= 2 ? "url(#ll-on)" : "url(#ll)"} stroke="#3d3220" strokeWidth="1.4"/>
                    <path d="M208 314 C 190 326, 160 352, 152 382"
                        fill="none" stroke="#3d3220" strokeWidth="0.75" opacity={stage >= 2 ? 0.28 : 0.08}/>
                    {/* Right */}
                    <path d="M222 300 C 244 307, 288 328, 300 402 C 306 448, 284 474, 230 472 L 222 460 Z"
                        fill={stage >= 2 ? "url(#lr-on)" : "url(#lr)"} stroke="#3d3220" strokeWidth="1.4"/>
                    <path d="M222 314 C 240 326, 270 352, 278 382"
                        fill="none" stroke="#3d3220" strokeWidth="0.75" opacity={stage >= 2 ? 0.28 : 0.08}/>
                    {/* Diaphragm */}
                    <path d="M130 472 Q 215 454, 300 472"
                        fill="none" stroke="#3d3220" strokeWidth="1.2" strokeDasharray="5,3"
                        opacity={stage >= 2 ? 0.48 : 0.12}/>
                </g>

                {/* ═══════════════════════════════════════
                    STAGE 0 — Three Pneumata overview
                ═══════════════════════════════════════ */}
                {stage === 0 && (
                    <g fontFamily="Georgia,serif" fontStyle="italic">
                        {/* ψυχικόν — brain */}
                        <circle cx="215" cy="52" r="5" fill="#8b0000" opacity="0.5">
                            <animate attributeName="opacity" values="0.35;0.8;0.35" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <line x1="258" y1="48" x2="221" y2="51" stroke="#5a1a1a" strokeWidth="0.85" opacity="0.55"/>
                        <text x="260" y="52" fontSize="9.5" fill="#5a1a1a" opacity="0.85">ψυχικόν</text>

                        {/* ζωτικόν — heart */}
                        <circle cx="200" cy="330" r="4.5" fill="#8b0000" opacity="0.38">
                            <animate attributeName="r" values="4;5.5;4" dur="1.2s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0.3;0.65;0.3" dur="1.2s" repeatCount="indefinite"/>
                        </circle>
                        <line x1="96" y1="328" x2="196" y2="330" stroke="#5a1a1a" strokeWidth="0.85" opacity="0.48"/>
                        <text x="54" y="323" fontSize="9.5" fill="#5a1a1a" opacity="0.78">ζωτικόν</text>
                        <text x="62" y="335" fontSize="8.5" fill="#5a1a1a" opacity="0.5">(καρδία)</text>

                        {/* φυσικόν — liver */}
                        <circle cx="250" cy="408" r="4" fill="#8b0000" opacity="0.3">
                            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.2s" repeatCount="indefinite"/>
                        </circle>
                        <line x1="308" y1="406" x2="255" y2="408" stroke="#5a1a1a" strokeWidth="0.85" opacity="0.44"/>
                        <text x="310" y="402" fontSize="9.5" fill="#5a1a1a" opacity="0.78">φυσικόν</text>
                        <text x="316" y="414" fontSize="8.5" fill="#5a1a1a" opacity="0.5">(ἧπαρ)</text>
                    </g>
                )}

                {/* ═══════════════════════════════════════
                    STAGE 1 — Recurrent laryngeal nerve
                ═══════════════════════════════════════ */}
                <g style={{ opacity: stage >= 1 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {/* Nerve: brain → down right of trachea → loop → back up to larynx */}
                    <path d="M220 75 C 230 100, 234 132, 234 166 C 235 210, 238 258, 238 298 C 242 318, 252 330, 244 318 C 236 308, 228 305, 226 318 C 225 290, 224 240, 223 200 C 223 175, 222 158, 220 145"
                        stroke="#8b0000" strokeWidth="2" fill="none" strokeDasharray="7 3" strokeLinecap="round">
                        <animate attributeName="stroke-dashoffset" from="80" to="0" dur="2.8s" repeatCount="indefinite"/>
                    </path>
                    {/* ψυχικὸν πνεῦμα label */}
                    <line x1="185" y1="78" x2="218" y2="74" stroke="#5a1a1a" strokeWidth="0.85" opacity="0.6"/>
                    <text x="108" y="80" fontSize="9.5" fontStyle="italic" fontFamily="Georgia,serif" fill="#5a1a1a">ψυχικὸν πνεῦμα</text>
                    {/* Loop label */}
                    <line x1="256" y1="316" x2="244" y2="320" stroke="#8b0000" strokeWidth="0.8" opacity="0.6"/>
                    <text x="258" y="313" fontSize="8" fontStyle="italic" fontFamily="Georgia,serif" fill="#8b0000">παλινδρομοῦν</text>
                    <text x="264" y="324" fontSize="8" fontStyle="italic" fontFamily="Georgia,serif" fill="#8b0000">νεῦρον</text>
                </g>

                {/* ═══════════════════════════════════════
                    STAGE 2 — Compression / ἐκφύσησις
                ═══════════════════════════════════════ */}
                <g style={{ opacity: stage >= 2 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {/* Left compression arrows */}
                    {[0,1,2,3].map(i => (
                        <path key={`la${i}`} d={`M110 ${314+i*40} L 133 ${320+i*40}`}
                            stroke="#8b0000" strokeWidth="2.2" strokeLinecap="round" markerEnd="url(#arr)">
                            <animate attributeName="d"
                                values={`M104 ${314+i*40} L 127 ${320+i*40}; M98 ${314+i*40} L 121 ${320+i*40}; M104 ${314+i*40} L 127 ${320+i*40}`}
                                dur="1.9s" repeatCount="indefinite"/>
                        </path>
                    ))}
                    {/* Right compression arrows */}
                    {[0,1,2,3].map(i => (
                        <path key={`ra${i}`} d={`M320 ${314+i*40} L 297 ${320+i*40}`}
                            stroke="#8b0000" strokeWidth="2.2" strokeLinecap="round" markerEnd="url(#arr)">
                            <animate attributeName="d"
                                values={`M326 ${314+i*40} L 303 ${320+i*40}; M332 ${314+i*40} L 309 ${320+i*40}; M326 ${314+i*40} L 303 ${320+i*40}`}
                                dur="1.9s" repeatCount="indefinite"/>
                        </path>
                    ))}
                    {/* Diaphragm upward push */}
                    <path d="M215 488 L 215 466" stroke="#8b0000" strokeWidth="3" markerEnd="url(#arr)">
                        <animate attributeName="d" values="M215 492 L 215 470; M215 498 L 215 476; M215 492 L 215 470" dur="1.9s" repeatCount="indefinite"/>
                    </path>
                    {/* Labels */}
                    <text x="54" y="500" fontSize="9.5" fontStyle="italic" fontFamily="Georgia,serif" fill="#5a1a1a">ἐκφύσησις</text>
                    <line x1="132" y1="496" x2="148" y2="484" stroke="#5a1a1a" strokeWidth="0.85" opacity="0.55"/>
                    <text x="222" y="506" fontSize="9" fontStyle="italic" fontFamily="Georgia,serif" fill="#5a1a1a">ῥώμη</text>
                    <text x="310" y="400" fontSize="9" fontStyle="italic" fontFamily="Georgia,serif" fill="#5a1a1a">ὕλη τις</text>
                    <text x="310" y="413" fontSize="9" fontStyle="italic" fontFamily="Georgia,serif" fill="#5a1a1a">οἰκεία</text>
                </g>

                {/* ═══════════════════════════════════════
                    STAGE 3 — Trachea preprocessing label
                ═══════════════════════════════════════ */}
                {stage === 3 && (
                    <g>
                        <line x1="223" y1="234" x2="252" y2="230" stroke="#5a1a1a" strokeWidth="0.85" opacity="0.55"/>
                        <text x="254" y="233" fontSize="9.5" fontStyle="italic" fontFamily="Georgia,serif" fill="#5a1a1a">προρρυθμίζει</text>
                    </g>
                )}

                {/* ═══════════════════════════════════════
                    STAGE 3+ — Particles (ἐκφύσησις flowing up)
                ═══════════════════════════════════════ */}
                <g style={{ opacity: stage >= 3 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {particles.map(p => (
                        <circle key={p.id} r={p.r} fill="#8b0000" opacity="0.82">
                            <animateMotion
                                dur={pdur(p)} repeatCount="indefinite"
                                path={`M${p.x} 458 C ${p.x} 392, 215 330, 215 248 C 215 206, 215 182, 215 166`}
                                begin={`${p.begin}s`}
                                keyPoints={stage >= 5 ? "0;0.84;1" : "0;1"}
                                keyTimes={stage >= 5 ? "0;0.92;1" : "0;1"}
                                calcMode="linear"
                            />
                        </circle>
                    ))}
                </g>

                {/* ═══════════════════════════════════════
                    STAGE 4 — Glottis narrows + ἴλιγγος
                ═══════════════════════════════════════ */}
                <g style={{ opacity: stage >= 4 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {/* Glottis highlight over larynx */}
                    <ellipse cx="215" cy="145" rx="14" ry="5.5"
                        fill="white" stroke="#8b0000" strokeWidth="2.2">
                        {stage === 4 && (
                            <animate attributeName="ry" values="5.5;1.5;5.5" dur="1.3s" repeatCount="indefinite"/>
                        )}
                    </ellipse>
                    {/* Vocal folds — narrowing */}
                    <path d="M204 145 L 226 145" stroke="#8b0000" strokeWidth="3" strokeLinecap="round">
                        {stage === 4 && (
                            <animate attributeName="d" values="M204 145 L 226 145; M212 145 L 218 145; M204 145 L 226 145" dur="1.3s" repeatCount="indefinite"/>
                        )}
                        {stage >= 5 && (
                            <animate attributeName="d" values="M213 145 L 217 145; M215 145 L 215 145; M213 145 L 217 145" dur="0.18s" repeatCount="indefinite"/>
                        )}
                    </path>
                    {/* γλωττίς label */}
                    <line x1="230" y1="139" x2="254" y2="127" stroke="#3d3220" strokeWidth="0.85" opacity="0.6"/>
                    <text x="256" y="125" fontSize="10" fontStyle="italic" fontFamily="Georgia,serif" fill="#3d3220">γλωττίς</text>

                    {/* ἴλιγγος — laryngeal ventricle whirlpools */}
                    {stage === 4 && (
                        <g opacity="0.75">
                            <ellipse cx="196" cy="153" rx="9" ry="4" fill="none" stroke="#8b0000" strokeWidth="1.1" strokeDasharray="3,2">
                                <animateTransform attributeName="transform" type="rotate" from="0 196 153" to="360 196 153" dur="2.2s" repeatCount="indefinite"/>
                            </ellipse>
                            <ellipse cx="234" cy="153" rx="9" ry="4" fill="none" stroke="#8b0000" strokeWidth="1.1" strokeDasharray="3,2">
                                <animateTransform attributeName="transform" type="rotate" from="360 234 153" to="0 234 153" dur="2.2s" repeatCount="indefinite"/>
                            </ellipse>
                            <line x1="158" y1="162" x2="186" y2="156" stroke="#8b0000" strokeWidth="0.85" opacity="0.65"/>
                            <text x="102" y="164" fontSize="10" fontStyle="italic" fontFamily="Georgia,serif" fill="#8b0000">ἴλιγγος</text>
                        </g>
                    )}
                </g>

                {/* ═══════════════════════════════════════
                    STAGE 5 — Strike (πληγή)
                ═══════════════════════════════════════ */}
                {stage === 5 && (
                    <g>
                        {[0,1,2].map(i => (
                            <circle key={i} cx="215" cy="145" stroke="#8b0000" strokeWidth={2.4 - i*0.5} fill="none" r="3" opacity="0">
                                <animate attributeName="r" values={`${2+i*2};${24+i*7}`} dur="0.44s" begin={`${i*0.13}s`} repeatCount="indefinite"/>
                                <animate attributeName="opacity" values="0.9;0" dur="0.44s" begin={`${i*0.13}s`} repeatCount="indefinite"/>
                            </circle>
                        ))}
                        {/* πληγή label */}
                        <line x1="230" y1="138" x2="256" y2="124" stroke="#8b0000" strokeWidth="0.9" opacity="0.85"/>
                        <text x="258" y="122" fontSize="12" fontStyle="italic" fontFamily="Georgia,serif" fill="#8b0000" fontWeight="bold">πληγή</text>
                        {/* συμμετρία */}
                        <text x="106" y="173" fontSize="9.5" fontStyle="italic" fontFamily="Georgia,serif" fill="#5a1a1a" opacity="0.8">συμμετρία</text>
                    </g>
                )}

                {/* ═══════════════════════════════════════
                    STAGE 6 — Voice (φωνή) radiates outward
                ═══════════════════════════════════════ */}
                <g style={{ opacity: stage >= 6 ? 1 : 0, transition: 'opacity 0.7s' }}>
                    {/* Sound waves from upper head area */}
                    {[0,1,2].map(i => (
                        <React.Fragment key={i}>
                            <path d={`M215 86 Q ${244+i*16} ${68-i*5}, ${268+i*22} 86`}
                                fill="none" stroke="#8b0000" strokeWidth={2.2-i*0.4} opacity="0">
                                <animate attributeName="d"
                                    values={`M215 86 Q ${244+i*16} ${68-i*5}, ${268+i*22} 86; M215 86 Q ${272+i*20} ${44-i*7}, ${320+i*28} 86`}
                                    dur="1.9s" begin={`${i*0.24}s`} repeatCount="indefinite"/>
                                <animate attributeName="opacity" values="0.88;0" dur="1.9s" begin={`${i*0.24}s`} repeatCount="indefinite"/>
                            </path>
                            <path d={`M215 86 Q ${186-i*16} ${68-i*5}, ${162-i*22} 86`}
                                fill="none" stroke="#8b0000" strokeWidth={2.2-i*0.4} opacity="0">
                                <animate attributeName="d"
                                    values={`M215 86 Q ${186-i*16} ${68-i*5}, ${162-i*22} 86; M215 86 Q ${158-i*20} ${44-i*7}, ${110-i*28} 86`}
                                    dur="1.9s" begin={`${i*0.24}s`} repeatCount="indefinite"/>
                                <animate attributeName="opacity" values="0.88;0" dur="1.9s" begin={`${i*0.24}s`} repeatCount="indefinite"/>
                            </path>
                        </React.Fragment>
                    ))}
                    <text x="174" y="30" fontSize="19" fontStyle="italic" fontFamily="Georgia,serif" fill="#8b0000" letterSpacing="3" opacity="0.92">φωνή</text>
                </g>
            </svg>
        </div>
    );
};
