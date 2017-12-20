var PubSubSingleton = (function(){
	// Creo una variable para almacenar la instancia de PubSub en caso de haberla
	var instancia;
	// Función inicializadora
	function init(){
		// PROPIEDADES Y MÉTODOS PRIVADOS
		// defino topics como objeto vacío
		var topics = {};
		// creamos un alias para topics.hasOwnProperty
		var hOP = topics.hasOwnProperty;
		// El retorno del módulo
		return {
			// PROPIEDADES Y MÉTODOS PÚBLICOS
			// Método subscribe
			subscribe: function(topic, listener){
				// Creamos el objeto 'topic' si no está creado
				if(!hOP.call(topics, topic)){
					topics[topic] = [];
				}
				// Añadimos el listener a la cola, siendo topic el nombre del evento
				// Aquí el -1 es para quedarse con el índice del listener que acabamos de meter y no el tamaño actualizado del array
				var index = topics[topic].push(listener) -1;
				// Y el subscribe pues retorna la función para eliminar la subscripción
				return {
					remove: function(){
						delete topics[topic][index];
					}
				};
			},
			// Método publish
			publish: function(topic, info){
				// Si el 'topic' no existe o no hay subscribers en la cola pues return sin hacer nada
				if (!hOP.call(topics, topic)){
					return;
				}
				// Si no pues ya itera sobre los topics y dispara los eventos
				topics[topic].forEach(function(item){
					// "item" será una función que hemos publicado para que se dispare
					// "info" serán los datos que hemos pasado, u objeto vacío si no hay datos
					item(info!=undefined ? info : {});
				});
			},
			// El listado de tópicos
			topics: topics
		};	
	}

	// El retorno de PubSub con el getInstance
	return {
		// Método que retorna la instancia de PubSub si existe o crea una y la retorna
		getInstance: function(){
			if (!instancia){
				instancia = init();
			}
			return instancia;
		}
	}
})();