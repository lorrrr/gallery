let bodypix;
let video;
let segmentation;
let img;

const options = {
    outputStride: 8, // 8, 16, or 32, default is 16
    segmentationThreshold: 0.7 // 0 - 1, defaults to 0.5 
}

function setup() {
    createCanvas(500,500);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width,width);
     video.hide(); // Hide the video element, and just show the canvas
    bodypix = ml5.bodyPix(video, modelReady)
}

function modelReady() {
    console.log('ready!')
    bodypix.segment(gotResults, options)
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result);
    segmentation = result;

  
   
    video.mask(segmentation.maskPerson)
    image(video, 0, 0, width, height)

    bodypix.segment(gotResults, options)

}
