# !/usr/bin/env python3
# -*- coding:UTF-8 -*-
"""
@Author    : SPY
@Time      : 2023/5/24 17:11
@File      : httpServer.py
@Remarks   : 
"""
import requests
import tls_client
from flask import Flask,request, Response

from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins="*")

@app.route("/api/loginInfo")
def logininfo():
    return {}
@app.route("/match2023/corejs/match4.js")
def js():
    with open("./encrypt.js", "r", encoding="UTF-8") as f:
        return f.read()
@app.route("/static/match2023/js/jquery.cookie.min.js")
def js2():
    with open("./jquery.cookie.js", "r", encoding="UTF-8") as f:
        return f.read()


@app.route("/")
def html():
    with open("./html.html", "r", encoding="UTF-8") as f:
        jstext =  f.read()
    resp = Response("设置Cookie！")

    sessionid = request.cookies.get("sessionid", "")
    if not sessionid:
        headers = {
            "authority": "match2023.yuanrenxue.cn",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
        }
        res = tls_client.Session(
            client_identifier="chrome_106"
        ).get("https://match2023.yuanrenxue.cn/topic/4", headers=headers)
        # for cook in res.cookies:
        #     resp.headers.update({
        #         "Set-Cookie": f"sessionid={cook.value}; Domain=match2023.yuanrenxue.cn; Secure; HttpOnly; Path=/; SameSite=Lax"
        #     })
        #     # resp.set_cookie(
        #     #     key= cook.name,
        #     #     value= cook.value,
        #     #     max_age= 21600,
        #     #     expires= cook.expires,
        #     #     path= "/",
        #     #     domain= "match2023.yuanrenxue.cn",
        #     #     secure= cook.secure,
        #     #     httponly= True,
        #     #     samesite= "Lax"
        #     # )
        sessionid = res.cookies.get("sessionid")
    print(f"SET COOKIE: {sessionid}")
    resp.data = jstext.replace("SESSIONID", sessionid)
    return resp

# @app.route("/api/match2023/4", methods=["POST"])
# def post():
#     payload = request.form.to_dict()
#     print(f"request fromData: {payload}")
#     # response = requests.post("https://match2023.yuanrenxue.cn/api/match2023/3", data =payload)
#     # print(response.text)
#     return {"status": "1", "state": "success", "data": [{"value": 9508}, {"value": 3182}, {"value": 8739}, {"value": 5367}, {"value": 145}, {"value": 3416}, {"value": 7663}, {"value": 2491}, {"value": 4782}, {"value": 9745}]}




app.run("0.0.0.0", 9999)