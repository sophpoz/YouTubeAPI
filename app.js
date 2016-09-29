$(function(){
	$('#search').submit(function(event){
		event.preventDefault();
		var searchTerm = $('#query').val();
		getRequest(searchTerm);
	});
});
function getRequest(searchTerm, pageToken){
	var params = {
		part: 'snippet',
		r: 'json',
		key: 'AIzaSyBmW7ZkBI0B1urmprC4ZGXZ4sfoDEdmlP8',
		q: searchTerm,
		maxResults: 10,
	};
	if (pageToken){
		params.pageToken = pageToken;
	}
	url = 'https://www.googleapis.com/youtube/v3/search'
	$.getJSON(url, params, function(data){
		showResults(data);
	});
}
function showResults(results) {
	var html = "";
	console.log(results);
	$.each(results.items, function(index,value){
		html += '<p><a href="https://www.youtube.com/watch?v='+ value.id.videoId +'">';
		html += '<img src=" '+ value.snippet.thumbnails.medium.url + '"/></a></p>';
	});
	$('#search-results').html(html);
	//next page 
	nextPageToken = results.nextPageToken;
	$('#next').click(function(){
	console.log(results.nextPageToken);
		function nextPage() {
		showResults(results, nextPageToken);
	}
	})
}


