import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoclienteComponent } from './riepilogocliente.component';

describe('RiepilogoclienteComponent', () => {
  let component: RiepilogoclienteComponent;
  let fixture: ComponentFixture<RiepilogoclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiepilogoclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiepilogoclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
