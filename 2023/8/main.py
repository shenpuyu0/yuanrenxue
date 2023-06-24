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




class Spider(object):
    def __init__(self):
        self.headers = {
            "Host": "match2023.yuanrenxue.cn",
            "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest",
            "sec-ch-ua-mobile": "?0",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
            "sec-ch-ua-platform": "\"Windows\"",
            "origin": "https://match2023.yuanrenxue.cn",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://match2023.yuanrenxue.cn/topic/",
            "accept-language": "zh-CN,zh;q=0.9"
        }
        with open("./decrypt.js", "r", encoding="UTF-8") as f:
            self.decrypt = execjs.compile(f.read())
        with open("./encrypt.js", "r", encoding="UTF-8") as f:
            self.encrypt = execjs.compile(f.read())

    def main(self):
        nums = []
        for page in range(1, 6):
            url = "https://match2023.yuanrenxue.cn/api/background.png"
            response = requests.get(url, headers=headers)
            ts = response.text.strip()
            payload = {
                "token": self.encrypt.call("getEncrypted", ts),
                "t": ts,
                "page": str(page)
            }
            print(payload)
            url = "https://match2023.yuanrenxue.cn/api/match2023/8"
            response = requests.post(url, headers=self.headers, data=payload)
            print(response.text)
            data = self.decrypt.call("decrypt", ts, page, response.json()["result"])
            print(data)
            nums.extend([v["value"] for v in data["data"]])
        print(sum(nums))


Spider().main()
