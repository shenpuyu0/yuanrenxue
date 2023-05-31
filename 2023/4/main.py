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
import tls_client


class Spider(object):
    def __init__(self):
        # Cookie需要传入sessionId
        self.headers = {
            "authority": "match2023.yuanrenxue.cn",
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "origin": "https://match2023.yuanrenxue.cn",
            "pragma": "no-cache",
            "referer": "https://match2023.yuanrenxue.cn/topic/4",
            "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "Cookie": "Hm_lvt_2a795944b81b391f12d70da5971ba616=1684918579; sessionid=d16u8hrgryjl591med8otgfy3ewov6ml; Hm_lpvt_2a795944b81b391f12d70da5971ba616=1685410554",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
            "x-requested-with": "XMLHttpRequest"
        }
        s = {
            "user-agent": "yuanrenxue.project",
        }
        with open("encrypt.js", "r", encoding="UTF-8") as f:
            self.js = execjs.compile(f.read())

    def main(self):
        url = "https://match2023.yuanrenxue.cn/api/match2023/4"
        nums = []
        for page in range(1, 6):
            # data = self.js.call("getEncrypted", page)
            data = {
                "page": 1,
                "yt4": "oNzlQUHEnQ1UlGSpTch5laFIOTnBWJHh2alAyV317CnFOciQAAx9qWkQvDGZ6QkBtSiEnaHYTAjdzbTFlR303GV9nImQlOkFqZARrckRPRyxwKXVcDQUX"
            }
            print(data)
            response = requests.post(url, headers=self.headers, data=data)
            data = response.json()
            print(data)
            nums.extend([dic["value"] for dic in data["data"]])
        print(sum(nums))


Spider().main()
