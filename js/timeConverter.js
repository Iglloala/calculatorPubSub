var Calculator = (function(objeto){
	
	// Método para pasar de objeto Time a segundos
	objeto.timeToSeconds = function(tiempo){
		var total = 0;
		total += tiempo.hours * 3600;
		total += tiempo.minutes * 60;
		total += tiempo.seconds *1;
		
		return total;
	}

	// Método para pasar de segundos a objeto Time
	objeto.secondsToTime = function(seconds) {
		var convertedHours = Math.floor(seconds/3600);
		var resto = seconds%3600;
		var convertedMinutes = Math.floor(resto/60);
		resto = resto%60;
		var convertedSeconds = parseFloat(resto.toFixed(2));
		var time = new objeto.Time(convertedHours, convertedMinutes, convertedSeconds);
		return time;
	}

	// Devuelve objeto con los nuevos métodos que aporta el submódulo
	return objeto;
}(Calculator || {}));