import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  actions: {
    fetchData(siteId) {
      if (siteId === 'none') {
        return;
      }

      let _this = this;
      let analytics = {};
      let ajax = this.get('ajax');

      analytics['site'] = this.get('accounts').findBy('id', siteId)['url'];

      // Google Line chart options.
      let chartOptions = {
          title: 'Analytics',
          curveType: 'function',
        };

      analytics['chartOptions'] = chartOptions;

      // Pageviews and others by date in the last 30 days.
      let url = '/analytics/v3/data/ga' +
                '?ids=ga:' + siteId +
                '&metrics=ga:pageviews,ga:bounceRate,ga:avgSessionDuration,ga:pageviewsPerSession,ga:uniquePageviews' +
                '&start-date=30daysAgo' +
                '&end-date=yesterday' +
                '&dimensions=ga:date';

      return ajax.request(url).then((response) => {
        let label = ['Date', 'Pageviews']
        let rows = response.rows.map((item)=> {
            return [item[0], parseInt(item[1])];
          });

        let chartData = [label, ...rows];
        analytics['chartData'] = chartData;

        analytics['pageviews'] = response.totalsForAllResults['ga:pageviews'];
        analytics['uniquePageview'] = response.totalsForAllResults['ga:uniquePageviews'];
        analytics['avgSessionDuration'] = response.totalsForAllResults['ga:avgSessionDuration'];
        analytics['bounceRate'] = response.totalsForAllResults['ga:bounceRate'];
        analytics['pageviewsPerSession'] = response.totalsForAllResults['ga:pageviewsPerSession'];

        // 10 data rows sort by pageview
        url = '/analytics/v3/data/ga' +
              '?ids=ga:' + siteId +
              '&start-date=30daysAgo' +
              '&end-date=yesterday' +
              '&metrics=ga:avgSessionDuration,ga:pageviews,ga:avgPageLoadTime' +
              '&dimensions=ga:hostname,ga:pagePath' +
              '&sort=-ga:pageviews' +
              '&max-results=10';

        ajax.request(url).then((response) => {
          if (response.totalResults > 0) {
            analytics['pagemetric'] = response.rows.map((item) => {
              return {
                'pageurl': item[0] + item[1],
                'pagepath': item[1],
                'avgSessionDuration': item[2],
                'pageviews': item[3],
                'avgPageLoadTime': item[4],
              };
            });
          }

          _this.set('analytics', analytics);
          _this.set('showChart', true);
        });
      });
    }
  }
});
