import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './fetchPhotos';



const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');
let currentpage = 1;
let currentquery = '';

form.addEventListener('submit', event => {
  event.preventDefault();
  currentpage = 1;
  gallery.innerHTML = '';
  currentquery = event.currentTarget.searchQuery.value.trim();
  if (currentquery === '') {
    btn.classList.add('load-more');
    return;
  }
  getPhotos(currentquery, currentpage);
});

btn.addEventListener('click', event => {
  getPhotos(currentquery, currentpage);
});

function getPhotos(query, page) {
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
    currentpage += 1;
    if (json.data.totalHits > 40) {
      btn.classList.remove('load-more');
    }
    if (json.data.totalHits / 40 <= currentpage - 1) {
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
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width="320" height="200"/>
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
