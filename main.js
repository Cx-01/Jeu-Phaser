      
      //Breakout game test


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

		//Background
		this.game.load.image('background', 'img/background2.png');

		//paddle
		this.game.load.image('paddle', 'img/paddle.png');

		//brik
		this.game.load.image('brick', 'img/brik.png');

		//balle
		this.game.load.image('balle', 'img/balle.png');
		

	},//preload

	create: function() {
	 game.state.start('main');
   }
  };//gameState.load.prototype

 var balleOnPaddle = true;

gameState.main= function(){};
gameState.main.prototype={
	create: function() {

		//activer arcade physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// check les collisions aux murs sauf celui du bottom-> on perd une vie
    this.game.physics.arcade.checkCollision.up = true;
     this.game.physics.arcade.checkCollision.down = true;

    // crée une variable pour les touches
  	//this.cursor = game.input.keyboard.createCursorKeys();

		//créer le background à l'état de sprite
		this.background = this.game.add.tileSprite(0,0,960,720, 'background');
		this.background.width = this.game.width*4; 
		this.background.height = this.game.height*4;

		//paddle
		this.paddle = this.game.add.sprite(this.game.world.centerX, 650, 'paddle');
		this.game.physics.arcade.enable(this.paddle);
		this.paddle.body.immovable = true;
		this.paddle.anchor.setTo(0.5, 0.5);
		//this.paddle.body.collideWorldBounds = true;

		//brik
		//this.brick = this.game.add.sprite(430,50,'brick');
		this.brick = game.add.group();
   	this.brick.enableBody = true;
    this.brick.physicsBodyType = Phaser.Physics.ARCADE;


    	var bricks;

   		for (var y = 0; y < 2; y++)// nombre de colonne en y
    	{
        	for (var x = 0; x < 7; x++) // nombre de colonne en x
        	{
           		bricks1 =this.
           		brick.create(70 + (x * 120), 50 + (y * 40), 'brick' );
           		bricks1.body.bounce.set(1);
           		bricks1.body.immovable = true;
        	}
    	}

    	var bricks1;

   		for (var y = 0; y < 3; y++)// nombre de colonne en y
    	{
        	for (var x = 0; x < 5; x++) // nombre de colonne en x
        	{
           		bricks1 =this.
           		brick.create(190 + (x * 120), 180 + (y * 40), 'brick' );
           		bricks1.body.bounce.set(1);
           		bricks1.body.immovable = true;
        	}
    	}

    	var bricks2;

   		for (var y = 0; y < 2; y++)// nombre de colonne en y
    	{
        	for (var x = 0; x < 7; x++) // nombre de colonne en x
        	{
           		bricks1 =this.
           		brick.create(70 + (x * 120), 350 + (y * 40), 'brick' );
           		bricks1.body.bounce.set(1);
           		bricks1.body.immovable = true;
        	}
    	}

    	//balle

     
    this.balle = this.game.add.sprite(430,625, 'balle'); 
    this.game.physics.arcade.enableBody(this.balle);
    this.balle.anchor.setTo(0.5);
    //this.balle.body.velocity.x = 300;
    //this.balle.body.velocity.y = 300;

    this.balle.body.collideWorldBounds = true,
    this.balle.body.bounce.set(1);
    this.game.input.onDown.add(this.releaseBall, this);

    	
	},//create

	releaseBall: function(){
     if (balleOnPaddle)
      {
        balleOnPaddle = false;
        this.balle.body.velocity.y = -300;
        this.balle.body.velocity.x = -75;
        
      }

	},//re

	update: function(){

		  //répétition du background
		  this.background.tilePosition.x += 0.3; //le nombre est pour la vitesse

    	/*// Mouvement via la souris methode 1
		  this.paddle.body.x = this.game.input.worldX - this.paddle.body.width / 2;

    	if (this.paddle.body.x <= 0)
    	{
       	this.paddle.body.x = 0;
   		}
   		 else if (this.paddle.body.x > this.game.width - 100 )
   	 	{
   	   	this.paddle.body.x = this.game.width - 100;
    	}*/


      //mouvemet via ma souris methode 2
      this.paddle.position.x = this.game.input.mousePointer.x;

      //balle sur la pallette
      if (balleOnPaddle)
      {
        this.balle.body.x = this.paddle.x;
      }


    	//balle et la pallete 'colission'
    	this.game.physics.arcade.collide(this.paddle, this.balle);

    	// Call the 'hit' function when the ball hit a brick
		  this.game.physics.arcade.collide(this.balle, this.brick, this.hit, null, this);

	},//update

	hit: function(balle, brick) {
  		// When the ball hits a brick, kill the brick
  		brick.kill();
	},//hit


};//Protoype

game.state.add('load', gameState.load);
game.state.add('main', gameState.main);
// Il ne reste plus qu'à lancer l'état "load"
game.state.start('load');