
function DropdownCtrl($scope, $http, Data) {
    $scope.data = Data;

    $scope.indices = [];
    $scope.types = [];


    var path = $scope.data.host + "/_mapping";
    $http.get(path).then(function(response){
        $scope.data.mapping = response.data;

        for (i in response.data){

            //set the currentIndex to the first index we encounter
            //if ($scope.data.currentIndex === "")
            //    $scope.data.currentIndex = i;

            $scope.indices.push(i)
            $scope.types[i] = [];
            for (j in response.data[i]){
                //set the currentType to the first type we encounter
                //if ($scope.data.currentType === "")
                //    $scope.data.currentType = j;

                $scope.types[i].push(j);
            }
        }
    });
}
