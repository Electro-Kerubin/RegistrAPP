import { TestBed } from '@angular/core/testing';

import { GuardNoIngresadoGuard } from './guard-no-ingresado.guard';

describe('GuardNoIngresadoGuard', () => {
  let guard: GuardNoIngresadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardNoIngresadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
