import axios from 'axios';
async function fetchPhotos(inputValue, pageNr) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=31827457-8050568eb499e311ab2ddc1e9&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { fetchPhotos };

// import axios from "axios";

// export async function fetchPhotos(query, page) {
//     const BASE_URL = 'https://pixabay.com/api/';
//     const KEY = '31827457-8050568eb499e311ab2ddc1e9';
//     const fields = {
//       params: {
//         key: KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: 40,
//         page,
//       },
//     };
  
//     try {
//       return await axios.get(BASE_URL, fields);
//     } catch (error) {
//       console.error(error);
//     }
//   }

