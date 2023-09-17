function getbooks() {
  
  document.getElementById("loadingOverlay").style.display = "flex";

  document.getElementById("output").innerHTML = "";

  fetch("https://openlibrary.org/search.json?q=" + document.getElementById("input").value)
    .then(a => a.json())
    .then(response => {
      for (var i = 0; i < 10; i++) {
        var bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        var title = response.docs[i].title;
        var author = response.docs[i].author_name ? response.docs[i].author_name[0] : "Unknown";
        var isbn = response.docs[i].isbn ? response.docs[i].isbn[0] : "";
        var bookLink = "https://openlibrary.org/works/" + response.docs[i].cover_edition_key;

        bookDiv.innerHTML = "<a href='" + bookLink + "' target='_blank'>" +
          "<img src='https://covers.openlibrary.org/b/isbn/" + isbn + "-S.jpg' alt='" + title + "'>" +
          "</a>" +
          "<h2>" + title + "</h2>" +
          "<p>Author: " + author + "</p>";

        document.getElementById("output").appendChild(bookDiv);
      }
    })
    .catch(error => {
      
      console.error("Error fetching data:", error);
    })
    .finally(() => {
      
      document.getElementById("loadingOverlay").style.display = "none";
    });
}

const typedTextElements = document.querySelectorAll('.page-heading');
typedTextElements.forEach(element => {
  const text = element.getAttribute('data-text');
  typeText(element, text);
});

function typeText(target, text) {
  const finalColor = "#585858";

  async function animateText() {
    for (let i = 0; i < text.length; i++) {
      target.innerHTML = text.slice(0, i + 1); // Update text with one more letter
      target.style.color = finalColor; // Set the color directly to grey (#808080)
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  animateText();
}
