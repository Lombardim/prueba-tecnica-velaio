import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-custom-icon',
  templateUrl: './custom-icon.component.html',
  styleUrls: ['./custom-icon.component.scss']
})
export class CustomIconComponent {
  @Input() imageClass = 'h-[1rem] w-[1rem] bg-cover dark:invert';
  @Input() iconName = '';
}
