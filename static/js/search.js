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
  var list = document.getElementById("resultsList");

  if (list === null) {
    list = document.createElement("ul");
    list.setAttribute("id", "resultsList");
  }
  else {
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
  }

  var tracks = result["tracks"]["items"];
  for (var i = 0; i < tracks.length; i++) {
    var item = document.createElement("li");
    item.appendChild(document.createTextNode(tracks[i]["name"]));
    list.appendChild(item);
  }

  if (list.firstChild === null) {
    list.innerHTML = "No search results";
  }

  parentDiv.appendChild(list);
}

$(function() {
  $('#searchForm').submit(function(event) {
    event.preventDefault();
    sendSearch();
  });
});
