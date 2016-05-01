Now You See Me 2
====================

Localization process for international territories
--------------------

The site uses a single JSON file to pull all language and links from.  To define which JSON file is being used, locate the following in index.php:

```javascript
FLOCK.settings.jsonFileName = 'en.json';
```

As long as the JSON file being used is located within the “JSON” folder in the root folder, you can update language and links within that JSON file, save it in that JSON folder, and then call it in the index.php file.

For example, to update the site for French, you would open the JSON file, update the language, save it as “fr.json” and then change the index.php file to use fr.json rather than en.json.

The JSON file itself has documentation within it and is fairly self explanatory as far as what needs to be updated to change the language settings on the site.  If any questions arise in the process, feel free to reach out to:

ben@theflock.com

Creating a new distribution build
--------------------

If you need to modify the source files and create a new build, you will need to install [Compass](http://compass-style.org/install/), [Bower](http://bower.io/), and [Grunt](http://gruntjs.com/getting-started).
Once those are installed, cd to the root of the repository and in the terminal, type `npm install` to install the node modules for grunt, then `bower install` to install the bower components, then `grunt watch`, which will automatically compile your sass while you edit it. Then, when you are finished and want to make a new build, type `grunt build` and it will write to your 'dist' folder.