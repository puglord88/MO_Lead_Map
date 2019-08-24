import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

LeadDB = myclient["LeadDB"]
mycol = LeadDB["AllStates"]

myquery = {}

mydoc = mycol.find(myquery)

for x in mydoc:
  print(x)

from flask import Flask, jsonify

app = Flask(__name__)

jsonify(mydoc)
