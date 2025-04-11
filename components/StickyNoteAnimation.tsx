"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// Main container component
export default function StickyNoteAnimation() {
  // State to track the currently active note (the one being dragged)
  const [activeNoteId, setActiveNoteId] = useState(null);

  // Mouse position and drag state management for the entire scene
  const mousePosition = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartX = useRef(0);

  // Track if we've already selected a note for this drag operation
  const hasSelectedNote = useRef(false);

  // Example data for multiple notes with different colors and text
  const [notesData, setNotesData] = useState([
    {
      id: 1,
      color: [255, 204, 51], // Yellow
      text: "Complete project by Friday",
      offset: { x: 0, y: 0 },
      zIndex: 1, // Yellow note is now the bottom-most
      removed: false,
      falling: false,
    },
    {
      id: 2,
      color: [102, 204, 255], // Light blue
      text: "Call Mom about weekend plans",
      offset: { x: 0.3, y: -0.2 },
      zIndex: 2,
      removed: false,
      falling: false,
    },
    {
      id: 3,
      color: [255, 153, 204], // Pink
      text: "Buy groceries:\n- Milk\n- Bread\n- Eggs",
      offset: { x: 0.6, y: -0.4 },
      zIndex: 3,
      removed: false,
      falling: false,
    },
    {
      id: 4,
      color: [153, 255, 153], // Light green
      text: "Schedule dentist appointment",
      offset: { x: 0.9, y: -0.6 },
      zIndex: 4,
      removed: false,
      falling: false,
    },
    {
      id: 5,
      color: [255, 179, 102], // Light orange
      text: "Prepare presentation slides",
      offset: { x: 1.2, y: -0.8 },
      zIndex: 5, // Orange note is now the top-most
      removed: false,
      falling: false,
    },
  ]);

  // Function to add a new note
  const addNewNote = () => {
    // Generate random color
    const randomColor = [
      Math.floor(Math.random() * 155) + 100,
      Math.floor(Math.random() * 155) + 100,
      Math.floor(Math.random() * 155) + 100,
    ];

    // Sample texts
    const sampleTexts = [
      "New task to complete",
      "Remember to call back",
      "Meeting at 3pm tomorrow",
      "Don't forget to smile :)",
      "Check emails before noon",
    ];

    const newNote = {
      id: Date.now(), // Unique ID based on timestamp
      color: randomColor,
      text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
      offset: { x: Math.random() * 0.5, y: -Math.random() * 0.5 },
      zIndex: Math.max(...notesData.map((note) => note.zIndex), 0) + 1, // Put on top
      removed: false,
      falling: false,
    };

    setNotesData((prevNotes) => [...prevNotes, newNote]);
  };

  // Function to mark a note as removed
  const handleNoteRemoved = (noteId) => {
    setNotesData((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, removed: true } : note
      )
    );
  };

  // Function to handle when a note starts falling
  const handleNoteFalling = (noteId) => {
    // Mark ONLY the specific note as falling in the global state
    setNotesData((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, falling: true } : note
      )
    );
    // Clear active note immediately
    setActiveNoteId(null);
  };

  // Global mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e) => {
      // Store initial position
      //e.preventDefault()
      dragStartY.current = e.clientY;
      dragStartX.current = e.clientX;
      isDragging.current = true;
      hasSelectedNote.current = false;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      hasSelectedNote.current = false;
      // Clear active note when mouse is released
      setActiveNoteId(null);
    };

    // Double click to add a new note
    const handleDoubleClick = () => {
      addNewNote();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("dblclick", handleDoubleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [notesData]);

  // Filter out removed notes and get visible ones that aren't falling
  const interactableNotes = notesData.filter(
    (note) => !note.removed && !note.falling
  );

  // Get all visible notes (including falling ones) for rendering
  const visibleNotes = notesData.filter((note) => !note.removed);

  // Find the topmost interactable note (with highest zIndex among non-falling notes)
  const topmostNoteId =
    interactableNotes.length > 0
      ? interactableNotes.reduce(
          (highest, note) => (note.zIndex > highest.zIndex ? note : highest),
          interactableNotes[0]
        ).id
      : null;

  // Sort notes by zIndex for proper rendering order
  const sortedVisibleNotes = [...visibleNotes].sort(
    (a, b) => a.zIndex - b.zIndex
  );

  return (
    <div className="absolute top-0 right-0 z-10 w-[30vw] h-[90vh]">
      <Canvas camera={{ position: [2, 0, 15], fov: 35 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, 10]} intensity={0.3} />
      <hemisphereLight intensity={0.3} groundColor="#eee" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      <group position={[0, 2.5, 0]}>  {/* Added group with Y offset */}
        <SceneContent
        visibleNotes={sortedVisibleNotes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
        mousePosition={mousePosition}
        isDragging={isDragging}
        dragStartY={dragStartY}
        dragStartX={dragStartX}
        onNoteRemoved={handleNoteRemoved}
        onNoteFalling={handleNoteFalling}
        topmostNoteId={topmostNoteId}
        hasSelectedNote={hasSelectedNote}
        />
      </group>
      </Canvas>

      {/* Instructions overlay */}
      {/* <div className="absolute bottom-4 left-4 text-sm text-gray-600 bg-white/80 p-2 rounded-md">
        <p>Drag down to peel off notes</p>
        <p>Double-click to add a new note</p>
      </div> */}
    </div>
  );
}

// Scene content component to avoid hooks-related issues
const SceneContent = ({
  visibleNotes,
  activeNoteId,
  setActiveNoteId,
  mousePosition,
  isDragging,
  dragStartY,
  dragStartX,
  onNoteRemoved,
  onNoteFalling,
  topmostNoteId,
  hasSelectedNote,
}) => {
  return (
    <>
      {visibleNotes.map((noteData) => (
        <StickyNote
          key={noteData.id}
          noteData={noteData}
          isActive={activeNoteId === noteData.id}
          setActiveNoteId={setActiveNoteId}
          mousePosition={mousePosition}
          isDragging={isDragging}
          dragStartY={dragStartY}
          dragStartX={dragStartX}
          onNoteRemoved={onNoteRemoved}
          onNoteFalling={onNoteFalling}
          // Only the top non-falling note can be dragged
          isTopMost={noteData.id === topmostNoteId}
          hasSelectedNote={hasSelectedNote}
        />
      ))}
    </>
  );
};

// Create a canvas texture for the text
const createTextTexture = (text) => {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size (power of 2 for better performance)
  canvas.width = 500;
  canvas.height = 500;

  // Clear canvas
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.fillStyle = "#333333";
  ctx.font = "bold 32px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Split text into lines
  const lines = text.split("\n");
  const lineHeight = 40;
  const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;

  // Draw each line
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
  });

  return canvas;
};

