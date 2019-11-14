#Instructions on how to setup and run the server, and how the interface works

For logging into postgres database and setting up the flask server, the codes on **shellcommands.sh** files should be executed.  We need the psycopg2 package that was installed 
without using pip command due to some system error.

For setting up the database, the necessary SQL commands are given in the **dbcommands.sql** file. The data will be loaded from the two online_retail csvs attached in the folder.

For running the server env FLASK_APP=server2.py flask run --host="127.0.0.1" --port=8080
will host the server at port 8080

The interface works in two ways. In the first bar chart if one of the bars are clicked then the data for months of that corresponding year is shown. In the second histogram plot we can see the number of customers within a certain buying value range.



#A rationale for  (visualization, interaction, and back-end) design decisions

As the dataset had to have over 1 million rows, I chose the online retail dataset, flask was chosen for running server as it integrates easily with python code. Also psycopg2 makes connecting with database very easy. As my dataset contained mostly numeric data that can be divided into time-categories, I chose bar chart and histogram for general overview of the data.

**Alternative design considerations**

For this visualization, I also considered brushing techniques with showing sales data for each day, but due to being new in google charts, I could not quite implement that.

 
#An overview of your development process
Below I provide a timeline of my project-
**Searching and finding the optimal database- 8 hours**
Took some time to find it

**Setting up the database to server connection and hosting the server- 8 hours**

Had to scrape some online codes for DB connection, while wrote the queries and html files on my own

**Learning JS 20 hours**

As JS is a very unusual language, took some time to understand JSON and the asynchronous calls.

**Making design Decisions and choice of tools- 50 hours**

This was the most crucial step and I got lost in this one. Initially, I wanted to implement the visualizations on D3, but the versions of D3 are so confusing! None of the v3 codes I found online ran on v5. Also, I was unable to get visualization from all the bar chart codes that I tried. Not even examples from professor Battle's slides. This took me a lot of time untill I gave up and switched to google Charts 2 days before submission. I included the D3 codes also in my submission so that the instructors may consider my effort despite of this poor submission.
