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
                "yt4": "NLAVyBXgbDGRdDkEpZEgzTThtMh8PY21YOBJzL39vCn4vNChtTy8WIEUYDGZ6QkB6XxlbZmIMcF9lI39YSU43GV9nImQlOkFqZARrckRPRyxwKXVcDQUX"
            }
            print(data)
            cookies = {
                "sessionid": "73z7p4h626484lfwvfrzbg6r45wpk4jy"
            }
            # data = {"page":"1","token":"BI/ekYVdrEOrMEWMnAVKbYk4lXcATLjfUMEDIwBmGrZQyhQCb9/SEPRddAT9KTLdPSxzyg2nSmpdXnhjPszu5MnzVpgBjArWE3nhNbaq46WZR+M6C7agCmy3n+Nq410r0Y6xRChIhTup5+W85kEi8M5LIOtqA79t9979GqkWmhYty8aRAwSNgcvxYXMmetvgWl49/GLMEB6ZZODQPuxj0wLFraC9xTNM0/T7NwweQbes3A58oy4fQ91ZgngqMosd/uiFwaMgO6JgRa8nNLaGru2tim/qeRyGGODbVo8GhHKTNgrsfQ+YuLRXJrXSnoOY/7IHoGFzbL2e6WVxJ/RaZg=="}
            # data = {"page":"1","token":"CgTHOrKxHceb56JOiQImipBTTcPFgDuMMHezYx5+Ii5Cwfdv7R8QM4yapgveftPHHl8dJui+6L1lVFZcfHS9EAw+gpJNcCcQrHFkqKoyC4aUc5dC5ldZg5Lm/rK+nn5fhcla38xY/en+5cT8Tr6JFxhMP6GnRRyg80Z4U/xCxqdhCNoloFfSwn0Pd3KgYljvwWUgwVrvDZThK6hP21mrix1tMchRFnWMv295S/E2VeSKHbjq2tTuZ3LzrUXSmllu+EmEkijELkAn4DBfRqdgujaC+qorXFVIe+Pp6B+mEERMeqjOhufUMhqQKE1SXkCWKEXT3W7tEZ21gmh+F91oCw=="}
            # response = tls_client.Session(client_identifier="chrome_106").post(url, headers=self.headers, data=data
            # self.headers["accept-time"] = str(int(data["ts"]) - page)
            response = requests.post(url, headers=self.headers, cookies=cookies, data=data)
            data = response.json()
            print(data)
            nums.extend([dic["value"] for dic in data["data"]])
        print(sum(nums))


Spider().main()
