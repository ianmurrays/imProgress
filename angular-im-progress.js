'use strict';

angular
  .module('imProgress', [])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('imProgressInterceptor');
  })
  .provider('imProgress', function () {
    // Initial configuration
    NProgress.configure({
      trickleRate: 0
    });

    /**
     Call this to further configure NProgress
     (https://github.com/rstacruz/nprogress#configuration)
     */
    this.configure = function (config) {
      NProgress.configure(config);
    };

    this.$get = ['$timeout', function ($timeout) {
      var count = 0;
      var timeout;

      return {
        start: function () {
          $timeout.cancel(timeout);
          count++;

          NProgress.start();
        },
        done: function () {
          count = Math.max(0, --count);

          if (count === 0) {
            timeout = $timeout(function () {
              NProgress.done();
            }, 300);
          }
          else {
            NProgress.inc(0.1);
          }
        }
      };
    }];
  })
  .factory('imProgressInterceptor', function ($q, imProgress) {
    return {
      request: function (config) {
        imProgress.start();

        return config;
      },
      response: function (response) {
        imProgress.done();

        return response;
      },
      responseError: function (response) {
        imProgress.done();

        return $q.reject(response);
      }
    };
  });
