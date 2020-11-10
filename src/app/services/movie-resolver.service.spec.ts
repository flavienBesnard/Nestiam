import { TestBed } from '@angular/core/testing';

import { MovieResolverService, SerieResolverService } from './movie-resolver.service';

describe('MovieResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieResolverService = TestBed.get(MovieResolverService);
    expect(service).toBeTruthy();
  });
});
describe('SerieResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SerieResolverService = TestBed.get(SerieResolverService);
    expect(service).toBeTruthy();
  });
});
