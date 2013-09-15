/*MARCO SBAFFONI - 283934 - FINAL PROJECT - ETR 450
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

/* #### ETR 450 #### */

//generate top of ETR450
function generateTop450(){
	var height = 1.2;
	var Su0 = BEZIER(S0)([[0,0,0],[trainLength,0,0]]);
	var Su1 = BEZIER(S0)([[0,trainWidth,0],[trainLength,trainWidth,0]]);
	var control2 = [[0,0,0],[0,0,height],[0,trainWidth,height],[0,trainWidth,0]];
	var Sv0 = BEZIER(S1)(control2);
	var control3 = [[trainLength,0,0],[trainLength,0,height],[trainLength,trainWidth,height],[trainLength,trainWidth,0]];
	var Sv1 = BEZIER(S1)(control3);
	var out = MAP(COONS_PATCH([Su0,Su1,Sv0,Sv1]))(dom2D);
	return out;
}

//generate left and right side of the ETR450
function genLRS450(){
	var adjust = 0.85;
	var adjustBase = 0.25;
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

function genRedSide(){
	var adjust = 0.85;
	var adjustBase = -0.36;
	var Su0 = BEZIER(S0)([[-adjustBase,0,0],[-adjustBase,trainHeight/3,0],[-adjust,trainHeight*2/3,0],[-adjustBase,trainHeight,0]]);
	var Su1 = BEZIER(S0)([[-adjustBase,0,-trainLength],[-adjustBase,trainHeight/3,-trainLength],[-adjust,trainHeight*2/3,-trainLength],[-adjustBase,trainHeight,-trainLength]]);
	var Sv0 = BEZIER(S1)([[0.36,0,0],[-adjustBase,0,-trainLength]]);
	var Sv1 = BEZIER(S1)([[0.36,trainHeight,0],[0.36,trainHeight,-trainLength]]);
	var out1 = MAP(COONS_PATCH([Su0,Su1,Sv0,Sv1]))(dom2D);
	var sU0 = BEZIER(S0)([[trainWidth-adjustBase-0.4,0,0],[trainWidth-adjustBase-0.1,trainHeight/3,0],[trainWidth+adjust+0.4,trainHeight*2/3,0],[trainWidth-adjustBase-0.4,trainHeight,0]]);
	var sU1 = BEZIER(S0)([[trainWidth-adjustBase-0.4,0,-trainLength],[trainWidth-adjustBase-0.1,trainHeight/3,-trainLength],[trainWidth+adjust+0.4,trainHeight*2/3,-trainLength],[trainWidth-adjustBase-0.4,trainHeight,-trainLength]]);
	var sV0 = BEZIER(S1)([[trainWidth-adjustBase-0.4,0,0],[trainWidth-adjustBase-0.4,0,-trainLength]]);
	var sV1 = BEZIER(S1)([[trainWidth-adjustBase-0.4,trainHeight,0],[trainWidth-adjustBase-0.4,trainHeight,-trainLength]]);
	var out2 = MAP(COONS_PATCH([sU0,sU1,sV0,sV1]))(dom2D);
	var out = COLOR([1,0,0])(STRUCT([T([1,2])([-0.3,0.05]),R([0,2])(PI),R([0,1])(PI/2),R([1,2])(PI/2),out1,T([0])([0.18]),out2]));
	return out;	
}

//generate the front side of the ETR450
function genFrontSide450(){
	var adjust = 0.85;
	var adjustBase = 0.25;
	var cc0 = BEZIER(S0)([[0,0,-etr450adjust],[0,0,-etr450adjust],[0,-1.5,-etr450adjust],[trainWidth,-1.5,-etr450adjust],[trainWidth,0,-etr450adjust],[trainWidth,0,-etr450adjust]]);
	var c0 = BEZIER(S0)([[0,0,-etr450adjust],[0,0,-0.1],[trainWidth/2,0,2],[trainWidth,0,-0.1],[trainWidth,0,-etr450adjust]]);
	var c1 = BEZIER(S0)([[0,trainHeight/3,-etr450adjust],[0,trainHeight/3,-0.1],[trainWidth/2,trainHeight/3,1],[trainWidth,trainHeight/3,-0.1],[trainWidth,trainHeight/3,-etr450adjust]]);
	var c2 = BEZIER(S0)([[-adjust,trainHeight*2/3,-etr450adjust],[-adjust,trainHeight*2/3,-0.1],[trainWidth/2,trainHeight*2/3,16],[trainWidth+adjust,trainHeight*2/3,-0.1],[trainWidth+adjust,trainHeight*2/3,-etr450adjust]]);
	var c3 = BEZIER(S0)([[-adjustBase,trainHeight,-etr450adjust],[-adjustBase,trainHeight,-0.1],[trainWidth/2,trainHeight,1],[trainWidth+adjustBase,trainHeight,-0.1],[trainWidth+adjustBase,trainHeight,-etr450adjust]]);
	var out = MAP(BEZIER(S1)([cc0,c0,c1,c2,c3]))(dom2D);
	var outT = R([0,1])(PI/2)(out)
	out = R([0,2])(-PI/2)(outT)
	return out;
}

function redBandF450(){
	var adjust = 0.85;
	var adjustBase = 0.25;
	var c0 = BEZIER(S0)([[-0.1,0,-etr450adjust],[0,0,-0.1],[trainWidth/2,0,2],[trainWidth,0,-0.1],[trainWidth+0.1,0,-etr450adjust]]);
	var c1 = BEZIER(S0)([[-adjustBase+0.01,trainHeight/3,-etr450adjust-0.5],[0,trainHeight/3,0],[trainWidth/2,trainHeight/3,3.5],[trainWidth,trainHeight/3,-0.1],[trainWidth+adjustBase-0.01,trainHeight/3,-etr450adjust-0.5]]);
	var c2 = BEZIER(S0)([[-adjust,trainHeight*2/3,-etr450adjust-0.5],[-adjust,trainHeight*2/3,-0.1],[trainWidth/2,trainHeight*2/3,11.5],[trainWidth+adjust,trainHeight*2/3,-0.1],[trainWidth+adjust,trainHeight*2/3,-etr450adjust-0.5]]);
	var c3 = BEZIER(S0)([[-adjustBase+0.2,trainHeight,-etr450adjust-0.3],[-adjustBase,trainHeight,-0.2],[trainWidth/2,trainHeight,0.5],[trainWidth+adjustBase,trainHeight,-0.2],[trainWidth+adjustBase-0.2,trainHeight,-etr450adjust-0.3]]);
	var out = MAP(BEZIER(S1)([c1,c1,c1,c1,c2,c2,c3,c3,c3]))(dom2D);
	var outT = R([0,1])(PI/2)(out);
	out = R([0,2])(-PI/2)(outT);
	return out;
}

//generate a window of ETR 450
function generateWindow450(){
	var c1 =BEZIER(S0)([[0,0,0],[1.5,0,0],[1.5,0,0],[1.5,0.5,0],[1.5,trainHeight/3-0.5,0],[1.5,trainHeight/3,0],[1.5,trainHeight/3,0],
						[0,trainHeight/3,0]]);
	var c2 =BEZIER(S0)([[0,0,0],[-1.5,0,0],[-1.5,0,0],[-1.5,0.5,0],[-1.5,trainHeight/3-0.5,0],[-1.5,trainHeight/3,0],[-1.5,trainHeight/3,0],
						[0,trainHeight/3,0]]);
	var temp = MAP(BEZIER(S1)([c1,c2]))(dom2D);
	var out = COLOR([1.71,2.05,2.55])(STRUCT([T([1])([0.29]),R([1,2])(-PI/16),T([0,1,2])([2,-0.3,-trainHeight/2-0.65]),R([1,2])(PI/2),temp]));
	return out;
}

//generate lateral windows of ETR 450
function generateWindowsLRS450(){
	var base = generateWindow450();
	var left = STRUCT([T([0])([3.5]),base,T([0])([3.5]),base,T([0])([3.5]),base,T([0])([3.5]),base,T([0])([3.5]),base]);
	var right = STRUCT([T([0,1,2])([trainLength-1,trainWidth,0.3]),R([0,1])(-PI),left]);
	var out = STRUCT([left,right]);
	return out;
}

//function generate door of ETR450
function generateDoor450(){
	var c1 =BEZIER(S0)([[0,0,0],[0.3,0,0],[0.3,0,0],[0.3,0.3,0],[0.3,trainHeight/4-0.3,0],[0.3,trainHeight/4,0],[0.3,trainHeight/4,0],
						[0,trainHeight/4,0]]);
	var c2 =BEZIER(S0)([[0,0,0],[-0.3,0,0],[-0.3,0,0],[-0.3,0.3,0],[-0.3,trainHeight/4-0.3,0],[-0.3,trainHeight/4,0],[-0.3,trainHeight/4,0],
						[0,trainHeight/4,0]]);
	var fin = COLOR([1.71,2.05,2.55])(MAP(BEZIER(S1)([c1,c2]))(dom2D));
	var c3 =BEZIER(S0)([[0,0,0.7],[0.7,0,0.7],[1.3,0,0.7],[0.7,0.3,0.3],[0.7,trainHeight-0.3,0],[0.7,trainHeight-0.2,0],[1.3,trainHeight-0.2,0.4],[0.7,trainHeight,0.4],
						[0,trainHeight-0.2,0.4]]);
	var c4 =BEZIER(S0)([[0,0,0.7],[-0.7,0,0.7],[-1.3,0,0.7],[-0.7,0.3,0.3],[-0.7,trainHeight-0.3,0],[-0.7,trainHeight-0.2,0],[-1.3,trainHeight-0.2,0.4],[-0.7,trainHeight,0.4],
						[0,trainHeight-0.2,0.4]]);
	var doorBase = COLOR(col)(MAP(BEZIER(S1)([c3,c4]))(dom2D));
	var doorTemp = STRUCT([doorBase,T([0,1,2])([0,1.2,0.35]),R([1,2])(-PI/20),fin]);
	var door = STRUCT([T([0,1])([2,-0.7]),R([1,2])(-PI/2),doorTemp]);
	return door;
}

//draw four doors for ETR450
function generateDoors450(){
	var front1 = generateDoor450();
	var front2 = STRUCT([T([0,1])([4,trainWidth+0.05]),R([0,1])(PI),front1]);
	var frontDoors = STRUCT([front1,front2]);
	var backDoors = STRUCT([T([0])([trainLength-4]),frontDoors]);
	var doors = STRUCT([frontDoors,backDoors]);
	return doors;
}

//generate a wheel for the train
function generateWheel450(){
	var thick1 = railWidth/8;
	var thick2 = (railWidth/8)*6;
	var w1 = DISK(0.8)(32);
	var w2 = DISK(0.6)(16);
	var w3 = EXTRUDE([thick1])(w1);
	var w4 = EXTRUDE([thick2])(w2);
	return STRUCT([w3,w4]);
}

//draw wheels of ETR450
function generateWheels450(){
	var distance = 2.5;
	var w1 = generateWheel450();
	var w2 = T([0])([distance])(w1);
	var cylB = DISK(0.1)(16);
	var cyl = EXTRUDE([distance])(cylB);
	var side1Temp = STRUCT([T([1])([0.25]),w1,w2,T([2])([railWidth]),R([0,2])(PI/2),cyl]);
	var side1 = STRUCT([R([1,2])(PI/2),side1Temp]);
	var side2 = STRUCT([T([0,1])([0,trainWidth-0.2]),R([1,2])(PI),side1]);
	var front = STRUCT([T([0,2])([3.5,-trainHeight]),side1,side2]);
	return COLOR([0.3,0.3,0.3])(STRUCT([front,T([0])([trainLength-10.5]),front]));
}

//draw the bottom of ETR450
function generateBottom450(){
	var p1 = COLOR([0,0,0])(STRUCT([T([0,1,2])([-0.3,trainWidth-0.1,-trainHeight]),R([0,1])(-PI/2),
		CUBOID([trainWidth-0.1,trainLength+0.3])]));
	var p2 = function(){
		var adjust = 0.85;
		var adjustBase = 0.25;
		var c1 = BEZIER(S0)([[-adjustBase+0.2,trainHeight,-etr450adjust-0.3],[-adjustBase,trainHeight,-0.2],
			[trainWidth/2,trainHeight,0.5],[trainWidth+adjustBase,trainHeight,-0.2],
			[trainWidth+adjustBase-0.2,trainHeight,-etr450adjust-0.3]]);
		var c2 = BEZIER(S0)([[-adjustBase+0.2,trainHeight,-etr450adjust-0.3-1],[-adjustBase,trainHeight+0.5,-0.2-0.5],
			[trainWidth/2,trainHeight+1,1.2],[trainWidth+adjustBase,trainHeight+0.5,-0.2-0.5],
			[trainWidth+adjustBase-0.2,trainHeight,-etr450adjust-0.3-1]]);
		var out = MAP(BEZIER(S1)([c1,c2]))(dom2D);
		return COLOR(col)(STRUCT([T([0,1,2])([-2.2,trainWidth,-trainHeight*2]),R([0,1])(-PI/2),R([1,2])(PI/2),out]));
	};
	return STRUCT([p1,p2()]);
}

//draw back part of ETR450
function generateBack450(){
	var height = 1.2;
	var adjust = 0.85;
	var adjustBase = 0.25;
	var Su0 = BEZIER(S0)([[0,0,0],[-0.2,trainHeight/3,0],[-adjust-1,trainHeight*2/3,0],[-adjustBase-1,trainHeight,0]]);
	var Su1 = BEZIER(S0)([[trainWidth,0,0],[trainWidth+0.1,trainHeight/3,0],[trainWidth+adjust,trainHeight*2/3,0],[trainWidth+adjustBase,trainHeight,0]]);
	var Sv0 = BEZIER(S1)([[0,0,0],[0,-height,0],[trainWidth,-height,0],[trainWidth,0,0]]);
	var Sv1 = BEZIER(S1)([[-0.1,trainHeight,0],[0,trainHeight,0],[trainWidth,trainHeight,0],[trainWidth,trainHeight,0]]);
	var out = MAP(COONS_PATCH([Su0,Su1,Sv0,Sv1]))(dom2D);
	return STRUCT([T([0])([trainLength]),R([0,1])(PI/2),R([1,2])(-PI/2),out]);

}

//draw windshield of ETR450
function generateWindshield450(){
	var p1=function(){
		var c1 =BEZIER(S0)([[0,0,0],[0.7,0,0.02],[0.7,0,0.02],[0.7,0.7,0.02],[0.7,trainHeight/3-0.7,0.02],[0.7,trainHeight/3,0.02],[0.7,trainHeight/3,0.02],
							[0,trainHeight/3,0]]);
		var c2 =BEZIER(S0)([[0,0,0],[-0.7,0,0.02],[-0.7,0,0.02],[-0.7,0.7,0.02],[-0.7,trainHeight/3-0.7,0.02],[-0.7,trainHeight/3,0.02],[-0.7,trainHeight/3,0.02],
							[0,trainHeight/3,0]]);
		var fin = COLOR([1.71,2.05,2.55])(MAP(BEZIER(S1)([c1,c2]))(dom2D));
		return STRUCT([R([0,2])(PI/4),T([0,1,2])([-0.65,trainWidth/2,-0.17]),R([0,1])(PI/2),R([1,2])(-PI/2),fin]);};
	var lat1 = function(){
		var c1 =BEZIER(S0)([[0,0,0],[0.5,0,0.02],[0.5,0,0.02],[0.5,0.5,0.02],[0.5,trainHeight/3-0.5,0.02],[0.5,trainHeight/3-0.1,0.02],[0.5,trainHeight/3-0.1,0.02],
							[0,trainHeight/3-0.1,0]]);
		var c2 =BEZIER(S0)([[0,0,0],[-0.5,0,0.02],[-0.5,0,0.02],[-0.5,0.5,0.02],[-0.5,trainHeight/3-0.5,0.02],[-0.5,trainHeight/3-0.1,0.02],[-0.5,trainHeight/3-0.1,0.02],
						[0,trainHeight/3-0.1,0]]);
		var fin = COLOR([1.71,2.05,2.55])(MAP(BEZIER(S1)([c1,c2]))(dom2D));
		var out = COLOR([1.71,2.05,2.55])(STRUCT([R([0,2])(PI/5),T([0,1,2])([-0.52,trainWidth/2+1.28,-0.1]),R([0,1])(-PI/7),R([0,1])(PI/2),R([1,2])(PI*3/2),fin]));
		return out;};
	var lat2 = function(){	
		var c1 =BEZIER(S0)([[0,0,0],[0.5,0,0.02],[0.5,0,0.02],[0.5,0.5,0.02],[0.5,trainHeight/3-0.5,0.02],[0.5,trainHeight/3-0.1,0.02],
							[0.5,trainHeight/3-0.1,0.02],[0,trainHeight/3-0.1,0]]);
		var c2 =BEZIER(S0)([[0,0,0],[-0.5,0,0.02],[-0.5,0,0.02],[-0.5,0.5,0.02],[-0.5,trainHeight/3-0.5,0.02],
			[-0.5,trainHeight/3-0.1,0.02],[-0.5,trainHeight/3-0.1,0.02],[0,trainHeight/3-0.1,0]]);
		var fin = COLOR([1.71,2.05,2.55])(MAP(BEZIER(S1)([c1,c2]))(dom2D));
		var out = COLOR([1.71,2.05,2.55])(STRUCT([R([0,2])(PI/5),T([0,1,2])([-0.52,trainWidth/2-1.28,-0.1]),R([0,1])(PI/7),R([0,1])(PI/2),R([1,2])(PI*3/2),fin]));
		return out;};
	return STRUCT([p1(),lat1(),lat2()]);
}

//draw the entire model of ETR 450
function drawModel450(){
	part1 =  COLOR([1,1,1])(generateTop450());
	part2 = COLOR(col)(genLRS450());
	part3 =  COLOR(col)(STRUCT([T([0])([-etr450adjust+0.09])(genFrontSide450())]));
	part4 = COLOR([1,0,0])(redBandF450());
	part5 = genRedSide();
	part6 = generateWindowsLRS450();
	part7 = generateDoors450();
	part8 = generateWheels450();
	part9 = generateBottom450();
	part10 = generateBack450();
	part11 = generateWindshield450();
	out = STRUCT([part1,part2,part3,part5,part6,part7,part8,part9,part10,part11,T([0,2])([-etr450adjust-0.35,0.12]),part4]);
	return out;
}
