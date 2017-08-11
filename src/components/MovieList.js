import React, { Component } from 'react';
import './MovieList.css';
import { Link } from 'react-router-dom'

class MovieList extends Component {


    renderGenres(ids, genresList){
        let genresString = [];
           for(let i=0; i < ids.length; i++ ){
                genresString += genresList[ids[i]];
                if(i!==ids.length-1) {genresString +=', '}
            }
            return <span>{genresString}</span>
    }


    render() {
        let mod = this.props.classMod;
        return (
            <div className={"MovieList"+mod}>
                {this.props.movieListArray.map((movie, idx)=><Link to={{
                    pathname: '/details/'+movie.id,
                    movieId: movie.id}}
                         onMouseDown={()=>localStorage.setItem('movieId', movie.id)}
                         data-movieId = {movie.id}
                         className={"MovieList__Movie"+mod} key={idx}>
                    <img src = {(()=>{if(movie.poster_path){ //если нет лого
                        return this.props.configuration.secure_base_url+this.props.configuration.poster_sizes[2]+movie.poster_path
                            }else return "no-image.png"
                        })()
                    }
                         alt = "Poster" className={"MovieList__Poster"+mod}/>
                    <div className={"MovieList__Describe"+mod}>
                        <h3 className={"MovieList__MovieTitle"+mod}>{movie.title}</h3>
                        <p className={"MovieList__ReleaseDate"+mod}>{(()=>{if(movie.release_date) return '\u{1f4c5} '+movie.release_date.slice(0,4)})()}</p>
                        <span className={"MovieList__Rate"+mod}>{movie.vote_average+'★'}</span>
                        <p className={"MovieList__Genre"+mod}>{this.renderGenres(movie.genre_ids, this.props.genresList)}</p>
                        <p className={"MovieList__Overview"+mod}>{(()=>{if (movie.overview){return movie.overview.slice(0,100)+'...'}})()}</p>
                    </div>
                    </Link>)}
            </div>
        );
    }
}

export default MovieList;
