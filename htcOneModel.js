/*MARCO SBAFFONI - 283934 - SHOWCASE - HTC ONE MODEL*/

//general variables
var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);

/*########################### ANDROID MASCOTTE ####################################*/

//create the head of Android Mascotte
function generateHead() {
  var antennas = generateAntennas();
  var controlpoints = [[0,0,0],[0,0.5,0],[0.5,0.7,0],[1,1,0],[1.5,0.7,0],[2,0.5,0],[2,0,0]];
  var curveMapping = BEZIER(S0)(controlpoints);
  var cp = [[0,0,0],[2,0,0],[1,0,0]];
  var curve2=BEZIER(S0)(cp);
  var eye = DISK(0.1)(16);
  var eyes = COLOR([1,1,1])(STRUCT([eye,T([0])([0.7]),eye]));
  var headTemp = COLOR([0,0.8,0.4])(STRUCT([MAP(BEZIER(S1)([curveMapping,curve2]))(domain)]));
  var head = STRUCT([headTemp,antennas,T([0,1,2])([0.7,0.4,0.05]),eyes]);
  return head;
}

//create antennas of Android Mascotte
function generateAntennas(){
  var controlpoints = [[0,0,0],[0,0.2,0],[0,0.2,0],[0.05,0.2,0],[0.05,0.2,0],[0.1,0.2,0],[0.1,0,0]];
  var curveMapping = BEZIER(S0)(controlpoints);
  var cp = [[0,0,0],[0,-0.2,0],[0,-0.2,0],[0.05,-0.2,0],[0.05,-0.2,0],[0.1,-0.2,0],[0.1,0,0]];
  var curve2=BEZIER(S0)(cp);
  var antenna = COLOR([0,0.8,0.4])(STRUCT([MAP(BEZIER(S1)([curveMapping,curve2]))(domain)]));
  var left = T([0,1])([0.5,0.6])(R([0,1])(PI/4)(antenna));
  var right = T([0,1])([1.5,0.6])(R([0,1])(-PI/4)(antenna));
  var antennas = STRUCT([left,right]);
  return antennas;
}

//create arms and legs of Android Mascotte
function generateLimbs(){
  var armLeft = T([0,1])([-0.6,-1])(generateLimbBase());
  var armRight = T([0])([2.7])(armLeft);
  var legLeft = T([0,1])([0.4,-2.2])(generateLimbBase());
  var legRight = T([0])([0.8])(legLeft);
  var limbs = STRUCT([armLeft,armRight,legLeft,legRight]);
  return limbs;
}

//create base model for arms and legs of Android Mascotte
function generateLimbBase(){
  var controlpoints = [[0,0,0],[0,0.7,0],[0,0.7,0],[0.25,0.7,0],[0.25,0.7,0],[0.5,0.7,0],[0.5,0,0]];
  var curveMapping = BEZIER(S0)(controlpoints);
  var cp = [[0,0,0],[0,-0.7,0],[0,-0.7,0],[0.25,-0.7,0],[0.25,-0.7,0],[0.5,-0.7,0],[0.5,0,0]];
  var curve2=BEZIER(S0)(cp);
  var limb = T([1])([0.1])(COLOR([0,0.8,0.4])(STRUCT([MAP(BEZIER(S1)([curveMapping,curve2]))(domain)])));
  return limb;
}


//create torso of Android Mascotte
function generateTorso(){
  var controlpoints = [[0,0,0],[0,-2,0],[0,-2.05,0],[1,-2.05,0],[2,-2.05,0],[2,-2,0],[2,0,0]];
  var curveMapping = BEZIER(S0)(controlpoints);
  var cp = [[0,0,0],[1,0,0],[2,0,0]];
  var curve2=BEZIER(S0)(cp);
  var torso = T([1])([-0.07])(COLOR([0,0.8,0.4])(STRUCT([MAP(BEZIER(S1)([curveMapping,curve2]))(domain)])));
  return torso;
}

