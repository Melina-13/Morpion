export class Morpion {
    constructor(morpionGame) {
      this.grid = morpionGame;
      this.cells = Array.from(this.grid.querySelectorAll('.cell'));
      this.winDisplay = this.grid.querySelector('.win-display');
      this.currentPlayerDisplay = document.getElementById("currentPlayer");
      this.playerOneDisplay = document.getElementById("playerOne");
      this.playerTwoDisplay = document.getElementById("playerTwo");
      this.replayButton = document.getElementById("replay");
      this.currentPlayer = 'x'; 
      this.scores = { x: 0, o: 0 };
  

      this.winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      
      this.handleClick = this.handleClick.bind(this);
      this.handleReplay = this.handleReplay.bind(this);
      this.init();
    }
  
    init() {
      this.cells.forEach(cell => cell.textContent = "");
      this.grid.classList.remove("won");
      this.winDisplay.textContent = "";
      this.currentPlayer = 'x';
      this.updateCurrentPlayerDisplay();
  
      this.grid.addEventListener("click", this.handleClick);
      this.replayButton.addEventListener("click", this.handleReplay);
    }
  
    updateCurrentPlayerDisplay() {
      const joueur = this.currentPlayer === 'x' ? "Joueur 1 (X)" : "Joueur 2 (O)";
      this.currentPlayerDisplay.textContent = joueur;
    }
  
    handleClick(event) {
      const cell = event.target;
      if (!cell.classList.contains("cell") || cell.textContent !== "") return;
  
      cell.textContent = this.currentPlayer;

      if (this.checkWin()) {
        const gagnant = this.currentPlayer === 'x' ? "Joueur 1" : "Joueur 2";
        this.winDisplay.textContent = gagnant + " a gagné !";
        this.grid.classList.add("won");
        if (this.currentPlayer === 'x') {
          this.scores.x++;
          this.playerOneDisplay.textContent = this.scores.x;
        } else {
          this.scores.o++;
          this.playerTwoDisplay.textContent = this.scores.o;
        }
        this.grid.removeEventListener("click", this.handleClick);
      }
      
      else if (this.checkDraw()) {
        this.winDisplay.textContent = "Match nul.";
        this.grid.classList.add("won");
        this.grid.removeEventListener("click", this.handleClick);
      } else {
        this.switchPlayer();
        this.updateCurrentPlayerDisplay();
      }
    }
  
    checkWin() {
      return this.winCombos.some(combo => {
        return combo.every(index => this.cells[index].textContent === this.currentPlayer);
      });
    }
  
    checkDraw() {
      return this.cells.every(cell => cell.textContent !== "");
    }
  
    switchPlayer() {
      this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
    }
  
    handleReplay() {
      this.cells.forEach(cell => cell.textContent = "");
      this.grid.classList.remove("won");
      this.winDisplay.textContent = "";
      this.grid.removeEventListener("click", this.handleClick);
      this.grid.addEventListener("click", this.handleClick);
      this.currentPlayer = 'x';
      this.updateCurrentPlayerDisplay();
    }
}
  