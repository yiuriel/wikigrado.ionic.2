import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EnvProvider {

  constructor(public http: HttpClient) {
  }

  getEnvironmentUrl(env) {
    switch(env) {
      case 'dev':
      case 'local':
        return "http://localhost:3000";
      case 'production':
      default:
        return 'https://api.wikigrado.es';
    }
  }

}
