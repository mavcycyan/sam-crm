import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appModalStock]',
})
export class ModalStockDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
