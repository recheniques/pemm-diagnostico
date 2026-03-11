import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface AccessKeyAuthProps {
  onAuthenticated: () => void;
}

export function AccessKeyAuth({ onAuthenticated }: AccessKeyAuthProps) {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular delay de verificacion
    await new Promise(resolve => setTimeout(resolve, 500));

    // Clave para acceso Premium
    const VALID_KEY = 'PEMM-DIAGNOSTICO';

    if (accessKey === VALID_KEY) {
      localStorage.setItem('pemm_access_key', accessKey);
      onAuthenticated();
    } else {
      setError('Clave de acceso inválida. Intenta con: PEMM-DIAGNOSTICO');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-editorial-sand flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-montserrat font-bold text-executive-forest">
              PEMM Self-Assessment
            </h1>
            <p className="text-sm text-muted-foreground">
              Acceso exclusivo para compradores del kit
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-carbon-ink mb-2">
                Clave de Acceso
              </label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Ingresa tu clave de acceso"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-forest"
                disabled={isLoading}
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

          <p className="text-xs text-muted-foreground text-center">
            Si no tienes una clave de acceso, adquiere el kit en Hotmart o Notion.
          </p>
        </div>
      </Card>
    </div>
  );
}
