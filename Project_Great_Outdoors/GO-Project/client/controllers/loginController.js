app.controller("loginController", function ($scope, $rootScope) {
    $scope.userViewer = true;
    $scope.adminViewer = true;
    $rootScope.Cartob = [];
    $rootScope.logedInUserId = "C101";
    $scope.login = function () {
        $rootScope.logedInUserId = 'C101';

        window.location.href = "#!goToCart";
    }
});