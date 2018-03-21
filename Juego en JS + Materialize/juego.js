var Matriz = [3];
var movimientos = 0;
var audio = new Audio('Click_pop.wav');
window.onload = function(){
	cronometro();
	generarTablero();
	nuevo();
};

function temas(temita){
	var color = temita.getAttribute("class");
	var botones  =document.getElementsByClassName("btn");
	document.getElementById('texto').setAttribute('class',color);
	for(var i=0; i<botones.length;i++){
		if(botones[i].getAttribute("id") !='0'){
			botones[i].setAttribute("class","btn btn-primary btn-lg active "+ color);
		}
	}
}


function cronometro(){
	var crono  = document.getElementById('tiempo').innerHTML;
	crono = parseInt(crono);
	document.getElementById('tiempo').innerHTML = crono+1;
	setTimeout(cronometro,1000);
}

function nuevo(){
	document.getElementById('nuevo').onclick = function (){
		document.getElementById('contenedor').innerHTML = '';
		document.getElementById('tiempo').innerHTML = '0';
		generarTablero();
		document.getElementById('nuevo').setAttribute("class","btn btn-primary btn-lg active");
		document.getElementById('texto').setAttribute("class","teal lighten-1");
		movimientos = 0;
		document.getElementById('mov').innerHTML = 0;
	}
};

function generarTablero(){
	var aleatorio = noRepetir([0,1,2,3,4,5,6,7,8]);
	var element = document.createElement('table');
	var cont;	
	for(var i=0;i<3;i++){
		Matriz[i] = [3];
		var fila = document.createElement("tr");
		for(var j=0;j<3;j++){
			cont = aleatorio.next().value;
			var columna = document.createElement("td");
			var boton = document.createElement('button');
			columna.setAttribute("id",i+''+''+j);
			boton.setAttribute("id",cont);
			if(cont=='0'){
				boton.setAttribute("class","btn btn-primary btn-lg active blue-grey lighten-2");
			}else{
				boton.setAttribute("class","btn btn-primary btn-lg active");
			}
			boton.setAttribute("onClick","jugar(this.parentElement)");
			Matriz[i][j] = columna;
			var texto = document.createTextNode(cont);
			boton.appendChild(texto);
			columna.appendChild(boton);
			fila.appendChild(columna);
		}
		element.appendChild(fila);
	}
	document.getElementById("contenedor").appendChild(element);
	comprobar();
};

function jugar(casilla){
	movimientos++;
	document.getElementById('mov').innerHTML = movimientos;
	var fila = casilla.getAttribute('id')[0];
	fila = parseInt(fila);
	var columna = casilla.getAttribute('id')[1];
	columna = parseInt(columna);
	if(columna+1 <= 2 && columna >= 0){
		var derecha = Matriz[fila][columna+1].children[0];
		if(derecha.getAttribute('id') == '0'){
			mover(casilla,derecha);
		}	
	}

	if(columna-1 >= 0 && columna <= 2){
		var izquierda  = Matriz[fila][columna-1].children[0];
		if(izquierda.getAttribute('id') == '0'){
			mover(casilla,izquierda);
		}
	}

	if(fila+1 <= 2 && fila >= 0){
		var arriba = Matriz[fila+1][columna].children[0];
		if(arriba.getAttribute('id') == '0'){
			mover(casilla,arriba);
		}	
	}

	if(fila-1 >= 0 && fila <= 2){
		var abajo  = Matriz[fila-1][columna].children[0];
		if(abajo.getAttribute('id') == '0'){
			mover(casilla,abajo);
		}
	}
	comprobar();
	audio.play();
};

function mover(casilla,destino){
	var aux = casilla.innerHTML;
	casilla.innerHTML = destino.parentElement.innerHTML;
	destino.parentElement.innerHTML = aux;
};

function comprobar(){
	var correcto = 1;
	var ganar = 0;
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			var codigo = parseInt(Matriz[i][j].children[0].getAttribute('id'));
			if(ganar == 8){
				alert("GANASTE");
			}
			if(codigo == correcto){
				ganar++;
			}
			correcto++;
			
		}

	}
};

function* noRepetir(array) {
    var i = array.length;
    while (i--){
        yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
    }
};