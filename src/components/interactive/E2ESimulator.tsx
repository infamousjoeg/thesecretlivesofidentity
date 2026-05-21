import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { Workload, Badge, TrustBundle } from '@/components/entities';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/utils/constants';

interface Step {
  id: number;
  titleKey: string;
  descKey: string;
  visual: 'initial' | 'client-hello' | 'server-hello' | 'verify-client' | 'verify-server' | 'success' | 'failure';
}

const successSteps: Step[] = [
  { id: 0, titleKey: 'success_step0_title', descKey: 'success_step0_desc', visual: 'initial' },
  { id: 1, titleKey: 'success_step1_title', descKey: 'success_step1_desc', visual: 'client-hello' },
  { id: 2, titleKey: 'success_step2_title', descKey: 'success_step2_desc', visual: 'server-hello' },
  { id: 3, titleKey: 'success_step3_title', descKey: 'success_step3_desc', visual: 'verify-server' },
  { id: 4, titleKey: 'success_step4_title', descKey: 'success_step4_desc', visual: 'verify-client' },
  { id: 5, titleKey: 'success_step5_title', descKey: 'success_step5_desc', visual: 'success' },
];

const failureSteps: Step[] = [
  { id: 0, titleKey: 'failure_step0_title', descKey: 'failure_step0_desc', visual: 'initial' },
  { id: 1, titleKey: 'failure_step1_title', descKey: 'failure_step1_desc', visual: 'client-hello' },
  { id: 2, titleKey: 'failure_step2_title', descKey: 'failure_step2_desc', visual: 'server-hello' },
  { id: 3, titleKey: 'failure_step3_title', descKey: 'failure_step3_desc', visual: 'failure' },
];

/**
 * E2ESimulator - Interactive mTLS handshake visualization
 * Shows step-by-step mutual TLS with success and failure branches
 */
