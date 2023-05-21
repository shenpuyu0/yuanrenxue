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
            "referer": "https://match2023.yuanrenxue.cn/topic/1",
            "accept-language": "zh-CN,zh;q=0.9"
        }
        s = {
            "user-agent": "yuanrenxue.project",
        }
        with open("js.js") as f:
            self.js = execjs.compile(f.read())

    def main(self):
        url = "https://match2023.yuanrenxue.cn/api/match2023/2"
        nums = []
        for page in range(1, 6):
            params = self.js.call("getEncrypted", page)
            response = requests.get(url, headers=self.headers, params=params,
                                    proxies={"https": "http://127.0.0.1:8888"}, verify=False
                                     )
            data = response.json()
            print(data)
            nums.extend([dic["value"] for dic in data["data"]])
        print(sum(nums))


# Spider().main()


def toHex(ls):
    s = ""
    for i in ls:
        s += hex(i).replace("0x", "")
    print(s)

toHex([121, 117, 197, 86, 29, 245, 54, 41, 251, 162, 82, 44, 196, 106, 100, 146, 81, 164, 228, 235, 15, 50, 144, 131, 213, 142, 53, 201, 114, 5, 51, 146])