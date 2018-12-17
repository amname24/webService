videoApp.directive("equalsTo",function(){
    return{
        require : "ngModel",
        restrict: 'A', // S'utilise uniquement en tant qu'attribut
        scope: true,
          link: function(scope, element, attributes, modelVal) {
  
            var check = function () {
              //Valeur du champs courant 
              var v1 = scope.$eval(attributes.ngModel); // attributes.ngModel = "ConfirmPassword"
              //valeur du champ à comparer
              var v2 = scope.$eval(attributes.equalsTo).$viewValue; // attributes.equalsTo = "Password"
              return v1 == v2;
            }
            scope.$watch(check, function(isValid) {
              modelVal.$setValidity("equalsTo",isValid);
            });
          }
    }
})
videoApp.directive("checkLength",function(){
  return {
    replace: false,
    restrict: 'A',
    require : "ngModel",
    link: function (scope, element, attributes, modelVal) {
      var mesureStrength = function () {
        var p = scope.$eval(attributes.ngModel);      
        return p.length >= 8 ;
      }
      scope.$watch(mesureStrength, function (isValid) {
            modelVal.$setValidity("checkLength",isValid);
      })
    }
  }
})

videoApp.directive("checkSymbols",function(){
  return {
    replace: false,
    restrict: 'A',
    require : "ngModel",
    link: function (scope, element, attributes, modelVal) {
      var mesureStrength = function () {
        var p = scope.$eval(attributes.ngModel);
        var _regex = /[$-/:-?{-~!"^_`\[\]]/g;   
        var _symbols = _regex.test(p);          
        return _symbols ;
      }
      scope.$watch(mesureStrength, function (isValid) {
            modelVal.$setValidity("checkSymbols",isValid);
      })
    }
  }
})
videoApp.directive("checkLowerletters",function(){
  return {
    replace: false,
    restrict: 'A',
    require : "ngModel",
    link: function (scope, element, attributes, modelVal) {
      var mesureStrength = function () {
        var p = scope.$eval(attributes.ngModel);
        var _lowerLetters = /[a-z]+/.test(p);                    
        return _lowerLetters ;
      }
      scope.$watch(mesureStrength, function (isValid) {
            modelVal.$setValidity("checkLowerletters",isValid);
      })
    }
  }
})
videoApp.directive("checkUpperletters",function(){
  return {
    replace: false,
    restrict: 'A',
    require : "ngModel",
    link: function (scope, element, attributes, modelVal) {
      var mesureStrength = function () {
        var p = scope.$eval(attributes.ngModel);               
        var _upperLetters = /[A-Z]+/.test(p);
        return _upperLetters ;
      }
      scope.$watch(mesureStrength, function (isValid) {
            modelVal.$setValidity("checkUpperletters",isValid);
      })
    }
  }
})
videoApp.directive("checkNumbers",function(){
  return {
    replace: false,
    restrict: 'A',
    require : "ngModel",
    link: function (scope, element, attributes, modelVal) {
      var mesureStrength = function () {
        var p = scope.$eval(attributes.ngModel);
        var _numbers = /[0-9]+/.test(p);
        return  _numbers  ;
      }
      scope.$watch(mesureStrength, function (isValid) {
            modelVal.$setValidity("checkNumbers",isValid);
      })
    }
  }
})
// videoApp.directive("checkStrength",function(){
//   return {
//     replace: false,
//     restrict: 'A',
//     require : "ngModel",
//     link: function (scope, element, attributes, modelVal) {
//       var mesureStrength = function () {
//         var p = scope.$eval(attributes.ngModel);
//         var _regex = /[$-/:-?{-~!"^_`\[\]]/g;             
//         var _lowerLetters = /[a-z]+/.test(p);                    
//         var _upperLetters = /[A-Z]+/.test(p);
//         var _numbers = /[0-9]+/.test(p);
//         var _symbols = _regex.test(p);
//         return _lowerLetters && _upperLetters && _numbers && _symbols ;
//       }
//       scope.$watch(mesureStrength, function (isValid) {
//             modelVal.$setValidity("checkStrength",isValid);
//       })
//     }
//   }
// })