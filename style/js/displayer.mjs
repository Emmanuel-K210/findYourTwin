class FundBothGame {
    #container = document.createElement("div");
    #image_link = "../../ressources/images/image_"
    #selected = [];
    #bothFund = [];
    #isWinner = false;
    #score = 0;
    #click = 0;
    #start = false

    #create() {
        for (let i = 1; i <= 8; i++) {
            const url_image = this.#image_link + i + ".png";
            const img = new Image();
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 100;
            canvas.height = 100;
            canvas.dataset.id = i;

            const card = document.createElement("div");
            card.classList.add("card");
            card.appendChild(canvas);

            const cover = document.createElement("div");
            cover.classList.add("cover");
            card.appendChild(cover);

            cover.addEventListener("click", () => this.#handleClick(card));

            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }

            img.src = url_image;
            this.#container.appendChild(card);
        }
    }

    get start(){
        return this.#start;
    }

    deploy() {
        this.#container.classList.add("game-container");
        this.#container.id = "game-container";
        this.#create();
        this.#create();
        document.body.prepend(this.#container);
    }

    

    #handleClick(card) {
        this.#click++;
        this.#start = true
        const cover = card.querySelector(".cover");
        this.#unlock(cover);
        this.#selected.push(card);

        if (this.#selected.length === 2 && !this.#bothFund.includes(cover.dataset.id)) {
            const [c1, c2] = this.#selected;
            const id1 = c1.querySelector("canvas").dataset.id;
            const id2 = c2.querySelector("canvas").dataset.id;

            if (id1 !== id2) {
                setTimeout(() => {
                    this.#lock(c1.querySelector(".cover"));
                    this.#lock(c2.querySelector(".cover"));
                }, 400);
                this.#selected = [];
            } else {
                this.#bothFund.push(id1);
                this.#score += 5;
                if (this.#bothFund.length === 8) {
                    this.#isWinner = true;
                }
                this.#selected = [];
            }
        }

    }

    get isWinner() {
        return this.#isWinner;
    }

    get click(){
        return this.#click;
    }

    get score() {
        return this.#score;
    }

    set score(score) {
        this.#score = score;
    }

    get bothFund() {
        return this.#bothFund;
    }

    reset(){
        this.#bothFund = [];
        this.#selected = [];
        this.isWinner = false;
        this.start = false;
        this.score = 0;
    }

    #unlock(cov) {
        cov.style.top = "-100px";
        //cov.style.transition = ".6s";
        cov.style.opacity = 0;
        setTimeout(function () {
            cov.style.display = "none"
        }, 300)
    }

    #lock(cov) {
        cov.style.display = "block"
        setTimeout(function () {
            cov.style.top = "0px";
            cov.style.transition = ".5s";
            cov.style.opacity = 1;
        }, 300)
    }
}

export { FundBothGame };