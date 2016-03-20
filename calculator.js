function CalcController($scope) {
    var calc = this;
    
    calc.labels = {
    	months : getMonthLabels()
    };
    calc.data = {
    	monthlyRate : 30,
    	age : 28,
        passbookInterest : 0.0185,
    	pensionAge : 65,
    	brokerRate : 0.06,
    	managementCosts : 0.05,
    	insurenceTax : 0.036,
    	assetShare : 0.00041,
    	yearInterests : []
    };

    calc.nullInterests = function() {
        for(var i = 0; i < calc.data.yearInterests.length; i++) {
            calc.data.yearInterests[i] = 0;
        }

        onChange();
    };

    calc.data.passbookSavings = calcSavings(calc.data.monthlyRate, calc.data.passbookInterest);
    calc.data.yearInterests = getDefaultInterests();
	calc.calculateInterest = function(yearIndex, savings) {
    	var i = yearIndex;
    	var interest = calc.data.yearInterests[i];
    	savings = isNaN(parseInt(savings)) ? calc.data.yearData[i].savings : savings;
		
		if(interest >= 0) {
			return savings * interest / 100;
		} else {
			return (savings * interest) / 100;
		}
    };

    calcCosts();

    
    var watchedEntries = ['monthlyRate', 'age', 'pensionAge', 'brokerRate', 'managementCosts', 'insurenceTax', 'assetShare'];

    watchedEntries.forEach(function(entry) {
        $scope.$watch('calc.data.' + entry, onChange);
    });
    $scope.$watchCollection('calc.data.yearInterests', onChange);

    function onChange() {
        calcCosts();
        calc.data.passbookSavings = calcSavings(calc.data.monthlyRate, calc.data.passbookInterest);
    }


    function calcSavings(monthlyRate, interest) {
        var years = calc.data.pensionAge - calc.data.age;
        var savings = 0;

        for(var i = 0; i < years; i++) {
            savings += (monthlyRate * 12);
            savings += (savings * interest * 0.75);
        }

        return savings;
    }

    function calcCosts() {
        calc.data.monthlyRate = parseFloat(calc.data.monthlyRate);
    	var years = calc.data.pensionAge - calc.data.age;
    	var savings = 0;
    	var costs = 0;
    	var yearData = [];
    	var variableCosts = 0;
    	calc.data.brokerCosts = years * 12 * calc.data.monthlyRate * calc.data.brokerRate

    	for(var i = 0; i < years; i++) {
    		var row = {};
    		var yearSavings = 0;
    		var monthData = [];
    		var yearCosts = 0;

    		for(var d = 0; d < 12; d++) {
    			var monthlyCosts = monthlyCost(i, d, savings);
    			var monthVariableCosts = savings * calc.data.assetShare;
    			variableCosts += monthVariableCosts;
    			yearSavings += calc.data.monthlyRate - monthlyCosts;
    			yearCosts += calc.data.monthlyRate;

    			monthData.push({
    				bruttoInvest : calc.data.monthlyRate,
    				cost : monthlyCosts,
    				variableCosts : monthVariableCosts,
    				savings : yearSavings + savings,
    				nettoInvest : calc.data.monthlyRate - monthlyCosts
    			});
    		}

    		savings += yearSavings;
    		costs += yearCosts;

    		var interestAmount = Math.max(calc.calculateInterest(i, savings), 0);

    		row.isBrokerCostsYear = i < 5;
    		row.year = (new Date()).getFullYear() + i;
    		row.yearSavings = yearSavings;
    		row.yearCosts = yearCosts;
    		row.costs = costs;
    		row.savings = savings + interestAmount;
    		row.months = monthData;
    		row.variableCosts = variableCosts;
    		yearData.push(row);

            savings += interestAmount;
    	}

    	calc.data.yearData = yearData;
        calc.data.twotrustSavings = savings;
    	calc.data.variableCosts = variableCosts;
    }

    function monthlyCost(year, month, assets) {
    	var brokerCosts = year < 5 ? calc.data.brokerCosts / (5 * 12) : 0;
    	var sum = assets * calc.data.assetShare;

    	sum += calc.data.monthlyRate * calc.data.insurenceTax;
    	sum += calc.data.monthlyRate * calc.data.managementCosts;
    	sum += brokerCosts;

    	return sum;
    }

    function getDefaultInterests() {
    	var years = calc.data.pensionAge - calc.data.age;
    	var interests = [];

    	for(var i = 0; i < years; i++) {
    		interests.push(i < 7 ? badInterest(i) : 4);
    	}

    	return interests;

    	function badInterest(i) {
    		var factors = [ 10, 10, 20, 100, 60, 50, 40 ];
    		return (-1) * (Math.floor(Math.random() * factors[i]) + 1);
    	}
    }

    function getMonthLabels() {
    	var monthCounter = 0;
    	var startDate = moment('2015-01-01');
    	var labels = [];

    	for(var i = 0; i < 12; i++) {
    		labels.push(startDate.format('MMM'));
    		startDate.add(1, 'months');
    	}

    	return labels;
    }
  }
