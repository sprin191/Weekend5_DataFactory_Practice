myApp.controller('PetController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
    $scope.dataFactory = DataFactory;
    $scope.animal = '';
    $scope.pet = {};
    $scope.hidden = true;
    $scope.favCount = 0;
    $scope.favorites = [];


    if($scope.dataFactory.factoryGetFavorites() === undefined) {
      $scope.dataFactory.factoryRefreshFavoriteData().then(function() {
        $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
        $scope.favorites = $scope.dataFactory.factoryGetFavorites();
      });
    } else {
      $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
      $scope.favorites = $scope.dataFactory.factoryGetFavorites();
    }


//Calls getRandomPet function when user selects a type of animal.
    $scope.changeAnimal = function() {
        console.log($scope.animal);

        if($scope.animal !== '') {
            $scope.getRandomPet();
        }
    };

//Retrieves a random pet from the API database based on the user's selected animal type.
    $scope.getRandomPet = function() {
        // API key
        var key = 'b900e0d5e332753a460a64eaa8de00fd';
        $scope.hidden = false;
        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=' + $scope.animal;
        query += '&output=basic';
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
            function(response) {
                $scope.pet = response.data.petfinder.pet;
                console.log($scope.pet);
            }
        );
    };

//Submits/saves the user's favorited animal.
    $scope.submitFavorite = function () {
        var favInfo = {
          petID: $scope.pet.id.$t,
          name: $scope.pet.name.$t,
          image: $scope.pet.media.photos.photo[2].$t,
          description: $scope.pet.description.$t.substring(0, 100),
          city: $scope.pet.contact.city.$t,
          state: $scope.pet.contact.state.$t
        };
      $scope.dataFactory.factorySaveFavorite(favInfo).then(function() {
      console.log('done saving');
      $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
    });

      };

}]);
