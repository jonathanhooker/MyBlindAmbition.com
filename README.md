MyBlindAmbition
====================

To run the app build you'll need to have bower installed, then you can run bower install from the command line to install the neccesary dependencies.

To create a distribution build you'll need node and grunt installed. First run npm install to install the required modules, then run grunt build to create the dist build. NOTE: Currently there is a stupid bug that makes the dist build not work. If you update main.js so it reads '../assets/jsPrograms' instead of 'assets/jsPrograms' then it should build correctly. It's ghetto but I didn't have time to figure out what the deal was.

The assets folder within the roots contains the assets I used to create the triangulated background imagery. A quick explaination:

* I ran the original photos (assets/photos) through DMesh (http://dmesh.thedofl.com/) and saved out the generated pdfs (assets/pdf)
* I took the pdfs into illustrator (assets/photos.ai) which I used to output svgs of each (assets/svg)
* I wrote a node script (assets/svgProcess.js) that loaded the svgs, read the color and points of each triangle and saved out json's that were read to upload directly into a webGL buffer. The node script also adds extra triangles to the images so that they all have a matching number. This way I can just transition from one image to the next by interpolating the points in a vertex shader.