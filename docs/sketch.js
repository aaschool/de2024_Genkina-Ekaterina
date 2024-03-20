let video;
let facemesh;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });

  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh; // Get keypoints of the first face only

    for (let i = 0; i < keypoints.length; i++) {
      const [x, y] = keypoints[i];

      // Check if the keypoint is within the covered region (e.g., area of the eye covered by a hand)
      if ((x > 200 && x < 300 && y > 150 && y < 250) ||
          (x > 340 && x < 440 && y > 150 && y < 250)) {
        // Do nothing for covered keypoints
      } else {
        fill(255); // White color for uncovered keypoints
        noStroke();
        ellipse(x, y, 5, 5);
      }
    }
  }
}