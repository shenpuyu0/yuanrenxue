# !/usr/bin/env python3
# -*- coding:UTF-8 -*-
"""
@Author    : SPY
@Time      : 2023/5/19 12:45
@File      : main.py
@Remarks   : 第二题
"""
import execjs
import requests


class Spider(object):
    def __init__(self):
        # Cookie需要传入sessionId
        self.headers =  {
            "user-agent": "yuanrenxue.project",
            "Cookie": "sessionid=yvlnrc0vd8mfhfx9xjydypk8r286o9fo"
        }
        with open("encrypt.js") as f:
            self.js =execjs.compile(f.read())

    def main(self):
        url = "https://match.yuanrenxue.cn/api/match/1"
        nums = []
        for page in range(1, 6):
            sign = self.js.call("getEncrypted")
            params = {
                "page": str(page),
                "m": sign,
            }
            response = requests.get(url, headers=self.headers, params=params)
            data = response.json()
            print(data)
            nums.extend([dic["value"] for dic in data["data"]])
        print(sum(nums) / len(nums))

Spider().main()

