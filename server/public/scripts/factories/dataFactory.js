myApp.factory('DataFactory', ['$http', function($http) {
  console.log('dataFactory running');

  // PRIVATE
  var favorites = undefined;

  function getFavoriteData() {
    var promise = $http.get('/favorite').then(function(response) {
      console.log('Async data returned: ', response.data);
      favorites = response.data;
    });

    return promise;
  }

  function saveFavorite(newFav) {
    var promise = $http.post('/favorite', newFav).then(function(response) {
      if(response.status == 201) {
        console.log('Hooray! Favorite Saved!');
        return getFavoriteData();
      } else {
        console.log('Boo!', response.data);
      }
    });

    return promise;
  }

  // PUBLIC
  var publicApi = {
    factorySaveFavorite: function(newFavorite) {
      return saveFavorite(newFavorite);
    },
    factoryRefreshFavoriteData: function() {
      return getFavoriteData();
    },
    factoryGetFavorites: function() {
      // return our array
      return favorites;
    }
  };

  return publicApi;

}]);
