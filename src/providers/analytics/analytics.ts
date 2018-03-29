import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Injectable()
export class AnalyticsProvider {

  constructor(public http: HttpClient, public ga: GoogleAnalytics) {
    console.log('Hello AnalyticsProvider Provider');
    this.ga.startTrackerWithId('UA-116499272-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.firstTrack();
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  firstTrack() {
    this.trackView('app');
    this.setVersion(1);
  }

  trackView(view) {
    console.log('trackView');
    this.ga.trackView(view);
  }

  setVersion(version) {
    console.log('setVersion');
    this.ga.setAppVersion(version);
  }

  trackEvent(category, action, label, value) {
    console.log('trackEvent');
    this.ga.trackEvent(category, action, label, value);
  }

}
