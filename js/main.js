// Pillo los elementos susceptibles de disparar eventos:
var btCalcularRitmo = document.getElementById('btCalcularRitmo');
var btCalcularTiempos = document.getElementById('btCalcularTiempos');
var selectorTipoTiempos = document.getElementById('tipoDistanciaTiempos');
var btActualizarHistorial = document.getElementById('btActualizarHistorial');
// Evento para que se calcule el ritmo
btCalcularRitmo.addEventListener('click', function(){
	// Recoge los valores implicados
	var distancia = Number(document.getElementById('campoDistanciaRitmo').value) || 0;
	var horas = Number(document.getElementById('horasTiempoRitmo').value) || 0;
	var minutos = Number(document.getElementById('minutosTiempoRitmo').value) || 0;
	var segundos = Number(document.getElementById('segundosTiempoRitmo').value) || 0;
	var tipo = document.getElementById('tipoDistanciaRitmo').value || "Kilómetros";
	// Llamo a paceIn***
	switch (tipo){
		case "Kilómetros":
			var tiempo = new Calculator.Time(horas, minutos, segundos);
			var tiempoEnSegundos = Calculator.timeToSeconds(tiempo);
			var respuesta = Calculator.paceInKm(tiempoEnSegundos, distancia);
			// Preparo un objeto objectHistory y llamo al método add de calculatorHistory
			var ohType = 'pace';
			var ohUnits = 'Km';
			var ohPace = respuesta[0];
			var ohDistance = distancia;
			var ohMark = Calculator.secondsToTime(tiempoEnSegundos);
			var objectHistory = new CalculatorHistory.objectHistory(ohType, ohUnits, ohPace, ohDistance, ohMark);
			CalculatorHistory.add(objectHistory);
			break;
		case "Millas":
			var tiempo = new Calculator.Time(horas, minutos, segundos);
			var tiempoEnSegundos = Calculator.timeToSeconds(tiempo);
			var respuesta = Calculator.paceInMiles(tiempoEnSegundos, distancia);
			// Preparo un objeto objectHistory y llamo al método add de calculatorHistory
			var ohType = 'pace';
			var ohUnits = 'millas';
			var ohPace = respuesta[1];
			var ohDistance = distancia;
			var ohMark = Calculator.secondsToTime(tiempoEnSegundos);
			var objectHistory = new CalculatorHistory.objectHistory(ohType, ohUnits, ohPace, ohDistance, ohMark);
			CalculatorHistory.add(objectHistory);
			break;
	}

});

// Evento para cuando se cambia el tipo de distancia en la calculadora de tiempos
selectorTipoTiempos.addEventListener('change', function(){
	var etiquetaTiempo = document.getElementById('etiquetaTiempo');
	var etiquetaCorte = document.getElementById('etiquetaCorte');
	switch (this.value){
		case 'Kilómetros':
			etiquetaTiempo.innerHTML = "Tu ritmo por kilómetro: ";
			etiquetaCorte.innerHTML = "Distancia de corte en metros: ";
			break;
		case 'Millas':
			etiquetaTiempo.innerHTML = "Tu ritmo por milla: ";
			etiquetaCorte.innerHTML = "Distancia de corte en yardas: ";
			break;
	}
});

// Evento para que se calculen los tiempos
btCalcularTiempos.addEventListener('click', function(){
	// Recoge los valores implicados
	var distancia = Number(document.getElementById('campoDistanciaTiempos').value) || 0;
	var tipo = document.getElementById('tipoDistanciaTiempos').value || "Kilómetros";
	var horas = Number(document.getElementById('horasTiempoTiempos').value) || 0;
	var minutos = Number(document.getElementById('minutosTiempoTiempos').value) || 0;
	var segundos = Number(document.getElementById('segundosTiempoTiempos').value) || 0;
	var distanciaCorte = Number(document.getElementById('distanciaCorteTiempos').value) || 1000;
	// Llamo a tableTimeFromPacePer***
	switch (tipo){
		case "Kilómetros":
			var distanciaMetros = distancia*1000;
			var pace = new Calculator.Time(horas, minutos, segundos);
			Calculator.tableTimeFromPacePerKm(pace, distanciaMetros, distanciaCorte);
			break;
		case "Millas":
			var pace = new Calculator.Time(horas, minutos, segundos);
			Calculator.tableTimeFromPacePerMile(pace, distancia, distanciaCorte);
			break;
	}
});

// Evento para que se muestre (o actualize) el historial
btActualizarHistorial.addEventListener('click', function(){
	CalculatorHistoryView.actualizarHistorial();
}) 