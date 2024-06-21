import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'modern',
    templateUrl    : './modern.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports: [ NgIf ]
})
export class ModernComponent
{
    editMode: boolean = false;
    /**
     * Constructor
     */
    constructor()
    {
    }
}
