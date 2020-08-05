//jshint esversion: 6
const indexedDB = window.indexedDB || webkitIndedexedDB || mozIndedexedDB || msIndexedDB;
const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;

const IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange;
let db;
let request = indexedDB.open("finacord_Database", 2);

request.onerror = (event) => {
    console.log("Error: " + event);
};


request.onupgradeneeded = (event) => {
    console.log('Hello');
    db = event.target.result;
};
request.onsuccess = (event) => {
    db = request.result;
    console.log("Success: " + db);
    view();
};
let view = () => {
    console.log("Hmm" + db);
    let objectStore = db.transaction("preview").objectStore("preview");
    let sale_report = document.getElementById("sale_report");

    objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            console.log(cursor);
            //Codde for DOM manipulation goes here it shouldn't be under the cursor.continue
            //no need for loops this function is going to iterate over elements
            //To get a value use cursor.value.nameoftheobject
            cursor.continue();
        }

    };

};
