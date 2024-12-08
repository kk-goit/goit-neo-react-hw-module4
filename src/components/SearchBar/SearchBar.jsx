import toast, { Toaster } from 'react-hot-toast';
import { IoSearchOutline } from "react-icons/io5";
import css from './SearchBar.module.css'

function SearchBar({ onSearch = () => { } }) { 
  function handleSubmit(e) { 
    e.preventDefault()
    const queryStr = e.target.elements.queryStr.value.trim()
    if (queryStr.length > 0) {
      onSearch(queryStr)
      e.target.reset()
    } else
      toast.error('You need to enter something for searching...')
  }
  
  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit}>
        <label className={css.searchLabel}>
          <input
            type="text"
            name="queryStr"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.searchInput}
            />
          <button className={css.searchIcon} type="submit"><IoSearchOutline /></button>
        </label>
      </form>
      <Toaster position='top-center' toastOptions={{duration: 1750, style: {color: "red"}}}/>
    </header>
  )
}

export default SearchBar
