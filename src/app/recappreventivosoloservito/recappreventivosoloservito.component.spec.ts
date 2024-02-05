import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecappreventivosoloservitoComponent } from './recappreventivosoloservito.component';

describe('RecappreventivosoloservitoComponent', () => {
  let component: RecappreventivosoloservitoComponent;
  let fixture: ComponentFixture<RecappreventivosoloservitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecappreventivosoloservitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecappreventivosoloservitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
