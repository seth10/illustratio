# illustratio

This is a project Billy Carrington and Seth T worked on for HopHacks Fall 2018.

## Project Description

There is plenty of fantastic art in Baltimore which goes unknown and underappreciated. We want to bring excitement and education to the public in the wide array of art available in the city. We want to promote social interaction to bring people to appreciate these works, and encourage cultured discussion.

illustratio is an app that informs users about the artwork around Baltimore along with informing them about the different mediums of art. When a user logs in, they can choose to be informed about a random piece of art. This will tell the user a bit about the art, such as location, name, artist, and medium/type. If the type was given in the data set for that piece, there will also be a small factoid on that type of medium. The user can then like the artwork that they have seen if they appreciated that piece.

## Technologies

We wanted to try out many different technologies during the hackathon to learn as much as we could. At first we were using an Amazon Linux EC2 instance with tmux running and both of us logged in to collaborate. Later we switched to GCP and tried out the Google Cloud Shell for development.

Our app is running on NodeJS, initialized with create-react-app. Bootstrap for style, react-bootstrap for integrated components, React router, standard stuff.

The core of our app is MongoDB Stitch. There was a great midnight workshop on it where Adam, Haley, and Aydrian inspired us to use it. MongoDB Stitch handles our users/authentication and rules/access, while mongoDB Atlas actually stores our database and collections. We're using Google Cloud Platform infrastructure for mongoDB atlas.

We used Stae for the data set and focused around the Civic Hack Theme ("Solve some of the most common & pressing problems that Baltimore city officials have identified.")

## Later Work 

The hackathon was from Friday, September 16th to Sunday, September 18th. Afterwards we just left things as they were. We had trouble making a production build of our app, so for the judging/demos we ran the create-react-app development server on the GCP cloud shell. This mean that after the hackathon our hack was no longer accessible unless I reconnected to the Google Cloud Shell and started it up again.

In January 2019 I am now trying to get everything up and running and hosted more permanently. First I zipped up everything on the GCP cloud shell and moved it over to a new EC2 instance. Here it looks like the react-scripts were broken but I was able to manually strt the development server and actually got a production build made. I tried out creating an S3 bucket from the command line for the first time (after assigning an IAM role to the instance) and, after fiddling about with the region arguments, got it created and pushed up the static resources. After enabling static website hosting on that bucket, I got our first constant deployment.

After this I realized there was no real need for that EC2 instance, so I set to get illustratio running on my local machine. To get the latest benefits (and hopefully get the start/build scripts working normally again), I made a new create-react-app. I copied over the source and tried to change as little as possible. After a bit of debugging (the btn-default class worked in bootstrap 4.1.3 even though V4 dropped it, but today I got 4.2.1 and it didn't work) I got it running and pushed it to this repository.

Just for fun I got GPG signing working on my local machine for commits I push from now on (in the past only my commits from the GitHub website editor were Verified). I finally have the static files hosted on GitHub Pages, and able to be updated with a simple `yarn deploy`. My next step is to setup a CICD pipeline to automatically build when I push new code to master. I don't want to leave a Jenkins container running in ECS 24/7 so I might try to just get a Lambda to `git clone` and build/push.

It seems MongoDB Stitch also has a static hosting option, so I've put illustratio up there too (making for 3 total live deployments!). I want to put an archive of the MongoDB database and access rules in this repo so they're backed-up and version-controlled.