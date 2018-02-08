game = new Phaser.Game(1920, 1080, Phaser.CANVAS, "gameDiv", { preload: preload, create: create, update: update, render: render });

var asteroids;
var planets;
var asteroid;
var planet;

//var startLocation;

const FIRE = "fire";
const WATER = "water";
const EARTH = "earth";
const AIR = "air";
const ENERGY = "energy";

function preload() {
    game.load.image('asteroid', 'images/asteroid.png');
    game.load.image('planet', 'images/planet.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);

    asteroids = game.add.group();
    asteroids.enableBody = true;
    asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    planets = game.add.group();
    planets.enableBody = true;
    planets.physicsBodyType = Phaser.Physics.ARCADE;



    for (var i = 0; i < 8; i++) {
        asteroid = asteroids.create(game.world.randomX, game.world.randomY, 'asteroid')
        {
            this.worldType = randomElement();
        };

        var rand = game.rnd.realInRange(1, 3);
        asteroid.scale.setTo(rand, rand);
        asteroid.body.setCircle();
        asteroid.body.collideWorldBounds = true;
        asteroid.inputEnabled = true;
        asteroid.input.enableDrag();
        asteroid.body.collideWorldBounds = true;
        asteroid.input.useHandCursor = true;
        asteroid.events.onDragStart.add(onDragStart, asteroid);
        asteroid.events.onDragStop.add(onDragStop, asteroid);
    }

    for (var i = 0; i < 1; i++) {
        planet = planets.create(game.width / 2, game.height / 2, 'planet');
        planet.scale.setTo(0.3, 0.3);
        planet.body.setCircle(180);
        planet.body.collideWorldBounds = true;
        planet.inputEnabled = true;
        planet.input.enableDrag();
        planet.input.useHandCursor = true;
    }
}

function update() {
    if (game.physics.arcade.collide(asteroids, asteroids)) {
        console.log('boom');
    }
    if (game.physics.arcade.collide(asteroids, planets)) {
        console.log('kaboom')
    }
}

function render() {
    game.debug.body(asteroid);
    game.debug.body(planet);
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
