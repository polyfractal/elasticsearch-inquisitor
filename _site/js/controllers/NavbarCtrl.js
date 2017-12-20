
function NavbarCtrl($scope, $rootScope, $route, $location, Data) {
    $scope.data = Data;

    $scope.isActive = function(route) {

        var path = $location.path();


        if (path === '/')
            path = '/queries';

        return (('/' + route.toLowerCase()) === path);
    }


}
