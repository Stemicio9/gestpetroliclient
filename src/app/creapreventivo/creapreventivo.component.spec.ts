import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreapreventivoComponent } from './creapreventivo.component';

describe('CreapreventivoComponent', () => {
  let component: CreapreventivoComponent;
  let fixture: ComponentFixture<CreapreventivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreapreventivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreapreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
