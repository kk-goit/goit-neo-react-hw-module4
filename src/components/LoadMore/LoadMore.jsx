import css from './LoadMore.module.css'

function LoadMore({ onLoad = () => { } }) { 
  return (
    <>
      <button className={css.loadMoreBtn} onClick={onLoad} >Load more...</button>
    </>
  )
}

export default LoadMore