import "../styles/components/Dropdown.css";

import PropTypes from "prop-types";

export default function Dropdown({ handleOptionClick }) {
  return (
    <ul className="dropdown">
      <li
        className="dropdown__option"
        onClick={() => handleOptionClick("정보처리기사")}
      >
        정보처리기사
      </li>
    </ul>
  );
}

Dropdown.propTypes = {
  handleOptionClick: PropTypes.func.isRequired,
};
