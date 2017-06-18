let __user_id = undefined;

export default class Api {
  constructor() {
    this.__base_url = 'https://xt6la9orzh.execute-api.eu-west-1.amazonaws.com/production/dvd-releases/';
    this.__cache = {};
    this.__user_id = undefined;
  }

  setUserId(user_id) {
    __user_id = user_id;
  }

  getMovies(endpoint) {
    let cacheIt = Promise.resolve();
    if (!this.__cache[endpoint]) {
      cacheIt = this.__get(endpoint).then(function(movies) {
        this.__cache[endpoint] = movies;
      }.bind(this));
    }

    return cacheIt.then(function() {
      return this.__cache[endpoint];
    }.bind(this));
  }

  getSubscriptions() {
    if (!__user_id) return Promise.resolve([]);
    return this.__get(__user_id + '/sub').then(function(response) {
      return response.subscriptions;
    });
  }

  subscribeToMovie(movie_id) {
    if (!__user_id) return;
    return this.__post(__user_id + '/sub/' + movie_id);
  }

  unsubscribeFromMovie(movie_id) {
    if (!__user_id) return;
    return this.__delete(__user_id + '/sub/' + movie_id);
  }

  __get(url) {
    return this.__doFetch(this.__base_url + url, 'GET');
  }

  __post(url) {
    return this.__doFetch(this.__base_url + url, 'POST').then(function(result) {
      return result.result == 'success';
    });
  }

  __delete(url) {
    return this.__doFetch(this.__base_url + url, 'DELETE').then(function(result) {
      return result.result == 'success';
    });
  }

  __doFetch(url, method) {
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(function(response) {
      return response.json();
    }).catch(function(error) {
      console.error(error);
      return {'error': error};
    }); 
  }
}
