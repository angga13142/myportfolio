import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ProjectData {
  title: string;
  description: string;
  date: string;
  category: string;
  achievements: string[];
  metrics?: {
    label: string;
    value: string | number;
  }[];
  images?: string[];
}

export async function generateProjectPDF(project: ProjectData): Promise<Blob> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Header - Company Branding
  pdf.setFillColor(34, 197, 94); // Green-500
  pdf.rect(0, 0, pageWidth, 40, "F");

  // Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("PROJECT CASE STUDY", margin, 20);

  // Author
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("Muhammad Nurhidayat Gani", margin, 30);
  pdf.text("Professional Heavy Equipment Operator", margin, 35);

  yPosition = 50;

  // Project Title
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  const titleLines = pdf.splitTextToSize(project.title, contentWidth);
  pdf.text(titleLines, margin, yPosition);
  yPosition += titleLines.length * 8 + 5;

  // Metadata
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(100, 100, 100);
  pdf.text(
    `Category: ${project.category} | Date: ${project.date}`,
    margin,
    yPosition
  );
  yPosition += 10;

  // Divider
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Description
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  const descLines = pdf.splitTextToSize(project.description, contentWidth);
  pdf.text(descLines, margin, yPosition);
  yPosition += descLines.length * 6 + 10;

  // Metrics Section (if available)
  if (project.metrics && project.metrics.length > 0) {
    // Check if we need a new page
    if (yPosition + 40 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Key Metrics", margin, yPosition);
    yPosition += 10;

    // Metrics grid
    const metricsPerRow = 2;
    const metricWidth = contentWidth / metricsPerRow - 5;
    const metricHeight = 20;

    project.metrics.forEach((metric, index) => {
      const col = index % metricsPerRow;
      const row = Math.floor(index / metricsPerRow);
      const x = margin + col * (metricWidth + 5);
      const y = yPosition + row * (metricHeight + 5);

      // Check if we need a new page
      if (y + metricHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return;
      }

      // Metric box
      pdf.setFillColor(240, 240, 240);
      pdf.rect(x, y, metricWidth, metricHeight, "F");

      // Metric value
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(34, 197, 94);
      pdf.text(String(metric.value), x + 5, y + 10);

      // Metric label
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text(metric.label, x + 5, y + 16);
    });

    yPosition +=
      Math.ceil(project.metrics.length / metricsPerRow) * (metricHeight + 5) +
      10;
  }

  // Achievements Section
  if (project.achievements && project.achievements.length > 0) {
    // Check if we need a new page
    if (yPosition + 30 > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 0, 0);
    pdf.text("Key Achievements", margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    project.achievements.forEach((achievement, index) => {
      // Check if we need a new page
      if (yPosition + 15 > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }

      // Bullet point
      pdf.setFillColor(34, 197, 94);
      pdf.circle(margin + 2, yPosition - 1, 1, "F");

      // Achievement text
      const achievementLines = pdf.splitTextToSize(
        achievement,
        contentWidth - 10
      );
      pdf.text(achievementLines, margin + 6, yPosition);
      yPosition += achievementLines.length * 5 + 3;
    });

    yPosition += 5;
  }

  // Footer
  const footerY = pageHeight - 15;
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text("Generated from aistorytell.me", margin, footerY);
  pdf.text(
    `Page ${pdf.getCurrentPageInfo().pageNumber}`,
    pageWidth - margin - 15,
    footerY
  );

  // Contact info
  pdf.text(
    "📧 mnhidayatgani@gmail.com | 📞 +62 853-4590-2520",
    margin,
    footerY + 4
  );

  // Return as blob
  return pdf.output("blob");
}

export async function downloadProjectPDF(project: ProjectData) {
  const blob = await generateProjectPDF(project);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${project.title
    .toLowerCase()
    .replace(/\s+/g, "-")}-case-study.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
