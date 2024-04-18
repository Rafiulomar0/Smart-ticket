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
                }
            }
        }
        else {
            for (let i = 0; i < seatSelected.length; i++) {
                if (document.getElementById(seatId).classList.contains("bg-lime-400")) {
                    document.getElementById(seatId).classList.remove("bg-lime-400");
                    const index = seatSelected.indexOf(seatId);
                    seatSelected.splice(index, 1);
                }
            }
            updateSeatCountDom();
            console.log(seatSelected);
        }

    });
}


for (let i = 0; i < seatList.length; i++) {
    getClicked(seatList[i]);
}



function updateSeatCountDom() {
    document.getElementById("seatCount").innerText = seatSelected.length;
}