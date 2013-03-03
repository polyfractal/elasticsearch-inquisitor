

function AnalyzerCtrl($scope, $http, Analyzer, Data){
    $scope.analyzer = Analyzer;
    $scope.data = Data;

    $scope.atext = {};

    $scope.$watch('analyzer.query', function(value){
        for (i in $scope.analyzer.analyzers){
            $scope.analyze($scope.analyzer.analyzers[i]);
        }
    });

    $scope.analyze = function(analyzer) {
        var path = $scope.data.host + "/_analyze?analyzer=" + analyzer;

        $http.post(path, $scope.analyzer.query)
            .success(function(response){
                var tokens = [];
                for(i in response.tokens){
                    tokens.push(response.tokens[i].token);
                }
                $scope.analyzer.atext[analyzer] = tokens;

            })
            .error(function(data, status, headers, config){
                //console.log(data);

            });
    }

}
