/*MARCO SBAFFONI - 283934 - FINAL PROJECT - ETR 480
Project website: http://krelian87.github.io */

//global variables
var dom1D = INTERVALS(1)(32);
var dom2D = PROD1x1([INTERVALS(1)(32),INTERVALS(1)(32)]);
//var dom2D = PROD1x1([INTERVALS(1)(24),INTERVALS(1)(24)]);

var railLength=26;
var railGap = 4;
var railHeight = 1;
var railWidth = 0.5; 
var railsAngle = PI/3;
var crosspieceLength = railGap+1;
var crosspieceWidth = 2;

var trainLength = railLength;
var trainWidth = railGap;
var trainHeight = 4;
var etr450adjust = 0.8;

var col = [1.55,1.55,1.55];

//generate top of ETR480
function generateTop480(){
	var height = 0.9;
	var Su0 = BEZIER(S0)([[0,0,0],[trainLength-0.13,0,0]]);
	var Su1 = BEZIER(S0)([[0,trainWidth,0],[trainLength-0.13,trainWidth,0]]);
	var control2 = [[0,0,0],[0,0,height],[0,trainWidth,height],[0,trainWidth,0]];
	var Sv0 = BEZIER(S1)(control2);
	var control3 = [[trainLength-0.13,0,0],[trainLength-0.13,0,height],[trainLength-0.13,trainWidth,height],[trainLength-0.13,trainWidth,0]];
	var Sv1 = BEZIER(S1)(control3);
	var out = MAP(COONS_PATCH([Su0,Su1,Sv0,Sv1]))(dom2D);
	return STRUCT([T([0])([0.13]),out]);
}

//generate left and right side of the ETR480
function genLRS480(){
	var adjust = 0.4;
	var adjustBase = 0.15;
	var Su0 = BEZIER(S0)([[0,0,0],[0,trainHeight/3,0],[-adjust,trainHeight*2/3,0],[-adjustBase,trainHeight,0]]);
	var Su1 = BEZIER(S0)([[0,0,-trainLength],[0,trainHeight/3,-trainLength],[-adjust,trainHeight*2/3,-trainLength],[-adjustBase,trainHeight,-trainLength]]);
	var Sv0 = BEZIER(S1)([[0,0,0],[0,0,-trainLength]]);
	var Sv1 = BEZIER(S1)([[-adjustBase,trainHeight,0],[-adjustBase,trainHeight,-trainLength]]);
	var out1 = MAP(COONS_PATCH([Su0,Su1,Sv0,Sv1]))(dom2D);
	var sU0 = BEZIER(S0)([[trainWidth,0,0],[trainWidth,trainHeight/3,0],[trainWidth+adjust,trainHeight*2/3,0],[trainWidth+adjustBase,trainHeight,0]]);
	var sU1 = BEZIER(S0)([[trainWidth,0,-trainLength],[trainWidth,trainHeight/3,-trainLength],[trainWidth+adjust,trainHeight*2/3,-trainLength],[trainWidth+adjustBase,trainHeight,-trainLength]]);
	var sV0 = BEZIER(S1)([[trainWidth,0,0],[trainWidth,0,-trainLength]]);
	var sV1 = BEZIER(S1)([[trainWidth+adjustBase,trainHeight,0],[trainWidth+adjustBase,trainHeight,-trainLength]]);
	var out2 = MAP(COONS_PATCH([sU0,sU1,sV0,sV1]))(dom2D);
	var out = STRUCT([R([0,2])(PI),R([0,1])(PI/2),R([1,2])(PI/2),out1,out2]);
	return out;
}

