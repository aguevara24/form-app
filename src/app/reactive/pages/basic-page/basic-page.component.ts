import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
}
@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl( '', [], []),
  //   price: new FormControl( '', [], []),
  //   inStorage: new FormControl( '', [], []),
  // });

  ngOnInit(): void {
    this.myForm.reset( rtx5090 );
  }

  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3 )] ],
    price: [ 0, [ Validators.required, Validators.min(0) ] ],
    inStorage: [ 0, [ Validators.required, Validators.min(0) ] ]
  })

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[ field ].errors
      && this.myForm.controls[ field ].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[ field ] ) return null;

    const errors = this.myForm.controls[ field ].errors || {};

    for ( const key of Object.keys( errors ) ) {
      switch ( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return  `Minimo ${ errors['minlength'].requiredLength } caracteres`;
        case 'min':
          return  `El precio debe ser ${ errors['min'].min } o mayor`;
      }
    }

    return null;
  }

  onSave():void {

    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;

    }

    console.log( this.myForm.value );

    this.myForm.reset( { price: 0, inStorage: 0 });
  }
}
