import s from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={s.buttonWrapper}>
      <button className={s.button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default Button;
