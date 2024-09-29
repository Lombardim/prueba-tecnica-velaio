import {Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[customTooltip]'
})
export class CustomTooltipDirective implements OnDestroy{
  @Input() customTooltip?: string;
  @Input() customLeft: number | undefined = 10;
  @Input() customTop: number | undefined = -40;
  @Input() customMaxWidth: number | undefined;
  public tooltip?: HTMLDivElement;

  constructor(
    private el: ElementRef, private renderer: Renderer2
  ) { }

  ngOnDestroy() {
    if (this.tooltip) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltip);
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.hideTooltip();
  }

  @HostListener('click') onMouseClick(): void {
    this.hideTooltip();
  }

  private showTooltip(): void {
    if (!this.customTooltip)
      return;
    this.tooltip = this.renderer.createElement('div');
    if (this.tooltip) {
      this.renderer.addClass(this.tooltip, 'custom-tooltip');
      this.tooltip.textContent = this.customTooltip;

      const hostElementRect = this.el.nativeElement.getBoundingClientRect();

      const tooltipTop = hostElementRect.top + this.customTop;
      const tooltipLeft = hostElementRect.left + this.customLeft;

      if (this.customMaxWidth) {
        this.renderer.setStyle(this.tooltip, 'max-width', `${this.customMaxWidth}px`);
      }
      this.renderer.setStyle(this.tooltip, 'top', `${tooltipTop}px`);
      this.renderer.setStyle(this.tooltip, 'left', `${tooltipLeft}px`);

      this.renderer.appendChild(document.body, this.tooltip);
    }
  }

  private hideTooltip(): void {
    if (this.tooltip) {
      this.renderer.removeChild(this.tooltip.parentNode, this.tooltip);
    }
  }
}
