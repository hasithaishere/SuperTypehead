var app = angular.module('superTypeaheadApp', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);

app.controller('mainController',function($scope){
    $scope.allUIObjectsData = [
        {
            '@rid' : '#47:1',
            '@class' : 'UiObjectFolder',
            'name' : 'ebay',
            'childUiObjects' : [
                {
                    '@rid' : '#55:1',
                    '@class' : 'UiObject',
                    'name' : 'ebayUserName'
                },
                {
                    '@rid' : '#55:2',
                    '@class' : 'UiObject',
                    'name' : 'ebayPassword'
                }
            ]
        },
        {
            '@rid' : '#47:2',
            '@class' : 'UiObjectFolder',
            'name' : 'googleSearch',
            'childUiObjects' : [
                {
                    '@rid' : '#55:10',
                    '@class' : 'UiObject',
                    'name' : 'searchBox'
                },
                {
                    '@rid' : '#55:11',
                    '@class' : 'UiObject',
                    'name' : 'btn_imfeel_lucky'
                },
                {
                    '@rid' : '#55:12',
                    '@class' : 'UiObject',
                    'name' : 'btn_search'
                }
            ]
        }
    ];
    function printit(){
        console.log("RESULT>>", $scope.allUIObjectsData);
    }
    printit();
});

app.directive('superTypeahead', function($timeout) {
    return {
        restrict: 'E',
        templateUrl: 'template.html',
        link: function (scope, element, attr) {

            scope.boxOneObject = [{
                value: 'Gear',
                label: '<i class="fa fa-globe"></i> txt_searchBox_search'
            }, {
                value: 'Globe',
                label: '<i class="fa fa-globe"></i> btn_search'
            }, {
                value: 'Heart',
                label: '<i class="fa fa-globe"></i> txt_searchBox_ebay'
            }, {
                value: 'Camera',
                label: '<i class="fa fa-globe"></i> btn_signin_ebay'
            }];

            console.log(scope.allUIObjectsData);
            console.log(attr);
            angular.element(element[0].querySelector('#boxTwo')).attr('disabled', true);
            angular.element(element[0].querySelector('#boxTwo')).css('display','none');


            scope.boxOneHandler = function (event){
                if(event.keyCode === 190){
                    scope.dotVisibler = true;
                    event.preventDefault();
                    console.log("ELEMENT >>", element[0].querySelector('#boxOne'));

                    $timeout(function(){
                        angular.element(element[0].querySelector('#boxTwo')).attr('disabled', false);
                        angular.element(element[0].querySelector('#boxTwo')).removeAttr('style');
                        (element[0].querySelector('#boxTwo')).focus();
                        angular.element(element[0].querySelector('#boxOne')).attr('disabled', true);
                    },0);
                }

            }

            scope.boxTwoHandler = function (event){
                scope.$watch("boxTwo", function(oldValue,newValue) {
                    if((typeof oldValue == 'undefined' && typeof newValue == 'undefined')){
                        focusFirstBox(event);
                    } else {
                        if(typeof oldValue != 'object' && typeof newValue != 'object'){
                            if(oldValue.length == 0 && newValue.length <=1){
                                focusFirstBox(event);
                            }
                        }
                    }
                });

            }

            scope.divClickFocus = function (event){
                if(scope.dotVisibler === true){
                    (element[0].querySelector('#boxTwo')).focus();
                } else {
                    (element[0].querySelector('#boxOne')).focus();
                }
            }

            scope.infocus = function() {
                angular.element(element[0].querySelector('.st-boxHolder')).addClass("st-boxHolder-focus");
            }
            scope.outfocus = function() {
                angular.element(element[0].querySelector('.st-boxHolder')).removeClass("st-boxHolder-focus");
            }

            function focusFirstBox(event){
                if(event.keyCode === 8){
                    event.preventDefault();
                    scope.dotVisibler = false;
                    $timeout(function(){
                        angular.element(element[0].querySelector('#boxOne')).attr('disabled', false);
                        (element[0].querySelector('#boxOne')).focus();
                        angular.element(element[0].querySelector('#boxTwo')).attr('disabled', true);
                        angular.element(element[0].querySelector('#boxTwo')).css('display','none');
                    },0);
                }
            }

        }
    }
});