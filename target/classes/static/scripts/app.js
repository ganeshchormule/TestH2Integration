var app =  angular.module("shoppingCartApp",['ngRoute']);


app.config(function ($routeProvider) {


    $routeProvider.when('/products', {
        
		 templateUrl: 'products.html',
         controller: 'ProductCtrl'
    }).
    when('/registerUser', {
        templateUrl: 'partials/register_user.html',
        controller: 'UserCtrl'
    }).
    otherwise({
        redirectTo: '/registerUser'
    });
});

app.controller('UserCtrl',['$scope', '$http', function( $scope, $http ){
   
   $scope.user =  {};
   
   
   
   $scope.register = function() {
	   
	   
   var req = {
	 method: 'POST',
	 url: '/addUser',	 
	 data: $scope.user
   }
   
   

   $http(req).then(function(response){
	   
	   $scope.message = "User Registered Successfully";  
    });
	   
	   
   }	   
      
	  
   
}]);

app.controller('ProductCtrl',['$scope', function( $scope ){
   
      
	  
	  
	     
}]);

app.factory('UserFactory',function($http){

   var userFactory = {};
   
   var users = [
    {
        "id": 1,
        "name": "John",
        "mobile": "8356234199",
        "status": "active"
    },
    {
        "id": 2,
        "name": "Scott",
        "mobile": "8358234197",
        "status": "inactive"
    },
    {
        "id": 3,
        "name": "Tom",
        "mobile": "1156234199",
        "status": "active"
    }
]
   
   userFactory.getRegisteredUsers = function()
   {
       return users;
   }  
   
   return userFactory;

});



app.directive('myUserInfo', function(){

        return {
		
		 restrict: 'E',
		 scope: {
					user : '='
		 },
		 
		 templateUrl: 'my-user-info.html'
		
		
		}

});