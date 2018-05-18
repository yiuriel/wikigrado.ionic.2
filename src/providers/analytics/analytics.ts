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
    console.log('Hello AnalyticsProvider Provider');
    this.ready = false;
    this.max_try_number = 5;
    this.intents = 1;
    this.intent_timer = null;

    this.BUTTON_IN_VIEW = "boton en vista";
    this.CLICK_ACTION = "click";
  }

  initService() {
    console.log("INIT ANALYTICS SERVICE")
    this.ga.startTrackerWithId('UA-116499272-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ready = true;
        this.firstTrack();
      })
      .catch(e => {
        console.log('Error starting GoogleAnalytics', e);
        this.ready = false;
      });
  }

  firstTrack() {
    console.log('first track', this.ready);
    this.trackView('app');
    this.setVersion(1);
  }

  trackView(view) {
    console.log('trackView', this.ready);
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
    console.log('setVersion', this.ready);
    this.ga.setAppVersion(version);
  }

  setUserId(id) {
    console.log('setUserId', this.ready);
    this.ga.setUserId(id);
  }

  trackEvent(category, action, label, value) {
    console.log('trackEvent', this.ready);
    this.ga.trackEvent(category, action, label, value);
  }

}
