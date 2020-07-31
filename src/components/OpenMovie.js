import React, { useState, useEffect } from 'react'
import genre_id_L, { genre_name_L } from './data'
import { Link } from 'react-router-dom'

function OpenMovie({ match }) {
    const [idMovie, setMovieId] = useState(match.params.id)
    const [movie, setMovie] = useState({})
    const [genreS, setGenres] = useState('')
    const [similar, setSimilar] = useState([])

    const fetchData = async () => {
        
        var apiLink = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=85b891d38491973c0dff31bd631036b3`)
        var data = await apiLink.json()
        var genreName = ' '
        data.genres.map((genre) => {
            genreName += ', ' + genre.name
        })
        var apiSimilar = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=85b891d38491973c0dff31bd631036b3`)
        var apiSimilarData = await apiSimilar.json()
        setMovie(data)
        setGenres(genreName)
        setSimilar(apiSimilarData.results)
        
    }
    useEffect(() => {
        fetchData()
        window.scrollTo(0, 0);
    }, [idMovie])
    return (
        <div className='OpenMovie'>
            <div className='outer'>
                <div className='main'>
                    <div className='image'>
                        <img className='responsive-img' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}></img>
                    </div>
                    <div className='title'>{movie.title}</div>
                    <div className='detail'>
                        <div className='genres tagline'>"{movie.tagline}"</div>
                        <div className="prefixTitle">Rating : <div className='vote_average'>{movie.vote_average} / 10</div></div>
                        <div className='prefixTitle'>Vote Count : <div className='vote_count'>{movie.vote_count}</div></div>
                        <div className='prefixTitle'>Genres:<div className='genres'>{genreS.substring(3,)}</div></div>
                        <div className='prefixTitle'>Release Date : <div className='release_date '>{(movie.release_date)}</div></div>
                        <div className='prefixTitle'>Run Time : <div className='runtime'>{movie.runtime} mins</div></div>
                        <div className='prefixTitle'>Status : <div className='status'>{movie.status} </div></div>
                        <div className='prefixTitle'>Original language : <div className='original_language'>{movie.original_language} </div></div>
                    </div>
                    <div className='overview'>
                        <div style={{ fontSize: '40px' }}>Synopsis</div>
                        <div className='detail'>{movie.overview}</div>
                    </div>
                </div>
            </div>
            <div className='row similar'>
                <div className="col s12 title">
                    Similar Movies
                </div>
                <div className='col s12 movie '>
                    <div className='outer' >

                        {similar.map((movie, index) => {
                            var genrelist = ''
                            movie.genre_ids.map((l) => {
                                genrelist += ", " + genre_name_L[genre_id_L.indexOf(l)]
                            })
                            return <div key={movie.id} className='' onClick={() => setMovieId(movie.id)}>
                                <Link to={'/movie/' + movie.id}>
                                    <div className='movie-item'>
                                        <img className='responsive-img' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={'No Image' + movie.title}></img>
                                        <div className='movieShadow'>
                                            <div className='title'>{movie.title}</div>
                                            <div className='vote_average'>{movie.vote_average + ' / 10'}</div>
                                            <div className='release_date '>{movie.release_date.substr(0, 4)}</div>
                                            <div className='genre '>{genrelist.substr(1,)}</div>
                                            <div className='overview '>{movie.overview}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpenMovie
