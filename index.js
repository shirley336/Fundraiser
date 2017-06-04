$(document).ready(function(){
  console.log('javascript in the browser yay');
  getAllPosts();
  function getAllPosts() {
    //Retrieve the posts $=jQuery
    $.get('/posts/', function(postArray) {
      console.log(postArray);

      var htmlString = "";
      for (var i=0; i < postArray.length; i++) {
        var currentPost = postArray[i];
        var currentTitle = currentPost.doc.title;
        var currentContent=currentPost.doc.post;

        //Create html string for this post
        var postHtml = "<div>" +
          "<h3>" + currentTitle + "</h3>" +
          "<p>" + currentContent + "</p>"
        "</div>";

        //Append to string we are building
        htmlString= htmlString+postHtml;

      }
      console.log(htmlString);
      //Change the page
      $("#postsWrapper").html(htmlString);
    });
  }

  $("#post-submit").click(function(e){
    e.preventDefault();
    var titleText = $("#title").val();
    var postText = $("#post").val();

    $.post('/posts/', {
      title: titleText,
      post: postText,
    }, function() {
      getAllPosts();
    });

  });
});
