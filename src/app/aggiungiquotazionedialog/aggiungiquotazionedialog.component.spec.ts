import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiquotazionedialogComponent } from './aggiungiquotazionedialog.component';

describe('AggiungiquotazionedialogComponent', () => {
  let component: AggiungiquotazionedialogComponent;
  let fixture: ComponentFixture<AggiungiquotazionedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiquotazionedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiquotazionedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
