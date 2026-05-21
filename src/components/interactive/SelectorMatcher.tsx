import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Stage } from '@/components/visualization/Stage';
import { colors } from '@/utils/constants';

interface Question {
  workload: {
    name: string;
    properties: string[];
  };
  entries: {
    label: string;
    selectors: string[];
    isCorrect: boolean;
  }[];
  explanationKey: string;
}

const questions: Question[] = [
  {
    workload: {
      name: 'payment-api',
      properties: ['k8s:ns:payments', 'k8s:sa:payment-service'],
    },
    entries: [
      { label: 'Entry A', selectors: ['k8s:ns:payments', 'k8s:sa:payment-service'], isCorrect: true },
      { label: 'Entry B', selectors: ['k8s:ns:frontend', 'k8s:sa:web-app'], isCorrect: false },
      { label: 'Entry C', selectors: ['k8s:ns:payments', 'k8s:sa:billing'], isCorrect: false },
    ],
    explanationKey: 'q1_explanation',
  },
  {
    workload: {
      name: 'cache-worker',
      properties: ['docker:label:app=cache', 'unix:uid:1000'],
    },
    entries: [
      { label: 'Entry A', selectors: ['docker:label:app=web'], isCorrect: false },
      { label: 'Entry B', selectors: ['docker:label:app=cache', 'unix:uid:1000'], isCorrect: true },
      { label: 'Entry C', selectors: ['docker:label:app=cache', 'unix:uid:0'], isCorrect: false },
    ],
    explanationKey: 'q2_explanation',
  },
  {
    workload: {
      name: 'database-backup',
      properties: ['k8s:ns:data', 'k8s:pod-label:job=backup'],
    },
    entries: [
      { label: 'Entry A', selectors: ['k8s:ns:data'], isCorrect: false },
      { label: 'Entry B', selectors: ['k8s:ns:data', 'k8s:pod-label:job=backup'], isCorrect: true },
      { label: 'Entry C', selectors: ['k8s:ns:data', 'k8s:pod-label:job=restore'], isCorrect: false },
    ],
    explanationKey: 'q3_explanation',
  },
];

/**
 * SelectorMatcher - Interactive quiz for understanding workload attestation
 * Users match workloads to registration entries based on selectors
 */
