var account = [
    { name: "user1", balance: "200", password: "1" },
    { name: "user2", balance: "290", password: "2" },
    { name: "user3", balance: "67", password: "3" }
]

var currentUser = 0;
var userAuth = false;

const userBalance = document.querySelector('#bal');
const userBalanceOld = document.querySelector('#bal-old');
const logInForm = document.querySelector('#logged-out')
const balanceForm = document.querySelector('#logged-in')
const nameInput = document.querySelector('#nameInput');
const passwordInput = document.querySelector('#passwordInput');
const fundsInput = document.querySelector('#fundsInput');
const errorMsg = document.querySelector('#error-msg');

//validacion
function validation() {
    for (let i = 0; i < account.length; i++) {
        if (account[i].name == nameInput.value && account[i].password == passwordInput.value && currentUser == 0) {
            userAuth = true;
            currentUser = i;
            //abrir sesion
            userBalance.innerHTML = "Saldo actual: " + "$" + account[i].balance + " MXN";
            userBalanceOld.innerHTML = "Saldo anterior: " + "$" + account[i].balance + " MXN";
            fundsInput.value = "";
            logInForm.classList.add("invisible-form");
            balanceForm.classList.add("visible-form");
            logInForm.classList.remove("visible-form");
            balanceForm.classList.remove("invisible-form");
            return;
        }
    }
    if (userAuth == false) {
        errorMsg.innerHTML = "Usuario o contraseña incorrectos."
    }
}
//revisar fondos
function balanceCheck() {
    console.log(account[currentUser].balance)
}

//agregar fondos
function balanceAdd() {
    let addNum = Number(fundsInput.value);
    let balanceToBe = Number(account[currentUser].balance) + addNum;
    if (addNum > 0 && balanceToBe <= 990) {
        userBalanceOld.innerHTML = "Saldo anterior: " + "$" + account[currentUser].balance + " MXN";
        account[currentUser].balance = balanceToBe;
        userBalance.innerHTML = "Saldo actual: " + "$" + account[currentUser].balance + " MXN";
    }
    else {
        userBalanceOld.innerHTML = "Error, revisar cantidad a abonar.";
    }
}

//retirar fondos
function balanceSub() {
    let subNum = fundsInput.value;
    if (subNum > 0 && (account[currentUser].balance - subNum) >= 10) {
        userBalanceOld.innerHTML = "Saldo anterior: " + "$" + account[currentUser].balance + " MXN";
        account[currentUser].balance -= subNum;
        userBalance.innerHTML = "Saldo actual: " + "$" + account[currentUser].balance + " MXN";
    }
    else {
        userBalanceOld.innerHTML = "Error, revisar cantidad a retirar.";
    }
}

//cerrar sesion
function logOut() {
    userAuth = false;
    currentUser = 0;
    //regresar
    nameInput.value = "";
    passwordInput.value = "";
    errorMsg.innerHTML = "";
    logInForm.classList.remove("invisible-form");
    balanceForm.classList.remove("visible-form");
    logInForm.classList.add("visible-form");
    balanceForm.classList.add("invisible-form");
}