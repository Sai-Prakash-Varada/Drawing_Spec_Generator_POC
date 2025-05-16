import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSpecDocumentComponent } from './drawing-spec-document.component';

describe('DrawingSpecDocumentComponent', () => {
  let component: DrawingSpecDocumentComponent;
  let fixture: ComponentFixture<DrawingSpecDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingSpecDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingSpecDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
