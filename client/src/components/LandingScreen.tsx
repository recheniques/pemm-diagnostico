import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Lock, Zap, RotateCcw } from 'lucide-react';

interface LandingScreenProps {
  onFreemium: () => void;
  onPremium: () => void;
  onNewEvaluation: () => void;
  hasCompletedEvaluation: boolean;
}

export function LandingScreen({
  onFreemium,
  onPremium,
  onNewEvaluation,
  hasCompletedEvaluation
}: LandingScreenProps) {
  const [showPremiumForm, setShowPremiumForm] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const VALID_KEY = 'PEMM-DIAGNOSTICO';

  const handlePremiumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de verificacion
    await new Promise(resolve => setTimeout(resolve, 500));

    if (accessKey === VALID_KEY) {
      localStorage.setItem('pemm_access_key', accessKey);
      localStorage.setItem('pemm_tier', 'premium');
      onPremium();
    } else {
      setError('Clave de acceso inválida. Intenta con: PEMM-DIAGNOSTICO');
      setIsLoading(false);
    }
  };

  const handleFreemium = () => {
    localStorage.removeItem('pemm_access_key');
    localStorage.setItem('pemm_tier', 'freemium');
    onFreemium();
  };

  if (showPremiumForm) {
    return (
      <div className="min-h-screen bg-editorial-sand flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-white">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-montserrat font-bold text-executive-forest">
                PEMM Self-Assessment
              </h1>
              <p className="text-sm text-muted-foreground">
                Acceso Premium
              </p>
            </div>

            <form onSubmit={handlePremiumSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-carbon-ink mb-2">
                  Clave de Acceso Premium
                </label>
                <input
                  type="password"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="Ingresa tu clave de acceso"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-forest"
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={!accessKey.trim() || isLoading}
                className="w-full bg-executive-forest hover:bg-executive-forest/90 text-white py-3 rounded-lg font-semibold"
              >
                {isLoading ? 'Verificando...' : 'Acceder'}
              </Button>
            </form>

            <Button
              onClick={() => {
                setShowPremiumForm(false);
                setAccessKey('');
                setError('');
              }}
              variant="outline"
              className="w-full"
            >
              Volver
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Si no tienes una clave de acceso, adquiere el kit en Hotmart o Notion.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-editorial-sand flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-montserrat font-bold text-executive-forest mb-3">
            PEMM Self-Assessment
          </h1>
          <p className="text-lg text-carbon-ink">
            Diagnóstico de Madurez en Ingeniería de Prompts
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Evalúa el nivel de madurez operacional de tu equipo en 5 minutos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Freemium Card */}
          <Card className="p-8 bg-white hover:shadow-lg transition-shadow cursor-pointer border-2 border-editorial-sand hover:border-executive-forest/20">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-executive-forest" />
                <h2 className="text-2xl font-montserrat font-bold text-executive-forest">
                  Freemium
                </h2>
              </div>

              <p className="text-sm text-muted-foreground">
                Evaluación rápida y gratuita
              </p>

              <div className="bg-executive-forest/5 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-carbon-ink text-sm">Incluye:</h3>
                <ul className="space-y-1 text-sm text-carbon-ink">
                  <li>✓ 10 preguntas de diagnóstico</li>
                  <li>✓ Nivel de madurez (1-5)</li>
                  <li>✓ Gráfico de radar personalizado</li>
                  <li>✓ PDF con resultados</li>
                </ul>
              </div>

              <Button
                onClick={handleFreemium}
                className="w-full bg-executive-forest hover:bg-executive-forest/90 text-white py-3 rounded-lg font-semibold"
              >
                Comenzar Evaluación Freemium
              </Button>
            </div>
          </Card>

          {/* Premium Card */}
          <Card className="p-8 bg-gradient-to-br from-executive-forest/5 to-muted-gold/5 hover:shadow-lg transition-shadow cursor-pointer border-2 border-muted-gold">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-muted-gold" />
                <h2 className="text-2xl font-montserrat font-bold text-executive-forest">
                  Premium
                </h2>
              </div>

              <p className="text-sm text-muted-foreground">
                Análisis completo + Plan de acción
              </p>

              <div className="bg-muted-gold/10 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-carbon-ink text-sm">Incluye todo de Freemium, más:</h3>
                <ul className="space-y-1 text-sm text-carbon-ink">
                  <li>✓ Análisis detallado de debilidades</li>
                  <li>✓ Análisis de fortalezas actuales</li>
                  <li>✓ Protocolo de 7 Días personalizado</li>
                  <li>✓ Tareas, entregables y tiempos</li>
                </ul>
              </div>

              <Button
                onClick={() => setShowPremiumForm(true)}
                className="w-full bg-white hover:bg-gray-100 text-executive-forest py-3 rounded-lg font-semibold border-2 border-executive-forest"
              >
                Acceder con Clave Premium
              </Button>
            </div>
          </Card>
        </div>

        {/* New Evaluation Card - Only show if user has completed an evaluation */}
        {hasCompletedEvaluation && (
          <Card className="p-6 bg-white border-2 border-muted-foreground/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold text-carbon-ink">
                    ¿Deseas realizar una nueva evaluación?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Limpia tus respuestas anteriores y comienza de nuevo
                  </p>
                </div>
              </div>
              <Button
                onClick={onNewEvaluation}
                variant="outline"
                className="whitespace-nowrap"
              >
                Nueva Evaluación
              </Button>
            </div>
          </Card>
        )}

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            © 2026 Experience Asset Labs. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
// Force redeploy: Mon Mar 10 21:37:00 GMT 2026 - Ensure 2-column landing screen
