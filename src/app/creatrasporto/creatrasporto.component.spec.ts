import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatrasportoComponent } from './creatrasporto.component';

describe('CreatrasportoComponent', () => {
  let component: CreatrasportoComponent;
  let fixture: ComponentFixture<CreatrasportoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatrasportoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatrasportoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
