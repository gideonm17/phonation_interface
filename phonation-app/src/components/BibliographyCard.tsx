import { useEffect } from 'react';
import { useAppStore } from '../store';

const PRIMARY_SOURCES = [
    {
        group: 'Galen — Editions Used',
        entries: [
            'De Lacy, Phillip. Galeni De placitis Hippocratis et Platonis. CMG V 4,1,2. Teil 1, 3rd ed.; Teil 2, 2nd ed.; Teil 3, 2nd rev. ed. Berlin: Akademie Verlag, 2005. [PHP]',
            'Garofalo, Ivan. Anonymi Medici: De Morbis Acutis et Chroniis. Vol. 12. 1st ed. Boston: Brill, 1996. [AA]',
            'Helmreich, Georg. Galeni De usu partium libri XVII. Vol. 1. Leipzig: Teubner, 1907; Vol. 2. Leipzig: Teubner, 1909. [UP]',
            'Kühn, C. G. Claudii Galeni opera omnia. Vols. 4, 7, 12–13. Leipzig: Knobloch, 1822–27; repr. Hildesheim: Olms, 1964–65.',
            'Nickel, Diethard. Galeni De foetuum formatione. CMG V 3,3. Berlin: Akademie Verlag, 2001. [De Foet. Form.]',
            'Nutton, Vivian. "Galen and the Latin De Voce: A New Edition and English Translation." In Nell\'officina del filologo: Studi sui testi e i loro lettori. Per Ivan Garofalo, edited by Tommaso Raiola and Amneris Roselli, vol. 7, Biblioteca di Galenos, 141–64. Pisa–Roma: Fabrizio Serra Editore, 2022. [De Voce]',
            'Simon, M. Galens Anatomie, 7 Bücher veröff. nach den Hss. einer arabischen Übersetzung des 9. Jhdt. p. Chr., ins Deutsche übertragen und kommentiert. Vol. 1. Leipzig: J. C. Hinrichs\'sche Buchhandlung, 1906; repr. Frankfurt am Main, 1996. [AA, Arabic]',
            'Wittwer, Roland. Galeni De locis affectis III–IV / Galen, Über das Erkennen erkrankter Körperteile III–IV. Corpus Medicorum Graecorum V 5/6,1,2. Berlin, Boston: De Gruyter Akademie Forschung, 2024. [De Loc. Aff.]',
        ],
    },
    {
        group: 'Classical Authors',
        entries: [
            'Aristotle. De Anima. Edited by W. D. Ross. Oxford Classical Texts. Oxford: Clarendon Press, 1961.',
            'Homer. Homeri Ilias. Edited by T. W. Allen. Vols. 2–3. Oxford: Clarendon Press, 1931.',
            'Plutarchus. Volume IV Moralia. Edited and translated by Kurt Hubert. B. G. Teubner, 2013.',
            'Rufus of Ephesus. Oeuvres de Rufus d\'Éphèse. Edited by C. Daremberg and C. É. Ruelle. Paris: Imprimerie Nationale, 1879. Repr. Amsterdam: Hakkert, 1963.',
            'Various Hellenistic Philosophers. Long, A. A., and D. N. Sedley. The Hellenistic Philosophers: Translations of the Principal Sources with Philosophical Commentary. Vol. 1. Cambridge: Cambridge University Press, 2012.',
            'Von Staden, Heinrich. Herophilus: The Art of Medicine in Early Alexandria. Cambridge: Cambridge University Press, 1989.',
        ],
    },
];

