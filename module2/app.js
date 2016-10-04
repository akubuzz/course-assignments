(function () {
    'use strict';
    angular.module('main',[])
        .controller('toBuy',toBuy)
        .controller('bought',bought)
        .service('shoppingListService',shoppingListService);



    toBuy.$inject=['shoppingListService'];
    function toBuy(shoppingListService) {
        var list=this;
        // console.log(shoppingList.length());
        // list.show = shoppingList.length() == 0;

        list.items=shoppingListService.getItems();
        list.check=shoppingListService.checkItems();

        list.buy=function (itemIndex,quantity,item) {
            // console.log(itemIndex+quantity);
            shoppingListService.addItem(item,quantity);

            shoppingListService.removeItem(itemIndex);
            list.check=shoppingListService.checkItems();

        }

    }
    bought.$inject=['shoppingListService'];

    function bought(shoppingListService) {
        var list=this;
        list.items=shoppingListService.getPurchasedItems();
        list.check=function(){
           return shoppingListService.checkPurchased();
        }

    }


    function shoppingListService() {
        var service = this;

        // List of shopping items
        var items=[
            {
                name:'potato',
                quantity:'10 kgs'
            },
            {
                name:'pasta',
                quantity:'1 pkt'
            },
            {
                name:'sweets',
                quantity:'5 kgs'
            },
            {
                name:'Onion',
                quantity:'2 kgs'
            },
            {
                name:'Apple',
                quantity:'5 kgs'
            }
        ];

        var purchased=[];
        service.length=function () {
            return items.length;
        };
        service.addItem = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            purchased.push(item);
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };
        
        service.getPurchasedItems=function () {
            return purchased;
        };

        service.checkItems=function () {
            return items.length==0;
        };
        service.checkPurchased=function () {
            return purchased.length==0;
        }
    }

})();