// Sample data
let books = [
    {
        id: 1,
        title: 'Book 1',
        thumbnail: 'book1.jpg',
        notes: ['Note 1', 'Note 2']
    },
    {
        id: 2,
        title: 'Book 2',
        thumbnail: 'book2.jpg',
        notes: ['Note 1', 'Note 2']
    }
];

// Function to create a book folder
function createBookFolder(book) {
    let bookFolder = document.createElement('div');
    bookFolder.className = 'book-folder bg-gray-700 p-4 rounded';

    let thumbnail = document.createElement('img');
    thumbnail.src = book.thumbnail;
    thumbnail.className = 'w-32 h-32 object-cover rounded';

    let title = document.createElement('h2');
    title.textContent = book.title;
    title.className = 'text-2xl font-bold mt-2';

    let notes = document.createElement('ul');
    notes.className = 'list-disc list-inside mt-2';

    // Add edit and delete buttons to each note
    book.notes.forEach(note => {
        let noteItem = document.createElement('li');
        noteItem.textContent = note;

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'ml-2 text-blue-500';
        editButton.addEventListener('click', () => editNote(book.id, note));

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'ml-2 text-red-500';
        deleteButton.addEventListener('click', () => deleteNote(book.id, note));

        noteItem.appendChild(editButton);
        noteItem.appendChild(deleteButton);
        notes.appendChild(noteItem);
    });

    let addNoteButton = document.createElement('button');
    addNoteButton.textContent = 'Add Note';
    addNoteButton.className = 'mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded';
    addNoteButton.addEventListener('click', () => addNote(book.id));

    let deleteFolderButton = document.createElement('button');
    deleteFolderButton.textContent = 'Delete Folder';
    deleteFolderButton.className = 'mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded';
    deleteFolderButton.addEventListener('click', () => deleteFolder(book.id));

    bookFolder.appendChild(thumbnail);
    bookFolder.appendChild(title);
    bookFolder.appendChild(notes);
    bookFolder.appendChild(addNoteButton);
    bookFolder.appendChild(deleteFolderButton);

    return bookFolder;
}

// Function to edit a note
function editNote(bookId, note) {
    let newNote = prompt('Edit note:', note);
    if (newNote) {
        // Update the note in the books array
        let book = books.find(book => book.id === bookId);
        let noteIndex = book.notes.indexOf(note);
        book.notes[noteIndex] = newNote;

        // Update the DOM
        let bookFoldersContainer = document.getElementById('bookFolders');
        bookFoldersContainer.innerHTML = '';
        books.forEach(book => {
            let bookFolder = createBookFolder(book);
            bookFoldersContainer.appendChild(bookFolder);
        });
    }
}

// Function to delete a note
function deleteNote(bookId, note) {
    // Remove the note from the books array
    let book = books.find(book => book.id === bookId);
    let noteIndex = book.notes.indexOf(note);
    book.notes.splice(noteIndex, 1);

    // Update the DOM
    let bookFoldersContainer = document.getElementById('bookFolders');
    bookFoldersContainer.innerHTML = '';
    books.forEach(book => {
        let bookFolder = createBookFolder(book);
        bookFoldersContainer.appendChild(bookFolder);
    });
}

// Function to add a note
function addNote(bookId) {
    let newNote = prompt('Enter new note:');
    if (newNote) {
        // Add the new note to the book's notes in the books array
        let book = books.find(book => book.id === bookId);
        book.notes.push(newNote);

        // Update the DOM
        let bookFoldersContainer = document.getElementById('bookFolders');
        bookFoldersContainer.innerHTML = '';
        books.forEach(book => {
            let bookFolder = createBookFolder(book);
            bookFoldersContainer.appendChild(bookFolder);
        });
    }
}

// Function to delete a folder
function deleteFolder(bookId) {
    // Remove the folder from the books array
    let bookIndex = books.findIndex(book => book.id === bookId);
    books.splice(bookIndex, 1);

    // Update the DOM
    let bookFoldersContainer = document.getElementById('bookFolders');
    bookFoldersContainer.innerHTML = '';
    books.forEach(book => {
        let bookFolder = createBookFolder(book);
        bookFoldersContainer.appendChild(bookFolder);
    });
}

// Add event listener to the "Add new folder" button
document.getElementById('addFolderButton').addEventListener('click', () => {
    let title = prompt('Enter book title:');
    let thumbnail = prompt('Enter thumbnail URL:');
    if (title && thumbnail) {
        // Add new book to the books array
        let newBook = {
            id: Math.max(...books.map(book => book.id)) + 1, // Generate new ID
            title: title,
            thumbnail: thumbnail,
            notes: []
        };
        books.push(newBook);

        // Update the DOM
        let bookFoldersContainer = document.getElementById('bookFolders');
        let bookFolder = createBookFolder(newBook);
        bookFoldersContainer.appendChild(bookFolder);
    }
});

// Add book folders to the DOM
let bookFoldersContainer = document.getElementById('bookFolders');
books.forEach(book => {
    let bookFolder = createBookFolder(book);
    bookFoldersContainer.appendChild(bookFolder);
});
