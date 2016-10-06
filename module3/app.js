(function () {
    'use strict';
    angular.module('main',[])
        .controller('NarrowItDownController',NarrowItDownController)
        .service('MenuSearchService',MenuSearchService)
        .directive('foundItems',FoundItemsDirective);
       
    
    function FoundItemsDirective(){
        var ddo={
            templateUrl:'foundItems.html',
            items:'<'

        };
        return ddo;
    }

    NarrowItDownController.$inject=['MenuSearchService'];
    
    function NarrowItDownController(MenuSearchService) {
        
        var list=this;
        var found=[];
        list.key="";
        list.onRemove=function (index) {
          MenuSearchService.remove(index);  
        };
        list.search=function () {
            if(list.key.trim()==""){
                list.error="Nothing Found";
                list.items=[];
                return;
            }
            var response=MenuSearchService.getMatchedMenuItems(list.key);

                response.then(function (result) {
                    found=[];
                    list.error="";
                    // console.log(key);
                    for(var i=0;i<result.data.menu_items.length;i++)
                    {
                        // console.log(result.data.menu_items[i].description);

                        if(result.data.menu_items[i].description.indexOf(list.key)!==-1){

                            found.push("Name: "+result.data.menu_items[i].name +"__Short_Name: " +result.data.menu_items[i].short_name +"__Description: "+result.data.menu_items[i].description);
                        }
                    }
                    if(found.length==0)
                    {
                        list.error="Nothing Found";
                    }
                    list.items = found;
            });
            // console.log(promise);
            // console.log(promise);
            // if( promise[0]=="Nothing found" ){
            //     list.error="Nothing found";
            // }
            // else {
            //     list.error="";

            // }

        }
        
    }

    MenuSearchService.$inject=['$http'];
   function MenuSearchService($http) {
        var service=this;
       var found=[];
       
       service.remove=function (index) {
           found.splice(index, 1);
       };
        service.getMatchedMenuItems=function (key) {
            found=[];

            var response=$http({
                method:'GET',
                url:("https://davids-restaurant.herokuapp.com/menu_items.json")

            });
            return response;


            
        }
    }


})();