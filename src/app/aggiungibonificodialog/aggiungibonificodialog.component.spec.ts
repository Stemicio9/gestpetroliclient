import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungibonificodialogComponent } from './aggiungibonificodialog.component';

describe('AggiungibonificodialogComponent', () => {
  let component: AggiungibonificodialogComponent;
  let fixture: ComponentFixture<AggiungibonificodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungibonificodialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungibonificodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
