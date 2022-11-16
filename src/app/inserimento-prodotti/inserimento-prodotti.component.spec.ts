import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserimentoProdottiComponent } from './inserimento-prodotti.component';

describe('InserimentoProdottiComponent', () => {
  let component: InserimentoProdottiComponent;
  let fixture: ComponentFixture<InserimentoProdottiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserimentoProdottiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserimentoProdottiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
