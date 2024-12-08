import axios from "axios"

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos'
const theParams = {
  client_id: 'mPBBpIOlZj90yOW-e5Ls4qi-jOkAJwcAX8cfAlRMjBs',
  per_page: 12,
}

const searchPhotos = async (query, page = 1) => { 
  try {
    const res = await axios.get("", { params: { ...theParams, query: query, page: page } })
    
    if (res.data.total == 0)
      throw new Error(`Nothing found.`)
    
    return res.data
  } catch (error) {
    if (error instanceof axios.AxiosError && error.status && error.response) 
      throw new Error(`${error.response.data.errors.join('; ')}; with status: ${error.status}`)
    else
      throw error;
  }
}

export { searchPhotos }