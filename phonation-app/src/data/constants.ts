export interface Step {
    id: string;
    title: string;
    content: string;
    greek?: string;
    media: 'image' | 'video' | 'schematic' | 'none';
    mediaUrl?: string; // e.g. "reference/glottis_illustration(1).png"
    reference?: string;
    timeRange?: [number, number];
}

export interface GlossaryEntry {
    term: string;
    def: string;
    url?: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
    "Plēgē": {
        term: "Plēgē",
        def: "The mechanical impact of the accelerated air against the cartilaginous body. As described in the thesis (PHP 2.4.26-28), this impact is like a plectrum striking a string, transforming the Ekphysesis into Voice.",
        url: "https://www.atlomy.com/term/plege"
    },
    "Voice": {
        term: "Phōnē",
        def: "The foremost vehicle of thought. A meaningful sound produced by the soul through the active mechanism of the larynx.",
        url: "https://www.atlomy.com/term/phone"
    },
    "Pneuma": {
        term: "Pneuma",
        def: "The vital spirit or 'breath' that permeates the body. In phonation, it serves as the raw material.",
        url: "https://www.atlomy.com/term/pneuma"
    },
    "Ekphysesis": {
        term: "Ekphysesis",
        def: "Forceful Exhalation. A sudden, muscular activity originating in the thorax that pushes air vehemently.",
        url: "https://www.atlomy.com/lemma/23674-ekphus%C4%93sis?search_word=%CE%B5%CE%BA%CF%86%CF%85%CF%83%CE%B7%CF%83%CE%B9%CF%82"
    },
    "Glottis": {
        term: "Glōttis",
        def: "The 'Tongue of the Larynx'. A complex valve consisting of paired membranous lips (vestibular folds) and cavities (ventricles).",
        url: "https://www.atlomy.com/term/glottis"
    },
    "Arytenoid": {
        term: "Arytaina",
        def: "The 'Ewer-shaped' or 'Pitcher-like' cartilage. Galen describes it as a singular, fused structure at the apex.",
        url: "https://www.atlomy.com/lemma/23653-arytainoeid%C4%93s?search_word=%CE%B1%CF%81%CF%85%CF%84%CE%B1%CE%B9%CE%BD%CE%BF%CE%B5%CE%B9%CE%B4%CE%B7%CF%82"
    },
    "Thyroid": {
        term: "Thuroeidēs",
        def: "The 'Shield-like' cartilage. It forms the large, protective anterior wall of the larynx.",
        url: "https://www.atlomy.com/lemma/23673-thyreoeid%C4%93s?search_word=%CE%B8%CF%85%CF%81%CE%B5%CE%BF%CE%B5%CE%B9%CE%B4%CE%B7%CF%82"
    },
    "Cricoid": {
        term: "Krikoeidēs",
        def: "The 'Ring-like' cartilage. It forms the base of the larynx, sitting atop the trachea.",
        url: "https://www.atlomy.com/lemma/23652-deuteros?search_word=%CE%B4%CE%B5%CF%85%CF%84%CE%B5%CF%81%CE%BF%CF%82"
    },
    "Muscles": {
        term: "Special Muscles",
        def: "The twelve intrinsic muscles of the larynx.",
        url: "https://www.atlomy.com/term/laryngeal-muscles"
    },
    "Nerves": {
        term: "Palindromoun",
        def: "The Recurrent Laryngeal Nerve. It 'runs back' from the thorax to the larynx.",
        url: "https://www.atlomy.com/lemma/23498-neuron?search_word=%CE%BD%CE%B5%CF%85%CF%81%CE%BF%CE%BD"
    },
    "Whirlpool": {
        term: "Iliggos",
        def: "A swirling motion of air within the ventricles of the glottis.",
        url: "https://www.atlomy.com/term/iliggos"
    }
};

