import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomSelectOption} from '../../interfaces/custom.interface';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {
  @Input() label: string = '';
  @Input() labelIcon?: string;
  @Input() options: CustomSelectOption[] = [];
  @Output() selectedOption: EventEmitter<string> = new EventEmitter<string>;
  menuOpen: boolean = false;

  toggleSelect() {
    this.menuOpen = !this.menuOpen;
  }
  selectOption(option: CustomSelectOption) {
    this.label = option.value;
    this.selectedOption.emit(option.value);
  }

  protected readonly addEventListener = addEventListener;
}
