import { create } from 'zustand';

export type ActiveSection = 'intro' | 'larynx' | 'pneuma' | 'analysis';

interface AppState {
    currentStepIndex: number;
    activeSection: ActiveSection;
    activeTerm: string | null;

    // Actions
    setStep: (index: number) => void;
    setActiveSection: (section: ActiveSection) => void;
    setActiveTerm: (term: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    currentStepIndex: 0,
    activeSection: 'intro',
    activeTerm: null,

    setStep: (index) => set({ currentStepIndex: index }),
    setActiveSection: (section) => set({ activeSection: section, currentStepIndex: 0 }),
    setActiveTerm: (term) => set({ activeTerm: term }),
}));
