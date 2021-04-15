import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { ValidatePassMatch } from './pass-match.validator';

describe('TimePickerComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [FormBuilder] })
            .compileComponents();
    });

    it('should return false if passwords do not match', () => {
        // GIVEN
        const fb = TestBed.inject(FormBuilder);
        // WHEN
        const result = ValidatePassMatch(fb.group({
            password: ['test1', [Validators.required]],
            confirmPassword: ['test', [Validators.required]]
        }, { validator: ValidatePassMatch }));
        // THEN
        expect(result).toEqual({ notsame: true });
    });

    it('should return true if passwords match', () => {
        // GIVEN
        const fb = TestBed.inject(FormBuilder);
        // WHEN
        const result = ValidatePassMatch(fb.group({
            password: ['test', [Validators.required]],
            confirmPassword: ['test', [Validators.required]]
        }, { validator: ValidatePassMatch }));
        // THEN
        expect(result).toEqual(null);
    });
});