//generate front side of ETR 480
function genFrontSide480(){
	var adjust = 0.4;
	var adjustBase = 0.15;
	var leng = 3;
	var height = 0.9;
	var etr480adjust = 0.8;
	var adj = 1.8;
	var cc0 = BEZIER(S0)([[0,0,-etr480adjust-0.08],[0,-height/2,-etr480adjust-0.08],[0,-height,-etr480adjust-0.08],[trainWidth,-height,-etr480adjust-0.08],[trainWidth,-height/2,-etr480adjust-0.08],[trainWidth,0,-etr480adjust-0.08]]);
	var c0 = BEZIER(S0)([[0,0,-etr480adjust],[0,0,-0.1],[trainWidth/2,0,height],[trainWidth,0,-0.1],[trainWidth,0,-etr480adjust]]);
	var c1 = BEZIER(S0)([[0,trainHeight/3,-etr480adjust],[0,trainHeight/3,-0.1],[trainWidth/2,trainHeight/3,1],[trainWidth,trainHeight/3,-0.1],[trainWidth,trainHeight/3,-etr480adjust]]);
	var c4 = BEZIER(S0)([[-adjust,trainHeight*2/3,-etr480adjust],[-adjust,trainHeight*2/3,leng+adj],[-adjust,trainHeight*2/3,leng+adj],[trainWidth/2,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,-etr480adjust]]);
	var c2 = BEZIER(S0)([[-adjust,trainHeight*3/4,-etr480adjust],[-adjust,trainHeight*3/4,leng],[-adjust,trainHeight*3/4,leng],[trainWidth/2,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,-etr480adjust]]);
	var c3 = BEZIER(S0)([[-adjustBase,trainHeight,-etr480adjust],[-adjustBase,trainHeight,-0.1],[trainWidth/2,trainHeight,1],[trainWidth+adjustBase,trainHeight,-0.1],[trainWidth+adjustBase,trainHeight,-etr480adjust]]);
	var out = MAP(BEZIER(S1)([cc0,cc0,cc0,c0,c4,c4,c2,c2,c3,c3,c3]))(dom2D);
	var outT = R([0,1])(PI/2)(out)
	out = R([0,2])(-PI/2)(outT)
	return out;
}

function generateWindshield480(){
	return COLOR(col)(STRUCT([T([0,1,2])([-2.8,0.45,-trainHeight/2+0.7]),R([0,2])(-PI/5),CUBOID([trainHeight*2/4,trainHeight*3/4])]));
}

function genWindshield480(){
	var height = 0.3;
	var Su0 = BEZIER(S0)([[0,0,0],[trainHeight*2/4,0,0]]);
	var Su1 = BEZIER(S0)([[0,trainHeight*3/4,0],[trainHeight*2/4,trainHeight*3/4,0]]);
	var control2 = [[0,0,0],[0,trainHeight*3/8,height],[0,trainHeight*3/4,0]];
	var Sv0 = BEZIER(S1)(control2);
	var control3 = [[trainHeight*2/4,0,0],[trainHeight*2/4,trainHeight*3/8,height],[trainHeight*2/4,trainHeight*3/4,0]];
	var Sv1 = BEZIER(S1)(control3);
	var out = MAP(COONS_PATCH([Su0,Su1,Sv0,Sv1]))(dom2D);
	return COLOR([1.71,2.05,2.55])(STRUCT([T([0,1,2])([-1.88,0.5,-0.8]),R([0,2])(-PI/5),out]));

}

//generate front door of ETR480
function generateFrontDoor480(){
	var c3 =BEZIER(S0)([[0,0,0.2],[0.4,0,0.2],[0.8,0,0.2],[0.4,0.3,0.2],[0.4,(trainHeight*2/3)-0.3,0],[0.4,(trainHeight*2/3)-0.2,0],[0.8,(trainHeight*2/3)-0.2,0.2],[0.4,(trainHeight*2/3),0.2],
						[0,(trainHeight*2/3)-0.2,0.2]]);
	var c4 =BEZIER(S0)([[0,0,0.2],[-0.4,0,0.2],[-0.8,0,0.2],[-0.4,0.3,0.2],[-0.4,(trainHeight*2/3)-0.3,0],[-0.4,(trainHeight*2/3)-0.2,0],[-0.8,(trainHeight*2/3)-0.2,0.2],[-0.4,(trainHeight*2/3),0.2],
						[0,(trainHeight*2/3)-0.2,0.2]]);
	var doorBase = MAP(BEZIER(S1)([c3,c4]))(dom2D);
	var door = STRUCT([T([0,1])([2,-0.4]),R([1,2])(-PI/2),doorBase]);
	return door;
}

