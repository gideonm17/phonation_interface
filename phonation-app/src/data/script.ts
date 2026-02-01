import { NarrativeStep } from '../types';

export const SCRIPT: NarrativeStep[] = [
    {
        id: "intro",
        title: "Peri Phōnēs: The Instrument",
        content: `
# The Galenic Phonatory System

> "Voice is the foremost vehicle of thought... a vivid and living bridge between the soul and the world beyond."

Welcome to the interactive reconstruction of Galen's theory of voice production (*Phonation*). 
Navigate through this interface to explore how the *Instrument* (the Larynx) transforms the *Material* (Breath) into *Voice*.
    `,
        state: {
            cameraPosition: [0, 2, 5],
            cameraTarget: [0, 0, 0],
            glottisWidth: 0.5,
            activeMuscles: [],
            airflowIntensity: 0,
            highlightedParts: [],
            analogy: 'none'
        }
    },
    {
        id: "framework",
        title: "1. The Framework",
        content: `
The organs of phonation lie within a supportive framework. 

Beneath the superficial **Muscular Carpet**, the **Thyroid Cartilage** (Shield-like) and **Cricoid Cartilage** (Ring-like) form the rigid architecture of the larynx.

These cartilages provide the hardness necessary to strike the air.
    `,
        state: {
            cameraPosition: [2, 1, 3],
            cameraTarget: [0, 0.5, 0],
            glottisWidth: 0.5,
            activeMuscles: [],
            airflowIntensity: 0,
            highlightedParts: ['cartilage_thyroid', 'cartilage_cricoid'],
            analogy: 'none'
        }
    },
    {
        id: "muscles",
        title: "2. The Power",
        content: `
Galen identified **12 Special Muscles** intrinsic to the larynx.

Most crucial are the **Thyroarytenoid Muscles**, which arise from the thyroid and insert into the arytenoids. Galen considers them the "most important for voice production" as they close the *Glottis*.
    `,
        state: {
            cameraPosition: [0, 3, 2],
            cameraTarget: [0, 1, 0],
            glottisWidth: 0.5,
            activeMuscles: ['muscle_thyroarytenoid'],
            airflowIntensity: 0,
            highlightedParts: ['muscle_thyroarytenoid'],
            analogy: 'none'
        }
    },
    {
        id: "glottis_anatomy",
        title: "3. The Glottis (A Certain Body)",
        content: `
In the inner cavity lies a *Certain Body* (*ti sōma*): the **Glottis**.

> "It resembles the mouthpiece of an Aulos..."

It is composed of two membranous lips that meet to close the passage. It acts as a valve to regulate the flow of *Pneuma*.
    `,
        state: {
            cameraPosition: [0, 4, 1], // Top-down view
            cameraTarget: [0, 0, 0],
            glottisWidth: 0.5,
            activeMuscles: [],
            airflowIntensity: 0.1,
            highlightedParts: ['glottis'],
            analogy: 'aulos'
        }
    },
    {
        id: "ekphysis",
        title: "4. Ekphysis (Forceful Exhalation)",
        content: `
Regular breathing (*Ekpno*) is insufficient for voice. Phonation requires **Ekphysis**: a forceful, active exhalation driven by the thoracic muscles.

This provides the *Suitable Material* (*Hylē Oikeia*) for voice.
    `,
        state: {
            cameraPosition: [0, 0, 6],
            cameraTarget: [0, -2, 0],
            glottisWidth: 1.0, // Open for breath
            activeMuscles: [],
            airflowIntensity: 0.8, // Forceful but wide stream
            highlightedParts: ['trachea'],
            analogy: 'none'
        }
    },
    {
        id: "narrowing",
        title: "5. Narrowing the Passage",
        content: `
As *Ekphysis* rises, the **Thyroarytenoid Muscles** contract, pulling the Arytenoid cartilages together.

This **Narrowing** (*Stenōsis*) is critical. It accelerates the air, increasing its force (*Rōmē*) just before impact.
    `,
        state: {
            cameraPosition: [0, 3, 3],
            cameraTarget: [0, 1, 0],
            glottisWidth: 0.1, // NARROWED
            activeMuscles: ['muscle_thyroarytenoid', 'muscle_lateral_cricoarytenoid'],
            airflowIntensity: 1.0, // Fast stream
            highlightedParts: ['glottis', 'muscle_thyroarytenoid'],
            analogy: 'none'
        }
    },
    {
        id: "strike",
        title: "6. The Strike (Plēgē)",
        content: `
**Voice emerges here.**

The accelerated air strikes the cartilages. 
> "...comparable to a plectrum striking a string."

The cartilages resonate, transforming the silent breath into audible Voice.
    `,
        state: {
            cameraPosition: [1, 2, 2],
            cameraTarget: [0, 1, 0],
            glottisWidth: 0.05, // Almost closed/vibrating
            activeMuscles: ['muscle_thyroarytenoid'],
            airflowIntensity: 1.0,
            highlightedParts: ['cartilage_thyroid', 'cartilage_arytenoid'],
            analogy: 'plectrum'
        }
    }
];
