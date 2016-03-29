import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  session: Ember.inject.service(),
  host: 'https://www.googleapis.com',

  headers: Ember.computed('session.data.authenticated.access_token', {
    get() {
      let headers = {};
      const accessToken = this.get('session.data.authenticated.access_token');

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return headers;
    }
  }),

  isUnauthorized(status, headers, payload) {
    if (status === 401) {
      alert('Your login session has expired. Please login again.');
      this.get('session').invalidate();
    }
  },

  // isForbidden(status, headers, payload) {
  //   // this.set('noAnalyticsAccount', true);
  //   // console.log(payload);
  //   return payload;
  // }
});