//draw front doors for ETR 480
function generateFrontDoors480(){
	var front1 = generateFrontDoor480();
	var front2 = STRUCT([T([0,1])([4,trainWidth]),R([0,1])(PI),front1]);
	var frontDoors = COLOR([0.8,0.8,0.8])(STRUCT([T([2])([-0.9]),front1,front2]));
	return frontDoors;
}


//generate back door of ETR480
function generateBackDoor480(){
	var c1 =BEZIER(S0)([[0,0,0],[0.3,0,0],[0.3,0,0],[0.3,0.3,0],[0.3,trainHeight/4-0.3,0],[0.3,trainHeight/4,0],[0.3,trainHeight/4,0],
						[0,trainHeight/4,0]]);
	var c2 =BEZIER(S0)([[0,0,0],[-0.3,0,0],[-0.3,0,0],[-0.3,0.3,0],[-0.3,trainHeight/4-0.3,0],[-0.3,trainHeight/4,0],[-0.3,trainHeight/4,0],
						[0,trainHeight/4,0]]);
	var fin = COLOR([1.71,2.05,2.55])(MAP(BEZIER(S1)([c1,c2]))(dom2D));
	var c3 =BEZIER(S0)([[0,0,0.4],[0.7,0,0.4],[1.3,0,0.2],[0.7,0.3,0.3],[0.7,trainHeight-0.3,0.2],[0.7,trainHeight-0.2,-0.1],[1.3,trainHeight-0.2,0.2],[0.7,trainHeight,0.2],
						[0,trainHeight-0.2,0.2]]);
	var c4 =BEZIER(S0)([[0,0,0.4],[-0.7,0,0.4],[-1.3,0,0.2],[-0.7,0.3,0.3],[-0.7,trainHeight-0.3,0.2],[-0.7,trainHeight-0.2,-0.1],[-1.3,trainHeight-0.2,0.2],[-0.7,trainHeight,0.2],
						[0,trainHeight-0.2,0.2]]);
	var doorBase = COLOR([0.8,0.8,0.8])(MAP(BEZIER(S1)([c3,c4]))(dom2D));
	var doorTemp = STRUCT([doorBase,T([0,1,2])([0,1.43,0.22]),R([1,2])(-PI/40),fin]);
	var door = STRUCT([T([0,1])([1.8,-0.44]),R([1,2])(-PI/2),doorTemp]);
	return door;
}


//draw back doors for ETR 480
function generateBackDoors480(){
	var front1 = generateBackDoor480();
	var front2 = STRUCT([T([0,1])([4,trainWidth]),R([0,1])(PI),front1]);
	var frontDoors = STRUCT([front1,front2]);
	var backDoors =  STRUCT([T([0])([trainLength-4]),frontDoors]);
	return backDoors;
}


//generate a window of ETR 480
function generateWindow480(){
	var c1 =BEZIER(S0)([[0,0,0],[1.5,0,0],[2,0,0],[1.5,0.5,0],[1.5,trainHeight/3-0.5,0],[1.5,trainHeight/3,0],[2,trainHeight/3,0],
						[0,trainHeight/3,0]]);
	var c2 =BEZIER(S0)([[0,0,0],[-1.5,0,0],[-2,0,0],[-1.5,0.5,0],[-1.5,trainHeight/3-0.5,0],[-1.5,trainHeight/3,0],[-2,trainHeight/3,0],
						[0,trainHeight/3,0]]);
	var temp = MAP(BEZIER(S1)([c1,c2]))(dom2D);
	var out = COLOR([1.71,2.05,2.55])(STRUCT([T([1])([0.29]),R([1,2])(-PI/30),T([0,1,2])([2,-0.3,-trainHeight/2-0.65]),R([1,2])(PI/2),temp]));
	return out;
}

//generate lateral windows of ETR 480
function generateWindowsLRS480(){
	var base = generateWindow480();
	var left = STRUCT([T([0])([3.7]),base,T([0])([3.7]),base,T([0])([3.7]),base,T([0])([3.7]),base,T([0])([3.7]),base]);
	var right = STRUCT([T([0,1,2])([trainLength-0.5,trainWidth,0.3]),R([0,1])(-PI),left]);
	var rightLiv = STRUCT([T([0,1,2])([-0.37,trainWidth-0.06,0.3]),R([1,2])(PI/30),R([1,2])(PI/30),generateLatRLivery480(),T([1])([0.08]),left]);
	var out = STRUCT([generateLatLivery480(),left,rightLiv]);
	return out;
}

