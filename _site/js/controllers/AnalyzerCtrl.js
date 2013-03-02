

function AnalyzerCtrl($scope, $http, Analyzer, Data){
    $scope.analyzer = Analyzer;
    $scope.data = Data;

    $scope.atext = [];

    $scope.$watch('analyzer.query', function(value){
        for (i in $scope.analyzer.analyzers){
            $scope.analyze($scope.analyzer.analyzers[i]);
        }
    });

    $scope.analyze = function(analyzer) {
        var path = $scope.data.host + "/_analyze?analyzer=" + analyzer;

        $http.post(path, $scope.analyzer.query)
            .success(function(response){
                var ret = '';
                for(i in response.tokens){
                    ret += '[' + response.tokens[i].token + '] ';
                }
                $scope.analyzer.atext[analyzer] = ret;

            })
            .error(function(data, status, headers, config){
                //console.log(data);

            });
    }

}
