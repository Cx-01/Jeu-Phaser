      
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

    //particule
    this.game.load.image('particule', 'img/particule.png');
		

	},//preload

	create: function() {
	 game.state.start('main');
   }
  };//gameState.load.prototype

 var balleOnPaddle = true;

 var lives = 4;
 //var score = 0;

 var scoreText;
 var livesText;
 var introText;

gameState.main= function(){};
gameState.main.prototype={
	create: function() {

		//activer arcade physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// check les collisions aux murs sauf celui du bottom-> on perd une vie
    this.game.physics.arcade.checkCollision.up = true;
     this.game.physics.arcade.checkCollision.down = false;

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

    //particule
    this.particule = this.game.add.group();
    this.particule.physicsBodyType = Phaser.Physics.ARCADE;
    this.particule.enableBody = true;


		//brik
		//this.brick = this.game.add.sprite(430,50,'brick');
		this.brick = this.game.add.group();
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
    this.balle.checkWorldBounds = true;
    this.game.input.onDown.add(this.releaseBall, this);

    this.balle.events.onOutOfBounds.add(this.ballePerdu, this);

    this.score = 0;
    this.scoreText = this.game.add.text(32, 680, 'score: 0', { font: "20px arial", fill: "#00ffe4", align: "left" });
    livesText = this.game.add.text(780, 680, 'lives: 4', { font: "20px verdana", fill: "#00ffe4", align: "left" });
    introText = this.game.add.text(350, 470, ' Click to start ', { font: "30px verdana", fill: "#ffffff", align: "center" });
    //introText.anchor.setTo(0.5, 0.5);

	},//create

	releaseBall: function(){
     if (balleOnPaddle)
      {
        balleOnPaddle = false;
        this.balle.body.velocity.y = -300;
        this.balle.body.velocity.x = -75;
        introText.visible = false;
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

      if (this.paddle.x < 50)
        {
          this.paddle.x = 50;
        }
      else if (this.paddle.x > this.game.width - 50)
       {
          this.paddle.x = this.game.width - 50;
       }

      //balle sur la pallette
      if (balleOnPaddle)
      {
        this.balle.body.x = this.paddle.x -10;
      }

    	//balle et la pallete 'colission'
    	this.game.physics.arcade.collide(this.paddle, this.balle);

    	// Call the 'hit' function when the ball hit a brick
		  this.game.physics.arcade.collide(this.balle, this.brick, this.hit, null, this);

	},//update

  ballePerdu: function(){
    lives--;
    livesText.text = 'lives: ' + lives;

    if (lives === 0)
    {
     this.gameOver();
    }
    else
    {
    balleOnPaddle = true;

    this.balle.reset(this.paddle.body.x + 25, this.paddle.y - 25);
   }
   
  },//balleperdu

  gameOver: function() {
    this.balle.body.velocity.setTo(0, 0);
    introText.text = 'Game Over!';
    introText.visible = true;

  },

	hit: function(balle, brick) {
  		//Qd a balle touches les briques
  		brick.kill();
      this.score += 10;
      this.scoreText.text = 'score: ' + this.score;

	},//hit

};//Protoype

game.state.add('load', gameState.load);
game.state.add('main', gameState.main);
// Il ne reste plus qu'à lancer l'état "load"
game.state.start('load');