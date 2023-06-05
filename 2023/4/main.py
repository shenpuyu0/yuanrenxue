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
        url = "https://match2023.yuanrenxue.cn/topic/4"
        response = requests.post("http://10.0.15.108:9998/service/tlsProxy", json={"method":"GET", "url":url, "headers":headers, "cookies": self.cookies, "proxies":proxy})
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
        response = requests.post("http://10.0.15.108:9998/service/tlsProxy", json={"method":"GET", "url":url, "headers":headers, "cookies": self.cookies, "proxies": proxy})

        return response.text
    def main(self):
        self.cookies = {}
        url = "https://match2023.yuanrenxue.cn/api/match2023/4"
        nums = []
        self.session = tls_client.Session(client_identifier="chrome_113")
        # self.session.cookies.update({"sessionid": "jahgp7v6tnppod5dkkp00xzyhlzlydsd"})
        # 获取sessionid
        self.index()
        for page in range(1, 6):
            # 每次请求最少请求一次图片地址
            self.png()
            data = {"page": str(page),"yt4": self.js.call("getEncrypted")}
            print(data)
            # TODO 检测TLS就很烦，浏览器能过，但代码不行
            response = requests.post("http://10.0.15.108:9998/service/tlsProxy"
                                     , json={"method":"POST", "url":url, "headers":self.headers, "cookies":self.cookies, "proxies":proxy})
            self.cookies.update(response.cookies.get_dict())
            data = response.json()
            print(data)
            nums.extend([dic["value"] for dic in data["data"]])
        print(sum(nums))


# Spider().main()

import requests


headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://zb.oschina.net/projects/list.html",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "Hm_lvt_fff1476d9c6a8ebdcaeefc516105e869": "1685317537",
    "_gid": "GA1.2.931357752.1685317538",
    "JSESSIONID": "47A6C7244D9A539900B3FE5A7F950150",
    "qimo_seosource_0": "%E5%85%B6%E4%BB%96%E7%BD%91%E7%AB%99",
    "qimo_seokeywords_0": "%E6%9C%AA%E7%9F%A5",
    "uuid_8387c580-a888-11e5-bc38-bb63a4ea0854": "8f452137-ef69-40fb-bd14-a8489afc3929",
    "qimo_seosource_8387c580-a888-11e5-bc38-bb63a4ea0854": "%E5%85%B6%E4%BB%96%E7%BD%91%E7%AB%99",
    "qimo_seokeywords_8387c580-a888-11e5-bc38-bb63a4ea0854": "%E6%9C%AA%E7%9F%A5",
    "qimo_xstKeywords_8387c580-a888-11e5-bc38-bb63a4ea0854": "",
    "href": "https%3A%2F%2Fzb.oschina.net%2F",
    "accessId": "8387c580-a888-11e5-bc38-bb63a4ea0854",
    "oscid": "4IAAEtVzQuvo1t8%2B58AqQz4W3DRCq9kgGERJ9JBTT4dMYciUL124d6bpUIBDyKLNHhueKRv1Tyi7P9A6nj7tGSmBrpF7syfZOEKG%2Fd%2FAeLav5WY1zXU45VOGSXiRQ61A17YRbHJVTLg%3D",
    "im-uid": "user-528908",
    "im-sdktoken": "null",
    "pageViewNum": "8",
    "Hm_lpvt_fff1476d9c6a8ebdcaeefc516105e869": "1685317735",
    "_ga_77PRQPDK9K": "GS1.1.1685317537.1.1.1685317735.0.0.0",
    "_ga": "GA1.2.1425131367.1685317538",
    "_gat_gtag_UA_131295055_1": "1"
}
url = "https://zb.oschina.net/project/contractor-browse-project-and-reward"
params = {
    "applicationAreas": "",
    "type": "1",
    "moneyMinByYuan": "",
    "moneyMaxByYuan": "",
    "sortBy": "30",
    "currentTime": "",
    "pageSize": "20",
    "currentPage": "1"
}
response = requests.get(url, headers=headers,  params=params)

print(response.text)
print(response)