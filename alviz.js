var canvas;var ctx;var output;
var WIDTH	=1200;var HEIGHT=800;tileW=20;tileH=20;tileRowCount=10;tileColumnCount=20;
dragok=false;boundX=0;boundY=0;var INT_MAX=1000000007;
var Xqueue=[0];var Yqueue=[0];var pathfound=false;var dist=[];var ckd=[];var gc=[];var hc=[];
var xLoc;var yLoc;
var inter;var inter1;var inter2;var nos;
var tiles=[];
for(c=0;c<tileColumnCount;c++){
	tiles[c]=[];
	for(r=0;r<tileRowCount;r++){
		tiles[c][r]={x:c*(tileW+3),y:r*(tileH+3),state:'e'};
		//console.log(tiles[c][r].x+" "+tiles[c][r].y);
	}
}
tiles[0][0].state='s';tiles[tileColumnCount-1][tileRowCount-1].state='f';

function rect(x,y,w,h,state){
	if(state=='s'){ctx.fillStyle='#00FF00';}
	else if(state=='f'){ctx.fillStyle='#FF0000';}
	else if(state=='w'){ctx.fillStyle='#0000FF';}
	else if(state=='e'){ctx.fillStyle='#AAAAAA';}
	else if(state=='x'){ctx.fillStyle='#FF00FF';}
	else{ctx.fillStyle='#FFFF00';}
	//console.log(state);
	ctx.beginPath();ctx.rect(x,y,w,h);ctx.closePath();ctx.fill();
}
function clear(){ctx.clearRect(0,0,WIDTH,HEIGHT);}
function draw(){
	clear();//console.log("yo");
	for(c=0;c<tileColumnCount;c++){
		for(r=0;r<tileRowCount;r++){
			rect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
		}
	}
}
function hcost(x,y){
	xd=tileColumnCount-1-x;yd=tileRowCount-1-y
	if(xd>yd){
		return (14*yd+10*(xd-yd));
	}
	else {return (14*yd+10*(xd-yd));}
}
function solvec(){
	pathfound=false;dist=[];ckd=[];gc=[];hc=[];
	for(c=0;c<tileColumnCount;c++){
		dist[c]=[];ckd[c]=[];gc[c]=[];hc[c]=[];
		for(r=0;r<tileRowCount;r++){
			dist[c][r]=INT_MAX;gc[c][r]=INT_MAX;
			ckd[c][r]=0;hc[c][r]=hcost(c,r);
		}
	}
	gc[0][0]=0;dist[0][0]=hc[0][0];nos=false;inter2=setInterval(solve3,150);
}
function solve3(){
	if(!nos&&!pathfound){
		var min=INT_MAX;nos=true;
		for(c=0;c<tileColumnCount;c++){
			for(r=0;r<tileRowCount;r++){
				if(dist[c][r]<min&&ckd[c][r]==0) {xLoc=c;yLoc=r;min=dist[c][r];nos=false;}
			}
		}
		if(!nos){
			for(c=0;c<tileColumnCount;c++){
				for(r=0;r<tileRowCount;r++){
					if(dist[c][r]==min&&ckd[c][r]==0){
						if(hc[c][r]<hc[xLoc][yLoc]){xLoc=c;yLoc=r;}
					}
				}
			}
		}
	}
	if(!nos){
		if(xLoc>0&&yLoc>0){ if(tiles[xLoc-1][yLoc-1].state=='f'){pathfound=true;}
		}
		if(xLoc>0){ if(tiles[xLoc-1][yLoc].state=='f'){pathfound=true;}
		}
		if(xLoc>0&&yLoc<tileRowCount-1){if(tiles[xLoc-1][yLoc+1].state=='f'){pathfound=true;}
		}
		if(yLoc>0){ if(tiles[xLoc][yLoc-1].state=='f'){pathfound=true;}
		}
		if(yLoc<tileRowCount-1){if(tiles[xLoc][yLoc+1].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1&&yLoc>0){if(tiles[xLoc+1][yLoc-1].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1){if(tiles[xLoc+1][yLoc].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1&&yLoc<tileRowCount-1){
			if(tiles[xLoc+1][yLoc+1].state=='f'){pathfound=true;}
		}
		ckd[xLoc][yLoc]=1;
	}
	if(!nos&&!pathfound){	
		if(xLoc>0&&yLoc>0){ 
			if(tiles[xLoc-1][yLoc-1].state=='e'){
			 gc[xLoc-1][yLoc-1]=gc[xLoc][yLoc]+14;
			 dist[xLoc-1][yLoc-1]=gc[xLoc-1][yLoc-1]+hc[xLoc-1][yLoc-1];
			 tiles[xLoc-1][yLoc-1].state=tiles[xLoc][yLoc].state+'1';
			}
			else if(tiles[xLoc-1][yLoc-1].state!='w'&&ckd[xLoc-1][yLoc-1]==0){
				if(gc[xLoc][yLoc]+14<gc[xLoc-1][yLoc-1]){
				 gc[xLoc-1][yLoc-1]=gc[xLoc][yLoc]+14;dist[xLoc-1][yLoc-1]=gc[xLoc-1][yLoc-1]+hc[xLoc-1][yLoc-1];
				 tiles[xLoc-1][yLoc-1].state=tiles[xLoc][yLoc].state+'1';
				}
			}				
		}
		if(xLoc>0){
			if(tiles[xLoc-1][yLoc].state=='e'){
			 gc[xLoc-1][yLoc]=gc[xLoc][yLoc]+10;
			 dist[xLoc-1][yLoc]=gc[xLoc-1][yLoc]+hc[xLoc-1][yLoc];
			 tiles[xLoc-1][yLoc].state=tiles[xLoc][yLoc].state+'l';
			}
			else if(tiles[xLoc-1][yLoc].state!='w'&&ckd[xLoc-1][yLoc]==0){
				if(gc[xLoc][yLoc]+10<gc[xLoc-1][yLoc]){
				 gc[xLoc-1][yLoc]=gc[xLoc][yLoc]+10;dist[xLoc-1][yLoc]=gc[xLoc-1][yLoc]+hc[xLoc-1][yLoc];
				 tiles[xLoc-1][yLoc].state=tiles[xLoc][yLoc].state+'l';
				}
			}
		}
		if(xLoc>0&&yLoc<tileRowCount-1){
			if(tiles[xLoc-1][yLoc+1].state=='e'){
			 gc[xLoc-1][yLoc+1]=gc[xLoc][yLoc]+14;
			 dist[xLoc-1][yLoc+1]=gc[xLoc-1][yLoc+1]+hc[xLoc-1][yLoc+1];
			 tiles[xLoc-1][yLoc+1].state=tiles[xLoc][yLoc].state+'2';
			}
			else if(tiles[xLoc-1][yLoc+1].state!='w'&&ckd[xLoc-1][yLoc+1]==0){
				if(gc[xLoc][yLoc]+14<gc[xLoc-1][yLoc+1]){
				 gc[xLoc-1][yLoc+1]=gc[xLoc][yLoc]+14;dist[xLoc-1][yLoc+1]=gc[xLoc-1][yLoc+1]+hc[xLoc-1][yLoc+1];
				 tiles[xLoc-1][yLoc+1].state=tiles[xLoc][yLoc].state+'2';
				}
			}
		}
		if(yLoc>0){ 
			if(tiles[xLoc][yLoc-1].state=='e'){
			 gc[xLoc][yLoc-1]=gc[xLoc][yLoc]+10;
			 dist[xLoc][yLoc-1]=gc[xLoc][yLoc-1]+hc[xLoc][yLoc-1];
			 tiles[xLoc][yLoc-1].state=tiles[xLoc][yLoc].state+'u';
			}
			else if(tiles[xLoc][yLoc-1].state!='w'&&ckd[xLoc][yLoc-1]==0){
				if(gc[xLoc][yLoc]+10<gc[xLoc][yLoc-1]){
				 gc[xLoc][yLoc-1]=gc[xLoc][yLoc]+10;dist[xLoc][yLoc-1]=gc[xLoc][yLoc-1]+hc[xLoc][yLoc-1];
				 tiles[xLoc][yLoc-1].state=tiles[xLoc][yLoc].state+'u';
				}
			}
		}
		if(yLoc<tileRowCount-1){
			if(tiles[xLoc][yLoc+1].state=='e'){
			 gc[xLoc][yLoc+1]=gc[xLoc][yLoc]+10;
			 dist[xLoc][yLoc+1]=gc[xLoc][yLoc+1]+hc[xLoc][yLoc+1];
			 tiles[xLoc][yLoc+1].state=tiles[xLoc][yLoc].state+'d';
			}
			else if(tiles[xLoc][yLoc+1].state!='w'&&ckd[xLoc][yLoc+1]==0){
				if(gc[xLoc][yLoc]+10<gc[xLoc][yLoc+1]){
				 gc[xLoc][yLoc+1]=gc[xLoc][yLoc]+10;dist[xLoc][yLoc+1]=gc[xLoc][yLoc+1]+hc[xLoc][yLoc+1];
				 tiles[xLoc][yLoc+1].state=tiles[xLoc][yLoc].state+'d';
				}
			}
		}
		if(xLoc<tileColumnCount-1&&yLoc>0){
			if(tiles[xLoc+1][yLoc-1].state=='e'){
			 gc[xLoc+1][yLoc-1]=gc[xLoc][yLoc]+14;
			 dist[xLoc+1][yLoc-1]=gc[xLoc+1][yLoc-1]+hc[xLoc+1][yLoc-1];
			 tiles[xLoc+1][yLoc-1].state=tiles[xLoc][yLoc].state+'3';
			}
			else if(tiles[xLoc+1][yLoc-1].state!='w'&&ckd[xLoc+1][yLoc-1]==0){
				if(gc[xLoc][yLoc]+14<gc[xLoc+1][yLoc-1]){
				 gc[xLoc+1][yLoc-1]=gc[xLoc][yLoc]+14;dist[xLoc+1][yLoc-1]=gc[xLoc+1][yLoc-1]+hc[xLoc+1][yLoc-1];
				 tiles[xLoc+1][yLoc-1].state=tiles[xLoc][yLoc].state+'3';
				}
			}
		}
		if(xLoc<tileColumnCount-1){
			if(tiles[xLoc+1][yLoc].state=='e'){
			 gc[xLoc+1][yLoc]=gc[xLoc][yLoc]+10;
			 dist[xLoc+1][yLoc]=gc[xLoc+1][yLoc]+hc[xLoc+1][yLoc];
			 tiles[xLoc+1][yLoc].state=tiles[xLoc][yLoc].state+'r';
			}
			else if(tiles[xLoc+1][yLoc].state!='w'&&ckd[xLoc+1][yLoc]==0){
				if(gc[xLoc][yLoc]+10<gc[xLoc+1][yLoc]){
				 gc[xLoc+1][yLoc]=gc[xLoc][yLoc]+10;dist[xLoc+1][yLoc]=gc[xLoc+1][yLoc]+hc[xLoc+1][yLoc];
				 tiles[xLoc+1][yLoc].state=tiles[xLoc][yLoc].state+'r';
				}
			}
		}
		if(xLoc<tileColumnCount-1&&yLoc<tileRowCount-1){
			if(tiles[xLoc+1][yLoc+1].state=='e'){
			 gc[xLoc+1][yLoc+1]=gc[xLoc][yLoc]+14;
			 dist[xLoc+1][yLoc+1]=gc[xLoc+1][yLoc+1]+hc[xLoc+1][yLoc+1];
			 tiles[xLoc+1][yLoc+1].state=tiles[xLoc][yLoc].state+'4';
			}
			else if(tiles[xLoc+1][yLoc+1].state!='w'&&ckd[xLoc+1][yLoc+1]==0){
				if(gc[xLoc][yLoc]+14<gc[xLoc+1][yLoc+1]){
				 gc[xLoc+1][yLoc+1]=gc[xLoc][yLoc]+14;dist[xLoc+1][yLoc+1]=gc[xLoc+1][yLoc+1]+hc[xLoc+1][yLoc+1];
				 tiles[xLoc+1][yLoc+1].state=tiles[xLoc][yLoc].state+'4';
				}
			}
		}
		ckd[xLoc][yLoc]=1;
	}
	if(nos){output.innerHTML='nosolution';clearInterval(inter2);}
	else if(pathfound){
		clearInterval(inter2);
		output.innerHTML='solved';var path=tiles[xLoc][yLoc].state;
		var pathlength=path.length;var currX=0;var currY=0;
		for(var i=0;i<pathlength-1;i++){
			if(path.charAt(i+1)=='u'){currY-=1;}
			if(path.charAt(i+1)=='d'){currY+=1;}
			if(path.charAt(i+1)=='r'){currX+=1;}
			if(path.charAt(i+1)=='l'){currX-=1;}
			if(path.charAt(i+1)=='1'){currX-=1;currY-=1;}
			if(path.charAt(i+1)=='2'){currX-=1;currY+=1;}
			if(path.charAt(i+1)=='3'){currX+=1;currY-=1;}
			if(path.charAt(i+1)=='4'){currX+=1;currY+=1;}
			tiles[currX][currY].state='x';
		}
	}
}

function solveb(){
	pathfound=false;dist=[];ckd=[];
	for(c=0;c<tileColumnCount;c++){
		dist[c]=[];ckd[c]=[];
		for(r=0;r<tileRowCount;r++){
			dist[c][r]=INT_MAX;ckd[c][r]=0;
		}
	}
	dist[0][0]=0;nos=false;inter1=setInterval(solve2,150);
}
function solve2(){
	if(!nos&&!pathfound){
		var min=INT_MAX;nos=true;
		for(c=0;c<tileColumnCount;c++){
			for(r=0;r<tileRowCount;r++){
				if(dist[c][r]<min&&ckd[c][r]==0) {xLoc=c;yLoc=r;min=dist[c][r];nos=false;}
			}
		}
	}
	if(!nos){
		if(xLoc>0&&yLoc>0){ if(tiles[xLoc-1][yLoc-1].state=='f'){pathfound=true;}
		}
		if(xLoc>0){ if(tiles[xLoc-1][yLoc].state=='f'){pathfound=true;}
		}
		if(xLoc>0&&yLoc<tileRowCount-1){if(tiles[xLoc-1][yLoc+1].state=='f'){pathfound=true;}
		}
		if(yLoc>0){ if(tiles[xLoc][yLoc-1].state=='f'){pathfound=true;}
		}
		if(yLoc<tileRowCount-1){if(tiles[xLoc][yLoc+1].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1&&yLoc>0){if(tiles[xLoc+1][yLoc-1].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1){if(tiles[xLoc+1][yLoc].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1&&yLoc<tileRowCount-1){
			if(tiles[xLoc+1][yLoc+1].state=='f'){pathfound=true;}
		}
		ckd[xLoc][yLoc]=1;
	}
	if(!nos&&!pathfound){	
		if(xLoc>0&&yLoc>0){ 
			if(tiles[xLoc-1][yLoc-1].state=='e'){
			 dist[xLoc-1][yLoc-1]=dist[xLoc][yLoc]+14;
			 tiles[xLoc-1][yLoc-1].state=tiles[xLoc][yLoc].state+'1';
			}
			else if(tiles[xLoc-1][yLoc-1].state!='w'&&ckd[xLoc-1][yLoc-1]==0){
				if(dist[xLoc][yLoc]+14<dist[xLoc-1][yLoc-1])
				{dist[xLoc-1][yLoc-1]=dist[xLoc][yLoc]+14;tiles[xLoc-1][yLoc-1].state=tiles[xLoc][yLoc].state+'1';}
			}				
		}
		if(xLoc>0){
			if(tiles[xLoc-1][yLoc].state=='e'){
			 dist[xLoc-1][yLoc]=dist[xLoc][yLoc]+10;
			 tiles[xLoc-1][yLoc].state=tiles[xLoc][yLoc].state+'l';
			}
			else if(tiles[xLoc-1][yLoc].state!='w'&&ckd[xLoc-1][yLoc]==0){
				if(dist[xLoc][yLoc]+10<dist[xLoc-1][yLoc])
				{dist[xLoc-1][yLoc]=dist[xLoc][yLoc]+10;tiles[xLoc-1][yLoc].state=tiles[xLoc][yLoc].state+'l';}
			}
		}
		if(xLoc>0&&yLoc<tileRowCount-1){
			if(tiles[xLoc-1][yLoc+1].state=='e'){
			 dist[xLoc-1][yLoc+1]=dist[xLoc][yLoc]+14;
			 tiles[xLoc-1][yLoc+1].state=tiles[xLoc][yLoc].state+'2';
			}
			else if(tiles[xLoc-1][yLoc+1].state!='w'&&ckd[xLoc-1][yLoc+1]==0){
				if(dist[xLoc][yLoc]+14<dist[xLoc-1][yLoc+1])
				{dist[xLoc-1][yLoc+1]=dist[xLoc][yLoc]+14;tiles[xLoc-1][yLoc+1].state=tiles[xLoc][yLoc].state+'2';}
			}
		}
		if(yLoc>0){ 
			if(tiles[xLoc][yLoc-1].state=='e'){
			 dist[xLoc][yLoc-1]=dist[xLoc][yLoc]+10;
			 tiles[xLoc][yLoc-1].state=tiles[xLoc][yLoc].state+'u';
			}
			else if(tiles[xLoc][yLoc-1].state!='w'&&ckd[xLoc][yLoc-1]==0){
				if(dist[xLoc][yLoc]+10<dist[xLoc][yLoc-1])
				{dist[xLoc][yLoc-1]=dist[xLoc][yLoc]+10;tiles[xLoc][yLoc-1].state=tiles[xLoc][yLoc].state+'u';}
			}
		}
		if(yLoc<tileRowCount-1){
			if(tiles[xLoc][yLoc+1].state=='e'){
			 dist[xLoc][yLoc+1]=dist[xLoc][yLoc]+10;
			 tiles[xLoc][yLoc+1].state=tiles[xLoc][yLoc].state+'d';
			}
			else if(tiles[xLoc][yLoc+1].state!='w'&&ckd[xLoc][yLoc+1]==0){
				if(dist[xLoc][yLoc]+10<dist[xLoc][yLoc+1])
				{dist[xLoc][yLoc+1]=dist[xLoc][yLoc]+10;tiles[xLoc][yLoc+1].state=tiles[xLoc][yLoc].state+'d';}
			}
		}
		if(xLoc<tileColumnCount-1&&yLoc>0){
			if(tiles[xLoc+1][yLoc-1].state=='e'){
			 dist[xLoc+1][yLoc-1]=dist[xLoc][yLoc]+14;
			 tiles[xLoc+1][yLoc-1].state=tiles[xLoc][yLoc].state+'3';
			}
			else if(tiles[xLoc+1][yLoc-1].state!='w'&&ckd[xLoc+1][yLoc-1]==0){
				if(dist[xLoc][yLoc]+14<dist[xLoc+1][yLoc-1])
				{dist[xLoc+1][yLoc-1]=dist[xLoc][yLoc]+14;tiles[xLoc+1][yLoc-1].state=tiles[xLoc][yLoc].state+'3';}
			}
		}
		if(xLoc<tileColumnCount-1){
			if(tiles[xLoc+1][yLoc].state=='e'){
			 dist[xLoc+1][yLoc]=dist[xLoc][yLoc]+10;
			 tiles[xLoc+1][yLoc].state=tiles[xLoc][yLoc].state+'r';
			}
			else if(tiles[xLoc+1][yLoc].state!='w'&&ckd[xLoc+1][yLoc]==0){
				if(dist[xLoc][yLoc]+10<dist[xLoc+1][yLoc])
				{dist[xLoc+1][yLoc]=dist[xLoc][yLoc]+10;tiles[xLoc+1][yLoc].state=tiles[xLoc][yLoc].state+'r';}
			}
		}
		if(xLoc<tileColumnCount-1&&yLoc<tileRowCount-1){
			if(tiles[xLoc+1][yLoc+1].state=='e'){
			 dist[xLoc+1][yLoc+1]=dist[xLoc][yLoc]+14;
			 tiles[xLoc+1][yLoc+1].state=tiles[xLoc][yLoc].state+'4';
			}
			else if(tiles[xLoc+1][yLoc+1].state!='w'&&ckd[xLoc+1][yLoc+1]==0){
				if(dist[xLoc][yLoc]+14<dist[xLoc+1][yLoc+1])
				{dist[xLoc+1][yLoc+1]=dist[xLoc][yLoc]+14;tiles[xLoc+1][yLoc+1].state=tiles[xLoc][yLoc].state+'4';}
			}
		}
		ckd[xLoc][yLoc]=1;
	}
	if(nos){output.innerHTML='nosolution';clearInterval(inter1);}
	else if(pathfound){
		clearInterval(inter1);
		output.innerHTML='solved';var path=tiles[xLoc][yLoc].state;
		var pathlength=path.length;var currX=0;var currY=0;
		for(var i=0;i<pathlength-1;i++){
			if(path.charAt(i+1)=='u'){currY-=1;}
			if(path.charAt(i+1)=='d'){currY+=1;}
			if(path.charAt(i+1)=='r'){currX+=1;}
			if(path.charAt(i+1)=='l'){currX-=1;}
			if(path.charAt(i+1)=='1'){currX-=1;currY-=1;}
			if(path.charAt(i+1)=='2'){currX-=1;currY+=1;}
			if(path.charAt(i+1)=='3'){currX+=1;currY-=1;}
			if(path.charAt(i+1)=='4'){currX+=1;currY+=1;}
			tiles[currX][currY].state='x';
		}
	}
}

function solvea(){
	Xqueue=[0];Yqueue=[0];pathfound=false;
	inter=setInterval(solve1,150);
}

function solve1(){
	if(pathfound) {Xqueue.length=0;Yqueue.length=0;}
	if(Xqueue.length>0&&!pathfound){
		xLoc=Xqueue.shift();yLoc=Yqueue.shift();
		if(xLoc>0){
			if(tiles[xLoc-1][yLoc].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1){
			if(tiles[xLoc+1][yLoc].state=='f'){pathfound=true;}
		}
		if(yLoc>0){
			if(tiles[xLoc][yLoc-1].state=='f'){pathfound=true;}
		}
		if(yLoc<tileRowCount-1){
			if(tiles[xLoc][yLoc+1].state=='f'){pathfound=true;}
		}
		if(xLoc>0&&yLoc>0){
			if(tiles[xLoc-1][yLoc-1].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1&&yLoc>0){
			if(tiles[xLoc+1][yLoc-1].state=='f'){pathfound=true;}
		}
		if(xLoc>0&&yLoc<tileRowCount-1){
			if(tiles[xLoc-1][yLoc+1].state=='f'){pathfound=true;}
		}
		if(xLoc<tileColumnCount-1&&yLoc<tileRowCount-1){
			if(tiles[xLoc+1][yLoc+1].state=='f'){pathfound=true;}
		}
		if(xLoc>0){
			if(tiles[xLoc-1][yLoc].state=='e'){
				Xqueue.push(xLoc-1);Yqueue.push(yLoc);
				tiles[xLoc-1][yLoc].state=tiles[xLoc][yLoc].state+"l";
			}
		}
		if(xLoc<tileColumnCount-1){
			if(tiles[xLoc+1][yLoc].state=='e'){
				Xqueue.push(xLoc+1);Yqueue.push(yLoc);
				tiles[xLoc+1][yLoc].state=tiles[xLoc][yLoc].state+"r";
			}
		}
		if(yLoc>0){
			if(tiles[xLoc][yLoc-1].state=='e'){
				Xqueue.push(xLoc);Yqueue.push(yLoc-1);
				tiles[xLoc][yLoc-1].state=tiles[xLoc][yLoc-1].state+"u";
			}
		}
		if(yLoc<tileRowCount-1){
			if(tiles[xLoc][yLoc+1].state=='e'){
				Xqueue.push(xLoc);Yqueue.push(yLoc+1);
				tiles[xLoc][yLoc+1].state=tiles[xLoc][yLoc].state+"d";
			}
		}
		if(xLoc>0&yLoc>0){
			if(tiles[xLoc-1][yLoc-1].state=='e'){
				Xqueue.push(xLoc-1);Yqueue.push(yLoc-1);
				tiles[xLoc-1][yLoc-1].state=tiles[xLoc][yLoc].state+"1";
			}
		}
		if(xLoc>0&yLoc<tileRowCount-1){
			if(tiles[xLoc-1][yLoc+1].state=='e'){
				Xqueue.push(xLoc-1);Yqueue.push(yLoc+1);
				tiles[xLoc-1][yLoc+1].state=tiles[xLoc][yLoc].state+"2";
			}
		}
		if(xLoc<tileColumnCount-1&&yLoc>0){
			if(tiles[xLoc+1][yLoc-1].state=='e'){
				Xqueue.push(xLoc+1);Yqueue.push(yLoc-1);
				tiles[xLoc+1][yLoc-1].state=tiles[xLoc][yLoc-1].state+"3";
			}
		}
		if(xLoc<tileColumnCount-1&&yLoc<tileRowCount-1){
			if(tiles[xLoc+1][yLoc+1].state=='e'){
				Xqueue.push(xLoc+1);Yqueue.push(yLoc+1);
				tiles[xLoc+1][yLoc+1].state=tiles[xLoc][yLoc].state+"4";
			}
		}
		//console.log(Xqueue[Xqueue.length-1]+" "+Yqueue[Yqueue.length-1]);
	}
	if(Xqueue.length==0&&!pathfound){output.innerHTML='nosolution';clearInterval(inter);}
	else if(Xqueue.length==0&&pathfound){
		clearInterval(inter);//console.log("yo");
		output.innerHTML='solved';var path=tiles[xLoc][yLoc].state;
		
		var pathlength=path.length;var currX=0;var currY=0;
		for(var i=0;i<pathlength-1;i++){
				if(path.charAt(i+1)=='u'){currY-=1;}
				if(path.charAt(i+1)=='d'){currY+=1;}
				if(path.charAt(i+1)=='r'){currX+=1;}
				if(path.charAt(i+1)=='l'){currX-=1;}
				if(path.charAt(i+1)=='1'){currY-=1;currX-=1;}
				if(path.charAt(i+1)=='2'){currY+=1;currX-=1;}
				if(path.charAt(i+1)=='3'){currX+=1;currY-=1;}
				if(path.charAt(i+1)=='4'){currX+=1;currY+=1;}
				console.log(currX+" "+currY);tiles[currX][currY].state='x';
		}
	}
}
function solve(){
	document.getElementById('start').disabled=true;
	let algoselect=document.getElementById('algorithm_select');
	if(algoselect.value=='dfs') solvea();
	else if(algoselect.value=='dijkstra') solveb();
	else if(algoselect.value=='astar') solvec();
}
function reset(){
	clearInterval(inter,inter1,inter2);
	for(c=0;c<tileColumnCount;c++){
		//tiles[c]=[];
		for(r=0;r<tileRowCount;r++){
			if(tiles[c][r].state!='w') tiles[c][r]={x:c*(tileW+3),y:r*(tileH+3),state:'e'};
			//console.log(tiles[c][r].x+" "+tiles[c][r].y);
		}
	}
	tiles[0][0].state='s';tiles[tileColumnCount-1][tileRowCount-1].state='f';
	output.innerHTML='';document.getElementById('start').disabled=false;
}
function resetall(){
	clearInterval(inter,inter1,inter2);
	for(c=0;c<tileColumnCount;c++){
		//tiles[c]=[];
		for(r=0;r<tileRowCount;r++){
			tiles[c][r]={x:c*(tileW+3),y:r*(tileH+3),state:'e'};
			//console.log(tiles[c][r].x+" "+tiles[c][r].y);
		}
	}
	tiles[0][0].state='s';tiles[tileColumnCount-1][tileRowCount-1].state='f';
	output.innerHTML='';document.getElementById('start').disabled=false;
}
function init(){
	canvas=document.getElementById("myCanvas");ctx=canvas.getContext("2d");
	output=document.getElementById("outcome");
	return setInterval(draw,100);
}
function myMove(e){
	x=e.pageX-canvas.offsetLeft;y=e.pageY-canvas.offsetTop;
	//console.log(x+" "+y);
	for(c=0;c<tileColumnCount;c++){
		for(r=0;r<tileRowCount;r++){
			if(c*(tileW+3)<x&&x<c*(tileW+3)+tileW&&r*(tileH+3)<y&&y<r*(tileH+3)+tileH){
				//console.log(c+" "+r);
				if(tiles[c][r].state=='e'&&(c!=boundX||r!=boundY))
				{tiles[c][r].state='w';boundX=c;boundY=r;}
				else if(tiles[c][r].state=='w'&&(c!=boundX||r!=boundY))
				{tiles[c][r].state='e';boundX=c;boundY=r;}
			}
		}
	}
}
function myDown(e){
	canvas.onmousemove=myMove;
	x=e.pageX-canvas.offsetLeft;y=e.pageY-canvas.offsetTop;
	//console.log(x+" "+y);
	for(c=0;c<tileColumnCount;c++){
		for(r=0;r<tileRowCount;r++){
			if(c*(tileW+3)<x&&x<c*(tileW+3)+tileW&&r*(tileH+3)<y&&y<r*(tileH+3)+tileH){
				//console.log(c+" "+r);
				if(tiles[c][r].state=='e'){tiles[c][r].state='w';}
				else if(tiles[c][r].state=='w'){tiles[c][r].state='e';}
			}
		}
	}
}
function myUp(){
	canvas.onmousemove=null;
}
init();
canvas.onmousedown=myDown;
canvas.onmouseup=myUp;