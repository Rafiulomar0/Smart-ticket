const seatList = ['A1', 'A2', 'A3', 'A4',
    'B1', 'B2', 'B3', 'B4',
    'C1', 'C2', 'C3', 'C4',
    'D1', 'D2', 'D3', 'D4',
    'E1', 'E2', 'E3', 'E4',
    'F1', 'F2', 'F3', 'F4',
    'G1', 'G2', 'G3', 'G4',
    'H1', 'H2', 'H3', 'H4',
    'I1', 'I2', 'I3', 'I4',
    'J1', 'J2', 'J3', 'J4'];

const seatSelected = [];
let totalSeat = 40;
let setValidCopun = false;

document.getElementById("totalSeat-number").innerText = totalSeat;

function updateSeatNumber(totalSeat) {
    document.getElementById("totalSeat-number").innerText = totalSeat;
}

function getClicked(seatId) {
    document.getElementById(seatId).addEventListener("click", function () {
        if (seatSelected.length < 4 && !seatSelected.includes(seatId)) {
            seatSelected.push(seatId);
            console.log(seatSelected);
            for (let i = 0; i < seatSelected.length; i++) {
                if (!document.getElementById(seatId).classList.contains("bg-lime-400")) {
                    document.getElementById(seatId).classList.add("bg-lime-400");
                    updateSeatCountDom();
                    appendTicket(seatId);
                    calculateTotal();
                    totalSeat--;
                    updateSeatNumber(totalSeat);
                    couponUnlockerField();
                }
            }
        }
        else {
            for (let i = 0; i < seatSelected.length; i++) {
                if (document.getElementById(seatId).classList.contains("bg-lime-400")) {
                    document.getElementById(seatId).classList.remove("bg-lime-400");
                    const index = seatSelected.indexOf(seatId);
                    seatSelected.splice(index, 1);
                    removeTicket(seatId);
                    calculateTotal();
                    totalSeat++;
                    updateSeatNumber(totalSeat);
                }
            }
            updateSeatCountDom();
            document.getElementById("grand-price").innerText = seatSelected.length * 550;
            setValidCopun = false;
            console.log(seatSelected);
        }
        couponUnlockerField();
    });
}


function appendTicket(seatId) {
    const list = document.getElementById("checkout");
    const div = document.createElement('div');
    const att = document.createAttribute("class");
    const attSeat = document.createAttribute("id");
    const spanSeat = document.createElement("span");
    const spanClass = document.createElement("span");
    const spanPrice = document.createElement("span");

    att.value = "flex justify-between";
    div.setAttributeNode(att);

    attSeat.value = seatId + "-seat";
    div.setAttributeNode(attSeat);

    spanSeat.innerText = "" + seatId;
    spanClass.innerText = "Economoy";
    spanPrice.innerText = "550";

    div.appendChild(spanSeat);
    div.appendChild(spanClass);
    div.appendChild(spanPrice);
    list.appendChild(div);
    div.classList.add("flex");
    console.log(list);
}

function removeTicket(seatId) {
    document.getElementById(seatId + "-seat").remove();
}

function calculateTotal() {
    const total = 550 * seatSelected.length;
    document.getElementById("total-price").innerText = total;

    if (!setValidCopun) document.getElementById("grand-price").innerText = total;
}


document.getElementById("apply-coupon").addEventListener("click", function () {
    const code = document.getElementById("coupon-input").value;
    if (!checkValidCoupn(code)) {
        alert("Coupn code not valid");
    }
    else {
        if (!setValidCopun) {
            const totalPrice = seatSelected.length * 550;
            const discountPrice = (code === "NEW15") ? totalPrice - (totalPrice * 0.15) : totalPrice - (totalPrice * 0.20);
            document.getElementById("grand-price").innerText = discountPrice;
            setValidCopun = true;
        }
    }
});


function checkValidCoupn(couponCode) {
    return couponCode === "NEW15" || couponCode === "Couple 20";
}

for (let i = 0; i < seatList.length; i++) {
    getClicked(seatList[i]);
}


function couponUnlockerField() {
    if (seatSelected.length >= 4) {
        document.getElementById("apply-coupon").classList.remove("btn-disabled");
        document.getElementById("coupon-input").removeAttribute("disabled");
    }
    else {
        if (!document.getElementById("apply-coupon").classList.contains("btn-disabled")) {
            document.getElementById("apply-coupon").classList.add("btn-disabled");
            document.getElementById("coupon-input").disabled = true;
        }
    }
}

function updateSeatCountDom() {
    document.getElementById("seatCount").innerText = seatSelected.length;
}


setInterval(function () {
    checkValidInfo();
});

function checkValidInfo() {
    const phoneNumber = document.getElementById("phone-number").value;
    if (seatSelected.length >= 1 && phoneNumber.length >= 1) {
        document.getElementById("next-btn").classList.remove("btn-disabled");
    }
    else {
        if (!document.getElementById("next-btn").classList.contains("btn-disabled")) {
            document.getElementById("next-btn").classList.add("btn-disabled");
        }
    }
}

document.getElementById("next-btn").addEventListener("click", function () {
    document.getElementById("checkout-page").classList.remove("hidden");
    document.getElementById("main-page").classList.add("hidden");
});