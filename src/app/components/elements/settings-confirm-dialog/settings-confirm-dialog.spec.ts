import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsConfirmDialog } from './settings-confirm-dialog';

describe('SettingsConfirmDialog', () => {
  let component: SettingsConfirmDialog;
  let fixture: ComponentFixture<SettingsConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsConfirmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
