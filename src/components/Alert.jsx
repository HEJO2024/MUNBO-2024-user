import "../styles/components/Alert.css";

import PropTypes from "prop-types";

export default function Alert({ message, type, okHandler, cancelHandler }) {
  return (
    <div className="alert">
      <div className="alert__wrapper">
        <div className="alert__box">
          <p className="alert__text">{message}</p>
          <div className="alert__btn-container">
            {type !== "ok" && (
              <button
                className="alert__btn alert__btn--cancel"
                onClick={cancelHandler}
              >
                취소
              </button>
            )}
            <button className="alert__btn alert__btn--ok" onClick={okHandler}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  okHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};
