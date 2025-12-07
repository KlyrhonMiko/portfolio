'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { IcosahedronGeometry, EdgesGeometry, LineBasicMaterial } from 'three';
import * as THREE from 'three';

// ==================== TETRIS GAME LOGIC ====================
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 16;

const TETROMINOES = {
    I: { shape: [[1, 1, 1, 1]], color: '#00ffff' },
    O: { shape: [[1, 1], [1, 1]], color: '#ffff00' },
    T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#ff00ff' },
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00ff00' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#ff3333' },
    J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#3366ff' },
    L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#ff9900' },
};

type TetrominoType = keyof typeof TETROMINOES;
type Board = (string | null)[][];

interface Piece { shape: number[][]; color: string; x: number; y: number; }

const createEmptyBoard = (): Board => Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));
const getRandomTetromino = () => {
    const types = Object.keys(TETROMINOES) as TetrominoType[];
    return { ...TETROMINOES[types[Math.floor(Math.random() * types.length)]] };
};
const rotatePiece = (shape: number[][]): number[][] => {
    const rows = shape.length, cols = shape[0].length;
    const rotated: number[][] = [];
    for (let col = 0; col < cols; col++) {
        const newRow: number[] = [];
        for (let row = rows - 1; row >= 0; row--) newRow.push(shape[row][col]);
        rotated.push(newRow);
    }
    return rotated;
};

// ==================== SCROLL DATA ====================
interface ScrollData {
    progress: number;
    velocity: number;
}

