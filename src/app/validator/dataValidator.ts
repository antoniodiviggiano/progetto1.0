import { FormControl } from "@angular/forms";
import { Data } from "@angular/router";
import moment from "moment";


export function dataValidator(control: FormControl) {
    let data: Data = new Date(control.value);
    let currentYear = new Date().getFullYear()
    let year = moment(data).year();
    if (!(moment(data, 'YYYY-MM-DD', true).isValid() && year > 999 && year <= currentYear )) {
        return { invalidData: true };
    } else {
        return null;
    }
}
