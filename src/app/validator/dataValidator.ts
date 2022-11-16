import { FormControl,ValidatorFn } from '@angular/forms';
import { Data } from "@angular/router";
import moment from "moment";

export default class DataValidator {
    static dataValidator: ValidatorFn;
    dataValidator(control: FormControl) {
        let data: Data = new Date(control.value);
        let year = moment(data).year();
        if (!(moment(data, 'YYYY-MM-DD', true).isValid() && year > 999)) {
            return { invalidData: true };
        } else {
            return null;
        }
    }
}

    