// Main sticky note component
const StickyNote = ({
  noteData,
  isActive,
  isTopMost,
  setActiveNoteId,
  mousePosition,
  isDragging,
  dragStartY,
  dragStartX,
  onNoteRemoved,
  onNoteFalling,
  hasSelectedNote,
}) => {
  const mesh = useRef();
  const { viewport, camera, raycaster, mouse } = useThree();

  // Each note has its own state values
  const peelProgress = useRef(0);
  const fallProgress = useRef(0);
  const hoverScale = useRef(1);

  // Store local falling state in a ref to prevent synchronization issues
  const isFalling = useRef(noteData.falling);

  // Local drag state management - critical for fixing the issue
  const localIsDragging = useRef(false);
  const localDragStartY = useRef(0);
  const localDragStartX = useRef(0);

  const fallStartTime = useRef(0);
  const maxDragDistance = 350; // total drag distance

  // Physics state for the falling paper
  const fallVelocity = useRef({ x: 0, y: 0, rotation: 0 });
  const fallPosition = useRef({ x: 0, y: 0, rotation: 0 });
  const fallRotation = useRef({ x: 0, y: 0, z: 0 });

  // Size of the plane (matching the args in planeGeometry)
  const planeWidth = 3;
  const planeHeight = 3;

  // Convert RGB color array to normalized values (0-1)
  const normalizeColor = (colorArray) => {
    return colorArray.map((c) => c / 255);
  };

  // Create a dynamic canvas texture for the text
  const textCanvas = useMemo(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      return createTextTexture(noteData.text);
    }
    return null;
  }, [noteData.text]);

  // Create a texture from the canvas
  const textTexture = useMemo(() => {
    if (!textCanvas) return null;

    const texture = new THREE.CanvasTexture(textCanvas);
    texture.needsUpdate = true;
    return texture;
  }, [textCanvas]);

  // Uniforms for the shader
  const uniforms = useRef({
    uPeelProgress: { value: 0 },
    uFallProgress: { value: 0 },
    uPlaneSize: { value: [planeWidth, planeHeight] },
    uCurveFactor: { value: 3.0 }, // Control the intensity of the curve
    uFalling: { value: noteData.falling ? 1 : 0 }, // Initialize from props
    uColor: { value: normalizeColor(noteData.color) },
    uTime: { value: 0 }, // Time uniform for animations
    uHoverIntensity: { value: 0 }, // Hover effect intensity
    uDragDirection: { value: [0, 1] }, // Direction of drag [x, y]
    uTextTexture: { value: textTexture }, // Text texture
    uHasTextTexture: { value: textTexture ? 1.0 : 0.0 }, // Flag if texture exists
  });

  // Time tracking for animations
  const time = useRef(0);

  // Update local falling state when props change
  useEffect(() => {
    // Only update state if it actually changed to prevent cascading updates
    if (isFalling.current !== noteData.falling) {
      isFalling.current = noteData.falling;

      if (noteData.falling && fallStartTime.current === 0) {
        fallStartTime.current = Date.now();
        uniforms.current.uFalling.value = 1;

        // Initialize fall with a slight random velocity
        fallVelocity.current = {
          x: (Math.random() - 0.5) * 0.08,
          y: 0,
          rotation: (Math.random() - 0.5) * 0.03,
        };
        fallPosition.current = { x: 0, y: 0, rotation: 0 };
      }
    }
  }, [noteData.falling]);

  // Check if this note is being clicked - ONLY for the topmost note
  useFrame(() => {
    // Only check for clicks when:
    // 1. Global mouse is down
    // 2. No note is currently active
    // 3. This is the current topmost interactable note
    // 4. Not already falling
    // 5. No note has been selected yet for this drag operation
    if (
      isDragging.current &&
      !isActive &&
      isTopMost &&
      !isFalling.current &&
      !hasSelectedNote.current
    ) {
      // Update raycaster with current mouse position
      raycaster.setFromCamera(mouse, camera);

      // Check if this mesh is being clicked
      const intersects = raycaster.intersectObjects([mesh.current], true);
      if (intersects.length > 0) {
        // This is the top-most note being clicked, set it as active
        setActiveNoteId(noteData.id);

        // Mark that we've selected a note for this drag operation
        hasSelectedNote.current = true;

        // Set local dragging state
        localIsDragging.current = true;
        localDragStartY.current = dragStartY.current;
        localDragStartX.current = dragStartX.current;
      }
    }

    // Reset local dragging state when global dragging ends
    if (!isDragging.current) {
      localIsDragging.current = false;
    }
  });

  // Hover detection for the note
  useFrame(() => {
    if (!isFalling.current && isTopMost && !isDragging.current) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(mesh.current);

      if (intersects.length > 0) {
        // Smoothly increase hover intensity
        uniforms.current.uHoverIntensity.value +=
          (1 - uniforms.current.uHoverIntensity.value) * 0.1;
        hoverScale.current = 1 + uniforms.current.uHoverIntensity.value * 0.03;
      } else {
        // Smoothly decrease hover intensity
        uniforms.current.uHoverIntensity.value *= 0.9;
        hoverScale.current = 1 + uniforms.current.uHoverIntensity.value * 0.03;
      }
    } else {
      uniforms.current.uHoverIntensity.value = 0;
      hoverScale.current = 1;
    }
  });

  // Function to update falling physics
  const updateFallingState = (deltaTime) => {
    // Skip if not in falling state
    if (!isFalling.current) return false;

    // If this is the first time falling, initialize the fall time
    if (fallStartTime.current === 0) {
      fallStartTime.current = Date.now();
    }

    // Gravity - reduced for slower falling
    const gravity = 0.0006;

    // Air resistance (affects both velocity and rotation)
    const airResistancePos = 0.99;
    const airResistanceRot = 0.997;

    // Left-right oscillation (like a falling paper)
    const oscillationFrequency = 0.002;
    const oscillationAmplitude = 0.0008;

    // Update velocities
    fallVelocity.current.y += gravity * deltaTime;

    // Oscillating left-right motion (like a falling paper)
    const fallTime =
      (Date.now() - fallStartTime.current) * oscillationFrequency;
    const horizontalOscillation =
      Math.sin(fallTime) * oscillationAmplitude * deltaTime;
    fallVelocity.current.x += horizontalOscillation;

    // Apply air resistance
    fallVelocity.current.x *= airResistancePos;
    fallVelocity.current.y *= airResistancePos;
    fallVelocity.current.rotation *= airResistanceRot;

    // Update positions with scaling for movement
    fallPosition.current.x += fallVelocity.current.x * deltaTime * 0.6;
    fallPosition.current.y += fallVelocity.current.y * deltaTime * 0.6;
    fallPosition.current.rotation +=
      fallVelocity.current.rotation * deltaTime * 0.6;

    // Enhanced 3D rotation for more realistic falling
    fallRotation.current.x +=
      (Math.sin(fallTime * 1.3) * 0.001 + fallVelocity.current.rotation * 0.5) *
      deltaTime;
    fallRotation.current.y += Math.sin(fallTime * 0.7) * 0.0005 * deltaTime;
    fallRotation.current.z +=
      (fallVelocity.current.rotation + Math.sin(fallTime * 2) * 0.001) *
      deltaTime *
      0.6;

    // Update fall progress (for shader fade-out) - faster fade
    fallProgress.current = Math.min(
      (Date.now() - fallStartTime.current) / 3000,
      1
    );
    uniforms.current.uFallProgress.value = fallProgress.current;

    // Remove note when it's fully faded
    if (fallProgress.current >= 0.9) {
      onNoteRemoved(noteData.id);
      fallProgress.current = 0;
    }

    return true;
  };

  // Handle animation frames
  useFrame((state, delta) => {
    // Update time for animations
    time.current += delta;
    uniforms.current.uTime.value = time.current;

    // Skip interaction logic if already falling
    if (!isFalling.current) {
      // CRITICAL: Only process drag interactions if this note is active
      // This is what ensures only the active note is affected
      if (isActive && isDragging.current) {
        // Calculate drag distance and direction
        const deltaY = mousePosition.current.y - dragStartY.current;
        const deltaX = mousePosition.current.x - dragStartX.current;

        // FIX: Add a maximum drag distance to prevent extreme values
        const clampedDeltaY = Math.max(deltaY, -maxDragDistance * 1.5);
        const clampedDeltaX = Math.max(
          Math.min(deltaX, maxDragDistance),
          -maxDragDistance
        );

        // Calculate drag direction vector (normalized)
        const dragMagnitude = Math.sqrt(
          clampedDeltaX * clampedDeltaX + clampedDeltaY * clampedDeltaY
        );
        if (dragMagnitude > 0) {
          uniforms.current.uDragDirection.value = [
            clampedDeltaX / dragMagnitude,
            clampedDeltaY / dragMagnitude,
          ];
        }

        // Normalize to 0-1 range for peel progress with lower threshold
        // Use primarily vertical movement but with some influence from horizontal
        const verticalInfluence = 0.8; // 80% vertical, 20% horizontal
        const effectiveDrag =
          clampedDeltaY * verticalInfluence +
          Math.abs(clampedDeltaX) * (1 - verticalInfluence);
        const progress = Math.min(
          Math.max(-effectiveDrag / maxDragDistance, 0),
          1
        );
        peelProgress.current = progress;
        uniforms.current.uPeelProgress.value = progress;

        // Instantly start falling if dragged enough - lower threshold for faster response
        if (progress >= 0.8) {
          // Important: Set the local falling state first
          isFalling.current = true;

          // Notify parent component to update global state
          onNoteFalling(noteData.id);

          // Initialize fall properties
          fallStartTime.current = Date.now();
          uniforms.current.uFalling.value = 1;

          // Initialize fall with velocity based on drag direction
          fallVelocity.current = {
            x: deltaX * 0.0001 + (Math.random() - 0.5) * 0.03,
            y: Math.min(deltaY * 0.0001, 0), // Ensure initial downward movement
            rotation: deltaX * 0.0001 + (Math.random() - 0.5) * 0.02,
          };
          fallPosition.current = { x: 0, y: 0, rotation: 0 };
        }
      }
      // If mouse released and note was being peeled
      else if (!isDragging.current && peelProgress.current > 0) {
        // Start falling if peeled enough
        if (peelProgress.current > 0.8) {
          // Important: Set the local falling state first
          isFalling.current = true;

          // Notify parent component to update global state
          onNoteFalling(noteData.id);

          // Initialize fall properties
          fallStartTime.current = Date.now();
          uniforms.current.uFalling.value = 1;

          // Initialize fall with a slight random velocity
          fallVelocity.current = {
            x: (Math.random() - 0.5) * 0.05,
            y: 0,
            rotation: (Math.random() - 0.5) * 0.02,
          };
          fallPosition.current = { x: 0, y: 0, rotation: 0 };
        }
        // Otherwise snap back quickly
        else {
          const newValue = Math.max(peelProgress.current - 0.1, 0); // Faster snap back
          peelProgress.current = newValue;
          uniforms.current.uPeelProgress.value = newValue;
        }
      }
      // Reset peel progress for non-active notes
      else if (!isActive && peelProgress.current > 0) {
        peelProgress.current = 0;
        uniforms.current.uPeelProgress.value = 0;
      }
    }

    // Set Z position based on zIndex - higher zIndex = closer to camera (more positive Z)
    if (mesh.current) {
      // Ensure proper z-positioning based on zIndex
      mesh.current.position.z = noteData.zIndex * 0.1;
    }

    // Update falling state if needed
    if (updateFallingState(delta * 1000)) {
      // Update mesh position and rotation for falling animation
      if (mesh.current) {
        // Apply the falling position and rotation
        mesh.current.position.x =
          noteData.offset.x + fallPosition.current.x * viewport.width * 0.5;
        mesh.current.position.y =
          noteData.offset.y +
          fallPosition.current.y * viewport.height * 0.5 * -1; // Invert Y for falling down

        // Apply enhanced 3D rotation for realistic paper falling effect
        mesh.current.rotation.x = fallRotation.current.x;
        mesh.current.rotation.y = fallRotation.current.y;
        mesh.current.rotation.z = fallRotation.current.z;
      }
    } else {
      // Set initial position with offset
      if (mesh.current) {
        mesh.current.position.x = noteData.offset.x;
        mesh.current.position.y = noteData.offset.y;

        // Apply hover scale
        mesh.current.scale.x = hoverScale.current;
        mesh.current.scale.y = hoverScale.current;
        mesh.current.scale.z = 1;
      }
    }
  });

  return (
    <group
      ref={mesh}
      position={[noteData.offset.x, noteData.offset.y, noteData.zIndex * 0.1]}
      rotation={[0, 0, 0]}
    >
      <mesh>
        <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
        <shaderMaterial
          transparent={true}
          uniforms={uniforms.current}
          vertexShader={`
            uniform float uPeelProgress;
            uniform float uFallProgress;
            uniform vec2 uPlaneSize;
            uniform float uCurveFactor;
            uniform float uFalling;
            uniform float uTime;
            uniform float uHoverIntensity;
            uniform vec2 uDragDirection;
            varying vec2 vUv;
            varying float vPeelIntensity;
            
            // Pi constant
            #define PI 3.14159265359
            
            // Noise functions for paper texture
            float random(vec2 st) {
              return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }
            
            float noise(vec2 st) {
              vec2 i = floor(st);
              vec2 f = fract(st);
              
              // Four corners in 2D of a tile
              float a = random(i);
              float b = random(i + vec2(1.0, 0.0));
              float c = random(i + vec2(0.0, 1.0));
              float d = random(i + vec2(1.0, 1.0));
              
              // Smooth interpolation
              vec2 u = f * f * (3.0 - 2.0 * f);
              
              // Mix 4 corners
              return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }
            
            void main() {
              vUv = uv;
              
              // Create a copy of the position we can modify
              vec3 pos = position;
              
              // Calculate distance from top (anchored) edge
              float distFromTop = 1.0 - uv.y;
              
              // Enhanced peel influence - much stronger at bottom edge
              float peelInfluence = pow(distFromTop, uCurveFactor);
              
              // Store for use in fragment shader
              vPeelIntensity = peelInfluence * uPeelProgress;
              
              // Add subtle paper waviness based on noise
              float paperWaviness = noise(vUv * 10.0 + uTime * 0.1) * 0.05;
              pos.z += paperWaviness * (1.0 - uPeelProgress * 0.5);
              
              // Add hover effect - gentle floating motion
              if (uHoverIntensity > 0.01) {
                // Gentle floating motion
                float hoverWave = sin(uTime * 2.0) * 0.02 * uHoverIntensity;
                pos.z += hoverWave;
                
                // Subtle edge curl on hover
                float edgeDist = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)) * 10.0;
                float edgeCurl = max(0.0, 1.0 - edgeDist) * 0.1 * uHoverIntensity;
                pos.z += edgeCurl;
              }
              
              // When not in falling mode and peeling
              if (uFalling < 0.5) {
                // Calculate maximum rotation angle (180 degrees in radians)
                float maxAngle = PI;
                
                // Main peel animation - calculate rotation angle
                float angle = maxAngle * smoothstep(0.0, 1.0, uPeelProgress) * peelInfluence;
                
                // Apply rotation around the X axis (to peel from bottom to top)
                if (distFromTop > 0.05) {  // Leave the very top edge anchored
                  // Define the pivot point at the top edge
                  float pivotY = uPlaneSize.y * 0.5; // Half of the height
                  
                  // Translate to pivot, rotate, translate back
                  float yOffset = position.y + pivotY;
                  
                  // Apply rotation around X axis (with modified rotation direction)
                  if (angle > 0.0) {
                    // Translate to origin
                    pos.y -= yOffset;
                    
                    // Rotate around X axis
                    float cosA = cos(angle);
                    float sinA = sin(angle);
                    float y2 = pos.y * cosA - pos.z * sinA;
                    float z2 = -pos.y * sinA - pos.z * cosA;
                    
                    pos.y = y2;
                    pos.z = z2;
                    
                    // Translate back
                    pos.y += yOffset;
                    
                    // Enhanced curl effect
                    float curl = sin(distFromTop * PI) * uPeelProgress * (uPlaneSize.y * 0.1);
                    float bottomCurl = pow(distFromTop, 2.0) * sin(distFromTop * PI * 0.5) * 
                                      uPeelProgress * (uPlaneSize.y * 0.2);
                    
                    // TO DO: Add side curl based on drag direction
                    // float sideCurl = 0.0;
                    // if (abs(uDragDirection.x) > 0.3) {
                    //   float sideInfluence = abs(uv.x - 0.5) * 2.0; // 0 at center, 1 at edges
                    //   sideCurl = sideInfluence * sign(uDragDirection.x) * uPeelProgress * 0.3;
                    // }
                    
                    pos.z += curl + bottomCurl;
                    //pos.x += sideCurl;
                  }
                }
              }
              // When in falling mode, add gentle waves to simulate paper flexibility while falling
              else {
                // Add gentle sine wave deformation across both axes for floating paper effect
                float waveIntensity = 0.15;
                float timeOffset = uFallProgress * 10.0 + uTime * 2.0; // Animation based on fall time
                
                // Create gentle waves along both X and Y axes
                float waveX = sin(uv.x * PI * 2.0 + timeOffset) * waveIntensity;
                float waveY = sin(uv.y * PI * 3.0 + timeOffset * 1.2) * waveIntensity;
                
                // Apply the waves with distance-based intensity
                pos.z += waveX * (0.5 - abs(uv.x - 0.5));
                pos.z += waveY * (0.5 - abs(uv.y - 0.5));
                
                // Add noise-based deformation for more natural paper movement
                float noiseVal = noise(vUv * 5.0 + vec2(timeOffset * 0.2, timeOffset * 0.3));
                pos.z += noiseVal * 0.1;
              }
              
              // Project the position to clip space
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColor;
            uniform float uFallProgress;
            uniform float uTime;
            uniform float uHoverIntensity;
            uniform sampler2D uTextTexture;
            uniform float uHasTextTexture;
            varying vec2 vUv;
            varying float vPeelIntensity;
            
            // Noise function for paper texture
            float random(vec2 st) {
              return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }
            
            void main() {
              // Base sticky note color
              vec3 color = uColor;
              
              // Add shadow under the peeled part
              float shadow = 1.0 - vPeelIntensity * 0.5;
              color *= shadow;
              
              // Add highlight at the edge that's peeling
              float highlight = smoothstep(0.4, 0.6, vPeelIntensity) * 0.3;
              color += highlight * vec3(1.0, 1.0, 0.8);
              
              // Add paper texture
              float paperTexture = random(vUv * 500.0) * 0.05 - 0.025;
              color += paperTexture;
              
              // Add subtle color variation based on UV coordinates
              float colorVariation = random(vUv * 10.0 + uTime * 0.1) * 0.03 - 0.015;
              color += colorVariation;
              
              // Add hover effect - subtle glow
              if (uHoverIntensity > 0.01) {
                // Subtle edge highlight
                float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)) * 10.0;
                float edgeGlow = max(0.0, 1.0 - edgeDist) * 0.15 * uHoverIntensity;
                color += edgeGlow * vec3(1.0, 1.0, 0.9);
              }
              
              // Calculate alpha (transparency) for fade-out effect during falling
              float alpha = 1.0 - uFallProgress * 0.8;
              
              // Sample text texture if available
              vec4 finalColor = vec4(color, alpha);
              if (uHasTextTexture > 0.5) {
                vec4 textColor = texture2D(uTextTexture, vUv);
                // Blend text with note color
                if (textColor.a > 0.1) {
                  finalColor = mix(finalColor, vec4(0.0, 0.0, 0.0, alpha), textColor.a * 0.8);
                }
              }
              
              gl_FragColor = finalColor;
            }
          `}
        />
      </mesh>

      {/* Fallback text component for browsers that don't support shader textures */}
      <Text
        position={[0, 0, 0.1]}
        rotation={[0, 0, 0]}
        fontSize={0.4}
        maxWidth={8}
        lineHeight={1.2}
        textAlign="center"
        color="#333333"
        anchorX="center"
        anchorY="middle"
        opacity={1.0 - fallProgress.current * 0.8}
        visible={!textTexture} // Only show if texture creation failed
      >
        {noteData.text}
      </Text>
    </group>
  );
};
