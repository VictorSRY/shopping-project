import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { LoadingComponent } from './style/loading.component';

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        LoadingComponent
    ]
})
export class SharedModule { }