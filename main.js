function TicTacToeGame(){ 
   
   this.gameContainer = document.querySelector('#game-container');//6.stowrzenie własciwosci da diva container
      this.xUser = '&times;';
      this.oUser ='&cir;';
      this.currentUser = this.xUser //11.wlasciwosc - zadeklarowanie aktualnego usera
     this.win = false;

};

TicTacToeGame.prototype.results = [ //13. tablice ze wszystkimi mozliwymi wynikami, w [] sa ID komorek, sprawdzamy przy kliknieciu, ale w kolejnej funkcji

    ['a1','b1','c1'],
    ['a2','b2','c2'],
    ['a3','b3','c3'],
    ['a1','a2','a3'],
    ['b1','b2','b3'],
    ['c1','c2','c3'],
    ['a1','b2','c3'],
    ['c1','b2','a3']
];

TicTacToeGame.prototype.checkResults = function(){

    let win = false; 

    for( let idx = 0; idx < this.results.length; idx++){ //14.iterujemy po tablicy wygranych i porównyjemy do tablicy uzytkownikow
        const resultRow = this.results[idx];
        const result = resultRow.map(function(id){
            const cell = document.querySelector('#' + id);
            return cell.dataset.value;
        }).join('');
        if(result == 'xxx' || result == 'ooo' ){ //&& !this.win - tu chyba tez powinno byc
            win = true;
            break;
        }
        
    }
    return win;
};


TicTacToeGame.prototype.init = function(){//7. start gry
     
     const xUser = document.querySelector('#x-user').value;     //16. dodanie userow z inputow
     const oUser = document.querySelector('#o-user').value;
   
     if(xUser !== oUser && !this.win){ //jesli jest 2 takich samych uzytkownikow tabelka nie utworzy sie
        this.xUser = xUser;
        this.oUser = oUser;
        const table = this.createTable(); //1. konstruktor dla tabeli - 3 funkcje dla wierszy, komórek
        this.gameContainer.innerHTML =''; //czyści tabele
        this.gameContainer.appendChild(table); //a dopiero pozniej dodaje nowa
     }else if(this.win){
         this.modal = new Modal('koniec gry'); //to chyba trzeba usunac
         this.win = false;
         this.init();
     }else{
        this.modal = new Modal('podaj rozne imiona');
     } 
};


    TicTacToeGame.prototype.createTable = function(){ //4. funkcja do stworzenie tabeli dla konstruktora 
        const table = document.createElement('table');
        ['1','2','3'].forEach(function(rowId){
            const row = this.createRow(rowId);
            table.appendChild(row);
        }.bind(this));
        return table;

    };

    TicTacToeGame.prototype.createRow = function(rowId){ //3. funkcja do stworzenie wiersza dla konstruktora
        const row = document.createElement('tr');
        ['a','b','c'].forEach(function(col){   //3a. stworzenie tablicy zawierającą nazwy kolumn poprzez pętlę
            const cell = this.createCell(col + rowId);
            row.appendChild(cell);

        }.bind(this));  //4. bind!! poszerza zakres funkcji createCell (jak funkcja będzie wywołana to jej zakres będzie szerszy niz tylko w funkcji forEach)
        return row;
    };

    TicTacToeGame.prototype.createCell = function(id){ //2. funkcja do stworzenie komórki dla konstruktora
        const cell = document.createElement('td');
        cell.className = 'cell';
        cell.id = id;
        cell.addEventListener('click', this.cellclickHandler.bind(this));
cell.dataset.value = '';  //14.utworzenie dataset, do której możemy porównać wynik wygranej
        return cell; //zwrócenie komórki, żeby móc ją dodać

    };

TicTacToeGame.prototype.cellclickHandler = function(event){   //9.dodanie metody na kliknięcie - dodaje zawartosc
    const cell = event.target;   //10. &times; - encja wskazująca na krzyżyk
    
    if(cell.innerHTML != '' || this.win){ //13. sprawdza czy pole jest puste
        return;
    }
    if(this.currentUser === this.xUser){  //11. sprawdza który uzytkownik jest aktualny
        cell.innerHTML = '&times;';
        cell.dataset.value = 'x';
        // this.currentUser = this.oUser; //12. po kliknięciu przełacza uzytkownika
    } else {
        cell.innerHTML = '&cir;';
        cell.dataset.value = 'o';
        // this.currentUser = this.xUser;
    }
   this.win = this.checkResults();
    if(this.win){
        this.modal = new Modal('wygrał '+ this.currentUser, this.init.bind(this));
    }else {
        this.currentUser = this.currentUser == this.xUser ? this.oUser :this.xUser;
    }

    
    // this.checkResults();
};



function Modal(message,closeCallBack){  //konstruktor dla div z <p> i <button>

    this.closeCallBack = closeCallBack;
    this.modalEl = document.createElement('div'); //1.utworzenie div
    this.modalEl.className = 'modal'; //2. podpięcie klasy do div
    this.modalEl.innerHTML = '<p>' + message + '</p>'; //3.wrzucenie treści do div w znacznikach <p>
    
    const closeButton = document.createElement('button'); //5.stworzenie button

    closeButton.addEventListener('click', this.close.bind(this)); //8. przycisk nasłuchuje na zdarzenie - click; bind odwołuje się do funkcji close, ktora jest nizej i ma inny zakres
     
    closeButton.innerText = 'zamknij'; //6. dodanie txt do button co spowoduje jego wyswietelnie
    this.modalEl.appendChild(closeButton);//7. dodanie button do html

    document.documentElement.appendChild(this.modalEl); //4.dodanie div jako element potomny do body
};

Modal.prototype.close = function(){ //tą metodę można też dodać w konstruktorze, ale w ten sposób jest reużywalna
        this.modalEl.remove();
        if(this.closeCallBack !== undefined){
            this.closeCallBack();
        }
    };

// const modal = new Modal('Zaczynamy grę'); //utworzenie obiektu

const start = new TicTacToeGame(); //stworzenie obiektu na podstawie konstruktora TicTakToeGame
const button = document.querySelector('#start-game');

let xUser = document.querySelector('#x-user');
let oUser = document.querySelector('#o-user');

function checkName(){
    // if(xUser.value !== '' && oUser.value !== ''){
    //     button.disabled = false;
    // }

    button.disabled = !(xUser.value !== '' && oUser.value !== '')
    
}
xUser = document.querySelector('#x-user');
oUser = document.querySelector('#o-user');

xUser.addEventListener('input', checkName);
oUser.addEventListener('input', checkName);


// document.querySelector('#start-game').addEventListener('click', function(){
//     start.init(); //8.zainicjalizowanie obiektu start, czyli tworzy tabelę

    button.addEventListener('click', function(){
        start.init(); 
});


