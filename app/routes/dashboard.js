import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),

  model() {
    let _this = this;
    let ajax = this.get('ajax');
    let accounts = [];

    return ajax.request('plus/v1/people/me').then((response) => {
      let user = response;

      ajax.request('analytics/v3/management/accountSummaries').then((response) => {
        if (!Ember.isEmpty(response.items)) {
          for (let items of response.items) {
            if (!Ember.isEmpty(items.webProperties)) {
              for (let properties of items.webProperties) {
                let profiles = {};
                profiles['name'] = properties.name;
                profiles['url'] = properties.websiteUrl;
                profiles['ua'] = properties.id;

                if (!Ember.isEmpty(properties.profiles)) {
                  for (let profile of properties.profiles) {
                    profiles['id'] = profile.id;
                    accounts.pushObject(profiles);
                  }
                }
              }
            }
          }
        }
      }).catch((error) => {
        _this.controller.set('noAnalyticsAccount', true);
        throw error;
      });

      return {
        'user': user,
        'accounts': accounts
      }
    })
  },

  setupController(controller, model) {
    controller.set('user', model.user);
    controller.set('accounts', model.accounts);
    controller.set('showChart', false);
  },
});
