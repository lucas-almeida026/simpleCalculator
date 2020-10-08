let numberVisor = document.getElementById('number')
let historyVisor = document.getElementById('history')
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

const reloadVisor = () => {
  num1.length >= 10 && num1.includes(',') ? num1 = num1.substring(0, 11 + num1.indexOf(','))  : false
  num1.length >= 10 ? num1 = num1.substring(0, 11)  : false
  numberVisor.innerText = num1.toString()
  numberVisor.innerText.length == 0 ? numberVisor.innerText = '0' : false
}

const deleteEndingComma = () => num1.substring(num1.length - 1, num1.length) == ',' ? deleteDigit() : false
const deleteMinesSignal = () => num1.length === 1 && num1 == '-' ? deleteDigit() : false

const setNumber = (num) => {
  if(operation == '='){
    operation = ''
    num1 = ''
  }
  if(!!num1 && !num2 && !!operation){
    num2 = num1
    num1 = ''
  }
  num1 += num
  reloadVisor()
}

let operations = [
  ['+', (a, b) => a + b],
  ['-', (a, b) => a - b],
  ['*', (a, b) => a * b],
  ['/', (a, b) => a / b],
  ['=', () => num1]
]

const setOperation = (op) => {
  deleteEndingComma()
  if(op != '='){    
    if(num1 && num2 && operation){
      calcResult()
    }else{
      num2 = num1
      num1 = ''      
    }    
  }else{
    if(!!num2 && operation == '')
      num2 = ''
    
    if(!!num1 && !!num2)
      calcResult()
  }
  operation = op
  reloadVisor()
}

const calcResult = () => {
  num1 = Object.fromEntries(operations)[operation](parseFloat(num2.replace(',', '.')), parseFloat(num1.replace(',', '.'))).toString().replace('.', ',')
  num2 = ''
}

const clearAll = () => {
  num1 = ''
  num2 = ''
  operation = ''
  history = ''
  reloadVisor()
}

const deleteDigit = () => {
  num1 = num1.substring(0, num1.length - 1)
  reloadVisor()
  deleteEndingComma()
  deleteMinesSignal()
}

const insertComma = () => {
  num1.includes(',') ? false : num1 += ','
  reloadVisor()
}
