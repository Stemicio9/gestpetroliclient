import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabbisognoComponent } from './fabbisogno.component';

describe('FabbisognoComponent', () => {
  let component: FabbisognoComponent;
  let fixture: ComponentFixture<FabbisognoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabbisognoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabbisognoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
