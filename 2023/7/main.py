# !/usr/bin/env python3
# -*- coding:UTF-8 -*-
"""
@Author    : SPY
@Time      : 2023/5/19 12:45
@File      : main.py
@Remarks   : 第二题
"""
import time
from lxml import etree

import execjs
import requests
import tls_client

proxy = "http://lixiaosong.letsflytech.com:2dkx8h@gate2.proxyfuel.com:2000"
proxy = "http://127.0.0.1:8888"


class Spider(object):
    def __init__(self):
        self.headers = {
            "authority": "match2023.yuanrenxue.cn",
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "origin": "https://match2023.yuanrenxue.cn",
            "pragma": "no-cache",
            "referer": "https://match2023.yuanrenxue.cn/topic",
            "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
            "x-requested-with": "XMLHttpRequest"
        }
        with open("encrypt.js", "r", encoding="UTF-8") as f:
            self.js = execjs.compile(f.read())

    def png(self):
        url = "https://match2023.yuanrenxue.cn/api/background.png"
        response = self.session.get(url, headers=self.headers)

        return response.text

    def main(self):
        url = "https://match2023.yuanrenxue.cn/api/match2023/7"
        num = 0
        self.session = tls_client.Session(client_identifier="chrome_113")
        self.session.proxies = {
            "http": proxy,
            "https": proxy,
        }
        for page in range(1, 6):
            # 每次请求最少请求一次图片地址
            ts = self.png()
            payload = {
                "page": str(page),
                "t": str(ts),
                "token": self.js.call("getEncrypted", ts, page)
            }
            response = self.session.post(url, headers=self.headers, data=payload)
            data = response.json()
            num += sum(self.js.call("parseResponse", data))
        print(num)


Spider().main()
