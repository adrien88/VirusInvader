
launchGame();

function launchGame(){
// starter = document.getElementById('starter');
// starter.addEventListener('click',function(event){

const nombreRows = 10;
const nombreCols = 20;
const nombreGrid = nombreRows*nombreCols;

const screenWidth = window.screen.width;
const sizeGridItem = (screenWidth/nombreCols)-38+'px';
const sizeGridGap = '1px';

let choosenSpeed = 0;

//descende vitesse : 3 = kamikaze, 2 = très rapide, 1 = moyenne, 0 = lente
// let choosenSpeed = 3;
// if(!sessionStorage.getItem('speed')){
//   sessionStorage.setItem('speed',0);
//   choosenSpeed = 0;
// }else{
//   let choosenSpeed = sessionStorage.getItem('speed');
// }

const displayZone = document.getElementById('displayZone');
let scoreZone = document.getElementById('scoreZone');
let nbrShooot = document.getElementById('NbrShooot');
let successRate = document.getElementById('successRate');


// temporaire le tzmps du sev
// displayZone.style.color = 'white';
// displayZone.style.backgroundColor = 'black';

const speed = [10,6,4,3];
displayZone.style.display = 'grid';
displayZone.style.padding = '2em';
displayZone.style.gridGap = sizeGridGap;
displayZone.style.width = screenWidth;
displayZone.style.justifyContent = 'space-evenly';

// generate grid
generate_grid();

const maxUser = nombreGrid;
const minUser = (nombreGrid - nombreCols)+1;


// //function launchGame(){
// starter = document.getElementById('starter');
// starter.addEventListener('click',function(event){

  let nombreEnnemisToCreate = (3 * nombreCols);
  let shootCounter = 0;

  // generate ennemis
  generate_ennemis();

  // générate user
  let objUser = generate_user();

    window.addEventListener('keydown',function(event){

      switch(event.key){
        // shhot
        case ' ':
          shootThemUp ();
        break;
        // shhot
        case 'ArrowUp':
          shootThemUp ();
        break;
        // move to left
        case 'ArrowLeft':
          moveObj(-1,objUser);
        break;
        // move to right
        case 'ArrowRight' :
          moveObj(1,objUser);
        break;

        // get out of game
        case 'Escape' :
          endOfGame('Mission aborted.');
        break;

        default:
        break;
      }
    });


  // Boucle mouvement ennemis
  var varMain = setInterval(main, (speed[choosenSpeed]*100));
  var loop = 1;
  let listEnnemis;

  function main(){

          listEnnemis = document.getElementsByClassName('ennemi');
          if(listEnnemis.length > 0){

            if(Number.isInteger(loop/speed[choosenSpeed])){
              for(let iter=0; iter<nombreCols; iter++){
                moveAllEnnemis(1);
              }
              moveAllEnnemis(1);
            }
            else {
              if(Number.isInteger(loop/2)){
                moveAllEnnemis(1);
              }
              else {
                moveAllEnnemis(-1);
              }
            }
          }
          else{
            endOfGame('Mission complete.');
          }


      loop++;
  }


  // Boucle mouvement ennemis
  var varShoot = setInterval(shootMouv, 50);

  function shootMouv(){

    moveAllshoots();
  }


// });







/* ------------------------------------------------------------------------------------------------------------
          LIBRAIRIES
------------------------------------------------------------------------------------------------------------ */

function shootThemUp (){
  let current = objUser.parentElement;
  let gridNum = parseInt(current.id.substring(5),10);
  let target = (gridNum - nombreCols);
  let shoot = createObj('shoot.gif','shoot','shoot');
  placeInGrid(target, shoot);
  shootCounter++;
  nbrShooot.innerHTML = shootCounter;
}


// fonction déplacement
function moveObj(direction,obj){

  let current = obj.parentElement;
  let gridNum = parseInt(current.id.substring(5),10);

  if(obj.id.substring(5)=='user'){
    if((direction + gridNum) >= minUser && (direction + gridNum) <= maxUser){
      placeInGrid((gridNum + direction),obj);
    }
  }

  else if(obj.id.substring(5)=='shoot'){
    if(gridNum > nombreCols){
      placeInGrid((gridNum + direction),obj);
    }else {
      obj.parentElement.innerHTML='';
    }
  }
  else if ((gridNum + direction) < minUser){
    placeInGrid((gridNum + direction),obj);
  }
  else{
    // fin de jeu : echec
    endOfGame('Failure !');
  }
  current.innerHtml = '';
}

function placeInGrid(id,obj) {
  let to = document.getElementById('grid-'+id);
  to.appendChild(obj);
}

// Le nom aprle de lui même
function bOOOOOOOm(obj){
  if(obj.childNodes.length > 1){
    obj.innerHTML = '';
    successRate.innerHTML = successCalc();
  }
}

// create grid 100 x 100
function generate_grid(){
  let numRow = 1;

  for(var iteration = 1; iteration <= nombreGrid; iteration++){
    let gridItem = document.createElement('DIV',iteration);

    gridItem.setAttribute('id','grid-' + iteration);
    gridItem.setAttribute('class','row-' + numRow);
    if(Number.isInteger(iteration/nombreCols)){
      numRow++;
    }
    displayZone.appendChild(gridItem);
  }
  let inrow = '';
  let row = 0;
  for(row; row < nombreRows; row++){
    inrow = inrow + ' '+sizeGridItem;
  }
  displayZone.style.gridTemplateRows = inrow;

  let incol = '';
  let col = 0;
  for(col; col < nombreCols; col++){
    incol = incol +' '+sizeGridItem;
  }
  displayZone.style.gridTemplateColumns = incol;
}

// Bouger tous les ennemis
function moveAllEnnemis(direction){
   let out;
   let obj;
   for(let entre=0; obj=listEnnemis[entre]; entre++){
     moveObj(direction, listEnnemis[entre]);
    }
  }

// Bouger tous les tirs
function moveAllshoots(){
  let listShoot = document.getElementsByClassName('shoot');
   let obj;
    if(listShoot.length > 0){
     for(let entre=0; obj=listShoot[entre]; entre++){
       moveObj(-nombreCols, listShoot[entre]);
       bOOOOOOOm(listShoot[entre].parentElement);
      }
    }
  }

// create ennemi and place it on the grid
function generate_ennemis(){
  let count = 1;

  for(var nombreEnnemis = 1;nombreEnnemis <= nombreEnnemisToCreate;nombreEnnemis++){

    let colors = ['css1.gif','html1.gif','jpg1.gif','psd1.gif','scss1.gif','php1.gif','js1.gif'];
    let num = getRandomInt((colors.length));

    let ennemi = createObj(colors[num],nombreEnnemis,'ennemi');
    let actual = Math.ceil(count/nombreRows);
    let startCase = ((actual-1) * nombreCols)+2 ;
    let lastCase = ((actual) * nombreCols)-2 ;

    if(
      (Number.isInteger(count/2)) &&
      ( startCase < count  || lastCase > count)
   ){
    placeInGrid(nombreEnnemis,ennemi);
    }
    count++;
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// create user and position
function generate_user(){
  let objUser = createObj('ship.gif','user','user');

  let userPosition = Math.ceil(maxUser-(nombreCols/2));
  placeInGrid(userPosition,objUser);
  return objUser;
}

// create obj in grid
function createObj(filename,id,className){
  let obj = document.createElement('IMG');
  obj.setAttribute('src','lib/medias/'+filename);
  obj.setAttribute('class',className);
  obj.setAttribute('id','objt-'+id);
  obj.setAttribute('alt',className);
  obj.setAttribute('width',sizeGridItem);
  obj.setAttribute('height',sizeGridItem);
  return obj;
}

/* -------------------------------------------------------
          Fonction spéciale : stop le jeu
------------------------------------------------------- */

function endOfGame(mssg){
  clearInterval(varMain);
  displayZone.style.display = 'inherit';

  mssg += '<br> Shots '+ shootCounter;
  mssg += '<br> Kilobytes destroyed : '+ successCalc()  +' kB<br>';
  displayZone.innerHTML = mssg;
  displayRestart();
}

function successCalc(){
  return Math.ceil((nombreEnnemisToCreate/(shootCounter*2))*100);
}

function displayRestart(){
  let restart = document.createElement('a');
  restart.setAttribute('href','?');
  restart.innerHTML='Restart ';
  displayZone.appendChild(restart);
  // let str = document.createElement('p');
  // str.innerHTML = ' - ';
  // displayZone.appendChild(str);

  let accueil = document.createElement('a');
  accueil.setAttribute('href','index.html');
  accueil.innerHTML=' <br>Home';
  displayZone.appendChild(accueil);
}

function restart(){
  window.location.reload();
}

}
 // });
