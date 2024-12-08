import { AiOutlineLike } from "react-icons/ai";
import Modal from "react-modal"
import css from "./ImageModal.module.css"

function ImageModal({
  src = '',
  alt = '',
  author = undefined,
  profile = '#',
  likes = 0,
  isOpen = false,
  onRequestClose = () => { }
}) { 
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modalContainer}
      overlayClassName={css.modalOverlay}
      shouldReturnFocusAfterClose={true}
      preventScroll={true}
    >
      <div className={css.divModal} onClick={onRequestClose}>
        <img className={css.imageModal} alt={alt} src={src} />
        <div className={css.imageInfo}>
          {author && <span>Author: <a href={profile} target="_blank" onClick={(e)=>{e.stopPropagation()}}>{author}</a></span>}
          {likes > 0 && <span className={css.likes}><AiOutlineLike /> {likes}</span>}
        </div>
      </div>
    </Modal>
  )
}

export default ImageModal
