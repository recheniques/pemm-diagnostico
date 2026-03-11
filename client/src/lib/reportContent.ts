export const LEVEL_DESCRIPTIONS = {
  1: {
    title: 'Nivel 1: Emergencia Operacional',
    description: 'Tu equipo está en modo ad-hoc. Los prompts se crean sobre la marcha sin documentación sistemática. No hay control de calidad consistente ni reutilización de componentes. Este es el punto de partida para construir una base sólida.'
  },
  2: {
    title: 'Nivel 2: Estructura Básica',
    description: 'Tu equipo tiene algunos fundamentos en lugar. Existe un repositorio básico de prompts y criterios iniciales de calidad. Sin embargo, la escalabilidad es limitada y los procesos aún no están completamente documentados.'
  },
  3: {
    title: 'Nivel 3: Operación Sistemática',
    description: 'Tu equipo opera de manera sistemática. Tienes procesos documentados, control de calidad implementado y cierto nivel de automatización. Estás listo para escalar, pero hay oportunidades para mejorar la gobernanza y la eficiencia.'
  },
  4: {
    title: 'Nivel 4: Gobernanza Avanzada',
    description: 'Tu equipo tiene gobernanza madura. Los procesos están automatizados, hay visibilidad completa sobre la calidad y el equipo puede escalar sin perder control. Estás enfocado en optimización y mejora continua.'
  },
  5: {
    title: 'Nivel 5: Excelencia Operacional',
    description: 'Tu equipo ha alcanzado excelencia operacional. La ingeniería de prompts es un activo estratégico completamente integrado. Hay automatización avanzada, gobernanza robusta y cultura de mejora continua. Eres un referente en tu industria.'
  }
};

export const AREA_EXPLANATIONS = {
  infrastructure: {
    name: 'Infraestructura',
    definition: 'Capacidad de tu equipo para documentar, almacenar y reutilizar componentes de prompts de manera sistemática.',
    importance: 'Una infraestructura sólida es el fundamento de la escalabilidad. Sin ella, cada prompt es un proyecto único que consume tiempo y recursos.',
    weaknessImplications: [
      'Los prompts se pierden o duplican en diferentes lugares',
      'Cada miembro reinventa la rueda en lugar de reutilizar componentes probados',
      'No hay forma de aprender de los éxitos y fracasos anteriores',
      'El onboarding de nuevos miembros es lento y caótico'
    ],
    strengthImplications: [
      'Tu equipo tiene un repositorio centralizado de prompts',
      'Existe reutilización sistemática de componentes',
      'Los nuevos miembros pueden aprender rápidamente de la base de conocimiento',
      'Hay visibilidad sobre qué funciona y qué no'
    ]
  },
  quality: {
    name: 'Calidad y Control',
    definition: 'Capacidad de tu equipo para validar, medir y asegurar que los outputs de IA cumplen con estándares predefinidos.',
    importance: 'Sin control de calidad, los outputs de IA son impredecibles. Esto genera riesgos operacionales, retrasos y pérdida de confianza en la IA.',
    weaknessImplications: [
      'Los outputs se validan "a ojo" sin criterios objetivos',
      'Hay inconsistencia en los estándares entre miembros del equipo',
      'Los errores o alucinaciones de la IA pasan desapercibidos',
      'No hay trazabilidad de qué salió bien o mal'
    ],
    strengthImplications: [
      'Tu equipo tiene criterios claros para validar outputs',
      'Existe un protocolo documentado de control de calidad',
      'Los riesgos se identifican y mitigan antes de usar los outputs',
      'Hay trazabilidad y auditoría de decisiones'
    ]
  },
  scalability: {
    name: 'Escalabilidad',
    definition: 'Capacidad de tu equipo para crecer, incorporar nuevos miembros y mantener la calidad sin aumentar exponencialmente el esfuerzo.',
    importance: 'La escalabilidad determina si tu sistema de IA es un hobby o un activo empresarial. Sin ella, el crecimiento se detiene.',
    weaknessImplications: [
      'El conocimiento está concentrado en 1-2 personas',
      'Agregar nuevos miembros requiere capacitación intensiva',
      'La calidad disminuye a medida que crece el equipo',
      'No hay forma de automatizar o delegar tareas'
    ],
    strengthImplications: [
      'El conocimiento está distribuido y documentado',
      'Los nuevos miembros pueden ser productivos rápidamente',
      'La calidad se mantiene incluso con crecimiento',
      'Existen procesos que pueden ser automatizados o delegados'
    ]
  }
};

