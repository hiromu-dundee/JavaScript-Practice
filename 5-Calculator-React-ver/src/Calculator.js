import { useState } from "react";

import "./Calculator.css";

let isResult = false;

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState("");
  const [op, setOp] = useState("");

  const onDisplay = (number) => {
    if (isResult) {
      setDisplay(String(number));
      isResult = false;
    } else {
      setDisplay(display === "0" ? String(number) : display + String(number));
    }
  };

  const onOperation = (operator) => {
    setOp(operator);
    setPrev(display);
    setDisplay("0");
  };

  const handleResult = () => {
    if (display === "0" || prev === "") return;

    const result1 = Number(prev);
    const result2 = Number(display);
    const operation = op;

    switch (operation) {
      case "+":
        setDisplay(result1 + result2);
        break;
      case "-":
        setDisplay(result1 - result2);
        break;
      case "*":
        setDisplay(result1 * result2);
        break;
      case "/":
        setDisplay(result2 === 0 ? "Error" : result1 / result2);
        break;
      default:
        setDisplay("Error");
        break;
    }

    isResult = true;
  };

  const handleClear = () => {
    setDisplay("0");
    setPrev("");
    setOp("");
  };

  return (
    <div className="overall">
      <p className="display">{display}</p>
      <div className="row">
        <button type="button" onClick={() => onDisplay(7)} className="number">
          7
        </button>
        <button type="button" onClick={() => onDisplay(8)} className="number">
          8
        </button>
        <button type="button" onClick={() => onDisplay(9)} className="number">
          9
        </button>
        <button
          type="button"
          onClick={() => onOperation("/")}
          className="operator"
        >
          ÷
        </button>
      </div>

      <div className="row">
        <button type="button" onClick={() => onDisplay(4)} className="number">
          4
        </button>
        <button type="button" onClick={() => onDisplay(5)} className="number">
          5
        </button>
        <button type="button" onClick={() => onDisplay(6)} className="number">
          6
        </button>
        <button
          type="button"
          onClick={() => onOperation("*")}
          className="operator"
        >
          ×
        </button>
      </div>

      <div className="row">
        <button type="button" onClick={() => onDisplay(1)} className="number">
          1
        </button>
        <button type="button" onClick={() => onDisplay(2)} className="number">
          2
        </button>
        <button type="button" onClick={() => onDisplay(3)} className="number">
          3
        </button>
        <button
          type="button"
          onClick={() => onOperation("-")}
          className="operator"
        >
          -
        </button>
      </div>

      <div className="row">
        <button type="button" onClick={handleClear} className="operator">
          AC
        </button>

        <button type="button" onClick={() => onDisplay(0)} className="number">
          0
        </button>
        <button
          type="button"
          onClick={() => onOperation("+")}
          className="operator"
        >
          +
        </button>
        <button type="button" onClick={handleResult} className="operator">
          =
        </button>
      </div>
    </div>
  );
}
