import PropTypes from "prop-types";

const HomeIcon = ({ color }) => (
  <svg
    width="30"
    height="34"
    viewBox="0 0 30 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="icon"
      d="M15.0697 7.3585C15.326 7.12755 15.657 7 15.9999 7C16.3428 7 16.6738 7.12755 16.9301 7.3585L29.5388 18.7274C29.8024 18.9813 29.9583 19.3293 29.9737 19.6977C29.989 20.0661 29.8626 20.4262 29.621 20.7018C29.3795 20.9774 29.0418 21.147 28.6793 21.1748C28.3168 21.2025 27.9579 21.0862 27.6783 20.8505L27.2076 20.4284V31.1578C27.2076 31.9116 26.9124 32.6345 26.387 33.1675C25.8615 33.7006 25.1488 34 24.4057 34H7.59411C6.851 34 6.13831 33.7006 5.61285 33.1675C5.08739 32.6345 4.79218 31.9116 4.79218 31.1578V20.4284L4.32146 20.8505C4.04191 21.0862 3.68297 21.2025 3.32047 21.1748C2.95797 21.147 2.62029 20.9774 2.37877 20.7018C2.13726 20.4262 2.01081 20.0661 2.02615 19.6977C2.04149 19.3293 2.19741 18.9813 2.46098 18.7274L15.0697 7.3585ZM7.59411 17.8989V31.1578H11.797V24.0522C11.797 23.6753 11.9446 23.3139 12.2073 23.0474C12.4701 22.7809 12.8264 22.6311 13.198 22.6311H18.8018C19.1734 22.6311 19.5297 22.7809 19.7925 23.0474C20.0552 23.3139 20.2028 23.6753 20.2028 24.0522V31.1578H24.4057V17.9003L15.9999 10.3215L7.59411 17.8989ZM17.4009 31.1578V25.4734H14.5989V31.1578H17.4009Z"
      fill={color}
    />
  </svg>
);

HomeIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default HomeIcon;
