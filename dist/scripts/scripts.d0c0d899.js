"use strict";angular.module("imageCleaningApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.router","toaster","oc.lazyLoad","datatables","datatables.bootstrap","rzModule","angularLazyImg"]).config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider",function(a,b,c){b.otherwise("/home"),a.state("home",{url:"/home",templateUrl:"views/admin/main.html",controller:"MainCtrl",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"sbAdminApp",files:["scripts/controllers/admin/main.js"]})}]}}).state("testUser",{url:"/testUser",templateUrl:"views/admin/testUser.html",controller:"testUserCtrl",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"sbAdminApp",files:["scripts/controllers/admin/testUserCtrl.js","models/testUserModel.js"]})}]}}).state("images",{url:"/images",templateUrl:"views/admin/images.html",controller:"imagesCtrl",resolve:{loadMyFiles:["$ocLazyLoad",function(a){return a.load({name:"sbAdminApp",files:["scripts/controllers/admin/imagesCtrl.js","models/imagesModel.js"]})}]}})}]),angular.module("imageCleaningApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("imageCleaningApp").controller("testUserCtrl",["$scope","testUserModel","ToasterService",function(a,b,c){var b=new b,d={name:"testUser1",surName:"testSurname1"};b.addUser(d).then(function(b){b.data&&(a.userData=b,c.toastSuccess("user added"))},function(a){c.toastError(a.data.error.message)})}]),function(){var a=["$http","APIService"],b=function(a,b){function c(){}var d=b.getApiBaseURL()+"api/v1/testRoute/";return c.prototype={addUser:function(b){return a.post(d+"addUser",b)}},c};b.$inject=a,angular.module("imageCleaningApp").factory("testUserModel",b)}(),function(){var a=[],b=function(){var a=this,b="production";return"production"===b?(a.protocal="https://",a.environment={ipAddress:"image-cleaning-api.herokuapp.com",port:""}):(a.protocal="http://",a.environment={ipAddress:"localhost",port:":3004"}),a.domain={apiBaseUrl:a.protocal+a.environment.ipAddress+a.environment.port},a.getApiBaseURL=function(){return a.domain.apiBaseUrl},a};b.$inject=a,angular.module("imageCleaningApp").factory("APIService",b)}(),function(){var a=["toaster"],b=function(a){var b=this;return b.toastWarnig=function(b,c,d,e){a.pop("Warning","Warning",b)},b.toastError=function(b,c,d,e){a.pop("error","Error",b)},b.toastSuccess=function(b,c,d,e){a.pop("success","Success",b)},b};b.$inject=a,angular.module("imageCleaningApp").factory("ToasterService",b)}(),angular.module("imageCleaningApp").run(["$templateCache",function(a){a.put("views/admin/images.html",'<div> <div> <div class="col-md-offset-4 col-md-4 text-center"><label for="rangePicker">Filter by Point</label> <rzslider id="rangePicker" rz-slider-model="rangeSlider.minValue" rz-slider-high="rangeSlider.maxValue" rz-slider-options="rangeSlider.options"></rzslider> </div> <div class="col-md-offset-2 col-md-8 col-sm-12 col-xs-12"> <table id="imagesTable" datatable="" dt-options="images.dttOptions" dt-columns="images.dtColumns" dt-instance="images.dtInstance" class="table table-striped table-bordered table-hover" align="center"> </table> </div> </div> </div>'),a.put("views/admin/main.html",'<div class="jumbotron"> <h1>ImageCleaningApp Home page</h1> </div>'),a.put("views/admin/testUser.html",'<div class="jumbotron"> <h1>this testUser Page</h1> <h4>user Data :{{userData}} </h4> </div>')}]);