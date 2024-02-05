import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneprezzipersingoloclienteComponent } from './gestioneprezzipersingolocliente.component';

describe('GestioneprezzipersingoloclienteComponent', () => {
  let component: GestioneprezzipersingoloclienteComponent;
  let fixture: ComponentFixture<GestioneprezzipersingoloclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneprezzipersingoloclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneprezzipersingoloclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
