import React, { Component } from 'react';
import './../style_reset.css'
import './Main.css';
import MovieList from './MovieList';
import { Throttle } from 'react-throttle';
import Button from './Button'
import Requests from './../requests'


class Main extends Component {

    constructor(props) {
        super(props);
        this.api_key = process.env.REACT_APP_MOVIE_API_KEY;

        this._fetchGenres = Requests.fetchGenres(this);

        this._fetchConfigration = Requests.fetchConfiguration(this);

        this._changePage = this._changePage.bind(this);

        this._changeList=this._changeList.bind(this);

        this._searchMoveeRequest = Requests.searchMovieRequest(this);
        this._fetchMovieList = Requests.fetchMovieList(this);


        this.state = {
            movieListArray: [],
            page: 1,
            totalPages: '...',
            genresList: null,
            configuration: null,
            isPageLoaded: false,
            isSearching: false,
            searchFailed: false,
            list: 'popular',
            queryText: '',
            requestError: ''
        };
    }


    _changePage(e){
        let val=0;
         if(e.target.dataset.evval==='inc'&&this.state.page < this.state.totalPages) val=1;
         if(e.target.dataset.evval==='dec'&&this.state.page>1) val=-1;
         this.setState ({
                page: this.state.page + val,
                isPageLoaded: !(val)
            }
         );
    }

    _changeList(e){
        if (this.state.list !== e.target.dataset.evval||this.state.isSearching||this.state.page!==1){
            this.setState ({
                    list: e.target.dataset.evval,
                    page: 1,
                    queryText: '',
                    isPageLoaded: false,
                    isSearching: false
                }
            );
        }
    }

    _searchMovie(e){
        if (e.target.value.length > 2) {this.setState({
            queryText: e.target.value,
            isPageLoaded: false,
            isSearching: true,
            page: 1,
        });
        }
        if (e.target.value.length===2&&this.state.isSearching){
            this.setState({
                isSearching: false,
                isPageLoaded: e.target.value.length<2||false
            });
        }
    }

    componentDidMount() {
        this._fetchGenres();
        this._fetchConfigration();
    }


    componentDidUpdate(){
        if (!this.state.isPageLoaded&&this.state.configuration&&this.state.genresList&&!this.state.requestError){

            if (this.state.isSearching){
                this._searchMoveeRequest();

        } else {
            this._fetchMovieList();
         }
      }
    }

    _renderMovieList(){
        if (this.state.requestError) return <div className="App__Error">{this.state.requestError}</div>;
        if (this.state.isPageLoaded){
            if(this.state.searchFailed){
                return <div className="App__NoResults">
                    {"Поиск по запросу '"+this.state.queryText+"' не дал результатов"}
                    </div>
            }
            return  (<div>
                <MovieList
                    movieListArray={this.state.movieListArray}
                    genresList={this.state.genresList}
                    configuration={this.state.configuration}
                    classMod='_Main'
                />
                <div>
                    <Button className="ChangePage__Button" evval='dec' buttonAction={this._changePage} value="<"/>
                    <span>{' Страница ' + this.state.page + ' из ' +  this.state.totalPages+' '}</span>
                    <Button className="ChangePage__Button" evval='inc' buttonAction={this._changePage} value=">"/>
                </div>
            </div>);
        }
        else return <div className="App__LoadIndicator">
                        <img className="App-logo" src="Logo.svg" alt="Logo"/>Loading...
                    </div>;
    }

    render() {
        return (
                <div className="App">
                    <div className="App-header">
                        <img className="App-logo" src="Logo.svg" alt="Logo"/>
                        <h2 className="App-Title">My Movie Database</h2>
                        <Button className="Header__Button"
                                evval="popular" buttonAction={this._changeList}
                                value="Популярные фильмы"/>
                        <Button className="Header__Button"
                                evval="top_rated" buttonAction={this._changeList}
                                value="Топ рейтинг"/>
                        <Button className="Header__Button"
                                evval="now_playing" buttonAction={this._changeList}
                                value="Сейчас в прокате"/>
                        <Button className="Header__Button"
                                evval="upcoming" buttonAction={this._changeList}
                                value="Скоро в прокате"/>
                        <Throttle time="500" handler="onChange">
                            <input className="Main__Search" type="text"
                                   placeholder="Search..."
                                   onChange={this._searchMovie.bind(this)}/>
                        </Throttle>
                    </div>
                    <div>
                        <Button className="ChangePage__Button" evval='dec' buttonAction={this._changePage} value="<"/>
                        <span>{' Страница ' + this.state.page + ' из ' +  this.state.totalPages+' '}</span>
                        <Button className="ChangePage__Button" evval='inc' buttonAction={this._changePage} value=">"/>
                    </div>
                    <div>{this._renderMovieList()}</div>
                </div>
        )
    }
}

export default Main;
