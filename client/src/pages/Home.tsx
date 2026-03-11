import { useState, useRef } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { ASSESSMENT_QUESTIONS } from '@/lib/questions';
import { QuestionCard } from '@/components/QuestionCard';
import { ProgressBar } from '@/components/ProgressBar';
import { EquilateralRadarChart } from '@/components/EquilateralRadarChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generatePEMMReport } from '@/lib/pdfGenerator';
import { AlertCircle, Download } from 'lucide-react';
import { LEVEL_DESCRIPTIONS } from '@/lib/reportContent';

interface HomeProps {
  onResultsReady?: () => void;
  onBackToLanding?: () => void;
}

export default function Home({ onResultsReady, onBackToLanding }: HomeProps = {}) {
  const assessment = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const radarRef = useRef<HTMLDivElement>(null);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const currentAnswer = assessment.responses.get(currentQuestion?.id);

  const handleAnswer = (value: number) => {
    if (currentQuestion) {
      assessment.addResponse(currentQuestion.id, value);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleShowResults = () => {
    if (assessment.isComplete) {
      setShowResults(true);
    }
  };

  const handleDownloadPDF = async () => {
    if (!assessment.result) return;
    
    setIsGeneratingPDF(true);
    try {
      const radarElement = radarRef.current;
      const tier = (localStorage.getItem('pemm_tier') || 'freemium') as 'freemium' | 'premium';
      if (radarElement) {
        await generatePEMMReport(assessment.result, userName || 'Usuario', radarElement, tier);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleReset = () => {
    assessment.reset();
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setUserName('');
    setUserEmail('');
    setHasStarted(false);
  };

  const handleStartAssessment = () => {
    if (userName.trim() && userEmail.trim()) {
      setHasStarted(true);
      setCurrentQuestionIndex(0);
    }
  };

  // Initial screen - User info
  if (!hasStarted && !showResults) {
    return (
      <div className="min-h-screen bg-editorial-sand flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-12 bg-white">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-montserrat font-bold text-executive-forest">
                PEMM Self-Assessment
              </h1>
              <p className="text-lg text-muted-foreground">
                Diagnostico de Madurez en Ingenieria de Prompts
              </p>
            </div>

            <div className="bg-executive-forest/5 border border-executive-forest/20 rounded-lg p-6 space-y-3">
              <p className="text-sm text-carbon-ink leading-relaxed">
                Este diagnostico te ayudara a evaluar el nivel de madurez operacional de tu equipo en ingenieria de prompts. 
                Responde 10 preguntas basadas en evidencia observable, no en sentimientos.
              </p>
              <p className="text-sm font-semibold text-executive-forest">
                Tiempo estimado: 5 minutos
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-carbon-ink mb-2">
                  Tu Nombre (Requerido)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ej: Juan Garcia"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-forest"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-carbon-ink mb-2">
                  Tu Email (Requerido)
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-forest"
                  required
                />
              </div>
            </div>

            <Button
              onClick={handleStartAssessment}
              disabled={!userName.trim() || !userEmail.trim()}
              className="w-full bg-executive-forest hover:bg-executive-forest/90 text-white py-3 rounded-lg font-semibold"
            >
              Comenzar Evaluacion
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Assessment screen
  if (hasStarted && !showResults && currentQuestion) {
    return (
      <div className="min-h-screen bg-editorial-sand p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-montserrat font-bold text-executive-forest">
              PEMM Self-Assessment
            </h1>
          </div>

          <ProgressBar current={currentQuestionIndex + 1} total={ASSESSMENT_QUESTIONS.length} />

          <QuestionCard
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onAnswer={handleAnswer}
          />

          <div className="flex gap-4 justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="flex-1"
            >
              Anterior
            </Button>

            {currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1 ? (
              <Button
                onClick={handleShowResults}
                disabled={!assessment.isComplete}
                className="flex-1 bg-executive-forest hover:bg-executive-forest/90 text-white"
              >
                Ver Resultados
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex-1 bg-executive-forest hover:bg-executive-forest/90 text-white"
              >
                Siguiente
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults && assessment.result) {
    const radarData = [
      { name: 'Infraestructura', value: assessment.result.infrastructure },
      { name: 'Calidad y Control', value: assessment.result.quality },
      { name: 'Escalabilidad', value: assessment.result.scalability }
    ];
    const tier = (localStorage.getItem('pemm_tier') || 'freemium') as 'freemium' | 'premium';
    const isFreemium = tier === 'freemium';
    const levelDesc = LEVEL_DESCRIPTIONS[assessment.result.level as keyof typeof LEVEL_DESCRIPTIONS];

    return (
      <div className="min-h-screen bg-editorial-sand p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">EXPERIENCE ASSET LABS</p>
            <h1 className="text-3xl font-montserrat font-bold text-executive-forest">
              PEMM: Prompt Engineering Maturity Model
            </h1>
            <p className="text-lg font-semibold text-executive-forest">
              Diagnostico de Madurez Operacional
            </p>
          </div>

          {assessment.result.criticalAlert && (
            <Card className="bg-red-50 border-2 border-red-200 p-6">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">
                    Alerta Critica: Riesgo Operacional
                  </h3>
                  <p className="text-sm text-red-800">
                    Tu equipo no tiene un protocolo documentado para gestionar riesgos en los outputs de IA. 
                    Esto requiere atencion inmediata.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-8 bg-white space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Tu Nivel de Madurez</p>
              <p className="text-6xl font-montserrat font-bold text-executive-forest">
                {assessment.result.level}
              </p>
              <p className="text-lg text-carbon-ink">
                Puntaje Total: {assessment.result.totalScore}/50
              </p>
            </div>

            <>
              {/* Radar Chart - Show for both Freemium and Premium */}
              <div className="border-t border-border pt-6">
                <div ref={radarRef} className="mb-6 flex justify-center">
                  <EquilateralRadarChart data={radarData} />
                </div>
              </div>

              {/* Debilidades/Fortalezas section - Only for Premium */}
              {!isFreemium && (
                <>
                  <div className="border-t border-border pt-6">
                    <h3 className="text-xl font-montserrat font-bold text-executive-forest mb-4">
                      Analisis de Debilidades y Fortalezas
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-carbon-ink mb-3">Debilidades</h4>
                      <div className="space-y-2">
                        {assessment.result.weaknesses.length > 0 ? (
                          assessment.result.weaknesses.map((weakness, idx) => (
                            <div key={idx} className="text-sm">
                              <p className="font-medium text-executive-forest">{weakness.label}</p>
                              <p className="text-muted-foreground">{weakness.score.toFixed(1)}/5</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No hay</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-carbon-ink mb-3">En Desarrollo</h4>
                      <div className="space-y-2">
                        {assessment.result.inDevelopment.length > 0 ? (
                          assessment.result.inDevelopment.map((item, idx) => (
                            <div key={idx} className="text-sm">
                              <p className="font-medium text-carbon-ink">{item.label}</p>
                              <p className="text-muted-foreground">{item.score.toFixed(1)}/5</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No hay</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-carbon-ink mb-3">Fortalezas</h4>
                      <div className="space-y-2">
                        {assessment.result.strengths.length > 0 ? (
                          assessment.result.strengths.map((strength, idx) => (
                            <div key={idx} className="text-sm">
                              <p className="font-medium text-muted-gold">{strength.label}</p>
                              <p className="text-muted-foreground">{strength.score.toFixed(1)}/5</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No hay</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Level explanation - Show for both */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-montserrat font-bold text-executive-forest mb-3">
                  Que significa tu Nivel?
                </h3>
                {levelDesc && (
                  <p className="text-sm text-carbon-ink leading-relaxed">
                    {levelDesc.description}
                  </p>
                )}
              </div>

              {/* Premium CTA - Only for Freemium */}
              {isFreemium && (
                <div className="bg-executive-forest/5 border border-executive-forest/20 rounded-lg p-6 space-y-3">
                  <h3 className="text-lg font-montserrat font-bold text-executive-forest">
                    Quieres un analisis completo?
                  </h3>
                  <p className="text-sm text-carbon-ink leading-relaxed">
                    Accede a Premium para obtener un analisis detallado de tus debilidades y fortalezas, mas un Protocolo de 7 Dias personalizado con tareas especificas, entregables y tiempos estimados para mejorar tu madurez en ingenieria de prompts.
                  </p>
                </div>
              )}
            </>
          </Card>

          <div className="flex gap-4">
            <Button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex-1 bg-executive-forest hover:bg-executive-forest/90 text-white flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? 'Generando PDF...' : 'Descargar Informe PDF'}
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1"
            >
              Nueva Evaluacion
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
