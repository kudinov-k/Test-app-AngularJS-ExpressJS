var app = angular.module('testApp', []);

app.controller('mainCtrl', function ($scope, $http) {
    $http.get('/getfiles').then(function (response) {
        $scope.input = response.data.input;
        $scope.patterns = response.data.patterns;
    });
    $scope.send = function () {
        $http.get('/analise').then(function (response) {
            $scope.mod1 = response.data.mod1;
            $scope.mod2 = response.data.mod2;
            $scope.mod3 = response.data.mod3;
        });
    }

    $scope.findingoogle = function () {
        if (!$scope.search_text)
            return;
        var data = {search_text: $scope.search_text};
        $http.post('/googleget', data).then(function (response) {
            $scope.links = response.data;
        })
    }
});
