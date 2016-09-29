
(function () {
    'use strict';
    angular.module('main_app',[])
        .controller('module1',module1);
    
    module1.$inject=['$scope'];

    function module1($scope) {

        $scope.text="";
        $scope.check=function () {
            var count=0;
            var str=$scope.text.split(',');
            for(var i=0;i<str.length;i++)
            {
                if(str[i].trim()!=""){
                    count++;
                }
            }
            if(count==0)
            {
                $scope.output="Please enter data first";
                return;
            }
            if(count<=3)
            {
               
                $scope.output="Enjoy!";
            }
            else
            {
                $scope.output="Too much!";
            }
        }
        
    }
})();
