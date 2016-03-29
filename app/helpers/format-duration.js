import Ember from 'ember';

export function formatDuration(params/*, hash*/) {
  let duration = Math.round(parseFloat(params[0]));
  let minutes, seconds;

  if (duration > 60) {
    minutes = Math.floor(duration / 60);
    seconds = duration % 60;
  } else {
    seconds = duration;
  }

  if (minutes) {
    if (seconds > 0) {
      return `${minutes}min ${seconds}sec`;
    } else {
      return `${minutes}min`;
    }
  } else {
    return `${seconds}sec`;
  }
}

export default Ember.Helper.helper(formatDuration);
