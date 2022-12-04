import axios from "axios";

export async function fetchPhotos(query, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '31827457-8050568eb499e311ab2ddc1e9';
    const fields = {
      params: {
        key: KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page,
      },
    };
  
    try {
      return await axios.get(BASE_URL, fields);
    } catch (error) {
      console.error(error);
    }
  }