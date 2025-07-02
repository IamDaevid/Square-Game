//Spielfeld größe: 1280x800
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const restartButton = document.createElement("button");
restartButton.textContent = "Neustarten";
restartButton.style.top = "10px";
restartButton.style.right = "10px";
restartButton.style.padding = "10px";
restartButton.style.fontSize = "16px";
const nils1 = new Image();
nils1.src = "pictures/shared image.jpg";
const john = new Image();
john.src = "pictures/John.png";
const harald = new Image();
harald.src = "pictures/Harald.png";
const blue = new Image();
blue.src = "pictures/blue.png";
const black = new Image();
black.src = "pictures/black.png";
let skinImage1 = 5;
let skinImage2 = 5;

//Spieler 1
const player1 = {
   x: 180 , y: 470,
   width: 50 * 0.75, height: 50 * 0.75,
   color: 'blue',
   speed: 4 * 0.75,
   hp: 4,
   angle: 0
};

//Spieler 2
const player2 = {
    x: 1000 , y: 100 * 0.75,
    width: 50 * 0.75, height: 50 * 0.75,
    color: 'black',
    speed: 4 * 0.75,
    hp: 4,
    angle: 0
};

// Pistole Spieler 2
const gun = {
    offsetX: 25 * 0.75,
    offsetY: 0,
    length: 30 * 0.75,
    width: 30 * 0.75,
    height: 10 * 0.75,
    color: 'gray',
    beam: false
};

// Pistole Spieler 1
const gun2 = {
    offsetX: 25 * 0.75,
    offsetY: 0,
    length: 30 * 0.75,
    width: 30 * 0.75,
    height: 10 * 0.75,
    color: 'gray',
    beam: false

};

let bullets = [];
let maxAmmo = 6;
let currentAmmo = maxAmmo;
let isReloading = false;
let reloadTime = 2000;

let bullets2 = [];
let maxAmmo2 = 6;
let currentAmmo2 = maxAmmo;
let isReloading2 = false;
let reloadTime2 = 2000;


let bigball2 = 5 * 0.75;
let bigball = 5 * 0.75;
let bigball2damage = 1;
let bigball2speed = 6 * 0.75;
let bigballdamage = 1;
let bigballspeed = 6 * 0.75;

function shootBullet() {
    if (isReloading || currentAmmo <= 0) return;

    const angleRad = player2.angle * Math.PI / 180;

    // Mittelpunkt des Spielers
    const centerX = (player2.x + player2.width / 2);
    const centerY = (player2.y + player2.height / 2);

    // Position des Anfangs der Pistole (vor Rotation)
    const offsetX = gun.offsetX;
    const offsetY = gun.offsetY;

    // Länge der Pistole
    const gunLength = gun.length;

    // Drehung auf das Offset anwenden (vom Spielerzentrum aus)
    const rotatedOffsetX = offsetX * Math.cos(angleRad) - offsetY * Math.sin(angleRad);
    const rotatedOffsetY = offsetX * Math.sin(angleRad) + offsetY * Math.cos(angleRad);

    // Position der Pistolenmündung = Offset + Länge in Richtung der Rotation
    const muzzleX = centerX + rotatedOffsetX + Math.cos(angleRad) * gunLength;
    const muzzleY = centerY + rotatedOffsetY + Math.sin(angleRad) * gunLength;

    bullets.push({
        x: muzzleX,
        y: muzzleY,
        radius: bigball,
        speed: bigballspeed,
        dx: Math.cos(angleRad) * 6 * 0.75,
        dy: Math.sin(angleRad) * 6 * 0.75,
        color: 'red'
    });
    
    currentAmmo--;

    if (currentAmmo === 0) {
        reload();
    }
}

function reload() {
    isReloading = true;
    setTimeout(() => {
        currentAmmo = maxAmmo;
        isReloading = false;
    }, reloadTime);
}

