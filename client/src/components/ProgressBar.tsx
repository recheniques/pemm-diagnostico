import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-carbon-ink">
          Pregunta {current} de {total}
        </p>
        <p className="text-sm text-muted-foreground">
          {Math.round(percentage)}%
        </p>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
