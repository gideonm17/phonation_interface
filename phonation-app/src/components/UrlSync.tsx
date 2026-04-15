import { useEffect } from 'react';
import { useAppStore, ActiveSection } from '../store';
import { SCRIPT_LARYNX, SCRIPT_PNEUMA, SCRIPT_ANALYSIS } from '../data/constants';

const SCRIPT_LENGTHS: Record<string, number> = {
    larynx: SCRIPT_LARYNX.length,
    pneuma: SCRIPT_PNEUMA.length,
    analysis: SCRIPT_ANALYSIS.length,
};

export const UrlSync = () => {
    const { activeSection, currentStepIndex, setActiveSection, setStep } = useAppStore();

    // 1. Sync State -> URL
    useEffect(() => {
        const url = new URL(window.location.href);
        const prevSection = url.searchParams.get('section');

        url.searchParams.set('section', activeSection);
        if (activeSection !== 'intro') {
            url.searchParams.set('step', currentStepIndex.toString());
        } else {
            url.searchParams.delete('step');
        }

        // pushState only when section changes; replaceState for step-only changes
        if (prevSection !== activeSection) {
            window.history.pushState({}, '', url);
        } else {
            window.history.replaceState({}, '', url);
        }
    }, [activeSection, currentStepIndex]);

    // 2. Sync URL -> State (Initial Load only)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const section = params.get('section');
        const rawStep = parseInt(params.get('step') || '0', 10);

        if (section && ['intro', 'larynx', 'pneuma', 'analysis'].includes(section)) {
            setActiveSection(section as ActiveSection);
            if (!isNaN(rawStep)) {
                const maxStep = (SCRIPT_LENGTHS[section] ?? 1) - 1;
                const safeStep = Math.min(Math.max(rawStep, 0), maxStep);
                setTimeout(() => setStep(safeStep), 0);
            }
        }
    }, [setActiveSection, setStep]);

    return null;
};
