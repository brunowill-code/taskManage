import { TestBed } from '@angular/core/testing';

import { ManageToDosService } from './manage-to-dos.service';

describe('ManageToDosService', () => {
  let service: ManageToDosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageToDosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
