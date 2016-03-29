# Elytics

Simple Ember.js app that generates a minimal analytics report from your Google analytics data.

* You will need client id for local dev and server deploy from google.
* Rename env.txt to .env 
* Replace the client id in .env

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone ` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development
* Create ssl dir 
  `mkdir ssl`
* Generate SSL cert for the local dev.
  `openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.crt -nodes`
* `ember server --ssl`
* Visit your app at [https://localhost:4200](https://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.


## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

