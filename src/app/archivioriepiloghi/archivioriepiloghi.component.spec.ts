import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivioriepiloghiComponent } from './archivioriepiloghi.component';

describe('ArchivioriepiloghiComponent', () => {
  let component: ArchivioriepiloghiComponent;
  let fixture: ComponentFixture<ArchivioriepiloghiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivioriepiloghiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivioriepiloghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
