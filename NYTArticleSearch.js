var authKey = "AdF6buGGhP2sd8sAXgw2mMn4P3FmWVpZ	";

var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear	= 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

var articleCounter = 0;

function runQuery(numArticles, queryURL){
$.ajax({url: queryURL, method: "GET"})
.done(function(NYTData) {

console.log("------------------------------------")
console.log("URL: " + queryURL);
console.log("------------------------------------")
console.log(NYTData);
console.log("------------------------------------")

for (var i=0; i<numArticles; i++) {
articleCounter++;
var wellSection = $("<div>");
wellSection.addClass('well');
wellSection.attr('id', 'articleWell-' + articleCounter)
$('#wellSection').append(wellSection);
if(NYTData.response.docs[i].headline != "null")
{
$("#articleWell-"+ articleCounter).append('<h3><span class="label label-primary">' + articleCounter + '</span><strong> ' + NYTData.response.docs[i].headline.main + "</strong></h3>");
console.log(NYTData.response.docs[i].headline.main);
}
if( NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original"))
{
$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].byline.original + "</h5>");
console.log(NYTData.response.docs[i].byline.original);
}
$("#articleWell-"+ articleCounter).append('<h5>Section: ' + NYTData.response.docs[i].section_name + "</h5>");
$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].pub_date + "</h5>");
$("#articleWell-"+ articleCounter).append("<a href='" + NYTData.response.docs[i].web_url + "'>" + NYTData.response.docs[i].web_url + "</a>");
console.log(NYTData.response.docs[i].pub_date);
console.log(NYTData.response.docs[i].section_name);
console.log(NYTData.response.docs[i].web_url);
}
});
}
$('#runSearch').on('click', function(){
articleCounter = 0;
$("#wellSection").empty();

var searchTerm = $('#searchTerm').val().trim();
queryURL = queryURLBase + searchTerm;
numResults = $("#numSearchResults").val();
startYear = $('#startYear').val().trim();

endYear = $('#endYear').val().trim();


if (parseInt(startYear)) {
queryURL = queryURL + "&begin_date=" + startYear + "0101";
}


if (parseInt(endYear)) {
queryURL = queryURL + "&end_date=" + endYear + "0101";
}


runQuery(numResults, queryURL);


return false;
});


$('#clearAll').on('click', function(){
articleCounter = 0;
$("#wellSection").empty();
})
