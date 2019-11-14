from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import psycopg2
import psql_connect

app = Flask(__name__)
CORS(app)
# Set up a connection to the postgres server.
conn_string = "host="+ psql_connect.PGHOST +" port="+ "5432" +" dbname="+ psql_connect.PGDATABASE +" user=" + psql_connect.PGUSER \
+" password="+ psql_connect.PGPASSWORD


conn = psycopg2.connect(conn_string)
print("Connected!")


@app.route("/")
def connected_():
    return render_template('Test2.html')


@app.route('/yearly_sales', methods=['GET'])
#Get yearly sales
def yearly_sales():
    cur = conn.cursor()
    cur.execute("SELECT count(*) as yearly_sale, extract (year from invoicedate) AS year" 
     " FROM onlineretail"
    " GROUP BY year")
    sqldata= cur.fetchall()
    cur.close()

    data_json = [{"count": sqldata[i][0], "date" : sqldata [i][1] }
                   for i in range(len(sqldata))]
    return jsonify(data_json), 200

@app.route('/monthly_sales', methods=['GET', 'POST'])
#get  monthly sales
def monthly_sales():
    if request.method == 'POST' :
        data_request=request.args.get('year')
        data_request=str(data_request)
        data_request=data_request[11:15]
        cur = conn.cursor()
        cur.execute("SELECT count(*) as monthly_sale, extract (month from invoicedate) AS month" 
        " FROM onlineretail"
        " Where (extract (year from invoicedate)) = " + str(data_request)+
        " GROUP BY month")
        sqldata= cur.fetchall()
        cur.close()

        data_json = [{"count": sqldata[i][0], "date" : sqldata [i][1] }
                    for i in range(len(sqldata))]
        #print(data_json)
        return jsonify(data_json), 200

@app.route('/customer_vals', methods=['GET'])
#Customer histogram
def customer_vals():
    cur = conn.cursor()
    # cur.execute("SELECT count(*), invoicedate::date as Day  from onlineretail Group by invoicedate::date Order by Day;")
    cur.execute("SELECT distinct(customer_id), sum(price) as total_price"
                " FROM onlineretail"
                " where customer_id is not null"
                " group by customer_id"
                " order by total_price")
    sqldata = cur.fetchall()
    cur.close()
    #print(sqldata)

    data_json = [{"customerid": sqldata[i][0], "count": str(sqldata[i][1])}
                 for i in range(len(sqldata))]
    # print(data_json)
    return jsonify(data_json), 200


@app.route('/daily_sales', methods=['GET', 'POST'])
def daily_sales():
        cur = conn.cursor()
        #cur.execute("SELECT count(*), invoicedate::date as Day  from onlineretail Group by invoicedate::date Order by Day;")
        cur.execute("select sum(price) as total_sales, date(invoicedate) as date"
                    " from onlineretail"
                    " group by date(invoicedate)" )
        
        sqldata= cur.fetchall()
        cur.close()
        #print(sqldata)

        data_json = [{"count": str(sqldata[i][0]), "date" : sqldata [i][1] }
                    for i in range(len(sqldata))]
        #print(data_json)
        return jsonify(data_json), 200


@app.route('/customer_country', methods=['GET'])
#Customer by country histogram
def customer_country():
    cur = conn.cursor()
    # cur.execute("SELECT count(*), invoicedate::date as Day  from onlineretail Group by invoicedate::date Order by Day;")
    cur.execute("select count(distinct (customer_id)) as count, country"	
                " FROM onlineretail"
                " group by country"
                )
    sqldata = cur.fetchall()
    cur.close()
    #print(sqldata)

    data_json = [{"count": sqldata[i][0], "country": sqldata[i][1]}
                 for i in range(len(sqldata))]
    # print(data_json)
    return jsonify(data_json), 200


if __name__ == "__main__":
    app.run(debug=True)


