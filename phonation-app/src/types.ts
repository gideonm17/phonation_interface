// Basic vector type for 3D coords
export type Vector3Array = [number, number, number];

export interface NarrativeStep {
    id: string;
    title: string;
    content: string; // Markdown supported

    // Simulation State Targets for this step
    state: {
        cameraPosition: Vector3Array;
        cameraTarget: Vector3Array;
        glottisWidth: number;
        activeMuscles: string[];
        airflowIntensity: number;
        highlightedParts: string[];
        analogy: 'none' | 'aulos' | 'plectrum';
    };
}
