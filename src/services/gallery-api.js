function fetchGallery(query, page) {
  const API_KEY = '26451548-31afe824f4cddf17f2ad70b2c';
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No pictures by query ${query}`));
  });
}

const api = {
  fetchGallery,
};

export default api;
