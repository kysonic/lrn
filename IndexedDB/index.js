(async () => {
    if ('indexedDB' in window) {
        let openRequest = indexedDB.open('mydb3', 2);
        openRequest.onupgradeneeded = () => {
            let db = openRequest.result;
            var upgradeTransaction = openRequest.transaction;
            switch (db.version) { // existing (old) db version
                case 0:
                    // version 0 means that the client had no database
                    // perform initialization
                    break;
                case 1:
                    // Creating a store it's like a table or collection
                    // Could be modified only while onupgradedneeded phase
                    db.createObjectStore('books', {keyPath: 'id', autoIncrement: true});
                    // client had version 1
                    // update
                    break;
                case 2:
                    const books = upgradeTransaction.objectStore('books');
                    books.createIndex('price_idx', 'price', {unique: false});
                    break;
                default:
                    // Version not found
                    break;
            }
        };
        openRequest.onerror = () => {
            // Handle database connection error
        };

        openRequest.onsuccess = () => {
            // DB was opened successfully
            const db = openRequest.result;
            // All operations with store could be performed only via TRANSACTIONS!!!!
            let transaction = db.transaction("books", "readwrite");
            // Get store instance right from transaction
            let books = transaction.objectStore("books");

            let book = {
                id: 3,
                title: 'Super',
                price: 10,
                created: new Date()
            };

            let request = books.put(book);

            request.onsuccess = function() {
                console.log("Book added to the store", request.result);
            };

            request.onerror = function() {
                console.log("Error", request.error);
            };

            let getRequest = books.get(3);
            getRequest.onsuccess = () => {
                console.log(getRequest.result);
            };
            // Search by price index
            let priceIndex = books.index("price_idx");
            let requestByPrice = priceIndex.getAll(10);
            requestByPrice.onsuccess = function() {
                if (request.result !== undefined) {
                    console.log("Books", requestByPrice.result); // array of books with price=10
                } else {
                    console.log("No such books");
                }
            };
            // Cursor
            let cursorRequest = books.openCursor();
            cursorRequest.onsuccess = () => {
                const cursor = cursorRequest.result;
                if (cursor) {
                    let key = cursor.key; // book key (id field)
                    let value = cursor.value; // book object
                    console.log(key, value);
                    cursor.continue(); // Will run onsuccess again could be run with query
                } else {
                    console.log('No more books');
                }
            }
        };

        function deleteDB(name) {
            let deleteRequest = indexedDB.deleteDatabase(name);
            deleteRequest.onerror = () => {
                // Error has been occurred
            };
            deleteRequest.onsuccess = () => {
                // Db has been deleted
            }
        }

        function deleteObjectStore(db, name) {
            db.deleteObjectStore(name);
        }
    }
})();