// ==================== 3D TETRIS ARCADE SCREEN ====================
interface TetrisArcadeProps {
    isActive: boolean;
    onClose: () => void;
    mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function TetrisArcade({ isActive, onClose, mouse }: TetrisArcadeProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [board, setBoard] = useState<Board>(createEmptyBoard);
    const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
    const [nextPiece, setNextPiece] = useState<{ shape: number[][]; color: string } | null>(null);
    const [score, setScore] = useState(0);
    const [lines, setLines] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const activationProgress = useRef(0);
    const { viewport } = useThree();

    // Animation for arcade screen
    useFrame((state) => {
        if (!groupRef.current) return;

        const targetProgress = isActive ? 1 : 0;
        activationProgress.current += (targetProgress - activationProgress.current) * 0.08;

        const floatY = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
        const floatX = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

        // Position: when inactive, far away; when active, front and center
        const targetZ = isActive ? 3 : -20;
        const targetScale = isActive ? 1 : 0.1;
        const targetOpacity = isActive ? 1 : 0;

        groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.06;
        groupRef.current.position.y = floatY * activationProgress.current;
        groupRef.current.position.x = floatX * activationProgress.current + mouse.current.x * 0.3 * activationProgress.current;

        groupRef.current.rotation.y = mouse.current.x * 0.1 * activationProgress.current;
        groupRef.current.rotation.x = -mouse.current.y * 0.05 * activationProgress.current;

        const currentScale = groupRef.current.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.06;
        groupRef.current.scale.setScalar(newScale);
    });

    const spawnPiece = useCallback(() => {
        const piece = nextPiece || getRandomTetromino();
        setNextPiece(getRandomTetromino());
        return {
            shape: piece.shape,
            color: piece.color,
            x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
            y: 0,
        };
    }, [nextPiece]);

    const checkCollision = useCallback((piece: Piece, boardState: Board, ox = 0, oy = 0): boolean => {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const nx = piece.x + x + ox, ny = piece.y + y + oy;
                    if (nx < 0 || nx >= BOARD_WIDTH || ny >= BOARD_HEIGHT || (ny >= 0 && boardState[ny][nx])) return true;
                }
            }
        }
        return false;
    }, []);

    const mergePiece = useCallback((piece: Piece, boardState: Board): Board => {
        const newBoard = boardState.map(row => [...row]);
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const by = piece.y + y, bx = piece.x + x;
                    if (by >= 0 && by < BOARD_HEIGHT && bx >= 0 && bx < BOARD_WIDTH) newBoard[by][bx] = piece.color;
                }
            }
        }
        return newBoard;
    }, []);

    const clearLines = useCallback((boardState: Board) => {
        const newBoard = boardState.filter(row => row.some(cell => !cell));
        const cleared = BOARD_HEIGHT - newBoard.length;
        while (newBoard.length < BOARD_HEIGHT) newBoard.unshift(Array(BOARD_WIDTH).fill(null));
        return { newBoard, cleared };
    }, []);

    const startGame = useCallback(() => {
        setBoard(createEmptyBoard());
        setScore(0);
        setLines(0);
        setLevel(1);
        setGameOver(false);
        setIsPaused(false);
        setIsPlaying(true);
        setNextPiece(getRandomTetromino());
        const piece = getRandomTetromino();
        setCurrentPiece({
            shape: piece.shape,
            color: piece.color,
            x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
            y: 0,
        });
    }, []);

    const moveDown = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;
        if (checkCollision(currentPiece, board, 0, 1)) {
            if (currentPiece.y <= 0) { setGameOver(true); setIsPlaying(false); return; }
            const merged = mergePiece(currentPiece, board);
            const { newBoard, cleared } = clearLines(merged);
            setBoard(newBoard);
            if (cleared > 0) {
                setScore(prev => prev + [0, 100, 300, 500, 800][cleared] * level);
                setLines(prev => { const n = prev + cleared; setLevel(Math.floor(n / 10) + 1); return n; });
            }
            const np = spawnPiece();
            if (checkCollision(np, newBoard)) { setGameOver(true); setIsPlaying(false); }
            else setCurrentPiece(np);
        } else {
            setCurrentPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
        }
    }, [currentPiece, board, gameOver, isPaused, checkCollision, mergePiece, clearLines, spawnPiece, level]);

    // Game loop
    useEffect(() => {
        if (isPlaying && !isPaused && !gameOver && isActive) {
            const speed = Math.max(100, 1000 - (level - 1) * 100);
            gameLoopRef.current = setInterval(moveDown, speed);
            return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
        }
    }, [isPlaying, isPaused, gameOver, level, moveDown, isActive]);

    // Keyboard controls
    useEffect(() => {
        if (!isActive) return;
        const handleKey = (e: KeyboardEvent) => {
            if (!isPlaying && e.key !== 'Enter' && e.key !== 'Escape') return;
            if (isPaused && e.key !== 'p' && e.key !== 'P' && e.key !== 'Escape') return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentPiece && !checkCollision(currentPiece, board, -1, 0))
                        setCurrentPiece(p => p ? { ...p, x: p.x - 1 } : null);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentPiece && !checkCollision(currentPiece, board, 1, 0))
                        setCurrentPiece(p => p ? { ...p, x: p.x + 1 } : null);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    moveDown();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentPiece) {
                        const rotated = rotatePiece(currentPiece.shape);
                        if (!checkCollision({ ...currentPiece, shape: rotated }, board))
                            setCurrentPiece({ ...currentPiece, shape: rotated });
                    }
                    break;
                case ' ':
                    e.preventDefault();
                    if (currentPiece) {
                        let dy = 0;
                        while (!checkCollision(currentPiece, board, 0, dy + 1)) dy++;
                        setCurrentPiece(p => p ? { ...p, y: p.y + dy } : null);
                        setTimeout(moveDown, 50);
                    }
                    break;
                case 'p':
                case 'P':
                    setIsPaused(p => !p);
                    break;
                case 'Enter':
                    if (!isPlaying || gameOver) startGame();
                    break;
                case 'Escape':
                    onClose();
                    break;
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isActive, isPlaying, isPaused, gameOver, currentPiece, board, checkCollision, moveDown, startGame, onClose]);

    const renderBoard = () => {
        const display = board.map(row => [...row]);
        if (currentPiece) {
            for (let y = 0; y < currentPiece.shape.length; y++) {
                for (let x = 0; x < currentPiece.shape[y].length; x++) {
                    if (currentPiece.shape[y][x]) {
                        const by = currentPiece.y + y, bx = currentPiece.x + x;
                        if (by >= 0 && by < BOARD_HEIGHT && bx >= 0 && bx < BOARD_WIDTH)
                            display[by][bx] = currentPiece.color;
                    }
                }
            }
        }
        return display;
    };

    if (!isActive && activationProgress.current < 0.01) return null;

    return (
        <group ref={groupRef} position={[0, 0, -20]} scale={0.1}>
            {/* Glowing frame */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[4.5, 5.5]} />
                <meshBasicMaterial color="#001a00" transparent opacity={0.95} />
            </mesh>

            {/* Border glow */}
            <mesh position={[0, 0, -0.15]}>
                <planeGeometry args={[4.8, 5.8]} />
                <meshBasicMaterial color="#00ff00" transparent opacity={0.1} />
            </mesh>

            {/* HTML Game UI */}
            <Html
                transform
                occlude
                position={[0, 0, 0]}
                style={{
                    width: '320px',
                    height: '420px',
                    pointerEvents: isActive ? 'auto' : 'none',
                }}
            >
                <div style={{
                    width: '320px',
                    height: '420px',
                    background: 'linear-gradient(180deg, rgba(0,20,0,0.98) 0%, rgba(0,10,0,0.98) 100%)',
                    borderRadius: '8px',
                    padding: '12px',
                    fontFamily: 'monospace',
                    color: '#00ff00',
                    boxShadow: '0 0 40px rgba(0,255,0,0.2), inset 0 0 60px rgba(0,0,0,0.5)',
                    border: '2px solid rgba(0,255,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Scanlines */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                        pointerEvents: 'none',
                        zIndex: 100,
                    }} />

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', textShadow: '0 0 10px #00ff00', letterSpacing: '2px' }}>TETRIS</div>
                        <button onClick={onClose} style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,100,100,0.5)',
                            color: '#ff6666',
                            padding: '2px 8px',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            fontSize: '10px',
                        }}>[ESC]</button>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        {/* Game Board */}
                        <div style={{
                            border: '1px solid rgba(0,255,0,0.4)',
                            background: 'rgba(0,0,0,0.5)',
                            padding: '2px',
                        }}>
                            {renderBoard().map((row, y) => (
                                <div key={y} style={{ display: 'flex' }}>
                                    {row.map((cell, x) => (
                                        <div key={x} style={{
                                            width: CELL_SIZE,
                                            height: CELL_SIZE,
                                            background: cell || 'rgba(0,255,0,0.03)',
                                            border: `1px solid ${cell ? cell + '66' : 'rgba(0,255,0,0.1)'}`,
                                            boxShadow: cell ? `0 0 6px ${cell}44` : 'none',
                                        }} />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Stats Panel */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '70px', fontSize: '10px' }}>
                            <div style={{ background: 'rgba(0,255,0,0.05)', padding: '6px', borderRadius: '3px', border: '1px solid rgba(0,255,0,0.2)' }}>
                                <div style={{ color: 'rgba(0,255,0,0.6)', marginBottom: '2px' }}>SCORE</div>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', textShadow: '0 0 5px #00ff00' }}>{score.toString().padStart(6, '0')}</div>
                            </div>
                            <div style={{ background: 'rgba(0,255,0,0.05)', padding: '6px', borderRadius: '3px', border: '1px solid rgba(0,255,0,0.2)' }}>
                                <div style={{ color: 'rgba(0,255,0,0.6)', marginBottom: '2px' }}>LEVEL</div>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ff00ff', textShadow: '0 0 5px #ff00ff' }}>{level}</div>
                            </div>
                            <div style={{ background: 'rgba(0,255,0,0.05)', padding: '6px', borderRadius: '3px', border: '1px solid rgba(0,255,0,0.2)' }}>
                                <div style={{ color: 'rgba(0,255,0,0.6)', marginBottom: '2px' }}>LINES</div>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#00ffff', textShadow: '0 0 5px #00ffff' }}>{lines}</div>
                            </div>
                            <div style={{ background: 'rgba(0,255,0,0.05)', padding: '6px', borderRadius: '3px', border: '1px solid rgba(0,255,0,0.2)' }}>
                                <div style={{ color: 'rgba(0,255,0,0.6)', marginBottom: '4px' }}>NEXT</div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {nextPiece && nextPiece.shape.map((row, y) => (
                                        <div key={y} style={{ display: 'flex', flexDirection: 'column' }}>
                                            {row.map((cell, x) => (
                                                <div key={x} style={{
                                                    width: 10, height: 10,
                                                    background: cell ? nextPiece.color : 'transparent',
                                                    border: cell ? `1px solid ${nextPiece.color}66` : 'none',
                                                }} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controls */}
                            {!isPlaying ? (
                                <button onClick={startGame} style={{
                                    marginTop: 'auto',
                                    padding: '8px',
                                    background: 'rgba(0,255,0,0.15)',
                                    border: '1px solid rgba(0,255,0,0.4)',
                                    borderRadius: '3px',
                                    color: '#00ff00',
                                    cursor: 'pointer',
                                    fontFamily: 'monospace',
                                    fontSize: '11px',
                                    textShadow: '0 0 5px #00ff00',
                                }}>{gameOver ? 'RETRY' : 'START'}</button>
                            ) : (
                                <button onClick={() => setIsPaused(p => !p)} style={{
                                    marginTop: 'auto',
                                    padding: '8px',
                                    background: 'rgba(0,255,0,0.1)',
                                    border: '1px solid rgba(0,255,0,0.3)',
                                    borderRadius: '3px',
                                    color: '#00ff00',
                                    cursor: 'pointer',
                                    fontFamily: 'monospace',
                                    fontSize: '10px',
                                }}>{isPaused ? 'RESUME' : 'PAUSE'}</button>
                            )}
                        </div>
                    </div>

                    {/* Controls hint */}
                    <div style={{
                        marginTop: '8px',
                        fontSize: '8px',
                        color: 'rgba(0,255,0,0.4)',
                        textAlign: 'center',
                    }}>
                        ←→ MOVE • ↑ ROTATE • ↓ DROP • SPACE HARD • P PAUSE
                    </div>

                    {/* Overlays */}
                    {(gameOver || isPaused) && (
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.85)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50,
                        }}>
                            <div style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: gameOver ? '#ff3333' : '#ffff00',
                                textShadow: gameOver ? '0 0 15px #ff3333' : '0 0 15px #ffff00',
                                marginBottom: '8px',
                            }}>{gameOver ? 'GAME OVER' : 'PAUSED'}</div>
                            {gameOver && <div style={{ marginBottom: '12px', color: '#00ff00' }}>SCORE: {score}</div>}
                            <button onClick={gameOver ? startGame : () => setIsPaused(false)} style={{
                                padding: '8px 20px',
                                background: 'rgba(0,255,0,0.2)',
                                border: '1px solid rgba(0,255,0,0.4)',
                                borderRadius: '3px',
                                color: '#00ff00',
                                cursor: 'pointer',
                                fontFamily: 'monospace',
                            }}>{gameOver ? 'PLAY AGAIN' : 'RESUME'}</button>
                        </div>
                    )}
                </div>
            </Html>
        </group>
    );
}

// ==================== WIREFRAME ICOSAHEDRON ====================
interface WireframeIcosahedronProps {
    mouse: React.MutableRefObject<{ x: number; y: number }>;
    scroll: React.MutableRefObject<ScrollData>;
    isLoading?: boolean;
    tetrisActive?: boolean;
}

function WireframeIcosahedron({ mouse, scroll, isLoading = false, tetrisActive = false }: WireframeIcosahedronProps) {
    const meshRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    const loadingTransition = useRef(1);

    const { geometry, material } = useMemo(() => {
        const icosahedron = new IcosahedronGeometry(2.5, 1);
        const edges = new EdgesGeometry(icosahedron);
        const mat = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
        return { geometry: edges, material: mat };
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const targetTransition = isLoading ? 1 : 0;
        loadingTransition.current += (targetTransition - loadingTransition.current) * 0.03;

        const scrollProgress = scroll.current.progress;
        const scrollVelocity = scroll.current.velocity;
        const loadingT = loadingTransition.current;

        // When Tetris is active, move to the side
        const tetrisOffset = tetrisActive ? -6 : 0;
        const tetrisScale = tetrisActive ? 0.6 : 1;

        const loadingPosition = { x: 0, y: 0, z: 2 };
        const loadingScale = 1.2;
        const loadingOpacity = 0.35;

        const viewportScaleFactor = Math.min(viewport.width / 15, 1);
        const mobileScaleFactor = Math.max(0.6, viewportScaleFactor);

        interface Keyframe {
            progress: number; x: number; y: number; z: number; scale: number; opacity: number;
        }

        const keyframes: Keyframe[] = [
            { progress: 0, x: 0, y: 0, z: 0, scale: 1, opacity: 0.15 },
            { progress: 0.25, x: 12 * viewportScaleFactor, y: 0, z: 2, scale: 3.5 * mobileScaleFactor, opacity: 0.12 },
            { progress: 0.5, x: -6 * viewportScaleFactor, y: -1, z: 0, scale: 2 * mobileScaleFactor, opacity: 0.15 },
            { progress: 0.75, x: 0, y: 2, z: -2, scale: 1.5 * mobileScaleFactor, opacity: 0.1 },
            { progress: 1, x: 5 * viewportScaleFactor, y: -3, z: 1, scale: 2.5 * mobileScaleFactor, opacity: 0.12 },
        ];

        let fromKeyframe = keyframes[0];
        let toKeyframe = keyframes[1];
        for (let i = 0; i < keyframes.length - 1; i++) {
            if (scrollProgress >= keyframes[i].progress && scrollProgress <= keyframes[i + 1].progress) {
                fromKeyframe = keyframes[i];
                toKeyframe = keyframes[i + 1];
                break;
            }
        }

        const range = toKeyframe.progress - fromKeyframe.progress;
        const localProgress = range > 0 ? (scrollProgress - fromKeyframe.progress) / range : 0;
        const eased = localProgress < 0.5 ? 2 * localProgress * localProgress : 1 - Math.pow(-2 * localProgress + 2, 2) / 2;

        const scrollTargetX = fromKeyframe.x + (toKeyframe.x - fromKeyframe.x) * eased;
        const scrollTargetY = fromKeyframe.y + (toKeyframe.y - fromKeyframe.y) * eased;
        const scrollTargetZ = fromKeyframe.z + (toKeyframe.z - fromKeyframe.z) * eased;
        const scrollTargetScale = fromKeyframe.scale + (toKeyframe.scale - fromKeyframe.scale) * eased;
        const scrollTargetOpacity = fromKeyframe.opacity + (toKeyframe.opacity - fromKeyframe.opacity) * eased;

        const targetX = loadingPosition.x * loadingT + (scrollTargetX + tetrisOffset) * (1 - loadingT);
        const targetY = loadingPosition.y * loadingT + scrollTargetY * (1 - loadingT);
        const targetZ = loadingPosition.z * loadingT + scrollTargetZ * (1 - loadingT);
        const targetScale = (loadingScale * loadingT + scrollTargetScale * (1 - loadingT)) * tetrisScale;
        const targetOpacity = loadingOpacity * loadingT + scrollTargetOpacity * (1 - loadingT);

        const lerpSpeed = 0.06;
        meshRef.current.position.x += (targetX - meshRef.current.position.x) * lerpSpeed;
        meshRef.current.position.y += (targetY - meshRef.current.position.y) * lerpSpeed;
        meshRef.current.position.z += (targetZ - meshRef.current.position.z) * lerpSpeed;

        const loadingRotationBoost = loadingT * 0.008;
        const baseRotationSpeed = 0.002 + loadingRotationBoost;
        const velocityBoost = Math.abs(scrollVelocity) * 0.15;

        meshRef.current.rotation.y += baseRotationSpeed + velocityBoost;
        meshRef.current.rotation.x += (baseRotationSpeed * 0.5) + (velocityBoost * 0.3);
        meshRef.current.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.3 * (1 - loadingT);

        const mouseInfluence = (1 - Math.min(Math.abs(scrollVelocity) * 5, 0.8)) * (1 / targetScale) * (1 - loadingT * 0.5);
        meshRef.current.position.x += (mouse.current.x * viewport.width * 0.3) * mouseInfluence * 0.02;
        meshRef.current.position.y += (mouse.current.y * viewport.height * 0.3) * mouseInfluence * 0.02;

        const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.015;
        const velocityScale = 1 + Math.abs(scrollVelocity) * 0.2 * (1 - loadingT);
        const loadingPulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02 * loadingT;

        meshRef.current.scale.setScalar(targetScale * breathingScale * velocityScale * loadingPulse);
        material.opacity = Math.max(0.08, Math.min(0.4, targetOpacity + Math.abs(scrollVelocity) * 0.1 * (1 - loadingT)));
    });

    return (
        <group ref={meshRef}>
            <lineSegments geometry={geometry} material={material} />
        </group>
    );
}

// ==================== CONSTELLATION ====================
const ARIES_STARS = [
    { x: -1.2, y: 0.8, z: 0, size: 1.3 },
    { x: 0.4, y: 0.5, z: 0.05, size: 1.1 },
    { x: 1.2, y: -0.1, z: 0.1, size: 0.9 },
    { x: 1.25, y: -0.7, z: 0, size: 0.8 },
];

const ARIES_CONNECTIONS = [[0, 1], [1, 2], [2, 3]];

const LIBRA_STARS = [
    { x: 0, y: 1.2, z: 0, size: 1.3 },
    { x: -1.1, y: 0.4, z: 0.05, size: 0.9 },
    { x: 0.8, y: 0.5, z: 0, size: 1.0 },
    { x: 0.4, y: -0.4, z: 0.1, size: 1.1 },
    { x: -0.5, y: -0.8, z: 0.05, size: 0.9 },
    { x: -0.6, y: -1.1, z: 0, size: 0.8 },
];

const LIBRA_CONNECTIONS = [[0, 1], [0, 2], [0, 3], [2, 3], [3, 4], [4, 5]];

interface ConstellationProps {
    stars: { x: number; y: number; z: number; size: number }[];
    connections: number[][];
    position: [number, number, number];
    scale?: number;
    opacity?: number;
    scroll: React.MutableRefObject<ScrollData>;
    mouse: React.MutableRefObject<{ x: number; y: number }>;
    visibleSections?: { start: number; end: number; peakOpacity: number }[];
    tetrisActive?: boolean;
}

function getStarTexture() {
    const size = 64;
    const center = size / 2;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Clear with transparency
    ctx.clearRect(0, 0, size, size);

    // Outer soft glow (large, very faint)
    const outerGlow = ctx.createRadialGradient(center, center, 0, center, center, center);
    outerGlow.addColorStop(0, 'rgba(200, 220, 255, 0.3)');
    outerGlow.addColorStop(0.3, 'rgba(180, 200, 255, 0.1)');
    outerGlow.addColorStop(0.6, 'rgba(150, 180, 255, 0.03)');
    outerGlow.addColorStop(1, 'rgba(100, 150, 255, 0)');
    ctx.fillStyle = outerGlow;
    ctx.fillRect(0, 0, size, size);

    // Diffraction spikes (4-point cross pattern like real stars)
    ctx.globalCompositeOperation = 'lighter';
    const spikeLength = center * 0.9;
    const spikeWidth = 1.5;

    // Draw 4 diffraction spikes
    for (let angle = 0; angle < 4; angle++) {
        const rotation = (angle * Math.PI / 2) + Math.PI / 4; // 45 degree offset
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(rotation);

        // Each spike is a thin gradient line
        const spikeGrad = ctx.createLinearGradient(0, 0, spikeLength, 0);
        spikeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        spikeGrad.addColorStop(0.2, 'rgba(220, 240, 255, 0.25)');
        spikeGrad.addColorStop(0.5, 'rgba(180, 210, 255, 0.08)');
        spikeGrad.addColorStop(1, 'rgba(150, 180, 255, 0)');

        ctx.fillStyle = spikeGrad;
        ctx.beginPath();
        ctx.moveTo(0, -spikeWidth);
        ctx.lineTo(spikeLength, 0);
        ctx.lineTo(0, spikeWidth);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    // Middle glow layer
    const midGlow = ctx.createRadialGradient(center, center, 0, center, center, center * 0.5);
    midGlow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    midGlow.addColorStop(0.3, 'rgba(230, 245, 255, 0.4)');
    midGlow.addColorStop(0.7, 'rgba(200, 220, 255, 0.1)');
    midGlow.addColorStop(1, 'rgba(180, 200, 255, 0)');
    ctx.fillStyle = midGlow;
    ctx.beginPath();
    ctx.arc(center, center, center * 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Bright core (small, intense white center)
    const coreGlow = ctx.createRadialGradient(center, center, 0, center, center, center * 0.15);
    coreGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
    coreGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
    coreGlow.addColorStop(1, 'rgba(240, 250, 255, 0)');
    ctx.fillStyle = coreGlow;
    ctx.beginPath();
    ctx.arc(center, center, center * 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';

    return new THREE.CanvasTexture(canvas);
}

function Constellation({ stars, connections, position, scale = 1, opacity = 0.15, scroll, mouse, visibleSections = [{ start: 0, end: 1, peakOpacity: 1 }], tetrisActive = false }: ConstellationProps) {
    const groupRef = useRef<THREE.Group>(null);
    const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);
    const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
    const starRefs = useRef<(THREE.Sprite | null)[]>([]);
    const { viewport } = useThree();
    const starTexture = useMemo(() => getStarTexture(), []);

    // Random scattered positions for each star (offsets from their final positions)
    const scatteredOffsets = useMemo(() => stars.map(() => ({
        x: (Math.random() - 0.5) * 4,  // Random offset in X
        y: (Math.random() - 0.5) * 4,  // Random offset in Y
        z: (Math.random() - 0.5) * 2,  // Random offset in Z
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        driftSpeedX: 0.1 + Math.random() * 0.15,
        driftSpeedY: 0.08 + Math.random() * 0.12,
    })), [stars]);

    const twinklePhases = useMemo(() => stars.map(() => ({
        phase1: Math.random() * Math.PI * 2,
        speed1: 0.3 + Math.random() * 0.5,
        phase2: Math.random() * Math.PI * 2,
        speed2: 1.5 + Math.random() * 2,
        phase3: Math.random() * Math.PI * 2,
        speed3: 4 + Math.random() * 6,
        colorPhase: Math.random() * Math.PI * 2,
        colorSpeed: 0.2 + Math.random() * 0.4,
        baseIntensity: 0.6 + Math.random() * 0.4,
        flickerIntensity: 0.1 + Math.random() * 0.25,
        sparkleOffset: Math.random() * 100,
    })), [stars]);

    // Create line geometry that can be updated dynamically
    const lineGeometry = useMemo(() => {
        const positions = new Float32Array(connections.length * 6);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [connections]);

    // Smoothed position refs for natural movement
    const smoothedGroupPos = useRef({ x: position[0], y: position[1], z: position[2] });
    const smoothedFormation = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        const scrollProgress = scroll.current.progress;
        const scrollVelocity = scroll.current.velocity;

        const tetrisDim = tetrisActive ? 0.3 : 1;

        // Calculate section opacity (how "active" this constellation is)
        let sectionOpacity = 0;
        for (const section of visibleSections) {
            if (scrollProgress >= section.start && scrollProgress <= section.end) {
                const len = section.end - section.start;
                const fadeZone = Math.min(0.1, len * 0.3);
                const local = (scrollProgress - section.start) / len;
                let fade = 1;
                if (local < fadeZone / len) fade = local / (fadeZone / len);
                else if (local > 1 - fadeZone / len) fade = (1 - local) / (fadeZone / len);
                sectionOpacity = Math.max(sectionOpacity, fade * section.peakOpacity);
            }
        }

        // Smooth easing for formation (ease-in-out) with temporal smoothing
        const targetFormation = sectionOpacity * sectionOpacity * (3 - 2 * sectionOpacity);
        const formationLerpSpeed = 0.04; // Slow, smooth transition
        smoothedFormation.current += (targetFormation - smoothedFormation.current) * formationLerpSpeed;
        const formationProgress = smoothedFormation.current;

        const viewportScale = Math.min(viewport.width / 15, 1);

        // Reduce float intensity when formed (stars should be more stable when visible)
        const floatIntensity = 1 - formationProgress * 0.6;
        const floatX = Math.sin(time * 0.15 + position[0]) * 0.3 * floatIntensity;
        const floatY = Math.sin(time * 0.2 + position[1]) * 0.25 * floatIntensity;

        // Add scroll velocity influence - subtle parallax effect
        const scrollInfluenceX = scrollVelocity * 2.5 * (1 - formationProgress * 0.5);
        const scrollInfluenceY = -scrollVelocity * 4.0; // Move opposite to scroll direction

        // Target positions with scroll influence
        const targetX = position[0] * viewportScale + floatX + scrollInfluenceX;
        const targetY = position[1] + floatY + scrollInfluenceY;
        const targetZ = position[2];

        // Smooth lerp to target positions for natural motion
        const posLerpSpeed = 0.08;
        smoothedGroupPos.current.x += (targetX - smoothedGroupPos.current.x) * posLerpSpeed;
        smoothedGroupPos.current.y += (targetY - smoothedGroupPos.current.y) * posLerpSpeed;
        smoothedGroupPos.current.z += (targetZ - smoothedGroupPos.current.z) * posLerpSpeed;

        groupRef.current.position.x = smoothedGroupPos.current.x;
        groupRef.current.position.y = smoothedGroupPos.current.y;
        groupRef.current.position.z = smoothedGroupPos.current.z;

        // Reduce rotation intensity when formed
        groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.08 * floatIntensity;

        // Current positions of all stars (for updating line geometry)
        const currentPositions: Array<{ x: number; y: number; z: number }> = [];

        starRefs.current.forEach((sprite, i) => {
            if (!sprite) return;
            const p = twinklePhases[i];
            const scatter = scatteredOffsets[i];
            const star = stars[i];

            // Final constellation position
            const finalX = star.x * scale;
            const finalY = star.y * scale;
            const finalZ = star.z * scale;

            // Scattered position with gentle drifting motion - reduce drift when formed
            const driftReduction = 1 - formationProgress * 0.85; // Almost stop drifting when formed
            const driftX = Math.sin(time * scatter.driftSpeedX + scatter.driftPhaseX) * 0.3 * driftReduction;
            const driftY = Math.sin(time * scatter.driftSpeedY + scatter.driftPhaseY) * 0.3 * driftReduction;
            const scatteredX = finalX + scatter.x * driftReduction + driftX;
            const scatteredY = finalY + scatter.y * driftReduction + driftY;
            const scatteredZ = finalZ + scatter.z * driftReduction;

            // Interpolate between scattered and final position based on formation progress
            const currentX = scatteredX + (finalX - scatteredX) * formationProgress;
            const currentY = scatteredY + (finalY - scatteredY) * formationProgress;
            const currentZ = scatteredZ + (finalZ - scatteredZ) * formationProgress;

            // Update sprite position
            sprite.position.set(currentX, currentY, currentZ);
            currentPositions[i] = { x: currentX, y: currentY, z: currentZ };

            // Twinkle effects
            const slowPulse = Math.sin(time * p.speed1 + p.phase1) * 0.5 + 0.5;
            const mediumShimmer = Math.sin(time * p.speed2 + p.phase2) * 0.5 + 0.5;
            const fastFlicker = Math.sin(time * p.speed3 + p.phase3) * 0.5 + 0.5;
            const sparkleTime = (time + p.sparkleOffset) % 8;
            const sparkle = sparkleTime < 0.15 ? Math.pow(1 - sparkleTime / 0.15, 2) * 1.5 : 0;

            const combinedTwinkle = slowPulse * 0.4 + mediumShimmer * 0.35 + fastFlicker * p.flickerIntensity + sparkle;
            const finalIntensity = p.baseIntensity * (0.6 + combinedTwinkle * 0.6);

            // Color variation
            const colorVar = Math.sin(time * p.colorSpeed + p.colorPhase);
            sprite.material.color.setRGB(1.0, 0.95 + colorVar * 0.05, 0.9 + colorVar * 0.1);

            // Opacity: always visible, brighter when active
            const baseStarOpacity = 0.35 * finalIntensity * tetrisDim;
            const activeBonus = opacity * 1.5 * finalIntensity * sectionOpacity * tetrisDim;
            sprite.material.opacity = baseStarOpacity + activeBonus;

            // Scale: larger when active
            const baseScale = star.size * 0.3;
            const activeScaleBonus = star.size * 0.15 * sectionOpacity;
            const scaleMultiplier = 1 + slowPulse * 0.15 + sparkle * 0.3;
            sprite.scale.setScalar((baseScale + activeScaleBonus) * scaleMultiplier);
        });

        // Update line geometry to follow current star positions
        const positionAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
        connections.forEach(([from, to], idx) => {
            const fromPos = currentPositions[from];
            const toPos = currentPositions[to];
            if (fromPos && toPos) {
                positionAttr.setXYZ(idx * 2, fromPos.x, fromPos.y, fromPos.z);
                positionAttr.setXYZ(idx * 2 + 1, toPos.x, toPos.y, toPos.z);
            }
        });
        positionAttr.needsUpdate = true;

        // Lines only appear when constellation is forming
        if (lineMaterialRef.current) {
            lineMaterialRef.current.opacity = opacity * 0.5 * formationProgress * tetrisDim;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {stars.map((star, i) => (
                <sprite key={i} ref={el => (starRefs.current[i] = el)} position={[star.x * scale, star.y * scale, star.z * scale]}>
                    <spriteMaterial map={starTexture} color="#ffffff" transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
                </sprite>
            ))}
            <lineSegments geometry={lineGeometry}>
                <lineBasicMaterial ref={lineMaterialRef} color="#88aadd" transparent opacity={0} depthWrite={false} />
            </lineSegments>
        </group>
    );
}


// ==================== STAR FIELD (Constellation-styled) ====================
function StarField({ mouse, scroll, tetrisActive }: WireframeIcosahedronProps & { tetrisActive?: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const starRefs = useRef<(THREE.Sprite | null)[]>([]);
    const { viewport } = useThree();
    const starTexture = useMemo(() => getStarTexture(), []);

    // Generate star data with varied sizes and twinkle properties - MORE VISIBLE
    const starsData = useMemo(() => {
        const count = 200; // More stars for a richer background
        return Array.from({ length: count }, () => ({
            position: [
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 15 - 3,
            ] as [number, number, number],
            size: 0.15 + Math.random() * 0.25, // Larger stars
            // Twinkle phases like constellation stars
            phase1: Math.random() * Math.PI * 2,
            speed1: 0.3 + Math.random() * 0.5,
            phase2: Math.random() * Math.PI * 2,
            speed2: 1.5 + Math.random() * 2,
            phase3: Math.random() * Math.PI * 2,
            speed3: 4 + Math.random() * 6,
            baseIntensity: 0.6 + Math.random() * 0.4, // Higher base intensity
            flickerIntensity: 0.15 + Math.random() * 0.25,
            sparkleOffset: Math.random() * 10,
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        const scrollProgress = scroll.current.progress;
        const scrollVelocity = scroll.current.velocity;

        // Rotate entire field slowly
        groupRef.current.rotation.y -= 0.0001 + Math.abs(scrollVelocity) * 0.005;
        groupRef.current.rotation.x -= 0.00005 + Math.abs(scrollVelocity) * 0.002;

        const targetZ = scrollProgress * 3 - 1.5 + (tetrisActive ? 2 : 0);
        groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.02;
        groupRef.current.position.x += ((mouse.current.x * viewport.width) / 40 - groupRef.current.position.x) * 0.01;
        groupRef.current.position.y += ((mouse.current.y * viewport.height) / 40 - groupRef.current.position.y) * 0.01;

        // Animate each star with twinkling
        starRefs.current.forEach((sprite, i) => {
            if (!sprite) return;
            const star = starsData[i];

            // Multi-layered twinkle (same as constellation stars)
            const slowPulse = Math.sin(time * star.speed1 + star.phase1) * 0.5 + 0.5;
            const mediumShimmer = Math.sin(time * star.speed2 + star.phase2) * 0.5 + 0.5;
            const fastFlicker = Math.sin(time * star.speed3 + star.phase3) * 0.5 + 0.5;

            // Random sparkle burst
            const sparkleTime = (time + star.sparkleOffset) % 12;
            const sparkle = sparkleTime < 0.1 ? Math.pow(1 - sparkleTime / 0.1, 2) * 1.2 : 0;

            const combinedTwinkle =
                slowPulse * 0.4 +
                mediumShimmer * 0.35 +
                fastFlicker * star.flickerIntensity +
                sparkle;

            const finalIntensity = star.baseIntensity * (0.6 + combinedTwinkle * 0.5);
            const opacity = (tetrisActive ? 0.7 : 0.6) * finalIntensity; // Much higher opacity

            sprite.material.opacity = opacity;
            sprite.scale.setScalar(star.size * (1 + slowPulse * 0.15 + sparkle * 0.3));
        });
    });

    return (
        <group ref={groupRef}>
            {starsData.map((star, i) => (
                <sprite
                    key={i}
                    ref={(el) => (starRefs.current[i] = el)}
                    position={star.position}
                >
                    <spriteMaterial
                        map={starTexture}
                        color="#ffffff"
                        transparent
                        opacity={0.5}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </sprite>
            ))}
        </group>
    );
}


// Create a smooth gradient trail texture for meteors
function getMeteorTrailTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Create smooth horizontal gradient (bright on right/head, fading to left/tail)
    const gradient = ctx.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.02)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

    // Soft vertical gradient for rounded edges
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

// ==================== SHOOTING STAR METEOROIDS ====================
interface MeteorData {
    id: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    size: number;
    life: number;
    maxLife: number;
    angle: number;
    speed: number;
    trailSprite?: THREE.Sprite;
    headSprite?: THREE.Sprite;
}

function Meteoroids({ scroll, tetrisActive }: { scroll: React.MutableRefObject<ScrollData>; tetrisActive?: boolean }) {
    const containerRef = useRef<THREE.Group>(null);
    const meteorsRef = useRef<MeteorData[]>([]);
    const starTexture = useMemo(() => getStarTexture(), []);
    const trailTexture = useMemo(() => getMeteorTrailTexture(), []);
    const idCounterRef = useRef(0);

    const maxMeteoroids = 3;
    const spawnRate = 0.005;

    useFrame(() => {
        if (!containerRef.current) return;

        // Spawn new meteors
        if (meteorsRef.current.length < maxMeteoroids && Math.random() < spawnRate) {
            const startX = 12 + Math.random() * 14;
            const startY = 5 + Math.random() * 12;
            const startZ = -5 + Math.random() * 3;

            const speed = 0.25 + Math.random() * 0.15;
            const angleVar = (Math.random() - 0.5) * 0.3;
            const velocityX = -speed * (0.8 + Math.random() * 0.25);
            const velocityY = -speed * (0.3 + Math.random() * 0.3) + angleVar * speed;
            const velocity = new THREE.Vector3(velocityX, velocityY, 0);
            const angle = Math.atan2(velocityY, velocityX);

            // Create trail sprite (single smooth gradient)
            const trailMat = new THREE.SpriteMaterial({
                map: trailTexture,
                color: new THREE.Color(1, 1, 1),
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });
            const trailSprite = new THREE.Sprite(trailMat);
            containerRef.current.add(trailSprite);

            // Create bright head sprite (star with diffraction spikes)
            const headMat = new THREE.SpriteMaterial({
                map: starTexture,
                color: new THREE.Color(1, 1, 1),
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });
            const headSprite = new THREE.Sprite(headMat);
            containerRef.current.add(headSprite);

            const size = 0.06 + Math.random() * 0.04;

            meteorsRef.current.push({
                id: idCounterRef.current++,
                position: new THREE.Vector3(startX, startY, startZ),
                velocity,
                size,
                life: 0,
                maxLife: 100 + Math.random() * 80,
                angle,
                speed,
                trailSprite,
                headSprite,
            });
        }

        const tetrisDim = tetrisActive ? 0.35 : 1;

        // Update all meteors
        meteorsRef.current.forEach(m => {
            m.position.add(m.velocity);
            m.life++;

            // Fade in/out
            let fade = 1;
            if (m.life < 20) fade = m.life / 20;
            else if (m.life > m.maxLife - 30) fade = (m.maxLife - m.life) / 30;

            const baseOpacity = fade * tetrisDim;
            const trailLength = m.speed * 18; // Length of the trail streak

            // Update trail - positioned behind the head
            if (m.trailSprite) {
                const trailOffsetX = -Math.cos(m.angle) * trailLength * 0.5;
                const trailOffsetY = -Math.sin(m.angle) * trailLength * 0.5;
                m.trailSprite.position.set(
                    m.position.x + trailOffsetX,
                    m.position.y + trailOffsetY,
                    m.position.z
                );
                m.trailSprite.scale.set(trailLength, m.size * 1.5, 1);
                m.trailSprite.material.rotation = m.angle;
                m.trailSprite.material.opacity = baseOpacity * 0.4;
            }

            // Update head
            if (m.headSprite) {
                m.headSprite.position.set(m.position.x, m.position.y, m.position.z + 0.01);
                m.headSprite.scale.set(m.size * 1.2, m.size * 1.2, 1);
                m.headSprite.material.opacity = baseOpacity * 0.7;
            }
        });

        // Remove dead meteors
        meteorsRef.current = meteorsRef.current.filter(m => {
            if (m.life > m.maxLife || m.position.x < -16 || m.position.y < -12) {
                if (containerRef.current) {
                    if (m.trailSprite) {
                        containerRef.current.remove(m.trailSprite);
                        m.trailSprite.material.dispose();
                    }
                    if (m.headSprite) {
                        containerRef.current.remove(m.headSprite);
                        m.headSprite.material.dispose();
                    }
                }
                return false;
            }
            return true;
        });
    });

    return <group ref={containerRef} />;
}


// ==================== SCROLL HOOK ====================
function useScrollProgress() {
    const scrollRef = useRef<ScrollData>({ progress: 0, velocity: 0 });
    const lastScrollY = useRef(0);
    const lastTime = useRef(Date.now());

    useEffect(() => {
        const handleScroll = () => {
            const now = Date.now();
            const dt = (now - lastTime.current) / 1000;
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollY / docHeight : 0;
            const velocity = dt > 0 ? ((scrollY - lastScrollY.current) / window.innerHeight) / dt : 0;
            scrollRef.current.progress = Math.max(0, Math.min(1, progress));
            scrollRef.current.velocity = velocity * 0.1;
            lastScrollY.current = scrollY;
            lastTime.current = now;
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        const decay = setInterval(() => { scrollRef.current.velocity *= 0.9; }, 50);
        return () => { window.removeEventListener('scroll', handleScroll); clearInterval(decay); };
    }, []);

    return scrollRef;
}

// ==================== MAIN SCENE ====================
interface SceneProps {
    mouseRef: React.MutableRefObject<{ x: number; y: number }>;
    scrollRef: React.MutableRefObject<ScrollData>;
    isLoading?: boolean;
    tetrisActive: boolean;
    onTetrisClose: () => void;
}

function Scene({ mouseRef, scrollRef, isLoading = false }: Omit<SceneProps, 'tetrisActive' | 'onTetrisClose'>) {
    return (
        <>
            <color attach="background" args={['#000000']} />
            <fog attach="fog" args={['#000000', 5, 25]} />
            <ambientLight intensity={0.5} />

            <Constellation stars={ARIES_STARS} connections={ARIES_CONNECTIONS} position={[-8, 3, -5]} scale={3} opacity={0.6} scroll={scrollRef} mouse={mouseRef} visibleSections={[{ start: 0, end: 0.4, peakOpacity: 1 }, { start: 0.65, end: 1, peakOpacity: 0.9 }]} tetrisActive={false} />
            <Constellation stars={LIBRA_STARS} connections={LIBRA_CONNECTIONS} position={[8, -2, -6]} scale={3.5} opacity={0.55} scroll={scrollRef} mouse={mouseRef} visibleSections={[{ start: 0.2, end: 0.7, peakOpacity: 1 }, { start: 0.8, end: 1, peakOpacity: 0.85 }]} tetrisActive={false} />

            <WireframeIcosahedron mouse={mouseRef} scroll={scrollRef} isLoading={isLoading} tetrisActive={false} />
            <StarField mouse={mouseRef} scroll={scrollRef} tetrisActive={false} />
            <Meteoroids scroll={scrollRef} tetrisActive={false} />
        </>
    );
}

// ==================== SCENE3D EXPORT ====================
interface Scene3DProps {
    isLoading?: boolean;
}

export default function Scene3D({ isLoading = false }: Scene3DProps) {
    const mouseRef = useRef({ x: 0, y: 0 });
    const scrollRef = useScrollProgress();

    const handleMouseMove = (event: React.MouseEvent) => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    return (
        <div style={{ width: '100%', height: '100%' }} onMouseMove={handleMouseMove}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <Scene mouseRef={mouseRef} scrollRef={scrollRef} isLoading={isLoading} />
            </Canvas>
        </div>
    );
}
