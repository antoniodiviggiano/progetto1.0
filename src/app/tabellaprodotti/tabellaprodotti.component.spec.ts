import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteProdottiService } from '../services/delete-prodotti.service';
//import  MockRespDelete  from "src/app/mockRespDelete/delete.json";
import { TabellaprodottiComponent } from './tabellaprodotti.component';

describe('TabellaprodottiComponent', () => {
  let service: DeleteProdottiService; 
  let httpTestingController: HttpTestingController;
  let component: TabellaprodottiComponent;
  let fixture: ComponentFixture<TabellaprodottiComponent>;
  let httpMock: HttpTestingController;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabellaprodottiComponent ],
      providers: [
        DeleteProdottiService,
          { provide: 'http://localhost:8080/prodotti', 
            useValue: 'apiurl'
          }
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
    }).compileComponents();
    service = TestBed.inject(DeleteProdottiService);

    //MockRespDelete = jasmine.createSpyObj([delete])


    fixture = TestBed.createComponent(TabellaprodottiComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => { 
    httpTestingController.verify(); 
   }); 

   /*   fit('dovrebbe effettuare una richiesta HTTP DELETE', () => {
    service.onDelete(1).subscribe((res:any) => {
      expect(res).toBe(1); 
     }); 

     const req = httpMock.expectOne(
      `http://localhost:8080/prodotti/`,
      'delete to api'
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(1);
      httpMock.verify();
    
   
    const req = httpTestingController.expectOne(`apiurl/${'1'}`, 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpTestingController.verify(); 
   });  */

   fit('dovrebbe effettuare una richiesta HTTP DELETE', () => {



    
   });
   

});
