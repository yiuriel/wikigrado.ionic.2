import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EnvProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EnvProvider Provider');
  }

  getEnvironmentUrl(env) {
    switch(env) {
      case 'dev':
      case 'local':
        return "http://localhost:3000";
      case 'production':
        return 'http://0.0.0.0:3000';
    }
  }

}