//draw the bottom of ETR480
function generateBottom480(){
	var p1 = COLOR([0,0,0])(STRUCT([T([0,1,2])([-0.19,trainWidth+0.1,-trainHeight]),R([0,1])(-PI/2),
		CUBOID([trainWidth+0.15,trainLength+0.18])]));
	var p2 = function(){
		var adjust = 0.85;
		var adjustBase = 0.25;
		var c1 = BEZIER(S0)([[-adjustBase+0.2,trainHeight,-etr450adjust-0.3],[-adjustBase,trainHeight,-0.2],
			[trainWidth/2,trainHeight,1.8],[trainWidth+adjustBase,trainHeight,-0.2],
			[trainWidth+adjustBase-0.2,trainHeight,-etr450adjust-0.3]]);

		var c2 = BEZIER(S0)([[-adjustBase+0.2,trainHeight,-etr450adjust-0.3-1],[-adjustBase,trainHeight+0.5,-0.2-0.5],
			[trainWidth/2,trainHeight+1,0.8],[trainWidth+adjustBase,trainHeight+0.5,-0.2-0.5],
			[trainWidth+adjustBase-0.2,trainHeight,-etr450adjust-0.3-1]]);

		var c3 = BEZIER(S0)([[-adjustBase+0.2,trainHeight,-etr450adjust-0.3-1],[-adjustBase,trainHeight+0.5,-0.2-0.5],
			[trainWidth/2,trainHeight+1,2.5],[trainWidth+adjustBase,trainHeight+0.5,-0.2-0.5],
			[trainWidth+adjustBase-0.2,trainHeight,-etr450adjust-0.3-1]]);

		var out = MAP(BEZIER(S1)([c1,c2,c3]))(dom2D);

		return COLOR([0.5,0.5,0.5])(STRUCT([T([0,1,2])([-2.2,trainWidth,-trainHeight*2]),R([0,1])(-PI/2),R([1,2])(PI/2),out]));

	};
	return STRUCT([p1,p2()]);
}

//generate a wheel for the train
function generateWheel480(){
	var thick1 = railWidth/8;
	var thick2 = (railWidth/8)*6;
	var w1 = DISK(0.6)(24);
	var w2 = DISK(0.4)(24);
	var w3 = EXTRUDE([thick1])(w1);
	var w4 = EXTRUDE([thick2])(w2);
	return STRUCT([w3,w4]);
}

//draw wheels of ETR480
function generateWheels480(){
	var distance = 1.7;
	var w1 = generateWheel480();
	var w2 = T([0])([distance])(w1);
	var cylB = DISK(0.08)(16);
	var cyl = EXTRUDE([distance])(cylB);
	var side1Temp = STRUCT([T([1,2])([-0.15,-0.3]),w1,w2,T([2])([railWidth]),R([0,2])(PI/2),cyl]);
	var side1 = STRUCT([R([1,2])(PI/2),side1Temp]);
	var side2 = STRUCT([T([0,1,2])([0,trainWidth+0.07,-0.25]),R([1,2])(PI),side1]);
	var front = STRUCT([T([0,2])([3.5,-trainHeight]),side1,side2]);
	return COLOR([0.3,0.3,0.3])(STRUCT([front,T([0])([trainLength-10.5]),front]));
}

//generate lateral livery
function generateLatLivery480(){
	var c1 =BEZIER(S0)([[0,0,0],[1.7,0,0],[2.2,0,0],[1.7,0.5,0],[1.7,trainHeight/3-0.5,0],[1.7,trainHeight/3+0.2,0],[2.2,trainHeight/3+0.2,0],
						[0,trainHeight/3+0.2,0]]);
	var c2 =BEZIER(S0)([[0,0,0],[-1.7,0,0],[-2.2,0,0],[-1.7,0.5,0],[-1.7,trainHeight/3-0.5,0],[-1.7,trainHeight/3+0.2,0],[-2.2,trainHeight/3+0.2,0],
						[0,trainHeight/3+0.2,0]]);
	var temp = MAP(BEZIER(S1)([c1,c2]))(dom2D);
	var out1 = COLOR([0.5,0.5,0.5])(temp);
	var extra = COLOR([0.5,0.5,0.5])(CUBOID([trainLength-6.3,trainHeight/3+0.2]));
	var out = STRUCT([T([0,1,2])([3.5,0.03,-0.1]),T([1])([0.29]),R([1,2])(-PI/30),T([0,1,2])([2,-0.3,-trainHeight/2-0.65]),R([1,2])(PI/2),out1,T([0])([0.8]),extra]);
	return out;
}

