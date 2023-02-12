// Калькулятор
let a = ''; // number 1
let b = ''; // number 2
let sign = ''; // знак операции
let fin = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/'];

const out = document.querySelector('.display-screen');

function clear() {
    a = '';
    b = '';
    sign = '';
    fin = false;
    out.textContent = 0;
}

const ac = document.querySelector('.ac');
ac.addEventListener('click', clear);

const buttons = document.querySelector('.buttons');

buttons.onclick = (event) => {
    const but = event.target.textContent; // содержимое нажатой кнопки

    // нажата цифра 
    if (digit.includes(but)) {
        if (b === '' && sign === '') {
            if (a.length > 9) {
                return;
            }
            a += but;
            out.textContent = a;
        }

        else if (a !== '' && b !== '' && fin) {
            b = but;
            fin = false;
            out.textContent = b;
        }

        else {
            if (b.length > 9) {
                return;
            }
            b += but;
            out.textContent = b;
        }
        return;
    }

    if (action.includes(but)) {
        sign = but;
        out.textContent = sign;
        return;
    }

    // смена знака
    if (but === '+/-' && b === '' && sign === '') {
        a = -a;
        fin = true;
        out.textContent = a;
        return;
    }
    else if (but === '+/-' && b !== '') {
        b = -b;
        fin = true;
        out.textContent = b;
        return;
    }

    //процент
    if (but === '%' && b === '' && sign === '') {
        a = a / 100;
        fin = true;
        out.textContent = a;
        return;
    }
    // нажата =
    if (but === '=') {
        if (b === '') b = a; // сложение при помощи + =

        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;

            case "-":
                a = a - b;
                break;

            case "x":

                a = a * b;
                break;

            case "/":
                if (b === '0') {
                    out.textContent = "Error";
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }

                a = a / b;
                break;
        }

        fin = true;
        out.textContent = a;
    }
}

// смена цветовой схемы приложения 

let colFirst = document.getElementsByClassName('first-color'); // дисплей
let colTwo = document.getElementsByClassName('first-row'); // первый ряд кнопок
let colThree = document.getElementsByClassName('last-row'); // остальные кнопки
let colorButton = document.getElementsByClassName('colorButton'); // цветные кнопки


let colorFirst = ['#3C4021', '#022873', '#594622', '#696969'];
let colorTwo = ['#8C8956', '#035AA6', '#F2B749', '#808080'];
let colorThree = ['#A6A165', '#05C7F2', '#F2D852', '#A9A9A9'];
let colorSign = ['#9CC1D9', '#F25E7A', '#B3C8F2', '#FFA500'];


let j = 0;
function getColorNext() {
    j++;
    if (j > 3) { j = 0; }
    changeColor();
}

const colorNext = document.querySelector('.setting');
colorNext.addEventListener('click', getColorNext);


function changeColor() {
    for (i = 0; i < colFirst.length; i++) // изменение цвета дисплея
        colFirst[i].style.background = `${colorFirst[j]}`;

    for (i = 0; i < colTwo.length; i++) // изменение цвета первого ряда кнопок
        colTwo[i].style.background = `${colorTwo[j]}`;

    for (i = 0; i < colThree.length; i++) // изменение цвета остальных кнопок
        colThree[i].style.background = `${colorThree[j]}`;

    for (i = 0; i < colorButton.length; i++) // изменение цвета знака
        colorButton[i].style.background = `${colorSign[j]}`;
}