Song1="";
Song2="";
lw_X=0;
lw_Y=0;

rw_X=0;
rw_Y=0;

score_l=0;
score_r=0;

s1_status="";
s2_status="";

function preload()
{
    Song1=loadSound("music.mp3");
    Song2=loadSound("music2.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
   if(results.length > 0)
   {
       console.log(results);
       lw_X=results[0].pose.leftWrist.x;
       lw_Y=results[0].pose.leftWrist.y;
    
       console.log( " leftWrist X="+ lw_X + " leftWrist Y=" + lw_Y);
       score_l=results[0].pose.keypoints[9].score;

       rw_X=results[0].pose.rightWrist.x;
       rw_Y=results[0].pose.rightWrist.y;
       
       score_r=results[0].pose.keypoints[10].score;

       console.log( " RighttWrist X="+ rw_X + " RighttWrist Y=" + rw_Y);
   }
}

function draw()
{
    image(video,0,0,600,500);
    fill('#FF0000');
    stroke('#FF0000');
    s1_status=Song1.isPlaying();
    if (score_l>0.2)
    {
        circle(lw_X,lw_Y,20);
        Song2.stop();
        if(s1_status==false)
        {
            Song1.play();
        }
    }

    s2_status=Song2.isPlaying();
    if (score_r>0.2)
    {
        circle(rw_X,rw_Y,20);
        Song1.stop();
        if(s2_status==false)
        {
            Song2.play();
        }
    }
}