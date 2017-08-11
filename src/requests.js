export default class Requests{

    static  fetchGenres(context) {
        return function () {
            let url = "https://api.themoviedb.org/3/genre/movie/list?language=ru&api_key=";
            fetch(url+context.api_key).then((res) => res.json()).then((data) => {
                if ('status_message' in data) {
                    context.setState({
                        requestError: data.status_message
                    });
                    return;
                }
                let genresList = {};
                data.genres.map((genres, idx) => {
                    genresList[genres.id] = genres.name;
                    return data
                });
               // console.log('fetchGenres');
                context.setState({
                    genresList: genresList,
                    requestError: '',
                });
            }).catch((err)=>context.setState({
                requestError: 'Failed to load resource'
            }))
            }
        }

    static fetchConfiguration(context) {
        return function () {
            let url = "https://api.themoviedb.org/3/configuration?api_key=";
            fetch(url+context.api_key).then((res) => res.json()).then((data) => {
                if ('status_message' in data) {
                    context.setState({
                        requestError: data.status_message
                    });
                    return;
                }
               // console.log('fetchConfiguration');
                context.setState({
                    configuration: data.images,
                    requestError: '',
                })
            }).catch((err)=>context.setState({
                requestError: 'Failed to load resource'
            }))
        }
    }

    static fetchMovieList(context) {
        return function () {
            let url = "https://api.themoviedb.org/3/movie/"+
                context.state.list+"?region=RU&page="+context.state.page+"&language=ru&api_key=";
            fetch(url+context.api_key).then((res) =>res.json()).then((data) => {
                if ('status_message' in data) {
                    context.setState({
                        requestError: data.status_message
                    });
                    return;
                }
               // console.log('fetchMovieList');
                context.setState({
                        movieListArray: data.results,
                        totalPages: data.total_pages,
                        isPageLoaded: true,
                        searchFailed: false,
                        requestError: ''
                })
            }).catch((err)=>context.setState({
                requestError: 'Failed to load resource'
            }))
        }
    }


    static searchMovieRequest(context) {
        return function () {
                let url = "https://api.themoviedb.org/3/search/movie?api_key="
                    +context.api_key+"&language=ru&query="+context.state.queryText+"&page="+
                    context.state.page+"&include_adult=false&region=RU";
                fetch(url).then((res) => res.json()).then((data) => {
                   // console.log('searchMovieRequest');
                    if ('status_message' in data) {
                        context.setState({
                            requestError: data.status_message
                        });
                        return;
                    }
                    if (data.total_results === 0){
                        context.setState({
                            searchFailed: true,
                            movieListArray: [],
                            totalPages: 1,
                            isPageLoaded: true,
                            isSearching: true,
                            requestError: ''
                        })
                    } else {
                        context.setState({
                            searchFailed: false,
                            movieListArray: data.results,
                            totalPages: data.total_pages,
                            isPageLoaded: true,
                            isSearching: true,
                            requestError: ''
                        })
                    }
                }).catch((err)=>context.setState({
                    requestError: 'Failed to load resource'
                }));
        }
    }

    static fetchMovieDetails(context) {
        return function () {
            let api_key = process.env.REACT_APP_MOVIE_API_KEY;
            let movieId = this.state.movieId?this.state.movieId:localStorage.getItem('movieId');
            let url = "https://api.themoviedb.org/3/movie/"+movieId+"?language=ru&api_key="+api_key+
                "&append_to_response=recommendations";
            fetch(url).then((res) =>res.json()).then((data) => {
                if ('status_message' in data) {
                    context.setState({
                        requestError: data.status_message
                    });
                    return;
                }
                let id=null;
                if(data.belongs_to_collection){
                    id = data.belongs_to_collection.id
                }
               // console.log(' fetchMovieDetails');
                context.setState({
                    movieDetails: data,
                    isPageLoaded: true,
                    requestError: '',
                    belongsToCollection: id,
                    recommended: data.recommendations.results.slice(0,8)
                })
            }).catch((err)=>context.setState({
                requestError: 'Failed to load resource'
            }))
        }
    }


    static fetchCollection(context) {
        return function () {
            let url = "https://api.themoviedb.org/3/collection/"+
                context.state.belongsToCollection+"?region=RU&language=ru&api_key=";
            fetch(url+context.api_key).then((res) =>res.json()).then((data) => {
                if ('status_message' in data) {
                    context.setState({
                        requestError: data.status_message
                    });
                    return;
                }
               // console.log('fetchCollection');
                context.setState({
                    collection:  data.parts,
                    isPageLoaded: true,
                    requestError: '',
                    belongsToCollection: false
                })
            }).catch((err)=>context.setState({
                requestError: 'Failed to load resource'
            }))
        }
    }

}



