# !/usr/bin/env python3
# -*- coding:UTF-8 -*-
"""
@Author    : SPY
@Time      : 2023/5/19 10:11
@File      : main.py
@Remarks   : 第一题
@TODO      : 加密函数使用的是window.sign(window.page + "|" + Date.now())
@TODO      : window.sign由wasm加载，但具体加载方法未搞定
"""
import time

import requests

class Spider(object):
    def __init__(self):
        # Cookie需要传入sessionId
        self.headers =  {
            "user-agent": "yuanrenxue.project",
            "Cookie": "sessionid=twfvxfcpoumepjh97i6ad4v31p8x2mji"
        }

    def main(self):
        url = "https://match.yuanrenxue.cn/api/match/20"
        sumNum = 0
        for page in range(1, 6):
            ts = int(time.time() * 1000)
            sign = input(f"\n请输入sign {page}|{ts}: ")
            params = {
                "page": str(page),
                "sign": sign,
                "t": ts
            }
            response = requests.get(url, headers=self.headers, params=params)
            data = response.json()
            sumNum += sum([dic["value"] for dic in data["data"]])
            print(sumNum)
    def main2(self):
        urls = [
            "https://match.yuanrenxue.cn/api/match/20?page=1&sign=be6cdcaba1ae603e8a724e61f336fe9d&t=1684466579000",
            "https://match.yuanrenxue.cn/api/match/20?page=2&sign=81d98e19230c0fe415055351f1736637&t=1684466579000",
            "https://match.yuanrenxue.cn/api/match/20?page=3&sign=46f06312735827ded2a5988631d51f30&t=1684466579000",
            "https://match.yuanrenxue.cn/api/match/20?page=4&sign=d355a1e9281ab4494dd1f73534b4c37c&t=1684466579000",
            "https://match.yuanrenxue.cn/api/match/20?page=5&sign=ffc661f1ea68d19582f287cc8a0688e5&t=1684466579000",
        ]
        sumNum = 0
        for url in urls:
            response = requests.get(url, headers=self.headers)
            # print(response.text)
            data = response.json()
            # print(data)
            sumNum += sum([dic["value"] for dic in data["data"]])
            # print(sumNum)
        print(sumNum)

Spider().main2()
