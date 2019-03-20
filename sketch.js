let key = "pk.eyJ1Ijoiam9vZ3BzIiwiYSI6ImNqc295ZTk5ZzByc2QzeXBkb3o0eXU4ZXAifQ.vWPMW17fOe232E5u4445BQ";

let elevation = [];
let detail = 0.01;

let start = {lat: 26.9, lon: 48.9};
let stop = {lat: 27, lon: 49};

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	
	for(let i = 0; i < floor((stop.lon-stop.start)/detail); i++) {
		elevation.push(new Array())
	}

	getEle(6, 0);
}

function getEle(i, j) {
	let lat = start.lat+i*detail;
	let lon = start.lon+j*detail;

	let url = "https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/"+lat+","+lon+".json?&access_token="+key;
	let highest = 0;
	$.get(url, function(d) {
		let features = d.features;
		for (let f of features) {
			if(f.properties.ele > highest)
				highest = f.properties.ele;
		}

		addToArray(i, j, highest);
	})
}

function addToArray(i, j, val) {
	elevation[i][j] = val;
}