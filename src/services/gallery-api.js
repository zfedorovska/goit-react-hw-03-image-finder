function fetchGallery(query, page) {
    const API_KEY = '26451548-31afe824f4cddf17f2ad70b2c';
  return fetch(`https://pixabay.com/api/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`).then(response => {
    if (response.ok) {
          return response.json();
        }
    return Promise.reject(new Error(`Нет картинок по запросу ${query}`));
  });
}

const api = {
  fetchGallery,
};

export default api;