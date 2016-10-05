var DODTable= {"Poï¿½a suja!":1,
				"Piscina":2,
				"Caixa!":1,
				"Esgosto":1,
				"Plantas":6,
				"Terreno abandonado":4,
				"Pneus!":3,
				"Lixo!":2,
				"Casa!":5,
				"Mosquito?":7,
				"Pessoas sintomas":7,
				"Hospitais!":7,
				"Demora":7,
				"Outros!":8}
function init()
{
	// DOM element where the Timeline will be attached
  var container = document.getElementById('visualization');

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet([
    {id: 1, content: 'item 1', start: '2014-04-20'},
    {id: 2, content: 'item 2', start: '2014-04-14'},
    {id: 3, content: 'item 3', start: '2014-04-18'},
    {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
    {id: 5, content: 'item 5', start: '2014-04-25'},
    {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
  ]);

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
}
var marker=[],imgurl_list=[];
	  
	  function loader()
	  {
      $.getJSON('http://trackzika.uci.krumbs.io/events?limit=1000', function(results) {
        for (var i = 0; i < results.reports.length; i++) {
          var stuff=results.reports[i].media[0];
		  //console.log(stuff.media_source.default_src);
		  var revgeo_places={unformatted_address:"Unavailable",};
		  if (typeof(stuff.where.revgeo_places) == "undefined")
		  {
			  
			  stuff.where.revgeo_places=revgeo_places;
			  
			  
		  }
          var coords = stuff.where.geo_location;
          var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        if (typeof(stuff.where.revgeo_places["unformatted_address"]) == "undefined")
		  {
			  stuff.where.revgeo_places["unformatted_address"]="Unavailable";
			  //console.log(stuff.where.revgeo_places);
		  }
		  //console.log(marker[i].index);
		  var intent=stuff.why[0].intent_used_synonym;
		 var contentString= '<div id="bodyContent">'+
            '<p><b>Location:  </b> ' + stuff.where.revgeo_places["unformatted_address"] +
			'<br><p><b>Date:  </b> '+new Date(stuff.when.start_time).toUTCString()+
			'<br><p><b>Type of Risk:  </b> '+intent+
			'<br><p><b>Degree of Risk: </b>'+DODTable[intent]+'</div>';
			var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
          imgurl_list[i]=stuff.media_source.default_src;
           marker[i]=
          {
              markerpoint : new google.maps.Marker({
                position: latLng,
                map: map,
                 imgurl:stuff.media_source.default_src,
			  index:i,
			  infobox:infowindow,
			  
              }),

             // startup: function(media){
              
              //console.log("Hello");
              //}
              
          
          }
		  
			/*
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>';*/
          marker[i].markerpoint.addListener('click',function(){
                if (typeof(stuff.media_source) == "undefined")alert("Media Unavailable");
                else
				{
                    document.getElementById('imgdisplay').src=this.imgurl;           
                    //var report=results.reports[i].media[0].media_source.default_src;
					console.log(this.index);
					console.log()
					this.infobox.open(map, this);
					//chumma(i);
					//console.log(marker[i].index);
					//console.log(marker[i].index);
				}
              
              
              });
			 
		}
      });
	  }
	  