import './components/player-option.js';
import './components/player-score.js';

export class RpsGame extends HTMLElement {
    constructor() {
        super();
        this.options = ['rock', 'scissors', 'paper'];
        this.results = ['tie', 'win', 'lose'];
        this.scores  = [0, 0];
        this.playerOptions = '';
        this.size = this.options.length;
        this.statusMsg = ['Choose an option', 'Wait'];
        this.handClass = 'rock';
    }
    getoptions() {
        return this.options
    }
    connectedCallback() {
        this.playerOptions = `<section class="options">`;
        this.options.forEach(option => {
            this.playerOptions += `
                <player-option title="${option}"></player-option>`;
        });
        this.playerOptions += `</section>`;

        this.innerHTML = this.render();
        
        this.$status = this.querySelector('#status');
        this.$playerScores = this.querySelectorAll('player-score');
        this.$playerHand1 = this.querySelector('#player1');
        this.$playerHand2 = this.querySelector('#player2');
        this.$restart = this.querySelector('.restart');
        this.$restart.addEventListener("click", this.restartGame.bind(this));
        this.addEventListener("play", this.play);
    }
    getWinner(playerOp, computerOp) {
        return (computerOp - playerOp + this.size) % this.size 
    }
    play(ev) {
        let playerOption = ev.detail.playerOption,
            playerOp = this.options.indexOf(playerOption),
            computerOp = Math.floor(Math.random() * this.size),
            computerOption = this.options[computerOp];
        
        this.$status.innerHTML = this.statusMsg[1];
        this.$status.className = 'loading';
        this.$playerHand1.classList.add('animPlayer1');
        this.$playerHand2.classList.add('animPlayer2');

        setTimeout(() => {
            this.$playerHand1.classList.remove('animPlayer1');
            this.$playerHand2.classList.remove('animPlayer2');

            let result = this.getWinner(playerOp, computerOp);
            if (result) {
                this.$playerScores[result-1].setAttribute('score', ++this.scores[result-1]);
            }
            this.$playerHand1.className = playerOption;
            this.$playerHand2.className = computerOption;
    
            this.$status.innerHTML = this.results[result];
            this.$status.className = this.results[result];
        }, 2000);
    }
    restartGame() {
        this.scores = [0, 0];
        this.$status.innerHTML = this.statusMsg[0];
        this.$status.className = '';
        this.$playerScores.forEach(item => {
            item.setAttribute('score', 0)
        });
        this.$playerHand1.className = this.handClass;
        this.$playerHand2.className = this.handClass;
    }
    render() {
        return `
        <main class="container">
            <header class="header">
                <h1>Rock Paper Scissors</h1>
                <section class="score-board">
                    <player-score title="User"></player-score>
                    <player-score title="Computer"></player-score>
                </div>
            </header>
            <section class="game-board">
                <h2 id="status">${this.statusMsg[0]}</h2>
                <div class="hands">
                    <div id="player1" class="${this.handClass}"></div>
                    <div id="player2" class="${this.handClass}"></div>
                </div>
                ${this.playerOptions}
                <div><button class="restart">Restart Game</button></div>
            </section>
        </main>`;
    }
}

window.customElements.define('rps-game', RpsGame);