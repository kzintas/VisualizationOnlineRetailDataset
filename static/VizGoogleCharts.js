"use strict";
google.charts.load('current', {
  'packages': ['corechart', 'controls']
});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
//google.charts.setOnLoadCallback(drawDashboard);
google.charts.setOnLoadCallback(drawlineChart);
google.charts.setOnLoadCallback(drawHistcust);

//monitorEvents(document.getElementById('line_charts'));
window.onload= function(){

  console.log("Loaded data,"+new Date().toString());
  //console.log(new Date().toString());

}

window.onbeforeunload= function(){
  console.log("Exiting,"+new Date().toString());
  //console.log(new Date().toString());


}


function drawChart() {
  
  var jsonData = $.ajax({
    url: "http://localhost:5000/yearly_sales",
    dataType: "json",
    async: false
  }).responseText;
  //console.log(typeof jsonData);

  var array2 = JSON.parse(jsonData);
  //console.log(array2);
  //console.log(array2[0]);

  //console.log(Object.entries(array2));

  var array3 = array2.map(({
    count,
    date
  }) => ([new Date(date, 1, 1), count]));
  //console.log(array3);

  var DataTabledata = new google.visualization.DataTable();
  DataTabledata.addColumn('date', 'Year');
  DataTabledata.addColumn('number', 'Number of sale');

  DataTabledata.addRows(array3);


  
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  var YearFormatter = new google.visualization.DateFormat({
    pattern: "yyyy"
  });
  YearFormatter.format(DataTabledata, 0);
 

  function selectHandler() {
 
    var selectedItem = chart.getSelection()[0];
    console.log("Loaded Month data,"+ new Date().toString());
    
    if (selectedItem) {
      var selectedbar = DataTabledata.getValue(selectedItem.row, 0);
      //console.log(DataTabledata.getValue(selectedItem.row, 0))
      var request_obj = {
        year: selectedbar
      }
      var url2 = "http://localhost:5000/monthly_sales?" + "year=" + selectedbar;
      //console.log(url2)
      var jsonData2 = $.ajax({
        type: "POST",
        url: url2,
        data: selectedbar,
        dataType: "json",
        async: false
      }).responseText;

      var str = String(selectedbar);
      str = str.substring(11, 15);
      //console.log(str);
      var yearvar = parseInt(str);



      var array21 = JSON.parse(jsonData2);
      //console.log(array21);
      //console.log(array21[0]);

      //console.log(Object.entries(array21));
      var array31 = array21.map(({
        count,
        date
      }) => ([new Date(yearvar, date, 20), count]));
      //console.log(array31);

      var DataTabledata1 = new google.visualization.DataTable();
      DataTabledata1.addColumn('date', 'Month');
      DataTabledata1.addColumn('number', 'Number of sales');

      DataTabledata1.addRows(array31);
      var options = {
        title:'Number of sales per month',
        animation:{
          duration: 1000,
          easing: 'in'
        },
        width: 600,
        height: 350
  

      };

      var chart1 = new google.visualization.ColumnChart(document.getElementById('bar_div'));
      var MonthFormatter = new google.visualization.DateFormat({
        pattern: "MMM"
      });
      MonthFormatter.format(DataTabledata1, 0);
     
      chart1.draw(DataTabledata1, options);


    }
  }

  google.visualization.events.addListener(chart, 'select', selectHandler);
  var options = {
    //backgroundColor: '#424242',
    width: 600,
    height: 350,
    title:'Number of sales per year',
    animation:{
      duration: 1000,
      easing: 'in'
    },
    hAxis: {
      format: 'YYYY',
    }
  };
  chart.draw(DataTabledata,   options  );
}


function drawDashboard() {
  var jsonData = $.ajax({
    url: "http://localhost:5000/customer_vals",
    dataType: "json",
    async: false
  }).responseText;
  //console.log(typeof jsonData);

  var array2 = JSON.parse(jsonData);
  //console.log(array2);
  //console.log(array2[0]);

  //console.log(Object.entries(array2));

  var array3 = array2.map(({
    customerid,
    count
  }) => ([customerid, parseFloat(count)]));
  //console.log(array3);

  var DataTabledata = new google.visualization.DataTable();
  DataTabledata.addColumn('number', 'customer_ID');
  DataTabledata.addColumn('number', 'count');

  DataTabledata.addRows(array3);
  var options = {
    title: 'Histogram of customers with purchasing vale',
    legend: {
      position: 'none'
    },
    //backgroundColor: '#424242',
    histogram: {
      lastBucketPercentile: 5
    },
    width: 700,
  height: 350
  };

  var chart = new google.visualization.Histogram(document.getElementById('histo_div'));
  chart.draw(DataTabledata, options);
}


function drawlineChart() {
  var jsonData = $.ajax({
    url: "http://localhost:5000/daily_sales",
    dataType: "json",
    async: false
  }).responseText;
  //console.log(typeof jsonData);

  var array2 = JSON.parse(jsonData);
  //console.log(array2);
  //console.log(array2[0]);

  //console.log(Object.entries(array2));

  var array3 = array2.map(({
    count,
    date
  }) => ([new Date(date), parseFloat(count)]));
  //console.log(array3);

  var DataTabledata = new google.visualization.DataTable();
  DataTabledata.addColumn('date', 'Date');
  DataTabledata.addColumn('number', 'Amount');

  DataTabledata.addRows(array3);




  //var DataTabledata =  google.visualization.arrayToDataTable(array3);
  //console.log(DataTabledata);

  var options = {
    title: 'Sales amount on daily basis',
    curveType: 'function',
    legend: {
      position: 'bottom'
    },
    hAxis: {
      format: 'MMM YYYY',
    },
    //colors: ['red'],
    //backgroundColor: '#424242',
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset'],
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 15.0
    },
    width: 600,
    height: 350
  };

  var chart = new google.visualization.LineChart(document.getElementById('line_charts'));

  chart.draw(DataTabledata, options);
}


function drawHistcust() {
  var jsonData = $.ajax({
    url: "http://localhost:5000/customer_country",
    dataType: "json",
    async: false
  }).responseText;

  var array2 = JSON.parse(jsonData);
  //console.log(array2);

  var array3 = array2.map(({
    count,
    country
  }) => ([country, count]));
  //console.log(array3);

  
  var DataTabledata = new google.visualization.DataTable();
  DataTabledata.addColumn('string', 'country');
  DataTabledata.addColumn('number', 'count');
  DataTabledata.addRows(array3);

  var options = {
    width: 600,
  height: 350,
    title: 'Histogram of number of customers from countries',
    legend: { position: 'none' },
    animation:{
      startup: true,
      duration: 1000,
      easing: 'in'
    },
    colors: ['#e7711c'],
    histogram: { lastBucketPercentile: 10 },
    vAxis: { scaleType: 'mirrorLog' }
  };

  

  var chart = new google.visualization.Histogram(document.getElementById('hist_cust'));
  chart.draw(DataTabledata, options);
}

$(document).ready(
  document.getElementById("hist_cust").onmouseenter= function(e) {
    console.log("Mouseonhistogram,"+ new Date().toString());
},

document.getElementById("line_charts").onclick= function(e) {
  console.log("Mouseonline,"+ new Date().toString());
},

document.getElementById("chart_div").onclick= function(e) {
  console.log("Mouseonyear,"+ new Date().toString());
},
document.getElementById("bar_div").onclick= function(e) {
  console.log("Mouseonmonth,"+ new Date().toString());
}
);


//        console.log(jsonData);
//        document.write(jsonData)