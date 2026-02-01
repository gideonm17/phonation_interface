import { useEffect } from 'react';
import { useAppStore, ActiveSection } from '../store';

export const UrlSync = () => {
    const { activeSection, currentStepIndex, setActiveSection, setStep } = useAppStore();

    // 1. Sync State -> URL
    useEffect(() => {
        const url = new URL(window.location.href);
        url.searchParams.set('section', activeSection);
        if (activeSection !== 'intro') {
            url.searchParams.set('step', currentStepIndex.toString());
        } else {
            url.searchParams.delete('step');
        }
        window.history.pushState({}, '', url);
    }, [activeSection, currentStepIndex]);

    // 2. Sync URL -> State (Initial Load only)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const section = params.get('section');
        const step = parseInt(params.get('step') || '0', 10);

        if (section && ['intro', 'larynx', 'pneuma', 'analysis'].includes(section)) {
            setActiveSection(section as ActiveSection);
            if (!isNaN(step) && step >= 0) {
                setTimeout(() => setStep(step), 0);
            }
        }
    }, [setActiveSection, setStep]);

    return null;
};
