import { TestBed } from '@angular/core/testing';

import { ActionListService } from './action-list.service';

describe('ActionListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionListService = TestBed.get(ActionListService);
    expect(service).toBeTruthy();
  });
});
