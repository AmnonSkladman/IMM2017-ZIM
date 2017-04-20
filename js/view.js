//Colour Scheme: http://www.colourlovers.com/palette/1714968/FORBIDDEN_PLANET

var app = function (app) {

    app.makePages = function (frame, stage, stageW, stageH, layoutManager) {
        
        var p = {};
        
        ////////////////////////
        //////// Page 1 ////////
        ////////////////////////
        
        var page1 = p.page1 = new zim.Container(stageW, stageH)
            .addTo(stage);
        page1.name = "page1";

        var logo = page1.logo = new zim.Rectangle(300, 100, "#E6A972")
            .addTo(page1);

        var content = new zim.Rectangle(700, 600, "#CF8884")
            .addTo(page1);

        var buttons = new zim.Container()
            .addTo(page1);
        
        var tabs = page1.tabs = new zim.Tabs({
            width: 500,
            tabs: ["PLAY"],
            currentEnabled: true,
            corner: 10,
            color: "#F6D169",
        }).addTo(buttons);
        
        var logoLabel1 = new zim.Label({
            text:"Fer-De-Lance",
            color: "#FFF",
            font: 'Roboto'
        }).center(logo);
        
        var instructions = new zim.Label({
            text:"This is it, commander. It's time to leave the system and head home. We're going to be flying through an asteroid field, though, so watch out. \n\nManeuver your FDL by using the left and right squares. Avoid those asteroids, and feel free to collect whatever Onionheads you come across. \n\nGodspeed, commander. o7",
            color: "#FFF",
            lineWidth: 650,
            font: 'Roboto'
        }).center(content);

        // LAYOUT
        // holder, regions, lastMargin, backgroundColor,
        // vertical, regionShape, scalingObject, hideKey
        layoutManager.add(new zim.Layout({
            holder:page1,
            regions:[
                {object:logo, marginTop:5, maxWidth:80, height:15, align:"center", valign:"top"},
                {object:content, marginTop:5, maxWidth:100, backgroundColor:"#B66E6F"},
                {object:buttons, marginTop:5, maxWidth:100, minHeight:10,}
            ],
            lastMargin:3,
//            regionShape:new zim.Shape(),
            scalingObject:stage
        }));
        
        ////////////////////////
        //////// Page 2 ////////
        ////////////////////////
        
        var page2 = p.page2 = new zim.Container(stageW, stageH)
            .addTo(stage);
        page2.name = "page2";

        var logo2 = page2.logo = new zim.Rectangle(300, 100, "#E6A972")
            .addTo(page2);

        var content2 = new zim.Container(700, 600)
            .addTo(page2);
        
        var content2bg = new zim.Rectangle(700, 600, "#CF8884")
            .addTo(content2)
            .alp(0);

        var buttons2 = new zim.Container()
            .addTo(page2);
        
        var tabs2 = page2.tabs = new zim.Tabs({
            width: 500,
            tabs: ["HOME"],
            currentEnabled: true,
            corner: 10,
            color: "#F6D169",
//            rollColor
//            offColor
        }).addTo(buttons2);
        
        var logoLabel2 = new zim.Label({
            text:"Space Game WIP",
            color: "#FFF"
        }).center(logo2);
        
        //////////////////////
        //////// GAME ////////
        //////////////////////
        
        ///////////////////////////////
        //////// INITIATE GAME ////////
        ///////////////////////////////

        // this function initiates the main interval
        p.startGame = function startGame() {
            setInterval(animate, 1000);
            setInterval(hitTest, 333.333);
            //BGmusic.play();
        };

        /////////////////////////////////////
        //////// PARALLAX BACKGROUND ////////
        /////////////////////////////////////

        function senpaiBG() {
            var animation = new zim.Container(700,600).addTo(content2);
            //content2.addChild(animation);

            var bg = frame.asset("space.jpg").addTo(animation);
            //animation.addChildAt(bg, 0);
            bg.width = 700;
            animation.setMask(content2bg);

            var background = new zim.Scroller({backing:bg, speed:-4, horizontal: false, gapFix: 4.75, container: animation});

            //another scroller for trees (Parallax)
            //var trees = frame.asset("bgtrees.png");
               //animation.addChild(trees);

            //var trees2 = new zim.Scroller({backing:trees, speed:-3, horizontal: false, gapFix: 4.75, fps: 60});
        };
        senpaiBG();
        
        ////////////////
        // defines lanes

        var lane1 = (content2.getBounds().width/8);
        var lane2 = (content2.getBounds().width/8)*3;
        var lane3 = (content2.getBounds().width/8)*5;
        var lane4 = (content2.getBounds().width/8)*7;

        var lanes = [lane1, lane2, lane3, lane4];

        /////////////////////////
        //////// PLAYERS ////////
        /////////////////////////

        // defines the Fer-De-Lance
        var fdl = frame.asset("fdl.png");

        // adds them to the second page
        fdl.centerReg(content2);
        fdl.scale(.5);

        // defines fdl positioning
        fdl.x = lanes[1];
        fdl.y = content2.getBounds().height - fdl.height/2 - 10;

        ///////////////////////
        //////// ITEMS ////////
        ///////////////////////

        // creates contains in which items will be deposited
        // easier to control them that way
        var asteroids = new zim.Container();
        content2.addChild(asteroids);
        var asteroid1 = frame.asset("asteroid.png");
        var asteroid2 = frame.asset("asteroid2.png");
        
        var onions = new zim.Container();
        content2.addChild(onions);
        var onionHead = frame.asset("onionHead.png");

        ///////////////////////////
        //////// MECHANICS ////////
        ///////////////////////////

        ////////
        // music

        //var BGmusic = frame.asset("YetitPetit.mp3");
        //var sound = frame.asset("collect.wav");
        //var moveSound = frame.asset("move.wav");
        //var dieSound = frame.asset("die.mp3");

        ////////////////////////////////////
        // EVENT LISTENER TO CONTROL PLAYERS

        //IF ON DESKTOP
        window.addEventListener("keydown", function(e){
            var k = e.keyCode

            if(k==83 && fdl.x == lane2){
                fdl.move({x:lane3, time: 250});
                fdl.scaleX = -fdl.scaleX;
                zog("Moving right!");
                //moveSound.play();

            }
            else if(k==65 && fdl.x == lane3){
                fdl.move({x:lane2, time: 250});
                fdl.scaleX = -fdl.scaleX;
                zog("Moving left!");
                //moveSound.play();
            };

        }); //end of eventListener for keys
        
        page2.on("mousedown", function(){
            if (stage.mouseX > stage.width/2) {
                fdl.move({x:lane3, time: 333});
                fdl.scaleX = -fdl.scaleX;
                zog("Moving right!");
                //moveSound.play();
            } else
            if (stage.mouseX < stage.width/2) {
                fdl.move({x:lane2, time: 333});
                fdl.scaleX = -fdl.scaleX;
                zog("Moving left!");
                //moveSound.play();
            };
        });

        /////////////////
        // SCORING SYSTEM

        var score = 0;
        var scoring;
        var scoreScale = 1;
        var progressBar = new zim.Rectangle(50, 550, "tomato");
        var scoreBar = new zim.Rectangle(50, scoreScale, "lime");

        var scoreLabel = new zim.Label({
            text: score,
            size: 30,
            color: "gold",
            shadowColor: "grey",
            align: "right",
            font: 'Roboto',
        });

        content2.addChild(progressBar);
        progressBar.x = content2.getBounds().width-75;
        progressBar.y = 24;

        content2.addChild(scoreBar);
        scoreBar.x = content2.getBounds().width-75;
        scoreBar.y = 574;
        scoreBar.regY = scoreBar.getBounds().height;

        content2.addChild(scoreLabel);
        scoreLabel.x = content2.getBounds().width-25;
        scoreLabel.y = 573;

        ///////////////////////////////////////////////////////

        function animate() {

            // clones the items so they can be reused endlessly
            var asteroidClone1 = asteroid1.clone();
            asteroidClone1.scale(.4);
            asteroidClone1.setMask(content2bg);
            
            var asteroidClone2 = asteroid2.clone();
            asteroidClone2.scale(.4);
            asteroidClone2.setMask(content2bg);
            
            var onionHeadClone = onionHead.clone();
            onionHeadClone.scale(.4);
            onionHeadClone.setMask(content2bg);

            //var trapClone1 = trap1.clone();
            //var trapClone2 = trap2.clone();

            var speed = 4000; //main falling speed
            var speed2 = 1500; //alternate speed for randomization
            var speed3 = 3000; //alternate speed for randomization

            // sets the positioning for the cloned items
            asteroidClone1.regX = asteroidClone1.width/2;
            asteroidClone1.regY = asteroidClone1.height;
            asteroidClone1.x = lanes[Math.round(zim.rand(1,2))];
//            asteroidClone1.x = lanes[1];
            asteroidClone1.y = -40;
            zog("Asteroid created!");

            asteroidClone2.regX = asteroidClone2.width/2;
            asteroidClone2.regY = asteroidClone2.height;
            asteroidClone2.x = lanes[Math.round(zim.rand(1,2))];
//            asteroidClone2.x = lanes[2];
            asteroidClone2.y = -40;
            zog("Asteroid2 created!");

            onionHeadClone.regX = onionHeadClone.width/2;
            onionHeadClone.regY = onionHeadClone.height;
            onionHeadClone.x = lanes[Math.round(zim.rand(1,2))];
            onionHeadClone.y = -50;

            // adds the cloned items to the containers
            asteroids.addChild(asteroidClone1, asteroidClone2); 
            onions.addChild(onionHeadClone);

            ///////////////////////////////////////////////////
            // moves the containers
            // function(obj, x, y, duration, ease, callBack, params, delay, loop, loopCount, loopWait, blahblahblah)

            asteroidClone1.move({  
                    y:content2.getBounds().height+200, 
                    time:speed, 
//                    call:hitTest,
                    wait:Math.round(zim.rand(speed2, speed3)),
                    ease:"linear",
                    });
            asteroidClone2.move({  
                    y:content2.getBounds().height+200, 
                    time:speed, 
//                    call:hitTest,
                    wait:Math.round(zim.rand(speed2, speed3)),
                    ease:"linear",
                    });
            onionHeadClone.move({  
                    y:content2.getBounds().height+200, 
                    time:speed, 
//                    call:hitTest,
                    wait:Math.round(zim.rand(speed2, speed3)),
                    ease:"linear",
                    });

            //regular wait
            //wait:2500,
            //saving as backup

            // mandatory stage update
            stage.update();
        }; // end of animate()

        // this function deals with hit tests
        function hitTest() {

            //defines variables to be used in the loops
            var asteroid;
            var onion;

            //zog("catHitTest is executing!");
            
            for (var i = onions.numChildren - 1; i >= 0; i--) {
                // ONIONHEADS //
                onion = onions.getChildAt(i);

                // if player collects onionheads
                if (zim.hitTestBounds(fdl, onion)) {
                    scoreScale += 1;
                    score += 1;
                    scoreLabel.text = score;
                    onions.removeChild(onion);
//                    sound.play();
                    zim.scaleTo(scoreBar, progressBar, 100, scoreScale, "both");
                    stage.update();
                }; 

                // deletes onionheads if they go off-stage
                if (onion.y >= content2.getBounds().height+50) {
                    zog("The onionheads have gone off screen!");
                    onions.removeChild(onion);
                    stage.update();
                };
                
                if (score==100){
                    zgo('./win.html');
                };
            } //end of onionHead loop

            //looping for asteroids
            for (var i = asteroids.numChildren - 1; i >= 0; i--) {

                //zog("This catHitTest FOR loop is running!");

                // ASTEROIDS //
                asteroid = asteroids.getChildAt(i);

                // if FDL hits the asteroids
                if (zim.hitTestBounds(fdl, asteroid)) {
                     score -= 1;
                     scoreScale -= 1;
                     scoreLabel.text = score;
                     asteroids.removeChild(asteroid);
                    // dieSound.play();
                     zim.scaleTo(scoreBar, progressBar, 100, scoreScale, "both");
                     zog("POW!");
                     stage.update();
                    if (score <= -5) {
                        zgo('./lose.html');
                    }
                };

                // deletes asteroids if they go off-stage
                if (asteroid.y >= content2.getBounds().height+50) {
                    zog("The asteroids have gone off screen!");
                    asteroids.removeChild(asteroid);
                    stage.update();
                };
                
                // IF ROCKS TOUCH EACH OTHER
                if (asteroid.y > 10) {
                    if (zim.loop(asteroids, function(asteroidTest){
                        if (asteroidTest == asteroid) return;
                        if (zim.hitTestBounds(asteroid, asteroidTest)) {
                            asteroids.removeChild(asteroidTest);
                            stage.update();
                            zog("ROCKS HAVE CRASHED INTO ONE ANOTHER!");
                            return true;
                        }; 
                    }, true)){
                        break
                        zog("BREAK");
                    };
                };
                
                // IF ROCKS TOUCH ONIONHEADS
                if (asteroid.y > 10) { 
                    zim.loop(onions, function(onionTest){
                        if (zim.hitTestBounds(asteroid, onionTest)) {
                            //var choose = [asteroids.removeChild(asteroid), onions.removeChild(onion)]
                            //choose[Math.round(Math.random())];
                            asteroids.removeChild(asteroid);
//                            onions.removeChild(onion);
                            stage.update();
                            zog("SPLAT!");
                            return false;
                        }; 
                    }, true);
                };  
            }; // end of asteroid loop
            stage.update();
        }; // end of hitTest function

        stage.update(); // mandatory stage update
        
        //////// END OF GAME ////////
        /////////////////////////////

        // LAYOUT
        // holder, regions, lastMargin, backgroundColor,
        // vertical, regionShape, scalingObject, hideKey
        layoutManager.add(new zim.Layout({
            holder:page2,
            regions:[
                {object:logo2, marginTop:5, maxWidth:80, height:15, align:"center", valign:"top"},
                {object:content2, marginTop:5, maxWidth:100, backgroundColor:"#B66E6F"},
                {object:buttons2, marginTop:5, maxWidth:100, minHeight:10,}
            ],
            lastMargin:3,
//            regionShape:new zim.Shape(),
            scalingObject:stage
        }));       
        return p;
    };
    return app;
}(app || {});