const SECONDARY_SOURCES = [
    'Debru, Armelle. Le corps respirant: la pensée physiologique chez Galien. Studies in Ancient Medicine, v. 13. E. J. Brill, 1996.',
    'Ezrokhi, Dmitry, and Orly Lewis. "Galen\'s Typology of Organs." Apeiron 58, no. 2 (2025): 109–33.',
    'Ferella, Cristina. "Early Greek Medical Metaphors and the Question of Deliberateness." In Drawing Attention to Metaphor, edited by Camilla Di Biase-Dyson and Daniel King, vol. 5. John Benjamins Publishing Company, 2020.',
    'Flemming, Rebecca. "Demiurge and Emperor in Galen\'s World of Knowledge." In Galen and the World of Knowledge, edited by Christopher Gill, John Wilkins, and Tim Whitmarsh. Cambridge University Press, 2009.',
    'Hankinson, R. J. "Body and Soul in Galen." In Common to Body and Soul. De Gruyter, 2008.',
    'Havrda, Matyáš. "The Discovery of Chreia: Galen\'s Method of Teleological Demonstration and Its Aristotelian Background." Early Science and Medicine 29, no. 2 (2024): 121–49.',
    'Koenig, Amy A. "The Embodied Voice: Conflict and Constraint in Galen\'s Writings." In The Fractured Voice. University of Wisconsin Press, 2024.',
    'Lewis, Orly, and David Leith. "Ideas of Pneuma in Early Hellenistic Medical Writers." In The Concept of Pneuma after Aristotle, edited by Sean Coughlin, David Leith, and Orly Lewis. Berlin Studies of the Ancient World 61. Edition Topoi, 2020.',
    'Lloyd, G. E. R. Polarity and Analogy: Two Types of Argumentation in Early Greek Thought. Cambridge University Press, 1966.',
    'May, Margaret Tallmadge. Galen on the Usefulness of the Parts of the Body / De Usu Partium. 2 vols. Cornell University Press, 1968.',
    'Repici, Luciana. "L\'epiglottide nell\'antichità tra medicina e filosofia." History and Philosophy of the Life Sciences 12, no. 1 (1990): 67–104.',
    'Salas, Luis Alejandro. "Anatomy and Physiology." In The Oxford Handbook of Galen, edited by P. N. Singer and Ralph M. Rosen. Oxford University Press, 2024.',
    'Singer, Peter N. "Galen on Pneuma: Between Metaphysical Speculation and Anatomical Theory." In The Concept of Pneuma after Aristotle, edited by Sean Coughlin, David Leith, and Orly Lewis. Berlin Studies of the Ancient World 61. Edition Topoi, 2020.',
    'Von Staden, Heinrich. "Anatomy as Rhetoric: Galen on Dissection and Persuasion." Journal of the History of Medicine and Allied Sciences 50, no. 1 (1995): 47–66.',
    'Von Staden, Heinrich. "Science as Text, Science as History: Galen on Metaphor." In Ancient Medicine in Its Socio-Cultural Context, vol. 2. Brill, 1995.',
];

export const BibliographyCard = () => {
    const { showBibliography, setShowBibliography } = useAppStore();

    useEffect(() => {
        if (!showBibliography) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowBibliography(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [showBibliography, setShowBibliography]);

    if (!showBibliography) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bibliography-dialog-title"
            onClick={() => setShowBibliography(false)}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 pb-3 border-b border-ink/10 shrink-0">
                    <button
                        className="absolute top-4 right-4 text-black/30 hover:text-black transition-colors"
                        aria-label="Close bibliography"
                        onClick={() => setShowBibliography(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h3 id="bibliography-dialog-title" className="text-2xl font-serif font-bold text-galen-red mb-0.5">
                        Bibliography
                    </h3>
                    <p className="text-xs font-sans uppercase tracking-wider text-black/40">
                        Sources cited in this interface
                    </p>
                </div>

                <div className="overflow-y-auto p-6 pt-4 space-y-6 text-sm font-sans">
                    {PRIMARY_SOURCES.map(section => (
                        <div key={section.group}>
                            <h4 className="font-bold text-black/70 uppercase tracking-wider text-xs mb-3">
                                {section.group}
                            </h4>
                            <ul className="space-y-2">
                                {section.entries.map((entry, i) => (
                                    <li key={i} className="text-slate-700 leading-relaxed pl-4 border-l-2 border-galen-red/20">
                                        {entry}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h4 className="font-bold text-black/70 uppercase tracking-wider text-xs mb-3">
                            Secondary Literature
                        </h4>
                        <ul className="space-y-2">
                            {SECONDARY_SOURCES.map((entry, i) => (
                                <li key={i} className="text-slate-700 leading-relaxed pl-4 border-l-2 border-galen-red/20">
                                    {entry}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-slate-600 text-xs leading-relaxed">
                        The full bibliography, including all primary and secondary sources, can be found in the MA thesis:
                        Gideon Manelis, <em>Peri Phōnēs: Galen's Anatomical and Physiological Understanding of Voice Production</em>
                        (MA thesis, Classics, Hebrew University of Jerusalem, 2025). A full model with bibliography is also
                        available on the <strong>ATLOMY</strong> project page.
                    </div>
                </div>
            </div>
        </div>
    );
};
