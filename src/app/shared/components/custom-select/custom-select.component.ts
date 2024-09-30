import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomSelectOption} from '../../interfaces/custom.interface';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() label = '';
  @Input() labelIcon?: string;
  @Input() labelIconClass = 'h-[1rem] w-[1.5rem] bg-cover';
  @Input() removePadding = false;
  @Input() showOnlyIcon = false;
  @Input() hideLabelOnMobile = false;
  @Input() options: CustomSelectOption[] = [];
  @Output() selectedOption: EventEmitter<string> = new EventEmitter<string>;
  menuOpen = false;

  toggleSelect() {
    this.menuOpen = !this.menuOpen;
  }
  selectOption(option: CustomSelectOption) {
    this.label = option.value;
    this.selectedOption.emit(option.value);
  }

  protected readonly addEventListener = addEventListener;
}
