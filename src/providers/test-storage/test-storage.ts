import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class TestStorageProvider {

  test_done: boolean;

  constructor(public storage: Storage) {
  }

  setTestDone(value, callback) {
    this.test_done = value;
    this.storage.set('test_done', value).then(value => {
      callback(value, null)
    }, error => {
      callback(null, error);
    });
  }

  getTestDone(callback) {
    if (this.test_done) {
      return callback(this.test_done, null);
    } else {
      this.storage.get('test_done').then(value => {
        callback(value, null)
      }, error => {
        callback(null, error);
      });
    }
  }

}
