class PlayerScore extends HTMLElement {
    constructor() {
        super();
        this.score = 0; 
    }
    connectedCallback() {
        this.innerHTML = this.render();
        this.$score = this.querySelector('span');
    }
    static get observedAttributes() {
        return ["score"];
    }
    get title() {
        return this.getAttribute('title');
    }
    get score() {
        return this.getAttribute('score');
    }
    set score(val) {
        if (!isNaN(val)) {
            this.setAttribute('score', val);
        }
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal && name == 'score') {
            this.$score.innerHTML = newVal;
        }
    }
    render() {
        return `
            <div class="player-score">
                <h2>${this.title}</h2>
                <span>${this.score}</span>
            </div>`;
    }
}

window.customElements.define('player-score', PlayerScore);