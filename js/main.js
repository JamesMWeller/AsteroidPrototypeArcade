game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, "gameDiv", { preload: preload, create: create, update: update, render: render });

var asteroids;
var planets;
var asteroid;
var planet;
var pendingDestroy = [];
var planetLife = 3;

var text;
var text2;

const FIRE = "fire";
const WATER = "water";
const EARTH = "earth";
const AIR = "air";
const ENERGY = "energy";

function preload() {
    // window scaling
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setShowAll();
    window.addEventListener('resize', function () {
        this.game.scale.refresh();
    });
    this.game.scale.refresh();
    
    game.load.image('asteroid', 'images/asteroidNew.png');
    game.load.image('planet', 'images/planetNew.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    asteroids = game.add.physicsGroup(Phaser.Physics.ARCADE);
    planets = game.add.physicsGroup(Phaser.Physics.ARCADE);

    planets.enableBody = true;
    asteroids.enableBody = true;

    game.input.addPointer();
    game.input.addPointer();
    game.input.addPointer();
    game.input.addPointer();

    text = game.add.text(16, 16, 'Your Planet has ' + planetLife + ' lives left.', { fill: '#ffffff' });


    for (var i = 0; i < 12; i++) {
        asteroid = asteroids.create(game.world.randomX, game.world.randomY, 'asteroid')
        {
            this.worldType = randomElement();
            enableBody = true;
            game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        };

        var rand = game.rnd.realInRange(1, 2);
        asteroid.scale.setTo(rand, rand);
        asteroid.body.setCircle();
        asteroid.body.collideWorldBounds = true;
        asteroid.inputEnabled = true;
        asteroid.input.enableDrag();
        asteroid.input.useHandCursor = true;
        asteroid.events.onDragStart.add(onDragStart, asteroid);
        asteroid.events.onDragStop.add(onDragStop, asteroid);

    }

    for (var i = 0; i < 1; i++) {
        planet = planets.create(game.width / 2, game.height / 2, 'planet');
        planet.scale.setTo(0.3, 0.3);
        planet.body.setCircle(345, 280, 375);
        planet.body.collideWorldBounds = true;
        planet.inputEnabled = true;
        planet.input.enableDrag();
        planet.input.useHandCursor = true;
    }
}

function update() {
    while (pendingDestroy.length > 0) {
        pendingDestroy.pop().destroy();
    }
    if (game.physics.arcade.overlap(asteroids, planets, planetLoseLife)) {
        text.text = 'Your Planet has ' + planetLife + ' lives left.';
    }

    game.physics.arcade.overlap(asteroids, asteroids, addToPendingDestroy);

}



function render() {
    //game.debug.body(asteroid);
    //game.debug.body(planet);
}

function randomElement() {

}

function onDragStart() {
    this.dragStartLocation = { x: this.x, y: this.y };
    console.log(this.dragStartLocation);
}

function onDragStop() {
    this.dragStopLocation = { x: this.x, y: this.y };
    console.log(this.dragStopLocation.y);
    var x = this.dragStopLocation.x + (this.dragStopLocation.x - this.dragStartLocation.x);
    var y = this.dragStopLocation.y + (this.dragStopLocation.y - this.dragStartLocation.y);
    console.log("dx = " + x);
    console.log("dy = " + y);
    game.physics.arcade.moveToXY(this, x, y);
}
function addToPendingDestroy(a, b) {
    pendingDestroy.push(a);
    pendingDestroy.push(b);
}
function overlapDestroy(a, b) {

    var boundsA = a.getBounds();
    var boundsB = b.getBounds();

    var x = (a.x + b.x) / 2;
    var y = (a.y + b.y) / 2;

}

function planetLoseLife(a, b) {
    if (planetLife == 0) {
        gameOver();
    } else if (planetLife > 0) {
        pendingDestroy.push(a)
        planetLife = planetLife - 1;
    }

}

function gameOver() {
    alert("Game Over!!");
    location.reload();
}
