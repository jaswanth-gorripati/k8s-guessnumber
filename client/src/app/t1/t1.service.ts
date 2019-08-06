import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment'

@Injectable()
export class T1Service {

    constructor(private http: HttpClient) { }
    setValue() {
        let _API = '/api/sett1value'
        return this.http.post(environment.api_URL+_API,{})
    }
    checkGN(number) {
        let _API = '/api/guessNumber'
        return this.http.post(environment.api_URL+_API,{'number':number})
    }
    getEntered() {
        let _API = '/api/entered'
        return this.http.get(environment.api_URL+_API)
    }

}
