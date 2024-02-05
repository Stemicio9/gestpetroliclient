import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoclientesingolaComponent } from './riepilogoclientesingola.component';

describe('RiepilogoclientesingolaComponent', () => {
  let component: RiepilogoclientesingolaComponent;
  let fixture: ComponentFixture<RiepilogoclientesingolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiepilogoclientesingolaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiepilogoclientesingolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
