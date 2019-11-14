
"use strict";
 google.charts.load('current', {'packages':['corechart']});

 // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        //console.log("here");
        var jsonData = $.ajax({
            url: "http://localhost:8080/daily_sales",
            dataType: "json",
            async: false
        }).responseText;
        console.log(typeof jsonData);

        var array2 = JSON.parse(jsonData);
        console.log(array2);
        console.log(array2[0]);

        console.log(Object.entries(array2));
        var array3 = array2.map(({ count, date}) => ([new Date(date, 0,0), count]));
        console.log(array3);

        var DataTabledata= new google.visualization.DataTable();
        DataTabledata.addColumn('date', 'Date');
        DataTabledata.addColumn('number', 'count');
        
        DataTabledata.addRows(array3);
        


        //var DataTabledata =  google.visualization.arrayToDataTable(array3);
        console.log(DataTabledata);


        /*


        var arrSales = [['count', 'Date']];    // Define an array and assign columns for the chart.

                // Loop through each data and populate the array.
                $.each(jsonData, function (index, value) {
                    arrSales.push([value.count, value.date]);
                });

        // Create DataTable and add the array to it.
                var figures = google.visualization.arrayToDataTable(arrSales)
                console.log(figures);
                console.log(arrSales);
                

        */



         // Create our data table out of JSON data loaded from server.

        // 5. Create a new DataTable (Charts expects data in this format)
        /*var data = new google.visualization.DataTable();

        // 6. Add two columns to the DataTable
        data.addColumn('number',   'Count');
        data.addColumn('datetime', 'Time');

        console.log(jsonData);

        console.log(data);



        // 7. Cycle through the records, adding one row per record
       for (var i = 0; i < jsonData.length; i++) {

          data.addRow(jsonData[i].count, jsonData[i].date);
        }

         */

        //console.log(data.toArray());

      //var data = new google.visualization.DataTable(jsonData);

      // Instantiate and draw our chart, passing in some options.

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

      function selectHandler() {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          var topping = DataTabledata.getValue(selectedItem.row, 0);
          //alert('The user selected ' + topping);
          console.log(topping);
        }
      }

      google.visualization.events.addListener(chart, 'select', selectHandler); 
      
      chart.draw(DataTabledata, {width: 400, height: 240});
    }


//        console.log(jsonData);
//        document.write(jsonData)


