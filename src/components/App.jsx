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
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const modalImage = useRef({})

  const handleSearch = (query) => {
    setQueryStr(query)
  }

  useEffect(() => {
    if (queryStr.length < 1)
      return // empty query string

    async function doSearch() {
      try {
        setImagesData({})
        setCurrentPage(0)
        setErrMsg('')
        setLoading(true)
        const data = await searchPhotos(queryStr)
        setCurrentPage(1)
        setImagesData(data)
      } catch (error) {
        setErrMsg(error.message)
      } finally {
        setLoading(false)
      }
    }

    doSearch()
  }, [queryStr])

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1)
   }

  useEffect(() => {
    if (currentPage <= 1)
      return // don't have data yet

    async function getNextPage() {
      try {
        setErrMsg('')
        setLoading(true)
        const data = await searchPhotos(queryStr, currentPage)
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

    getNextPage()
  }, [currentPage])

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
