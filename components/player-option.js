class PlayerOption extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = this.render();
        this.addEventListener('click', (e) => {
            let playerOption = this.title;
            this.dispatchEvent(new CustomEvent("play", {
                detail: {
                    playerOption: playerOption
                },
                bubbles: true
            }));
        });
    }
    get title() {
        return this.getAttribute('title');
    }
    render() {
        return `<i class="choice fa fa-hand-${this.title} fa-6x"></i>`;
    }
}

window.customElements.define('player-option', PlayerOption);