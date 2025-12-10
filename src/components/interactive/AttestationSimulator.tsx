import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent, Attacker } from '@/components/entities';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

type Scenario = 'success' | 'failure' | 'attack';

interface AttestationStep {
  label: string;
  description: string;
}

const scenarios: Record<Scenario, AttestationStep[]> = {
  success: [
    { label: 'Agent starts', description: 'SPIRE Agent launches on the node' },
    { label: 'Platform vouches', description: 'AWS/K8s confirms node identity' },
    { label: 'Server verifies', description: 'SPIRE Server validates attestation' },
    { label: 'Trust established', description: 'Node receives its SVID!' },
  ],
  failure: [
    { label: 'Unknown agent', description: 'Unregistered agent tries to connect' },
    { label: 'No matching entry', description: 'No registration entry found' },
    { label: 'Attestation fails', description: 'Server rejects the request' },
    { label: 'Access denied', description: 'No identity issued' },
  ],
  attack: [
    { label: 'Attacker connects', description: 'Malicious actor attempts attestation' },
    { label: 'Fake credentials', description: 'Tries to spoof platform identity' },
    { label: 'Verification fails', description: 'Cryptographic proof invalid' },
    { label: 'Attack blocked', description: 'No identity—zero access' },
  ],
};

/**
 * AttestationSimulator - Interactive node attestation demonstration
 * Shows three scenarios: success, failure, and attack
 */
export const AttestationSimulator: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('success');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const currentSteps = scenarios[scenario];

  useEffect(() => {
    if (isPlaying && step < currentSteps.length - 1) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (step >= currentSteps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, step, currentSteps.length]);

  const handleScenarioChange = (newScenario: Scenario) => {
    setScenario(newScenario);
    setStep(0);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (step >= currentSteps.length - 1) {
      setStep(0);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const getStatusColor = () => {
    if (scenario === 'success' && step === 3) return colors.success;
    if (scenario === 'failure' && step >= 2) return colors.attacker;
    if (scenario === 'attack' && step >= 2) return colors.attacker;
    return colors.textMuted;
  };

  return (
    <div className="w-full">
      {/* Scenario selector */}
      <div className="flex gap-2 mb-4 justify-center">
        {(['success', 'failure', 'attack'] as Scenario[]).map((s) => (
          <button
            key={s}
            onClick={() => handleScenarioChange(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              scenario === s
                ? s === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-surface border border-textMuted/30 text-textSecondary hover:border-textMuted/50'
            }`}
          >
            {s === 'success' ? '✓ Success' : s === 'failure' ? '✗ Failure' : '⚠ Attack'}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <Stage>
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* SPIRE Server */}
          <SpireServer
            label="SPIRE Server"
            position={{ x: 600, y: 200 }}
            size={80}
          />

          {/* Connecting entity based on scenario */}
          <AnimatePresence mode="wait">
            {scenario === 'attack' ? (
              <motion.g
                key="attacker"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <Attacker
                  label="Attacker"
                  position={{ x: 150, y: 200 }}
                  size={60}
                  blocked={step >= 2}
                />
              </motion.g>
            ) : (
              <motion.g
                key="agent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <SpireAgent
                  label="SPIRE Agent"
                  position={{ x: 150, y: 200 }}
                  size={60}
                  active={scenario === 'success' && step >= 3}
                  animate={!prefersReducedMotion}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Connection line */}
          <motion.line
            x1={220}
            y1={200}
            x2={520}
            y2={200}
            stroke={getStatusColor()}
            strokeWidth={3}
            strokeDasharray={step < 3 ? "8 4" : "0"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: step > 0 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Platform box */}
          {step >= 1 && scenario !== 'attack' && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <rect
                x={300}
                y={100}
                width={120}
                height={50}
                rx={8}
                fill={scenario === 'success' ? `${colors.success}20` : `${colors.attacker}20`}
                stroke={scenario === 'success' ? colors.success : colors.attacker}
                strokeWidth={2}
              />
              <text
                x={360}
                y={130}
                textAnchor="middle"
                fill={scenario === 'success' ? colors.success : colors.attacker}
                fontSize={12}
                fontWeight="bold"
              >
                {scenario === 'success' ? 'AWS/K8s ✓' : 'No Entry ✗'}
              </text>
            </motion.g>
          )}

          {/* Attack blocked indicator */}
          {scenario === 'attack' && step >= 2 && (
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <circle
                cx={400}
                cy={200}
                r={30}
                fill={`${colors.attacker}30`}
                stroke={colors.attacker}
                strokeWidth={3}
              />
              <text
                x={400}
                y={208}
                textAnchor="middle"
                fill={colors.attacker}
                fontSize={24}
                fontWeight="bold"
              >
                ✗
              </text>
            </motion.g>
          )}

          {/* Success indicator */}
          {scenario === 'success' && step >= 3 && (
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <circle
                cx={400}
                cy={200}
                r={30}
                fill={`${colors.success}30`}
                stroke={colors.success}
                strokeWidth={3}
              />
              <text
                x={400}
                y={208}
                textAnchor="middle"
                fill={colors.success}
                fontSize={24}
                fontWeight="bold"
              >
                ✓
              </text>
            </motion.g>
          )}

          {/* Step indicators */}
          <g transform="translate(100, 320)">
            {currentSteps.map((s, i) => (
              <g key={i} transform={`translate(${i * 150}, 0)`}>
                <circle
                  cx={0}
                  cy={0}
                  r={12}
                  fill={i <= step ? getStatusColor() : colors.surface}
                  stroke={i <= step ? getStatusColor() : colors.textMuted}
                  strokeWidth={2}
                />
                <text
                  x={0}
                  y={5}
                  textAnchor="middle"
                  fill={i <= step ? 'white' : colors.textMuted}
                  fontSize={10}
                  fontWeight="bold"
                >
                  {i + 1}
                </text>
                <text
                  x={0}
                  y={30}
                  textAnchor="middle"
                  fill={colors.textSecondary}
                  fontSize={10}
                >
                  {s.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </Stage>

      {/* Current step description */}
      <div className="mt-4 text-center">
        <p className="text-textPrimary font-medium">{currentSteps[step].label}</p>
        <p className="text-textSecondary text-sm">{currentSteps[step].description}</p>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-4 justify-center">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-4 py-2 bg-success text-white rounded-lg text-sm font-medium hover:bg-success/90 disabled:opacity-50"
        >
          {step >= currentSteps.length - 1 ? '↺ Replay' : '▶ Play'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-surface border border-textMuted/30 text-textSecondary rounded-lg text-sm font-medium hover:border-textMuted/50"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
