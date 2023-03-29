'use strict';

let player0El = document.querySelector('.player--0');
let score0El = document.getElementById('score--0');

let player1El = document.querySelector('.player--1');
let score1El = document.getElementById('score--1');

let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');

let score, activePlayer, playing;

let init = function () {
    console.log('good');
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');

    score = [0, 0];
    activePlayer = 0;
    playing = true;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

}
init()


btnRoll.addEventListener('click', function () {
    if (playing) {
        let dice = Math.trunc((Math.random() * 6) + 1);
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        for (let i = 0; i < 1; i++) {
            score[activePlayer] += dice;
            document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];

            //snake
            if (score[activePlayer] === 20 || score[activePlayer] === 40 || score[activePlayer] === 50 || score[activePlayer] === 90 || score[activePlayer] === 99) {
                alert("snake bite");
                score[activePlayer] = 0;
                document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];
            }
            //ladder
            if (score[activePlayer] === 10 || score[activePlayer] === 30 || score[activePlayer] === 60 || score[activePlayer] === 80) {
                alert("climbing Ladder");
                score[activePlayer] += 15;
                document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];
            }

            if (score[activePlayer] >= 100) {
                playing = false;
                diceEl.classList.add('hidden');
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            }

        }


        activePlayer = activePlayer === 0 ? 1 : 0;
        console.log(activePlayer);
        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');

        if (score[0] === score[1]) {
            document.querySelector(`#score--${activePlayer}`).textContent = 0;
            score[activePlayer] = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
        }
    }
})

btnNew.addEventListener('click', init)

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < 1; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

