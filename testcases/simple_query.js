if ( typeof(tests) != "object" ) {
    tests = [];
}

tests.push( { name : "Queries.Empty",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( {} );
                  }
              },
              ops : [
                  { op: "find", query: {} }
              ] } );

tests.push( { name : "Queries.NoMatch",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( {} );
                  }
              },
              ops : [
                  { op: "find", query: { nope : 5 } }
              ] } );


tests.push( { name: "Queries.IntIdFindOne",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { _id : i } );
                  }
                  collection.getDB().getLastError();
              },
              ops: [
                  { op: "findOne", query: { _id : { "#RAND_INT" : [ 0, 1000 ] } } }
              ] } );

tests.push( { name: "Queries.IntNonIdFindOne",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i } );
                  }
                  collection.ensureIndex( { x : 1 } );
              },
              ops: [
                  { op: "findOne", query: { x : { "#RAND_INT" : [ 0, 1000 ] } } }
              ] } );


tests.push( { name : "Queries.IntIDRange",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { _id : i } );
                  }
                  collection.getDB().getLastError();
              },
              ops : [
                  { op: "find", query: { _id : { $gt : 50, $lt : 100 } } }
              ] } );


tests.push( { name : "Queries.IntNonIDRange",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i } );
                  }
                  collection.ensureIndex( { x : 1 } );
              },
              ops : [
                  { op: "find", query: { x : { $gt : 50, $lt : 100 } } }
              ] } );

tests.push( { name: "Queries.RegexPrefixFindOne",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i.toString() } );
                  }
                  collection.ensureIndex( { x : 1 } );
              },
              ops : [
                  { op: "find", query: { x: /^500/ } }
              ] } );

tests.push( { name: "Queries.TwoInts",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x: i, y: 2*i } );
                  }
                  collection.ensureIndex({x: 1});
                  collection.ensureIndex({y: 1});
              },
              ops : [
                  { op: "find",
                    query: { x: { "#SEQ_INT": { seq_id: 0, start: 0, step: 1, mod: 1000 } },
                             y: { "#SEQ_INT": { seq_id: 1, start: 0, step: 2, mod: 2000 } } }
                  }
              ] } );

// PROJECTION TESTS

tests.push( { name: "Queries.IntNonIdFindOneProjectionCovered",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i } );
                  }
                  collection.ensureIndex( { x : 1 } );
              },
              ops: [
                  { op: "find",
                    query: { x : { "#RAND_INT" : [ 0, 1000 ] } },
                    limit: 1,
                    filter: { x : 1, _id : 0 } }
              ] } );


tests.push( { name: "Queries.IntNonIdFindOneProjection",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i } );
                  }
                  collection.ensureIndex( { x : 1 } );
              },
              ops: [
                  { op: "find",
                    query: { x : { "#RAND_INT" : [ 0, 1000 ] } },
                    limit: 1,
                    filter: { x : 1 } }
              ] } );


tests.push( { name: "Queries.IntNonIdFindProjectionCovered",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i } );
                  }
                  collection.ensureIndex( { x : 1 } );
              },
              ops: [
                  { op: "find",
                    query: { x: { $gte : 0 } },
                    filter: { x : 1, _id : 0 } }
              ] } );


tests.push( { name: "Queries.FindProjection",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i } );
                  }
                  collection.ensureIndex( { x : 1 } );
              },
              ops: [
                  { op: "find",
                    query: { },
                    filter: { x : 1 } }
              ] } );


tests.push( { name: "Queries.FindWideDocProjection",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { a : i, 
                          b: i, c: i, d: i, e: i,
                          f: i, g: i, h: i, i: i,
                          j: i, k: i, l: i, m: i,
                          n: i, o: i, p: i, q: i,
                          r: i, s: i, t: i, u: i,
                          v: i, w: i, x: i, y: i, z: 1
                      } );
                  }
              },
              ops: [
                  { op: "find",
                    query: { },
                    filter: { x : 1 } }
              ] } );


tests.push( { name: "Queries.FindProjectionThreeFieldsCovered",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i, y: i, z: i } );
                  }
                  collection.ensureIndex( { x : 1, y : 1, z : 1 } );
              },
              ops: [
                  { op: "find",
                    query: { x: { $gte : 0 } },
                    filter: { x : 1, y : 1, z : 1, _id : 0 } }
              ] } );


tests.push( { name: "Queries.FindProjectionThreeFields",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : i, y: i, z: i } );
                  }
              },
              ops: [
                  { op: "find",
                    query: { },
                    filter: { x : 1, y : 1, z : 1, _id : 0 } }
              ] } );


tests.push( { name: "Queries.FindProjectionDottedField",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { x : { y: i } } );
                  }
              },
              ops: [
                  { op: "find",
                    query: { },
                    filter: { 'x.y' : 1, _id : 0 } }
              ] } );


// SERVER-14625
tests.push( { name : "Queries.elemMatch",
              pre: function( collection ) {
                  collection.drop();
                  for ( var i = 0; i < 1000; i++ ) {
                      collection.insert( { 
                          t: i, 
                          a: [{x: 5000, y:i}, {x:i, y:i}, {x: i * 2, y:i}]
                       });
                  }
                  collection.ensureIndex({"a.y": 1, "a.x": 1});
              },
              ops : [
                    { op: "let", 
                        target: "x", 
                        value: {"#RAND_INT": [100,1000]}},

                    { op: “findOne”,
                        query: {
                            t: { "#VARIABLE" : "x" }, 
                            a: { $elemMatch: {
                                y: {"#VARIABLE" : "x" }, 
                                x: {$ne: {
                                    "#RAND_INT": [0,99]}}}}}
              ] } );


