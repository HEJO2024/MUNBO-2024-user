import "../styles/components/Loading.css";

import PropTypes from "prop-types";

export default function Loading({ message }) {
  return (
    <div className="loading">
      <div className="loading__wrapper">
        <p className="loading__message">{message}</p>
        <div className="loading__spinner"></div>
      </div>
    </div>
  );
}

Loading.propTypes = {
  message: PropTypes.string.isRequired,
};
