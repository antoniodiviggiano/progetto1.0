import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneComponent } from './registrazione.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


xdescribe('RegistrazioneComponent', () => {
  let component: RegistrazioneComponent;
  let fixture: ComponentFixture<RegistrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrazioneComponent ],
      providers: [HttpClientTestingModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

