import { TestBed } from '@angular/core/testing';

import { MaintenanceEventsService } from './maintenance-events-service';

describe('MaintenanceEventsService', () => {
  let service: MaintenanceEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