export const E2ESimulator: React.FC = () => {
  const { t } = useTranslation('frames');
  const [mode, setMode] = useState<'success' | 'failure'>('success');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const steps = mode === 'success' ? successSteps : failureSteps;
  const currentStep = steps[step];

  useEffect(() => {
    if (isPlaying && step < steps.length - 1) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (step >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, step, steps.length]);

  const handleModeChange = (newMode: 'success' | 'failure') => {
    setMode(newMode);
    setStep(0);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (step >= steps.length - 1) {
      setStep(0);
    }
    setIsPlaying(true);
  };

  const handleStepForward = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    }
  };

  const handleStepBack = () => {
    if (step > 0) {
      setStep(s => s - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="w-full">
      {/* Mode selector */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => handleModeChange('success')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'success'
              ? 'bg-success text-white'
              : 'bg-surface border border-textMuted/30 text-textSecondary hover:border-textMuted/50'
          }`}
        >
          {t('e2eSimulator.sameTrustDomain', { defaultValue: '✓ Same Trust Domain' })}
        </button>
        <button
          onClick={() => handleModeChange('failure')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'failure'
              ? 'bg-attacker text-white'
              : 'bg-surface border border-textMuted/30 text-textSecondary hover:border-textMuted/50'
          }`}
        >
          {t('e2eSimulator.differentTrustDomain', { defaultValue: '✗ Different Trust Domain' })}
        </button>
      </div>

      {/* Visualization */}
      <Stage>
        <svg viewBox="0 0 800 380" className="w-full h-full">
          {/* Client side */}
          <g transform="translate(100, 100)">
            <Workload
              label={t('e2eSimulator.clientLabel', { defaultValue: 'Client' })}
              position={{ x: 0, y: 0 }}
              size={60}
              attested={true}
            />
            <Badge
              spiffeId="client"
              position={{ x: 0, y: 80 }}
              state="valid"
              size={40}
              animate={!prefersReducedMotion}
            />
            <TrustBundle
              label={t('e2eSimulator.trustBundleLabel', { defaultValue: 'Trust Bundle' })}
              position={{ x: 0, y: 160 }}
              certCount={1}
              size={40}
            />
            <text
              x={0}
              y={220}
              textAnchor="middle"
              fill={colors.textMuted}
              fontSize={10}
            >
              {t('e2eSimulator.containsAcmeCa', { defaultValue: 'Contains: acme.com CA' })}
            </text>
          </g>

          {/* Server side */}
          <g transform="translate(700, 100)">
            <Workload
              label={t('e2eSimulator.serverLabel', { defaultValue: 'Server' })}
              position={{ x: 0, y: 0 }}
              size={60}
              attested={true}
            />
            <Badge
              spiffeId="server"
              position={{ x: 0, y: 80 }}
              state={mode === 'failure' && step >= 3 ? 'expired' : 'valid'}
              size={40}
              animate={!prefersReducedMotion}
            />
            <TrustBundle
              label={t('e2eSimulator.trustBundleLabel', { defaultValue: 'Trust Bundle' })}
              position={{ x: 0, y: 160 }}
              certCount={1}
              size={40}
            />
            <text
              x={0}
              y={220}
              textAnchor="middle"
              fill={colors.textMuted}
              fontSize={10}
            >
              {mode === 'success'
                ? t('e2eSimulator.containsAcmeCa', { defaultValue: 'Contains: acme.com CA' })
                : t('e2eSimulator.containsOtherCa', { defaultValue: 'Contains: other.com CA' })}
            </text>
          </g>

          {/* Connection visualization */}
          <g transform="translate(400, 150)">
            {/* Base line */}
            <line
              x1={-200}
              y1={0}
              x2={200}
              y2={0}
              stroke={colors.surface}
              strokeWidth={4}
            />

            {/* Animated certificate exchange */}
            <AnimatePresence mode="wait">
              {currentStep.visual === 'client-hello' && (
                <motion.g
                  key="client-hello"
                  initial={{ x: -150 }}
                  animate={{ x: 100 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                  <rect
                    x={-30}
                    y={-15}
                    width={60}
                    height={30}
                    rx={4}
                    fill={colors.svid}
                  />
                  <text
                    x={0}
                    y={5}
                    textAnchor="middle"
                    fill="white"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    SVID →
                  </text>
                </motion.g>
              )}

              {currentStep.visual === 'server-hello' && (
                <motion.g
                  key="server-hello"
                  initial={{ x: 150 }}
                  animate={{ x: -100 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                  <rect
                    x={-30}
                    y={-15}
                    width={60}
                    height={30}
                    rx={4}
                    fill={mode === 'failure' ? colors.attacker : colors.svid}
                  />
                  <text
                    x={0}
                    y={5}
                    textAnchor="middle"
                    fill="white"
                    fontSize={10}
                    fontWeight="bold"
                  >
                    ← SVID
                  </text>
                </motion.g>
              )}

              {currentStep.visual === 'verify-server' && (
                <motion.g
                  key="verify-server"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <circle cx={-100} cy={50} r={25} fill={`${colors.success}30`} stroke={colors.success} strokeWidth={2} />
                  <text x={-100} y={55} textAnchor="middle" fill={colors.success} fontSize={16}>✓</text>
                  <text x={-100} y={90} textAnchor="middle" fill={colors.success} fontSize={10}>
                    {t('e2eSimulator.clientVerifies', { defaultValue: 'Client verifies' })}
                  </text>
                </motion.g>
              )}

              {currentStep.visual === 'verify-client' && (
                <motion.g
                  key="verify-client"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <circle cx={-100} cy={50} r={25} fill={`${colors.success}30`} stroke={colors.success} strokeWidth={2} />
                  <text x={-100} y={55} textAnchor="middle" fill={colors.success} fontSize={16}>✓</text>
                  <circle cx={100} cy={50} r={25} fill={`${colors.success}30`} stroke={colors.success} strokeWidth={2} />
                  <text x={100} y={55} textAnchor="middle" fill={colors.success} fontSize={16}>✓</text>
                  <text x={0} y={90} textAnchor="middle" fill={colors.success} fontSize={10}>
                    {t('e2eSimulator.bothVerify', { defaultValue: 'Both verify!' })}
                  </text>
                </motion.g>
              )}

              {currentStep.visual === 'success' && (
                <motion.g
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <rect
                    x={-180}
                    y={-5}
                    width={360}
                    height={10}
                    rx={5}
                    fill={colors.success}
                  />
                  <motion.rect
                    x={-180}
                    y={-5}
                    width={360}
                    height={10}
                    rx={5}
                    fill={`${colors.success}50`}
                    animate={!prefersReducedMotion ? { opacity: [0.3, 0.7, 0.3] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <text x={0} y={40} textAnchor="middle" fill={colors.success} fontSize={14} fontWeight="bold">
                    {t('e2eSimulator.encryptedChannel', { defaultValue: '🔒 Encrypted mTLS Channel' })}
                  </text>
                </motion.g>
              )}

              {currentStep.visual === 'failure' && (
                <motion.g
                  key="failure"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <circle cx={0} cy={0} r={40} fill={`${colors.attacker}30`} stroke={colors.attacker} strokeWidth={3} />
                  <text x={0} y={8} textAnchor="middle" fill={colors.attacker} fontSize={30}>✗</text>
                  <text x={0} y={60} textAnchor="middle" fill={colors.attacker} fontSize={12} fontWeight="bold">
                    {t('e2eSimulator.connectionRefused', { defaultValue: 'Connection Refused' })}
                  </text>
                  <text x={0} y={80} textAnchor="middle" fill={colors.textMuted} fontSize={10}>
                    {t('e2eSimulator.serverCaNotTrusted', { defaultValue: 'Server CA not trusted' })}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </g>

          {/* Step indicator */}
          <g transform="translate(150, 340)">
            {steps.map((_, i) => (
              <g key={i} transform={`translate(${i * (500 / (steps.length - 1))}, 0)`}>
                <circle
                  cx={0}
                  cy={0}
                  r={10}
                  fill={i <= step ? (mode === 'failure' && i === steps.length - 1 ? colors.attacker : colors.success) : colors.surface}
                  stroke={i <= step ? (mode === 'failure' && i === steps.length - 1 ? colors.attacker : colors.success) : colors.textMuted}
                  strokeWidth={2}
                />
                <text
                  x={0}
                  y={4}
                  textAnchor="middle"
                  fill={i <= step ? 'white' : colors.textMuted}
                  fontSize={8}
                  fontWeight="bold"
                >
                  {i + 1}
                </text>
              </g>
            ))}
            {/* Connecting line */}
            <line
              x1={0}
              y1={0}
              x2={500}
              y2={0}
              stroke={colors.textMuted}
              strokeWidth={1}
              style={{ zIndex: -1 }}
            />
          </g>
        </svg>
      </Stage>

      {/* Step description */}
      <div className="mt-4 text-center">
        <h4 className="text-lg font-bold text-textPrimary">
          {t(`e2eSimulator.${currentStep.titleKey}`, { defaultValue: currentStep.titleKey })}
        </h4>
        <p className="text-textSecondary">
          {t(`e2eSimulator.${currentStep.descKey}`, { defaultValue: currentStep.descKey })}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={handleStepBack}
          disabled={step === 0}
          className="px-3 py-2 bg-surface border border-textMuted/30 text-textSecondary rounded-lg font-medium hover:border-textMuted/50 disabled:opacity-50"
        >
          {t('e2eSimulator.back', { defaultValue: '← Back' })}
        </button>
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-4 py-2 bg-success text-white rounded-lg font-medium hover:bg-success/90 disabled:opacity-50"
        >
          {step >= steps.length - 1
            ? t('e2eSimulator.replay', { defaultValue: '↺ Replay' })
            : t('e2eSimulator.autoPlay', { defaultValue: '▶ Auto Play' })}
        </button>
        <button
          onClick={handleStepForward}
          disabled={step >= steps.length - 1}
          className="px-3 py-2 bg-surface border border-textMuted/30 text-textSecondary rounded-lg font-medium hover:border-textMuted/50 disabled:opacity-50"
        >
          {t('e2eSimulator.next', { defaultValue: 'Next →' })}
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-2 bg-surface border border-textMuted/30 text-textSecondary rounded-lg font-medium hover:border-textMuted/50"
        >
          {t('e2eSimulator.reset', { defaultValue: 'Reset' })}
        </button>
      </div>
    </div>
  );
};
