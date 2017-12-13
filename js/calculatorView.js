var CalculatorView = (function(objeto){
	// CREO LOS ELEMENTOS:
	// ||| CONTENEDOR |||
	objeto.contenedor = document.createElement('div');
	// titulo
	objeto.titulo = document.createElement('h1');
	objeto.titulo.appendChild(document.createTextNode('Calculadora de carreras'));
	// ||| SECCIÓN RITMO |||
	objeto.seccionRitmo = document.createElement('div');
	objeto.tituloSeccionRitmo = document.createElement('h3');
	objeto.tituloSeccionRitmo.appendChild(document.createTextNode('Calcular el ritmo por km o milla:'));
	// - distancia
	objeto.labelCampoDistanciaRitmo = document.createElement('label');
	objeto.labelCampoDistanciaRitmo.setAttribute('for', 'campoDistanciaRitmo');
	objeto.labelCampoDistanciaRitmo.appendChild(document.createTextNode('Distancia: '));
	objeto.campoDistanciaRitmo = document.createElement('input');
	objeto.campoDistanciaRitmo.setAttribute('name', 'campoDistanciaRitmo');
	objeto.campoDistanciaRitmo.setAttribute('type', 'number');
	objeto.campoDistanciaRitmo.setAttribute('style', 'max-width: 6rem;');
	objeto.selectorTipoDistanciaRitmo = document.createElement('select');
	objeto.optSelectorTipoDistanciaRitmoKm = document.createElement('option');
	objeto.optSelectorTipoDistanciaRitmoKm.setAttribute('value', 'Kilómetros');
	objeto.optSelectorTipoDistanciaRitmoKm.appendChild(document.createTextNode('Kilómetros'));
	objeto.optSelectorTipoDistanciaRitmoMi = document.createElement('option');
	objeto.optSelectorTipoDistanciaRitmoMi.setAttribute('value', 'Millas');
	objeto.optSelectorTipoDistanciaRitmoMi.appendChild(document.createTextNode('Millas'));
	objeto.selectorTipoDistanciaRitmo.appendChild(objeto.optSelectorTipoDistanciaRitmoKm);
	objeto.selectorTipoDistanciaRitmo.appendChild(objeto.optSelectorTipoDistanciaRitmoMi);
	// - tiempo
	objeto.labelCampoTiempoRitmo = document.createElement('label');
	objeto.labelCampoTiempoRitmo.appendChild(document.createTextNode('Tiempo: '));
	objeto.campoHoraTiempoRitmo = document.createElement('input');
	objeto.campoHoraTiempoRitmo.setAttribute('type', 'number');
	objeto.campoHoraTiempoRitmo.setAttribute('size', '2');
	objeto.campoHoraTiempoRitmo.setAttribute('min', '0');
	objeto.campoHoraTiempoRitmo.setAttribute('max', '99');
	objeto.campoHoraTiempoRitmo.setAttribute('placeholder', 'hh');
	objeto.campoHoraTiempoRitmo.setAttribute('style', 'max-width: 2rem;');
	objeto.campoMinutoTiempoRitmo = document.createElement('input');
	objeto.campoMinutoTiempoRitmo.setAttribute('type', 'number');
	objeto.campoMinutoTiempoRitmo.setAttribute('size', '2');
	objeto.campoMinutoTiempoRitmo.setAttribute('maxlength', '2');
	objeto.campoMinutoTiempoRitmo.setAttribute('min', '0');
	objeto.campoMinutoTiempoRitmo.setAttribute('max', '59');
	objeto.campoMinutoTiempoRitmo.setAttribute('placeholder', 'mm');
	objeto.campoMinutoTiempoRitmo.setAttribute('style', 'max-width: 2rem;');
	objeto.campoSegundoTiempoRitmo = document.createElement('input');
	objeto.campoSegundoTiempoRitmo.setAttribute('type', 'number');
	objeto.campoSegundoTiempoRitmo.setAttribute('size', '2');
	objeto.campoSegundoTiempoRitmo.setAttribute('maxlength', '2');
	objeto.campoSegundoTiempoRitmo.setAttribute('min', '0');
	objeto.campoSegundoTiempoRitmo.setAttribute('max', '59');
	objeto.campoSegundoTiempoRitmo.setAttribute('placeholder', 'ss');
	objeto.campoSegundoTiempoRitmo.setAttribute('style', 'max-width: 2rem;');
	// - submit
	objeto.btCalcularRitmo = document.createElement('button');
	objeto.btCalcularRitmo.setAttribute('type', 'button');
	objeto.btCalcularRitmo.appendChild(document.createTextNode('Calcular ritmo'));
	// -  resultado
	objeto.resultadoRitmo = document.createElement('div');
	objeto.etiquetaResultadoRitmo = document.createElement('span');
	objeto.textoEtiquetaResultadoRitmo = document.createTextNode('Tu ritmo por kilómetro: ');
	objeto.etiquetaResultadoRitmo.appendChild(objeto.textoEtiquetaResultadoRitmo);
	objeto.resultadoRitmo.appendChild(objeto.etiquetaResultadoRitmo);
	// - Añado los elementos a la seccionRitmo
	objeto.seccionRitmo.appendChild(objeto.tituloSeccionRitmo);
	//-
	objeto.seccionRitmo.appendChild(objeto.labelCampoDistanciaRitmo);
	objeto.seccionRitmo.appendChild(objeto.campoDistanciaRitmo);
	objeto.seccionRitmo.appendChild(document.createTextNode(' ')); // &nbsp;
	objeto.seccionRitmo.appendChild(objeto.selectorTipoDistanciaRitmo);
	objeto.seccionRitmo.appendChild(document.createElement('br'));
	// -
	objeto.seccionRitmo.appendChild(objeto.labelCampoTiempoRitmo);
	objeto.seccionRitmo.appendChild(objeto.campoHoraTiempoRitmo);
	objeto.seccionRitmo.appendChild(document.createTextNode(':'));
	objeto.seccionRitmo.appendChild(objeto.campoMinutoTiempoRitmo);
	objeto.seccionRitmo.appendChild(document.createTextNode(':'));
	objeto.seccionRitmo.appendChild(objeto.campoSegundoTiempoRitmo);
	objeto.seccionRitmo.appendChild(document.createElement('br'));
	// -
	objeto.seccionRitmo.appendChild(objeto.btCalcularRitmo);
	// - 
	objeto.seccionRitmo.appendChild(objeto.resultadoRitmo);
	

	// ||| SECCIÓN TIEMPOS |||
	objeto.seccionTiempos = document.createElement('div');
	objeto.tituloSeccionTiempos = document.createElement('h3');
	objeto.tituloSeccionTiempos.appendChild(document.createTextNode('Calcular tiempos:'));
	// - distancia total
	objeto.labelCampoDistanciaTotalTiempos = document.createElement('label');
	objeto.labelCampoDistanciaTotalTiempos.appendChild(document.createTextNode('Distancia total: '));
	objeto.campoDistanciaTotalTiempos = document.createElement('input');
	objeto.campoDistanciaTotalTiempos.setAttribute('type', 'number');
	objeto.campoDistanciaTotalTiempos.setAttribute('name', 'campoDistanciaTotalTiempos');
	objeto.campoDistanciaTotalTiempos.setAttribute('style', 'max-width: 6rem;');
	objeto.selectorTipoDistanciaTiempos = document.createElement('select');
	objeto.optselectorTipoDistanciaTiemposKm = document.createElement('option');
	objeto.optselectorTipoDistanciaTiemposKm.setAttribute('value', 'Kilómetros');
	objeto.optselectorTipoDistanciaTiemposKm.appendChild(document.createTextNode('Kilómetros'));
	objeto.optselectorTipoDistanciaTiemposMi = document.createElement('option');
	objeto.optselectorTipoDistanciaTiemposMi.setAttribute('value', 'Millas');
	objeto.optselectorTipoDistanciaTiemposMi.appendChild(document.createTextNode('Millas'));
	objeto.selectorTipoDistanciaTiempos.appendChild(objeto.optselectorTipoDistanciaTiemposKm);
	objeto.selectorTipoDistanciaTiempos.appendChild(objeto.optselectorTipoDistanciaTiemposMi);
	// - ritmo
	objeto.labelCampoRitmoTiempos = document.createElement('label');
	objeto.labelCampoRitmoTiemposTexto = document.createTextNode('Tu ritmo por kilómetro: ');
	objeto.labelCampoRitmoTiempos.appendChild(objeto.labelCampoRitmoTiemposTexto);
	objeto.campoHoraRitmoTiempos = document.createElement('input');
	objeto.campoHoraRitmoTiempos.setAttribute('type', 'number');
	objeto.campoHoraRitmoTiempos.setAttribute('size', '2');
	objeto.campoHoraRitmoTiempos.setAttribute('min', '0');
	objeto.campoHoraRitmoTiempos.setAttribute('max', '99');
	objeto.campoHoraRitmoTiempos.setAttribute('placeholder', 'hh');
	objeto.campoHoraRitmoTiempos.setAttribute('style', 'max-width: 2rem;');
	objeto.campoMinutoRitmoTiempos = document.createElement('input');
	objeto.campoMinutoRitmoTiempos.setAttribute('type', 'number');
	objeto.campoMinutoRitmoTiempos.setAttribute('size', '2');
	objeto.campoMinutoRitmoTiempos.setAttribute('min', '0');
	objeto.campoMinutoRitmoTiempos.setAttribute('max', '59');
	objeto.campoMinutoRitmoTiempos.setAttribute('placeholder', 'mm');
	objeto.campoMinutoRitmoTiempos.setAttribute('style', 'max-width: 2rem;');
	objeto.campoSegundoRitmoTiempos = document.createElement('input');
	objeto.campoSegundoRitmoTiempos.setAttribute('type', 'number');
	objeto.campoSegundoRitmoTiempos.setAttribute('size', '2');
	objeto.campoSegundoRitmoTiempos.setAttribute('min', '0');
	objeto.campoSegundoRitmoTiempos.setAttribute('max', '59');
	objeto.campoSegundoRitmoTiempos.setAttribute('placeholder', 'ss');
	objeto.campoSegundoRitmoTiempos.setAttribute('style', 'max-width: 2rem;');
	// - distancia corte
	objeto.labelCampoCorteTiempos = document.createElement('label');
	objeto.labelCampoCorteTiemposTexto = document.createTextNode('Distancia de corte en metros: ');
	objeto.labelCampoCorteTiempos.appendChild(objeto.labelCampoCorteTiemposTexto);
	objeto.campoCorteTiempos = document.createElement('input');
	objeto.campoCorteTiempos.setAttribute('style', 'max-width: 6rem;');
	objeto.campoCorteTiempos.setAttribute('type', 'number');
	// - submit
	objeto.btCalcularTiempos = document.createElement('button');
	objeto.btCalcularTiempos.setAttribute('type', 'button');
	objeto.btCalcularTiempos.appendChild(document.createTextNode('Calcular tiempos'));
	// - resultado
	objeto.resultadoTiempos = document.createElement('div');

	// - > Añado los elementos a la seccionTiempos
	objeto.seccionTiempos.appendChild(objeto.tituloSeccionTiempos);
	objeto.seccionTiempos.appendChild(objeto.labelCampoDistanciaTotalTiempos);
	objeto.seccionTiempos.appendChild(objeto.campoDistanciaTotalTiempos);
	objeto.seccionTiempos.appendChild(document.createTextNode(" "));
	objeto.seccionTiempos.appendChild(objeto.selectorTipoDistanciaTiempos);
	objeto.seccionTiempos.appendChild(document.createElement('br'));
	// -
	objeto.seccionTiempos.appendChild(objeto.labelCampoRitmoTiempos);
	objeto.seccionTiempos.appendChild(objeto.campoHoraRitmoTiempos);
	objeto.seccionTiempos.appendChild(document.createTextNode(':'));
	objeto.seccionTiempos.appendChild(objeto.campoMinutoRitmoTiempos);
	objeto.seccionTiempos.appendChild(document.createTextNode(':'));
	objeto.seccionTiempos.appendChild(objeto.campoSegundoRitmoTiempos);
	objeto.seccionTiempos.appendChild(document.createElement('br'));
	// -
	objeto.seccionTiempos.appendChild(objeto.labelCampoCorteTiempos);
	objeto.seccionTiempos.appendChild(objeto.campoCorteTiempos);
	objeto.seccionTiempos.appendChild(document.createElement('br'));
	// -
	objeto.seccionTiempos.appendChild(objeto.btCalcularTiempos);
	// -
	objeto.seccionTiempos.appendChild(objeto.resultadoTiempos);

	// INSERTO LOS ELEMENTOS EN EL ELEMENTO PRINCIPAL 'contenedor'
	objeto.contenedor.appendChild(objeto.titulo);
	objeto.contenedor.appendChild(objeto.seccionRitmo);
	objeto.contenedor.appendChild(objeto.seccionTiempos);

	// Recibe un elemento del documento y le añade la interfaz gráfica
	objeto.show = function(wrapper){
		wrapper.appendChild(this.contenedor);
	}

	// retorno el objeto
	return objeto;
})(CalculatorView || {});