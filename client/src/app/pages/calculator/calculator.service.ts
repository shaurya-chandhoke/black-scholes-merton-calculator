import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  requestData = new BehaviorSubject({});
  responseData = new BehaviorSubject({});

  url = environment.serverURL + '/api/calculator';
  constructor(private http: HttpClient) { }

  submitData(requestBody: any) {
    this.http.post(this.url, requestBody).subscribe((response) => {
      this.responseData.next(response);
    })
  }

  observeResponse() {
    return this.responseData.asObservable();
  }
}
