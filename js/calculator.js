// MÓDULO Calculator
var Calculator = (function(objeto){

	//Clase Time
	 objeto.Time = function(hours, minutes, seconds){
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
	}

	// Clase Imperial
	objeto.Imperial = function(miles, yards, feet){
		this.miles = miles;
		this.yards = yards;
		this.feet = feet;
	}	

	// Método que calcula el "pace" a partir de un tiempo en segundos y una distancia en km devolviendo el resultado en km y en millas
	/**
	* [paceInKm calcula el ritmo de carrera por kilometro y milla a
	partir del tiempo en segundos realizado y la distancia recorrida en
	kilometros]
	* @param {number} timeInSeconds
	* @param {number} distanceInKm
	* @return {[time,time]} [devuelve un array con el ritmo por
	kilometro y ritmo por milla]
	*/
	objeto.paceInKm = function(timeInSeconds, distanceInKm){
		// Calculo el pace en km
		var tiempoEnMinutos = parseFloat(timeInSeconds/60);
		var paceEnKm = parseFloat((tiempoEnMinutos/distanceInKm));
		var paceSegundos = paceEnKm*60;
		var timePaceKm = this.secondsToTime(paceSegundos);
		// Calculo el pace en millas
		//var timePaceMiles = this.paceInMiles(timeInSeconds, this.metersToMiles(this.kmToMeters(distanceInKm)));
		var distanceInMiles = this.metersToMiles(this.kmToMeters(distanceInKm));
		var paceEnMillas = parseFloat(tiempoEnMinutos/distanceInMiles);
		paceSegundos = paceEnMillas*60;
		var timePaceMiles = this.secondsToTime(paceSegundos);
		// Publica el resultado del calculo
		PubSub.publish("calcular/pace", {pace: [timePaceKm, timePaceMiles]});
		// Preparo un objeto objectHistory y llamo al método add de calculatorHistory
		var ohType = 'pace';
		var ohUnits = 'Km';
		var ohPace = timePaceKm;
		var ohDistance = distanceInKm;
		var ohMark = this.secondsToTime(timeInSeconds);
		var objectHistory = new CalculatorHistory.objectHistory(ohType, ohUnits, ohPace, ohDistance, ohMark);
		CalculatorHistory.add(objectHistory);
		// Y retorno los dos Time con el resultado
		return [timePaceKm, timePaceMiles];
	}

	// Método que calcula el ritmo a partir de un tiempo en segundos y una distancia en millas devolviendo el resultado en km y millas
	/**
	* [paceInMiles calcula el ritmo de carrera por kilometro y milla a
	partir del tiempo en segundos realizado y la distancia recorrida en
	millas]
	* @param {number} timeInSeconds
	* @param {number} distanceInMiles
	* @return {[time,time]} [devuelve un array con el ritmo por
	kilometro y ritmo por milla]
	*/
	objeto.paceInMiles = function(timeInSeconds, distanceInMiles){
		// Calculo el pace en millas
		var tiempoEnMinutos	= parseFloat(timeInSeconds/60);
		var paceEnMillas = parseFloat(tiempoEnMinutos/distanceInMiles);
		var paceSegundos = paceEnMillas*60;
		var timePaceMiles = this.secondsToTime(paceSegundos);
		// Calculo el pace en KM
		//var timePaceKm = this.paceInKm(timeInSeconds, this.metersToKm(this.milesToMeters(distanceInMiles)));
		var distanceInKm = this.metersToKm(this.milesToMeters(distanceInMiles));
		var paceEnKm = parseFloat(tiempoEnMinutos/distanceInKm);
		var paceSegundos = paceEnKm*60;
		var timePaceKm = this.secondsToTime(paceSegundos);
		// Publica el resultado del calculo
		PubSub.publish("calcular/pace", {pace: [timePaceKm, timePaceMiles]});
		// Preparo un objeto objectHistory y llamo al método add de calculatorHistory
		var ohType = 'pace';
		var ohUnits = 'millas';
		var ohPace = timePaceKm;
		var ohDistance = distanceInKm;
		var ohMark = this.secondsToTime(timeInSeconds);
		var objectHistory = new CalculatorHistory.objectHistory(ohType, ohUnits, ohPace, ohDistance, ohMark);
		CalculatorHistory.add(objectHistory);
		// Y retorno los dos Time con el resultado
		return [timePaceKm, timePaceMiles];
	}

	// Método para calcular la marca en kilómetros
	/**
	* [markFromPacePerKm: calcula la marca esperada al recorrer la
	distancia en kilometros al ritmo de carrera por kilometro realizado]
	* @param {time} pacePerKm
	* @param {number} distanceInMeters
	* @return {time} [devuelve el tiempo/marca esperado]
	*/
	objeto.markFromPacePerKm = function(pacePerKm, distanceInMeters) {
		var distanciaEnKm = this.metersToKm(distanceInMeters);
		var ritmoEnSegundos = this.timeToSeconds(pacePerKm);
		var marcaEnSegundos = ritmoEnSegundos * distanciaEnKm;
		var markTime = this.secondsToTime(marcaEnSegundos);
		return markTime;
	}

	// Método para calcular la marca en millas
	/**
	* [markFromPacePerMile: calcula la marca esperada al recorrer la
	distancia en millas al ritmo de carrera por milla realizado]
	* @param {time} pacePerMile
	* @param {imperial} distanceInImperial
	* @return {time} [devuelve el tiempo/marca esperado]
	*/
	objeto.markFromPacePerMile = function(pacePerMile, distanceInImperial){
		var distanciaEnMillas = this.imperialToMiles(distanceInImperial);
		var ritmoEnSegundos = this.timeToSeconds(pacePerMile);
		var marcaEnSegundos = ritmoEnSegundos * distanciaEnMillas;
		var markTime = this.secondsToTime(marcaEnSegundos);
		return markTime;
	}

	/**
	* [tableTimeFromPacePerKm: calcula la marca esperada al recorrer la
	distancia en metros al ritmo de carrera por kilometro cada
	cutDistanceInMeters]
	* @param {time} pacePerKm
	* @param {number} distanceInMeters
	* @param {number} cutDistanceInMeters
	* @return {time} [devuelve un array de objetos con propiedades
	distance=distanciaIntermedia mark=tiempo de paso en la distancia
	intermedia]
	*/
	objeto.tableTimeFromPacePerKm = function(pacePerKm, distanceInMeters, cutDistanceInMeters){
		var arrayMarcas = [];
		// Genera una marca por cada punto de corte durante el recorrido a la distancia
		for (var distanciaAcumulada=cutDistanceInMeters; distanciaAcumulada<distanceInMeters; distanciaAcumulada += cutDistanceInMeters){
			var distance = distanciaAcumulada;
			var mark = this.markFromPacePerKm(pacePerKm, distanciaAcumulada);
			obj = {
				distance: distance,
				mark: mark
			}
			arrayMarcas.push(obj);
		}
		// Y genera una última marca con la posición final
		var distance = distanceInMeters;
		var mark = this.markFromPacePerKm(pacePerKm, distanceInMeters);
		obj = {
			distance: distance,
			mark: mark
		}
		arrayMarcas.push(obj);
		// Publica el resultado
		PubSub.publish('calcular/tiempos', {arrayMarcas: arrayMarcas});
		return arrayMarcas;
	}

	/**
	* [tableTimeFromPacePerMile: calcula la marca esperada al recorrer
	la distancia en millas al ritmo de carrera por milla cada
	cutDistanceInYards]
	* @param {time} pacePerMile
	* @param {number} distanceInMiles
	* @param {number} cutDistanceInYards
	* @return {time} [devuelve un array de objetos con propiedades
	distance=distanciaIntermediaImperial mark=tiempo de paso en la
	distancia intermedia]
	*/
	objeto.tableTimeFromPacePerMile = function(pacePerMile, distanceInMiles, cutDistanceInYards){
		var arrayMarcas = [];
		var cutDistanceInMiles = this.imperialToMiles(this.yardsToImperial(cutDistanceInYards));
		// calcula los tiempos para las distancias intermedias
		var distanciaAcumulada = cutDistanceInYards;
		while (distanciaAcumulada<distanceInMiles*1760) {
			var acumuladaImperial = this.milesToImperial(distanciaAcumulada/1760);
			var mark = this.markFromPacePerMile(pacePerMile, acumuladaImperial);
			obj = {
				distance: acumuladaImperial,
				mark: mark
			}
			arrayMarcas.push(obj);
			// incrementa la distancia acumulada
			distanciaAcumulada += cutDistanceInYards;
		}
		// calcula el tiempo para la distancia final
		mark = this.markFromPacePerMile(pacePerMile, this.milesToImperial(distanceInMiles));
		obj = {
			distance:  this.milesToImperial(distanceInMiles),
			mark: mark
		}
		arrayMarcas.push(obj);
		// Publica el resultado
		PubSub.publish('calcular/tiempos', {arrayMarcas: arrayMarcas});
		return arrayMarcas;
	}

	// Aquí retorna el objeto
	return objeto;
})(Calculator || {});

