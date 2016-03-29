import Ember from 'ember';

export function precision(params/*, hash*/) {
  let value = parseFloat(params[0]);

  // Return the value 35.387898 as 35.4
  return Math.round(value.toFixed(2) * 10) / 10;
}

export default Ember.Helper.helper(precision);
