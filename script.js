const display = document.getElementById('displayArea');
const buttons = document.querySelectorAll('button');
const specialChar = ['+', '-', '*', '/'];
let output = '';
let specialCharCount = 0;
let dotCount = 0;


const calculate = (buttonValue) => {

    if (!output.includes("Infinity")) {
        if ((output === "" || output === "-" || output === "+") && (buttonValue === "*" || buttonValue === "/")) {
            return; //Prevents the possibility of having * and / as first character.
        } else if ((output.endsWith("+") || output.endsWith("-") || output.endsWith("*") || output.endsWith("/") || output.endsWith(".")) && specialChar.includes(buttonValue)) {
            output = output.replaceAll(",", "").slice(0, -1) + buttonValue; //This handles multiples operators e.g ++ and instead updates the previous operator.
        } else if (buttonValue === "=" && output !== "") {
            //Handles the calculation.
            output = parseFloat(eval(output)).toLocaleString();
            // if(output.toString().includes(".")){
            //     output = parseInt(output.toString().slice(0, (output.toString().indexOf(".") + 4)))
            //     display.value = output;
            // }
        } else if (buttonValue === "=" && output === "") {
            return;
        } else if (buttonValue === "RESET") {
            output = "";
            specialCharCount = 0;
            dotCount = 0; //Reset to default state.
        } else if (buttonValue === "DEL") {
            output = output.replaceAll(",", "").slice(0, -1); //Handles delete operation.
        } else if ((output === "" && buttonValue === ".") || ((output.endsWith("+") || output.endsWith("-") || output.endsWith("*") || output.endsWith("/")) && buttonValue === ".")) {
            if (dotCount - specialCharCount == 0) {
                output = output.replaceAll(",", "") + ("0" + buttonValue);
                dotCount++;
            } else return; //Appends zero to decimal and prevents multiple dots.
        } else if (specialChar.includes(buttonValue)) {
            if (!output.includes(".")) {
                output = output.replaceAll(",", "") + buttonValue;
            } else {
                specialCharCount++;
                output = output.replaceAll(",", "") + buttonValue; //Special character start it counting after a dot is present i.e number of dot should be 1 >= number of operators.
            }
        } else if (buttonValue === ".") {
            if (dotCount - specialCharCount == 0) {
                output = output.replaceAll(",", "") + buttonValue;
                dotCount++;
            } else return; //Prevent multiple dots.
        } else {
            output = output.replaceAll(",", "") + buttonValue;
        }
    } else {
        if (buttonValue === "*" || buttonValue === "/") {
            return;
        } else {
            output = output.replace("Infinity", "") + buttonValue;
        }
    }

    display.value = output;
}

buttons.forEach((button) => {
    button.addEventListener('click', e => calculate(e.target.dataset.value))
});


//Toggle Button...

const toggle = document.querySelector(".toggleButton")

const bodyTheme = document.querySelector('body');

function changeToggle() {
    if (window.getComputedStyle(toggle).marginInlineStart == '5px') { //Using "toggle.style.marginInlineStart == '5px' breaks the first click and thus does not respond...

        toggle.style.marginInlineStart = '25px'

        bodyTheme.classList.remove('theme1')
        bodyTheme.classList.add('theme2');

        toggle.style.backgroundColor = 'var(--tgl-bt-clr)';
        toggle.addEventListener('mouseover', () => {
            toggle.style.backgroundColor = 'var(--tgl-bt-hov)';
        })
        toggle.addEventListener('mouseout', () => {
            toggle.style.backgroundColor = '';
        })

        document.querySelector('.topArea').style.color = 'var(--txt-clr)';

        document.getElementById('displayArea').style.color = 'var(--txt-clr)';

    } else if (toggle.style.marginInlineStart == '25px'
    ) {

        toggle.style.marginInlineStart = '50px'

        bodyTheme.classList.remove('theme2')
        bodyTheme.classList.add('theme3');

        toggle.style.backgroundColor = 'var(--tgl-bt-clr)';
        toggle.addEventListener('mouseover', () => {
            toggle.style.backgroundColor = 'var(--tgl-bt-hov)';
        })
        toggle.addEventListener('mouseout', () => {
            toggle.style.backgroundColor = '';
        })

        document.querySelector('.topArea').style.color = 'var(--txt-clr)';

        document.getElementById('displayArea').style.color = 'var(--txt-clr)';
    } else {
        toggle.style.marginInlineStart = '5px'

        bodyTheme.classList.remove('theme3')
        bodyTheme.classList.add('theme1');

        toggle.style.backgroundColor = 'var(--tgl-bt-clr)';
        toggle.addEventListener('mouseover', () => {
            toggle.style.backgroundColor = 'var(--tgl-bt-hov)';
        })
        toggle.addEventListener('mouseout', () => {
            toggle.style.backgroundColor = '';
        })

        document.querySelector('.topArea').style.color = 'var(--wht-txt-clr)';

        document.getElementById('displayArea').style.color = 'var(--wht-txt-clr)';
    }
}
