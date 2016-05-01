MyBlindAmbition
====================

I launched my first portfolio site in 2006 as part of the May 1st Reboot. 10 years later they decided to reboot the 'boot and it seemed like a perfect time to refresh my personal site. I ended up being super busy and work and threw this site together in one day, whenever my 1 yr old was sleeping. All said and done I think I clocked ~10-11 hours on this before launching at 2am May 1st, 2016. I may get around to updating the site as I wanted to make it fluidly controlled by scrolling. I guess we'll see.

The site is built on top of webGL framework called Aero. (https://github.com/Oblioio/AeroJS) It's kind of a wierd framework and may not make sense due to the face that there is currently no documentation. 


To run the app build you'll need to have bower installed, then you can run bower install from the command line to install the neccesary dependencies.

To create a distribution build you'll need node and grunt installed. First run npm install to install the required modules, then run grunt build to create the dist build. NOTE: Currently there is a stupid bug that makes the dist build not work. If you update main.js so it reads '../assets/jsPrograms' instead of 'assets/jsPrograms' then it should build correctly. It's ghetto but I didn't have time to figure out what the deal was.

The assets folder within the roots contains the assets I used to create the triangulated background imagery. A quick explaination:

* I ran the original photos (assets/photos) through DMesh (http://dmesh.thedofl.com/) and saved out the generated pdfs (assets/pdf)
* I took the pdfs into illustrator (assets/photos.ai) which I used to output svgs of each (assets/svg)
* I wrote a node script (assets/svgProcess.js) that loaded the svgs, read the color and points of each triangle and saved out json files containing a single array that is ready to upload directly into a webGL buffer. The node script also adds extra triangles to the images so that they all have a matching number. This way I can just transition from one image to the next by interpolating the points in a vertex shader.