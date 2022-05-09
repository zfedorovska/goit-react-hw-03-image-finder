import s from './Button.module.css';

export default function Button({onClick}) {
  return (
      <div className={s.ButtonContainer}>
        <button className={s.Button}
          onClick={onClick}>Load more</button>
      </div>
  );
}