// Pillo los elementos susceptibles de disparar eventos:
var btCalcularRitmo = document.getElementById('btCalcularRitmo');
var btCalcularTiempos = document.getElementById('btCalcularTiempos');
var selectorTipoTiempos = document.getElementById('tipoDistanciaTiempos');

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
			Calculator.paceInKm(tiempoEnSegundos, distancia);
			break;
		case "Millas":
			var tiempo = new Calculator.Time(horas, minutos, segundos);
			var tiempoEnSegundos = Calculator.timeToSeconds(tiempo);
			Calculator.paceInMiles(tiempoEnSegundos, distancia);
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