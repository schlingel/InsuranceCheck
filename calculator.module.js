angular.module('todoApp', [])
  .filter('currency', function() {
  	return function(amount) {
  		amount = parseFloat(amount);

  		if(isNaN(parseInt(amount))) {
  			return '0€';
  		}

  		return numeral(amount).format('0,00.00') + '€';
  	}
  })
  .filter('percentage', function() {
  	return function(percentage) {
  		percentage = parseFloat(percentage);

  		if(isNaN(parseInt(percentage))) {
  			return '0%';
  		}

  		return numeral(percentage * 100).format('0,00.00') + '%'
  	}
  })
  .controller('CalcController', ['$scope', CalcController]);