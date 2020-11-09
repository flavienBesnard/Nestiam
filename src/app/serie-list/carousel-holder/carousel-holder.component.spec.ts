import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHolderComponentSerie } from './carousel-holder.component';

describe('CarouselHolderComponent', () => {
  let component: CarouselHolderComponentSerie;
  let fixture: ComponentFixture<CarouselHolderComponentSerie>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselHolderComponentSerie ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselHolderComponentSerie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
