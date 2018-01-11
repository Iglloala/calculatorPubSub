// Módulo calculatorHistory
var CalculatorHistory = (function(){
	// defino las propiedades del módulo
	// - un array para almacenar objetos objectHistory
	var _listado = [];

	// defino la 'clase' objectHistory
	function _objectHistory(type, units, pace, distance, mark){
		this.type = type;
		this.units = units;
		this.pace = pace;
		this.distance = distance;
		this.mark = mark;
	}

	// Métodos del módulo 
	// - método para añadir objectHistory's al array
	function _add(objectHistory){
		// Añade el nuevo objectHistory al array
		var pos = _listado.push(objectHistory) -1;
		// Publica que lo ha añadido
		PubSub.publish("nuevo/objectHistory", {}); 
		// y retorna la posición donde lo ha metido
		return pos;
	}
	// - método para eliminar objectHistory's del array
	function _delete(indice){
		var eliminado = _listado.splice(indice, 1);
	}
	// - método para retornar el array con todos los objectHistory's almacenados
	function _getValues(){
		return _listado;
	}

	// retorno el objeto haciendo públicos los métodos que necesite
	return {
		objectHistory: _objectHistory,
		add: _add,
		delete: _delete,
		getValues: _getValues
	}

})(); 