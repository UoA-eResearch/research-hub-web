import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';


@Injectable()
export class CerApiService {

  private static requestServiceUrl = 'serviceRequest';
  private static hostname = environment.cerApiUrl;


  constructor(private http: HttpClient) {

  }

  requestService(serviceName: string, body: any) {
    return this.http.post(CerApiService.hostname + CerApiService.requestServiceUrl + '/' + serviceName, body);
  }
}
