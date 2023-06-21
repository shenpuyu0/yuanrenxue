# !/usr/bin/env python3
# -*- coding:UTF-8 -*-
"""
@Author    : SPY
@Time      : 2023/6/21 18:59
@File      : main.py
@Remarks   : 
"""
import time

import execjs
import requests


headers = {
    "authority": "match2023.yuanrenxue.cn",
    "accept": "application/json",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://match2023.yuanrenxue.cn",
    "pragma": "no-cache",
    "referer": "https://match2023.yuanrenxue.cn/topic/8/data",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
}


url = "https://match2023.yuanrenxue.cn/api/background.png"
response = requests.get(url, headers=headers)
ts = response.text.strip()

url = "https://match2023.yuanrenxue.cn/api/match2023/8"

with open("encrypt.js", "r", encoding="UTF-8") as f:
    js = execjs.compile(f.read())
token  = js.call("getEncrypted", ts)
data = {
    "token": token,
    "t": ts,
    "page": "1"
}
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)