//assemble every part of Android Mascotte
function generateAndroidMascotte(){
  var head = generateHead();
  var limbs = generateLimbs();
  var torso = generateTorso();
  var mascotte = STRUCT([head,limbs,torso]);
  return mascotte;
}


/*############# HTC ONE MODEL ##############*/

//frontal design
function generateFrontalDesign(){
  var frontBase = generateMainOutline();
  var screenGlass = COLOR([0,0,0])(CUBOID([8,5.1]));
  var frontTemp = STRUCT([frontBase,T([0,1,2])([-4,0.1,0.001])(screenGlass)]);
  var backIcon = R([0,1])(PI/2)(T([0,1])([1.2,-3.5])(generateBackIcon()));
  var homeIcon = R([0,1])(PI/2)(T([0,1])([4,-3.5])(generateHomeIcon()));
  var brandIcon =  COLOR([1.5,1.5,1.5])(R([0,1])(PI/2)(T([0,1])([2.5,-3.5])(generateBrandIcon())));
  var frontalCamera = T([0,1])([-4.5,4])(generateFrontalCamera());
  var frontalSensors = T([0,1])([-4.5,1])(generateFrontalSensors());
  var tempSpeaker = generateSpeakers();
  var upSpeakers = T([0,1])([-4.6,1.5])(tempSpeaker);
  var downSpeakers = T([0,1])([4.6,1.5])(tempSpeaker);
  var front = STRUCT([frontTemp,T([2])([0.005]),backIcon,homeIcon,brandIcon,frontalCamera,frontalSensors,upSpeakers,downSpeakers]);
  return front;
}

//generate main outline
function generateMainOutline(){
  var controlpoints = [[0,0,0],[5,0,0],[6.53,0,0],[4.08,0.1,0],[4.08,5.3,0],[6.53,5.3,0],[5,5.3,0],[0,5.3,0]];
  var curveMapping = BEZIER(S0)(controlpoints);
  var controlpoints2 = [[0,0,0],[-5,0,0],[-6.53,0,0],[-4.08,0.1,0],[-4.08,5.3,0],[-6.53,5.3,0],[-5,5.3,0],[-0,5.3,0]];
  var curveMapping2 = BEZIER(S0)(controlpoints2);
  var mainOutline = S([0])([1.05])(COLOR([1.4,1.4,1.4])(MAP(BEZIER(S1)([curveMapping,curveMapping2]))(domain)));
  return mainOutline;
}

//generate back icon
function generateBackIcon(){
  var backIcon = COLOR([1.5,1.5,1.5])(POLYLINE([[0.25,0],[0,0.125],[0.25,0.25]]));
  return backIcon;
}

//generate home icon
function generateHomeIcon(){
  var homeIcon = COLOR([1.5,1.5,1.5])(POLYLINE([[0,0],[0.25,0],[0.25,0.125],[0.125,0.25],[0,0.125],[0,0]]));
  return homeIcon;
}

//generate HTC icon
function generateBrandIcon(){
  var h1 = POLYLINE([[0,0],[0,0.5]]);
  var h2 = POLYLINE([[0,0.25],[0.25,0.25]]);
  var h3 = POLYLINE([[0.25,0.25],[0.25,0]]);
  var h = STRUCT([h1,h2,h3]);
  var t1 = POLYLINE([[0,0.25],[0.25,0.25]]);
  var t2 = POLYLINE([[0.125,0],[0.125,0.25]]);
  var t = STRUCT([t1,t2]);
  var c = POLYLINE([[0.25,0],[0,0],[0,0.25],[0.25,0.25]]);
  var htc =STRUCT([h,T([0])([0.3]),t,T([0])([0.3]),c]);
  return htc;
}

//generate frontal camera
function generateFrontalCamera(){
  var camera = COLOR([0.2,0.2,0.2])(DISK(0.3)(16));
  return camera;
}

