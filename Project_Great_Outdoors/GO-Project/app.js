var app = angular.module("myApp", ["ngRoute"]).config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./client/views/customerLoginView.html",
            controller: "loginController"
        })
        .when("/add", {
            templateUrl: "./client/views/addressView.html",
            controller: "mycont"
        })
        .when("/goToCart", {
            templateUrl: "./client/views/showCartView.html",
            controller: "myCntr"
        })
        .when("/diffAdd", {
            templateUrl: "./client/views/differentAddressView.html",
            controller: "diffAddCntr"
        })
        .when("/productMaster", {
            templateUrl: "./client/views/productMasterView.html",
            controller: "productMasterCntr"
        })
        .when("/homePage", {
            templateUrl: "./client/views/homePageView.html",
            controller: "homePageCntr"
        })
        .when("/orderdetailpage", {
            templateUrl: "./client/views/orderDetailsView.html",
            controller: "orderPageCntr"
        })
        .when("/logesticPage", {
            templateUrl: "./client/views/logisticPageView.html",
            controller: "logisticController"
        })
        .when("/addressPage", {
            templateUrl: "./client/views/addressPageView.html",
            controller: "addressPagecontroller"
        })
    .when("/desc",{
     templateUrl:"./client/views/productDescriptionView.html",
     controller:"productDescCntr"
    })
});