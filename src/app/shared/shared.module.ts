import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from './components/icon/icon.component';
import { CustomTooltipDirective } from './directives/custom-tooltip/custom-tooltip.directive';
import { TaskCardComponent } from './components/task-card/task-card.component';
import {TranslateModule} from '@ngx-translate/core';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { CustomIconComponent } from './components/custom-icon/custom-icon.component';



@NgModule({
  declarations: [

    IconComponent,
       CustomTooltipDirective,
       TaskCardComponent,
       CustomSelectComponent,
       CustomIconComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    TranslateModule,
  ],
  exports: [
    CustomTooltipDirective,
    TaskCardComponent,
    CustomSelectComponent,
    CustomIconComponent
  ]
})
export class SharedModule { }
