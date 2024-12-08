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
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const modalImage = useRef({})

  const handleSearch = (query) => {
    setQueryStr(query)
  }

  useEffect(() => {
    if (queryStr.length < 1)
      return;
    async function doSearch() {
      try {
        setImagesData({})
        setErrMsg('')
        setLoading(true)
        const data = await searchPhotos(queryStr)
        data.current_page = 1
        setImagesData(data)
      } catch (error) {
        setErrMsg(error.message)
      } finally {
        setLoading(false)
      }
    }
    doSearch();
  }, [queryStr]);

  const handleLoadMore = async () => {
    try {
      setErrMsg('')
      setLoading(true)
      imagesData.current_page += 1
      const data = await searchPhotos(queryStr, imagesData.current_page)
      setImagesData({
        ...data,
        current_page: imagesData.current_page,
        results: imagesData.results.concat(data.results)
      })
    } catch (error) {
      setErrMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

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
      {imagesData.total_pages && imagesData.total_pages > imagesData.current_page && <LoadMore onLoad={handleLoadMore} />}
      <ImageModal
        isOpen={isOpenModal}
        onRequestClose={hadleCloseModal}
        {...modalImage.current}
      />
    </>
  ) 
}

export default App
