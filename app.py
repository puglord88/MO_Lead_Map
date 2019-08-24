from flask import Flask, render_template,redirect,jsonify
from flask_pymongo import pymongo
import sys

app = Flask(__name__)

# setup mongo connection
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["LeadDB"]
AllStates = mydb["AllStates"]
leadData = mydb["leadData"]
minesData = mydb["minesData"]

# print(mongo.db.AllStates.find({"year":2017}).count())

@app.route("/")
def index():
    print("I am on index.html")
   
    return render_template("index.html")

@app.route("/years")
def getAllYears():
    #Mongo query to get unique years from the document
    data = mydb.AllStates.distinct('year')
    #Filter(None,data) removes all empty strings
    return jsonify(list(filter(None, data)))

@app.route("/county")
def getMinecounty():
    #Mongo query to get unique years from the document
    print("retrieving counties from mines")
    data = mydb.minesData.distinct('county_name')
    print(data)
    #Filter(None,data) removes all empty strings
    return jsonify(list(filter(None, data)))

def getMongoData(query):
     resp = mydb.AllStates.find(query, {'_id': False})
     data = []
     for doc in resp:
        data.append(doc)
     print("getmongodata",data)
     return data

@app.route("/counties/year")
def getAllcounties(year):
    query = { "year" : year }
   # data = getMongoData(query)
    countyLeadyears = mydb.leadData.find(query, {'_id': False})
    #bllByStateData = mongo.db.AllStates.find(query, {'_id': False,"state":1,"PRCT_chldrn_confirbill_10ugdl":1}).limit(10)
    data = []
    for doc in countyLeadyears:
        data.append(doc)

@app.route("/mines/county")
def getMineData(county_name):
    query = { "county_name" : county_name  }
   # data = getMongoData(query)
    mineLead = mydb.minesData.find(query, {'_id': False})
    #bllByStateData = mongo.db.AllStates.find(query, {'_id': False,"state":1,"PRCT_chldrn_confirbill_10ugdl":1}).limit(10)
    data = []
    for doc in mineLead:
        data.append(doc)

# @app.route("/mines/")
# def getAllmines():
#     #Mongo query to get unique years from the document
#     data = mongo.db.minesData.distinct('mine_id')
#     #Filter(None,data) removes all empty strings
#     return jsonify(list(filter(None, data)))
    
    # First sort all the docs by BLL 5mg

# @app.route("/mines/<county>")
# def getMinesdata():
# #    MoData= mongo.db.AllStates.aggregate([
#                 #      { $match: { "state": "Missouri" } }
#                 #    ]);
#     query = { "county" : "washington" }
#     Minesdata = mongo.db.minesData.find(query, {'_id': False})
#         # {"prct_chldrn_confirbill_5ugdl":{ "$gt": "3" }}
#         # ,{"state":1,"prct_chldrn_confirbill_5ugdl":1,"PRCT_chldrn_confirbill_10ugdl":1},
#         # {'_id': False}).limit(10)
#     data = []
#     for doc in Minesdata:
#         data.append(doc)
#     print(data)
    
#     return jsonify(data)
        

@app.route("/years/<year>")
def getLeadLevelsForYear(year):
    query = { "year" : year }
   # data = getMongoData(query)
    bllByStateData = mongo.db.AllStates.find(query, {'_id': False})
    #bllByStateData = mongo.db.AllStates.find(query, {'_id': False,"state":1,"PRCT_chldrn_confirbill_10ugdl":1}).limit(10)
    data = []
    for doc in bllByStateData:
        data.append(doc)
    
    return jsonify(data)

# @app.route("/year")
# def getYear():
#     print(" I am in get year Method")
#     myquery={"prct_chldrn_confirbill_5ugdl":{ "$gt": "3" }}
#     bllByStateData = mongo.db.AllStates.find(myquery, {'_id': False})
#     #for yearData in bllByStateData.find({},{"year":1,"prct_chldrn_confirbill_5ugdl":1,"PRCT_chldrn_confirbill_10ugdl":1,"state":1}):
    
#     data = []
#     for doc in bllByStateData:
#         data.append(doc)
    
#     return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)