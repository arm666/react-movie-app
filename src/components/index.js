import React, { useEffect, useState } from 'react'
import './index.css'
import './responsive.css'
import './data'
import genre_id_L, { genre_name_L } from './data'
import { Link } from 'react-router-dom'

function Build() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('movie/now_playing')
    const [movieIndex, setMovieIndex] = useState(0)
    useEffect(() => {
        getMovie(search)
    }, [search])

    const getMovie = async (search) => {
        const link = `https://api.themoviedb.org/3/${search}?api_key=85b891d38491973c0dff31bd631036b3`
        var datas = await fetch(link)
        var data = await datas.json()
        setMovies(data.results)
    }
    const menus_list = [{ name: 'New Release', search: 'movie/now_playing' }, { name: 'Trending Movie', search: 'trending/movie/day' }, { name: 'Trending TV', search: 'trending/tv/day' }, { name: 'Coming Soon', search: 'movie/upcoming' }, { name: 'Top Rated', search: 'movie/top_rated' }, { name: 'Popular', search: 'movie/popular' },]
    const querySearch = (searchQ, searchN, index) => {
        if (search !== searchQ) {
            setSearch(searchQ)
      
            setMovies([])
            setMovieIndex(index)
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col s3 m3'>
                    <div className='menu'>
                        {menus_list.map((menu, index) =>
                            <div
                                key={index}
                                style={{ background: movieIndex === index ? 'red' : '', color: movieIndex === index ? 'white' : '', }}
                                className={`menu-item menu-item-hover`}
                                onClick={() => querySearch(menu.search, menu.name, index)}>
                                {menu.name}
                            </div>)}
                    </div>
                </div>
                <div className='col s9 m9 movie'>
                    <div className='outer' >

                        {movies.map((movie, index) => {
                            var genrelist = ''
                            movie.genre_ids.map((l) => {
                                genrelist += ", " + genre_name_L[genre_id_L.indexOf(l)]
                            })
                            return <div key={movie.id} className=''>
                                <Link to={'/movie/' + movie.id}>
                                    <div className='movie-item'>
                                        <img className='responsive-img' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={'No Image'+movie.title}></img>
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

export default Build
