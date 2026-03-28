let current = '0';
let expression = '';
let operator = null;
let operand = null;
let justCalculated = false;

function updateDisplay() {
  document.getElementById('result').textContent = current;
  document.getElementById('expression').textContent = expression;
}

function inputDigit(digit) {
  if (justCalculated) {
    current = digit;
    expression = '';
    justCalculated = false;
  } else if (current === '0') {
    current = digit;
  } else {
    if (current.length >= 12) return;
    current += digit;
  }
  updateDisplay();
}

function inputDot() {
  if (justCalculated) {
    current = '0.';
    expression = '';
    justCalculated = false;
  } else if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay();
}

function inputOperator(op) {
  justCalculated = false;
  if (operator && operand !== null) {
    const result = compute(operand, parseFloat(current), operator);
    current = formatResult(result);
    operand = result;
  } else {
    operand = parseFloat(current);
  }
  operator = op;
  const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  expression = `${formatResult(operand)} ${opSymbols[op]}`;
  updateDisplay();
}

function calculate() {
  if (operator === null || operand === null) return;
  const result = compute(operand, parseFloat(current), operator);
  const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  expression = `${formatResult(operand)} ${opSymbols[operator]} ${current} =`;
  current = formatResult(result);
  operator = null;
  operand = null;
  justCalculated = true;
  updateDisplay();
}

function compute(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Erro';
  }
}

function formatResult(value) {
  if (value === 'Erro') return 'Erro';
  const num = parseFloat(value.toPrecision(10));
  return String(num);
}

function clearAll() {
  current = '0';
  expression = '';
  operator = null;
  operand = null;
  justCalculated = false;
  updateDisplay();
}

function toggleSign() {
  current = String(parseFloat(current) * -1);
  updateDisplay();
}

function inputPercent() {
  current = String(parseFloat(current) / 100);
  updateDisplay();
}

updateDisplay();
