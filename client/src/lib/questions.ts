import { Question } from './types';

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Repositorio Centralizado de Prompts',
    description: '¿Existe un repositorio centralizado donde tu equipo documenta y almacena los prompts?',
    area: 'infrastructure',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'Los prompts están en notas personales, emails o no se guardan.'
      },
      {
        value: 2,
        label: 'Informal',
        description: 'Algunos miembros guardan prompts en carpetas compartidas sin estructura.'
      },
      {
        value: 3,
        label: 'Centralizado opcional',
        description: 'Existe un repositorio centralizado, pero su uso es opcional. No todos lo utilizan.'
      },
      {
        value: 4,
        label: 'Centralizado regular',
        description: 'Existe un repositorio centralizado con estructura clara. La mayoría del equipo lo usa regularmente.'
      },
      {
        value: 5,
        label: 'Centralizado integrado',
        description: 'Existe un repositorio centralizado, versionado e integrado en el flujo de trabajo. Es obligatorio y está actualizado.'
      }
    ]
  },
  {
    id: 2,
    question: 'Protocolo de Validación de Calidad',
    description: '¿Existe un protocolo documentado para validar la calidad de los outputs de la IA antes de usarlos?',
    area: 'quality',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'Validamos "a ojo" o confiamos en que salga bien.'
      },
      {
        value: 2,
        label: 'Informal',
        description: 'Algunos miembros tienen criterios personales, pero no están documentados.'
      },
      {
        value: 3,
        label: 'Protocolo informal',
        description: 'Existe un protocolo informal. Hay criterios, pero varían según quién valide.'
      },
      {
        value: 4,
        label: 'Protocolo documentado',
        description: 'Existe un protocolo documentado con criterios claros, aunque no se aplica de manera consistente.'
      },
      {
        value: 5,
        label: 'Protocolo robusto',
        description: 'Existe un protocolo documentado, con criterios medibles, aplicado de manera sistemática y registrado.'
      }
    ]
  },
  {
    id: 3,
    question: 'Documentación de Decisiones de Ingeniería',
    description: '¿Existe un registro documentado de por qué ciertos prompts funcionan mejor que otros?',
    area: 'quality',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'No registramos decisiones ni aprendizajes.'
      },
      {
        value: 2,
        label: 'Parcial',
        description: 'Algunos miembros documentan sus hallazgos, pero no de manera sistemática.'
      },
      {
        value: 3,
        label: 'Informal',
        description: 'Existe un documento compartido donde ocasionalmente registramos aprendizajes, pero sin estructura clara.'
      },
      {
        value: 4,
        label: 'Estructurado',
        description: 'Existe un registro estructurado de decisiones y aprendizajes, aunque no se actualiza regularmente.'
      },
      {
        value: 5,
        label: 'Sistemático',
        description: 'Existe un registro detallado, versionado y actualizado regularmente. Es parte del flujo de trabajo.'
      }
    ]
  },
  {
    id: 4,
    question: 'Matriz de Responsabilidades (RACI)',
    description: '¿Existe un documento que defina quién es responsable de qué en el proceso de ingeniería de prompts?',
    area: 'scalability',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'Las responsabilidades son vagas o no están definidas.'
      },
      {
        value: 2,
        label: 'Informal',
        description: 'Algunos saben qué se espera de ellos, pero no está documentado.'
      },
      {
        value: 3,
        label: 'Incompleto',
        description: 'Existe un documento, pero es incompleto o no se comunica claramente.'
      },
      {
        value: 4,
        label: 'Claro',
        description: 'Existe un documento claro que define responsabilidades, aunque hay excepciones.'
      },
      {
        value: 5,
        label: 'Formalizado',
        description: 'Existe una matriz RACI documentada, comunicada y aplicada de manera consistente.'
      }
    ]
  },
  {
    id: 5,
    question: 'Biblioteca de Componentes Reutilizables',
    description: '¿Existe una biblioteca documentada de componentes de prompts (contextos, formatos, tonos) que tu equipo reutiliza?',
    area: 'infrastructure',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'Cada proyecto comienza desde cero.'
      },
      {
        value: 2,
        label: 'Informal',
        description: 'A veces recordamos componentes anteriores, pero no están catalogados.'
      },
      {
        value: 3,
        label: 'Biblioteca informal',
        description: 'Existe una biblioteca informal. Algunos componentes están documentados, pero el acceso es difícil.'
      },
      {
        value: 4,
        label: 'Biblioteca estructurada',
        description: 'Existe una biblioteca estructurada con componentes bien documentados. Se reutilizan regularmente.'
      },
      {
        value: 5,
        label: 'Biblioteca centralizada',
        description: 'Existe una biblioteca centralizada, versionada, con métricas de uso. Es parte del flujo de trabajo estándar.'
      }
    ]
  },
  {
    id: 6,
    question: 'Protocolo de Gestión de Riesgos y Guardrails',
    description: '¿Existe un protocolo documentado para identificar y mitigar riesgos en los outputs de la IA (sesgos, alucinaciones, información sensible)?',
    area: 'quality',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'No tenemos un proceso formal de gestión de riesgos.'
      },
      {
        value: 2,
        label: 'Informal',
        description: 'Algunos miembros están conscientes de los riesgos, pero no hay protocolo.'
      },
      {
        value: 3,
        label: 'Protocolo informal',
        description: 'Existe un protocolo informal. Hay algunas guardrails, pero no están completamente documentadas.'
      },
      {
        value: 4,
        label: 'Protocolo documentado',
        description: 'Existe un protocolo documentado con guardrails claros, aunque la implementación es inconsistente.'
      },
      {
        value: 5,
        label: 'Protocolo robusto',
        description: 'Existe un protocolo robusto, documentado, con guardrails implementados y un sistema de escalación para casos críticos.'
      }
    ]
  },
  {
    id: 7,
    question: 'Plan de Onboarding para Nuevos Miembros',
    description: '¿Existe un plan documentado para entrenar a nuevos miembros en el proceso de ingeniería de prompts?',
    area: 'scalability',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'El entrenamiento es ad-hoc y depende de quién esté disponible.'
      },
      {
        value: 2,
        label: 'Informal',
        description: 'Alguien entrena al nuevo miembro, pero sin estructura clara.'
      },
      {
        value: 3,
        label: 'Plan informal',
        description: 'Existe un plan informal. Hay algunos materiales, pero el proceso es inconsistente.'
      },
      {
        value: 4,
        label: 'Plan documentado',
        description: 'Existe un plan documentado que cubre los temas principales, aunque requiere mentoría adicional.'
      },
      {
        value: 5,
        label: 'Plan estructurado',
        description: 'Existe un plan estructurado, con materiales, ejercicios y métricas de competencia. El nuevo miembro es productivo rápidamente.'
      }
    ]
  },
  {
    id: 8,
    question: 'Sistema de Métricas y Medición',
    description: '¿Existe un sistema documentado para medir la calidad y eficiencia de los prompts?',
    area: 'infrastructure',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'No medimos nada. Solo sabemos si "funcionó" o no.'
      },
      {
        value: 2,
        label: 'Parcial',
        description: 'Algunos miembros registran resultados, pero sin un sistema claro.'
      },
      {
        value: 3,
        label: 'Sistema informal',
        description: 'Existe un sistema informal. Hay algunas métricas, pero no se analizan regularmente.'
      },
      {
        value: 4,
        label: 'Sistema documentado',
        description: 'Existe un sistema de métricas documentado, aunque la recopilación es inconsistente.'
      },
      {
        value: 5,
        label: 'Sistema robusto',
        description: 'Existe un sistema robusto de métricas, automatizado, con análisis regular y reportes que informan la mejora.'
      }
    ]
  },
  {
    id: 9,
    question: 'Ciclo de Revisión y Mejora Continua',
    description: '¿Existe un ciclo documentado de revisión, aprendizaje e iteración en los prompts?',
    area: 'quality',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'No revisamos sistemáticamente qué funcionó o no.'
      },
      {
        value: 2,
        label: 'Informal',
        description: 'Ocasionalmente reflexionamos sobre lo que funcionó.'
      },
      {
        value: 3,
        label: 'Ciclo informal',
        description: 'Existe un ciclo informal. Tenemos reuniones ocasionales, pero sin un proceso estructurado.'
      },
      {
        value: 4,
        label: 'Ciclo documentado',
        description: 'Existe un ciclo documentado de revisión, aunque no se ejecuta de manera consistente.'
      },
      {
        value: 5,
        label: 'Ciclo estructurado',
        description: 'Existe un ciclo estructurado (semanal, mensual, trimestral) de revisión, con documentación de aprendizajes e iteración.'
      }
    ]
  },
  {
    id: 10,
    question: 'Estándares Organizacionales Documentados',
    description: '¿Existe un documento que defina los estándares, procesos y mejores prácticas de ingeniería de prompts para toda la organización?',
    area: 'scalability',
    options: [
      {
        value: 1,
        label: 'No existe',
        description: 'Cada persona o departamento hace lo suyo.'
      },
      {
        value: 2,
        label: 'Parcial',
        description: 'Hay algunas guías informales, pero no están formalizadas.'
      },
      {
        value: 3,
        label: 'Documento incompleto',
        description: 'Existe un documento, pero es incompleto o no está comunicado a todo el equipo.'
      },
      {
        value: 4,
        label: 'Documento claro',
        description: 'Existe un documento claro que define estándares. La mayoría del equipo lo conoce y lo sigue.'
      },
      {
        value: 5,
        label: 'Documento formal',
        description: 'Existe un documento formal, versionado, comunicado a todo el equipo, y su cumplimiento es verificable.'
      }
    ]
  }
];
