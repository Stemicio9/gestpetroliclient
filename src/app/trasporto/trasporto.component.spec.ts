import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasportoComponent } from './trasporto.component';

describe('TrasportoComponent', () => {
  let component: TrasportoComponent;
  let fixture: ComponentFixture<TrasportoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasportoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasportoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
