let shownLayers = 1;



function setMode() {
    let driveButton = document.getElementById("drive");
    let walkButton = document.getElementById("walk");

    if (walkButton.checked) {

    } else if (driveButton.checked) {
        
    }
}

// SIDE BUTTONS

function showLayers() {
    if (shownLayers == 1) {
        document.getElementById("add-text").innerHTML = "Add destination"
    } else {
        document.getElementById("add-text").innerHTML = "Add another destination"

        if (shownLayers >= 2) {
            document.getElementById("two-layer").style.display = "flex";
            
        }
    
        if (shownLayers >= 3){
            document.getElementById("three-layer").style.display = "flex";
        }
    
        if (shownLayers >= 4){
            document.getElementById("four-layer").style.display = "flex";
        }
    
        if (shownLayers >= 5){
            document.getElementById("five-layer").style.display = "flex";
            document.getElementById("add-layer").style.display = "none";
        }
    }

     
}

function add() {
    shownLayers ++;
    showLayers();
    // console.log(shownLayers)
}


function remove(layer, select) {
    document.getElementById(select).selectedIndex = 0;
    if (layer != "one-layer") {
        if (shownLayers > 1) {
            shownLayers --;
            document.getElementById(layer).style.display = "none";
        }
    
        if (shownLayers < 5) {
            document.getElementById("add-layer").style.display = "flex";
        }
    }
    showLayers()
    // console.log(shownLayers)
}

// SHOW MAP BUTTON

function showMap() {
    var printables = []

    let modes = document.getElementsByName('mode');
    let locations = document.getElementsByClassName("select");

    for (i = 0; i < modes.length; i++) {
        if (modes[i].checked) {
            printables.push(modes[i].value);
        }   
    }

    for (i=0; i < locations.length; i++) {
        y = locations[i].value
        if (y != "none") {
            printables.push(y);
        }
    }


    alert(printables.join(" - "))
    console.log(shownLayers)

}

// INSTRUCTIONS SA BABA

function showInstructions() {
    let box = document.getElementById("how-to")
    let instdiv = document.getElementById("instructions-container")

    if (box.checked) {
        instdiv.style.display = "block";
        document.getElementById("foot-lbl").style.textDecoration = "underline";
    
    } else {
        instdiv.style.display = "none";
        document.getElementById("foot-lbl").style.textDecoration = "none";
    }
}