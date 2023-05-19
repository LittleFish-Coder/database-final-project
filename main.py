from flask import Flask, request, jsonify, Response, render_template
from flask_cors import CORS
import pandas as pd
import json
import requests
import mysql.connector  # for connecting to mysql

try:
    # configuration of db info
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="DATABASE_FINAL_PROJECT"
    )
    # initiate the db
    mycursor = mydb.cursor()
except mysql.connector.Error as err:
    print("Failed to connect to MySQL: {}".format(err))
    mycursor = None

app = Flask(__name__, static_folder='static')
CORS(app)

token = json
with open('API_tokens.json') as f:
    token = json.load(f)

app_id = token['Client Id']
app_key = token['Client Secret']
auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"


class Auth():

    def __init__(self, app_id, app_key):
        self.app_id = app_id
        self.app_key = app_key

    def get_auth_header(self):
        content_type = 'application/x-www-form-urlencoded'
        grant_type = 'client_credentials'

        return {
            'content-type': content_type,
            'grant_type': grant_type,
            'client_id': self.app_id,
            'client_secret': self.app_key
        }


class data():

    def __init__(self, app_id, app_key, auth_response):
        self.app_id = app_id
        self.app_key = app_key
        self.auth_response = auth_response

    def get_data_header(self):
        auth_JSON = json.loads(self.auth_response.text)
        access_token = auth_JSON.get('access_token')

        return {
            'authorization': 'Bearer '+access_token
        }

# define routes and API endpoints here


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/bus/', methods=['GET'])
def bus():
    return render_template('bus.html')


@app.route('/train/', methods=['GET'])
def train():
    return render_template('train.html')


@app.route('/bike/', methods=['GET'])
def bike():
    return render_template('bike.html')


@app.route('/like/', methods=['GET'])
def like():
    return render_template('like.html')


@app.route('/api/get_bike/', methods=['GET'])
def get_bike():
    bike = pd.read_csv('./data/bike.csv')
    json_array = bike[['StationID', 'StationName_Zh_tw', 'StationAddress_Zh_tw',
                       'PositionLon', 'PositionLat']].to_json(orient='records')
    return json_array


@app.route('/api/rest_bike/<stationID>/', methods=['Get'])
def rest_bike(stationID):
    # TDX API services
    url = "https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/Tainan"
    a = Auth(app_id, app_key)
    auth_response = requests.post(auth_url, a.get_auth_header())
    d = data(app_id, app_key, auth_response)
    data_response = requests.get(url, headers=d.get_data_header())
    #
    data_list = json.loads(data_response.text)

    for station in data_list:
        if station['StationID'] == stationID:
            response = {
                'StationID': stationID,
                'AvailableRentBikes': station['AvailableRentBikes'],
                'AvailableReturnBikes': station['AvailableReturnBikes']
            }
            print(jsonify(response))
            return jsonify(response)

    return None


# some simple syntax for flask beginner

@app.route('/api/test/', methods=['GET'])
def test():
    data = {'message': 'This is a test'}
    return jsonify(data)


@app.route('/api/db/test', methods=['GET'])
def db_test():
    mycursor.execute("SELECT * FROM TEST_TABLE")

    data = mycursor.fetchall()
    for x in data:
        print(x)

    return jsonify(data)


@app.route('/db/test/insert', methods=['GET', 'POST'])
def db_test_insert():
    data = request.get_json()
    testID = data.get('testID')
    testCONTENT = data.get('testCONTENT')
    print(testID, testCONTENT)
    SQL = "INSERT INTO TEST_TABLE (testID, testCONTENT) VALUES (%s, %s)"
    values = (testID, testCONTENT)
    mycursor.execute(SQL, values)
    mydb.commit()
    return jsonify({'message': 'Data submitted successfully'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,  debug=True)
