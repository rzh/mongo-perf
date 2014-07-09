
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

tests.push( { name: "Geo.geoWithin.center",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$center: [[0, 0], 10]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.center.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$center: [[25, 25], 10]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.box",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$box: [[-9, -8], [9, 8]]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.box.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$box: [[9, 8], [27, 24]]}} } }
              ] } );


tests.push( { name: "Geo.geoWithin.centerSphere",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$centerSphere: [[0, 0], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.centerSphere.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$centerSphere: [[20, -20], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.polygon",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$geometry: {type: "Polygon", coordinates: [ [ [-10,-10], [8,-9], [10, 10], [5, 6], [-9, 9], [-10,-10] ] ]} }} } }
              ] } );


// findOne
tests.push( { name: "Geo.geoWithin.center.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$center: [[0, 0], 10]}} } }
              ] } );


tests.push( { name: "Geo.geoWithin.center.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$center: [[25, 25], 10]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.box.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$box: [[-9, -8], [9, 8]]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.box.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$box: [[9, 8], [27, 24]]}} } }
              ] } );


tests.push( { name: "Geo.geoWithin.centerSphere.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$centerSphere: [[0, 0], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.centerSphere.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$centerSphere: [[20, -20], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.geoWithin.polygon.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2d"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$geometry: {type: "Polygon", coordinates: [ [ [-10,-10], [8,-9], [10, 10], [5, 6], [-9, 9], [-10,-10] ] ]} }} } }
              ] } );

