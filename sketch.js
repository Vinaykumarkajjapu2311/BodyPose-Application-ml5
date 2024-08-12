let bodypose;
let capture;
let connections;
let reyeX, reyeY;
let leyeX, leyeY;
let singlePose;
let noseX, noseY;
let poses = [];
let skeleton;
let specs, smoke;
function preload() {
  // Load the bodyPose model
  bodypose = ml5.bodyPose();
}

function setup() {
  createCanvas(800, 600);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
  // bodypose = ml5.bodypose(capture, modelLoaded);
  bodypose.detectStart(capture, gotPoses);
  connections = bodypose.getSkeleton();

  specs = loadImage('spects.png');
}

function modelLoaded() {
  console.log('Model has  loaded');
}

function gotPoses(poses) {
  poses = poses;
  console.log(connections);

  if (poses.length > 0) {
    singlePose = poses[0];
  }
  console.log(noseX, noseY);
}

function draw() {
  image(capture, 0, 0, 800, 600);
  fill(255, 0, 0);
  if (singlePose) {
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      ellipse(singlePose.keypoints[i].x, singlePose.keypoints[i].y, 20);
    }
    stroke(255, 255, 255);
    strokeWeight(2);
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = singlePose.keypoints[pointAIndex];
      let pointB = singlePose.keypoints[pointBIndex];
      line(pointA.x, pointA.y, pointB.x, pointB.y);
    }

    // image(specs, singlePose.nose.x - 70, singlePose.nose.y - 100, 160, 150);
  }
}
