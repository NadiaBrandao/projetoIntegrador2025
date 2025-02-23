import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Busca1Component } from './busca1.component';

describe('Busca1Component', () => {
  let component: Busca1Component;
  let fixture: ComponentFixture<Busca1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Busca1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Busca1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});