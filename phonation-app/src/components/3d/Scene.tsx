import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store';
import { LarynxModel } from './LarynxModel';
import { Airflow } from './Airflow';

export const Scene = () => {
    const { simulation } = useAppStore();
    const controlsRef = useRef<any>(null);
    const vec = new THREE.Vector3();

    // Smooth camera movement
    useFrame((state, delta) => {
        if (controlsRef.current) {
            const [tx, ty, tz] = simulation.cameraTarget;
            // Interpolate target
            vec.set(tx, ty, tz);
            controlsRef.current.target.lerp(vec, delta * 2);

            // We don't forcefully override position here to allow user interaction,
            // but in a strict linear mode we might. For now, rely on initial props or separate camera rig.
            controlsRef.current.update();
        }
    });

    return (
        <>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <Environment preset="city" />

            <group position={[0, -1, 0]}>
                <LarynxModel />
                <Airflow />
                <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
            </group>

            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
            />
        </>
    );
};
