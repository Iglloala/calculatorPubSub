// Submodulo distanceConverter para calculator.js
var Calculator = (function(objeto){
	
	// kmToMeters
	/**
	* kmToMeters
	* @param {km}
	* @return {meters}
	* @description convert kilometers in meters.
	*/
	objeto.kmToMeters = function(km){
		return parseFloat((km*1000));
	}
	
	// metersToKm
	/**
	* metersToKm
	* @param {meters}
	* @return {km}
	* @description convert meters in km
	*/
	objeto.metersToKm = function(meters){
		return parseFloat((meters/1000));
	}
	
	// metersToMiles
	/**
	* metersToMiles
	* @param {meters}
	* @return {miles}
	* @description convert meters in miles
	*/
	objeto.metersToMiles = function(meters){
		return parseFloat((meters*0.000621371));
	}

	// milesToMeters
	/**
	* milesToMeters
	* @param {miles}
	* @return {meters}
	* @description convert miles in meters
	*/
	objeto.milesToMeters = function(miles) {
		return parseFloat((miles*1609.344));
	}

	// milesToImperial
	/**
	* milesToImperial
	* @param {miles}
	* @return {object}
	* @description convert miles in imperial format
	* @example { miles: 1, yards: 343, feets: 2}.
	*
	*/
	objeto.milesToImperial = function(miles){
		var totalPies = miles * 5280
		var convertedMiles = Math.floor(totalPies/5280);
		var resto = totalPies%5280;
		var convertedYards = Math.floor(resto/3);
		resto = resto%3;
		var convertedFeets = parseFloat(resto).toFixed(2);
		var imperial = new objeto.Imperial(convertedMiles, convertedYards, convertedFeets);
		return imperial;
	}

	// yardsToImperial
	/**
	* yardsToImperial
	* @param {yards}
	* @return {object}
	* @description convert yards in imperial format
	* @example { miles: 1, yards: 343, feets: 2}.
	*/
	objeto.yardsToImperial = function(yards){
		var totalPies = yards * 3;
		var convertedMiles = Math.floor(totalPies/5280);
		var resto = totalPies%5280;
		var convertedYards = Math.floor(resto/3);
		resto = resto%3;
		var convertedFeets = parseFloat(resto).toFixed(2);
		var imperial = new objeto.Imperial(convertedMiles, convertedYards, convertedFeets);
		return imperial;	
	}

	// imperialToMiles
	/**
	* imperialToMiles
	* @param {object}
	* @return {miles}
	* @description convert imperial format
	* @example { miles: 1, yards: 343, feets: 2} in miles.
	*/
	objeto.imperialToMiles = function(imperial){
		var total = 0;
		//total += imperial.miles;
		total += (!isNaN(imperial.miles)) ? imperial.miles : 0;
		//total += imperial.yards/1760;
		total += (!isNaN(imperial.yards/1760)) ? imperial.yards/1760 : 0;
		//total += imperial.feet/5280;
		total += (!isNaN(imperial.feet/5280)) ? imperial.feet/5280 : 0;
		return parseFloat(total);
	}

	// 

	// Devuelve objeto con los nuevos métodos que aporta el submódulo
	return objeto;
})(Calculator || {});