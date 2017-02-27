'use strict';

/**
 * @ngdoc overview
 * @name imageCleaningApp
 * @description
 * # imageCleaningApp
 *
 * Main module of the application.
 */
angular
  .module('imageCleaningApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'toaster',
    'oc.lazyLoad',
    'datatables',
    'datatables.bootstrap',
    'rzModule',
    'angularLazyImg'
  ])
  .config(function ($stateProvider, $routeProvider, $locationProvider, $ocLazyLoadProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .otherwise({
        redirectTo: '/'
      })
      .when('/', {
         //url: '/home',
        templateUrl: 'views/admin/main.html',
        controller: 'MainCtrl',
        activetab: 'home'
      })
      .when('/home', {
       // url: '/home',
        templateUrl: 'views/admin/main.html',
        controller: 'MainCtrl',
        activetab: 'home'
      })
      //.when('/testUser', {
      //  //  url: '/testUser',
      //  templateUrl: 'views/admin/testUser.html',
      //  controller: 'testUserCtrl'
      //})
      .when('/images', {
        //   url: '/images',
        templateUrl: 'views/admin/images.html',
        controller: 'imagesCtrl',
        activetab: 'images'
      });
  })
  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // console.log('in $routeChangeStart',next);
    });
  });
