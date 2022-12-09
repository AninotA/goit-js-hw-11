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

// const input = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');
// const btn = document.querySelector('.load-more');
// let currentPage = 1;
// let currentQuery = '';
// let gallerySimle = new SimpleLightbox('.gallery a');

// input.addEventListener('submit', event => {
//   event.preventDefault();
//   currentPage = 1;
//   gallery.innerHTML = '';
//   currentQuery = event.currentTarget.searchQuery.value.trim();
//   if (currentQuery === '') {
//     btn.classList.add('load-more');
//     gallerySimle.refresh();
//     return;
//   }
//   getImg(currentQuery, currentPage);

// });

// btn.addEventListener('click', event => {
//   getImg(currentQuery, currentPage);
// });

// function getImg(query, page) {
//   fetchPhotos(query, page).then(json => {
//     if (json.data.totalHits === 0) {
//       btn.classList.add('load-more');
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }
//     const arr = json.data.hits;
//     // console.log(arr);
//     renderPhotos(arr);
//     currentPage += 1;
//     if (json.data.totalHits > 40) {
//       btn.classList.remove('load-more');
//     }
//     if (json.data.totalHits / 40 <= currentPage - 1) {
//       btn.classList.add('load-more');
//       Notiflix.Notify.failure(
//         "We're sorry, but you've reached the end of search results."
//       );

//     }
//   });
// }

// function renderPhotos(arr) {
//   const cards = arr
//     .map(
//       el => `<div class="photo-card">
//       <a href="${el.largeImageURL}"><img src="${el.webformatURL}" alt="${el.largeImageURL}" title="${el.tags}" loading="lazy" width="320" height="200"/></a>

//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b> ${el.likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b> ${el.views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b> ${el.comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b> ${el.downloads}
//     </p>
//   </div>
// </div>`
//     )
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', cards);
// }

// // const { height: cardHeight } = document
// //   .querySelector(".gallery")
// //   .firstElementChild.getBoundingClientRect();

// // window.scrollBy({
// //   top: cardHeight * 2,
// //   behavior: "smooth",
// // });
