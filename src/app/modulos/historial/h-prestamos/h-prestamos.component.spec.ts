import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HPrestamosComponent } from './h-prestamos.component';

describe('HPrestamosComponent', () => {
  let component: HPrestamosComponent;
  let fixture: ComponentFixture<HPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
