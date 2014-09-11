
if ( typeof(tests) != "object" )
    tests = [];

// generate a grid map from (x1, y1) to (x2, y2)`
function generateGridMap(collection, x1, y1, x2, y2) {
	for( var i = x1; i < ( x2 + 1); i++) {
		for(var j = y1; j < (y2 + 1); j++) {
			collection.insert({loc: [i, j]});
		}
	}
}

function generateGridMapGeoJSON(collection, x1, y1, x2, y2) {
	for( var i = x1; i < ( x2 + 1); i++) {
		for(var j = y1; j < (y2 + 1); j++) {
			collection.insert({loc: {type: "Point", coordinates: [i, j]}});
		}
	}
}

// geoWithin
tests.push( { name: "Geo.within.2d.center",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$center: [[0, 0], 10]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.center.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$center: [[25, 25], 10]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.box",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$box: [[-9, -8], [9, 8]]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.box.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$box: [[9, 8], [27, 24]]}} } }
              ] } );


tests.push( { name: "Geo.within.2d.centerSphere",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$centerSphere: [[0, 0], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.centerSphere.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$centerSphere: [[20, -20], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.polygon",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$polygon: [ [-10,-10], [8,-9], [10, 10], [5, 6], [-9, 9], [-10,-10] ] } }} }
              ] } );

tests.push( { name: "Geo.within.2d.polygon.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$polygon: [ [0,-20], [18,-19], [20, 0], [15, -4], [1, -1], [0,-20] ] } }} }
              ] } );


// findOne
tests.push( { name: "Geo.within.2d.center.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$center: [[0, 0], 10]}} } }
              ] } );


tests.push( { name: "Geo.within.2d.center.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$center: [[25, 25], 10]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.box.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$box: [[-9, -8], [9, 8]]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.box.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$box: [[9, 8], [27, 24]]}} } }
              ] } );


tests.push( { name: "Geo.within.2d.centerSphere.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$centerSphere: [[0, 0], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.centerSphere.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$centerSphere: [[20, -20], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.within.2d.polygon.findOne",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$polygon: [ [-10,-10], [8,-9], [10, 10], [5, 6], [-9, 9], [-10,-10] ] } }} }
              ] } );

tests.push( { name: "Geo.within.2d.polygon.findOne.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$polygon: [ [0,-20], [18,-19], [20, 0], [15, -4], [1, -1], [0,-20] ] } }} }
              ] } );



// geoNear

tests.push( { name: "Geo.near.2d.findOne.center",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $near: [0.1, 0.1]} } }
              ] } );

tests.push( { name: "Geo.near.2d.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $near: [20.1, 20.1]} } }
              ] } );

tests.push( { name: "Geo.near.2d.find100.center",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", limit:100, query: {loc: { $near: [0.1, 0.1]} } }
              ] } );

tests.push( { name: "Geo.near.2d.find100.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", limit:100, query: {loc: { $near: [-20.1, 20.1]} } }
              ] } );

// geoNearSphere
tests.push( { name: "Geo.nearSphere.2d.findOne.center",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $nearSphere: [ 0.1,  0.1]} } }
              ] } );

tests.push( { name: "Geo.nearSphere.2d.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $nearSphere: [-20.1, -20.1]} } }
              ] } );

tests.push( { name: "Geo.nearSphere.2d.find.center",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $nearSphere: [ 0.1,  0.1], $maxDistance: 0.1798 } } }
              ] } );

tests.push( { name: "Geo.nearSphere.2d.find.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $nearSphere: [ -20.1,  -20.1], $maxDistance: 0.175 } } }
              ] } );

