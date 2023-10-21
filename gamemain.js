let player = document.getElementById('player');
let ground = document.getElementById('ground');
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

var maxJump = 2;
var maxDropSpeed = 40;
var maxJumpHeight = 150;
var maxSpeed = 30;

var movement = {
    "left" : false,
    "right" : false
}

var canJump = 2;
var isDrop = false;

async function playerDrop() {
    isDrop = true;
    while(getGroundHeight() < -40 && isDrop) {
        console.log("[LOG] Player Height: " + getGroundHeight());
        player.style.top = player.getBoundingClientRect().top + maxDropSpeed + "px";
        await sleep(25);
    }
    player.style.top = ground.getBoundingClientRect().top - player.getBoundingClientRect().height + "px";
    isDrop = false;
}

async function playerJump() {
    if(!getGroundHeight()) {
        canJump = maxJump;
    }
    isDrop = false;
    canJump--;
    var height_now = getGroundHeight();
    while(getGroundHeight() > height_now - maxJumpHeight && canJump >= 0) {
        await sleep(5);
        player.style.top = player.getBoundingClientRect().top - 80 + "px";
    }
    playerDrop();
}

function getGroundHeight() {
    return player.getBoundingClientRect().bottom - (ground.getBoundingClientRect().bottom - ground.getBoundingClientRect().height);
}

playerDrop();

setInterval(move, 25);
window.onkeydown = async function (event) {
    console.log("[LOG] Pressed Key: " + event.keyCode);
    if(event.keyCode == 68 || event.keyCode == 39) {
        movement.right = true;
    }
    if(event.keyCode == 65 || event.keyCode == 37) {
        movement.left = true;
    }
    if(event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38) {
        playerJump();
    }
    console.log("Status: isDrop = " + isDrop + " canJump = " + canJump + " maxDropSpeed = " + maxDropSpeed + " maxJumpHeight = " + maxJumpHeight + " maxSpeed = " + maxSpeed);
}

window.onkeyup = async function (event) {
    console.log("[LOG] Unpressed Key: " + event.keyCode);
    if(event.keyCode == 68 || event.keyCode == 39) {
        movement.right = false;
    }
    if(event.keyCode == 65 || event.keyCode == 37) {
        movement.left = false;
    }
    console.log("Status: isDrop = " + isDrop + " canJump = " + canJump + " maxDropSpeed = " + maxDropSpeed + " maxJumpHeight = " + maxJumpHeight + " maxSpeed = " + maxSpeed);
}

function move() {
    if(movement.right) {
        player.style.left = player.getBoundingClientRect().left + maxSpeed + "px";
    }
    if(movement.left) {
        player.style.left = player.getBoundingClientRect().left - maxSpeed + "px";
    }
}

document.getElementById('setmaxjump').addEventListener('click', () => {
    if(document.getElementById('mjump_ipt').value){
        maxJump = Number(document.getElementById('mjump_ipt').value);
    }
})

document.getElementById('setmaxdrop').addEventListener('click', () => {
    if(document.getElementById('mdrop_ipt').value){
        maxDropSpeed = Number(document.getElementById('mdrop_ipt').value);
    }
})

document.getElementById('setmaxheight').addEventListener('click', () => {
    if(document.getElementById('mheight_ipt').value){
        maxJumpHeight = Number(document.getElementById('mheight_ipt').value);
    }
})

document.getElementById('setmaxspeed').addEventListener('click', () => {
    if(document.getElementById('mspeed_ipt').value){
        maxSpeed = Number(document.getElementById('mspeed_ipt').value);
    }
})