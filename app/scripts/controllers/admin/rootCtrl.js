'use strict';

angular.module('imageCleaningApp')
  .controller('rootCtrl',["$scope","$route", function ($scope,$route) {
    $scope.$route = $route;
  }]);
