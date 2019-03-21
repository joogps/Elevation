let key = "pk.eyJ1Ijoiam9vZ3BzIiwiYSI6ImNqc295ZTk5ZzByc2QzeXBkb3o0eXU4ZXAifQ.vWPMW17fOe232E5u4445BQ";

let elevation = [];
let detail = 0.001;

let start;
let stop;

function setup() {
	createCanvas(windowWidth, windowHeight);
	let lat = 27.994402;
	let lon = -81.760254;
	let range = 0.01;

	start = {lat: lat-range, lon: lon-range};
	stop = {lat: lat+range, lon: lon+range};

	for (let j = 0; j < range*4/detail-1; j++)
		elevation.push(new Array())

	for (let j = 0; j < range*4/detail; j++) {
		for (let i = 0; i < range*4/detail; i++)
			getEle(j, i);
	} 
}

function draw() {
	background(100);

	let maxEle = max.apply(null, elevation.map(function(row) {return max.apply(Math, row)}));
	let minEle = min.apply(null, elevation.map(function(row) {return min.apply(Math, row)}));

	for (let j = 0; j < elevation.length; j++) {
		for (let i = 0; i < elevation[j].length; i++) {
			if(elevation[j][i]) {
				fill(map(elevation[j][i], minEle, maxEle, 255, 0));
				rect(width*i/elevation[j].length, height*j/elevation.length, width/elevation[j].length, height/elevation.length);
			}
		}
	}
}

function getEle(j, i) {
	let lat = lerp(start.lat, stop.lat, (stop.lat-start.lat)*j/detail);
	let lon = lerp(start.lon, stop.lon, (stop.lon-start.lon)*i/detail);

	let url = "https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/"+lat+","+lon+".json?&access_token="+key;
	let highest = 0;
	$.get(url, function(d) {
		let features = d.features;
		for (let f of features) {
			if(f.properties.ele > highest)
				highest = f.properties.ele;
		}

		addToArray(j, i, highest);
	})
}

function addToArray(j, i, val) {
	elevation[j][i] = val;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}