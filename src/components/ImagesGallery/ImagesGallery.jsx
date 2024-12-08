import css from './ImagesGallery.module.css'
import ImageCart from "../ImageCart/ImageCart"

function ImagesGallery({ images = [], openModal = () => { }  }) { 
  return (
    <ul className={css.imagesGallery}>
      {images.map((img) => { 
        return (
          <li key={img.id} className={css.imagesItem}>
            <ImageCart openModal={openModal} {...img} />
          </li>
        )
      })}
    </ul>
  )
}

export default ImagesGallery