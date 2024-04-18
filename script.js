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

function getClicked(seatId) {
    document.getElementById(seatId).addEventListener("click", function () {
        if (seatSelected.length < 3 && !seatSelected.includes(seatId)) {
            seatSelected.push(seatId);
            console.log(seatSelected);
            for (let i = 0; i < seatSelected.length; i++) {
                if (!document.getElementById(seatId).classList.contains("bg-lime-400")) {
                    document.getElementById(seatId).classList.add("bg-lime-400");
                    updateSeatCountDom();
                    appendTicket(seatId);
                    calculateTotal();
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
                }
            }
            updateSeatCountDom();
            console.log(seatSelected);
        }

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
}

for (let i = 0; i < seatList.length; i++) {
    getClicked(seatList[i]);
}


function updateSeatCountDom() {
    document.getElementById("seatCount").innerText = seatSelected.length;
}