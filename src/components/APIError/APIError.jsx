/* eslint-disable react/prop-types */
import css from './APIError.module.css'

function APIError({ msg = '' }) {
  return (
    <p className={css.apiError}>API Error: {msg}</p>
  )
 }

export default APIError
