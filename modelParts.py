##Project website: http://krelian87.github.io

from pyplasm import *

dom1D=INTERVALS(1)(32)
dom2D=PROD([INTERVALS(1)(32),INTERVALS(1)(32)])
dom2D=PROD([INTERVALS(1)(24),INTERVALS(1)(24)])
railLength=26
railGap=4
railHeight=1
railWidth=0.5
railsAngle=PI/3
crosspieceLength=railGap+1
crosspieceWidth=2
trainLength=railLength
trainWidth=railGap
trainHeight=4
etr450adjust=0.8
col=[1.55,1.55,1.55]

def generateTop450():
	height=1.2
	Su0=BEZIER(S1)([[0,0,0],[trainLength,0,0]])
	Su1=BEZIER(S1)([[0,trainWidth,0],[trainLength,trainWidth,0]])
	control2=[[0,0,0],[0,0,height],[0,trainWidth,height],[0,trainWidth,0]]
	Sv0=BEZIER(S2)(control2)
	control3=[[trainLength,0,0],[trainLength,0,height],[trainLength,trainWidth,height],[trainLength,trainWidth,0]]
	Sv1=BEZIER(S2)(control3)
	out=MAP(COONSPATCH([Su0,Su1,Sv0,Sv1]))(dom2D)
	return out

#VIEW(generateTop450())

def genLRS450():
	adjust=0.85
	adjustBase=0.25	
	Su0=BEZIER(S1)([[0,0,0],[0,trainHeight/3,0],[-adjust,trainHeight*2/3,0],[-adjustBase,trainHeight,0]])
	Su1=BEZIER(S1)([[0,0,-trainLength],[0,trainHeight/3,-trainLength],[-adjust,trainHeight*2/3,-trainLength],[-adjustBase,trainHeight,-trainLength]])
	Sv0=BEZIER(S2)([[0,0,0],[0,0,-trainLength]])
	Sv1=BEZIER(S2)([[-adjustBase,trainHeight,0],[-adjustBase,trainHeight,-trainLength]])
	out1=MAP(COONSPATCH([Su0,Su1,Sv0,Sv1]))(dom2D)
	sU0=BEZIER(S1)([[trainWidth,0,0],[trainWidth,trainHeight/3,0],[trainWidth+adjust,trainHeight*2/3,0],[trainWidth+adjustBase,trainHeight,0]])
	sU1=BEZIER(S1)([[trainWidth,0,-trainLength],[trainWidth,trainHeight/3,-trainLength],[trainWidth+adjust,trainHeight*2/3,-trainLength],[trainWidth+adjustBase,trainHeight,-trainLength]])
	sV0=BEZIER(S2)([[trainWidth,0,0],[trainWidth,0,-trainLength]])
	sV1=BEZIER(S2)([[trainWidth+adjustBase,trainHeight,0],[trainWidth+adjustBase,trainHeight,-trainLength]])
	out2=MAP(COONSPATCH([sU0,sU1,sV0,sV1]))(dom2D)
	out=STRUCT([R([1,3])(PI),R([2,3])(PI/2),R([2,3])(PI/2),out1,out2])
	return out

#VIEW(genLRS450())

def genFrontSide450():
	adjust = 0.85
	adjustBase = 0.25
	cc0 = BEZIER(S1)([[0,0,-etr450adjust],[0,0,-etr450adjust],[0,-1.5,-etr450adjust],[trainWidth,-1.5,-etr450adjust],[trainWidth,0,-etr450adjust],[trainWidth,0,-etr450adjust]])
	c0 = BEZIER(S1)([[0,0,-etr450adjust],[0,0,-0.1],[trainWidth/2,1,3],[trainWidth,0,-0.1],[trainWidth,0,-etr450adjust]])
	c1 = BEZIER(S1)([[0,trainHeight/3,-etr450adjust],[0,trainHeight/3,-0.1],[trainWidth/2,trainHeight/3,1],[trainWidth,trainHeight/3,-0.1],[trainWidth,trainHeight/3,-etr450adjust]])
	c2 = BEZIER(S1)([[-adjust,trainHeight*2/3,-etr450adjust],[-adjust,trainHeight*2/3,-0.1],[trainWidth/2,trainHeight*2/3,16],[trainWidth+adjust,trainHeight*2/3,-0.1],[trainWidth+adjust,trainHeight*2/3,-etr450adjust]])
	c3 = BEZIER(S1)([[-adjustBase,trainHeight,-etr450adjust],[-adjustBase,trainHeight,-0.1],[trainWidth/2,trainHeight,1],[trainWidth+adjustBase,trainHeight,-0.1],[trainWidth+adjustBase,trainHeight,-etr450adjust]])
	out = MAP(BEZIER(S2)([cc0,c0,c1,c2,c3]))(dom2D)
	outT = R([1,2])(PI/2)(out)
	out = R([1,3])(-PI/2)(outT)
	return out

#VIEW(genFrontSide450())

