$(document).ready(function() {

  var container = $('#movieDetails');

  $('#searchTerm').on('keyup', function(event) {
    event.preventDefault();
    var search = $('#searchTerm').val();

    $.ajax({
      url: 'http://www.omdbapi.com/?s=' + search,
      method: 'get',
      dataType: 'jsonp',
      success: function(movies){
        var results = movies.Search;
        var list = $('#searchResults');
        list.empty();
        container.html('');
        for(var i = 0; i < results.length; i += 1) {
          var movie = results[i];
          var movieTitle = movie['Title'];
          var movieYear = movie['Year'];
          var movieID = movie['imdbID'];
          var result = $('<p class="movie" data-id="' + movieID + '"></p>');
          result.append(movieTitle + " (" + movieYear + ")");
          list.append(result);
        }
      }
    });
  });

  $('#searchResults').on('click', 'p.movie', function(event){
    event.preventDefault();
    var imdbID = $(this).attr('data-id');
    $.ajax({
      url: 'http://www.omdbapi.com/?i=' + imdbID,
      method: 'get',
      dataType: 'jsonp',
      success: function(detail) {
        // var container = $('#movieDetails');
        container.html('');
        var title = ('<h3 class="center">' + detail['Title'] + '</h3>');
        var image = $('<img src="' + detail['Poster'] + '">');
        var year = detail['Year'];
        var genre = detail['Genre'];
        var plot = detail['Plot'];
        var textDiv = $('<div id="textContainer"></div>');
        container.append(title + ' (' + year + ')');
        container.append(textDiv);
        textDiv.append('<p><span class="bold">Genre:</span> ' + genre + '</p>');
        textDiv.append('<p class="plot"><span class="bold">Plot:</span> ' + plot + '</p>');
        container.append(image);
      }
    });
  });
});