export const SelectorMatcher: React.FC = () => {
  const { t } = useTranslation('frames');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (question.entries[selectedAnswer].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="w-full text-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-6xl mb-4">
            {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '📚'}
          </div>
          <h3 className="text-xl font-bold text-textPrimary mb-2">
            {t('selectorMatcher.quizComplete', { defaultValue: 'Quiz Complete!' })}
          </h3>
          <p className="text-textSecondary mb-4">
            {t('selectorMatcher.scoreResult', { score, total: questions.length, defaultValue: `You got ${score} out of ${questions.length} correct` })}
          </p>
          <p className="text-sm text-textMuted mb-6">
            {score === questions.length
              ? t('selectorMatcher.perfectScore', { defaultValue: 'Perfect! You understand workload attestation selectors.' })
              : t('selectorMatcher.partialScore', { defaultValue: 'Selectors must match ALL properties for attestation to succeed.' })}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-2 bg-success text-white rounded-lg font-medium hover:bg-success/90"
          >
            {t('selectorMatcher.tryAgain', { defaultValue: 'Try Again' })}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-textMuted">
          {t('selectorMatcher.questionOf', { current: currentQuestion + 1, total: questions.length, defaultValue: `Question ${currentQuestion + 1} of ${questions.length}` })}
        </span>
        <span className="text-sm text-success font-medium">
          {t('selectorMatcher.scoreLabel', { score, defaultValue: `Score: ${score}` })}
        </span>
      </div>

      {/* Question */}
      <Stage>
        <svg viewBox="0 0 800 350" className="w-full h-full">
          {/* Workload card */}
          <g transform="translate(50, 30)">
            <rect
              x={0}
              y={0}
              width={300}
              height={120}
              rx={12}
              fill={`${colors.svid}15`}
              stroke={colors.svid}
              strokeWidth={2}
            />
            <text
              x={150}
              y={30}
              textAnchor="middle"
              fill={colors.svid}
              fontSize={14}
              fontWeight="bold"
            >
              {t('selectorMatcher.workloadLabel', { defaultValue: 'Workload:' })} {question.workload.name}
            </text>
            <text
              x={150}
              y={55}
              textAnchor="middle"
              fill={colors.textSecondary}
              fontSize={11}
            >
              {t('selectorMatcher.propertiesLabel', { defaultValue: 'Properties:' })}
            </text>
            {question.workload.properties.map((prop, i) => (
              <text
                key={i}
                x={150}
                y={80 + i * 18}
                textAnchor="middle"
                fill={colors.textPrimary}
                fontSize={11}
                fontFamily="JetBrains Mono, monospace"
              >
                {prop}
              </text>
            ))}
          </g>

          {/* Arrow */}
          <g transform="translate(370, 80)">
            <line
              x1={0}
              y1={0}
              x2={50}
              y2={0}
              stroke={colors.textMuted}
              strokeWidth={2}
              markerEnd="url(#quiz-arrow)"
            />
            <text
              x={25}
              y={-10}
              textAnchor="middle"
              fill={colors.textMuted}
              fontSize={10}
            >
              {t('selectorMatcher.matchesQuestion', { defaultValue: 'matches?' })}
            </text>
            <defs>
              <marker
                id="quiz-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L9,3 z" fill={colors.textMuted} />
              </marker>
            </defs>
          </g>

          {/* Entry options */}
          {question.entries.map((entry, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = entry.isCorrect;
            const showStatus = showResult && isSelected;

            let fillColor = colors.surface;
            let strokeColor = colors.textMuted;

            if (isSelected && !showResult) {
              strokeColor = colors.success;
            }
            if (showResult) {
              if (isCorrect) {
                fillColor = `${colors.success}20`;
                strokeColor = colors.success;
              } else if (isSelected) {
                fillColor = `${colors.attacker}20`;
                strokeColor = colors.attacker;
              }
            }

            return (
              <motion.g
                key={i}
                transform={`translate(450, ${30 + i * 110})`}
                onClick={() => handleSelect(i)}
                style={{ cursor: showResult ? 'default' : 'pointer' }}
                whileHover={!showResult ? { scale: 1.02 } : {}}
              >
                <rect
                  x={0}
                  y={0}
                  width={300}
                  height={95}
                  rx={8}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isSelected ? 3 : 2}
                />
                <text
                  x={150}
                  y={25}
                  textAnchor="middle"
                  fill={colors.textPrimary}
                  fontSize={13}
                  fontWeight="bold"
                >
                  {entry.label}
                </text>
                {entry.selectors.map((sel, j) => (
                  <text
                    key={j}
                    x={150}
                    y={50 + j * 18}
                    textAnchor="middle"
                    fill={colors.textSecondary}
                    fontSize={10}
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {sel}
                  </text>
                ))}
                {showStatus && (
                  <text
                    x={280}
                    y={25}
                    fill={isCorrect ? colors.success : colors.attacker}
                    fontSize={18}
                  >
                    {isCorrect ? '✓' : '✗'}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </Stage>

      {/* Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-lg ${
              question.entries[selectedAnswer!].isCorrect
                ? 'bg-success/20 border border-success'
                : 'bg-attacker/20 border border-attacker'
            }`}
          >
            <p className="text-sm text-textPrimary">
              {question.entries[selectedAnswer!].isCorrect
                ? t('selectorMatcher.correct', { defaultValue: '✓ Correct! ' })
                : t('selectorMatcher.notQuite', { defaultValue: '✗ Not quite. ' })}
              {t(`selectorMatcher.${question.explanationKey}`, { defaultValue: '' })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-4">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-success text-white rounded-lg font-medium hover:bg-success/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('selectorMatcher.checkAnswer', { defaultValue: 'Check Answer' })}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-success text-white rounded-lg font-medium hover:bg-success/90"
          >
            {currentQuestion < questions.length - 1
              ? t('selectorMatcher.nextQuestion', { defaultValue: 'Next Question →' })
              : t('selectorMatcher.seeResults', { defaultValue: 'See Results' })}
          </button>
        )}
      </div>
    </div>
  );
};
