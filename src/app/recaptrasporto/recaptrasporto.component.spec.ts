import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaptrasportoComponent } from './recaptrasporto.component';

describe('RecaptrasportoComponent', () => {
  let component: RecaptrasportoComponent;
  let fixture: ComponentFixture<RecaptrasportoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecaptrasportoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaptrasportoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
