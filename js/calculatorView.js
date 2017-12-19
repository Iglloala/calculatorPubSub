var CalculatorView = (function(objeto){
	// Capturo los elementos con los que tiene que interactuar la vista
	// - Calcular Ritmo
	var campoDistanciaRitmo = document.getElementById('campoDistanciaRitmo');
	var tipoDistanciaRitmo = document.getElementById('tipoDistanciaRitmo');
	var horasTiempoRitmo = document.getElementById('horasTiempoRitmo');
	var minutosTiempoRitmo = document.getElementById('minutosTiempoRitmo');
	var segundosTiempoRitmo = document.getElementById('segundosTiempoRitmo');
	var btCalcularRitmo = document.getElementById('btCalcularRitmo');
	var resultadoRitmo = document.getElementById('resultadoRitmo');
	// - Calcular Tiempos
	var campoDistanciaTiempos = document.getElementById('campoDistanciaTiempos');
	var tipoDistanciaTiempos = document.getElementById('tipoDistanciaTiempos');
	var horasTiempoTiempos = document.getElementById('horasTiempoTiempos');
	var minutosTiempoTiempos = document.getElementById('minutosTiempoTiempos');
	var segundosTiempoTiempos = document.getElementById('segundosTiempoTiempos');	
	var distanciaCorteTiempos = document.getElementById('distanciaCorteTiempos');
	var resultadoTiempos = document.getElementById('resultadoTiempos');
	
	// Métodos de la clase calculatorView
	
	var _2digits = function(valor){
		var respuesta = (valor<10) ? "0"+valor : valor;
		return respuesta;
	}

	var _renderizarResultadoRitmo = function(datos){
		var tipo = tipoDistanciaRitmo.value;
		switch (tipo) {
			case 'Kilómetros':
				var resultado = _2digits(datos.pace[0].hours) + ":" + _2digits(datos.pace[0].minutes) + ":" +_2digits(datos.pace[0].seconds);
				tipo = 'por kilómetro';
				break;
			case 'Millas':
				var resultado = _2digits(datos.pace[1].hours) + ":" + _2digits(datos.pace[1].minutes) + ":" +_2digits(datos.pace[1].seconds);
				tipo = 'por milla';
				break;
			default:
				// No hace nada x defecto
		}
		resultadoRitmo.innerHTML = "Tu ritmo  " + tipo + " es: " + resultado;
	}

	var _renderizarResultadoTiempos = function(datos) {
		var arrayTiempos = datos.arrayMarcas;
		// Empiezo a construir la salida
		var tablaResultados = document.createElement('table');
		var filaCabeceraResultados = document.createElement('tr');
		var celdaCabeceraCorte = document.createElement('td');
		celdaCabeceraCorte.appendChild(document.createTextNode('Corte'));
		var celdaCabeceraDistanciaAcumulada = document.createElement('td');
		celdaCabeceraDistanciaAcumulada.appendChild(document.createTextNode('Distancia Acumulada'));
		var celdaCabeceraTiempo = document.createElement('td');
		celdaCabeceraTiempo.appendChild(document.createTextNode('Tiempo'));
		filaCabeceraResultados.appendChild(celdaCabeceraCorte);
		filaCabeceraResultados.appendChild(celdaCabeceraDistanciaAcumulada);
		filaCabeceraResultados.appendChild(celdaCabeceraTiempo);
		tablaResultados.appendChild(filaCabeceraResultados);
		// Por cada fila del array de tiempos
		// Genera las filas
		for (var i=0; i<arrayTiempos.length; i++){
			var distance = arrayTiempos[i].distance;
			var mark = arrayTiempos[i].mark;
			var corte = i;
			// Aquí tiene que comprobar si se le pasa el pace en Km o en Millas
			// para poder ajustar la distancia acumulada
			var tipo = tipoDistanciaTiempos.value;
			switch (tipo) {
				case 'Kilómetros':
					var distanciaAcumulada = distance;
					break;
				case 'Millas':
					var imperialString = distance.miles + " millas, " + distance.yards + " yardas, " + distance.feet + " pies. ";
					var distanciaAcumulada = imperialString;
					break;
			}
			var tiempo = mark.hours+" horas, "+mark.minutes+" minutos, "+mark.seconds+" segundos.";
			// - 
			var filaRegistroResultado = document.createElement('tr');
			var celdaRegistroCorte = document.createElement('td');
			celdaRegistroCorte.appendChild(document.createTextNode(corte));
			var celdaRegistroDistanciaAcumulada = document.createElement('td');
			celdaRegistroDistanciaAcumulada.appendChild(document.createTextNode(distanciaAcumulada));
			var celdaRegistroTiempo = document.createElement('td');
			celdaRegistroTiempo.appendChild(document.createTextNode(tiempo));
			filaRegistroResultado.appendChild(celdaRegistroCorte);
			filaRegistroResultado.appendChild(celdaRegistroDistanciaAcumulada);
			filaRegistroResultado.appendChild(celdaRegistroTiempo);
			//-
			tablaResultados.appendChild(filaRegistroResultado);
		}
		// Añado la tabla al campo de resultados
		resultadoTiempos.innerHTML = "";
		resultadoTiempos.appendChild(tablaResultados);
	}

	// Método init de la vista
	objeto.init = function(){
		// Aquí en principio irán los subscribe
		var subscribePace = PubSub.subscribe("calcular/pace", _renderizarResultadoRitmo);
		var subscribeTiempos = PubSub.subscribe("calcular/tiempos", _renderizarResultadoTiempos);
	}
	objeto.init();

	// retorno el objeto
	return objeto;
})(CalculatorView || {});