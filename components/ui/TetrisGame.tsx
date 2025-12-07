'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Tetris configuration
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

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

interface Piece {
    shape: number[][];
    color: string;
    x: number;
    y: number;
}

const createEmptyBoard = (): Board =>
    Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));

const getRandomTetromino = () => {
    const types = Object.keys(TETROMINOES) as TetrominoType[];
    const tetromino = TETROMINOES[types[Math.floor(Math.random() * types.length)]];
    // Deep copy the shape array to prevent mutation issues
    return { shape: tetromino.shape.map(row => [...row]), color: tetromino.color };
};

const rotatePiece = (shape: number[][]): number[][] => {
    const rows = shape.length;
    const cols = shape[0].length;
    const rotated: number[][] = [];
    for (let col = 0; col < cols; col++) {
        const newRow: number[] = [];
        for (let row = rows - 1; row >= 0; row--) {
            newRow.push(shape[row][col]);
        }
        rotated.push(newRow);
    }
    return rotated;
};

export default function TetrisGame() {
    const [phase, setPhase] = useState<'hidden' | 'glitching' | 'shutdown' | 'crt-on' | 'booting' | 'playing'>('hidden');
    const [bootLine, setBootLine] = useState(0);
    const [board, setBoard] = useState<Board>(createEmptyBoard);
    const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
    const [nextPiece, setNextPiece] = useState<{ shape: number[][]; color: string } | null>(null);
    const [holdPiece, setHoldPiece] = useState<{ shape: number[][]; color: string } | null>(null);
    const [hasHeldThisTurn, setHasHeldThisTurn] = useState(false);
    const [score, setScore] = useState(0);
    const [lines, setLines] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const konamiRef = useRef<string[]>([]);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const nextPieceRef = useRef<{ shape: number[][]; color: string } | null>(null);

    const KONAMI_CODE = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    const BOOT_MESSAGES = [
        '> SYSTEM FAILURE DETECTED',
        '> Initiating recovery protocol...',
        '> Loading TETRIS.EXE',
        '> Ready_',
    ];

    // Phase sequence controller
    useEffect(() => {
        if (phase === 'glitching') {
            document.body.classList.add('tetris-website-glitch');
            const timer = setTimeout(() => {
                document.body.classList.remove('tetris-website-glitch');
                setPhase('shutdown');
            }, 350);
            return () => clearTimeout(timer);
        }

        if (phase === 'shutdown') {
            const timer = setTimeout(() => {
                setPhase('crt-on');
            }, 700);
            return () => clearTimeout(timer);
        }

        if (phase === 'crt-on') {
            const timer = setTimeout(() => {
                setBootLine(0);
                setPhase('booting');
            }, 800); // CRT warm-up time
            return () => clearTimeout(timer);
        }

        if (phase === 'booting') {
            if (bootLine < BOOT_MESSAGES.length) {
                const timer = setTimeout(() => setBootLine(prev => prev + 1), 350);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => setPhase('playing'), 200);
                return () => clearTimeout(timer);
            }
        }
    }, [phase, bootLine]);

    // Listen for Konami code
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (phase !== 'hidden') return;

            konamiRef.current.push(e.code);
            konamiRef.current = konamiRef.current.slice(-10);

            if (konamiRef.current.join(',') === KONAMI_CODE.join(',')) {
                setPhase('glitching');
                konamiRef.current = [];
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [phase]);

    // Keep ref in sync with state
    useEffect(() => {
        nextPieceRef.current = nextPiece;
    }, [nextPiece]);

    // Game logic
    const spawnPiece = useCallback(() => {
        const piece = nextPieceRef.current || getRandomTetromino();
        const newPiece: Piece = {
            // Deep copy shape to prevent mutation issues
            shape: piece.shape.map(row => [...row]),
            color: piece.color,
            x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
            y: 0,
        };
        const newNext = getRandomTetromino();
        nextPieceRef.current = newNext;
        setNextPiece(newNext);
        setHasHeldThisTurn(false);
        return newPiece;
    }, []);

    const checkCollision = useCallback(
        (piece: Piece, boardState: Board, offsetX = 0, offsetY = 0): boolean => {
            for (let y = 0; y < piece.shape.length; y++) {
                for (let x = 0; x < piece.shape[y].length; x++) {
                    if (piece.shape[y][x]) {
                        const newX = piece.x + x + offsetX;
                        const newY = piece.y + y + offsetY;
                        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT ||
                            (newY >= 0 && boardState[newY][newX])) return true;
                    }
                }
            }
            return false;
        }, []
    );

    const mergePiece = useCallback((piece: Piece, boardState: Board): Board => {
        const newBoard = boardState.map((row) => [...row]);
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const boardY = piece.y + y;
                    const boardX = piece.x + x;
                    if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                        newBoard[boardY][boardX] = piece.color;
                    }
                }
            }
        }
        return newBoard;
    }, []);

    const clearLines = useCallback((boardState: Board) => {
        const newBoard = boardState.filter((row) => row.some((cell) => !cell));
        const clearedLines = BOARD_HEIGHT - newBoard.length;
        while (newBoard.length < BOARD_HEIGHT) newBoard.unshift(Array(BOARD_WIDTH).fill(null));
        return { newBoard, clearedLines };
    }, []);

    const startGame = useCallback(() => {
        setBoard(createEmptyBoard());
        setScore(0);
        setLines(0);
        setLevel(1);
        setGameOver(false);
        setIsPaused(false);
        setIsPlaying(true);
        setHoldPiece(null);
        setHasHeldThisTurn(false);
        const nextP = getRandomTetromino();
        nextPieceRef.current = nextP;
        setNextPiece(nextP);
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
            if (currentPiece.y <= 0) {
                setGameOver(true);
                setIsPlaying(false);
                return;
            }
            const mergedBoard = mergePiece(currentPiece, board);
            const { newBoard, clearedLines } = clearLines(mergedBoard);
            setBoard(newBoard);
            if (clearedLines > 0) {
                setScore((prev) => prev + [0, 100, 300, 500, 800][clearedLines] * level);
                setLines((prev) => {
                    const newLines = prev + clearedLines;
                    setLevel(Math.floor(newLines / 10) + 1);
                    return newLines;
                });
            }
            const newPiece = spawnPiece();
            if (checkCollision(newPiece, newBoard)) {
                setGameOver(true);
                setIsPlaying(false);
            } else setCurrentPiece(newPiece);
        } else {
            setCurrentPiece((prev) => (prev ? { ...prev, y: prev.y + 1 } : null));
        }
    }, [currentPiece, board, gameOver, isPaused, checkCollision, mergePiece, clearLines, spawnPiece, level]);

    useEffect(() => {
        if (isPlaying && !isPaused && !gameOver) {
            const speed = Math.max(100, 1000 - (level - 1) * 100);
            gameLoopRef.current = setInterval(moveDown, speed);
            return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
        }
    }, [isPlaying, isPaused, gameOver, level, moveDown]);

    // Hold piece function
    const holdCurrentPiece = useCallback(() => {
        if (!currentPiece || hasHeldThisTurn || gameOver || isPaused) return;

        // Deep copy current piece shape to store in hold
        const currentShape = {
            shape: currentPiece.shape.map(row => [...row]),
            color: currentPiece.color
        };

        if (holdPiece) {
            // Swap with held piece - deep copy held piece shape
            const newPiece: Piece = {
                shape: holdPiece.shape.map(row => [...row]),
                color: holdPiece.color,
                x: Math.floor(BOARD_WIDTH / 2) - Math.floor(holdPiece.shape[0].length / 2),
                y: 0,
            };
            if (!checkCollision(newPiece, board)) {
                setHoldPiece(currentShape);
                setCurrentPiece(newPiece);
                setHasHeldThisTurn(true);
            }
        } else {
            // First hold - spawn next piece
            setHoldPiece(currentShape);
            const newPiece = spawnPiece();
            if (checkCollision(newPiece, board)) {
                setGameOver(true);
                setIsPlaying(false);
            } else {
                setCurrentPiece(newPiece);
                setHasHeldThisTurn(true);
            }
        }
    }, [currentPiece, holdPiece, hasHeldThisTurn, gameOver, isPaused, board, checkCollision, spawnPiece]);

    // Hard drop function - locks piece immediately
    const hardDrop = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;

        // Calculate final drop position
        let dropY = 0;
        while (!checkCollision(currentPiece, board, 0, dropY + 1)) dropY++;

        const droppedPiece = { ...currentPiece, y: currentPiece.y + dropY };

        // Check for game over
        if (droppedPiece.y <= 0) {
            setGameOver(true);
            setIsPlaying(false);
            return;
        }

        // Merge piece and clear lines
        const mergedBoard = mergePiece(droppedPiece, board);
        const { newBoard, clearedLines } = clearLines(mergedBoard);
        setBoard(newBoard);

        // Add bonus score for hard drop (2 points per cell dropped)
        const hardDropBonus = dropY * 2;

        if (clearedLines > 0) {
            setScore((prev) => prev + [0, 100, 300, 500, 800][clearedLines] * level + hardDropBonus);
            setLines((prev) => {
                const newLines = prev + clearedLines;
                setLevel(Math.floor(newLines / 10) + 1);
                return newLines;
            });
        } else {
            setScore((prev) => prev + hardDropBonus);
        }

        // Spawn next piece
        const newPiece = spawnPiece();
        if (checkCollision(newPiece, newBoard)) {
            setGameOver(true);
            setIsPlaying(false);
        } else {
            setCurrentPiece(newPiece);
        }
    }, [currentPiece, board, gameOver, isPaused, checkCollision, mergePiece, clearLines, spawnPiece, level]);

    useEffect(() => {
        if (phase !== 'playing' || !isPlaying || gameOver) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isPaused && e.key !== 'p' && e.key !== 'P' && e.key !== 'Escape') return;
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentPiece && !checkCollision(currentPiece, board, -1, 0))
                        setCurrentPiece((prev) => (prev ? { ...prev, x: prev.x - 1 } : null));
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentPiece && !checkCollision(currentPiece, board, 1, 0))
                        setCurrentPiece((prev) => (prev ? { ...prev, x: prev.x + 1 } : null));
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
                    hardDrop();
                    break;
                case 'c': case 'C':
                    e.preventDefault();
                    holdCurrentPiece();
                    break;
                case 'p': case 'P':
                    setIsPaused((prev) => !prev);
                    break;
                case 'Escape':
                    closeGame();
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [phase, isPlaying, isPaused, gameOver, currentPiece, board, checkCollision, moveDown, hardDrop, holdCurrentPiece]);

    const closeGame = () => {
        // Quick shutdown on close
        setPhase('shutdown');
        setTimeout(() => {
            setPhase('hidden');
            setIsPlaying(false);
        }, 500);
    };

    const renderBoard = () => {
        const displayBoard = board.map((row) => [...row]);
        // Draw ghost piece (preview of where piece will land)
        if (currentPiece) {
            let ghostY = 0;
            while (!checkCollision(currentPiece, board, 0, ghostY + 1)) ghostY++;
            for (let y = 0; y < currentPiece.shape.length; y++) {
                for (let x = 0; x < currentPiece.shape[y].length; x++) {
                    if (currentPiece.shape[y][x]) {
                        const boardY = currentPiece.y + y + ghostY;
                        const boardX = currentPiece.x + x;
                        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH && !displayBoard[boardY][boardX]) {
                            displayBoard[boardY][boardX] = currentPiece.color + '40'; // Ghost with low opacity
                        }
                    }
                }
            }
        }
        // Draw current piece on top
        if (currentPiece) {
            for (let y = 0; y < currentPiece.shape.length; y++) {
                for (let x = 0; x < currentPiece.shape[y].length; x++) {
                    if (currentPiece.shape[y][x]) {
                        const boardY = currentPiece.y + y;
                        const boardX = currentPiece.x + x;
                        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH)
                            displayBoard[boardY][boardX] = currentPiece.color;
                    }
                }
            }
        }
        return displayBoard.map((row, y) => (
            <div key={y} style={{ display: 'flex' }}>
                {row.map((cell, x) => (
                    <div key={x} className={`tetris-cell ${cell ? 'filled' : ''}`} style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        background: cell || 'rgba(0, 255, 65, 0.03)',
                        border: `1px solid ${cell ? cell + '88' : 'rgba(0, 255, 65, 0.12)'}`,
                        boxShadow: cell ? `0 0 8px ${cell}66, inset 0 0 3px rgba(255,255,255,0.4)` : 'none',
                    }} />
                ))}
            </div>
        ));
    };

    const renderNextPiece = () => {
        if (!nextPiece) return null;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {nextPiece.shape.map((row, y) => (
                    <div key={y} style={{ display: 'flex' }}>
                        {row.map((cell, x) => (
                            <div key={x} style={{
                                width: 12,
                                height: 12,
                                background: cell ? nextPiece.color : 'transparent',
                                border: cell ? `1px solid ${nextPiece.color}88` : 'none',
                                boxShadow: cell ? `0 0 4px ${nextPiece.color}66` : 'none',
                            }} />
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const renderHoldPiece = () => {
        if (!holdPiece) return <div style={{ minHeight: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 9, color: 'rgba(0, 255, 65, 0.3)' }}>EMPTY</div>;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {holdPiece.shape.map((row, y) => (
                    <div key={y} style={{ display: 'flex' }}>
                        {row.map((cell, x) => (
                            <div key={x} style={{
                                width: 12,
                                height: 12,
                                background: cell ? (hasHeldThisTurn ? holdPiece.color + '66' : holdPiece.color) : 'transparent',
                                border: cell ? `1px solid ${holdPiece.color}88` : 'none',
                                boxShadow: cell ? `0 0 4px ${holdPiece.color}66` : 'none',
                                opacity: hasHeldThisTurn ? 0.5 : 1,
                            }} />
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {/* Global Glitch Styles - injected into document */}
            <style jsx global>{`
                :root {
                    --glitch-offset: 0px;
                    --glitch-skew: 0deg;
                }

                .tetris-website-glitch {
                    animation: websiteGlitch 0.1s infinite;
                }

                .tetris-website-glitch * {
                    animation: rgbSplit 0.15s infinite;
                }

                .tetris-website-glitch .main-content {
                    filter: contrast(1.2) brightness(1.1);
                    transform: translateX(var(--glitch-offset)) skewX(var(--glitch-skew));
                }

                .tetris-website-glitch .canvas-container {
                    filter: hue-rotate(90deg) saturate(2);
                }

                .tetris-website-glitch::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background: repeating-linear-gradient(
                        0deg,
                        transparent 0px,
                        rgba(0, 255, 65, 0.03) 1px,
                        transparent 2px,
                        transparent 4px
                    );
                    pointer-events: none;
                    z-index: 10000;
                    animation: scanlineGlitch 0.1s infinite;
                }

                .tetris-website-glitch::after {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 0, 0, 0.08),
                        transparent 33%,
                        rgba(0, 255, 0, 0.08) 33%,
                        transparent 66%,
                        rgba(0, 0, 255, 0.08) 66%
                    );
                    pointer-events: none;
                    z-index: 10001;
                    mix-blend-mode: overlay;
                    animation: rgbBars 0.2s infinite;
                }

                @keyframes websiteGlitch {
                    0%, 100% { filter: none; }
                    10% { filter: brightness(1.5) contrast(1.3); }
                    20% { filter: invert(0.1); }
                    30% { filter: hue-rotate(45deg); }
                    40% { filter: brightness(0.8); }
                    50% { filter: saturate(2); }
                    60% { filter: contrast(1.5); }
                    70% { filter: brightness(1.2) hue-rotate(-45deg); }
                    80% { filter: invert(0.05); }
                    90% { filter: saturate(0.5); }
                }

                @keyframes rgbSplit {
                    0%, 100% { text-shadow: none; }
                    25% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; }
                    50% { text-shadow: 2px 0 #ff0000, -2px 0 #00ffff; }
                    75% { text-shadow: -1px 0 #00ff00, 1px 0 #ff00ff; }
                }

                @keyframes scanlineGlitch {
                    0% { opacity: 0.3; }
                    50% { opacity: 0.8; }
                    100% { opacity: 0.3; }
                }

                @keyframes rgbBars {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                /* Materialize animation */
                @keyframes materialize {
                    0% {
                        opacity: 0;
                        transform: scale(0.8) rotateX(45deg);
                        filter: blur(20px) brightness(3);
                    }
                    30% {
                        opacity: 0.5;
                        filter: blur(10px) brightness(2);
                    }
                    60% {
                        transform: scale(1.02) rotateX(-5deg);
                        filter: blur(2px) brightness(1.3);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) rotateX(0deg);
                        filter: blur(0px) brightness(1);
                    }
                }

                @keyframes voidPulse {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes dataStream {
                    0% { transform: translateY(-100%); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `}</style>

            <AnimatePresence>
                {/* Glitching phase - full screen chaos */}
                {phase === 'glitching' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9998,
                            pointerEvents: 'none',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Glitch text fragments */}
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    x: Math.random() * window.innerWidth,
                                    y: Math.random() * window.innerHeight,
                                }}
                                transition={{ duration: 0.2, delay: i * 0.05 }}
                                style={{
                                    position: 'absolute',
                                    fontFamily: 'monospace',
                                    fontSize: Math.random() * 20 + 10,
                                    color: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff'][i % 5],
                                    textShadow: `0 0 10px currentColor`,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {['ERROR', 'SYSTEM_BREACH', '01001010', 'LOADING...', 'TETRIS.EXE', 'VOID://'][i % 6]}
                            </motion.div>
                        ))}

                        {/* Horizontal glitch bars */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={`bar-${i}`}
                                animate={{
                                    x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
                                    opacity: [0.8, 0],
                                }}
                                transition={{ duration: 0.15, delay: i * 0.03 }}
                                style={{
                                    position: 'absolute',
                                    top: `${Math.random() * 100}%`,
                                    left: 0,
                                    width: '100%',
                                    height: Math.random() * 20 + 5,
                                    background: `linear-gradient(90deg, transparent, ${['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)'][i % 3]}, transparent)`,
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* Shutdown phase - CRT power off effect */}
                {phase === 'shutdown' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        {/* CRT shutdown line - collapses to center */}
                        <motion.div
                            initial={{ scaleY: 1, scaleX: 1 }}
                            animate={{ scaleY: 0.003, scaleX: 0.7 }}
                            transition={{ duration: 0.3, ease: 'easeIn' }}
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(180deg, #000 0%, #fff 48%, #fff 52%, #000 100%)',
                            }}
                        />
                    </motion.div>
                )}

                {/* CRT Power On phase - expands from center line */}
                {phase === 'crt-on' && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        {/* CRT warm-up glow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.3, 0.5, 0.3, 0.6] }}
                            transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(ellipse at center, rgba(0, 255, 65, 0.1) 0%, transparent 70%)',
                            }}
                        />

                        {/* CRT power-on line - expands from center */}
                        <motion.div
                            initial={{ scaleY: 0.003, scaleX: 0.5, opacity: 1 }}
                            animate={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                                scaleY: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                                scaleX: { duration: 0.4, delay: 0.1 }
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                background: '#000',
                                boxShadow: 'inset 0 0 100px rgba(0, 255, 65, 0.05)',
                            }}
                        >
                            {/* Scanline flicker during power-on */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.5, 0.2, 0.8, 0.3] }}
                                transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px)',
                                    pointerEvents: 'none',
                                }}
                            />
                        </motion.div>

                        {/* Static noise during power-on */}
                        <motion.div
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                                mixBlendMode: 'overlay',
                            }}
                        />
                    </motion.div>
                )}

                {/* Booting phase - terminal boot screen */}
                {phase === 'booting' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: '#000',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '20%',
                            fontFamily: 'monospace',
                        }}
                    >
                        {/* CRT screen glow effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(ellipse at center, rgba(0, 255, 65, 0.03) 0%, transparent 60%)',
                                pointerEvents: 'none',
                            }}
                        />
                        {BOOT_MESSAGES.slice(0, bootLine).map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.1 }}
                                style={{
                                    color: i === 0 ? '#ff3333' : '#00ff41',
                                    fontSize: 14,
                                    marginBottom: 8,
                                    textShadow: `0 0 8px ${i === 0 ? '#ff3333' : '#00ff41'}`,
                                }}
                            >
                                {msg}
                            </motion.div>
                        ))}
                        {bootLine < BOOT_MESSAGES.length && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                style={{ color: '#00ff41', fontSize: 14 }}
                            >
                                █
                            </motion.span>
                        )}
                    </motion.div>
                )}

                {/* Playing phase */}
                {phase === 'playing' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Static retro background with subtle grid */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: `
                                radial-gradient(ellipse at center, 
                                    rgba(0, 20, 10, 0.95) 0%, 
                                    rgba(0, 5, 0, 0.98) 50%,
                                    rgba(0, 0, 0, 1) 100%
                                )
                            `,
                        }}>
                            {/* Static grid pattern */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: `
                                    linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
                                `,
                                backgroundSize: '40px 40px',
                                pointerEvents: 'none',
                            }} />
                            {/* Vignette overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%)',
                                pointerEvents: 'none',
                            }} />
                            {/* Subtle ambient glow */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '600px',
                                height: '600px',
                                background: 'radial-gradient(circle, rgba(0, 255, 65, 0.05) 0%, transparent 70%)',
                                pointerEvents: 'none',
                            }} />
                        </div>

                        {/* Game container - CRT materialize animation */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                rotateX: 45,
                                filter: 'blur(20px) brightness(3)'
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotateX: 0,
                                filter: 'blur(0px) brightness(1)'
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                                filter: { duration: 0.6 },
                                scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
                            }}
                            style={{
                                position: 'relative',
                                background: 'linear-gradient(135deg, rgba(0, 30, 15, 0.9) 0%, rgba(0, 10, 5, 0.95) 100%)',
                                borderRadius: 8,
                                padding: 24,
                                border: '1px solid rgba(0, 255, 65, 0.3)',
                                boxShadow: `
                                    0 0 60px rgba(0, 255, 65, 0.2),
                                    0 0 120px rgba(0, 255, 65, 0.1),
                                    inset 0 0 60px rgba(0, 0, 0, 0.5)
                                `,
                                transformStyle: 'preserve-3d',
                                perspective: 1000,
                            }}
                        >
                            {/* Power-on flash overlay */}
                            <motion.div
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: 8,
                                    background: 'linear-gradient(180deg, rgba(0, 255, 65, 0.4) 0%, rgba(0, 255, 65, 0.1) 50%, rgba(0, 255, 65, 0.4) 100%)',
                                    pointerEvents: 'none',
                                    zIndex: 150,
                                }}
                            />
                            {/* Scanlines */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: 8,
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                                pointerEvents: 'none',
                                zIndex: 100,
                            }} />

                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <div style={{
                                    fontFamily: 'monospace',
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: '#00ff41',
                                    textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41',
                                    letterSpacing: 4,
                                }}>
                                    TETRIS
                                </div>
                                <button onClick={closeGame} style={{
                                    background: 'transparent',
                                    border: '1px solid rgba(255, 50, 50, 0.5)',
                                    color: '#ff3333',
                                    padding: '4px 12px',
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    fontFamily: 'monospace',
                                    fontSize: 11,
                                }}>
                                    [ESC]
                                </button>
                            </div>

                            <div style={{ display: 'flex', gap: 20 }}>
                                {/* Board */}
                                <div style={{
                                    border: '2px solid rgba(0, 255, 65, 0.4)',
                                    borderRadius: 4,
                                    padding: 2,
                                    background: 'rgba(0, 0, 0, 0.6)',
                                }}>
                                    {renderBoard()}
                                </div>

                                {/* Side panel */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 90 }}>
                                    {[
                                        { label: 'SCORE', value: score.toString().padStart(6, '0'), color: '#00ff41' },
                                        { label: 'LEVEL', value: level.toString().padStart(2, '0'), color: '#ff00ff' },
                                        { label: 'LINES', value: lines.toString().padStart(3, '0'), color: '#00ffff' },
                                    ].map((stat) => (
                                        <div key={stat.label} style={{
                                            background: 'rgba(0, 255, 65, 0.05)',
                                            border: '1px solid rgba(0, 255, 65, 0.2)',
                                            borderRadius: 4,
                                            padding: 8,
                                            textAlign: 'center',
                                        }}>
                                            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(0, 255, 65, 0.6)', letterSpacing: 1 }}>{stat.label}</div>
                                            <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold', color: stat.color, textShadow: `0 0 8px ${stat.color}` }}>{stat.value}</div>
                                        </div>
                                    ))}

                                    <div style={{ background: 'rgba(0, 255, 65, 0.05)', border: '1px solid rgba(0, 255, 65, 0.2)', borderRadius: 4, padding: 8 }}>
                                        <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(0, 255, 65, 0.6)', letterSpacing: 1, marginBottom: 6 }}>HOLD [C]</div>
                                        <div style={{ display: 'flex', justifyContent: 'center', minHeight: 30 }}>{renderHoldPiece()}</div>
                                    </div>

                                    <div style={{ background: 'rgba(0, 255, 65, 0.05)', border: '1px solid rgba(0, 255, 65, 0.2)', borderRadius: 4, padding: 8 }}>
                                        <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(0, 255, 65, 0.6)', letterSpacing: 1, marginBottom: 6 }}>NEXT</div>
                                        <div style={{ display: 'flex', justifyContent: 'center', minHeight: 30 }}>{renderNextPiece()}</div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                                        {!isPlaying ? (
                                            <button onClick={startGame} style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 4,
                                                padding: 8,
                                                background: 'rgba(0, 255, 65, 0.15)',
                                                border: '1px solid rgba(0, 255, 65, 0.4)',
                                                borderRadius: 4,
                                                color: '#00ff41',
                                                fontFamily: 'monospace',
                                                fontSize: 11,
                                                cursor: 'pointer',
                                            }}>
                                                <Play size={12} /> {gameOver ? 'RETRY' : 'START'}
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => setIsPaused(p => !p)} style={{
                                                    flex: 1,
                                                    padding: 8,
                                                    background: 'rgba(0, 255, 65, 0.1)',
                                                    border: '1px solid rgba(0, 255, 65, 0.3)',
                                                    borderRadius: 4,
                                                    color: '#00ff41',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    {isPaused ? <Play size={12} /> : <Pause size={12} />}
                                                </button>
                                                <button onClick={startGame} style={{
                                                    padding: 8,
                                                    background: 'rgba(0, 255, 65, 0.1)',
                                                    border: '1px solid rgba(0, 255, 65, 0.3)',
                                                    borderRadius: 4,
                                                    color: '#00ff41',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <RotateCcw size={12} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Controls hint */}
                            <div style={{
                                marginTop: 12,
                                padding: 6,
                                background: 'rgba(0, 255, 65, 0.05)',
                                borderRadius: 4,
                                fontFamily: 'monospace',
                                fontSize: 9,
                                color: 'rgba(0, 255, 65, 0.4)',
                                textAlign: 'center',
                            }}>
                                ←→ Move • ↑ Rotate • ↓ Drop • SPACE Hard Drop • C Hold • P Pause
                            </div>

                            {/* Game Over overlay */}
                            {gameOver && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0, 0, 0, 0.9)',
                                        borderRadius: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 200,
                                    }}
                                >
                                    <div style={{ fontFamily: 'monospace', fontSize: 28, color: '#ff3333', textShadow: '0 0 20px #ff3333', marginBottom: 8 }}>GAME OVER</div>
                                    <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#00ff41', marginBottom: 20 }}>SCORE: {score.toLocaleString()}</div>
                                    <button onClick={startGame} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '10px 20px',
                                        background: 'rgba(0, 255, 65, 0.2)',
                                        border: '1px solid rgba(0, 255, 65, 0.5)',
                                        borderRadius: 4,
                                        color: '#00ff41',
                                        fontFamily: 'monospace',
                                        cursor: 'pointer',
                                    }}>
                                        <RotateCcw size={14} /> PLAY AGAIN
                                    </button>
                                </motion.div>
                            )}

                            {/* Paused overlay */}
                            {isPaused && !gameOver && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0, 0, 0, 0.85)',
                                        borderRadius: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 200,
                                    }}
                                >
                                    <div style={{ fontFamily: 'monospace', fontSize: 28, color: '#ffff00', textShadow: '0 0 20px #ffff00', marginBottom: 16 }}>PAUSED</div>
                                    <button onClick={() => setIsPaused(false)} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '10px 20px',
                                        background: 'rgba(0, 255, 65, 0.2)',
                                        border: '1px solid rgba(0, 255, 65, 0.5)',
                                        borderRadius: 4,
                                        color: '#00ff41',
                                        fontFamily: 'monospace',
                                        cursor: 'pointer',
                                    }}>
                                        <Play size={14} /> RESUME
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
