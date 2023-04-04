import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <header className={s.searchBar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button className={s.searchBarButton} type="submit">
          <AiOutlineSearch className={s.searchIcon} />
        </button>
        <input
          className={s.searchBarInput}
          type="text"
          value={input}
          onChange={handleChange}
          autoComplete={'off'}
          autoFocus={true}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
