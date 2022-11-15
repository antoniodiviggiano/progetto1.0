import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrazioneComponent } from './registrazione.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostRegistrzioneService } from '../services/registrzione.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import mockResp from 'src/app/MockResponse/register.json'
import { AuthGuard } from '../auth/auth.guard';
import { CocktailComponent } from '../cocktail/cocktail.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';

fdescribe('RegistrazioneComponent', () => {
  let component: RegistrazioneComponent;
  let fixture: ComponentFixture<RegistrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrazioneComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        MatIconModule,
        ReactiveFormsModule,
        MatToolbarModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes(
          [{ path: "", component: LoginComponent },
           { path: "cocktail", component: CocktailComponent },
           { path: "login", component: LoginComponent },
           { path: "registrazione", component: RegistrazioneComponent },
           { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], },
           { path: "**", component: LoginComponent }
          ]
        ),
      ],
      providers: [
        PostRegistrzioneService,
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('username', () => {
    let input = component.form.get("nomeUtente");

    input?.setValue(null);
    fixture.detectChanges();

    expect(input?.invalid).toBeTruthy();
  });

  it('incorrect username length', () => {
    let input = component.form.get("nomeUtente");

    input?.setValue("st");
    fixture.detectChanges();

    expect(input?.invalid).toBeTruthy();
  });

  it('correct username length', () => {
    let input = component.form.get("nomeUtente");

    input?.setValue("ste");
    fixture.detectChanges();

    expect(input?.valid).toBeTruthy();
  });

  it('incorrect email', () => {
    let input = component.form.get("email");

    input?.setValue("test@");
    fixture.detectChanges();

    expect(input?.invalid).toBeTruthy();
  });

  it('correct email', () => {
    let input = component.form.get("email");

    input?.setValue("test@test.com");
    fixture.detectChanges();

    expect(input?.valid).toBeTruthy();
  });

  it('incorrect password length', () => {
    let input = component.form.get("password");

    input?.setValue("1234");
    fixture.detectChanges();

    expect(input?.invalid).toBeTruthy();
  });

  it('correct password length', () => {
    let input = component.form.get("password");

    input?.setValue("123456");
    fixture.detectChanges();

    expect(input?.valid).toBeTruthy();
  });

  it('correct birtday', () => {
    let input = component.form.get("dataNascita");

    input?.setValue("01/02/1999");
    fixture.detectChanges();

    expect(input?.valid).toBeTrue();
  });

  it('incorrect birtday', () => {
    let input = component.form.get("dataNascita");
    input?.setValue("31/12/01");

    expect(input?.invalid).toBeTrue();
  });

  it('correct form', () => {
    let form = component.form;

    form.controls.nomeUtente.setValue("test");
    form.controls.email.setValue("test@test.com");
    form.controls.password.setValue("123456");
    form.controls.dataNascita.setValue("01/05/2001");

    fixture.detectChanges();

    expect(form?.valid).toBeTrue();
  });

  it('incorrect form', () => {
    let form = component.form;

    form.controls.nomeUtente.setValue("te");
    form.controls.email.setValue("test/test.com");
    form.controls.password.setValue("123");
    form.controls.dataNascita.setValue("1");

    fixture.detectChanges();

    expect(form?.invalid).toBeTrue();
  });

  it('correct register', () => {
    let form = component.form;

    form.controls.nomeUtente.setValue("test");
    form.controls.email.setValue("test12@test12.com");
    form.controls.password.setValue("123456");
    form.controls.dataNascita.setValue("01/05/2001");

    let service = fixture.debugElement.injector.get(PostRegistrzioneService);

    spyOn(service, "create").and.callFake(() => {

      return of("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…iNCJ9.EZFYRkhRjTeAaN1xkg7kW9W-xbacbg5gqo4dngwLzH8");
    })

    component.registrer();

    expect(component.respComponent).toEqual(mockResp.accessToken);

  });

});