//generate speakers (version 0.1, can't replicate)
function generateSpeakers(){
  var speaker = COLOR([0.2,0.2,0.2])(DISK(0.03)(16));
  var speaker1 = STRUCT([speaker,T([0])([0.1]),speaker,T([0])([0.1]),speaker]);
  var speakers = STRUCT([T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),
    T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),
    T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1),T([1])([0.1]),(speaker1)]);
  return speakers;
}

//generate frontal sensors
function generateFrontalSensors(){
  var single = DISK(0.125)(16);
  var sensors = COLOR([0.2,0.2,0.2])(STRUCT([single,T([1])([0.3]),single]));
  return sensors;
}

//generate side borders
function generateSides(){
  var controlpoints = [[5.25,1,0],[5.25,8,0],[0,0,0],[0,0,0]];
  var controlpoints2 = [[5.25,1,-0.525],[5.25,8,-0.525],[0,0,0],[0,0,0]];
  var ch1 = CUBIC_HERMITE(S0)(controlpoints);
  var ch2 = CUBIC_HERMITE(S0)(controlpoints2);
  var ch3 = CUBIC_HERMITE(S1)([ch1,ch2,[0,0,0],[0,0,0]]);
  var temp = MAP(ch3)(domain);
  var left = STRUCT([temp]);
  var right = T([0])([-5.25])(left);
  var sides = STRUCT([left,right]);
  return sides;
}

//generate up and down borders
function generateUpDown(){
  var controlpoints = [[9.65,1.1,0],[9.65,4,0],[0,0,0],[0,0,0]];
  var controlpoints2 = [[9.65,1.1,-0.525],[9.65,4,-0.525],[0,0,0],[0,0,0]]; 
  var ch1 = CUBIC_HERMITE(S0)(controlpoints);
  var ch2 = CUBIC_HERMITE(S0)(controlpoints2);
  var ch3 = CUBIC_HERMITE(S1)([ch1,ch2,[0,0,0],[0,0,0]]);
  var temp = MAP(ch3)(domain);
  var up = STRUCT([R([0,1])(PI/2),temp]);
  var down = T([1])([-10.3])(up);
  var upDown = STRUCT([T([0])([5.1]),up,down]);
  return upDown;
}

//generate back design
function generateBackDesign(){
  var temp = COLOR([0.9,0.9,0.9])(generateMainOutline());
  var flash = generateBackFlash();
  var cam = generateBackCamera();
  var brand = generateBackBrandIcon();
  var backDeisgn = STRUCT([temp,T([0,1,2])([-4,1.9,0.03]),flash,T([1])([0.8]),cam,T([0])([4]),brand]);
  var tempBack = STRUCT([T([1,2])([-5.25,0.53]),backDeisgn]);
  backDeisgn = R([1,2])(PI)(tempBack);
  return backDeisgn;
}

//generate back camera
function generateBackCamera(){
  var camera = COLOR([0.2,0.2,0.2])(DISK(0.35)(16));
  return camera;
}

//generate back flash
function generateBackFlash(){
  var flashTemp = COLOR([0.9,0.9,1.2])(DISK(0.2)(16));
  var outline = CIRCLE(0.2)(16);
  var flash = STRUCT([flashTemp,outline]);
  return flash;
}

//generare back brand icon
function generateBackBrandIcon(){
  var htcTemp =generateBrandIcon();
  var backHtc = COLOR([0.5,0.5,0.5])(S([0,1])([4])(htcTemp));
  return backHtc;
}

//final tuning
var front = generateFrontalDesign();
var back = generateBackDesign();
var temp = STRUCT([front,back]);
var model0 = T([0,1])([5.25,4.5])(R([0,1])(PI/2)(temp));
var sides = generateSides();
var upDown = generateUpDown();
var model01 = STRUCT([model0,sides,upDown]);
var mascotte = T([0,1,2])([3.5,3,0.03])(R([0,1])(PI)(generateAndroidMascotte()));
var model02=STRUCT([model01,mascotte]);

var model = T([1])([9])(R([1,2])(PI)(model02));
