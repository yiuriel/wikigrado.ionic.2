import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Injectable()
export class AnalyticsProvider {

  ready: boolean;
  max_try_number: number;
  intents: number;
  intent_timer: any;
  BUTTON_IN_VIEW: string;
  CLICK_ACTION: string;

  constructor(public http: HttpClient, public ga: GoogleAnalytics) {
    this.ready = false;
    this.max_try_number = 5;
    this.intents = 1;
    this.intent_timer = null;

    this.BUTTON_IN_VIEW = "boton en vista";
    this.CLICK_ACTION = "click";
  }

  initService() {
    this.ga.startTrackerWithId('UA-120264440-1')
      .then(() => {
        this.ready = true;
        this.firstTrack();
      })
      .catch(e => {
        this.ready = false;
      });
  }

  firstTrack() {
    this.trackView('app');
    this.setVersion(1);
  }

  trackView(view) {
    if (this.ready) {
      return this.ga.trackView(view);
    }
    this.intent_timer = setTimeout(() => {
      if (!this.ready && this.intents < this.max_try_number) {
        this.intents += 1;
        this.trackView(view);
      } else if (!this.ready && this.intents === this.max_try_number) {
        this.intents = 1;
        return;
      } else {
        this.intents = 1;
        this.ga.trackView(view);
        this.intent_timer = null;
      }
    }, 1000);
  }

  setVersion(version) {
    this.ga.setAppVersion(version);
  }

  setUserId(id) {
    this.ga.setUserId(id);
  }

  trackEvent(category, action, label) {
    this.ga.trackEvent(category, action, label);
  }

}
