# !/usr/bin/env python3
# -*- coding:UTF-8 -*-
"""
@Author    : SPY
@Time      : 2023/5/24 17:11
@File      : httpServer.py
@Remarks   : 
"""
import requests
from flask import Flask,request

app = Flask(__name__)

@app.route("/api/loginInfo")
def logininfo():
    return {}
@app.route("/match2023/corejs/match4.js")
def js():
    with open("./encrypt.js", "r", encoding="UTF-8") as f:
        return f.read()


with open("./html.html", "r", encoding="UTF-8") as f:
    _html = f.read()
@app.route("/")
def html():
    return _html

@app.route("/api/match2023/4", methods=["POST"])
def post():
    payload = request.form.to_dict()
    print(f"request fromData: {payload}")
    # response = requests.post("https://match2023.yuanrenxue.cn/api/match2023/3", data =payload)
    # print(response.text)
    return {"status": "1", "state": "success", "data": [{"value": 9508}, {"value": 3182}, {"value": 8739}, {"value": 5367}, {"value": 145}, {"value": 3416}, {"value": 7663}, {"value": 2491}, {"value": 4782}, {"value": 9745}]}




app.run("0.0.0.0", 9999)





"http://10.0.15.108:9998/service/tlsProxy"