//urls and keys for the TMDB API
const key = '7dddd2b2bb6db82e9d23317e6066e3ce'
let pages = 1



//querySelectors for HTML
const movieGrid = document.querySelector("#movie-grid")

//getting data of the movies
const fetchData = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&page=${pages}`
    const res = await fetch(url)
    const data = await res.json()
    addMovie(data.results)
    pages++; 
    }

//fetchData()

//event listener for the load more button
const loadMoreButton = document.querySelector('#loadMore')
const form = document.querySelector("form"); 
loadMoreButton.addEventListener("click",fetchData)

//function for the search bar 
const displaySearchedMovie = async (movieName) => {
    movieGrid.innerHTML = ""
    const sUrl = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${key}&page=${pages}`

    const res = await fetch(sUrl)
    const data = await res.json()
    addMovie(data.results)
}

//event listener for the search bar
form.addEventListener('submit', (event) => {
        event.preventDefault()
        displaySearchedMovie(event.target.search.value)
})


//searchMovie()

//creating an individual container for the movies
const addMovie = (movieOBJ) => {
    movieOBJ.forEach(movie => {
        //creating elements
        const indvMovieContainer = document.createElement('div')
        indvMovieContainer.setAttribute('class', 'movie-container')
        const movieImage = document.createElement("img")
        const movieTitle = document.createElement("h2")
        const movieRating = document.createElement("h3")
       
        //setting classlists so they can be styled
        movieImage.classList.add('movie-poster')
        movieTitle.classList.add('movie-title')
        movieRating.classList.add('movie-votes')
       
       
        //variable img src for movie
        let movieImgSrc = ""
        if (movie.poster_path == null ) {
            movieImgSrc = "https://static.vecteezy.com/system/resources/previews/017/177/879/original/red-question-mark-on-transparent-background-free-png.png"
        } else {
            movieImgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
        
        movieImage.src = movieImgSrc
        movieImage.setAttribute('width', 500)
        movieImage.setAttribute("height", 750)
       
        //setting text for title and rating
        movieTitle.textContent = movie.title
        movieRating.textContent = "⭐ " + movie.vote_average
       
        //updating the movie card
        indvMovieContainer.appendChild(movieImage)
        indvMovieContainer.appendChild(movieTitle)
        indvMovieContainer.appendChild(movieRating)
       
        movieGrid.appendChild(indvMovieContainer)
        }
)}
//getting the button
const closeSearchbttn = document.querySelector('#close-search-btn')

//event listener for the button
closeSearchbttn.addEventListener('click',function () {
    movieGrid.innerHTML= ""
    pages = 1;
    fetchData()
})

//display data on window load
window.onload = () => {
    fetchData()
}

