from flask import Flask, render_template,redirect,jsonify
from flask_pymongo import PyMongo
import sys
import json

app = Flask(__name__)

# setup mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/LeadDB"
mongo = PyMongo(app)

# print(mongo.db.AllStates.find({"year":2017}).count())

@app.route("/")
def index():
    print("I am on index.html")
    return render_template("index.html")

@app.route("/airquality")
def getAirQualityData():
    geo_json_file=open("static/data/MO_2018_Air_Quality_Standards.geojson")
    geo_json_data=(json.load(geo_json_file))
    return jsonify(geo_json_data)
   

@app.route("/timelineMap")
def getTimelineMap():
    geo_json_file=open("static/data/MO_2018_County_Boundaries_with_air_in_lead_flag.geojson")
    geo_json_data=(json.load(geo_json_file))
    return jsonify(geo_json_data)


@app.route("/years")
def getAllYears():
    #Mongo query to get unique years from the document
    data = mongo.db.AllStates.distinct('year')
    #Filter(None,data) removes all empty strings
    return jsonify(list(filter(None, data)))

def getMongoData(query):
     resp = mongo.db.AllStates.find(query, {'_id': False})
     data = []
     for doc in resp:
        data.append(doc)
     print("getmongodata",data)
     return data

@app.route("/counties/<year>")
def getLeadDataByCounties(year):
  try:
    query = { "year" : year }
    # data = getMongoData(query)
    county_lead_data = mongo.db.leadData.find(query, {'_id': False})
    data = []
   
    for doc in county_lead_data:
        data.append(doc)
        # print(data[0])
    return jsonify(data)
  except OSError:
        print(OSError)
         
 
@app.route("/mines")
def getActiveMines():
    minesData= mongo.db.minesData.find({"mine_status":"Active"},{'_id': False})
    return jsonify(list(minesData))

@app.route("/states/<year>")
def getTopStates(year):
    #find bll of missouri for a given year

    missouri_lead_level_data = getMongoData({"state":"Missouri","year":year})
    top_ten_lead_level_resp=mongo.db.AllStates.find({'state':{'$ne':"Missouri"},'year':year},\
        {'_id':False}).sort([("prct_chldrn_confirbill_5ugdl",-1)]).limit(10)
    
    combined_data = []
    combined_data.append(missouri_lead_level_data[0])
    #combined_data.append(top_ten_lead_level_data)
    for doc in top_ten_lead_level_resp:
        combined_data.append(doc)
    
    return jsonify(combined_data)

@app.route("/years/<year>")
def getLeadLevelsForYear(year):
    query = { "year" : year }
    bllByStateData = mongo.db.AllStates.find(query, {'_id': False})
  
    data = []
    for doc in bllByStateData:
        data.append(doc)
    
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)