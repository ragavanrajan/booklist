//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}


//UI Constructor

function UI() {

}
//Add book to List 
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element 
    const row = document.createElement('tr');
    console.log(row);
    // insert cols 
    row.innerHTML = `
<td>${book.title} </td>
<td>${book.author} </td>
<td>${book.isbn} </td>
<td><a href="#" class= "delete">X</a> </td>
`;
    list.appendChild(row);

}


//Show Alerts 
UI.prototype.showAlert = function(message, className) {
    // create div 
    const div = document.createElement('div');
    // Add classes 
    div.className = `alert ${className}`;
    //Add  text
    div.appendChild(document.createTextNode(message));
    //Get parent 
    const container = document.querySelector('.container');
    //Get form 
    const form = document.querySelector('#book-form');
    //insert alert 
    container.insertBefore(div, form);

    // Timeout after 3 seconds 
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete Book 
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        //basic DOM traversing
        target.parentElement.parentElement.remove();

    }
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    console.log('test');
    //Get form values 
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // print the variable in console to see 
    console.log(title, author, isbn);
    //Instantiate  book
    const book = new Book(title, author, isbn)
        // Instantiate UI object 
    const ui = new UI();

    // Validate 
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in All fields', 'error');
    } else {

        // Show success 
        ui.showAlert('Book Added!', 'success')

        // Add book to list 
        ui.addBookToList(book);


        // clear fields
        ui.clearFields();
    }



    e.preventDefault();

});

// Event listener for delete

document.getElementById('book-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show message

    ui.showAlert('Book Removed', 'success');


    e.preventDefault();
})