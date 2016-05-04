(function() {
  var apiURL = '/results.json';

  $(document).ready(function() {
      $.ajax({
          type: "GET",
          url: apiURL,
          dataType: 'json'
      }).then(function(data) {
        /* The code to make the map */
        // Initiate the chart
        $('#container').highcharts('Map', {

            title : {
                text : ''
            },

            chart : {
                backgroundColor: '#147F89'
            },
            legend : {
              itemStyle: {
                color: '#ffffff'
              }
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
               min: 0,
               minColor: '#D6E685',
               maxColor: '#1E6823'
            },

            series : [{
                data : data["map-data"],
                mapData: Highcharts.maps['custom/usa-and-canada'],
                joinBy: 'hc-key',
                name: 'Where did you come from?',
                states: {
                    hover: {
                        color: '#8db25c'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }]
        });

        /* Make the highcharts pie chart for favorite animals */
        var animalsListOfObjects = data["animal-data"]
        animalsData = prepHighChartsData(animalsListOfObjects);
        makeHighchartsAnimalChart(animalsData);

        /* Make the highcharts bar chart for country */
        var countriesListOfObjects = data["countries-data"]
        countryData = prepHighChartsData(countriesListOfObjects);
        makeHighchartsCountriesChart(countryData);

        /* Make the highcharts viz for droids */
        var droidsListOfObjects = data["droid-data"]
        droidData = prepHighChartsData(droidsListOfObjects);
        // TODO: Define the Droid chart
        // makeHighchartsDroidsChart(droidData);

      });
  });

  var prepHighChartsData = function(data) {
      // Create Array from JSON
      var prepped_data = [];
      for (var key in data) {
        prepped_data.push(
            {
             'sliced': true,
             'selected': true,
             'y': data[key],
             'name': key
            });
      };
      return prepped_data;
  }

  var makeHighchartsAnimalChart = function(dataList) {
    // The highcharts part
    $('#animal-pie').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 55,
                beta: 0
            },
            backgroundColor: '#147F89'
        },
        colors: ['#8db25c', '#D6E685', '#1E6823', '#003236'],
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{point.name}: {point.y} (<b>{point.percentage:.1f}%</b>)',
            style: {
              fontSize: '1.5em'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 85,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                      fontSize: '2em',
                      textShadow: false
                    },
                    color: '#ffffff'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Favorites',
            data: dataList
        }]
    });
  }

  var makeHighchartsCountriesChart = function(dataList) {
    // The highcharts part
    $('#countries-bar').highcharts({
        chart: {
            type: 'bar',
            backgroundColor: '#147F89'
        },
        title: {
            text: 'What country did you travel from?'
        },
        tooltip: {
            pointFormat: '{point.name}: {point.y} (<b>{point.percentage:.1f}%</b>)',
            style: {
              fontSize: '1.5em'
            }
        },
        series: [{
            type: 'bar',
            data: dataList
        }]
    });
  }


}());
