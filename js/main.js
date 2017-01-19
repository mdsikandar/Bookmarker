//listener for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);
//Save Bookmark
function saveBookmark(e){
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	if (!validateForm(siteName,siteUrl)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl


	}
	// local Storage Test
	/*
		localStorage.setItem('test', 'hello World');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
		console.log(localStorage.getItem('test'));
		//prevent form from submitting
		
	*/
	//Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		//Init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		//Set to local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array
		bookmarks.push(bookmark);
		// Reset back to local Storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	// Clear form
	document.getElementById('myForm').reset();
	//Re-fetch bookmarks
		fetchBookmarks();
		//prevent form from submitting
		
	e.preventDefault(); 
}

	//Delete bookmark
	function deleteBookmark(url)
	{

		//Get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		for(var i = 0; i < bookmarks.length;i++){
			if(bookmarks[i].url == url){
				//remove from array
				bookmarks.splice(i,1);
			}
		}
		// Reset back to local Storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

		//Re-fetch bookmarks
		fetchBookmarks();
	}
	// Fetch bookmark
	function fetchBookmarks(){

		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Get output id
		var bookmarksResults = document.getElementById('bookmarksResults');
		//build our output
		bookmarksResults.innerHTML ="";
		for(var i= 0; i< bookmarks.length;i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			bookmarksResults.innerHTML += '<div class="well"> ' +
											'<h3>' + name +
											'<a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
											'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a> ' +
											'</h3>' +
											'</div>';

		}

	}

//validations

 function validateForm(siteName,siteUrl){
 	if(!siteName || !siteUrl){
		alert('Please fill in the form')
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use valid URL');
		return false;
	}

	return true;
 }