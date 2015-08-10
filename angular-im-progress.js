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

    this.$get = [function () {
      var count = 0;

      return {
        start: function () {
          count++;

          NProgress.start();
        },
        done: function () {
          count = Math.max(0, --count);

          if (count === 0) {
            NProgress.done();
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
