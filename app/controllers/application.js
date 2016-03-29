import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    signInViaGoogle() {
      let _this = this;
      // console.log(this.get('session'));

      this.get('session').authenticate('authenticator:torii', 'google-implicit').then(function(data) {
        console.log(data);
        // _this.transitionTo('dashboard');
      }, function(error){
        console.log(error);
        _this.set('error', 'Could not sign you in: ' + error.message);
      });
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
