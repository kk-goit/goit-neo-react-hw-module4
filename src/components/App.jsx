import { useState, useEffect, useRef } from 'react'
import { searchPhotos } from '../api/unsplash'
import SearchBar from './SearchBar/SearchBar'
import ImagesGallery from "./ImagesGallery/ImagesGallery"
import Loader from './Loader/Loader'
import APIError from './APIError/APIError'
import LoadMore from './LoadMore/LoadMore'
import ImageModal from './ImageModal/ImageModal'

function App() {
  const [imagesData, setImagesData] = useState({})
  const [queryStr, setQueryStr] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const modalImage = useRef({})

  const handleSearch = (query) => {
    if (query != queryStr) {
      setQueryStr(query)
      setCurrentPage(1) // set default current page
      setImagesData({}) // clean previews image's data

      return true
    } else
      return false
  }

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1)
   }

  useEffect(() => {
    if (queryStr.length < 1)
      return // empty query string

    async function requestData() {
      try {
        setErrMsg('')
        setLoading(true)
        const data = await searchPhotos(queryStr, currentPage)
        if (currentPage == 1) 
          // set new search data
          setImagesData(data) 
        else
          // add new page data to existing ones
          setImagesData({
            ...data,
            results: imagesData.results.concat(data.results)
          })
      } catch (error) {
        setErrMsg(error.message)
      } finally {
        setLoading(false)
      }
    }

    requestData()
  }, [queryStr, currentPage])

  const hadleOpenModal = ({ data = {} }) => {
    modalImage.current = data
    setIsOpenModal(true)
  }
  const hadleCloseModal = () => { 
    modalImage.current = {}
    setIsOpenModal(false)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {imagesData.results && imagesData.results.length > 0 && <ImagesGallery images={imagesData.results} openModal={hadleOpenModal}/>}
      {loading && <Loader />}
      {errMsg.length > 0 && <APIError msg={errMsg} />}
      {imagesData.total_pages && imagesData.total_pages > currentPage && <LoadMore onLoad={handleLoadMore} />}
      <ImageModal
        isOpen={isOpenModal}
        onRequestClose={hadleCloseModal}
        {...modalImage.current}
      />
    </>
  ) 
}

export default App
