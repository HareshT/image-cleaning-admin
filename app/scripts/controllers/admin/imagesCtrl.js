'use strict';

/**
 * @ngdoc function
 * @name imageCleaningApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the imageCleaningApp
 */
angular.module('imageCleaningApp')
  .controller('imagesCtrl', ["$scope", "$compile","$sce","DTOptionsBuilder", "DTColumnBuilder", "ToasterService", "imagesModel", function ($scope, $compile,$sce, DTOptionsBuilder, DTColumnBuilder, ToasterService, imagesModel) {
    $scope.images = this;
    $scope.allImagaesId = [];
    $scope.AllImageDetails = [];
    $scope.isReloadedCtrl = true;
    var imagesModel = new imagesModel();
    var $postData = {};

    imagesModel.getApiUrl($postData).then(function (response) {
      console.log('apiUrl :',response)
          $scope.apiUrl = response.data;
      });

    //Range slider config
    $scope.rangeSlider = {
      minValue: 0,
      maxValue: 50,
      options: {
        floor: 0,
        ceil: 50,
        step: 1
      }
    };
    $scope.$watchCollection('rangeSlider', function (newValue,oldValue) {
        $postData.filter = {
          minPoint : newValue.minValue,
          maxPoint : newValue.maxValue
        }
        //$scope.isReloadedCtrl = true;
        if( $scope.isReloadedCtrl === false){
          $scope.images.reloadData();
        }
    });

    $scope.images.dttOptions = DTOptionsBuilder.newOptions()
      .withOption('ajax', function (data, callback) {
        $postData.limit = data.length,
          $postData.offset = data.start,
          // search: data.search.value,
          $postData.order = data.order[0],

        imagesModel.getAllimages($postData).then(function (response) {
          _.each(response.data, function (imgDetail) {
            if (_.indexOf($scope.allImagaesId, imgDetail._id) === -1) {
              $scope.allImagaesId.push(imgDetail._id);
              $scope.AllImageDetails[imgDetail._id] = imgDetail;
            }
            var imageDetail = response.data;
            imageDetail.sort(function(a, b){return a.imgPoint-b.imgPoint});
            if($scope.isReloadedCtrl === true){
              $scope.rangeSlider.maxValue = imageDetail[imageDetail.length - 1].imgPoint;
              //$scope.rangeSlider.minValue = imageDetail[0].imgPoint;
              $scope.rangeSlider.options.ceil = imageDetail[imageDetail.length - 1].imgPoint;
              $scope.isReloadedCtrl = false;
            }
          });
          callback(response)
        })
      })
      .withDataProp('data')
      .withOption('processing', true)
      .withOption('serverSide', true)
      .withOption('bLengthChange', true)
      .withPaginationType('full_numbers')
      .withDisplayLength(10)
      //.withOption('stateSave', true)
      .withOption('bFilter', false)
      .withBootstrap()
      .withOption('createdRow', function (row) {
        $compile(angular.element(row).contents())($scope);
      });

    $scope.images.dtColumns = [
      DTColumnBuilder.newColumn(null).withTitle('Image').withClass('col-sm-2').renderWith(img),
      DTColumnBuilder.newColumn(null).withTitle('Path').notSortable().withClass('col-sm-2').renderWith(imgPath),
      DTColumnBuilder.newColumn(null).withTitle('Point').withClass('col-sm-2').renderWith(imgPoint),
      DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().withClass('col-sm-2').renderWith(actionHtml),

    ];
    $scope.images.dtInstance = {};
    $scope.images.reloadData = function () {
      $scope.images.dtInstance.reloadData();
    };
    function imgPath(data) {
      var html = '';
      html = '<span>' + data.imgPath + '</span>';
      return html;
    }

    function imgPoint(data) {
      var html = '';
      html = '<span style="max-width:20px;">' + data.imgPoint + '</span>';
      return html;
    }

    function img(data) {
      var html = '';
      var imdData = $sce.trustAsResourceUrl( $scope.apiUrl+''+data.imgPath+'' + data.imgName);
      //html = '<img height="50px" width="50px" lazy-img="' + data.imgPath + '' + data.imgName + '">'
      html = '<img height="50px" width="50px" lazy-img="'+imdData+'">'
      return html;
    }

    function actionHtml(data) {
      var html = '';
      html = '<i class="glyphicon glyphicon-trash" style="cursor: pointer;" ng-click="deleteImage(\'' + data._id + '\')"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
      html += '<i class="btn btn-default" ng-click="verifyImage(\'' + data._id + '\')">Verify</i>'
      return html;
    }

    $scope.deleteImage = function (id) {
      var imgIndex = _.indexOf($scope.allImagaesId, id);
      //console.log('imgIndex',imgIndex)
      var incresePointImgsArray = _.take($scope.allImagaesId, imgIndex);

      $postData = {
        incresePointImgsArray: incresePointImgsArray,
        arcivedImgId: id,
        destinationPath: 'AllArchivedImages',
        archivedImgDetail: $scope.AllImageDetails[id]
      }
      imagesModel.increaseOnePointsForAllAboveImages($postData).then(function (response) {
        if (response.data) {
          // $scope.allImagaesId =  _.slice($scope.allImagaesId, imgIndex, imgIndex + 1);
          $scope.allImagaesId = []
          $scope.AllImageDetails = [];
          ToasterService.toastSuccess('image Moved to archived');
          $scope.images.reloadData();
        }
      });
    }
    $scope.verifyImage = function (id) {
      $postData = {
        verifyImageId: id
       // destinationPath: 'AllArchivedImages',
       // archivedImgDetail: $scope.AllImageDetails[id]
      }
      imagesModel.verifyOneImage($postData).then(function (response) {
        if (response.data) {
          // $scope.allImagaesId =  _.slice($scope.allImagaesId, imgIndex, imgIndex + 1);
          //$scope.allImagaesId = []
          //$scope.AllImageDetails = [];
          ToasterService.toastSuccess('1 point increased for image');
          $scope.images.reloadData();
        }
      });
    }
  }]);
