import { Component } from 'react';
import s from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <header className={s.searchBar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button className={s.searchBarButton} type="submit">
            <AiOutlineSearch className={s.searchIcon} />
            {/* <span className={s.searchBarButtonLabel}>Search</span> */}
          </button>
          <input
            className={s.searchBarInput}
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            autoComplete={'off'}
            autoFocus={true}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
