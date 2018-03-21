import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UniversidadesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UniversidadesProvider Provider');
  }

  getUniversidades() {
    return new Promise<Array<any>>((resolve, reject) => {
      setTimeout(() => {
        resolve(Array.from(Array(150).keys()).map(i => "Universidad " + i))
      }, 1000);
    })
  }

}