function shootBullet2() {
    if (isReloading2 || currentAmmo2 <= 0) return;

    const angleRad2 = player1.angle * Math.PI / 180;

    // Mittelpunkt des Spielers
    const centerX2 = player1.x + player1.width / 2 * 0.75;
    const centerY2 = player1.y + player1.height / 2 * 0.75;

    // Position des Anfangs der Pistole (vor Rotation)
    const offsetX2 = gun2.offsetX;
    const offsetY2 = gun2.offsetY;

    // Länge der Pistole
    const gunLength2 = gun2.length;

    // Drehung auf das Offset anwenden (vom Spielerzentrum aus)
    const rotatedOffsetX2 = offsetX2 * Math.cos(angleRad2) - offsetY2 * Math.sin(angleRad2);
    const rotatedOffsetY2 = offsetX2 * Math.sin(angleRad2) + offsetY2 * Math.cos(angleRad2);

    // Position der Pistolenmündung = Offset + Länge in Richtung der Rotation
    const muzzleX = centerX2 + rotatedOffsetX2 + Math.cos(angleRad2) * gunLength2;
    const muzzleY = centerY2 + rotatedOffsetY2 + Math.sin(angleRad2) * gunLength2;

    bullets2.push({
        x: muzzleX,
        y: muzzleY,
        radius: bigball2,
        speed: bigball2speed,
        dx: Math.cos(angleRad2) * 6,
        dy: Math.sin(angleRad2) * 6,
        color: 'red'
    });

    currentAmmo2--;

    if (currentAmmo2 === 0) {
        reload2();
    }
}

function reload2() {
    isReloading2 = true;
    setTimeout(() => {
        currentAmmo2 = maxAmmo2;
        isReloading2 = false;
    }, reloadTime2);
}

//movement Spieler 2
const wasd = {
    w: false, s: false,
    a: false, d: false,
    q: false, e: false,
    " ": false, 1: false,
    2: false, 3: false,
    4: false
};

document.addEventListener('keydown', e => wasd[e.key] = true)
document.addEventListener('keyup', e => wasd[e.key] = false)
document.addEventListener('keydown', e => {
    wasd[e.key] = true;
    if (e.key === ' ') {
        shootBullet();
    }
});

//movement Spieler 1 
const pfeiltasten = {
    ArrowUp: false, ArrowDown: false,
    ArrowLeft: false, ArrowRight: false,
    "-": false, ".": false,
    ",": false, l: false,
    ö: false, ä: false,
    "#": false
};

document.addEventListener('keydown', e => pfeiltasten[e.key] = true)
document.addEventListener('keyup', e => pfeiltasten[e.key] = false)
document.addEventListener('keydown', e => {
    pfeiltasten[e.key] = true;
    if (e.key === '-') {
        shootBullet2();
    }
});

// Hindernisse
const wand1 = {
    x: 0, y: 120,
    width: 300, height: 100,
    color: 'red'
};
const wand2 = {
    x: 0, y: 550,
    width: 400, height: 100,
    color: 'yellow'
};
const wand3 = {
    x: 1000, y: 450,
    width: 100, height: 200,
    color: 'green'
};
const wand4 = {
    x: 500, y: 400,
    width: 300, height: 80,
    color: 'orange'
};
const wand5 = {
    x: 800, y: 200,
    width: 400, height: 100,
    color: 'brown'
};