export const SCRIPT_PNEUMA: Step[] = [
    {
        id: "pneuma_intro",
        title: "I. Pneuma and Voice",
        content: "\"In ancient medical theory, voice is not produced by air alone but by pneuma—an active, warmed, and forcefully expelled substance—whose movement through the body is regulated, intensified, and transformed before voice emerges.\"",
        media: "schematic"
    },
    {
        id: "pneuma_brain",
        title: "1. Origin and Regulation",
        content: "The process begins with the Enkephalos (Brain). It acts as the coordinating center, sending the impulse through the nerves. It is a governance of motion, not just a signal.",
        media: "schematic"
    },
    {
        id: "pneuma_thorax",
        title: "2. Generation and Intensification",
        content: "In the Thorax, inhaled air is warmed and transformed into <Pneuma>Pneuma</Pneuma> within the Lungs. The intercostal muscles and abdominal muscles compress the chest, generating the forceful <Ekphysesis>Ekphysesis</Ekphysesis> required for voice.",
        media: "schematic"
    },
    {
        id: "pneuma_trachea",
        title: "3. Directed Upward Motion",
        content: "The energetic <Pneuma>Pneuma</Pneuma> rushes upward through the Trachea as a directed flow. It is not passive airflow but a 'suitable material' charged with intensity.",
        media: "schematic"
    },
    {
        id: "pneuma_larynx",
        title: "4. Transformation at the Larynx",
        content: "The <Glottis>Glottis</Glottis> acts as the critical valve. By narrowing, it resists the upward flow, increasing the tension and density of the pneuma before the strike.",
        media: "schematic"
    },
    {
        id: "pneuma_strike",
        title: "5. The Strike (Plēgē)",
        content: "The accelerated <Ekphysesis>Ekphysesis</Ekphysesis> is struck by the cartilages of the larynx. Like a plectrum hitting a string, this physical impact (<Plēgē>Plēgē</Plēgē>) against the fast-moving pneuma is the generative act of voice.",
        media: "schematic"
    },
    {
        id: "pneuma_voice",
        title: "6. Emergence of Voice",
        content: "Finally, from this strike, <Voice>Voice</Voice> emerges—not as the air itself, but as the shockwave resulting from the impact, radiating outward to the listener.",
        media: "schematic"
    }
];

export const SCRIPT_LARYNX: Step[] = [
    {
        id: "intro_instrument",
        title: "The Larynx: Instrument of voice",
        content: "\"Voice is the foremost vehicle of thought: a vivid and living bridge between the soul and the world beyond.\" Galen defines it as a mechanism involving specific anatomical structures.",
        media: "image",
        mediaUrl: "reference/glottis_illustration(1).png"
    },
    {
        id: "cartilages",
        title: "1. Cartilages of the Larynx",
        content: "The <Thyroid>Thyroid</Thyroid> is \"a large, shield-shaped cartilage in the front of the larynx.\" The <Cricoid>Cricoid</Cricoid> is \"said to have a circular shape, like a ring.\" The <Arytenoid>Arytenoid</Arytenoid> is mentioned \"as one rather than two separate structures... the term derives from ἀρύταινα, denoting 'jug.'\"",
        media: "image",
        mediaUrl: "reference/glottis_illustration(1).png"
    },
    {
        id: "muscles",
        title: "2. Laryngeal Muscles",
        content: "Galen identifies twelve <Muscles>Special Muscles</Muscles>. \"Among this group... the thyroarytenoid muscles are the most crucial for phonation... responsible for closing [the glottis]... Galen remarks that nature (φύσις) has demonstrated superb skill in constructing them.\"",
        media: "image",
        mediaUrl: "reference/glottis_illustration(1).png"
    },
    {
        id: "nerves",
        title: "3. Laryngeal Nerves",
        content: "\"The <Nerves>recurrent laryngeal nerves</Nerves> (τό παλινδρομοῦν νεῦρον) are described as two small nerves ascending from below... Galen names it 'unjust' (ἄδικον) that this nerve would not reach from the brain, and he praises nature for constructing it the way it is.\"",
        media: "image",
        mediaUrl: "reference/glottis_illustration(1).png"
    },
    {
        id: "glottis_def",
        title: "4. The Glottis (τι σῶμα)",
        content: "\"In its inner cavity... is fixed <Glottis>a certain body</Glottis>... that resembles neither in substance nor in structure to any of the other body parts... which indeed I name glōttis and the tongue of the larynx.\"",
        media: "image",
        mediaUrl: "reference/glottis_illustration(1).png"
    },
    {
        id: "ekphysesis",
        title: "5. The Material: Ekphysesis",
        content: "\"Phonation requires <Ekphysesis>Ekphysesis</Ekphysesis>... a forceful, muscularly generated exhalation with degrees of intensity, and as an activity (ἐνέργεια)... 'a kind of suitable material of voice' (ὕλη τις οἰκεία φωνῆς).\"",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        timeRange: [0, 5]
    },
    {
        id: "narrowing",
        title: "6. The Narrowing",
        content: "The structure of the valves \"makes the air spin inside in what Galen calls 'some kind of a <Whirlpool>whirlpool experience</Whirlpool>' (οἷον ἴλιγγόν τινα παθὸν).\"",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        timeRange: [5, 10]
    },
    {
        id: "strike",
        title: "7. The Strike (Plēgē)",
        content: "\"For the <Ekphysesis>Ekphysesis</Ekphysesis>, which is <Strike>struck</Strike> by the cartilages of the larynx as if it were struck by some plectrums, becomes this voice.\"",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        timeRange: [10, 15]
    }
];

