MyBlindAmbition
====================

To run the app build you'll need to have bower installed, then you can run bower install from the command line to install the neccesary dependencies.

To create a distribution build you'll need node and grunt installed. First run npm install to install the required modules, then run grunt build to create the dist build.

* Currently there is a stupid bug that makes the dist build not work. If you update main.js so it reads '../assets/jsPrograms' instead of 'assets/jsPrograms' then it should build correctly. It's ghetto but I didn't have time to figure out what the deal was.