// Darstellung
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //wand1
    ctx.fillStyle = wand1.color;               
    ctx.fillRect(wand1.x, wand1.y, wand1.width, wand1.height);
    //wand2
    ctx.fillStyle = wand2.color;
    ctx.fillRect(wand2.x, wand2.y, wand2.width, wand2.height);
    //wand3
    ctx.fillStyle = wand3.color;
    ctx.fillRect(wand3.x, wand3.y, wand3.width, wand3.height);
    //wand4
    ctx.fillStyle = wand4.color;
    ctx.fillRect(wand4.x, wand4.y, wand4.width, wand4.height);
    //wand5
    ctx.fillStyle = wand5.color;
    ctx.fillRect(wand5.x, wand5.y, wand5.width, wand5.height);
    
    //Spieler 1
    ctx.save();
    ctx.translate(player1.x + player1.width / 2, player1.y + player1.height / 2);
    ctx.rotate(player1.angle * Math.PI / 180);
    switch(skinImage1){
        case 0:
            ctx.drawImage(nils1, -player1.width / 2, -player1.height / 2, player1.width, player1.height);
        break;

        case 1:
            ctx.drawImage(john, -player1.width / 2, -player1.height / 2, player1.width, player1.height);
        break;

        case 2:
            ctx.drawImage(harald, -player1.width / 2, -player1.height / 2, player1.width, player1.height);
        break;
        
        default:
            ctx.drawImage(blue, -player1.width / 2, -player1.height / 2, player1.width, player1.height);
        break;
    } 
    ctx.restore();

    //Spieler 2
    ctx.save();
    ctx.translate(player2.x + player2.width / 2, player2.y + player2.height / 2);
    ctx.rotate(player2.angle * Math.PI / 180);
    switch(skinImage2){
        case 0:
            ctx.drawImage(nils1, -player2.width / 2, -player2.height / 2, player2.width, player2.height);
        break;

        case 1:
            ctx.drawImage(john, -player2.width / 2, -player2.height / 2, player2.width, player2.height);
        break;

        case 2:
            ctx.drawImage(harald, -player2.width / 2, -player2.height / 2, player2.width, player2.height);
        break;

        default:
            ctx.drawImage(black, -player2.width / 2, -player2.height / 2, player2.width, player2.height);
        break;
    } 
    ctx.restore();
    
    //Pistole 1
    ctx.save();
    ctx.translate(player2.x + player2.width / 2, player2.y + player2.height / 2);
    ctx.rotate(player2.angle * Math.PI / 180);
    ctx.fillStyle = gun.color;
    ctx.fillRect(gun.offsetX - gun.width / 2, gun.offsetY - gun.height / 2, gun.width, gun.height);
    ctx.restore();

    for (const b of bullets) {
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
    }

    //Pistole 2
    ctx.save();
    ctx.translate(player1.x + player1.width / 2, player1.y + player1.height / 2);
    ctx.rotate(player1.angle * Math.PI / 180);
    ctx.fillStyle = gun2.color;
    ctx.fillRect(gun2.offsetX - gun2.width / 2, gun2.offsetY - gun2.height / 2, gun2.width, gun2.height);
    ctx.restore();

    for (const b of bullets2) {
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
    }

    //powerUp
    ctx.fillStyle = PowerUp1.color;
    ctx.beginPath();
    ctx.arc(PowerUp1.x, PowerUp1.y, PowerUp1.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = PowerUp2.color;
    ctx.beginPath();
    ctx.arc(PowerUp2.x, PowerUp2.y, PowerUp2.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = PowerUp3.color;
    ctx.beginPath();
    ctx.arc(PowerUp3.x, PowerUp3.y, PowerUp3.radius, 0, Math.PI * 2);
    ctx.fill(); 
    
    //Anzeige für HP und Magazinanzeige
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';

    if (isReloading) {
    ctx.fillText("P2: Nachladen...", canvas.width - 170, canvas.height - 20);
    } else {
    ctx.fillText(`P2: Munition: ${currentAmmo}/${maxAmmo}`, canvas.width - 170, canvas.height - 20);
    }
    ctx.fillText(`HP: ${player1.hp}`, 20, 40);
    
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    
    if (isReloading2) {
    ctx.fillText("P1: Nachladen...", 20, canvas.height - 20);
    } else {
    ctx.fillText(`P1: Munition: ${currentAmmo2}/${maxAmmo2}`, 20 , canvas.height - 20);
    }
    ctx.fillText(`HP: ${player2.hp}`, canvas.width - 70, 40);
}

//Kollision
function checkCollision(a, b){
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y 
    );
}
 

//PowerUps
const PowerUp1 = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 10,
    width: 20,
    height: 20,
    color: 'pink'
};

const PowerUp2 = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 10,
    width: 20,
    height: 20,
    color: 'lime'
};

const PowerUp3 = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 10,
    width: 20,
    height: 20,
    color: 'purple'
};

