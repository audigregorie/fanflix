import { TestBed } from '@angular/core/testing'

import { MovieService } from './MovieService'

describe('MovieService', () => {
  let service: MovieService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MovieService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
