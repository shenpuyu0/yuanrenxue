# !/usr/bin/env python3
# -*- coding:UTF-8 -*-
"""
@Author    : SPY
@Time      : 2023/5/19 12:45
@File      : main.py
@Remarks   : 第二题
"""
import time

import execjs
import requests
import tls_client

proxy = "http://lixiaosong.letsflytech.com:2dkx8h@gate2.proxyfuel.com:2000"
proxy = "http://127.0.0.1:8888"


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

    def index(self):
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
        url = "https://match2023.yuanrenxue.cn/topic/7"
        response= self.session.get(url, headers=headers)
        print(response.cookies.get_dict())

    def png(self):
        headers = {
            "authority": "match2023.yuanrenxue.cn",
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://match2023.yuanrenxue.cn/topic/4",
            "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
        }
        url = "https://match2023.yuanrenxue.cn/api/background.png"
        response = self.session.get(url, headers=headers)

        return response.text

    def main(self):
        self.cookies = {}
        url = "https://match2023.yuanrenxue.cn/api/match2023/7"
        nums = []
        self.session = tls_client.Session(client_identifier="chrome_113")
        self.session.proxies = {
            "http": proxy,
            "https": proxy,
        }
        self.index()
        for page in range(1, 6):
            # 每次请求最少请求一次图片地址
            ts = self.png()
            payload = {
                "page": str(page),
                "t": str(ts),
                "token": self.js.call("getEncrypted", ts, page)
            }
            print(payload)
            response = self.session.post(url, headers=self.headers, data=payload)
            self.cookies.update(response.cookies.get_dict())
            data = response.json()
            print(data)
            nums.extend([dic["value"] for dic in data["data"]])
        print(sum(nums))
    #
    # headers = {
    #     "Host": "match2023.yuanrenxue.cn",
    #     "pragma": "no-cache",
    #     "cache-control": "no-cache",
    #     "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    #     "accept": "application/json, text/javascript, */*; q=0.01",
    #     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    #     "x-requested-with": "XMLHttpRequest",
    #     "sec-ch-ua-mobile": "?0",
    #     "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    #     "sec-ch-ua-platform": "\"macOS\"",
    #     "origin": "https://match2023.yuanrenxue.cn",
    #     "sec-fetch-site": "same-origin",
    #     "sec-fetch-mode": "cors",
    #     "sec-fetch-dest": "empty",
    #     "referer": "https://match2023.yuanrenxue.cn/topic/7",
    #     "accept-language": "zh-CN,zh;q=0.9"
    # }
    # url = "https://match2023.yuanrenxue.cn/api/match2023/7"
    # data = {
    #     "page": "1",
    #     "t": "1686211389720",
    #     "token": "b577f3d75fcf67a71917552748f9e080"
    # }
    # response = requests.post(url, headers=headers, data=data)
    #
    # print(response.text)
    # print(response)


Spider().main()
