import { useState } from "react";
import classnames from "classnames";

import "./Calculator.css";

let isResult = false;

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState("");
  const [op, setOp] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  const onDisplay = (number) => {
    display.includes(".") === true
      ? SetErrorMessage("Include point now.")
      : SetErrorMessage("");

    if (isResult) {
      setDisplay(String(number));
      isResult = false;
    } else {
      setDisplay(display === "0" ? String(number) : display + String(number));
      SetErrorMessage("");
    }
  };

  const onDotDisplay = (point) => {
    display.includes(".") === true
      ? SetErrorMessage("Include point now.")
      : setDisplay(display + String(point));
  };

  const onOperation = (operator) => {
    SetErrorMessage("");
    setOp(operator);
    setPrev(display);
    setDisplay("0");
  };

  const handleResult = () => {
    SetErrorMessage("");

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
    SetErrorMessage("");
    setDisplay("0");
    setPrev("");
    setOp("");
  };

  return (
    <div className="body-all">
      <p className="error-message">{errorMessage}</p>
      <p className="display">{display}</p>
      <div className="overall">
        <button type="button" onClick={handleClear} className="command">
          AC
        </button>
        <button type="button" className="command">
          +/-
        </button>
        <button type="button" className="command">
          %
        </button>
        <button
          type="button"
          onClick={() => onOperation("/")}
          className="operator"
        >
          ÷
        </button>

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
          onClick={() => onOperation("*")}
          className="operator"
        >
          ×
        </button>

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
          onClick={() => onOperation("-")}
          className="operator"
        >
          -
        </button>

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
          onClick={() => onOperation("+")}
          className="operator"
        >
          +
        </button>

        <button
          type="button"
          onClick={() => onDisplay(0)}
          className={classnames("number", "big-button")}
        >
          0
        </button>

        <button
          type="button"
          onClick={() => onDotDisplay(".")}
          className="number"
        >
          .
        </button>

        <button type="button" onClick={handleResult} className="operator">
          =
        </button>
      </div>
    </div>
  );
}
