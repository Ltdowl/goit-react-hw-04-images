import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const normalizeSearchQuery = searchQuery.trim().toLowerCase();
    if (!normalizeSearchQuery) {
      return;
    }
    onSubmit(normalizeSearchQuery);
    setSearchQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
