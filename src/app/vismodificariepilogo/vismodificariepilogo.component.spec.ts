import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VismodificariepilogoComponent } from './vismodificariepilogo.component';

describe('VismodificariepilogoComponent', () => {
  let component: VismodificariepilogoComponent;
  let fixture: ComponentFixture<VismodificariepilogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VismodificariepilogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VismodificariepilogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
