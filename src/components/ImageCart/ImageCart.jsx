import { useState } from "react"
import css from "./ImageCart.module.css"

function ImageCart({
  urls = { regular: '', small: '' },
  alt_description = '',
  user = {},
  likes = 0,
  openModal = () => { },
}) {
  function handleClick() {
    openModal({ data: {
      src: urls.regular,
      alt: alt_description,
      author: user.first_name,
      profile: user.links.html,
      likes: likes,
    }})
  }

  return (<>
    <div className={css.imageCart}>
      <img className={css.cartImage} src={urls.small} alt={alt_description} onClick={handleClick} />
    </div>
  </>)
}

export default ImageCart