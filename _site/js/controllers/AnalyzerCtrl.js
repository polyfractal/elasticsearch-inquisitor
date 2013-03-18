
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function AnalyzerCtrl($scope, $http, Analyzer, Data){
    $scope.analyzer = Analyzer;
    $scope.data = Data;


    $scope.detectCustomAnalyzers = function() {
        var path = $scope.data.host + "/_cluster/state";

        $http.get(path)
            .success(function(response){
                console.log(response);
                $scope.analyzer.customAnalyzers = {};

                //This section loops over all the 'settings' objects and converts
                //the long "path-like" parameters into objects - kludgy...probably a better way to do this
                for (i in response.metadata.indices) {
                    $scope.analyzer.customAnalyzers[i] = {};
                    for (j in response.metadata.indices[i].settings){

                        //We keep reducing until counter == length of the split params array
                        //At that point, we assign the value of j instead of returning a new, nested
                        //object
                        var params = j.split('.');
                        var counter = 0;

                        j.split('.').reduce(function(m,a) {
                            counter += 1;

                            if (typeof m[a] === "undefined"){
                                if (counter == params.length)
                                    m[a] = response.metadata.indices[i].settings[j];
                                else
                                    m[a] = {};
                            }

                            return m[a];
                        }, $scope.analyzer.customAnalyzers[i]);

                    }
                }

            })
            .error(function(data, status, headers, config){
                //console.log(data);

            });
    }

    //Because detectCustomAnalyzers executes asynch, we need to watch the customAnalyzer field
    //to detect when the GET returns
    $scope.$watch('analyzer.customAnalyzers', function(value) {
        for (i in $scope.analyzer.customAnalyzers){

            //Make sure this index has some analyzer defined
            if (typeof $scope.analyzer.customAnalyzers[i].index.analysis !== "undefined"
                && typeof $scope.analyzer.customAnalyzers[i].index.analysis.analyzer !== "undefined") {

                for (j in $scope.analyzer.customAnalyzers[i].index.analysis.analyzer) {
                    $scope.analyze(j, i);
                }
            }
        }
    });

    //If the text changes, query ES to get the tokens
    $scope.$watch('analyzer.query', function(value){
        for (i in $scope.analyzer.analyzers){
            $scope.analyze($scope.analyzer.analyzers[i]);
        }

        for (i in $scope.analyzer.customAnalyzers){

            //Make sure this index has some analyzer defined
            if (typeof $scope.analyzer.customAnalyzers[i].index.analysis !== "undefined"
                && typeof $scope.analyzer.customAnalyzers[i].index.analysis.analyzer !== "undefined") {

                for (j in $scope.analyzer.customAnalyzers[i].index.analysis.analyzer) {
                    $scope.analyze(j, i);
                }
            }
        }
    });

    $scope.analyze = function(analyzer, index) {

        //index is an optional parameter
        index = (typeof index === "undefined") ? "" : "/" + index;

        var path = $scope.data.host + index + "/_analyze?analyzer=" + analyzer;

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

    $scope.detectCustomAnalyzers();

}
