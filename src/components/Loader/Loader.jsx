import css from './Loader.module.css'
import { MagnifyingGlass } from "react-loader-spinner"

function Loader() { 
  return (
    <div className={css.loader}>
      <MagnifyingGlass glassColor="blue" color="darkgray" />
    </div>
  )
}

export default Loader