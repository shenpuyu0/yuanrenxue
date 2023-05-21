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
        cookies = {
            # "Hm_lvt_2a795944b81b391f12d70da5971ba616": "1684498011",
            # "qpfccr": "true",
            # "no-alert3": "true",
            # "tk": "-4085010703818245239",
            # "sessionid": "mb9ih3e3op1ff8d5rxa4b4v5g4iva7fn",
            # "Hm_lpvt_2a795944b81b391f12d70da5971ba616": "1684499513"
        }
        url = "https://match2023.yuanrenxue.cn/api/match2023/1"
        nums = []
        for page in range(1, 6):
            data = self.js.call("getEncrypted", page)
            response = requests.post(url, headers=self.headers, cookies=cookies, data=data,
                                    # proxies={"https": "http://127.0.0.1:8888"}, verify=False
                                     )
            data = response.json()
            print(data)
            nums.extend([dic["value"] for dic in data["data"]])
        print(sum(nums))


Spider().main()
