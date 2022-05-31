import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <div className={s.ButtonContainer}>
      <button className={s.Button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
