import PropTypes from "prop-types";

const NoteIcon = ({ color }) => (
  <svg
    width="31"
    height="29"
    viewBox="0 0 31 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="note">
      <path
        id="icon"
        d="M24.182 14.7895L25.946 12.9989C26.562 12.3737 27.346 12.0326 28.2 11.9474V10.5263L19.8 2H5.8C4.246 2 3 3.26474 3 4.84211V24.7368C3 25.4906 3.295 26.2135 3.8201 26.7465C4.3452 27.2795 5.05739 27.5789 5.8 27.5789H14.2V24.9216L14.382 24.7368H5.8V4.84211H15.6V14.7895H24.182ZM18.4 4.13158L26.1 11.9474H18.4V4.13158ZM25.582 17.39L28.438 20.2889L19.856 29H17V26.101L25.582 17.39ZM30.79 17.9016L29.418 19.2942L26.562 16.3953L27.934 15.0026C28.2 14.7184 28.662 14.7184 28.942 15.0026L30.79 16.8784C31.07 17.1626 31.07 17.6316 30.79 17.9016Z"
        fill={color}
      />
    </g>
  </svg>
);

NoteIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default NoteIcon;
