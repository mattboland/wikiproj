$(document).ready(function(){

// link to random wiki page
$("#random").click(function() {
  window.open("http://en.wikipedia.org/wiki/Special:Random")
});

//search wiki function
(function searchWiki() {

  // cache of dom elements and array of results
  var doc = $(document);
  var searchBar = $("#input");
  var searchBtn = $("#search");
  var list = $("#listOut");
  var searchParam = "";
  var results = [];

  //give functionality to enter key
  doc.keypress(function(e) {
    if (e.which == 13) {
      searchBtn.click();
    }
  });

  //add click functionality to search button
  searchBtn.click(function() {

    searchParam = document.getElementById("input").value.split(' ').join('_');
    var fullWik = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info&generator=search&exsentences=1&exlimit=10&exintro=1&inprop=url&gsrsearch=" + searchParam + "&gsrnamespace=0&gsrprop=snippet|titlesnippet&callback=?";

    //ajax request
    $.getJSON(fullWik, function(json) {
      list.empty();
      searchBar.val('');
      //creates list item for each result with link
      for (var pageid in json.query.pages) {
        list.append(("<a href='" + json.query.pages[pageid].canonicalurl + "'> Learn more about- </a>") + "   " + json.query.pages[pageid].title + ":" + json.query.pages[pageid].extract);
      }
    })
  });
})()
})