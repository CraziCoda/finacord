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
    createPreview();
};

function createPreview() {
    var row = document.getElementById("preview_form");
    let objectStore = db.transaction("preview").objectStore("preview");


    objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            var newRow = row.insertRow(1);
            //inserting cells per each input
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);

            cell1.innerHTML = cursor.value.quantity;
            cell2.innerHTML = cursor.value.unit;
            cell3.innerHTML = cursor.value.product;
            cell4.innerHTML = cursor.value.payment;
            cell5.innerHTML = cursor.value.total;

            cursor.continue();
        }
    };

}
