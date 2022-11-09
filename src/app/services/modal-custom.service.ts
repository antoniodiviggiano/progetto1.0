import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalCustomService {

  content : any ;

  constructor(private modalService: NgbModal) {}

  open(error : string){
    this.modalService.open(error,{size : "lg",animation : true, });
  }

  
}
