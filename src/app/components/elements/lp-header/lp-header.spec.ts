import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpHeader } from './lp-header';

describe('LpHeader', () => {
  let component: LpHeader;
  let fixture: ComponentFixture<LpHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LpHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LpHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
