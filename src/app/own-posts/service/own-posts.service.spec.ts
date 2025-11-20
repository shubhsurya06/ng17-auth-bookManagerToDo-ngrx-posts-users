import { TestBed } from '@angular/core/testing';

import { OwnPostsService } from './own-posts.service';

describe('OwnPostsService', () => {
  let service: OwnPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
