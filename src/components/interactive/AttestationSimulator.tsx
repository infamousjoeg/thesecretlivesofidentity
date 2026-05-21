import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { SpireServer, SpireAgent, Attacker } from '@/components/entities';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

type Scenario = 'success' | 'failure' | 'attack';

interface AttestationStep {
  label: string;
  description: string;
}

/**
 * AttestationSimulator - Interactive node attestation demonstration
 * Shows three scenarios: success, failure, and attack
 */
export const AttestationSimulator: React.FC = () => {
  const { t } = useTranslation('frames');
  const [scenario, setScenario] = useState<Scenario>('success');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const scenarios: Record<Scenario, AttestationStep[]> = {
    success: [
      { label: t('attestationSimulator.success_step0_label', { defaultValue: 'Agent starts' }), description: t('attestationSimulator.success_step0_desc', { defaultValue: 'SPIRE Agent launches on the node' }) },
      { label: t('attestationSimulator.success_step1_label', { defaultValue: 'Platform vouches' }), description: t('attestationSimulator.success_step1_desc', { defaultValue: 'AWS/K8s confirms node identity' }) },
      { label: t('attestationSimulator.success_step2_label', { defaultValue: 'Server verifies' }), description: t('attestationSimulator.success_step2_desc', { defaultValue: 'SPIRE Server validates attestation' }) },
      { label: t('attestationSimulator.success_step3_label', { defaultValue: 'Trust established' }), description: t('attestationSimulator.success_step3_desc', { defaultValue: 'Node receives its SVID!' }) },
    ],
    failure: [
      { label: t('attestationSimulator.failure_step0_label', { defaultValue: 'Unknown agent' }), description: t('attestationSimulator.failure_step0_desc', { defaultValue: 'Unregistered agent tries to connect' }) },
      { label: t('attestationSimulator.failure_step1_label', { defaultValue: 'No matching entry' }), description: t('attestationSimulator.failure_step1_desc', { defaultValue: 'No registration entry found' }) },
      { label: t('attestationSimulator.failure_step2_label', { defaultValue: 'Attestation fails' }), description: t('attestationSimulator.failure_step2_desc', { defaultValue: 'Server rejects the request' }) },
      { label: t('attestationSimulator.failure_step3_label', { defaultValue: 'Access denied' }), description: t('attestationSimulator.failure_step3_desc', { defaultValue: 'No identity issued' }) },
    ],
    attack: [
      { label: t('attestationSimulator.attack_step0_label', { defaultValue: 'Attacker connects' }), description: t('attestationSimulator.attack_step0_desc', { defaultValue: 'Malicious actor attempts attestation' }) },
      { label: t('attestationSimulator.attack_step1_label', { defaultValue: 'Fake credentials' }), description: t('attestationSimulator.attack_step1_desc', { defaultValue: 'Tries to spoof platform identity' }) },
      { label: t('attestationSimulator.attack_step2_label', { defaultValue: 'Verification fails' }), description: t('attestationSimulator.attack_step2_desc', { defaultValue: 'Cryptographic proof invalid' }) },
      { label: t('attestationSimulator.attack_step3_label', { defaultValue: 'Attack blocked' }), description: t('attestationSimulator.attack_step3_desc', { defaultValue: 'No identity—zero access' }) },
    ],
  };

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
            {s === 'success'
              ? t('attestationSimulator.successBtn', { defaultValue: '✓ Success' })
              : s === 'failure'
              ? t('attestationSimulator.failureBtn', { defaultValue: '✗ Failure' })
              : t('attestationSimulator.attackBtn', { defaultValue: '⚠ Attack' })}
          </button>
        ))}
      </div>

      {/* Visualization */}
      <Stage>
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* SPIRE Server */}
          <SpireServer
            label={t('attestationSimulator.spireServerLabel', { defaultValue: 'SPIRE Server' })}
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
                  label={t('attestationSimulator.attackerLabel', { defaultValue: 'Attacker' })}
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
                  label={t('attestationSimulator.spireAgentLabel', { defaultValue: 'SPIRE Agent' })}
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
                {scenario === 'success'
                  ? t('attestationSimulator.platformSuccess', { defaultValue: 'AWS/K8s ✓' })
                  : t('attestationSimulator.platformFailure', { defaultValue: 'No Entry ✗' })}
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
          {step >= currentSteps.length - 1
            ? t('attestationSimulator.replay', { defaultValue: '↺ Replay' })
            : t('attestationSimulator.play', { defaultValue: '▶ Play' })}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-surface border border-textMuted/30 text-textSecondary rounded-lg text-sm font-medium hover:border-textMuted/50"
        >
          {t('attestationSimulator.reset', { defaultValue: 'Reset' })}
        </button>
      </div>
    </div>
  );
};
