/**
 * Torii provider for authentication against google using OAuth2
 * implicit grant.
 */

import Ember from 'ember';
import Oauth2 from 'torii/providers/oauth2-code';
import {configurable} from 'torii/configuration';
import randomUrlSafe from 'torii/lib/random-url-safe';

export default Oauth2.extend({
  name: 'google-implicit',

  // Client id
  clientId: configurable('clientId'),

  // Google's OAuth verion
  version: configurable('version', 'v2'),

  // Google's OAuth auth url
  baseUrl: Ember.computed(function() {
    return 'https://accounts.google.com/o/oauth2/' + this.get('version') + '/auth';
  }),

  // Space-delimited set of permissions that the application requests.
  scope: configurable('scope', 'email profile'),

  // A cryptographically strong random string that you use to prevent
  // intercepted responses from being reused. The Google Authorization
  // Server round-trips this parameter; you must verify your application
  // receives the same value it sent.
  nonce: randomUrlSafe(20),

  redirectUri: configurable('redirectUri', function(){
    // Default to the window.location
    return this._super();
  }),

  // Request response type from google
  responseType: 'token',

  // Value returned from google
  // Example:
  //
  // https://localhost:4200/
  // #access_token=1/fFBGRNJru1FQd44AzqT3Zg
  // &token_type=Bearer
  // &expires_in=3600
  // &nonce=DgkRrHXmyu3KLd0KDdfq
  responseParams: ['access_token', 'token_type', 'expires_in'],

  requiredUrlParams: ['client_id', 'response_type', 'redirect_uri'],
  optionalUrlParams: ['scope', 'nounce'],

  /**
   * @method open
   * @return {Promise<object>} If the authorization attempt is a success,
   * the promise will resolve an object containing the following keys:
   *   - access_token: Access token from Google
   *   - token_type: Token type, `Bearer` from Google
   *   - expires_in: Token expiry in seconds, 3600 sec
   *   - provider: The name of the provider, `google-implicit`
   * If there was an error or the user either canceled the authorization or
   * closed the popup window, the promise rejects.
   *
   * The contructed oauth url:
   *   https://accounts.google.com/o/oauth2/v2/auth
   *   ?scope=email%20profile
   *   &state=%2Fprofile
   *   &redirect_uri=https%3A%2F%2Flocalhost%3A4200
   *   &response_type=token
   *   &client_id=812741506391.apps.googleusercontent.com
   *   &nonce=DgkRrHXmyu3KLd0KDdfq
   */

  open() {
    const name = this.get('name');
    const url = this.buildUrl();
    const redirectUri = this.get('redirectUri');
    const responseParams = this.get('responseParams');
    const responseType = this.get('responseType');
    const nonce = this.get('nonce');

    let _this = this;
        // shouldCheckState = responseParams.indexOf('state') !== -1;

    return this.get('popup').open(url, responseParams).then(function(authData) {
      let missingResponseParams = [];

      responseParams.forEach(function(param) {
        if (authData[param] === undefined) {
          missingResponseParams.push(param);
        }
      });

      if (missingResponseParams.length) {
        throw new Error("The response from the provider is missing " +
              "these required response params: " + missingResponseParams.join(', '));
      }

      // if (shouldCheckState && authData.nonce !== nonce) {
      //   throw new Error('The response from the provider has an incorrect ' +
      //                   'session nonce param: should be "' + nonce + '", ' +
      //                   'but is "' + authData.nonce + '"');
      // }

      return authData;
    });
  },

  fetch(data) {
    return data;
  }
});
