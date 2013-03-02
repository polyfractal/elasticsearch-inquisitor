

function TokenizerCtrl($scope, $http, Tokenizer, Data){
    $scope.tokenizer = Tokenizer;
    $scope.data = Data;

    $scope.ttext = [];

    $scope.$watch('tokenizer.query', function(value){
        for (i in $scope.tokenizer.tokenizers){
            $scope.analyze($scope.tokenizer.tokenizers[i]);
        }
    });

    $scope.analyze = function(tokenizer) {
        var path = $scope.data.host + "/_analyze?tokenizer=" + tokenizer;

        $http.post(path, $scope.tokenizer.query)
            .success(function(response){
                var ret = '';
                for(i in response.tokens){
                    ret += '[' + response.tokens[i].token + '] ';
                }
                $scope.tokenizer.ttext[tokenizer] = ret;

            })
            .error(function(data, status, headers, config){
                //console.log(data);

            });
    }

}
