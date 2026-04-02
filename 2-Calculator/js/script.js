let calculateResult = document.querySelector('#calculate-result');
let cal, index, result, minus_result;

const btns = document.querySelectorAll(".btn");

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('num') || btn.classList.contains('sign')) {
            if (calculateResult.textContent == '0') {
                if (btn.id === 'point') {
                    calculateResult.textContent += btn.textContent;
                } else {
                    calculateResult.textContent = btn.textContent;
                }
            } else {
                calculateResult.textContent += btn.textContent;
            }
        } else if (btn.id === 'clear') {
            calculateResult.textContent = '0';
        } else if (btn.id === 'plus-minus') {
            cal = calculateResult.textContent.match(/((\d+(\.\d+)?)+|[+-×÷])/g);
            console.log(cal);

            if (cal[0] === '-') {
                cal.splice(0, 1);
            } else {
                cal.unshift('-');
            }

            calculateResult.textContent = cal.join("");

        } else if (btn.id === 'percentage') {
            calculateResult.textContent = parseFloat(calculateResult.textContent) / 100.0;
        } else if (btn.id === 'equal') {
            // cal = calculateResult.textContent.match(/(\f+|[+-×÷])/g);
            cal = calculateResult.textContent.match(/((\d+(\.\d+)?)+|[+-×÷])/g);
            

            if (cal[0] === '-') {
                minus_result = cal.slice(0, 2).join("");
                cal.splice(0, 2, minus_result);
            }

            while (cal.some(item => item === '+' || item === '-' || item === '×' || item === '÷')) {
                if (cal.some(item => item === '×' || item === '÷')) {
                    index = cal.findIndex(item => item === '×' || item === '÷');
                    if (cal[index] == '×') {
                        result = Number(cal[index - 1]) * Number(cal[index + 1]);
                        cal.splice(index - 1, 3, result)
                    } else {
                        result = Number(cal[index - 1]) / Number(cal[index + 1]);
                        cal.splice(index - 1, 3, result)
                    }
                } else {
                    index = cal.findIndex(item => item === '+' || item === '-');
                    if (cal[index] === '+') {
                        result = Number(cal[index - 1]) + Number(cal[index + 1]);
                        cal.splice(index - 1, 3, result)
                    } else {
                        result = Number(cal[index - 1]) - Number(cal[index + 1]);
                        cal.splice(index - 1, 3, result)
                    }
                }
            }

            calculateResult.textContent = cal[0].toFixed(5);
        }
    });
});
