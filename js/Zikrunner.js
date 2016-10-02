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
          var coords = stuff.where.geo_location;
          var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        
          imgurl_list[i]=stuff.media_source.default_src;
           marker[i]=
          {
              markerpoint : new google.maps.Marker({
                position: latLng,
                map: map,
                 imgurl:stuff.media_source.default_src,
			  index:i,
              }),

             // startup: function(media){
              
              //console.log("Hello");
              //}
              
          
          }
		 
		  //console.log(marker[i].index);
		  
		 
          marker[i].markerpoint.addListener('click',function(){
                if (typeof(stuff.media_source) == "undefined")alert("Damn");
                else
				{
                    document.getElementById('imgdisplay').src=this.imgurl;           
                    //var report=results.reports[i].media[0].media_source.default_src;
					console.log(this.index)
					//chumma(i);
					//console.log(marker[i].index);
					//console.log(marker[i].index);
				}
              
              
              });
			  
			
        }
      });
	  }
    