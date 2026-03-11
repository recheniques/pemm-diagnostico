import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AssessmentResult } from './types';
import { AREA_EXPLANATIONS, PROTOCOLS_BY_LEVEL, LEVEL_DESCRIPTIONS } from './reportContent';

export async function generatePEMMReport(
  result: AssessmentResult,
  userName: string,
  radarChartElement: HTMLElement,
  tier: 'freemium' | 'premium' = 'freemium'
): Promise<void> {
  const pdf = new (jsPDF as any)({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = margin;

  pdf.setFontSize(10);
  pdf.setTextColor(26, 58, 50);
  pdf.text('EXPERIENCE ASSET LABS', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(24);
  pdf.setFont('Montserrat', 'bold');
  pdf.text('PEMM: Prompt Engineering Maturity Model', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(14);
  pdf.setFont('Montserrat', 'bold');
  pdf.text('Diagnostico de Madurez Operacional', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(11);
  pdf.setFont('Inter', 'normal');
  pdf.setTextColor(44, 44, 44);
  pdf.text(`Usuario: ${userName}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Nivel de Madurez: ${result.level}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Puntaje Total: ${result.totalScore}/50`, margin, yPosition);
  yPosition += 15;

  if (radarChartElement) {
    try {
      const canvas = await html2canvas(radarChartElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 90;
      const imgHeight = 90;
      const xPosition = (pageWidth - imgWidth) / 2;
      pdf.addImage(imgData, 'PNG', xPosition, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 15;
    } catch (error) {
      console.error('Error adding radar chart:', error);
    }
  }

  // Add level description for both Freemium and Premium
  const levelDesc = LEVEL_DESCRIPTIONS[result.level as keyof typeof LEVEL_DESCRIPTIONS];
  if (levelDesc) {
    pdf.setFontSize(11);
    pdf.setFont('Montserrat', 'bold');
    pdf.setTextColor(26, 58, 50);
    pdf.text('Que significa tu Nivel?', margin, yPosition);
    yPosition += 6;

    pdf.setFontSize(9);
    pdf.setFont('Inter', 'normal');
    pdf.setTextColor(100, 100, 100);
    const wrappedDesc = pdf.splitTextToSize(levelDesc.description, contentWidth);
    pdf.text(wrappedDesc, margin, yPosition);
    yPosition += wrappedDesc.length * 3.5 + 8;
  }

  // Add Premium CTA for Freemium tier
  if (tier === 'freemium') {
    pdf.setFontSize(11);
    pdf.setFont('Montserrat', 'bold');
    pdf.setTextColor(26, 58, 50);
    pdf.text('Quieres un analisis completo?', margin, yPosition);
    yPosition += 6;

    pdf.setFontSize(9);
    pdf.setFont('Inter', 'normal');
    pdf.setTextColor(100, 100, 100);
    const ctaText = pdf.splitTextToSize(
      'Accede a Premium para obtener un analisis detallado de tus debilidades y fortalezas, mas un Protocolo de 7 Dias personalizado con tareas especificas, entregables y tiempos estimados para mejorar tu madurez en ingenieria de prompts.',
      contentWidth
    );
    pdf.text(ctaText, margin, yPosition);
    yPosition += ctaText.length * 3.5 + 8;
  }

  // Only include detailed analysis and protocol for Premium tier
  if (tier === 'premium') {
    pdf.addPage();
    yPosition = margin;

    pdf.setFontSize(14);
    pdf.setFont('Montserrat', 'bold');
    pdf.setTextColor(26, 58, 50);
    pdf.text(`Nivel ${result.level}: Tu Diagnostico Detallado`, margin, yPosition);
    yPosition += 8;

    // Add level description
    const levelDesc = LEVEL_DESCRIPTIONS[result.level as keyof typeof LEVEL_DESCRIPTIONS];
    if (levelDesc) {
      pdf.setFontSize(9);
      pdf.setFont('Inter', 'normal');
      pdf.setTextColor(100, 100, 100);
      const wrappedDesc = pdf.splitTextToSize(levelDesc.description, contentWidth);
      pdf.text(wrappedDesc, margin, yPosition);
      yPosition += wrappedDesc.length * 3.5 + 5;
    }

    // Helper function to render a section
    const renderSection = (title: string, items: any[], titleR: number, titleG: number, titleB: number, isWeakness: boolean) => {
      if (items.length === 0) return;

      pdf.setFontSize(12);
      pdf.setFont('Montserrat', 'bold');
      pdf.setTextColor(titleR, titleG, titleB);
      pdf.text(title, margin, yPosition);
      yPosition += 6;

      items.forEach((item: any, index: number) => {
        const areaKey = item.area as keyof typeof AREA_EXPLANATIONS;
        const areaInfo = AREA_EXPLANATIONS[areaKey];

        pdf.setFontSize(11);
        pdf.setFont('Montserrat', 'bold');
        pdf.setTextColor(26, 58, 50);
        pdf.text(`${index + 1}. ${item.label}: ${item.score.toFixed(1)}/5`, margin, yPosition);
        yPosition += 5;

        pdf.setFontSize(8);
        pdf.setFont('Inter', 'normal');
        pdf.setTextColor(122, 122, 122);
        
        const definition = `Definicion: ${areaInfo.definition}`;
        const wrappedDefinition = pdf.splitTextToSize(definition, contentWidth);
        pdf.text(wrappedDefinition, margin + 5, yPosition);
        yPosition += wrappedDefinition.length * 3.5 + 1;

        const implR = isWeakness ? 200 : 26;
        const implG = isWeakness ? 50 : 58;
        const implB = isWeakness ? 50 : 50;
        pdf.setTextColor(implR, implG, implB);
        pdf.setFontSize(8);
        pdf.text('Implicaciones probables:', margin + 5, yPosition);
        yPosition += 3;

        const implications = isWeakness ? areaInfo.weaknessImplications : areaInfo.strengthImplications;
        const maxImplications = Math.min(3, implications.length);
        for (let i = 0; i < maxImplications; i++) {
          pdf.setTextColor(100, 100, 100);
          pdf.setFontSize(7.5);
          const wrapped = pdf.splitTextToSize(`• ${implications[i]}`, contentWidth - 5);
          pdf.text(wrapped, margin + 8, yPosition);
          yPosition += wrapped.length * 3 + 0.5;
        }

        yPosition += 2;

        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
      });

      yPosition += 3;
    };

    // Render all three sections
    renderSection('Areas de Mayor Debilidad:', result.weaknesses, 200, 50, 50, true);
    renderSection('Areas en Desarrollo:', result.inDevelopment, 44, 44, 44, false);
    renderSection('Fortalezas Actuales:', result.strengths, 26, 58, 50, false);

    pdf.addPage();
    yPosition = margin;

    const protocol = PROTOCOLS_BY_LEVEL[result.level as keyof typeof PROTOCOLS_BY_LEVEL];

    pdf.setFontSize(14);
    pdf.setFont('Montserrat', 'bold');
    pdf.setTextColor(26, 58, 50);
    pdf.text(protocol.title, margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(9);
    pdf.setFont('Inter', 'normal');
    pdf.setTextColor(100, 100, 100);
    const wrappedDescription = pdf.splitTextToSize(protocol.description, contentWidth);
    pdf.text(wrappedDescription, margin, yPosition);
    yPosition += wrappedDescription.length * 3.5 + 5;

    protocol.days.forEach((dayData: any) => {
      if (yPosition > pageHeight - 25) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(11);
      pdf.setFont('Montserrat', 'bold');
      pdf.setTextColor(26, 58, 50);
      pdf.text(`Dia ${dayData.day}: ${dayData.title}`, margin, yPosition);
      yPosition += 5;

      pdf.setFontSize(8);
      pdf.setFont('Inter', 'normal');
      pdf.setTextColor(44, 44, 44);
      pdf.text('Tareas:', margin + 3, yPosition);
      yPosition += 3;

      const maxTasks = Math.min(2, dayData.tasks.length);
      for (let i = 0; i < maxTasks; i++) {
        const wrapped = pdf.splitTextToSize(`• ${dayData.tasks[i]}`, contentWidth - 5);
        pdf.text(wrapped, margin + 6, yPosition);
        yPosition += wrapped.length * 2.8 + 0.5;
      }

      yPosition += 1;

      pdf.setTextColor(26, 58, 50);
      pdf.setFont('Inter', 'bold');
      pdf.text('Entregable:', margin + 3, yPosition);
      yPosition += 3;

      pdf.setFont('Inter', 'normal');
      pdf.setTextColor(100, 100, 100);
      const wrappedDeliverable = pdf.splitTextToSize(dayData.deliverable, contentWidth - 5);
      pdf.text(wrappedDeliverable, margin + 6, yPosition);
      yPosition += wrappedDeliverable.length * 2.8 + 1;

      pdf.setTextColor(122, 122, 122);
      pdf.setFontSize(7);
      pdf.text(`Tiempo: ${dayData.timeEstimate}`, margin + 3, yPosition);
      yPosition += 6;
    });
  }

  pdf.save(`PEMM-Assessment-${userName}-${new Date().toISOString().split('T')[0]}.pdf`);
}
