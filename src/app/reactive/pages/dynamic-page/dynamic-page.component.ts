import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength( 3 ) ]],
    favoriteGames: this.fb.array( [
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding', Validators.required ],
    ] )
  });

  public newFavorite: FormControl = new FormControl('', Validators.required );

  get favoritesGames() {
    return this.myForm.get( 'favoriteGames' ) as FormArray;
  }

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

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[ index ].errors
      && formArray.controls[ index ].touched;
  }

  onDeleteFavorite( index: number ): void {
    this.favoritesGames.removeAt( index );
  }

  onAddToFavorites(): void {
    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoritesGames.push(
      this.fb.control( newGame, Validators.required )
    )

    this.newFavorite.reset();
  }
  onSubmit():void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log( this.myForm.value );
    (this.myForm.controls[ 'favoriteGames' ] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
