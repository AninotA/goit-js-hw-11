import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotos } from './fetchPhotos';

const input = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';
let gallerySimle = new SimpleLightbox('.gallery a');




input.addEventListener('submit', event => {
  event.preventDefault();
  currentPage = 1;
  gallery.innerHTML = '';
  currentQuery = event.currentTarget.searchQuery.value.trim();
  if (currentQuery === '') {
    btn.classList.add('load-more');
    return;
  }
  getImg(currentQuery, currentPage);
  gallerySimle.next();
  gallerySimle.refresh();
});

btn.addEventListener('click', event => {
  getImg(currentQuery, currentPage);
});

function getImg(query, page) {
  fetchPhotos(query, page).then(json => {
    if (json.data.totalHits === 0) {
      btn.classList.add('load-more');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const arr = json.data.hits;
    // console.log(arr);
    renderPhotos(arr);
    currentPage += 1;
    if (json.data.totalHits > 40) {
      btn.classList.remove('load-more');
    }
    if (json.data.totalHits / 40 <= currentPage - 1) {
      btn.classList.add('load-more');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function renderPhotos(arr) {
  const cards = arr
    .map(
      el => `<div class="photo-card">
      <a href="${el.largeImageURL}"><img src="${el.webformatURL}" alt="${el.tags}" title="${el.tags}" loading="lazy" width="320" height="200"/></a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${el.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${el.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${el.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', cards);
}

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
