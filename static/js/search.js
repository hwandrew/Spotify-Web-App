function sendSearch() {
  var requestURL = baseURL + '/search';
  var query = escape(document.getElementById('searchInput').value);

  $.ajax({
    url: requestURL,
    asynch: true,
    type: 'GET',
    headers: {
      'Authorization': authHeader
    },
    data: {
      'q': query,
      'type': 'track'
    },
    success: function(result) {
      console.log("sucessful search");
      displayResults(result)
    },
    error: function(xhr, request, error) {
      console.log("failed search");
      console.log(xhr.status);
    }
  });
}

function displayResults(result) {
  var parentDiv = document.getElementById("searchResults");
  var newList = document.createElement("ul");

  var tracks = result["tracks"]["items"];
  for (var i = 0; i < tracks.length; i++) {
    var item = document.createElement("li");
    item.appendChild(document.createTextNode(tracks[i]["name"]));
    newList.appendChild(item);
  }

  parentDiv.appendChild(newList);
}

$(function() {
  $('#searchForm').submit(function(event) {
    event.preventDefault();
    sendSearch();
  });
});
