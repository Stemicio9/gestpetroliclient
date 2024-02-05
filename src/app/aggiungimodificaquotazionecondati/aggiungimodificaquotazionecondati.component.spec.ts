import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungimodificaquotazionecondatiComponent } from './aggiungimodificaquotazionecondati.component';

describe('AggiungimodificaquotazionecondatiComponent', () => {
  let component: AggiungimodificaquotazionecondatiComponent;
  let fixture: ComponentFixture<AggiungimodificaquotazionecondatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungimodificaquotazionecondatiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungimodificaquotazionecondatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
