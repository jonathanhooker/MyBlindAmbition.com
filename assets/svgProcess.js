var fs = require('fs'),
    xml2js = require('xml2js');

function convertHex(hex){
    return [
    	parseInt(hex.substring(0,2), 16),
    	parseInt(hex.substring(2,4), 16),
    	parseInt(hex.substring(4,6), 16)
    ]
}


function matchLength(path, destLength){
    var numToAdd = (destLength-path.length)/15, // 96
        validRange = path.length/15, // 3048
        interval = validRange/numToAdd, // 31.75
        currSpot = 0,
        viewBox_orig = [1600,1067];
    
    console.log('numToAdd: '+numToAdd);
    console.log('interval: '+interval);
    
    while(numToAdd--){
        path.splice(Math.round(currSpot)*15, 0, path[Math.round(currSpot-1)*15],path[(Math.round(currSpot-1)*15)+1],0,0,0);
        path.splice(Math.round(currSpot)*15, 0, path[Math.round(currSpot-1)*15],path[(Math.round(currSpot-1)*15)+1],0,0,0);
        path.splice(Math.round(currSpot)*15, 0, path[Math.round(currSpot-1)*15],path[(Math.round(currSpot-1)*15)+1],0,0,0);
        currSpot += interval;
    }
}

var filesToProcess = fs.readdirSync('./svg/');

var destLength = 0;
for(var f=0; f<filesToProcess.length; f++){
	if(filesToProcess[f].indexOf('.svg')<0)continue;
	var origFile = filesToProcess[f];
	var parser = new xml2js.Parser();
	var data = fs.readFileSync('./svg/'+origFile);
    parser.parseString(data, function (err, result) {
    	destLength = Math.max(destLength, result.svg.polygon.length*15);
    });
}
console.log('destLength: '+destLength);

for(var f=0; f<filesToProcess.length; f++){
// for(var f=0; f<1; f++){
	if(filesToProcess[f].indexOf('.svg')<0)continue;
	var origFile = filesToProcess[f];
	// console.log(origFile);
	var parser = new xml2js.Parser();
	var data = fs.readFileSync('./svg/'+origFile);
	// fs.readFile('./svg/'+filesToProcess[f], function(err, data) {
		
    parser.parseString(data, function (err, result) {    	
        var output = [];
        
    	// all the styles are result.svg.defs
        // console.dir(result.svg.defs[0].style[0]);
        var styles = result.svg.defs[0].style[0].split('.');
        var peices;
        var color;
        var styleObj = {};
        for(var i=0; i<styles.length; i++){
        	peices = styles[i].split('{');
        	if(peices.length < 2)continue;
        	color = convertHex(peices[1].substring(6,12));
	        styleObj[peices[0]] = color
        }
        console.dir(result.svg['$'].viewBox);
        var viewBoxDim = result.svg['$'].viewBox.split(' ');
        
        // all the paths are result.svg.polygon
        var points,
        	originalArtboard = [1781.49, 1264.88],
        	viewBox_offset = [(originalArtboard[0]-viewBoxDim[2])/2,(originalArtboard[1]-viewBoxDim[3])/2];
        
        	// viewBox_offset = [0,0];
        var allTris = [];
        
        for(var p=0; p<result.svg.polygon.length; p++){
	        var points = result.svg.polygon[p]['$'].points.split(' ');
	        color = styleObj[result.svg.polygon[p]['$'].class];
	        if(!color)color = [0,0,0];
	        var newTri = {center:[], array:[]};
	        newTri.array.push(points[0]-(originalArtboard[0]/2)+viewBox_offset[0]);
	        newTri.array.push((originalArtboard[1]/2)-points[1]-viewBox_offset[1]);
	        newTri.array.push(color[0]);
	        newTri.array.push(color[1]);
	        newTri.array.push(color[2]);
	        newTri.array.push(points[2]-(originalArtboard[0]/2)+viewBox_offset[0]);
	        newTri.array.push((originalArtboard[1]/2)-points[3]-viewBox_offset[1]);
	        newTri.array.push(color[0]);
	        newTri.array.push(color[1]);
	        newTri.array.push(color[2]);
	        newTri.array.push(points[4]-(originalArtboard[0]/2)+viewBox_offset[0]);
	        newTri.array.push((originalArtboard[1]/2)-points[5]-viewBox_offset[1]);
	        newTri.array.push(color[0]);
	        newTri.array.push(color[1]);
	        newTri.array.push(color[2]);
	        
	        newTri.center[0] = (newTri.array[0]+newTri.array[5]+newTri.array[10])/3;
	        newTri.center[1] = (newTri.array[1]+newTri.array[6]+newTri.array[11])/3;
	        
	        allTris.push(newTri)
        }
        
        // console.log(allTris);
        allTris.sort(function(a,b){
        	return (a.center[0])-(b.center[0]);
        });
        
        for(t=0; t<allTris.length; t++){
        	output.push(allTris[t].array[0]);
        	output.push(allTris[t].array[1]);
        	output.push(allTris[t].array[2]);
        	output.push(allTris[t].array[3]);
        	output.push(allTris[t].array[4]);
        	output.push(allTris[t].array[5]);
        	output.push(allTris[t].array[6]);
        	output.push(allTris[t].array[7]);
        	output.push(allTris[t].array[8]);
        	output.push(allTris[t].array[9]);
        	output.push(allTris[t].array[10]);
        	output.push(allTris[t].array[11]);
        	output.push(allTris[t].array[12]);
        	output.push(allTris[t].array[13]);
        	output.push(allTris[t].array[14]);
        }
        
        // they all need to be the same length, this adds placeholder extra faces to the smaller images
        matchLength(output, destLength)
        
        console.log(this.origFile+" "+output.length);
        
        
        fs.writeFile(__dirname+'/../app/js/paths/'+this.origFile.replace('.svg','.json'), JSON.stringify(output), (err) => {
			if (err) throw err;this.origFile
			console.log(this.origFile+' processed!');
			
		});
    }.bind({origFile:origFile}));
	// });
}
 