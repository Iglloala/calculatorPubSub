// Módulo calculatorHistoryView
var CalculatorHistoryView = (function(){
	// Recojo los elementos del html con los que ha de interactuar
	var _cajaResultados = document.getElementById('resultadoHistorial');

	// Métodos de calculatorHistory:
	// - el renderValues donde 'pintará' la tabla a partir del array que s ele pasa
	function _renderValues(){
		// Recojo los valores del listado de calculatorHistory
		var listado = CalculatorHistory.getValues();
		// Genero los elementos principales de la tabla
		var tabla = document.createElement('table');
		var thead = document.createElement('thead');
		tabla.appendChild(thead);
		var tbody = document.createElement('tbody');
		tabla.appendChild(tbody);
		// - genero la cabecera
		var cabecera = document.createElement('tr');
		// - y todas sus celdas:
		var celda = document.createElement('td');
		celda.appendChild(document.createTextNode('#'));
		cabecera.appendChild(celda);
		// -
		var celda = document.createElement('td');
		celda.appendChild(document.createTextNode('Tipo'));
		cabecera.appendChild(celda);
		// -
		var celda = document.createElement('td');
		celda.appendChild(document.createTextNode('Unidades'));
		cabecera.appendChild(celda);
		// -
		var celda = document.createElement('td');
		celda.appendChild(document.createTextNode('Distancia'));
		cabecera.appendChild(celda);
		// -
		var celda = document.createElement('td');
		celda.appendChild(document.createTextNode('Marca'));
		cabecera.appendChild(celda);
		// -
		var celda = document.createElement('td');
		celda.appendChild(document.createTextNode('Ritmo'));
		cabecera.appendChild(celda);
		// -
		thead.appendChild(cabecera);
		// Por cada fila en el 'listado' voy generando filas y añadiéndolas al tbody
		for (var i = 0; i<listado.length; i++){
			// recojo los valores
			var oh = listado[i];
			var type = oh['type'];
			var units = oh['units'];
			var pace = _time2String(oh['pace']);
			var distance = oh['distance'];
			var mark = _time2String(oh['mark']);
			// genero una fila
			var fila = document.createElement('tr');
			// y todas sus celdas
			var celda = document.createElement('td');
			celda.appendChild(document.createTextNode(i));
			fila.appendChild(celda);
			// -
			var celda = document.createElement('td');
			celda.appendChild(document.createTextNode(type));
			fila.appendChild(celda);
			// -
			var celda = document.createElement('td');
			celda.appendChild(document.createTextNode(units));
			fila.appendChild(celda);
			// -
			var celda = document.createElement('td');
			celda.appendChild(document.createTextNode(distance));
			fila.appendChild(celda);
			// -
			var celda = document.createElement('td');
			celda.appendChild(document.createTextNode(mark));
			fila.appendChild(celda);
			// -
			var celda = document.createElement('td');
			celda.appendChild(document.createTextNode(pace));
			fila.appendChild(celda);
			// la añado al tbody
			tbody.appendChild(fila);
		}
		// Limpia la caja de resultados
		_cajaResultados.innerHTML = "";
		// Y añade la tabla
		_cajaResultados.appendChild(tabla);

		// Me creo una función auxiliar para pasar los tiempos a string
		function _time2String(time){
			var horas = (time.hours>9)?time.hours:'0'+time.hours;
			var minutos = (time.minutes>9)?time.minutes:'0'+time.minutes;
			var segundos = (time.seconds>9)?time.seconds:'0'+time.seconds;
			var salida =  horas + ":" + minutos + ":" + segundos;
			return salida;
		}
	}
	// - el init donde se suscribirá a cosas
	function _init(){
		// Y la subscribo a los eventos publicados por Calculator
		var nuevoObjectHistory = PubSub.subscribe("nuevo/objectHistory", _renderValues);
	}
	// Y ya puestos pues la inicializo
	_init();

	// el retorno del módulo que hace públicos los métodos que me interesen
	return {
		actualizarHistorial : _renderValues,
		init: _init
	}
})()