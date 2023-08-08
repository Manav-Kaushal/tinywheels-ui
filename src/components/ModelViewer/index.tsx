import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type ModelViewerProps = {
  modelPath: string;
  centerCamera?: boolean;
  noBackground?: false;
};

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelPath,
  centerCamera,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  // const addMeshShadow = (children: any): void => {
  //   children.map((child: any): void => {
  //     if (child.type === "Group") {
  //       if (child.children && child.children.length !== 0) {
  //         addMeshShadow(child.children);
  //       }
  //     }
  //     if (child.type === "Mesh") {
  //       child.castShadow = true;
  //     }
  //   });
  // };

  useEffect(() => {
    if (containerRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        25,
        containerRef.current.offsetWidth / containerRef.current.offsetHeight,
        0.1,
        1000
      );
      camera.position.set(2, 1, 5);

      // Create a renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // Create directional light
      // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      // directionalLight.position.set(1, 1, 1);
      // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
      // directionalLight2.position.set(1, -5, -5); // Change to directionalLight2.position.set(-1, -1, -1);
      // scene.add(directionalLight);
      // scene.add(directionalLight2);

      // Create point light
      // const pointLight = new THREE.PointLight(0x0000ff, 1); // Change intensity to 1 for better lighting
      // pointLight.position.set(5, 5, 10); // Adjust position for better coverage
      // pointLight.castShadow = true;
      // pointLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
      // pointLight.decay = 2;
      // const pointLight2 = new THREE.PointLight(0x0000ff, 1); // Change intensity to 1 for better lighting
      // pointLight2.position.set(-5, 5, -10); // Adjust position for better coverage
      // pointLight2.decay = 2;
      // scene.add(pointLight);
      // scene.add(pointLight2);

      // Hemisphere Light
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
      scene.add(hemisphereLight);

      // Directional Lights
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight1.position.set(5, 10, 5);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight2.position.set(-5, -10, -5);
      scene.add(directionalLight2);

      const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight3.position.set(10, -5, 5);
      scene.add(directionalLight3);

      // Point Lights
      const pointLight1 = new THREE.PointLight(0xffffff, 1);
      pointLight1.position.set(0, 3, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffffff, 1);
      pointLight2.position.set(3, 3, -3);
      scene.add(pointLight2);

      // Additional Point Lights
      const pointLight3 = new THREE.PointLight(0xffffff, 1);
      pointLight3.position.set(-3, 3, 3);
      scene.add(pointLight3);

      const pointLight4 = new THREE.PointLight(0xffffff, 1);
      pointLight4.position.set(0, -3, -3);
      scene.add(pointLight4);

      // Add orbit controls
      const controls = new OrbitControls(camera, containerRef.current);
      controls.minDistance = 0.1;
      controls.maxDistance = 50;
      controls.enableZoom = false;
      controls.enableRotate = true;
      controls.enableDamping = true;
      controls.maxZoom = 2;
      controls.minZoom = 1;

      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf: any) => {
          const model = gltf.scene;

          // Scale the model to fit the renderer's width and height
          const box = new THREE.Box3().setFromObject(model);
          const boxSize = box.getSize(new THREE.Vector3()).length();
          const boxCenter = box.getCenter(new THREE.Vector3());
          model.scale.multiplyScalar(2 / boxSize);
          model.position.sub(boxCenter.multiplyScalar(2 / boxSize));

          scene.add(model);
        },
        (event: ProgressEvent<EventTarget>) => {
          const loaded = event.loaded || 0;
          const total = event.total || 0;
          const progress = (loaded / total) * 100;
          setLoadingProgress(progress);
        },
        (error: any) => {
          console.error("Error loading GLB model:", error);
        }
      );

      // const AxesHelper = new THREE.AxesHelper();
      // scene.add(AxesHelper);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [modelPath]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", aspectRatio: 1 }}
    >
      {loadingProgress < 100 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            background: "rgba(0, 0, 0, 0.7)",
            padding: "4px",
            borderRadius: "4px",
            color: "#fff",
          }}
        >
          {loadingProgress.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
