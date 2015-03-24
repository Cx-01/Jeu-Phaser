var game = new Phaser.Game(960, 720, Phaser.Auto, "test");
game.transparent=true;

var gameState= {};

gameState.load = function(){};
gameState.load.prototype = {
	preload: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.setShowAll();
		window.addEventListener('resize', function () {
		this.game.scale.refresh();
		});
		this.game.scale.refresh();

		/*Sprites*/
		//perso
		this.game.load.atlasJSONHash('hero', 'img/hero.png', 'data/hero.json');
		//background
		this.game.load.image('background', 'img/background2.png');
		//ground
		this.game.load.image('ground', 'img/ground2.png');
		
		//neon
		this.game.load.image('neon', 'img/neon.png');

		//lune
		this.game.load.image('lune', 'img/lune2.png');


	},//preload

	create: function() {
		game.state.start('main');
	}

};//gameState.load.prototype

gameState.main= function(){};
gameState.main.prototype={
	create: function() {
		//activer arcade physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//créer le background à l'état de sprite
		this.background = this.game.add.tileSprite(0,0,960,720, 'background');
		this.background.width = this.game.width; 
		this.background.height = this.game.height;

		/*//lune
		this.lune =  this.game.add.sprite(550, 530,'lune');
		this.lune.width =  this.lune.width / 1.5 ;
		this.lune.height = this.lune.height / 1.5;*/

		sprite = this.game.add.sprite(350, 250, 'lune');
		sprite.anchor.setTo(0.5, 0.5);
		sprite.width = sprite.width ;
		sprite.height = sprite.height;


		/*//sol -Physics arcade
		this.ground = this.game.add.sprite(0,420,'ground');//position 
		//mouvement
		this.game.physics.arcade.enableBody(this.ground);
		this.ground.body.immovable = true;// pas d'impact avec les autres objets
		this.ground.body.allowGravity = false;
		this.ground.body.velocity.x = -250; // vitesse du mouvement*/

		//neon
		this.neon = this.game.add.tileSprite(0,460,960,29, 'neon');

		//sol tilesprite
		this.ground = this.game.add.tileSprite(0,420,960,103, 'ground');	
		this.game.physics.arcade.enableBody(this.ground);
		this.ground.body.immovable = true;
		this.ground.body.allowGravity = false;
	
		//perso
		this.hero = this.game.add.sprite(-20,365,'hero');//Position
		//animation du perso avc physics.arcade
		this.game.physics.arcade.enableBody(this.hero);
		this.hero.body.allowGravity = true;
		this.hero.body.velocity.x = 150;
	
		//animations
		this.hero.animations.add('run');
		this.hero.animations.play('run', 15, true); // true--> permet de recommencer le cycle.

	},//create

	start: function(){

	},//start

	jump: function(){

	},//jump

	update: function(){

		/*//HERO animation  test1 
		this.hero.x += 5;*/

		//hero animation test2
		if(this.hero.x < this.game.width <= 0) {
			this.hero.x = -30;
		}

		/*if(this.ground.x + this.ground.width / 2<= 0) {
			this.ground.x = 0;
		}*/

		//répétition du ground
		this.ground.tilePosition.x += 4;

		//répétition du neon
		this.neon.tilePosition.x -= 5;

		//répétition du background
		this.background.tilePosition.x += 0.5; //le nombre est pour la vitesse

		sprite.angle += 0.15;

	}//update

};//Protoype

game.state.add('load', gameState.load);
game.state.add('main', gameState.main);
// Il ne reste plus qu'à lancer l'état "load"
game.state.start('load');