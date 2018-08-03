/*
  This file handles sending track search requests to the Spotify API and deals
  with the handling of results, including displaying the results on the screen
*/

function sendSearch() {
  var requestURL = baseURL + '/search';
  var query = document.getElementById('searchInput').value;
  query = query.replace(/ /g, '+');
  console.log(query);

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
      tracks = result["tracks"]["items"];
      displayResults(tracks);
    },
    error: function(xhr, request, error) {
      var list = document.getElementById("resultsList");
      list.innerHTML = "No search results";
      $('#toggle').show(500);
      if ($('#resultsList').is(':hidden')) {
        $('#resultsList').show(500);
        $('#toggle').css({'transform': 'rotate(0deg)'});
      }

      console.log("failed search");
      console.log(xhr.status);
    },
  });
}

function displayResults(tracks) {
  $('#resultsList').hide(500);
  $('#toggle').show(500);

  var list = document.getElementById("resultsList");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  console.log(tracks);
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

  $('#resultsList').show(500);
  $('#toggle').css({'transform': 'rotate(0deg)'});
}

function selectSong() {
  var trackIndex = $(this).attr("id");
  // console.log(trackIndex);
  var player = document.getElementById("audioPlayer");
  if (tracks[trackIndex]["preview_url"]) {
    player.setAttribute("src", tracks[trackIndex]["preview_url"]);
    player.play();
    var albumImage = tracks[trackIndex]["album"]["images"][1]["url"];
    $('#songInfo').empty();
    $('#songInfo').prepend($('<img>', {id:'albumImage', src:albumImage}));
  }
  else {
    alert("preview unavailable");
  }
}


$(function() {
  $('#resultsList').hide();
  $('#toggle').hide();

  $('#searchForm').submit(function(event) {
    event.preventDefault();
    sendSearch();
  });

  $('#toggle').click(function() {
    if ($('#resultsList').is(':visible')) {
      $('#resultsList').hide(500);
      $(this).css({'transform': 'rotate(180deg)'});
    }
    else {
      $('#resultsList').show(500);
      $(this).css({'transform': 'rotate(0deg)'});
    }
  });

  $('body').keyup(function(key) {
    var player = document.getElementById("audioPlayer");
    if(key.keyCode == 32) {
      player.paused ? player.play() : player.pause();
    }
  });
});
