import "../styles/components/Dropdown.css";

import PropTypes from "prop-types";
import { useState } from "react";

export default function Dropdown({
  message,
  options,
  defaultOption,
  onSelect,
}) {
  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
    let valueToSend = option;
    if (option === "객관식(4지선다)") valueToSend = 0;
    else if (option === "주관식") valueToSend = 1;
    else if (option === "OX 퀴즈") valueToSend = 2;
    onSelect(valueToSend);
  };

  return (
    <div className="dropdown">
      <p
        className="dropdown__text"
        style={{
          marginBottom: message !== "자격증을 선택해주세요." ? "1rem" : "",
        }}
      >
        {message}
      </p>
      <button
        className="dropdown__label"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          color: selected === defaultOption ? "rgba(0, 0, 0, 0.50)" : "#000",
        }}
      >
        {selected}
      </button>
      {isOpen && (
        <ul className="dropdown__list">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown__option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  message: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  defaultOption: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