//generate lateral (right) livery with a little correction
function generateLatRLivery480(){
	var c1 =BEZIER(S0)([[0,0,0],[1.7,0,0],[2.2,0,0],[1.7,0.5,0],[1.7,trainHeight/3-0.5,0],[1.7,trainHeight/3+0.2,0],[2.2,trainHeight/3+0.2,0],
						[0,trainHeight/3+0.2,0]]);
	var c2 =BEZIER(S0)([[0,0,0],[-1.7,0,0],[-2.2,0,0],[-1.7,0.5,0],[-1.7,trainHeight/3-0.5,0],[-1.7,trainHeight/3+0.2,0],[-2.2,trainHeight/3+0.2,0],
						[0,trainHeight/3+0.2,0]]);
	var temp = MAP(BEZIER(S1)([c1,c2]))(dom2D);
	var out1 = COLOR([0.5,0.5,0.5])(temp);
	var extra = COLOR([0.5,0.5,0.5])(CUBOID([trainLength-5.9,trainHeight/3+0.2]));
	var out = STRUCT([T([0,1,2])([3.5,0.03,-0.1]),T([1])([0.29]),R([1,2])(-PI/30),T([0,1,2])([2,-0.3,-trainHeight/2-0.65]),R([1,2])(PI/2),out1,T([0])([0.8]),extra]);
	return out;
}

function generateFrontLivery480(){
	var adjust = 0.3;
	var adjustBase = 0.15;
	var leng = 2.13;
	var height = 0.9;
	var etr480adjust = 0.8;
	var adj = 2.9;
	var cc0 = BEZIER(S0)([[0,0,-etr480adjust-0.08],[0,-height/2,-etr480adjust-0.08],[0,-height,-etr480adjust-0.08],[trainWidth,-height,-etr480adjust-0.08],[trainWidth,-height/2,-etr480adjust-0.08],[trainWidth,0,-etr480adjust-0.08]]);
	var c0 = BEZIER(S0)([[0,0,-etr480adjust],[0,0,-0.1],[trainWidth/2,0,height],[trainWidth,0,-0.1],[trainWidth,0,-etr480adjust]]);
	var c1 = BEZIER(S0)([[0,trainHeight/3,-etr480adjust],[0,trainHeight/3,-0.1],[trainWidth/2,trainHeight/3,1],[trainWidth,trainHeight/3,-0.1],[trainWidth,trainHeight/3,-etr480adjust]]);
	var c4 = BEZIER(S0)([[-adjust,trainHeight*2/3,-etr480adjust],[-adjust,trainHeight*2/3,leng+adj],[-adjust,trainHeight*2/3,leng+adj],[trainWidth/2,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,-etr480adjust]]);
	var c2 = BEZIER(S0)([[-adjust,trainHeight*3/4,-etr480adjust],[-adjust,trainHeight*3/4,leng],[-adjust,trainHeight*3/4,leng],[trainWidth/2,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,-etr480adjust]]);
	var c3 = BEZIER(S0)([[-adjustBase,trainHeight,-etr480adjust],[-adjustBase,trainHeight,-0.1],[trainWidth/2,trainHeight,1],[trainWidth+adjustBase,trainHeight,-0.1],[trainWidth+adjustBase,trainHeight,-etr480adjust]]);
	var out = MAP(BEZIER(S1)([cc0,cc0,cc0,c0,c4,c4,c2,c2,c3,c3,c3]))(dom2D);
	var outT = R([0,1])(PI/2)(out);
	out = R([0,2])(-PI/2)(outT);
	return COLOR([0.5,0.5,0.5])(STRUCT([T([0])([-etr450adjust+0.1]),out]));
}

