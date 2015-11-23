'use strict';
angular.module('app.login', ['ui.router'])
    .config(['$stateProvider', function($stateProvider){
        $stateProvider
            .state('login', {
                url: "/login"
                , templateUrl:'./app/login/login.html'
                , controller:'LoginController'
            })
    }])
    .controller('LoginController',['$scope','LoginService','$state', function($scope,LoginService,$state){
        LoginService.doLogout();

        $scope.doLogin = (user)=>{
            LoginService.doLogin(user).then((data)=> {
                sessionStorage.setItem('token',data.data.token);
                $state.go('home');
            })
        }
    }])
    .service('LoginService',['$http',function($http){
        var url = location.origin+'/authenticate';
        this.doLogin = (user)=> {
            return $http.post(url, user);
        }
        this.doLogout = ()=>{
            localStorage.removeItem('token');
        }
    }])
