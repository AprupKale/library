let myLibrary = [];

function Book(title, author, pages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;

    this.info = function() {
        return this.hasBeenRead
            ? `${this.title} by ${this.author}, ${this.pages} pages, has been read` 
            : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}