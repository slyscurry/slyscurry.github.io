var cumulative = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./cumulative.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

var exoplanet = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./exoplanet.json",
        'dataType': "json",
        'success': function (data) {
          json = data;
        }
        
    });
    return json;
})(); 



for (i = 0; i<exoplanet.length;i++)
{
   var singleItem = exoplanet[i];
   singleItem.kepler_name = exoplanet[i].pl_hostname + " " + exoplanet[i].pl_letter; // example
}

var mergedJSON = cumulative;// Copying Source2 to a new Object

for (j = 0; j<cumulative.length;j++)
{
   var cumulativeKeplerName = cumulative[j].kepler_name;
   var cumulativeRade = cumulative[j].koi_prad;
   var mergeItem = mergedJSON[j];

    for (i = 0; i<exoplanet.length;i++)
    {
       if(exoplanet[i].pl_rade != null)
          {
            if(exoplanet[i].kepler_name == cumulativeKeplerName)
            {
              mergeItem.rade = exoplanet[i].pl_rade;
              break
            }
          }
          else
          {
            mergeItem.rade = cumulativeRade;
          }
    }
}

console.log(mergedJSON);




// console.log(exoplanet);

// function mergeJSON(source1,source2){
//     /*
//      * Properties from the Souce1 object will be copied to Source2 Object.
//      * Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.
//      * */

//     var mergedJSON = Object.create(source2);// Copying Source2 to a new Object
//     // console.log(source2);

//     for (var pl_rade in source1) {
//         if(mergedJSON.hasOwnProperty(pl_rade)) {
//           if ( source1[pl_rade]!=null && source1[pl_rade].constructor==Object ) {
//               /*
//                * Recursive call if the property is an object,
//                * Iterate the object and set all properties of the inner object.
//               */
//               mergedJSON[pl_rade] = mergeJSON(source1[pl_rade], mergedJSON[pl_rade]);
//           } 

//         } else {//else copy the property from source1
//             mergedJSON[pl_rade] = source1[pl_rade];

//         }
//       }

//       return mergedJSON;
//       // console.log(mergedJSON);
      
// };

// console.log(cumulative);

// mergeJSON(exoplanet,cumulative);

// console.log(mergeJSON(cumulative,exoplanet));

// console.log($.extend(true, {}, exoplanet, cumulative));


// function merge_options(obj1,obj2){
//     var obj3 = {};
//     for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
//     for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
//     return obj3;
// }

// d3.json(cumulative, function(error, dataset) {
//       if (error) return console.warn(error);
//       console.log(dataset);
//     });

// pl_rade
// kepler_name

// function mergeJSON(source1,source2){
//     /*
//      * Properties from the Souce1 object will be copied to Source2 Object.
//      * Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.
//      * */
//     var mergedJSON = Object.create(source2);// Copying Source2 to a new Object

//     for (var attrname in source1) {
//         if(mergedJSON.hasOwnProperty(attrname)) {
//           if ( source1[attrname]!=null && source1[attrname].constructor==Object ) {
//               /*
//                * Recursive call if the property is an object,
//                * Iterate the object and set all properties of the inner object.
//               */
//               mergedJSON[attrname] = mergeJSON(source1[attrname], mergedJSON[attrname]);
//           } 

//         } else {//else copy the property from source1
//             mergedJSON[attrname] = source1[attrname];

//         }
//       }

//       return mergedJSON;
// }