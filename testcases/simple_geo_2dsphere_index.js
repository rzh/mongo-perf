
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
tests.push( { name: "Geo.within.polygon",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$geometry: { type: "Polygon", coordinates: [[ [-10,-10], [ 8, -9], [10, 10], [ 5,  6], [-9,  9], [-10,-10] ] ] } }} } }
              ] } );

tests.push( { name: "Geo.within.polygon.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$geometry: { type: "Polygon", coordinates: [[ [  0,-20], [18,-19], [20,  0], [15, -4], [ 1, -1], [  0,-20] ] ] } }} } }
              ] } );

tests.push( { name: "Geo.geoJSON.within.polygon",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON.(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$geometry: { type: "Polygon", coordinates: [[ [-10,-10], [ 8, -9], [10, 10], [ 5,  6], [-9,  9], [-10,-10] ] ] } }} } }
              ] } );

tests.push( { name: "Geo.geoJSON.within.polygon.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geoWithin: {$geometry: { type: "Polygon", coordinates: [[ [  0,-20], [18,-19], [20,  0], [15, -4], [ 1, -1], [  0,-20] ] ] } }} } }
              ] } );

tests.push( { name: "geo.geowithin.centersphere",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureindex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geowithin: {$centersphere: [[0, 0], 0.175]}} } }
              ] } );

tests.push( { name: "geo.geowithin.centersphere.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureindex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geowithin: {$centersphere: [[20, -20], 0.175]}} } }
              ] } );

tests.push( { name: "geo.geoJSON.geowithin.centersphere",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureindex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geowithin: {$centersphere: [[0, 0], 0.175]}} } }
              ] } );

tests.push( { name: "geo.geoJSON.geowithin.centersphere.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureindex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", query: {loc: { $geowithin: {$centersphere: [[20, -20], 0.175]}} } }
              ] } );
// findOne
tests.push( { name: "Geo.within.polygon.findOne",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$geometry: { type: "Polygon", coordinates: [[ [-10,-10], [ 8, -9], [10, 10], [ 5,  6], [-9,  9], [-10,-10] ] ] } }} } }
              ] } );

tests.push( { name: "Geo.within.polygon.findOne.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$geometry: { type: "Polygon", coordinates: [[ [  0,-20], [18,-19], [20,  0], [15, -4], [ 1, -1], [  0,-20] ] ] } }} } }
              ] } );

tests.push( { name: "Geo.geoJSON.within.polygon.findOne",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$geometry: { type: "Polygon", coordinates: [[ [-10,-10], [ 8, -9], [10, 10], [ 5,  6], [-9,  9], [-10,-10] ] ] } }} } }
              ] } );

tests.push( { name: "Geo.geoJSON.within.polygon.findOne.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$geometry: { type: "Polygon", coordinates: [[ [  0,-20], [18,-19], [20,  0], [15, -4], [ 1, -1], [  0,-20] ] ] } }} } }
              ] } );


tests.push( { name: "Geo.within.centerSphere.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$centerSphere: [[0, 0], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.within.centerSphere.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$centerSphere: [[20, -20], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.geoJSON.within.centerSphere.findOne",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$centerSphere: [[0, 0], 0.175]}} } }
              ] } );

tests.push( { name: "Geo.geoJSON.within.centerSphere.findOne.offcenter",
              pre: function( collection ) { 
              	  collection.drop(); 
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $geoWithin: {$centerSphere: [[20, -20], 0.175]}} } }
              ] } );



// geoNear
tests.push( { name: "Geo.near.2dSphere.findOne.center",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $near: {$geometry: {type: "Point", coordinates: [0.1, 0.1]}}}}}
              ] } );

tests.push( { name: "Geo.near.2dSphere.findOne.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $near: {$geometry: {type: "Point", coordinates: [20.1, -20.1]}}}}}
              ] } );

tests.push( { name: "Geo.near.2dSphere.find100.center",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", limit: 100, query: {loc: { $near: {$geometry: {type: "Point", coordinates: [0.1, 0.1]}}}}}
              ] } );


tests.push( { name: "Geo.near.2dSphere.find100.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMap(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", limit: 100, query: {loc: { $near: {$geometry: {type: "Point", coordinates: [-20.1, -20.1]}}}}}
              ] } );


// geoNear with GeoJSON as location
tests.push( { name: "Geo.geoJSON.near.2dSphere.findOne.center",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSONp(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $near: {$geometry: {type: "Point", coordinates: [0.1, 0.1]}}}}}
              ] } );

tests.push( { name: "Geo.geoJSON.near.2dSphere.findOne.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "findOne", query: {loc: { $near: {$geometry: {type: "Point", coordinates: [20.1, -20.1]}}}}}
              ] } );

tests.push( { name: "Geo.geoJSON.near.2dSphere.find100.center",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", limit: 100, query: {loc: { $near: {$geometry: {type: "Point", coordinates: [0.1, 0.1]}}}}}
              ] } );


tests.push( { name: "Geo.geoJSON.near.2dSphere.find100.offcenter",
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex({loc: "2dsphere"});
                  generateGridMapGeoJSON(collection, -50, -50, 50, 50);
              },
              ops: [
                  { op: "find", limit: 100, query: {loc: { $near: {$geometry: {type: "Point", coordinates: [-20.1, -20.1]}}}}}
              ] } );




