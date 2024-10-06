
import os
from pprint import pprint
import datetime
from dotenv import load_dotenv
from pymongo import MongoClient
import bson

def db_connection():
    load_dotenv()
    MONGODB_URI = os.environ['MONGODB_URI']
    client = MongoClient(MONGODB_URI)
    db = client['dogs_hotel']
    return db

price_per_day = 10

def insert_guest(db, data):
    guests = db['guests']
    insert_result = guests.insert_one(data)
    return insert_result

def charge(db, guest_name, price_per_day):
    guests = db['guests']
    guest = guests.find_one({"dog_name": guest_name})
    no_of_days = (guest["to"] - guest["from"]).days
    charge = no_of_days * price_per_day
    return charge

def list_guests(db):
    guests = db['guests']
    all = guests.find()
    return all

def remove_guest(db, id):
    guests = db['guests']
    delete_result = guests.delete_one(
        {'_id': bson.ObjectId(id)}
    )
    return delete_result