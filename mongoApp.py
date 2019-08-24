from flask import Flask, render_template,redirect
from flask_pymongo import PyMongo


import sys

app = Flask(__name__)

# setup mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/LeadDB"
mongo = PyMongo(app)

lead_data=mongo.db.year_2017.find_one()
print(lead_data)
myquery = { "County Name": { "$regex": "^S" } }
county_data=mongo.db.year_17.find(myquery)
print(county_data)
