import { AiOutlineLike } from "react-icons/ai";
import css from "./ImageModal.module.css"

function ImageModal({
  src = '',
  alt = '',
  author = undefined,
  profile = '#',
  likes = 0,
  onClick = () => { }
}) { 
  return (
    <div className={css.divModal} onClick={onClick}>
      <img className={css.imageModal} alt={alt} src={src} />
      <div className={css.imageInfo}>
        {author && <span>Author: <a href={profile} target="_blank" onClick={(e)=>{e.stopPropagation()}}>{author}</a></span>}
        {likes > 0 && <span className={css.likes}><AiOutlineLike /> {likes}</span>}
      </div>
    </div>
  )
}

export default ImageModal