//Spiellogik
function update(){
    restartButton.style.display = "none";

    if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
    if (pfeiltasten.ArrowDown) player1.y += player1.speed;
    if (pfeiltasten.ArrowLeft) player1.x -= player1.speed;
    if (pfeiltasten.ArrowRight) player1.x += player1.speed;
    if (pfeiltasten["."]) player1.angle += 3;
    if (pfeiltasten[","]) player1.angle -= 3;
    if (pfeiltasten.l) skinImage1 = 0;
    if (pfeiltasten.ö) skinImage1 = 1;
    if (pfeiltasten.ä) skinImage1 = 2;
    if (pfeiltasten["#"]) skinImage1 = 3;

    player1.x = Math.max(0, Math.min(canvas.width - player1.width, player1.x));
    player1.y = Math.max(0, Math.min(canvas.height - player1.height, player1.y));

    for (let i = bullets2.length - 1; i >= 0; i--) {
    const b = bullets2[i];
    b.x += b.dx;
    b.y += b.dy;

    const bulletBox = { x: b.x - b.radius, y: b.y - b.radius, width: b.radius * 2, height: b.radius * 2 };

    // Bildschirmrand
    if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
        bullets2.splice(i, 1);
        continue;
    }

    // Wandkollision
    if (checkCollision(bulletBox, wand1) || checkCollision(bulletBox, wand2) ||
        checkCollision(bulletBox, wand3) || checkCollision(bulletBox, wand4) ||
        checkCollision(bulletBox, wand5)) {
        bullets2.splice(i, 1);
        continue;
    }

    // Spieler 2 getroffen
    if (checkCollision(bulletBox, player2)) {
        bullets2.splice(i, 1);
        player2.hp --;
        continue;
    }
    }

    if (wasd.w) player2.y -= player2.speed;
    if (wasd.s) player2.y += player2.speed;
    if (wasd.a) player2.x -= player2.speed;
    if (wasd.d) player2.x += player2.speed;
    if (wasd.q) player2.angle -= 3;
    if (wasd.e) player2.angle += 3;
    if (wasd[1]) skinImage2 = 0;
    if (wasd[2]) skinImage2 = 1;
    if (wasd[3]) skinImage2 = 2;
    if (wasd[4]) skinImage2 = 3;

    player2.x = Math.max(0, Math.min(canvas.width - player2.width, player2.x));
    player2.y = Math.max(0, Math.min(canvas.height - player2.height, player2.y));

    for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += b.dx;
    b.y += b.dy;

    const bulletBox2 = { x: b.x - b.radius, y: b.y - b.radius, width: b.radius * 2, height: b.radius * 2 };

    // Bildschirmrand
    if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
        bullets.splice(i, 1);
        continue;
    }
   
    // Wandkollision
    // Spieler 1 getroffen
    if (checkCollision(bulletBox2, player1)) {
        bullets.splice(i, 1);
        player1.hp --;
        continue;
    } 
    
        if (checkCollision(bulletBox2, wand1) || checkCollision(bulletBox2, wand2) ||
        checkCollision(bulletBox2, wand3) || checkCollision(bulletBox2, wand4) ||
        checkCollision(bulletBox2, wand5)) {
        bullets.splice(i, 1);
        continue;
    }
    
}

    //Spieler1/Spieler2 Kollision
     if (checkCollision(player1, player2)){
        if (pfeiltasten.ArrowUp) player1.y += player1.speed;
        if (wasd.w) player2.y += player2.speed;
        }
    if (checkCollision(player1, player2)){
        if (pfeiltasten.ArrowDown) player1.y -= player1.speed;
        if (wasd.s) player2.y -= player2.speed;
        }
    if (checkCollision(player1, player2)){
        if (pfeiltasten.ArrowLeft) player1.x += player1.speed;
        if (wasd.a) player2.x += player2.speed;
        }
    if (checkCollision(player1, player2)){
        if (pfeiltasten.ArrowRight) player1.x -= player1.speed;
        if (wasd.d) player2.x -= player2.speed;
        }
    if(checkCollision(bullets, player1)){
        switch(bigball){
         case 5:
            player1.hp--;
         break;

         case 25:
            player1.hp -= 2;
         break;
        }
    }
    if(checkCollision(bullets2, player2)){
        switch(bigball2){
            case 5:
               player2.hp--;
            break;
   
            case 25:
               player2.hp -= 2;
            break;
           }
    }

    //Powerup-Wand-Kollision
    if (checkCollision(PowerUp1, wand1)){
    PowerUp1.x = Math.random() * canvas.width;
    PowerUp1.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp1, wand2)){
    PowerUp1.x = Math.random() * canvas.width;
    PowerUp1.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp1, wand3)){
    PowerUp1.x = Math.random() * canvas.width;
    PowerUp1.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp1, wand4)){
    PowerUp1.x = Math.random() * canvas.width;
    PowerUp1.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp1, wand5)){
    PowerUp1.x = Math.random() * canvas.width;
    PowerUp1.y = Math.random() * canvas.height;
    }

    if (checkCollision(PowerUp2, wand1)){
    PowerUp2.x = Math.random() * canvas.width;
    PowerUp2.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp2, wand2)){
    PowerUp2.x = Math.random() * canvas.width;
    PowerUp2.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp2, wand3)){
    PowerUp2.x = Math.random() * canvas.width;
    PowerUp2.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp2, wand4)){
    PowerUp2.x = Math.random() * canvas.width;
    PowerUp2.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp2, wand5)){
    PowerUp2.x = Math.random() * canvas.width;
    PowerUp2.y = Math.random() * canvas.height;
    }

    if (checkCollision(PowerUp3, wand1)){
    PowerUp3.x = Math.random() * canvas.width;
    PowerUp3.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp3, wand2)){
    PowerUp3.x = Math.random() * canvas.width;
    PowerUp3.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp3, wand3)){
    PowerUp3.x = Math.random() * canvas.width;
    PowerUp3.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp3, wand4)){
    PowerUp3.x = Math.random() * canvas.width;
    PowerUp3.y = Math.random() * canvas.height;
    }
    if (checkCollision(PowerUp3, wand5)){
    PowerUp3.x = Math.random() * canvas.width;
    PowerUp3.y = Math.random() * canvas.height;
    }
    //Wandkolision Spieler 1 und Spieler 2:
    if (checkCollision(wand1, player1)){  
        if (pfeiltasten.ArrowUp) player1.y += player1.speed;
        }
        if (checkCollision(wand1, player1)){
        if (pfeiltasten.ArrowDown) player1.y -= player1.speed;
        }
        if (checkCollision(wand1, player1)){
        if (pfeiltasten.ArrowLeft){
        player1.x += player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
        }
        if (checkCollision(wand1, player1)){
        if (pfeiltasten.ArrowRight){
        player1.x -= player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
        }


    if (checkCollision(wand2, player1)){  
        if (pfeiltasten.ArrowUp) player1.y += player1.speed;
    }
        if (checkCollision(wand2, player1)){
        if (pfeiltasten.ArrowDown) player1.y -= player1.speed;
        }
        if (checkCollision(wand2, player1)){
        if (pfeiltasten.ArrowLeft){
        player1.x += player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
        }
        if (checkCollision(wand2, player1)){
        if (pfeiltasten.ArrowRight){
        player1.x -= player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
    }

    if (checkCollision(wand3, player1)){  
        if (pfeiltasten.ArrowUp) player1.y += player1.speed;
    }
        if (checkCollision(wand3, player1)){
        if (pfeiltasten.ArrowDown) player1.y -= player1.speed;
        }
        if (checkCollision(wand3, player1)){
        if (pfeiltasten.ArrowLeft){
        player1.x += player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
        }
        if (checkCollision(wand3, player1)){
        if (pfeiltasten.ArrowRight){
        player1.x -= player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
    }

        if (checkCollision(wand4, player1)){  
        if (pfeiltasten.ArrowUp) player1.y += player1.speed;
        }
        if (checkCollision(wand4, player1)){
        if (pfeiltasten.ArrowDown) player1.y -= player1.speed;
        }
        if (checkCollision(wand4, player1)){
        if (pfeiltasten.ArrowLeft){
        player1.x += player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
        }
        if (checkCollision(wand4, player1)){
       if (pfeiltasten.ArrowRight){
        player1.x -= player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
        }

        if (checkCollision(wand5, player1)){  
        if (pfeiltasten.ArrowUp) player1.y += player1.speed;
        }
        if (checkCollision(wand5, player1)){
        if (pfeiltasten.ArrowDown) player1.y -= player1.speed;
        }
        if (checkCollision(wand5, player1)){
        if (pfeiltasten.ArrowLeft){
        player1.x += player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
        }
        if (checkCollision(wand5, player1)){
       if (pfeiltasten.ArrowRight){
        player1.x -= player1.speed;
        if (pfeiltasten.ArrowDown) player1.y += player1.speed;
        if (pfeiltasten.ArrowUp) player1.y -= player1.speed;
        }
        }

        if (checkCollision(wand1, player2)){  
        if (wasd.w) player2.y += player2.speed;
        }
        if (checkCollision(wand1, player2)){
        if (wasd.s) player2.y -= player2.speed;
        }
        if (checkCollision(wand1, player2)){
        if (wasd.a){
        player2.x += player2.speed;
        if (wasd.s) player2.y += player2.speed;
        if (wasd.w) player2.y -= player2.speed;
        }
        }
        if (checkCollision(wand1, player2)){
        if (wasd.d) {
            player2.x -= player2.speed;
            if (wasd.s) player2.y += player2.speed;
            if (wasd.w) player2.y -= player2.speed;
        }
    }

    if (checkCollision(wand2, player2)){  
        if (wasd.w) player2.y += player2.speed;
        }
        if (checkCollision(wand2, player2)){
        if (wasd.s) player2.y -= player2.speed;
        }
        if (checkCollision(wand2, player2)){
        if (wasd.a){
        player2.x += player2.speed;
        if (wasd.s) player2.y += player2.speed;
        if (wasd.w) player2.y -= player2.speed;
        }
        }
        if (checkCollision(wand2, player2)){
        if (wasd.d) {
            player2.x -= player2.speed;
            if (wasd.s) player2.y += player2.speed;
            if (wasd.w) player2.y -= player2.speed;
        }
    }

    if (checkCollision(wand3, player2)){  
        if (wasd.w) player2.y += player2.speed;
        }
        if (checkCollision(wand3, player2)){
        if (wasd.s) player2.y -= player2.speed;
        }
        if (checkCollision(wand3, player2)){
        if (wasd.a){
        player2.x += player2.speed;
        if (wasd.s) player2.y += player2.speed;
        if (wasd.w) player2.y -= player2.speed;
        }
        }
        if (checkCollision(wand3, player2)){
        if (wasd.d) {
            player2.x -= player2.speed;
            if (wasd.s) player2.y += player2.speed;
            if (wasd.w) player2.y -= player2.speed;
        }
    }

        if (checkCollision(wand4, player2)){  
        if (wasd.w) player2.y += player2.speed;
        }
        if (checkCollision(wand4, player2)){
        if (wasd.s) player2.y -= player2.speed;
        }
        if (checkCollision(wand4, player2)){
        if (wasd.a){
        player2.x += player2.speed;
        if (wasd.s) player2.y += player2.speed;
        if (wasd.w) player2.y -= player2.speed;
        }
        }
        if (checkCollision(wand4, player2)){
        if (wasd.d) {
            player2.x -= player2.speed;
            if (wasd.s) player2.y += player2.speed;
            if (wasd.w) player2.y -= player2.speed;
        }
        }

        if (checkCollision(wand5, player2)){  
        if (wasd.w) player2.y += player2.speed;
        }
        if (checkCollision(wand5, player2)){
        if (wasd.s) player2.y -= player2.speed;
        }
        if (checkCollision(wand5, player2)){
        if (wasd.a){
        player2.x += player2.speed;
        if (wasd.s) player2.y += player2.speed;
        if (wasd.w) player2.y -= player2.speed;
        }
        }
        if (checkCollision(wand5, player2)){
        if (wasd.d) {
            player2.x -= player2.speed;
            if (wasd.s) player2.y += player2.speed;
            if (wasd.w) player2.y -= player2.speed;
        }
        }

    //Powerups    

    //PowerUp1 eingesammelt speedboost
    if (checkCollision(player1, PowerUp1)){
        player1.speed = 6;
        //PowerUp1 respawnen
        PowerUp1.color = 'white'
        PowerUp1.x = 1400
        PowerUp1.y = 0
        setTimeout(timer2, 8500)
    }
    if (player1.speed == 6){
        setTimeout(timer, 4000)      
    }

    if (checkCollision(player1, PowerUp2)){
        player1.hp += 2;
        //PowerUp2 respawnen
        PowerUp2.color = 'white'
        PowerUp2.x = 1400
        PowerUp2.y = 0
        setTimeout(timer3, 11000)
    }

    if (checkCollision(player2, PowerUp1)){
        player2.speed = 6;
        //PowerUp1 respawnen
        PowerUp1.color = 'white'
        PowerUp1.x = wand2.x + 10
        PowerUp1.y = wand2.y + 10
        setTimeout(timer2, 8500)
    }
    if (player2.speed == 6){
        setTimeout(timer1, 4000)      
    }

    if (checkCollision(player2, PowerUp2)){
        player2.hp += 2;
        //PowerUp2 respawnen
        PowerUp2.color = 'white'
        PowerUp2.x = 1400
        PowerUp2.y = 900
        setTimeout(timer3, 11000)
    }

    //powerup3 player1 
    if (checkCollision(player1, PowerUp3)){
        maxAmmo2 = 1,
        currentAmmo2 = 1,
        bigball2 = 25,
        bigball2speed = 12,
       

        setTimeout(timer5, 5000)
        //PowerUp2 respawnen
        PowerUp3.color = 'white'
        PowerUp3.x = 1400
        PowerUp3.y = 900
        setTimeout(timer4, 13000)
    }
    
    if (checkCollision(player2, PowerUp3)){
        maxAmmo = 1,
        currentAmmo = 1,
        bigball = 25,
        bigballspeed = 12,
        

        setTimeout(timer6, 5000)
        //PowerUp2 respawnen
        PowerUp3.color = 'white'
        PowerUp3.x =  1400
        PowerUp3.y =  900
        setTimeout(timer4, 13000)
    }
    
}
    


//powerup1 timer
function timer(){
    player1.speed = 4
}
function timer1(){
    player2.speed = 4
}
//powerup1 respawn timer
function timer2(){
    PowerUp1.color = 'pink'
    PowerUp1.y = Math.random() * canvas.height,
    PowerUp1.x = Math.random() * canvas.width 
}

function timer3(){
    PowerUp2.color = 'lime'
    PowerUp2.y = Math.random() * canvas.height,
    PowerUp2.x = Math.random() * canvas.width 
}

function timer4(){
    
    PowerUp3.color = 'purple'
    PowerUp3.y = Math.random() * canvas.height,
    PowerUp3.x = Math.random() * canvas.width 
}

function timer5(){
    currentAmmo2 = 6
    bigball2 = 5,
    maxAmmo2 = 6
}

function timer6(){
    currentAmmo = 6
    bigball = 5,
    maxAmmo = 6
} 

function restartGame(){
    player1.hp = 4;
    player2.hp = 4;
    player1.x = 1000;
    player1.y = 100;
    player2.x = 180;
    player2.y = 500;
    currentAmmo2 = maxAmmo2;
    currentAmmo = maxAmmo;
    restartButton.style.display = "none";
    PowerUp1.x = Math.random() * canvas.width;
    PowerUp1.y = Math.random() * canvas.height;
    PowerUp2.x = Math.random() * canvas.width;
    PowerUp2.y = Math.random() * canvas.height;
    PowerUp3.x = Math.random() * canvas.width;
    PowerUp3.y = Math.random() * canvas.height;
    wasd.a = false; wasd.s = false;
    wasd.d = false; wasd.w = false;
    wasd.e = false; wasd.q = false;
    wasd.f = false; pfeiltasten.ArrowUp = false;
    pfeiltasten.ArrowDown = false; pfeiltasten.ArrowLeft = false;
    pfeiltasten.ArrowRight = false; pfeiltasten["."] = false;
    pfeiltasten[","] = false; pfeiltasten["-"] = false;
    bullets = [];
    bullets2 =  [];
    gameLoop();   
}


//Loopfunktion
function gameLoop(){
    if(player1.hp == 0){
        alert("Spieler 2 hat gewonnen! Hurray:)");
        document.body.appendChild(restartButton);
        restartButton.style.display = "block";
        restartButton.addEventListener("click", restartGame);
        return;
    }

    else if(player2.hp == 0){
        alert("Spieler 1 hat gewonnen! Hurray:)");
        document.body.appendChild(restartButton);
        restartButton.style.display = "block";
        restartButton.addEventListener("click", restartGame);
        return;
    }
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
//Spielen
gameLoop();