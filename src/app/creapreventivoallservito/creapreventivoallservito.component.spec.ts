import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreapreventivoallservitoComponent } from './creapreventivoallservito.component';

describe('CreapreventivoallservitoComponent', () => {
  let component: CreapreventivoallservitoComponent;
  let fixture: ComponentFixture<CreapreventivoallservitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreapreventivoallservitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreapreventivoallservitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
