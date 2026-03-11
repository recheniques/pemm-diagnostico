import { Question } from '@/lib/types';
import { Card } from '@/components/ui/card';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number;
  onAnswer: (value: number) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswer }: QuestionCardProps) {
  return (
    <Card className="w-full p-8 bg-white border-border">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-montserrat font-bold text-executive-forest">
            {question.question}
          </h3>
          <p className="text-base text-muted-foreground">
            {question.description}
          </p>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.value;
            const borderClass = isSelected 
              ? 'border-executive-forest bg-executive-forest/5' 
              : 'border-border hover:border-executive-forest/30 hover:bg-editorial-sand/50';
            
            return (
              <button
                key={option.value}
                onClick={() => onAnswer(option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${borderClass}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
                      isSelected
                        ? 'border-executive-forest bg-executive-forest'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-carbon-ink">
                      {option.label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
