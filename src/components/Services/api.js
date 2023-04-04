import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

const API_KEY = '34263034-e023978e9227905632f4b2f16';

export default async function fetchImagesWithQuery(term, page = 1) {
  const response = await axios.get(
    `/api/?q=${term}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(response);
  return response.data;
}

//
