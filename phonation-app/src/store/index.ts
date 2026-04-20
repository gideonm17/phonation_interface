import { create } from 'zustand';

export type ActiveSection = 'intro' | 'larynx' | 'pneuma' | 'analysis';

interface AppState {
    currentStepIndex: number;
    activeSection: ActiveSection;
    activeTerm: string | null;
    showBibliography: boolean;

    // Actions
    setStep: (index: number) => void;
    setActiveSection: (section: ActiveSection) => void;
    setActiveTerm: (term: string | null) => void;
    setShowBibliography: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    currentStepIndex: 0,
    activeSection: 'intro',
    activeTerm: null,
    showBibliography: false,

    setStep: (index) => set({ currentStepIndex: index }),
    setActiveSection: (section) => set({ activeSection: section, currentStepIndex: 0 }),
    setActiveTerm: (term) => set({ activeTerm: term }),
    setShowBibliography: (show) => set({ showBibliography: show }),
}));
