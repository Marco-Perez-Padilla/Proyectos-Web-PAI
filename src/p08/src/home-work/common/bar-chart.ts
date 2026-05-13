/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Class BarChart that renders a bar chart onto a canvas element
 */

import type { BarChartConfig, ChartData } from '../common/interfaces.js';

/**
 * Renders a bar chart onto an HTML canvas element.
 */
export class BarChart {
  private readonly context: CanvasRenderingContext2D;
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;

  /**
   * @desc Creates a BarChart instance bound to the given canvas element.
   * @param canvas - The HTML canvas element where the chart will be rendered.
   * @param config - Visual configuration (colors, margins, labels, grid lines…).
   * @throws {Error} If the 2D rendering context cannot be obtained from the canvas.
   */
  constructor(canvas: HTMLCanvasElement, private readonly config: BarChartConfig) {
    const context = canvas.getContext('2d');
    if (context === null) {
      throw new Error('Could not obtain the 2D context from the canvas element.');
    }
    this.context      = context;
    this.canvasWidth  = canvas.width;
    this.canvasHeight = canvas.height;
  }

  // ── Calculation helpers ───────────────────────────────────────────────────

  /**
   * @desc Returns the drawable plot area by subtracting the configured margins
   *       from the total canvas dimensions.
   * @returns An object containing the top-left origin (coordX, coordY)
   *          and the dimensions (plotWidth, plotHeight) of the plot area.
   */
  private getPlotArea(): {coordX: number, coordY: number, plotWidth: number, plotHeight: number} {
    const { margin } = this.config;
    return {
      coordX:     margin.left,
      coordY:     margin.top,
      plotWidth:  this.canvasWidth  - margin.left - margin.right,
      plotHeight: this.canvasHeight - margin.top  - margin.bottom,
    };
  }

  /**
   * @desc Rounds the raw maximum data value up
   * @param data - Array of chart data points.
   * @returns The rounded-up maximum value for the Y axis.
   */
  private computeAxisMax(data: ChartData[]): number {
    const rawMax   = Math.max(...data.map(point => point.value));
    const stepSize = rawMax <= 10 ? 2 : rawMax <= 30 ? 5 : 10;
    return Math.ceil(rawMax / stepSize) * stepSize;
  }

  /**
   * @desc Calculates the slot width, bar width and horizontal padding
   * @param totalWidth - Total width of the plot area in pixels.
   * @param numBars    - Number of bars to render.
   * @returns An object with slotWidth, barWidth and horizontalPadding.
   */
  private computeBarDimensions(totalWidth: number, numBars: number): { 
    slotWidth: number; barWidth: number; horizontalPadding: number 
  } {
    const slotWidth         = totalWidth / numBars;
    const barWidth          = slotWidth * (1 - 0.28);
    const horizontalPadding = (slotWidth - barWidth) / 2;
    return { slotWidth, barWidth, horizontalPadding };
  }

  /**
   * @desc Calculates the top Y coordinate of a bar based on its data value.
   * @param dataValue  - The numeric value of the data point.
   * @param axisMax    - The maximum value of the Y axis.
   * @param plotHeight - The height of the plot area in pixels.
   * @param plotTop    - The Y coordinate of the top of the plot area.
   * @returns The Y coordinate of the top edge of the bar in canvas pixels.
   */
  private computeBarTopY(dataValue: number, axisMax: number, plotHeight: number, plotTop: number): number {
    return plotTop + plotHeight - (dataValue / axisMax) * plotHeight;
  }

  /**
   * @desc Renders the complete bar chart 
   * @param data - Array of data points to render.
   */
  draw(data: ChartData[]): void {
    if (data.length === 0) return;
    const axisMax = this.computeAxisMax(data);
    this.drawBackground();
    this.drawTitle();
    this.drawGridLines(axisMax);
    this.drawBars(data, axisMax);
    this.drawXAxisLabels(data);
    this.drawYAxisLabels(axisMax);
    this.drawAxes();
    this.drawAxisTitles();
  }

