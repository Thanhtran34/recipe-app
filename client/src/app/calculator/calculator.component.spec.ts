import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { CalculatorComponent } from './calculator.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('#CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      imports: [
        RouterTestingModule,
        OverlayModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        MatSelectModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        MatSnackBar,
        OverlayModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly fill data property', () => {
    // GIVEN
    const fb = TestBed.inject(FormBuilder);
    const formGroup = fb.group({
      gender: 'female',
      weight: '80',
      height: '170',
      age: '40',
      activity: 'moderate',
      goal: 'lose'
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    const expectedData = [
      { calories: 640, grams: 160, macro: 'Protein', percent: 34 },
      { calories: 640, grams: 160, macro: 'Carbs', percent: 34 },
      { calories: 582, grams: 65, macro: 'Fat', percent: 31 }
    ];
    expect(component.data).toEqual(expectedData);
  });

  it('should return if form is invalid', () => {
    // GIVEN
    const fb = TestBed.inject(FormBuilder);
    const formGroup = fb.group({
      gender: ['', [Validators.required]]
    });

    // WHEN
    component.submit(formGroup);

    // THEN
    expect(formGroup.valid).toBeFalsy();
    expect(typeof(component.data)).toEqual('undefined');
  });
});
