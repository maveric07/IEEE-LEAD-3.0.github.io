const API_URL =
" https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8aefdac16d963af47964ec20e1e480a0&page=1";
const IMAGE_PATH="https://image.tmdb.org/t/p/w1280/";
const SEARCH_URL =
' https://api.themoviedb.org/3/search/movie?api_key=8aefdac16d963af47964ec20e1e480a0&query="';
 const latest =
" https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=8aefdac16d963af47964ec20e1e480a0&page=1";
const drama=" https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=8aefdac16d963af47964ec20e1e480a0&page=1";

const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')
//GET picture

//GET movies

getMovies(API_URL)
async function getMovies(url){
    const res=await fetch(url)
    const data=await res.json()
    displayMovies(data.results)
    console.log(data.results);

}

function displayMovies(movies){
    main.innerHTML=''
    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview,release_date}=movie
        const moviesElement=document.createElement('div')
     moviesElement.classList.add('movie') ;
     moviesElement.innerHTML=`
     <img src="${IMAGE_PATH + poster_path}" alt="${title}"/>
      <div class="movie-info">
      <h3>${title}</h3>
      <span class"${getClassesByRating(vote_average)}"> ${vote_average}</span>
      <div class='overview'>
      <h3>overview</h3>
      ${overview}
      <h4>date</h4>
      ${release_date}
      </div>
      </div>
     `
     main.appendChild(moviesElement)
     
    })
}
function getClassesByRating(rating){
    if(rating>=8){
        return 'green'
    }
    else if (rating>=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchValue=search.value
    if(searchValue && searchValue !==''){
        getMovies(SEARCH_URL+searchValue)
        searchValue=''
    }
    else{
        window.location.reload()
    }
})
