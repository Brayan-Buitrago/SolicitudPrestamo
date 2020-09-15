import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseEncabezadoComponent } from './base-encabezado.component';

describe('BaseEncabezadoComponent', () => {
  let component: BaseEncabezadoComponent;
  let fixture: ComponentFixture<BaseEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