export const PROTOCOLS_BY_LEVEL = {
  1: {
    title: 'Protocolo de 7 Días - Nivel 1: Emergencia Operacional',
    description: 'Tu equipo está en modo "ad-hoc". Este protocolo te ayuda a salir del caos y establecer los fundamentos.',
    days: [
      {
        day: 1,
        title: 'Identificar y Registrar',
        tasks: [
          'Identifica los 3 prompts más críticos que usa tu equipo',
          'Crea una lista simple en Notion o Google Docs',
          'Documenta: qué hace cada prompt, quién lo usa, dónde está guardado'
        ],
        deliverable: 'Lista de 3 prompts críticos con ubicación y propósito',
        timeEstimate: '1-2 horas'
      },
      {
        day: 2,
        title: 'Aplicar Identidad y Contexto (Fase 1 del FMP)',
        tasks: [
          'Para cada uno de los 3 prompts, documenta: Identidad (quién eres) y Contexto (qué necesitas saber)',
          'Usa la plantilla: "Eres [rol]. Tu objetivo es [objetivo]. El contexto es [contexto]"',
          'Prueba cómo mejora la calidad del output'
        ],
        deliverable: '3 prompts con Identidad y Contexto documentados',
        timeEstimate: '2-3 horas'
      },
      {
        day: 3,
        title: 'Crear Biblioteca de Snippets',
        tasks: [
          'Extrae los componentes reutilizables de tus 3 prompts',
          'Crea una tabla en Notion con: Nombre del snippet, Descripción, Código, Cuándo usarlo',
          'Ejemplos: formatos de salida, tonos de voz, restricciones comunes'
        ],
        deliverable: 'Tabla de Snippets con al menos 5-10 componentes reutilizables',
        timeEstimate: '2 horas'
      },
      {
        day: 4,
        title: 'Establecer Criterios de Calidad Básicos',
        tasks: [
          'Define 3-5 criterios simples para validar outputs: ¿Es correcto? ¿Es completo? ¿Es claro?',
          'Crea un checklist simple que el equipo pueda usar',
          'Documenta qué hacer si un output falla un criterio'
        ],
        deliverable: 'Checklist de validación de calidad',
        timeEstimate: '1-2 horas'
      },
      {
        day: 5,
        title: 'Crear Repositorio Centralizado',
        tasks: [
          'Crea una carpeta compartida (Notion, Google Drive o GitHub) para todos los prompts',
          'Establece una estructura simple: Nombre del Prompt | Propósito | Última actualización | Autor',
          'Mueve tus 3 prompts críticos al repositorio'
        ],
        deliverable: 'Repositorio centralizado con estructura clara',
        timeEstimate: '1 hora'
      },
      {
        day: 6,
        title: 'Capacitar al Equipo',
        tasks: [
          'Reúne al equipo (30 minutos)',
          'Explica: dónde están los prompts, cómo usarlos, cuál es el checklist de calidad',
          'Responde preguntas y aclara dudas'
        ],
        deliverable: 'Equipo capacitado y alineado',
        timeEstimate: '1 hora'
      },
      {
        day: 7,
        title: 'Revisar y Ajustar',
        tasks: [
          'Revisa cómo el equipo está usando el repositorio y el checklist',
          'Identifica qué está funcionando y qué necesita ajustes',
          'Planifica los siguientes pasos (Nivel 2)'
        ],
        deliverable: 'Documento de lecciones aprendidas y plan para Nivel 2',
        timeEstimate: '1-2 horas'
      }
    ]
  },
  2: {
    title: 'Protocolo de 7 Días - Nivel 2: Estructura Básica',
    description: 'Tu equipo tiene algunos fundamentos. Este protocolo te ayuda a consolidarlos y escalar.',
    days: [
      {
        day: 1,
        title: 'Auditoría de Prompts Existentes',
        tasks: [
          'Revisa todos los prompts en tu repositorio',
          'Clasifícalos por: Propósito, Calidad estimada, Frecuencia de uso',
          'Identifica duplicados o prompts obsoletos'
        ],
        deliverable: 'Matriz de auditoría de prompts',
        timeEstimate: '2-3 horas'
      },
      {
        day: 2,
        title: 'Expandir Biblioteca de Snippets',
        tasks: [
          'Extrae componentes reutilizables de todos los prompts auditados',
          'Agrupa por categoría: Formatos, Tonos, Restricciones, Contextos comunes',
          'Documenta patrones que funcionan bien'
        ],
        deliverable: 'Biblioteca expandida con 20+ snippets categorizados',
        timeEstimate: '3-4 horas'
      },
      {
        day: 3,
        title: 'Implementar Scorecard de Calidad',
        tasks: [
          'Crea una Scorecard con 5-7 criterios medibles',
          'Ejemplo: Precisión (0-5), Completitud (0-5), Claridad (0-5), Seguridad (0-5)',
          'Prueba con 5 prompts existentes'
        ],
        deliverable: 'Scorecard de Calidad v1.0 con ejemplos',
        timeEstimate: '2-3 horas'
      },
      {
        day: 4,
        title: 'Crear Protocolo de Mejora Continua',
        tasks: [
          'Define un proceso semanal: Revisar prompts, identificar mejoras, actualizar',
          'Asigna responsables',
          'Documenta cómo se registran las mejoras'
        ],
        deliverable: 'Protocolo de mejora continua documentado',
        timeEstimate: '1-2 horas'
      },
      {
        day: 5,
        title: 'Implementar Versionado',
        tasks: [
          'Agrega versionado a tus prompts (v1.0, v1.1, v2.0)',
          'Documenta qué cambió en cada versión',
          'Mantén historial de cambios'
        ],
        deliverable: 'Sistema de versionado implementado',
        timeEstimate: '1-2 horas'
      },
      {
        day: 6,
        title: 'Capacitar en Nuevos Estándares',
        tasks: [
          'Reúne al equipo (1 hora)',
          'Presenta: Scorecard de Calidad, Protocolo de mejora, Versionado',
          'Realiza ejercicio práctico con un prompt'
        ],
        deliverable: 'Equipo capacitado en nuevos estándares',
        timeEstimate: '1.5 horas'
      },
      {
        day: 7,
        title: 'Planificar Nivel 3',
        tasks: [
          'Revisa progreso de Nivel 2',
          'Identifica qué está funcionando',
          'Planifica transición a Nivel 3 (Automatización y Gobernanza)'
        ],
        deliverable: 'Plan de transición a Nivel 3',
        timeEstimate: '1-2 horas'
      }
    ]
  },
  3: {
    title: 'Protocolo de 7 Días - Nivel 3: Operación Sistemática',
    description: 'Tu equipo tiene estructura. Este protocolo te ayuda a automatizar y gobernar.',
    days: [
      {
        day: 1,
        title: 'Mapeo de Flujos de Trabajo',
        tasks: [
          'Documenta cómo fluyen los prompts en tu organización',
          'Identifica puntos de fricción y oportunidades de automatización',
          'Crea diagrama simple: Entrada → Procesamiento → Validación → Salida'
        ],
        deliverable: 'Mapa de flujos de trabajo',
        timeEstimate: '2-3 horas'
      },
      {
        day: 2,
        title: 'Crear Plantillas Estándar',
        tasks: [
          'Basado en tus snippets, crea 3-5 plantillas estándar',
          'Ejemplo: Plantilla para análisis, para síntesis, para generación',
          'Documenta cuándo usar cada plantilla'
        ],
        deliverable: '3-5 plantillas estándar documentadas',
        timeEstimate: '2-3 horas'
      },
      {
        day: 3,
        title: 'Implementar Sistema de Gobernanza',
        tasks: [
          'Define roles: Creador, Revisor, Aprobador',
          'Documenta proceso de aprobación de nuevos prompts',
          'Crea matriz de responsabilidades'
        ],
        deliverable: 'Sistema de gobernanza documentado',
        timeEstimate: '1-2 horas'
      },
      {
        day: 4,
        title: 'Automatizar Validación',
        tasks: [
          'Identifica validaciones que pueden automatizarse',
          'Ejemplo: Checklists, reglas de negocio, restricciones',
          'Implementa herramientas o scripts simples'
        ],
        deliverable: 'Sistema de validación automatizado',
        timeEstimate: '2-3 horas'
      },
      {
        day: 5,
        title: 'Crear Dashboard de Métricas',
        tasks: [
          'Define KPIs: Uso de prompts, calidad promedio, tiempo de aprobación',
          'Crea dashboard simple (Google Sheets o Looker)',
          'Establece alertas para anomalías'
        ],
        deliverable: 'Dashboard de métricas en tiempo real',
        timeEstimate: '2-3 horas'
      },
      {
        day: 6,
        title: 'Capacitar en Gobernanza',
        tasks: [
          'Reúne al equipo (1.5 horas)',
          'Presenta: Roles, flujos de aprobación, métricas',
          'Realiza ejercicio práctico de aprobación'
        ],
        deliverable: 'Equipo alineado en gobernanza',
        timeEstimate: '2 horas'
      },
      {
        day: 7,
        title: 'Planificar Nivel 4',
        tasks: [
          'Revisa implementación de Nivel 3',
          'Identifica automatizaciones adicionales',
          'Planifica transición a Nivel 4 (Optimización Avanzada)'
        ],
        deliverable: 'Plan de transición a Nivel 4',
        timeEstimate: '1-2 horas'
      }
    ]
  },
  4: {
    title: 'Protocolo de 7 Días - Nivel 4: Gobernanza Avanzada',
    description: 'Tu equipo tiene gobernanza madura. Este protocolo te ayuda a optimizar y escalar exponencialmente.',
    days: [
      {
        day: 1,
        title: 'Auditoría de Automatización',
        tasks: [
          'Revisa qué procesos están automatizados y cuáles no',
          'Identifica cuellos de botella y oportunidades de optimización',
          'Prioriza por impacto y esfuerzo'
        ],
        deliverable: 'Matriz de automatización con prioridades',
        timeEstimate: '2 horas'
      },
      {
        day: 2,
        title: 'Implementar Integración con LLMs',
        tasks: [
          'Conecta tu repositorio de prompts con APIs de LLMs',
          'Crea sistema de A/B testing automático',
          'Documenta procesos de integración'
        ],
        deliverable: 'Sistema de integración con LLMs',
        timeEstimate: '3-4 horas'
      },
      {
        day: 3,
        title: 'Crear Sistema de Feedback',
        tasks: [
          'Implementa loop de feedback automático',
          'Conecta outputs con métricas de negocio',
          'Establece triggers para mejora continua'
        ],
        deliverable: 'Sistema de feedback automatizado',
        timeEstimate: '2-3 horas'
      },
      {
        day: 4,
        title: 'Optimizar Flujos de Trabajo',
        tasks: [
          'Automatiza aprobaciones basadas en reglas',
          'Implementa routing inteligente de prompts',
          'Reduce tiempo de ciclo de aprobación'
        ],
        deliverable: 'Flujos de trabajo optimizados',
        timeEstimate: '2-3 horas'
      },
      {
        day: 5,
        title: 'Crear Centro de Excelencia',
        tasks: [
          'Define comunidad de práctica de ingeniería de prompts',
          'Establece sesiones de aprendizaje regular',
          'Crea programa de certificación interna'
        ],
        deliverable: 'Centro de excelencia establecido',
        timeEstimate: '2 horas'
      },
      {
        day: 6,
        title: 'Presentar Resultados',
        tasks: [
          'Prepara dashboard ejecutivo con ROI',
          'Presenta a stakeholders: mejoras, ahorros, impacto',
          'Obtén buy-in para siguiente fase'
        ],
        deliverable: 'Presentación ejecutiva con resultados',
        timeEstimate: '2 horas'
      },
      {
        day: 7,
        title: 'Planificar Nivel 5',
        tasks: [
          'Revisa logros de Nivel 4',
          'Identifica oportunidades de innovación',
          'Planifica transición a Nivel 5 (Excelencia)'
        ],
        deliverable: 'Plan de transición a Nivel 5',
        timeEstimate: '1-2 horas'
      }
    ]
  },
  5: {
    title: 'Protocolo de 7 Días - Nivel 5: Excelencia Operacional',
    description: 'Tu equipo ha alcanzado excelencia. Este protocolo te ayuda a consolidar y escalar globalmente.',
    days: [
      {
        day: 1,
        title: 'Análisis Competitivo',
        tasks: [
          'Benchmarking contra industria',
          'Identifica ventajas competitivas',
          'Documenta best practices únicos'
        ],
        deliverable: 'Análisis competitivo detallado',
        timeEstimate: '2-3 horas'
      },
      {
        day: 2,
        title: 'Innovación en Prompts',
        tasks: [
          'Experimenta con nuevas técnicas de prompting',
          'Prueba nuevos modelos de IA',
          'Documenta aprendizajes'
        ],
        deliverable: 'Casos de innovación documentados',
        timeEstimate: '3-4 horas'
      },
      {
        day: 3,
        title: 'Escalabilidad Global',
        tasks: [
          'Diseña sistema para múltiples equipos/regiones',
          'Implementa gobernanza distribuida',
          'Establece estándares globales'
        ],
        deliverable: 'Arquitectura de escalabilidad global',
        timeEstimate: '3-4 horas'
      },
      {
        day: 4,
        title: 'Monetización de Conocimiento',
        tasks: [
          'Crea programa de capacitación externa',
          'Desarrolla certifications para clientes',
          'Establece modelo de consultoría'
        ],
        deliverable: 'Programa de monetización del conocimiento',
        timeEstimate: '2-3 horas'
      },
      {
        day: 5,
        title: 'Publicación y Pensamiento Estratégico',
        tasks: [
          'Publica artículos en medios especializados',
          'Presenta en conferencias',
          'Establece liderazgo de opinión'
        ],
        deliverable: 'Estrategia de publicación y visibilidad',
        timeEstimate: '2 horas'
      },
      {
        day: 6,
        title: 'Crear Legado',
        tasks: [
          'Documenta toda la arquitectura y procesos',
          'Crea programa de mentoría para próxima generación',
          'Establece estándares de industria'
        ],
        deliverable: 'Documentación y programa de legado',
        timeEstimate: '2-3 horas'
      },
      {
        day: 7,
        title: 'Celebrar y Planificar Futuro',
        tasks: [
          'Celebra logros del equipo',
          'Reflexiona sobre lecciones aprendidas',
          'Planifica visión a 3-5 años'
        ],
        deliverable: 'Visión estratégica a largo plazo',
        timeEstimate: '1-2 horas'
      }
    ]
  }
};
