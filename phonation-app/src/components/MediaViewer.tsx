import { useEffect, useRef } from 'react';
import { useAppStore } from '../store';
import { Step, SCRIPT_PNEUMA, SCRIPT_ANALYSIS, SCRIPT_LARYNX } from '../data/constants';
import { PneumaVisualizer } from './PneumaVisualizer';

const EMPTY_STEP: Step = { id: '', title: '', content: '', media: 'none' };

export const MediaViewer = () => {
    const { currentStepIndex, activeSection } = useAppStore();
    const videoRef = useRef<HTMLVideoElement>(null);

    let SCRIPT: Step[] | undefined;
    if (activeSection === 'pneuma') SCRIPT = SCRIPT_PNEUMA;
    else if (activeSection === 'analysis') SCRIPT = SCRIPT_ANALYSIS;
    else if (activeSection === 'larynx') SCRIPT = SCRIPT_LARYNX;

    const step: Step = SCRIPT ? (SCRIPT[currentStepIndex] ?? SCRIPT[0]) : EMPTY_STEP;

    // Handle video playback
    useEffect(() => {
        let rafId: number;
        if (step.media === 'video' && videoRef.current) {
            const vid = videoRef.current;
            vid.currentTime = step.timeRange ? step.timeRange[0] : 0;
            vid.play().catch(() => { /* autoplay blocked; user interaction will start playback */ });

            if (step.timeRange) {
                const { timeRange } = step;
                const checkTime = () => {
                    if (vid.currentTime >= timeRange[1]) {
                        vid.currentTime = timeRange[0];
                    }
                    rafId = requestAnimationFrame(checkTime);
                };
                rafId = requestAnimationFrame(checkTime);
            }
        }

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [currentStepIndex, step]);

    // Intro Mode (Hero Image)
    if (activeSection === 'intro') {
        return (
            <div className="w-full h-full flex items-center justify-center bg-parchment relative overflow-hidden">
                <img
                    src="reference/main_page_photo.png"
                    alt="Galen's Phonatory System — ATLOMY 3D Reconstruction"
                    className="max-w-[70%] max-h-[70%] object-contain drop-shadow-xl saturate-50 opacity-90 transition-all duration-1000 hover:scale-105 hover:opacity-100"
                />
                <div className="absolute bottom-10 text-center font-serif text-galen-red/60 text-sm italic">
                    3D reconstruction of the Galenic phonatory system, ATLOMY project
                </div>
            </div>
        );
    }

    if (step.media === 'schematic') {
        return <PneumaVisualizer />;
    }

    return (
        <div className="w-full h-full flex items-center justify-center bg-black/5 overflow-hidden relative">
            {step.media === 'image' && (
                <div className="w-full h-full flex items-center justify-center bg-black">
                    <img
                        src={step.mediaUrl}
                        alt="Visual Reference"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
            {step.media === 'video' && (
                <video
                    ref={videoRef}
                    src={step.mediaUrl}
                    muted
                    playsInline
                    autoPlay
                    controls
                    className="w-full h-full object-contain bg-black"
                />
            )}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 text-sm rounded backdrop-blur max-w-[80%]">
                Visual Reference: {step.media === 'video' ? 'Atlomy Project Animation' : (step.media === 'image' ? 'Anatomical Illustration' : 'Schematic Visualisation')}
            </div>
        </div>
    );
};
