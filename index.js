//jshint esversion: 6
const indexedDB = window.indexedDB || webkitIndedexedDB || mozIndedexedDB || msIndexedDB;
const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;

const IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange;
const btn = document.getElementById("done_btn");
if (!indexedDB) {
    alert("Unsupported Browser");
}

let db;
let request = indexedDB.open("finacord_Database", 2);
let total = 0;
let tax = 0.96;

request.onerror = (event) => {
    console.log("Error: " + event);
};

request.onsuccess = (event) => {
    db = request.result;
    console.log("Success: " + db);
};

request.onupgradeneeded = (event) => {
    //console.log('Hello');
    db = event.target.result;
    let objectStore = db.createObjectStore('preview', {
        keyPath: "id",
        autoIncrement: true
    });
};

let preview = () => {
    let objectStore = db.transaction("preview").objectStore("preview");
    /*     let totalVal = document.getElementById('val');
        let newVal = document.getElementById('netVal');
     */
    total = 0;
    objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            //preview code goes hwew
            cursor.continue();
        }

    };

};

let add = () => {
    let product = document.getElementById("iproduct");
    let qty = document.getElementById("iqty");
    let unit = document.getElementById("iunit");
    let payment = document.getElementById("ipayment").value;

    if (product.value != '' && qty.value != 0 && unit.value != 0) {

        total = qty.value * unit.value;
        let data = {
            product: product.value,
            quantity: qty.value,
            unit: unit.value,
            payment: payment,
            total: total
        };

        let request = db.transaction(['preview'], 'readwrite')
            .objectStore('preview').add(data);

        request.onsuccess = (event) => {
            console.log('Stored');
            product.value = "";
            qty.value = 0;
            unit.value = 0;
            //Other code goes here
        };
        request.onerror = (event) => {
            console.log('Couldn\'t Stored');
            //Other code goes here
        };
    }
    preview();
};


btn.addEventListener('click', add);
