let matriz = [];
const grid = document.getElementById('grilla');
const casillas = document.getElementsByClassName('casilla');
const ancho = document.body.getBoundingClientRect().width;
const alto = document.body.getBoundingClientRect().height;
let termino = false;
let dimension = 0;
let numBombas = 0;


function play(dim, num){
    dimension = dim;
    numBombas = num;
    document.getElementById('nivel').style.display = 'none';
    crear_juego();
}

function crear_juego(){

    termino = false;

    llenar_Matriz();


    if(ancho>=alto){
        grid.style.height = `${alto}px`;
        grid.style.width = `${alto}px`;
    }

    if(ancho<=alto){
        grid.style.height = `${ancho}px`;
        grid.style.width = `${ancho}px`;
    }

    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;
    grid.style.gap = '5px';

    let casillasStr = '';

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            casillasStr += `<button id="pos_${i}_${j}" onclick="accion(this)" class="casilla"></button>`;
        }
    }

    grid.innerHTML = casillasStr;    
}


function llenar_Matriz(){
    for (let i = 0; i < dimension; i++) {
        let v = [];
        for (let j = 0; j < dimension; j++) {
            v.push(0);
        }
        matriz.push(v);
    }
    for (let i = 0; i < numBombas; i++) {
        let x = Math.floor(Math.random() * dimension);
        let y = Math.floor(Math.random() * dimension);
        if(matriz[x][y]==-1){
            i--;
        }else{
            matriz[x][y] = -1;   
            Poner_Numeros(x, y);
        }
    }
}

function Poner_Numeros(x,y){
    reemplazar(x-1,y-1);
    reemplazar(x-1,y);
    reemplazar(x-1,y+1);

    reemplazar(x,y-1);
    reemplazar(x,y+1);

    reemplazar(x+1,y-1);
    reemplazar(x+1,y);
    reemplazar(x+1,y+1);
}

function reemplazar(x,y){
    try {
        let n = matriz[x][y];
        if(n>=0){
            matriz[x][y] = n + 1;
        }
    } catch (error) {}
}

function accion(element){
    if(termino){
        return;
    }
    let pos = element.getAttribute('id').split('_');
    let i = pos[1];
    let j = pos[2];
    if(matriz[i][j]==-1){
        terminar();
        termino = true;
        return;
    }
    mostrar(i,j);
}

function terminar(){
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if(matriz[i][j]==-1){
                let element = document.getElementById(`pos_${i}_${j}`);
                element.innerHTML = '';
                element.style.background = 'var(--8)';
                const imagen = document.createElement('img');
                imagen.src = 'img/bomba.png';
                imagen.style.width = '100%';
                element.appendChild(imagen);
            }
        }
    }
}

function mostrar(X,Y){
    let x = parseInt(X);
    let y = parseInt(Y);

    if(!(x>=0 && x<dimension)){
        return;
    }
    if(!(y>=0 && y<dimension)){
        return;
    }

    const element = document.getElementById(`pos_${x}_${y}`);
    try{
        let fondo = element.getAttribute('style');
        if(fondo=='background: var(--0);'){
            return;
        }
    }catch(error){}

    element.style.background = `var(--${matriz[x][y]})`;
    element.innerHTML = matriz[x][y] == 0 ? '' : matriz[x][y];

    if(matriz[x][y]>0){
        return;
    }

    mostrar(x-1,y-1);
    mostrar(x-1,y);
    mostrar(x-1,y+1);

    mostrar(x,y-1);
    mostrar(x,y+1);

    mostrar(x+1,y-1);
    mostrar(x+1,y);
    mostrar(x+1,y+1);
}