def generateWindow450():
	c1=BEZIER(S1)([[0,0,0],[1.5,0,0],[1.5,0,0],[1.5,0.5,0],[1.5,trainHeight/3-0.5,0],[1.5,trainHeight/3,0],[1.5,trainHeight/3,0],[0,trainHeight/3,0]])
	c2=BEZIER(S1)([[0,0,0],[-1.5,0,0],[-1.5,0,0],[-1.5,0.5,0],[-1.5,trainHeight/3-0.5,0],[-1.5,trainHeight/3,0],[-1.5,trainHeight/3,0],[0,trainHeight/3,0]])
	temp=MAP(BEZIER(S2)([c1,c2]))(dom2D)
	out=COLOR([1.71,2.05,2.55])(STRUCT([T([2])([0.29]),R([2,3])(-PI/16),T([1,2,3])([2,-0.3,-trainHeight/2-0.65]),R([2,3])(PI/2),temp]))
	return out

#VIEW(generateWindow450())

def generateDoor450():
	c1=BEZIER(S1)([[0,0,0],[0.3,0,0],[0.3,0,0],[0.3,0.3,0],[0.3,trainHeight/4-0.3,0],[0.3,trainHeight/4,0],[0.3,trainHeight/4,0],[0,trainHeight/4,0]])
	c2=BEZIER(S1)([[0,0,0],[-0.3,0,0],[-0.3,0,0],[-0.3,0.3,0],[-0.3,trainHeight/4-0.3,0],[-0.3,trainHeight/4,0],[-0.3,trainHeight/4,0],[0,trainHeight/4,0]])
	fin=COLOR([1.71,2.05,2.55])(MAP(BEZIER(S2)([c1,c2]))(dom2D))
	c3=BEZIER(S1)([[0,0,0.7],[0.7,0,0.7],[1.3,0,0.7],[0.7,0.3,0.3],[0.7,trainHeight-0.3,0],[0.7,trainHeight-0.2,0],[1.3,trainHeight-0.2,0.4],[0.7,trainHeight,0.4],[0,trainHeight-0.2,0.4]])
	c4=BEZIER(S1)([[0,0,0.7],[-0.7,0,0.7],[-1.3,0,0.7],[-0.7,0.3,0.3],[-0.7,trainHeight-0.3,0],[-0.7,trainHeight-0.2,0],[-1.3,trainHeight-0.2,0.4],[-0.7,trainHeight,0.4],[0,trainHeight-0.2,0.4]])
	doorBase=COLOR(col)(MAP(BEZIER(S2)([c3,c4]))(dom2D))
	doorTemp=STRUCT([doorBase,T([1,2,3])([0,1.2,0.35]),R([2,3])(-PI/20),fin])
	door=STRUCT([T([1,2])([2,-0.7]),R([2,3])(-PI/2),doorTemp])
	return door

#VIEW(generateDoor450())

def genFrontSide480():
	adjust = 0.4
	adjustBase = 0.15
	leng = 3
	height = 0.9
	etr480adjust = 0.8
	adj = 1.8
	cc0 = BEZIER(S0)([[0,0,-etr480adjust-0.08],[0,-height/2,-etr480adjust-0.08],[0,-height,-etr480adjust-0.08],[trainWidth,-height,-etr480adjust-0.08],[trainWidth,-height/2,-etr480adjust-0.08],[trainWidth,0,-etr480adjust-0.08]])
	c0 = BEZIER(S0)([[0,0,-etr480adjust],[0,0,-0.1],[trainWidth/2,0,height],[trainWidth,0,-0.1],[trainWidth,0,-etr480adjust]])
	c1 = BEZIER(S0)([[0,trainHeight/3,-etr480adjust],[0,trainHeight/3,-0.1],[trainWidth/2,trainHeight/3,1],[trainWidth,trainHeight/3,-0.1],[trainWidth,trainHeight/3,-etr480adjust]])
	c4 = BEZIER(S0)([[-adjust,trainHeight*2/3,-etr480adjust],[-adjust,trainHeight*2/3,leng+adj],[-adjust,trainHeight*2/3,leng+adj],[trainWidth/2,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,leng+adj],[trainWidth+adjust,trainHeight*2/3,-etr480adjust]])
	c2 = BEZIER(S0)([[-adjust,trainHeight*3/4,-etr480adjust],[-adjust,trainHeight*3/4,leng],[-adjust,trainHeight*3/4,leng],[trainWidth/2,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,leng],[trainWidth+adjust,trainHeight*3/4,-etr480adjust]])
	c3 = BEZIER(S0)([[-adjustBase,trainHeight,-etr480adjust],[-adjustBase,trainHeight,-0.1],[trainWidth/2,trainHeight,1],[trainWidth+adjustBase,trainHeight,-0.1],[trainWidth+adjustBase,trainHeight,-etr480adjust]])
	out = MAP(BEZIER(S1)([cc0,cc0,cc0,c0,c4,c4,c2,c2,c3,c3,c3]))(dom2D)
	outT = R([1,2])(PI/2)(out)
	out = R([1,3])(-PI/2)(outT)
	return out

#VIEW(genFrontSide480())
