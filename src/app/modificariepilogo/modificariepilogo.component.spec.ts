import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificariepilogoComponent } from './modificariepilogo.component';

describe('ModificariepilogoComponent', () => {
  let component: ModificariepilogoComponent;
  let fixture: ComponentFixture<ModificariepilogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificariepilogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificariepilogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
