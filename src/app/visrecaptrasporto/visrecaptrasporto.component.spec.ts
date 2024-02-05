import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisrecaptrasportoComponent } from './visrecaptrasporto.component';

describe('VisrecaptrasportoComponent', () => {
  let component: VisrecaptrasportoComponent;
  let fixture: ComponentFixture<VisrecaptrasportoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisrecaptrasportoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisrecaptrasportoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
