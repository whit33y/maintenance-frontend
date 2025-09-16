import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceEvents } from './maintenance-events';

describe('MaintenanceEvents', () => {
  let component: MaintenanceEvents;
  let fixture: ComponentFixture<MaintenanceEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
