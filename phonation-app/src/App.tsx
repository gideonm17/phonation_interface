import { Navigation } from './components/Navigation';
import { MediaViewer } from './components/MediaViewer';
import { NarrativePanel } from './components/NarrativePanel';
import { UrlSync } from './components/UrlSync';
import { GlossaryCard } from './components/GlossaryCard';

function App() {
    return (
        <div className="flex flex-col md:flex-row h-screen w-full font-serif overflow-hidden">
            <UrlSync />
            <GlossaryCard />
            <Navigation />
            <div className="w-full md:w-3/5 h-[40vh] md:h-full bg-parchment relative shadow-inner order-1 md:order-2">
                <MediaViewer />
            </div>
            <div className="w-full md:w-2/5 h-[60vh] md:h-full bg-white z-10 shadow-2xl relative order-2 md:order-1">
                <NarrativePanel />
            </div>
        </div>
    );
}

export default App;
