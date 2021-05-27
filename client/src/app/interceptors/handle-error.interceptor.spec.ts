import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';

import { HandleErrorInterceptor } from './handle-error.interceptor';

describe('#HandleErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [OverlayModule],
    providers: [
      HandleErrorInterceptor,
      MatSnackBar,
      OverlayModule
      ]
  }));

  it('should be created', () => {
    const interceptor: HandleErrorInterceptor = TestBed.inject(HandleErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