export const SCRIPT_ANALYSIS: Step[] = [
    {
        id: "analysis_intro",
        title: "1. The Nature of the Glottis",
        content: "The muscles and the cartilages of the larynx were indeed described: it shall be spoken now about the other parts in what follows. In its (the larynx's) inner cavity, through which pneuma passes in and out, is fixed a certain body, on which I shortly spoke before, that resembles neither in substance nor in structure to any of the other body parts in all of the body. I have also spoken about it in my treatise On The Voice, showing that it is the first and the most proper organ of the voice, and it will be said now, as much as is necessary for the present affairs.",
        greek: "Περὶ μὲν δὴ τῶν μυῶν τε καὶ τῶν χόνδρων τοῦ λάρυγγος εἴρηται· περὶ δὲ τῶν ἄλλων ἐφεξῆς λεγέσθω. κατὰ τὴν ἔνδον χώραν αὐτοῦ, δι' ἧς εἴσω τε καὶ ἔξω τὸ πνεῦμα φέρεται, τέτακταί τι σῶμα, περὶ οὗ μικρὸν ἔμπροσθεν εἶπον, οὔτε τὴν οὐσίαν, οὔτε τὸ σχῆμα παραπλήσιον ἑτέρῳ τινὶ τῶν καθ' ὅλον τὸ ζῶον. ὑπὲρ οὗ λέλεκται μέν μοι κᾀν τοῖς περὶ φωνῆς, ἐπιδεικνύντι τὸ πρῶτόν τε καὶ κυριώτατον ὑπάρχειν αὐτὸ τῆς φωνῆς ὄργανον· εἰρήσεται δὲ καὶ νῦν, ὅσον εἰς τὰ παρόντα ἐστὶ χρήσιμον",
        media: "image",
        mediaUrl: "reference/glottis_illustration(1).png",
        reference: "Gal. UP.7.13, 407,19 - 26 Helmreich = 3.560 - 561 Kühn"
    },
    {
        id: "analysis_aulos",
        title: "2. The Aulos Analogy",
        content: "It resembles the mouthpiece (glōttis) of an aulos (ἀυλός), especially when it is viewed from below or above. I mean below, where the (rough) artery and the larynx meet [Cricotracheal ligament]: I mean above, through the orifice that is formed by the borders of the arytenoid and thyroid cartilages. It would be better not to liken that body to the mouthpieces of auloi, but rather to liken the mouthpieces to that body.",
        greek: "ἔοικε μὲν οὖν αὐλοῦ γλώττῃ, μάλιστα κάτωθέν τε καὶ ἄνωθεν αὐτὸ θεωμένῳ. λέγω δὲ κάτωθεν μὲν, ἵνα συνάπτουσιν ἀλλήλοις ἥ τ' ἀρτηρία καὶ ὁ λάρυγξ· ἄνωθεν δὲ, κατὰ τὸ στόμα τὸ γεννώμενον ὑπὸ τῶν ταύτῃ περάτων τοῦ τε ἀρυταινοειδοῦς χόνδρου καὶ τοῦ θυρεοειδοῦς. ἄμεινον δ' ἦν ἄρα μὴ τοῦτο τὸ σῶμα ταῖς τῶν αὐλῶν γλώτταις εἰκάζειν, ἀλλ' ἐκείνας τῷδε.",
        media: "image",
        mediaUrl: "reference/glottis_illustration(1).png",
        reference: "Gal. UP. 7. 13. 407-8. 26-18 Helmreich = 3. 561 Kühn"
    },
    {
        id: "analysis_nature_craft",
        title: "3. Nature vs. Craft",
        content: "For I think nature is prior in time and wiser in actions than the 'craft'. Therefore, this body (glōttis) is a deed of nature, and that which in the aulos is an invention of skill, that (the invention) would be an imitation of it (the body), invented by a wise man who is able to understand and imitate the deeds of nature. Well, the aulos is useless without its mouthpiece; the evidence proves that. There is no need to yearn to hear the reason in this work, for it was said in the treatise On the Voice, where it was straightforwardly demonstrated that it is not possible to generate a voice without the narrowing of the passage.",
        greek: "καὶ γὰρ καὶ πρότερον, οἶμαι, τῷ χρόνῳ καὶ σοφώτερον τοῖς ἔργοις ἡ φύσις τῆς τέχνης ἐστίν. ὥστ', εἴπερ τουτὶ μὲν τὸ σῶμα φύσεως ἔργον ὑπάρχει, τέχνης δ'εὕρημά ἐστι τὸ κατὰ τοὺς αὐλοὺς, ἐκεῖνο τούτου μίμημα ἂν εἴη, πρὸς ἀνδρὸς εὑρημένον σοφοῦ, γνωρίζειν τε καὶ μιμεῖσθαι τὰ τῆς φύσεως ἔργα δυναμένου. ὅτι μὲν οὖν χωρὶς τῆς γλώττης ἄχρηστος ὁ αὐλὸς, αὐτὸ δείκνυσι τὸ φαινόμενον. αἰτίαν δ' οὐ χρὴ ποθεῖν ἀκούειν ἐν τῷ παρόντι λόγῳ. λέλεκται γὰρ ἐν τῇ περὶ φωνῆς πραγματείᾳ, καθ' ἣν καὶ τοῦτο εὐθὺς ἀποδέδεικται, τὸ μὴ δύνασθαι γενέσθαι φωνὴν ἄνευ τοῦ στενωθῆναι τὴν διέξοδον.",
        media: "image",
        mediaUrl: "reference/glottis_illustration(1).png",
        reference: "Gal. UP. 7. 13. 408. 7-18 Helmreich = 561 Kühn"
    },
    {
        id: "analysis_narrowing",
        title: "4. Necessity of Narrowing",
        content: "For if only the whole passage would entirely fall back, while the first two cartilages (thyroid and cricoid) are loosed and separated from each other, and the third (arytenoid) lied open, lest ever it would be possible to produce voice: but if the pneuma would be carried with no motion outside, a soundless expiration will be achieved: but if the pneuma would be carried at once and vehemently, what is called \"to sigh\" will be produced. In order that the animal would phonate, it requires a sudden carrying (of pneuma) from all of the parts below, and it requires no less of that and the passage in the larynx to be narrow and not simply narrow, but it is led gradually from the wide to the narrow part, and gradually it is widens again back from the narrow part. That is exactly how that body in our current discussion works, which indeed I name glōttis and the tongue of the larynx.",
        greek: "εἰ γὰρ ἀναπεπταμένη τελέως εἴη σύμπασα, κεχαλασμένων μὲν τῶν πρώτων δυοῖν χόνδρων καὶ διεστώτων ἀπ' ἀλλήλων, ἀνεῳγμένου δὲ τοῦ τρίτου, μή ποτ' ἂν δύνασθαι γενέσθαι φωνήν· ἀλλ' εἰ μὲν ἀτρέμα τὸ πνεῦμα ἔξω φέροιτο, τὴν χωρὶς ψόφου συντελουμένην ἐκπνοήν· εἰ δ' ἀθρόως τε καὶ σφοδρῶς, τὸ καλούμενον στενάζειν γιγνόμενον. ἵνα δὲ φωνήσῃ τὸ ζῶον, δεῖσθαι πάντως καὶ τῆς κάτωθεν φορᾶς ἀθροωτέρας, δεῖσθαι δ' οὐδὲν ἧττον ταύτης καὶ τῆς κατὰ τὸν λάρυγγα διεξόδου στενωτέρας, καὶ οὐχ ἁπλῶς γε στενωτέρας, ἀλλὰ κατὰ βραχὺ μὲν ἐξ εὐρέος εἰς στενὸν ἀγομένης, κατὰ βραχὺ δ' ἐκ τοῦ στενοῦ πάλιν εὐρυνομένης. ὅπερ ἀκριβῶς ἐργάζεται τουτὶ τὸ σῶμα τὸ προκείμενον ἐν τῷ λόγῳ νῦν, ὃ δὴ γλωττίδα τε καὶ γλῶσσαν ὀνομάζω λάρυγγος.",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        reference: "Gal. UP. 7. 13. 408-409. 18-7 Helmreich = 3. 561-562 Kühn"
    },
    {
        id: "analysis_muscles",
        title: "5. Muscles and Glottis",
        content: "For the muscles confining the arytenoid cartilage forcibly holding out against the pushed pneuma, to that function the nature of the aforesaid glōttis significantly contributes. For the parts of the glōttis, both the left and the right [the vocal folds and vestibular folds], come to it, so that they fall together to each other and accurately shut the passage [rima glottidis].",
        greek: "ἀντέχουσι γὰρ οὗτοι βιαίως ὠθουμένῳ τῷ πνεύματι τὸν ἀρυταινοειδῆ κλείοντες χόνδρον. εἰς ὅπερ ἔργον οὐ σμικρὰ συντελεῖ τῆς προειρημένης γλωττίδος ἡ φύσις. εἰς ταὐτὸν γὰρ αὐτῆς ἔρχεται τὰ μόρια, τό τ' ἐκ τῶν ἀριστερῶν καὶ τὸ τῶν δεξιῶν, ὡς συμπεσεῖν ἀλλήλοις ἀκριβῶς καὶ κλείεσθαι τὸν πόρον.",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        reference: "Gal. UP. 7. 13. 409. 15-21 Helmreich = 3. 563 Kühn"
    },
    {
        id: "analysis_cavities",
        title: "6. Apertures and Cavities",
        content: "And if some small unshut (passage) would be left, and especially in the animals where the whole larynx is wider, as such case was shown in the larger-voiced animals, that unguarded aperture is not disregarded by nature, placing under each part of the glōttis a considerable inner cavity in the aperture. whenever the air makes use of the broad ways as it enters and exits the body back and forth, none of it is pushed aside into the cavity: but since the passage is blocked and confined the air is thrusted vehemently toward the flanks and opens the small mouth of the glōttis, which until then was closed by the folding of the lips. For that very thing, that is of the folding, is the reason that aperture, discussed in this treatise, escaped the notice of all of the previous anatomists. Having the cavities in the tongue of the larynx filled with pneuma, air is poured off presumably in the necessary mass to that passage of the pneuma, and narrow it exactly, as if they opened it by little before. That skill of nature came into high accuracy regarding the tongue of the larynx in all its structure and in size and arrangement and in the apertures and cavities.",
        greek: "εἰ δ' ἔτι σμικρὸν ἄκλειστον ὑπολειφθείη, καὶ μάλιστα ἐν οἷς ζώοις εὐρύτερός ἐστιν ὁ σύμπας λάρυγξ, (ἐδείχθη δὲ τοιοῦτος ἐν τοῖς μεγαλοφώνοις ὑπάρχων,) οὐδὲ τοῦτο ἀπρονόητον παρῶπται τῇ φύσει, τρῆμα καθ' ἑκάτερον μέρος τῆς γλωττίδος ἓν ἐργασαμένη, ὑποθείσῃ δὲ τῷ τρήματι κοιλίαν ἔνδον οὐ σμικράν. εἰς ἣν, ἐπειδὰν μὲν εὐρείαις ὁδοῖς ὁ ἀὴρ χρώμενος εἰσίῃ τε εἰς τὸ ζῶον καὶ ἐξίῃ αὖθις, οὐδὲν παρωθεῖται· φραχθείσης δὲ τῆς διεξόδου, στενοχωρούμενος ὠθεῖταί τε βιαίως πρὸς τὰ πλάγια καὶ τὸ τῆς γλωττίδος ἀνοίγνυσι στόμιον, ὃ τέως ἐκέκλειστο, τῶν χειλῶν ἐπεπτυγμένων. αὐτὸ γάρ τοι τοῦτο (τοῦτ' ἔστι τὸ τῆς ἐπιπτύξεως) αἴτιον τοῦ λαθεῖν ἅπαντας τοὺς ἔμπροσθεν ἀνατομικοὺς τὸ προκείμενον ἐν τῷ λόγῳ τρῆμα. πληρωθεισῶν δὲ πνεύματος τῶν ἐν τῇ γλώττῃ τοῦ λάρυγγος κοιλιῶν, ἀποχεῖσθαι μὲν δήπου τὸν ὄγκον ἀναγκαῖον εἰς αὐτὸν τοῦ πνεύματος τὸν πόρον, ἀκριβῶς δὲ στενοῦσθαι, κᾂν εἰς μικρόν τι πρόσθεν ἀνέῳκτο. αὕτη μὲν ἡ περὶ τὴν γλῶτταν τοῦ λάρυγγος τέχνη τῆς φύσεως ἔν τε τῷ σύμπαντι σχήματι καὶ τῷ μεγέθει καὶ τῇ θέσει καὶ τοῖς τρήμασι καὶ ταῖς κοιλίαις εἰς ἄκρον ἀκριβείας ἥκουσα.",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        reference: "Gal. UP. 7. 13. 409-410. 21-16 Helmreich = 3. 563-564 Kühn"
    },
    {
        id: "analysis_utility",
        title: "7. Utility and Size",
        content: "Well if you will have in mind it (the tongue of the larynx) having been made bigger, you will block the ways of the pneuma, as it is accustomed to block them in inflammations. And having been made smaller, it will be more deficient of the right size and the animal act entirely mute: having lost only a little of such part the animal act as small-voiced and bad-voiced, in such way that it [the tongue of the larynx] lacks its proper size. And so shall you alter its position, or the size of the aperture or the cavity, you will destroy the whole utility.",
        greek: "μείζονα γοῦν αὐτὴν εἴπερ ἐπινοήσαις γεγενημένην, ἀποφράξεις τὰς ὁδοὺς τοῦ πνεύματος, ὡς κἀν ταῖς φλεγμοναῖς ἀποφράττειν εἴωθεν. ἐλάττων δ' αὖ γενηθεῖσα, πολὺ μὲν ἐνδέουσα τοῦ μετρίου παντάπασιν ἄφωνον ἐργάζεται τὸ ζῷον· ὀλίγῳ δ' ἀπολειφθεῖσα μέρει τοσούτῳ μικροφωνότερόν τε καὶ κακοφωνότερον, ὅσῳπερ ἂν αὐτὴ λείπηται τοῦ συμμέτρου. οὕτω δὲ κἂν τὴν θέσιν αὐτῆς μετακινή- σῃς, ἢ τὸ μέγεθος τοῦ τρήματος ἢ τῆς κοιλίας ἀναιρήσεις ‖ τὴν ὅλην χρείαν.",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        reference: "Gal. UP. 7. 13. 410. 16-25 Helmreich = 3. 564-565 Kühn"
    },
    {
        id: "analysis_whirlpool",
        title: "8. The Whirlpool (Iliggos)",
        content: "Indeed, immediately along each aperture, as said, there is a part that is elongated from above downwards, as some narrow line, and yet it is not really narrow: but the membranous substance of the lips is as it is falling into the underlying concavity, and through that it seems more as a wrinkle rather than aperture before the lips unfold. And when they unfold it (the wrinkle) is immediately clearly observed, and clearly the underlying cavity to it. And being each of the apertures from the left and the right as such, some pneuma flows beside them with no reason to open the little-mouth or the filled cavity. Whenever it is pushed vehemently from below, and restrained from above, inasmuch as no more force to go straightforward, as some whirlpool experience, spinning toward the flanks of the passage, falling into them vehemently and arousing easily the membranous growths of each of the passages to the underlying concavities, to those which they incline by nature, filling and blowing through the entire glōttis.",
        greek: "αὐτίκα γέ τοι τὸ τρῆμα καθ' ἑκάτερον, ὡς εἴρηται, μέρος ὑπάρχει, πρόμηκες δ' ἐστὶν ἄνωθεν κάτω, καθάπερ τις γραμμὴ στενή, καίτοι γ' οὐκ ὂν στενόν, ἀλλὰ τὸ τῶν χειλῶν ὑμενῶδες οἷόνπερ καταπῖπτον ἐστὶν εἰς τὴν ὑποκειμένην κοιλότητα, καὶ διὰ τοῦτο καθάπερ ῥυσότης μᾶλλον ἢ τρῆμα φαίνεται πρὶν διαπτυχθῆναι τὰ χείλη. διαπτυχθέντων δὲ σαφῶς μὲν ἤδη καὶ τοῦτο, σαφῶς δὲ καὶ ἡ ὑποκειμένη κοιλότης αὐτῷ θεωρεῖται. τοιούτου δ' ὄντος ἑκατέρου τοῦ τρήματος ἐξ ἀριστερῶν τε καὶ δεξιῶν παραρρεῖ τι πνεῦμα μηδεμίαν αἰτίαν ἔχον δεξιῶν παραρρεῖ τι πνεῦμα μηδεμίαν αἰτίαν ἔχον ἀνοιγνύναι τὸ στόμιον ἢ πληροῦν τὴν κοιλίαν. ὅταν δ' ὠθῆται μὲν κάτωθεν βιαίως, ἴσχηται δ' ἄνωθεν, ἅτε μηκέτι δυνάμενον εὐθυπορεῖν, οἷον ἴλιγγόν τινα παθὸν ἐπιστρέφεταί τε πρὸς τὰ πλάγια τοῦ πόρου καὶ τούτοις ἐμπίπτει βιαίως ἀνατρέπει τε ῥᾳδίως τὰς ὑμενώδεις ἐπιφύσεις ἑκατέρου τῶν πόρων εἰς τὰς ὑποκειμένας κοιλότητας, εἰς ἅσπερ καὶ ῥέπουσι φύσει, πληροῖ τ' αὖ καὶ διαφυσᾷ ‖ σύμπασαν τὴν γλωττίδα.",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        reference: "Gal. UP. 7. 13. 410-411. 25-17 Helmreich = 3. 565-566 Kühn"
    },
    {
        id: "analysis_protection",
        title: "9. Protection Against Breaking",
        content: "Since that, it is followed by necessity that the passage is blocked precisely. And that body of the glōttis was made of a membranous material not to break from being filled with pneuma and not at the time when the whole larynx widens and not when it contracts, obeying the opposing conditions of it (of the larynx), ever reaching the danger of breaking.",
        greek: "τούτῳ δ' ἐξ ἀνάγκης ἕπεται φράττεσθαι τὸν πόρον ἀκριβῶς. αὐτὸ δὲ τὸ σῶμα τῆς γλωττίδος ὑμενῶδες μὲν ἐγένετο πρὸς τὸ μήτε πληρούμενον ὑπὸ τοῦ πνεύματος ῥήγνσθαι μήτ' ἐν τῷ ποτὲ μὲν εὐρύνεσθαι, ποτὲ δὲ συστέλλεσθαι τὸν ὅλον λάρυγγα, ταῖς ἐναντίαις αὐτοῦ καταστάσεσιν ἑπόμενον, εἰς κίνδυνον ἀφικέσθαι ποτὲ ῥήξεως·",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        reference: "Gal. UP. 7. 13. 411. 17-24 Helmreich = 3. 566 Kühn"
    },
    {
        id: "analysis_moisture",
        title: "10. The Necessity of Moisture",
        content: "and it is not simply moist, but with sticky and fatty liquid, in order to moisten by all fitting moist and not, as in the tongues of the auloi, that dry up continuously, requiring some additional liquid, and that becomes in need of external remedies. For the delicate and watery liquid being quickly dismissed into vapours, disperse and flow off easily straightway and much whenever the passage is inclined: and the sticky and fatty liquid suffices for much time and it does not readily flow off and not dry out. Therefore, if nature devised all other things in the structure of the larynx admirably, neglecting only the liquid of such sort, our voice would be corrupted because of quick dryness of the glōttis as well as all of the laryngeal structures, as now it is used to be rarely when the administration of nature is conquered by violent circumstances. For in burning fevers people cannot utter without wetting the larynx, and similarly in those that walked through the violent heat.",
        greek: "ὑγρὸν δ' οὐχ ἁπλῶς, ἀλλὰ σὺν τῷ γλίσχρον τέ πως εἶναι καὶ λιπαρόν, ἵν' ἐπιτέγγηται διὰ παντὸς οἰκείᾳ νοτίδι καὶ μή, καθάπερ αἱ τῶν αὐλῶν γλῶτται ξηραινόμεναι συνεχῶς ἐπικτήτου τινὸς ὑγρότητος δέονται, καὶ αὐτὸ τῶν ἔξωθεν ἰαμάτων ἐπιδεὲς γίγνηται. τὸ μὲν γὰρ λεπτὸν καὶ ὑδατῶδες ὑγρὸν εἰς ἀτμοὺς τὸ μὲν γὰρ λεπτὸν καὶ ὑδατῶδες ὑγρὸν εἰς ἀτμοὺς διαλυόμενον ἐν τάχει διαφορεῖται ῥᾳδίως ἀπορρεῖ τε παραχρῆμα καὶ μάλισθ' ὅταν ᾖ κατάντης ὁ πόρος· τὸ δὲ γλίσχρον ἅμα καὶ λιπαρὸν ἐξαρκεῖ χρόνῳ παμπόλλῳ μήτ' ἀπορρέον ἑτοίμως μήτε ξηραινόμενον. ὥστ', εἴπερ καὶ τἄλλα πάνθ' ἡ φύσις ἐν τῇ τοῦ λάρυγγος κατα- σκευῇ θαυμαστῶς ἐτεχνήσατο, μόνης δὲ τῆς τοιαύτης ὑγρότητος ἐπελάθετο, διεφθείρετ' ἂν ‖ ἡμῶν ἡ φωνὴ διὰ ταχέων ξηραινομένης τῆς γλωττίδος ἅμα τοῖς κατὰ τὸν λάρυγγα σύμπασιν, ὥσπερ νῦν εἴωθε γίγνεσθαι σπανιάκις ὑπὸ βιαίων αἰτίων νικωμένης τῆς φυσικῆς διοικήσεως. ἔν τε γὰρ τοῖς περικαέσι πυρετοῖς οὐ δύνανται φθέγγεσθαι πρὶν διαβρέξαι τὸν λάρυγγα, καὶ ὅσοι διὰ καύματος ὡδοιπόρησαν σφοδροῦ.",
        media: "video",
        mediaUrl: "reference/glottis animation.mp4",
        reference: "Gal. UP. 7. 13. 411-412. 25-14 Helmreich = 3. 566 Kühn"
    }
];
