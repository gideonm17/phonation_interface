import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../../store';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

// Helper for "Bone" material
const BoneMaterial = ({ highlighted }: { highlighted: boolean }) => (
    <meshStandardMaterial
        color={highlighted ? "#ffebd0" : "#e0e0e0"}
        roughness={0.5}
        metalness={0.1}
        emissive={highlighted ? "#4a4a4a" : "#000000"}
        emissiveIntensity={0.2}
    />
);

// Helper for "Muscle" material
const MuscleMaterial = ({ active, highlighted }: { active: boolean, highlighted: boolean }) => (
    <meshStandardMaterial
        color={active ? "#ff0000" : "#8b4513"}
        transparent
        opacity={0.8}
        emissive={active ? "#ff0000" : "#000000"}
        emissiveIntensity={active ? 0.5 : 0}
    />
);

export const LarynxModel = () => {
    const { simulation, setHighlight } = useAppStore();

    // Calculate arytenoid position based on glottisWidth
    // glottisWidth 1 = Open, 0 = Closed
    const arytenoidRefRight = useRef<THREE.Group>(null);
    const arytenoidRefLeft = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        // Lerp arytenoid rotation/position
        const targetRot = (1 - simulation.glottisWidth) * 0.5; // Rotate inward
        const targetPos = (1 - simulation.glottisWidth) * 0.6; // Move inward

        if (arytenoidRefRight.current && arytenoidRefLeft.current) {
            // Simple linear interpolation for demonstration
            arytenoidRefRight.current.position.x = THREE.MathUtils.lerp(arytenoidRefRight.current.position.x, 0.8 - targetPos, delta * 5);
            arytenoidRefLeft.current.position.x = THREE.MathUtils.lerp(arytenoidRefLeft.current.position.x, -0.8 + targetPos, delta * 5);
        }
    });

    const isHighlighted = (id: string) => simulation.highlightedParts.includes(id) || simulation.activeMuscles.includes(id);

    return (
        <group>
            {/* --- CRICOID CARTILAGE (Ring) --- */}
            {/* Base ring */}
            <mesh position={[0, 0, 0]} onClick={(e) => { e.stopPropagation(); setHighlight('cartilage_cricoid'); }}>
                <torusGeometry args={[1.2, 0.4, 16, 32]} />
                <BoneMaterial highlighted={isHighlighted('cartilage_cricoid')} />
            </mesh>
            {/* Signet part (back) */}
            <mesh position={[0, 0.5, -1.2]} rotation={[0.2, 0, 0]} onClick={(e) => { e.stopPropagation(); setHighlight('cartilage_cricoid'); }}>
                <boxGeometry args={[1.5, 1.5, 0.5]} />
                <BoneMaterial highlighted={isHighlighted('cartilage_cricoid')} />
            </mesh>

            {/* --- THYROID CARTILAGE (Shield) --- */}
            <group position={[0, 1.2, 0.5]}>
                {/* Left Plate */}
                <mesh position={[-1.2, 0, 0]} rotation={[0, -0.5, 0]} onClick={(e) => { e.stopPropagation(); setHighlight('cartilage_thyroid'); }}>
                    <boxGeometry args={[0.2, 2.5, 2.5]} />
                    <BoneMaterial highlighted={isHighlighted('cartilage_thyroid')} />
                </mesh>
                {/* Right Plate */}
                <mesh position={[1.2, 0, 0]} rotation={[0, 0.5, 0]} onClick={(e) => { e.stopPropagation(); setHighlight('cartilage_thyroid'); }}>
                    <boxGeometry args={[0.2, 2.5, 2.5]} />
                    <BoneMaterial highlighted={isHighlighted('cartilage_thyroid')} />
                </mesh>
                <Html position={[1.5, 1, 0]} className={isHighlighted('cartilage_thyroid') ? 'block' : 'hidden'}>
                    <div className="bg-black/80 text-white p-2 text-xs rounded pointer-events-none whitespace-nowrap">
                        Thyroid Cartilage
                    </div>
                </Html>
            </group>

            {/* --- ARYTENOID CARTILAGES (Pyramids) --- */}
            {/* These move based on simulation state */}
            <group ref={arytenoidRefRight} position={[0.8, 1.3, -1.0]}>
                <mesh rotation={[0, 0, 0]}>
                    <coneGeometry args={[0.4, 1.2, 4]} />
                    <BoneMaterial highlighted={isHighlighted('cartilage_arytenoid')} />
                </mesh>
                {/* Vocal Process / Glottal Lip attachment */}
                <mesh position={[0, -0.5, 0.5]} rotation={[1.5, 0, 0]}>
                    <capsuleGeometry args={[0.1, 1, 4]} />
                    <meshStandardMaterial color="#ffaaaa" /> {/* The "Membranous" Vocal Fold */}
                </mesh>
            </group>

            <group ref={arytenoidRefLeft} position={[-0.8, 1.3, -1.0]}>
                <mesh rotation={[0, 0, 0]}>
                    <coneGeometry args={[0.4, 1.2, 4]} />
                    <BoneMaterial highlighted={isHighlighted('cartilage_arytenoid')} />
                </mesh>
                {/* Vocal Process / Glottal Lip attachment */}
                <mesh position={[0, -0.5, 0.5]} rotation={[1.5, 0, 0]}>
                    <capsuleGeometry args={[0.1, 1, 4]} />
                    <meshStandardMaterial color="#ffaaaa" /> {/* The "Membranous" Vocal Fold */}
                </mesh>
            </group>

            {/* --- MUSCLES --- */}
            {/* Thyroarytenoid (Connecting Thyroid to Arytenoid) */}
            {/* Simplified visualization: A line/tube connecting the two */}
            <mesh position={[0, 1.0, 0.5]} rotation={[1.57, 0, 0]} visible={isHighlighted('muscle_thyroarytenoid')}>
                <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
                <MuscleMaterial active={simulation.activeMuscles.includes('muscle_thyroarytenoid')} highlighted={true} />
            </mesh>

        </group>
    );
};
