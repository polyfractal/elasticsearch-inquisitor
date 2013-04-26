
function DropdownCtrl($scope, $http, Data) {
    $scope.data = Data;

    $scope.indices = [];
    $scope.types = [];


    var path = $scope.data.host + "/_mapping";
    $http.get(path).then(function(response){
        $scope.data.mapping = response.data;

        for (i in response.data){

            $scope.indices.push(i)
            $scope.types[i] = [];
            for (j in response.data[i]){

                $scope.types[i].push(j);
            }
        }


        path = $scope.data.host + "/_aliases";
        $http.get(path).then(function(response){

          for (i in response.data){
            for (j in response.data[i].aliases) {
              $scope.indices.push(j);
              $scope.types[j] = $scope.types[i];
              $scope.data.mapping[j] = $scope.data.mapping[i];
            }
          }
        });
    });


}
