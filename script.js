let myLibrary = [
    new Book('Animal Farm', 'George Orwell', 124, true),
    new Book('War and Peace', 'Leo Tolstoy', 994, false),
    new Book('Pride and Prejudice', 'Jane Austen', 112, true),
    new Book('1984', 'George Orwell', 276, false)
];

function Book(title, author, pages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;

    this.info = function () {
        return this.hasBeenRead
            ? `${this.title} by ${this.author}, ${this.pages} pages, has been read`
            : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function updateDisplay() {
    const main = document.querySelector('.main');
    main.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];

        const division = document.createElement('div');
        division.classList.add('book')
        division.id = `${book.title}`;

        const title = document.createElement('h2');
        title.textContent = `${book.title}`;

        const author = document.createElement('h3');
        author.textContent = book.author;

        const pages = document.createElement('h4');
        pages.textContent = `${book.pages} pages`;

        const readStatus = document.createElement('h4');
        readStatus.textContent = book.hasBeenRead
            ? 'Has been read'
            : 'Has not been read';

        const remove = document.createElement('button');
        remove.classList.add('remove');
        remove.textContent = 'Remove';

        const toggle = document.createElement('button');
        toggle.classList.add('toggle');
        toggle.textContent = book.hasBeenRead
            ? 'Unread'
            : 'Read';

        division.appendChild(title);
        division.appendChild(author);
        division.appendChild(pages);
        division.appendChild(readStatus);
        division.appendChild(toggle);
        division.appendChild(remove);

        main.appendChild(division);

        division
            .querySelector('.remove')
            .addEventListener('click', event => {
                main.removeChild(division);

                for (let i = 0; i < myLibrary.length; i++) {
                    if (myLibrary[i].title === `${division.id}`) {
                        myLibrary.splice(i, 1);
                    }
                }
            });

        division
            .querySelector('.toggle')
            .addEventListener('click', event => {
                for (let i = 0; i < myLibrary.length; i++) {
                    if (myLibrary[i].title === `${division.id}`) {
                        myLibrary[i].hasBeenRead = !myLibrary[i].hasBeenRead;
                    }
                }

                updateDisplay();
            });
    }
}

document
    .querySelector('.add-book')
    .addEventListener('click', () => {
        const main = document.querySelector('.main');
        const form = document.createElement('form');
        form.innerHTML = `
        <h2>Add new book</h2>
        <div class="title">
            <label for="title">Title</label>
            <input type="text" name="title" id="title">
        </div>
        <div class="author">
            <label for="author">Author</label>
            <input type="text" name="author" id="author">
        </div>
        <div class="pages">
            <label for="pages">Number of pages</label>
            <input type="number" name="pages" id="pages" min="0" step="1">
        </div>
        <div class="read">
            <label for="read">Has been read?</label>
            <input type="checkbox" name="read" id="read">
        </div>
        <button type="submit" class="add">Add</button>
        <button type="button" class="cancel">Cancel</button>
        `;

        main.appendChild(form);

        form
            .querySelector('.cancel')
            .addEventListener('click', () => main.removeChild(form));

        form
            .querySelector('.add')
            .addEventListener('click', () => {
                addBookToLibrary(new Book(
                    form.querySelector('.title > input').value,
                    form.querySelector('.author > input').value,
                    form.querySelector('.pages > input').value,
                    form.querySelector('.read > input').checked
                ))
                updateDisplay();
                main.removeChild(form);
            })
    })

updateDisplay();