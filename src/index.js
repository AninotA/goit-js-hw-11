import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotos } from './fetchPhotos';

const input = document.querySelector('.input-form');
const search = document.querySelector('.button-form');
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

btn.style.display = 'none';

let pageNumber = 1;

search.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  const trimmedValue = input.value.trim();
  if (trimmedValue !== '') {
    fetchPhotos(trimmedValue, pageNumber).then(foundData => {
      if (foundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderPhotos(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        btn.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

btn.addEventListener('click', () => {
  pageNumber++;
  const trimmedValue = input.value.trim();
  btn.style.display = 'none';
  fetchPhotos(trimmedValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderPhotos(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} totalHits images.`
      );
      btn.style.display = 'block';
    }
  });
});




function renderPhotos(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
        <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="info">
            <p class="info-item">
                <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
            </p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML += markup;
}

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btn.style.display = 'none';
}

