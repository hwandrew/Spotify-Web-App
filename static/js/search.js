/*
  This file handles sending track search requests to the Spotify API and deals
  with the handling of results, including displaying the results on the screen
*/

function sendSearch() {
  var requestURL = baseURL + '/search';
  var query = escape(document.getElementById('searchInput').value);

  $.ajax({
    url: requestURL,
    asynch: false,
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
      tracks = result["tracks"]["items"];
      displayResults(tracks);
    },
    error: function(xhr, request, error) {
      console.log("failed search");
      console.log(xhr.status);
    },
    dataType: 'json'
  });
}

function displayResults(tracks) {
  var list = document.getElementById("resultsList");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // console.log(tracks);
  // audio sample source: tracks[i]["preview_url"];

  for (var i = 0; i < tracks.length; i++) {
    var item = document.createElement("li");
    item.setAttribute("id", i);
    item.addEventListener("click", selectSong);
    if (tracks[i]["preview_url"]) {
      item.setAttribute("class", "preview");
    }
    else {
      item.setAttribute("class", "noPreview");
    }
    var artists = "";
    for (var j = 0; j < tracks[i]["artists"].length; j++) {
      artists += tracks[i]["artists"][j]["name"];
      if (j != tracks[i]["artists"].length - 1) {
        artists += ", "
      }
    }
    item.appendChild(document.createTextNode(tracks[i]["name"] + " by " + artists));
    list.appendChild(item);
  }

  if (list.firstChild === null) {
    list.innerHTML = "No search results";
  }
}

function selectSong() {
  var trackIndex = $(this).attr("id");
  // console.log(trackIndex);
  var player = document.getElementById("audioPlayer");
  if (tracks[trackIndex]["preview_url"]) {
    player.setAttribute("src", tracks[trackIndex]["preview_url"]);
    player.play();
  }
  else {
    alert("preview unavailable");
  }
}


$(function() {
  $('#searchForm').submit(function(event) {
    event.preventDefault();
    sendSearch();
  });
});
