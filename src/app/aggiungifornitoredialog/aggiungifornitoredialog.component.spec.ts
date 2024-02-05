import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungifornitoredialogComponent } from './aggiungifornitoredialog.component';

describe('AggiungifornitoredialogComponent', () => {
  let component: AggiungifornitoredialogComponent;
  let fixture: ComponentFixture<AggiungifornitoredialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungifornitoredialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungifornitoredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