  /**
   * @desc Fills the entire canvas with the configured background color.
   */
  private drawBackground(): void {
    this.context.fillStyle = this.config.backgroundColor;
    this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  /**
   * @desc Draws the chart title centered horizontally at the top of the canvas.
   */
  private drawTitle(): void {
    const { title, titleColor, margin } = this.config;
    const titleCenterX = this.canvasWidth / 2;
    const titleCenterY = margin.top / 2;
    this.context.save();
    this.context.fillStyle    = titleColor;
    this.context.font         = 'bold 18px Arial, sans-serif';
    this.context.textAlign    = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(title, titleCenterX, titleCenterY);
    this.context.restore();
  }

  /**
   * @desc Draws all horizontal grid lines across the plot area.
   * @param axisMax - The maximum value of the Y axis.
   */
  private drawGridLines(axisMax: number): void {
    const { coordX, coordY, plotWidth, plotHeight } = this.getPlotArea();
    const { numGridLines }                          = this.config;
    this.context.save();
    this.context.strokeStyle = this.config.gridColor;
    this.context.lineWidth   = 1;
    this.context.setLineDash([5, 5]);
    for (let lineIndex = 0; lineIndex <= numGridLines; lineIndex++) {
      const lineRatio = lineIndex / numGridLines;
      const lineY     = coordY + plotHeight - lineRatio * plotHeight;
      this.drawSingleGridLine(coordX, lineY, plotWidth);
    }
    this.context.restore();
  }

  /**
   * @desc Draws all bars in the histogram.
   * @param data    - Array of data points to render.
   * @param axisMax - The maximum value of the Y axis.
   */
  private drawBars(data: ChartData[], axisMax: number): void {
    const { coordX, coordY, plotWidth, plotHeight }   = this.getPlotArea();
    const { slotWidth, barWidth, horizontalPadding }  = this.computeBarDimensions(plotWidth, data.length);

    data.forEach((dataPoint, barIndex) => {
      if (dataPoint.value === 0) return;
      const barLeft   = coordX + barIndex * slotWidth + horizontalPadding;
      const barTop    = this.computeBarTopY(dataPoint.value, axisMax, plotHeight, coordY);
      const barHeight = (dataPoint.value / axisMax) * plotHeight;
      const cornerRadius = Math.min(5, barWidth / 4, barHeight / 2);
      this.drawSingleBar(barLeft, barTop, barWidth, barHeight, cornerRadius);
    });
  }

  /**
   * @desc Draws the X axis labels for each bar, rotated −45°.
   * @param data - Array of data points whose label field is used.
   */
  private drawXAxisLabels(data: ChartData[]): void {
    const { coordX, coordY, plotWidth, plotHeight } = this.getPlotArea();
    const slotWidth                                 = plotWidth / data.length;
    const labelOffsetY                              = 8;

    this.context.save();
    this.context.fillStyle    = this.config.textColor;
    this.context.font         = '12px Arial, sans-serif';
    this.context.textAlign    = 'right';
    this.context.textBaseline = 'top';

    data.forEach((dataPoint, barIndex) => {
      const labelCenterX = coordX + barIndex * slotWidth + slotWidth / 2;
      const labelTopY    = coordY + plotHeight + labelOffsetY;
      this.drawSingleXLabel(dataPoint.label, labelCenterX, labelTopY);
    });

    this.context.restore();
  }

  /**
   * @desc Draws the numeric labels along the Y axis at each grid line.
   * @param axisMax - The maximum value of the Y axis.
   */
  private drawYAxisLabels(axisMax: number): void {
    const { coordX, coordY, plotHeight } = this.getPlotArea();
    const { numGridLines }               = this.config;
    const labelOffsetX                   = 10;

    this.context.save();
    this.context.fillStyle    = this.config.textColor;
    this.context.font         = '12px Arial, sans-serif';
    this.context.textAlign    = 'right';
    this.context.textBaseline = 'middle';

    for (let lineIndex = 0; lineIndex <= numGridLines; lineIndex++) {
      const lineRatio  = lineIndex / numGridLines;
      const labelValue = Math.round(lineRatio * axisMax);
      const labelY     = coordY + plotHeight - lineRatio * plotHeight;
      this.drawSingleYLabel(String(labelValue), coordX - labelOffsetX, labelY);
    }

    this.context.restore();
  }

  /**
   * @desc Draws the X and Y axis lines along the borders of the plot area.
   */
  private drawAxes(): void {
    const { coordX, coordY, plotWidth, plotHeight } = this.getPlotArea();
    this.context.save();
    this.context.strokeStyle = this.config.axisColor;
    this.context.lineWidth   = 2;
    this.context.setLineDash([]);
    this.drawYAxis(coordX, coordY, plotHeight);
    this.drawXAxis(coordX, coordY, plotWidth, plotHeight);
    this.context.restore();
  }

  /**
   * @desc Draws the axis title labels for both the X and Y axes.
   */
  private drawAxisTitles(): void {
    const { coordX, coordY, plotWidth, plotHeight } = this.getPlotArea();
    this.context.save();
    this.context.fillStyle = this.config.textColor;
    this.context.font      = 'bold 13px Arial, sans-serif';
    this.drawXAxisTitle(coordX, plotWidth);
    this.drawYAxisTitle(coordX, coordY, plotHeight);
    this.context.restore();
  }

  // ── Painting methods — individual elements ────────────────────────────────

  /**
   * @desc Draws a single horizontal grid line across the plot area.
   * @param startX    - The X coordinate where the line begins.
   * @param lineY     - The Y coordinate of the line.
   * @param lineWidth - The horizontal length of the line in pixels.
   */
  private drawSingleGridLine(startX: number, lineY: number, lineWidth: number): void {
    this.context.beginPath();
    this.context.moveTo(startX, lineY);
    this.context.lineTo(startX + lineWidth, lineY);
    this.context.stroke();
  }

  /**
   * @desc Draws a single bar with a drop shadow and rounded top corners.
   * @param barLeft      - The X coordinate of the left edge of the bar.
   * @param barTop       - The Y coordinate of the top edge of the bar.
   * @param barWidth     - The width of the bar in pixels.
   * @param barHeight    - The height of the bar in pixels.
   * @param cornerRadius - The radius of the rounded top corners.
   */
  private drawSingleBar(barLeft: number, barTop: number, barWidth: number, barHeight: number, cornerRadius: number): void {
    this.context.save();
    this.context.shadowColor   = 'lightblue';
    this.context.shadowBlur    = 8;
    this.context.shadowOffsetY = 3;
    this.context.fillStyle     = this.config.barColor;
    this.drawRoundedRect(barLeft, barTop, barWidth, barHeight, cornerRadius);
    this.context.fill();
    this.context.restore();
  }

  /**
   * @desc Draws a single X axis label rotated −45° around its anchor point.
   * @param labelText - The text to display.
   * @param anchorX   - The X coordinate of the rotation anchor.
   * @param anchorY   - The Y coordinate of the rotation anchor.
   */
  private drawSingleXLabel(labelText: string, anchorX: number, anchorY: number): void {
    this.context.save();
    this.context.translate(anchorX, anchorY);
    this.context.rotate(-Math.PI / 4);
    this.context.fillText(labelText, 0, 0);
    this.context.restore();
  }

  /**
   * @desc Draws a single numeric label on the Y axis.
   * @param labelText - The numeric text to display.
   * @param labelX    - The X coordinate of the label.
   * @param labelY    - The Y coordinate of the label.
   */
  private drawSingleYLabel(labelText: string, labelX: number, labelY: number): void {
    this.context.fillText(labelText, labelX, labelY);
  }

  /**
   * @desc Draws the vertical Y axis line along the left edge of the plot area.
   * @param axisX      - The X coordinate of the axis.
   * @param axisTop    - The Y coordinate of the top of the axis.
   * @param axisHeight - The length of the axis in pixels.
   */
  private drawYAxis(axisX: number, axisTop: number, axisHeight: number): void {
    this.context.beginPath();
    this.context.moveTo(axisX, axisTop);
    this.context.lineTo(axisX, axisTop + axisHeight);
    this.context.stroke();
  }

  /**
   * @desc Draws the horizontal X axis line along the bottom edge of the plot area.
   * @param axisLeft   - The X coordinate where the axis begins.
   * @param axisTop    - The Y coordinate of the plot area top (used to compute bottom).
   * @param axisWidth  - The length of the axis in pixels.
   * @param axisHeight - The height of the plot area, used to find the bottom Y.
   */
  private drawXAxis(axisLeft: number, axisTop: number, axisWidth: number, axisHeight: number): void {
    this.context.beginPath();
    this.context.moveTo(axisLeft, axisTop + axisHeight);
    this.context.lineTo(axisLeft + axisWidth, axisTop + axisHeight);
    this.context.stroke();
  }

  /**
   * @desc Draws the X axis title label centered below the plot area.
   * @param plotLeft  - The X coordinate of the left edge of the plot area.
   * @param plotWidth - The width of the plot area in pixels.
   */
  private drawXAxisTitle(plotLeft: number, plotWidth: number): void {
    const titleCenterX  = plotLeft + plotWidth / 2;
    const titleBottomY  = this.canvasHeight - 6;
    this.context.textAlign    = 'center';
    this.context.textBaseline = 'bottom';
    this.context.fillText(this.config.xAxisLabel, titleCenterX, titleBottomY);
  }

  /**
   * @desc Draws the Y axis title label rotated 90° along the left margin.
   * @param plotLeft   - The X coordinate of the left edge of the plot area.
   * @param plotTop    - The Y coordinate of the top edge of the plot area.
   * @param plotHeight - The height of the plot area in pixels.
   */
  private drawYAxisTitle(plotLeft: number, plotTop: number, plotHeight: number): void {
    const titleOffsetX  = 16;
    const titleCenterY  = plotTop + plotHeight / 2;
    this.context.save();
    this.context.translate(titleOffsetX, titleCenterY);
    this.context.rotate(-Math.PI / 2);
    this.context.textAlign    = 'center';
    this.context.textBaseline = 'top';
    this.context.fillText(this.config.yAxisLabel, 0, 0);
    this.context.restore();
  }

  /**
   * @desc Defines a rounded-top rectangle path on the context.
   * @param rectLeft   - The X coordinate of the top-left corner.
   * @param rectTop    - The Y coordinate of the top-left corner.
   * @param rectWidth  - The width of the rectangle.
   * @param rectHeight - The height of the rectangle.
   * @param cornerRadius - The radius applied to the two top corners.
   */
  private drawRoundedRect(rectLeft: number, rectTop: number, rectWidth: number, rectHeight: number, cornerRadius: number): void {
    this.context.beginPath();
    this.context.moveTo(rectLeft + cornerRadius, rectTop);
    this.context.lineTo(rectLeft + rectWidth - cornerRadius, rectTop);
    this.context.quadraticCurveTo(rectLeft + rectWidth, rectTop, rectLeft + rectWidth, rectTop + cornerRadius);
    this.context.lineTo(rectLeft + rectWidth, rectTop + rectHeight);
    this.context.lineTo(rectLeft, rectTop + rectHeight);
    this.context.lineTo(rectLeft, rectTop + cornerRadius);
    this.context.quadraticCurveTo(rectLeft, rectTop, rectLeft + cornerRadius, rectTop);
    this.context.closePath();
  }
}