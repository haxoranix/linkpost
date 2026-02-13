import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportSlidesToPdf = async (slideElements: HTMLElement[], fileName: string) => {
  if (!slideElements.length) {
    return;
  }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  for (let i = 0; i < slideElements.length; i += 1) {
    const canvas = await html2canvas(slideElements[i], {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    });

    const img = canvas.toDataURL('image/png');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(img, 'PNG', 0, 0, width, height, undefined, 'FAST');
  }

  pdf.save(`${fileName || 'linkedin-carousel'}.pdf`);
};
