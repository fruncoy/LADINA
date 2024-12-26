import { jsPDF } from 'jspdf';

export interface LayoutConfig {
  margin: number;
  pageWidth: number;
}

export function getLayoutConfig(pdf: jsPDF): LayoutConfig {
  return {
    margin: 20,
    pageWidth: pdf.internal.pageSize.width
  };
}

export function getYPosition(startY: number, increment: number): number {
  return startY + increment;
}