function generateFrontRedLivery480(){
	var adjust = 0.38;
	var adjustBase = 0.23;
	var leng = 2.19;
	var height = 0.9;
	var etr480adjust = 0.9;
	var adj = 2.9;
	var cc0 = BEZIER(S0)([[0,0,-etr480adjust-0.08],[0,-height/2,-etr480adjust-0.08],[0,-height,-etr480adjust-0.08],[trainWidth,-height,-etr480adjust-0.08],[trainWidth,-height/2,-etr480adjust-0.08],[trainWidth,0,-etr480adjust-0.08]]);
	var c0 = BEZIER(S0)([[0,0,-etr480adjust],[0,0,-0.1],[trainWidth/2,0,height],[trainWidth,0,-0.1],[trainWidth,0,-etr480adjust]]);
	var c1 = BEZIER(S0)([[0,trainHeight/3,-etr480adjust],[0,trainHeight/3,-0.1],[trainWidth/2,trainHeight/3,1],[trainWidth,trainHeight/3,-0.1],[trainWidth,trainHeight/3,-etr480adjust]]);
	var c4 = BEZIER(S0)([[-adjust,trainHeight*2/3,-etr480adjust-0.02],[-adjust,trainHeight*2/3,leng+adj],[-adjust,trainHeight*2/3,leng+adj],[trainWidth/2,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,-etr480adjust-0.02]]);
	var c2 = BEZIER(S0)([[-adjust,trainHeight*3/4,-etr480adjust],[-adjust,trainHeight*3/4,leng],[-adjust,trainHeight*3/4,leng],[trainWidth/2,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,-etr480adjust]]);
	var c3 = BEZIER(S0)([[-adjustBase+0.1,trainHeight,-etr480adjust],[-adjustBase+0.1,trainHeight,-0.1],[trainWidth/2,trainHeight,1],[trainWidth+adjustBase,trainHeight,-0.1],[trainWidth+adjustBase-0.1,trainHeight,-etr480adjust]]);
	var out = MAP(BEZIER(S1)([cc0,cc0,cc0,c0,c4,c4,c2,c2,c3,c3,c3]))(dom2D);
	var outT = R([0,1])(PI/2)(out);
	out = R([0,2])(-PI/2)(outT);
	return COLOR([0.7,0,0])(STRUCT([T([0])([-etr450adjust+0.1]),out]));
}

function generateBack480(){
	var height = 0.9;
	var adjust = 0.4;
	var adjustBase = 0.15;
	var Su0 = BEZIER(S0)([[0,0,0],[-0.2,trainHeight/3,0],[-adjust-1,trainHeight*2/3,0],[-adjustBase-1,trainHeight,0]]);
	var Su1 = BEZIER(S0)([[trainWidth,0,0],[trainWidth+0.1,trainHeight/3,0],[trainWidth+adjust,trainHeight*2/3,0],[trainWidth+adjustBase,trainHeight,0]]);
	var Sv0 = BEZIER(S1)([[0,0,0],[0,-height,0],[trainWidth,-height,0],[trainWidth,0,0]]);
	var Sv1 = BEZIER(S1)([[-0.1,trainHeight,0],[0,trainHeight,0],[trainWidth,trainHeight,0],[trainWidth,trainHeight,0]]);
	var out = MAP(COONS_PATCH([Su0,Su1,Sv0,Sv1]))(dom2D);
	return STRUCT([T([0])([trainLength]),R([0,1])(PI/2),R([1,2])(-PI/2),out]);

}

//draw the entire model of ETR 480
function drawModel480(){
	part1 = COLOR([0.5,0.5,0.5])(generateTop480());
	part2 = genLRS480();
	part3 = (STRUCT([T([0])([-etr450adjust+0.1])(genFrontSide480())]));
	part4 = genWindshield480();
	part5 = generateFrontDoors480();
	part6 = generateBackDoors480();
	part7 = generateWindowsLRS480();
	part8 = generateBottom480();
	part9 = generateWheels480();
	part10 = generateFrontLivery480();
	part11 = generateFrontRedLivery480();
	part12 = generateBack480();
	out = STRUCT([part1,part2,part3,part4,part5,part6,part7,part8,part9,part10,part11,part12]);
	return out;
}
