import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecappreventivoComponent } from './recappreventivo.component';

describe('RecappreventivoComponent', () => {
  let component: RecappreventivoComponent;
  let fixture: ComponentFixture<RecappreventivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecappreventivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecappreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
