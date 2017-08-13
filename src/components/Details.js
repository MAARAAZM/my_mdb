import React, { Component } from 'react';
import './Details.css';
import './Main.css';
import Requests from './../requests';
import MovieList from './MovieList'

class ScrollToTopOnMount extends Component {
    componentDidMount(prevProps) {
        window.scrollTo(0, 0)
    }

    render() {
        return null
    }
}


class Details extends Component {

    constructor(props){
        super(props);

        this.api_key = process.env.REACT_APP_MOVIE_API_KEY;

        this._fetchGenres = Requests.fetchGenres(this);
        this._fetchConfigration = Requests.fetchConfiguration(this);
        this._fetchMovieDetails = Requests.fetchMovieDetails(this);
        this._fetchCollection = Requests.fetchCollection(this);

        this.state = {
            movieId: null,
            movieDetails: {},
            isPageLoaded: false,
            belongsToCollection: null,
            requestError: '',
            genresList: {},
            configuration: null,
            collection: null,
            recommended: null,
            imgLoading: false,
        }

    }

    updateMovie(e){
        if (e.target.dataset.movieId!==this.state.movieDetails.id){
            this.setState({
               isPageLoaded: false,
            });
            this._fetchMovieDetails();
        }
    }

    onImgLoad(){
        this.setState({
            imgLoading: true,
        })
    }

    renderGenres(genres){
        let genresString = [];
        for(let i=0; i < genres.length; i++ ){
            genresString += genres[i].name;
            if(i!==genres.length-1) {genresString +=', '}
        }
        return <span>{genresString}</span>
    }


    componentDidMount(){
        this._fetchGenres();
        this._fetchConfigration();
    }


    componentDidUpdate(){
        if (!this.state.isPageLoaded&&this.state.configuration&&this.state.genresList&&!this.state.requestError){
            this._fetchMovieDetails();
        } else if (this.state.belongsToCollection&&this.state.isPageLoaded) this._fetchCollection();
    }

    _renderCollection(){
       // console.log(this.state.movieDetails);
        if (this.state.collection){
            return(<div className="Movie__Collection" style={{backgroundImage: 'url('+
            this.state.configuration.secure_base_url + 'w780' +
            this.state.movieDetails.belongs_to_collection.backdrop_path+ ')'}}>
                <div className="Movie__CollectionCover">
                <p className="Movie__MovieTitle">{'Часть серии "'+this.state.movieDetails.belongs_to_collection.name+'"'}</p>
            <MovieList
                    movieListArray={this.state.collection}
                    genresList={this.state.genresList}
                    configuration={this.state.configuration}
                    classMod='_Detailed'/>
                </div>
            </div>)
        }
    }

    _renderRecommended(){
        if (this.state.recommended){
            if (this.state.recommended.length){
                return(<div>
                    <p className="Movie__MovieTitle">Вам также понравится</p>
                    <MovieList
                        movieListArray={this.state.recommended}
                        genresList={this.state.genresList}
                        configuration={this.state.configuration}
                        classMod='_Detailed'/>
                </div>)
            }
            }
    }



    _renderDetails(){
        if (this.state.requestError) return <div className="App__Error">{this.state.requestError}</div>;
        if (this.state.isPageLoaded&&this.state.configuration){
            let configuration = this.state.configuration;
            let movie = this.state.movieDetails;
            let backdropPath = 'url('+ configuration.secure_base_url + 'original' + movie.backdrop_path + ')';
            let posterPath = configuration.secure_base_url+configuration.poster_sizes[3]+movie.poster_path;

            if (!this.state.imgLoading){
                return <div className="Details__LoadIndicator">
                        <img className="App-logo" src="./../Logo.svg" alt="Logo"/>Loading...
                        <img onLoad={this.onImgLoad.bind(this)} src = {configuration.secure_base_url +
                        'original' + movie.backdrop_path} style={{visibility: 'hidden', position: 'absolute'}} alt = 'background'/>
                    </div>
            } else return <div className="Movie" style={{backgroundImage: backdropPath}}>
                <div className="Movie__Wrapper">
                    <h3 className="Movie__MovieTitle">{movie.title}</h3>
                    <h4 className="Movie__Tagline">{'"'+movie.tagline+'"'}</h4>
                <img src = {(()=>{if(movie.poster_path){ //если нет лого
                    return posterPath
                }else return "no-image.png"
                })()}
                     alt = "Poster" className="Movie__Poster"/>
                <div className="Movie__Describe">
                    <p className="Movie__ReleaseDate">{'\u{1f4c5} '+movie.release_date.slice(0,4)}</p>
                    <span className="Movie__Rate">{movie.vote_average+'★'}</span>
                    <p className="Movie__Genre">{this.renderGenres(movie.genres)}</p>
                    <p className="Movie__Overview">{movie.overview}</p>
                    <p className="Movie__Countries">{'Countries: '}{this.renderGenres(movie.production_countries)}</p>
                    <p className="Movie__Companies">{'Companies: '}{this.renderGenres(movie.production_companies)}</p>
                    <p className="Movie__Budget">{'Бюджет: $' + Math.round(movie.budget/1000000)+' млн'}</p>
                    <p className="Movie__Revenue">{'Сборы: $'+Math.round(movie.revenue/1000000)+' млн'}</p>
                </div>
                    <div className="Movie__CollectionWrapper" onClick={this.updateMovie.bind(this)}>{this._renderCollection()}</div>
                    <div onClick={this.updateMovie.bind(this)}>{this._renderRecommended()}</div>
                </div>
            </div>
        }
        return <div className="Details__LoadIndicator">
            <img className="App-logo" src="./../Logo.svg" alt="Logo"/>Loading...
        </div>;
    }


    render() {

        return<div>
            <ScrollToTopOnMount/>
            {this._renderDetails()}
            </div>

    }
}

export default Details;
