/*coisas pra fazer: 
reduzir o número de casas decimais
desfazer comportamento de apagar resultado depois de apertar igual
corrigir bug ainda {3 = 6 +}
*/

let numberVisor = document.getElementById('number')
let btnNumbers = document.getElementsByClassName('number')
let btnOperations = document.getElementsByClassName('operation')
let btnOperationsF = document.getElementsByClassName('operationF')
let btnDot = document.getElementsByClassName('dot')[0]

let num1 = ''
let num2 = ''
let operation = ''

for(let i = 0; i < btnNumbers.length; i++){
  btnNumbers[i].addEventListener('click', e => {
    setNumber(e.target.innerText)
  })
}

for(let i = 0; i < btnOperations.length; i++){
  btnOperations[i].addEventListener('click', e => {
    setOperation(e.target.innerText)
  })
}

for(let i = 0; i < btnOperationsF.length; i++){
  btnOperationsF[i].addEventListener('click', e => {
    if(e.target.innerText == 'AC'){
      clearAll()
    }else{
      deleteDigit()
    }
  })
}

btnDot.addEventListener('click', () => {
  insertComma()
})


// function setNumber(num){
//   num1 += num
//   reloadVisor()
// }
const setNumber = (num) => {  
  if(operation == '='){
    operation = ''
    num1 = ''
  }
  if(operation != '' && num2 == ''){
    num2 = num1
    num1 = ''
  }
  num1 += num
  reloadVisor()
}

// function setOperation(op){
//   deleteEndingComma()
//   console.log(op)
// }

let operations = [
  ['+', (a, b) => a + b],
  ['-', (a, b) => a - b],
  ['*', (a, b) => a * b],
  ['/', (a, b) => a / b]
]

const setOperation = (op) => {
  deleteEndingComma()
  if(num1 == '' || num2 == ''){
    operation = op
    num2 = num1
    num1 = ''
  }else{
    num1 = Object.fromEntries(operations)[operation](parseFloat(num2.replace(',', '.')), parseFloat(num1.replace(',', '.'))).toString().replace('.', ',')
    num2 = ''
    operation = op
  }
  reloadVisor()
}

function clearAll(){
  num1 = ''
  num2 = ''
  operation = ''
  reloadVisor()
}

function deleteEndingComma(){num1.substring(num1.length - 1, num1.length) == ',' ? deleteDigit() : false}
function deleteMinesSignal(){num1.length === 1 && num1 == '-' ? deleteDigit() : false}

function deleteDigit(){
  num1 = num1.substring(0, num1.length - 1)
  reloadVisor()
  deleteEndingComma()
  deleteMinesSignal()
}

function insertComma(){
  num1.includes(',') ? false : num1 += ','
  reloadVisor()
}

function reloadVisor(){
  console.log('num1:', num1)
  console.log('num2:', num2)
  console.log('operation:', operation)
  numberVisor.innerText = num1.toString()
  numberVisor.innerText.length == 0 ? numberVisor.innerText = '0' : false
}