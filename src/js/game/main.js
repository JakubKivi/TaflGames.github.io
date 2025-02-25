function onModalOpen(){
    // onload
    start();
    update();
}

function start(){

    if(gameName=='Brandubh'){
        size=7;
        winCondition='corner';
        weaponlessKing='enable'; 
        killingKingCondition='two'; 

    }else if(gameName=='Tablut'){
        size=9;
        winCondition='edge';
        killingKingCondition='two'; 
        weaponlessKing='disable';

    }else if(gameName=='Ard Ri'){
        size=7;
        winCondition='corner';
        killingKingCondition='two'; 
        weaponlessKing='enable';
        
    }else if(gameName=='Tawlbwrdd'){
        size=11;
        winCondition='corner';
        killingKingCondition='two'; 
        weaponlessKing='disable';

    }else if(gameName=='Hnefatafl'){
        size=11;
        winCondition='corner';
        killingKingCondition='four'; 
        weaponlessKing='disable';
    }
    else if(gameName=='Alea Evangelii'){
        size=19;
        winCondition='cornerB';
        killingKingCondition='two'; 
        weaponlessKing='disable';
    }else if(gameName=='Custom'){
        switch(document.getElementById('Map-size').value){

            case "7x7 (Brandubh)":
                size=7;
                gameName="Brandubh";
            break;
            case "7x7 (Ard Ri)":
                size=7;
                gameName="Ard Ri";
            break;
            case "9x9 (Tablut)":
                size=9;
                gameName="Tablut";
            break;
            case "11x11 (Hnefatafl)":
                size=11;
                gameName="Hnefatafl";
            break;
            case "11x11 (Tawlbwrdd)":
                size=11;
                gameName="Tawlbwrdd";
            break;
            case "19x19 (Alea Evangelii)":
                size=11;
                gameName="Alea Evangelii";
            break;
        }
        switch(document.getElementById('Escape').value){

            case "Krawędź":
                winCondition='corner';
            break;
            case "Narożnik":
                winCondition='edge';
            break;
        }
        switch(document.getElementById('King-surroundings').value){

            case "2":
                killingKingCondition='four'; 
            break;
            case "4":
                killingKingCondition='two'; 
            break;
        }
        switch(document.getElementById('King-weapon').value){
            case "Nieuzbrojony":
                weaponlessKing='enable';
            break;
            case "Zabójczy":
                weaponlessKing='disable';
            break;
        }

    }
    startingPlayer=='black'?player=1:player=2;

    s.init(document.getElementById("game"));

    if (document.attachEvent) document.attachEvent('mousemove', cursorPos);
    else document.addEventListener('mousemove', cursorPos);

    if (document.attachEvent) document.attachEvent('onclick', click);
    else document.addEventListener('click', click);

    if(s.w()>s.h()){
        fieldSize = (s.h()-margin)/size;
    }else{

        fieldSize = (s.w()-margin)/size;
    }
    center = {
        x: (s.w()-fieldSize)/2,
        y: (s.h()-fieldSize)/2
    };
    startCord = {
        x: center.x-(Math.trunc(size/2)*fieldSize),
        y: center.y-(Math.trunc(size/2)*fieldSize)
    };

    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    clearFigures(field);
    putFiguresOnMap();
    if(player==1 && AI ==1)AImove(field);

    //console.log(field[parseInt(size/2)+1][parseInt(size/2)+1]); 
}

function update(){
    if(window.location.hash == closedModalHashStateId){
        modal.style.display = "none";
    }
    setTimeout(function(){
        update();  
    }, 1000 / s.FPS);
    s.ctx.clearRect(0, 0, s.w(), s.h());
    s.ctx.fillStyle = '#000000';
    s.ctx.fillRect(0, 0, s.w(), s.h());
    if(win==1 && atarx==0){
        renderMap(size);
        renderFig();
        s.ctx.save();
        s.ctx.globalAlpha=0.60;
        s.ctx.fillRect(0, 0, s.w(), s.h());
        s.ctx.restore();
        s.ctx.drawImage(blackWin, startCord.x, startCord.y, (size*fieldSize), (size*fieldSize));
    }else if(win==2 && atarx==0){   
        renderMap(size);
        renderFig();
        s.ctx.save();
        s.ctx.globalAlpha=0.60;
        s.ctx.fillRect(0, 0, s.w(), s.h());
        s.ctx.restore();
        s.ctx.drawImage(whiteWin, startCord.x, startCord.y, (size*fieldSize), (size*fieldSize));
    }else {
        renderMap(size);
        if(!isMobile)if(typeof mouseCord!= 'undefined')drawHovered();
        renderFig();
        for (var i = 0; i <=size ; i++) {
            for (var j = 0; j <=size; j++) {
                if(availableMoves[i][j]){
                    s.ctx.fillStyle = "#c972";
                    s.ctx.beginPath();
                    s.ctx.arc(startCord.x+(i*fieldSize)-fieldSize/2, startCord.y+(j*fieldSize)-fieldSize/2, fieldSize/3, 0, 2 * Math.PI);
                    s.ctx.fill();

                }
            }
        }
        animate(ax,ay,atarx,atary);
        if(atarx!=0)setTimeout(aiiIncrease(), 10);
        if(inGame){
            if(player==AI&&atarx==0&&win==0){
                renderFig
                var a = new ruch();
                r=0; u=0;
                alpha=-Infinity;
                beta=Infinity;
                a=AImove(field, AI, 4, -Infinity, Infinity); //// TUUUUUUUUUUUUUUUUUUUUUUUUUUUUU
                clearFigures(zbici);
                if(a.x!=0){
                    ap=field[a.x][a.y];
                    atarx=a.tx;
                    atary=a.ty;
                    ax=a.x;
                    ay=a.y;
                    if(noLegalMove(field, player))
                                win=1;  //check if there is legal response
                    if(surrounding(field))
                                    win=1;
                    move(field, a.x, a.y, a.tx, a.ty, AI);
                    console.log("ruszyłem z: "+a.x+", "+a.y+" do: "+a.tx+", "+a.ty+" z wartością: "+a.value);
                    player==1?player=2:player=1;
                    if(repetition(a.x, a.y, a.tx, a.ty))
                                win=1;
                    
                }else console.log('ai ma totalny problem');
            }
        }
    }
    if(!isMobile && player!=AI)s.ctx.drawImage(cursor, mouseX, mouseY, fieldSize*0.75, fieldSize*0.75);
}