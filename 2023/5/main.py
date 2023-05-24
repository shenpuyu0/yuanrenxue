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
            "referer": "https://match2023.yuanrenxue.cn/topic/5",
            "accept-language": "zh-CN,zh;q=0.9"
        }
        s = {
            "user-agent": "yuanrenxue.project",
        }
        with open("js.js", "r", encoding="UTF-8") as f:
            self.js = execjs.compile(f.read())

    def main(self):
        url = "https://match2023.yuanrenxue.cn/api/match2023/5"
        nums = []
        for page in range(1, 6):
            data = self.js.call("getEncrypted", page)
            print(data)
            # data = {"page":"1","token":"BI/ekYVdrEOrMEWMnAVKbYk4lXcATLjfUMEDIwBmGrZQyhQCb9/SEPRddAT9KTLdPSxzyg2nSmpdXnhjPszu5MnzVpgBjArWE3nhNbaq46WZR+M6C7agCmy3n+Nq410r0Y6xRChIhTup5+W85kEi8M5LIOtqA79t9979GqkWmhYty8aRAwSNgcvxYXMmetvgWl49/GLMEB6ZZODQPuxj0wLFraC9xTNM0/T7NwweQbes3A58oy4fQ91ZgngqMosd/uiFwaMgO6JgRa8nNLaGru2tim/qeRyGGODbVo8GhHKTNgrsfQ+YuLRXJrXSnoOY/7IHoGFzbL2e6WVxJ/RaZg=="}
            # data = {"page":"1","token":"CgTHOrKxHceb56JOiQImipBTTcPFgDuMMHezYx5+Ii5Cwfdv7R8QM4yapgveftPHHl8dJui+6L1lVFZcfHS9EAw+gpJNcCcQrHFkqKoyC4aUc5dC5ldZg5Lm/rK+nn5fhcla38xY/en+5cT8Tr6JFxhMP6GnRRyg80Z4U/xCxqdhCNoloFfSwn0Pd3KgYljvwWUgwVrvDZThK6hP21mrix1tMchRFnWMv295S/E2VeSKHbjq2tTuZ3LzrUXSmllu+EmEkijELkAn4DBfRqdgujaC+qorXFVIe+Pp6B+mEERMeqjOhufUMhqQKE1SXkCWKEXT3W7tEZ21gmh+F91oCw=="}
            # response = tls_client.Session(client_identifier="chrome_106").post(url, headers=self.headers, data=data
            self.headers["accept-time"] = str(int(data["ts"]) - page)
            response = requests.post(url, headers=self.headers, data=data["data"])
            data = response.json()
            print(data)
            nums.extend([dic["value"] for dic in data["data"]])
        print(sum(nums))


Spider().main()


def toHex(ls):
    s = ""
    for i in ls:
        s += hex(i).replace("0x", "")
    print(s)


toHex(
    [121, 117, 197, 86, 29, 245, 54, 41, 251, 162, 82, 44, 196, 106, 100, 146, 81, 164, 228, 235, 15, 50, 144, 131, 213,
     142, 53, 201, 114, 5, 51, 146])
