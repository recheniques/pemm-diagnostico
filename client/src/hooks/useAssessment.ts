import { useState, useMemo } from 'react';
import { AssessmentResponse, AssessmentResult, MaturityLevel, Question } from '@/lib/types';
import { ASSESSMENT_QUESTIONS } from '@/lib/questions';

export function useAssessment() {
  const [responses, setResponses] = useState<Map<number, number>>(new Map());
  const [isComplete, setIsComplete] = useState(false);

  const addResponse = (questionId: number, answer: number) => {
    const newResponses = new Map(responses);
    newResponses.set(questionId, answer);
    setResponses(newResponses);
    
    if (newResponses.size === ASSESSMENT_QUESTIONS.length) {
      setIsComplete(true);
    }
  };

  const result = useMemo(() => {
    if (responses.size === 0) return null;

    // Calculate total score
    let totalScore = 0;
    responses.forEach(score => {
      totalScore += score;
    });

    // Calculate area scores
    const infrastructureScores: number[] = [];
    const qualityScores: number[] = [];
    const scalabilityScores: number[] = [];

    ASSESSMENT_QUESTIONS.forEach(q => {
      const score = responses.get(q.id);
      if (score) {
        if (q.area === 'infrastructure') infrastructureScores.push(score);
        else if (q.area === 'quality') qualityScores.push(score);
        else if (q.area === 'scalability') scalabilityScores.push(score);
      }
    });

    const infrastructure = infrastructureScores.length > 0 
      ? infrastructureScores.reduce((a, b) => a + b, 0) / infrastructureScores.length 
      : 0;
    
    const quality = qualityScores.length > 0 
      ? qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length 
      : 0;
    
    const scalability = scalabilityScores.length > 0 
      ? scalabilityScores.reduce((a, b) => a + b, 0) / scalabilityScores.length 
      : 0;

    // Determine maturity level
    let level: MaturityLevel = 1;
    if (totalScore >= 43) level = 5;
    else if (totalScore >= 35) level = 4;
    else if (totalScore >= 27) level = 3;
    else if (totalScore >= 19) level = 2;
    else level = 1;

    // Identify weaknesses and strengths based on scoring rubric
    // Scoring scale: < 3.0 = DEBIL (weaknesses), 3.0-3.5 = EN DESARROLLO (neutral), >= 3.6 = FUERTE (strengths)
    const areas = [
      { name: 'Infraestructura', score: infrastructure, label: 'infrastructure' },
      { name: 'Calidad y Control', score: quality, label: 'quality' },
      { name: 'Escalabilidad', score: scalability, label: 'scalability' }
    ];

    // Classify areas based on score thresholds
    const weaknessAreas = areas.filter(a => a.score < 3.0).sort((a, b) => a.score - b.score);
    const inDevelopmentAreas = areas.filter(a => a.score >= 3.0 && a.score < 3.6).sort((a, b) => a.score - b.score);
    const strengthAreas = areas.filter(a => a.score >= 3.6).sort((a, b) => b.score - a.score);
    
    const weaknesses = weaknessAreas.map(a => ({
      area: a.label,
      score: a.score,
      label: a.name
    }));

    const inDevelopment = inDevelopmentAreas.map(a => ({
      area: a.label,
      score: a.score,
      label: a.name
    }));

    const strengths = strengthAreas.map(a => ({
      area: a.label,
      score: a.score,
      label: a.name
    }));

    // Check for critical alert (Q6: Risk Management)
    const q6Response = responses.get(6);
    const criticalAlert = q6Response !== undefined && q6Response <= 2;

    return {
      totalScore,
      level,
      infrastructure,
      quality,
      scalability,
      weaknesses,
      inDevelopment,
      strengths,
      criticalAlert
    } as AssessmentResult;
  }, [responses]);

  const reset = () => {
    setResponses(new Map());
    setIsComplete(false);
  };

  const progress = (responses.size / ASSESSMENT_QUESTIONS.length) * 100;

  return {
    responses,
    addResponse,
    result,
    isComplete,
    reset,
    progress,
    totalQuestions: ASSESSMENT_QUESTIONS.length,
    answeredQuestions: responses.size
  };
}
