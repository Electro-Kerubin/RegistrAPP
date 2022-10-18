import { TestBed } from '@angular/core/testing';

import { GuardIngresadoGuard } from './guard-ingresado.guard';

describe('GuardIngresadoGuard', () => {
  let guard: GuardIngresadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardIngresadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
