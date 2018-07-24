class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
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
    showAlert(message, className) {
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
    deleteBook(target) {
        if (target.className === 'delete') {
            //basic DOM traversing
            target.parentElement.parentElement.remove();

        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
// Local Storage Class 
class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;

    }
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book) {
            const ui = new UI;
            // Add book to UI 

            ui.addBookToList(book);

        })
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        // pass the index 
        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }
}

//DOM load event 
document.addEventListener('DOMContentLoaded', Store.displayBooks);




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

        // Add to Local Storage 
        Store.addBook(book)


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

    // Remove from LS 
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show message

    ui.showAlert('Book Removed', 'success');


    e.preventDefault();
})