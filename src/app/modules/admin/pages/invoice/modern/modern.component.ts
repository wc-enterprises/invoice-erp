import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

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
    invoiceForm: UntypedFormGroup;
    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder,)
    {
    }

   // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void{
        this.invoiceForm = this._formBuilder.group({
            id: [''],
            billTo: this._formBuilder.group({
                name: ['', [Validators.required]],
                address     : [null],
                phoneNumber : [''],
                email     : [''],
            }),
            carInfo: this._formBuilder.group({})
        })
    }

}
