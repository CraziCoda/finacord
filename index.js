//jshint esversion: 6
let previewData = [];
let add = () => {

    if (previewData != []) {

        for (let x in previewData) {
            let request = db.transaction(['preview'], 'readwrite')
                .objectStore('preview').add(previewData[x]);
        }

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
    previewData = [];


};


let preview = () => {
    var takePrice, takeQty, takeItem, takeIpayment, genTotal, taxRate, netSale;
    takeQty = document.getElementById('iqty').value;
    takePrice = document.getElementById('iunit').value;
    takeItem = document.getElementById('iproduct').value;
    takeIpayment = document.getElementById('ipayment').value;
    genTotal = parseInt(takeQty) * parseFloat(takePrice);
    taxRate = (genTotal * 3) / 100;
    var row = document.getElementById("preview_form");

    if (takeItem != '' && takeQty != 0 && takePrice != 0) {
        data = {
            quantity: takeQty,
            unit: takePrice,
            product: takeItem,
            payment: takeIpayment,
            total: genTotal

        };
        previewData.push(data);

        row.innerHTML = " <tr><th>Qty</th><th>Unit</th><th>Product</th><th>Payment</th><th>Total</th></tr>";
        console.log(previewData);
        for (const x in previewData) {
            var newRow = row.insertRow(1);
            //inserting cells per each input
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);

            cell1.innerHTML = previewData[x].quantity;
            cell2.innerHTML = previewData[x].unit;
            cell3.innerHTML = previewData[x].product;
            cell4.innerHTML = previewData[x].payment;
            cell5.innerHTML = previewData[x].total;

        }
        let product = document.getElementById("iproduct");
        let qty = document.getElementById("iqty");
        let unit = document.getElementById("iunit");

        product.value = "";
        qty.value = 0;
        unit.value = 0;

    }

};
