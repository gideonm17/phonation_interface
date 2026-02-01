import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store';

const PARTICLE_COUNT = 200;

export const Airflow = () => {
    const { simulation } = useAppStore();
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Initialize particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * 1.5;
            const y = Math.random() * 5 - 2; // Start from bottom (-2) to top (3)
            const z = (Math.random() - 0.5) * 1.5;
            const speed = Math.random() * 0.05 + 0.02;
            temp.push({ x, y, z, speed, offset: Math.random() * 100 });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Determine speed multiplier based on intensity
        // Ekphysis (intensity > 0.5) is much faster
        const speedMult = simulation.airflowIntensity > 0 ? (simulation.airflowIntensity * 4) : 0.5;
        const isEkphysis = simulation.airflowIntensity > 0.6;

        particles.forEach((particle, i) => {
            // Update Y position
            particle.y += particle.speed * speedMult * (delta * 60);

            // Loop around
            if (particle.y > 4) {
                particle.y = -2;
                particle.x = (Math.random() - 0.5) * (1.5 * (1 - simulation.glottisWidth * 0.5)); // Constrain if glottis is narrow
                particle.z = (Math.random() - 0.5) * 1.5;
            }

            dummy.position.set(particle.x, particle.y, particle.z);

            // Scale based on "force"
            const scale = isEkphysis ? 0.08 : 0.05;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;

        // Update color: Blue for Ekpno (breath), Red for Ekphysis (Forceful)
        // We can't easily change individual instance colors without an attribute buffer, 
        // so we'll just change the material color for now.
        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
            const targetColor = isEkphysis ? new THREE.Color("#ff3333") : new THREE.Color("#88ccff");
            meshRef.current.material.color.lerp(targetColor, delta * 2);
            meshRef.current.material.emissive.lerp(targetColor, delta * 2);
            meshRef.current.material.emissiveIntensity = isEkphysis ? 0.8 : 0.2;
        }
    });

    // Only visible if there is some airflow
    if (simulation.airflowIntensity <= 0.01) return null;

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial transparent opacity={0.6} />
        </instancedMesh>
    );
};
