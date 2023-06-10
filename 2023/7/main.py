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
        self.replaceMap = {
            0: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAACWElEQVR4nE2QzW9MYRjFf+9778ydmdtplQajvbc1oa2PIMTHykIQCwsLfwBrxMLC3t7CRrpoQiJW7EkkPhKRYlEfIU1ECdpKi1HtmI9773ssppGe5Fmck985i8dEQ8PCs/BnCdO/nfah7SRWWJsRvJzAflxAPSXIHD7WQr2B9p/m99XLLI9WEB3lp1+z9tIF8hNfUFiEaCBSvOeUumZbQlLw6rF6x28ofP9NSPLnnqt/97CigWER9w1o47V7HfDZHcXDsQaLZQ3uOq3yVE1I6r1yRoPrKrImHKFx/DDQoPv6GGYBsmoV9+Up5VsPMIL6sRO4IIfV3n00t5awPybJT33AdYWYVhsCD3/yATkgiUfJ1uSxrtpN2wPv3Qx2OoE84AQemMWf+DXQhjJuh8NmxREEeIu/sMZ03uCAggcfW/ifE/DWk67fgsVfC4BfnwdWYADjQfsvtt4AAjBlrMt1YGRXseoUbQObNlayFGtcaxXwf7bjXYD8/ErmYU1SAyAL+0CrCnLgh7hSF1DHJPNY0/yEAbJiiNyq4VYGmwOyOAdpDW9hBuvVZrFAtqWCq1hIAWsgE+rtod0n7Ld5/EmDNS+mKc4lZNWDJFuHsEtNVMhDMyXdeYTEGApvHuE1/mLNzATFR2+BMn/On0XdDbzpz3jRAZbPnkQkhHefQJKDaEO/oqMXVWhLSCo+v6/e8ZsKp2aFpNLDMcWDkeLN20RUHVFcidV/7qpK3+tC+n/hw9vatHtUgQ1UCEOZaGhEGGGWmmjPQVqjm8ic8JuLBE8eky4b5n5+RWnGP7A8GUIVeVz1AAAAAElFTkSuQmCC",
            1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAABLklEQVR4nLXSO0sDQRSG4ffMXshlEYtoJ9goCP4AIQhiZyPWYiVCOsFSsfQ32Kew0T6lpdhrZ2NnYRTdbO7ZORbRTUzWTeVXTPUw83HOyNLyqgJgHBCLvIXYjW36cw38u0fwPNBvwk+aESZsY3ePqF9VCY/3MJ02iCTEBUVQdL1M87DCx/4WA6D43kDN6C4AV6Iu8U6F+uUp3UBwWhEmX0Q9h8kYOkq8UqYbCIValcXza0QEtRaZxJr3cB5qLFycUTo4wXn+RIHh8TsugYe5v6Fw28OaAHLetEpqqILrY0vzIDYZUzqGIRjEqU9P46zIiGRjEUwnStlgCpR+j9baJurnEGszsIIagxu+go1REdy/Oyg4Lt7LE2rcYaXMzqqon0s+0+xpjM19Nh7L/+EvHoFnBzGN28cAAAAASUVORK5CYII=",
            2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAACSklEQVR4nG2RS0iUYRSGn+/7f3VmnLFxxtIpZ8bphlBuatMNN60EoVatoqCiKMKohbWoRfewbRFBUVmLVkGhbVpE0o1a1KILGLgpI9Ep85I68//f2yIxgx44m8OzOO97TLbQLMpT2CBK2LqJmboYDoMXTFH14glmaAbFI+AcZHMF5Vo2q+5OnyokMW8i7/uUaduoXENe2aXNIlffpEXdz4Uk//NH1XTfVvL2PUU/j/3ZDb7WkjWrlG1cIfINy5V6+kGx3mvKtrSoKZFWvjqtXOsuJQZGhaTaYzuUr83IKlJF9No5UkdOY4YmCTINhI318LaXePdTkCitb0QR4YsS9mEfRKMoDqZUBs+iyirsu0GsMbiaxWA9fDAQj4EcOOYwEipkkMAb/ghhGR/4U8ucZcEFmKo401tXIwP+q3HMtIflHwxYMMUxgp2HGdtQwPz8ROz5G1ysep5sLFhhvk8Qbu+keGIPASHJKxfx+4sQrZg9w1igjBl3BAfPMHJiJ6UKSNw9R+JSD0okIQxnAxJgJiqZOX6eYscWAkokL5+l5sJ15C8AQgB8rDCjUDraxUhHO+HMMHWnjlB99TEuHgfrQMzKE+O4tn0UO9sJp76xcP8BYvef4dJ14II5EcC3NsP43t2UEbVdJ4k+eEWYyUBQBuP/zR8G+Fq5jl9rG/GGn5C4cR0zncL7+gUzr3rhoUQSX8tShJEATecodt0CVfLPKwGjHyRuXsRXqpbA81G6wOS2Av+nhDfQg29ePiJ9aBDJQej+qxo3gd8/wm/Wzwi9kS7QiAAAAABJRU5ErkJggg==",
            3: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAACj0lEQVR4nEWSS2hcdRTGf+d/X5N55DVNM53kziSxJApF3DU20oLgo8QqdBFcuBFcdKEgbtzahRtRcecD0dqFFVxIpSiImEbrRqGI2RWhIl3UJsHJY2buvZN7Pxej9MBZfPD94ON8x+KFB0XSxZWOcPjYSdJqiMwIetuEP/yEDiMIHUgQz8wpPvWMJq5vypPEf2tKVf36A82eWFDcWlQ8vyRao7GOvbouk1S68Y3GPrmksWs/yh8Moerli2pNzCh+4CHRGl9Q48Lnqr/zmtrHptWuTao9OqPmxU/l5YWss6nmypxazSVZ3F4SUYj1/kFWgXKE+jt4pWV21r/koLnL9PPnib6/jcMEaYKCKviCNMPCEDoJ3s4AEGgAZvgAmIEz5IKh3N2D9gTprA/dP/H+ug1R7b7Z9jp4vRQqFVQ/Tu/1CyQTjuoXV/H/MDRm+JhhWcbh2TW6iw2oN8ifPEd3oU716vuMv3EFVcpQ5Pg4w5KUwQsvs/vEcf4fr7/FyK+buF6KXDQMEM8viWxAceZpkofnoJ9RzD9Cf22VZATKGx8z+dKbuKyExXOLwgwO9nBJBjjwI3R6lZ2P3qV7tEz9lfNUr/yCA4a9j45TTE9TNKbIj1Sx9a+offYzJtF/dhlFBf7wjjYE8nyYzfdQVMH91gGDfKQJzsfhylhQYN0+8nwIAmTCkh75ylEkI/j7FhxmOLxHOXjrbQbLMf7WNu7uXfytfYpzL7K/tgJWUPr2JpaF+JZC8tRzdM6epHxtA783oKg16a8+ziCE8vUPKW/8jkZr0Jo9o6lL3ykY3P9lJHnde6pdfk+tE4uqjzU0Uq3J4lZblocUp06TTVXIAWdGcOcW/o2bWG2Se9t36B/s8y9zHyUuO13o5AAAAABJRU5ErkJggg==",
            4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAAB3klEQVR4nIWSMWtTYRSGn/N9X3KT2KQ12pIKVVvRulWtKA4ddBFsBxXURSg4SUVLEUTc3ER/QNFJEBwE/4CuNYqDUlHSSRBErQRMc3Nvem9y7+eQSJMY6AtnOTy8nPOeI2P7D1k6ZRRS9gjvL/Pr1iypd88ZuXQXm9iB6gJFIAyQwkH8szPt5hbSDSsNvkd05iL+ZK7dk36wgG2gkgW8q3M0aSJ0awvWGtwq8cnzuCf2kSl9JgHE6j+47arz1G/O0+Q32cdv2ojtgbWCmks8PcfGzATO65c4q1+JAYnjHtg2ET1IffEaDROQe/IMgmSvMQptoOZhpy+wcfowydVXpItrxNl0nwXjAJXYTe3eQsv14TJSVaAtvVK4HtHsPNVTY6TeviBT/EK0K4f88xUBY0BrjAwfp3Jngdj/Rv72I9R6HbE+VLwW2whQ5TLWGcIE15dwDzgkP63RmDxCOLUT6i6MHyUGGB7Hu3IZQg/yH6oWa7ctiUrWmPcrZNQoshm2MhWBKIKBAv7UBFL9Sbr0HVn/iOwd2WOl2RmmBq8Cx27wY+UBqviU0XNLkBrC2IFBbGegSkNSIJvBApJIU0+n8EMfQxx1h2lpjdE+s4jgV/7gbgY9/9xH1loSjgMIfwFbKsZ30GSWZAAAAABJRU5ErkJggg==",
            5: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAACLUlEQVR4nGWRzUtUYRTGf+e978zcO/cqE1MzY37U6EIXbtoIGRERQkErd7lz0z/gPvwbatM+aNcuglaBZURZhGQJFhFkGWqZzozz8d73tJjRgh544MB5Fs/5HRmpjqtoSmv6Eq4/hNQDgAIC0tgjXF4BBKkMDiquTOPNCvunhf/U/MLQxGVEstg0beE7MdJOMbVtsq/egeaAFEQItjYAA4CNogiTqbAdW8zOMuW5G1AvQeC6VQKL708AxapL8VFMmoBsKF5KMFAEn/a6K6Td2dDxcDaHj0D2m0g9Be/A9dwLdsMeiGz3+HYLCQyIgDFd/yOLVzTM4ICwUUMOD5FmBB0HGDQKQX0vrIrGIcZ7mlfn2Fy9DkFA7us6yZ3bZJc/oGEE6rHiPT6O8caghRKuUEKBzmiV+oVpigvz5O+/RvvzyPDwmHKiSGeghKhHWm38uRlqCzepDRUwu6tUrs1ivwVYrIVfO2S3voMAYmD1LcWX79EHd6lXJmmen6Lv3hIGVbAZNInROEbzEXqyhK49Jnn4FNTg+irgHPYYvOpfRiJgFfPzB4gCRzSOlsfSLl8PvlAEFcQrCFgEcG3ECyqACaC+jSlP0Zi5CNIku7UOmRBLW+HMJGm6i9Sa3VdPTPH71iIH1YTMpyeEz9bwcR+M9I1pefG54pzag5pm6w01qSqqGuxtann2io6Uqzo8Oq5GA0+w+5kwCEjjPO18BOJJXjzi1PwcuaWPaJIDr/wBj/X1ROOiGDgAAAAASUVORK5CYII=",
            6: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAACmElEQVR4nD2STWxUVQBGz73vznvTznSmP0PBwTdTKD+NUjVB6kajNSGR1NCwInFBSNAQCLAmcWOiYWVM1I0rE6IxakCjC+2ikVgRJIIhFgwsIIFiGhq1dJh2Xmfeux8Lq9/mbM7ufCYe2iYAjIU0waYB2QvjrK7rxgO5pfuEly6jdoD7X8wSTFRl+dRbLL22m45lbW36jx6i+Pk5HBhQivE9tN79iL8mR7GNPylN/YhtBiSvTtLZvAXTnsIRWEyjQbb3BP9MjuJun2fw+EnC8zdRKkqffUEarOBLRUy8eVh2pY/G1PcsPl1k8NA+us5cJdtQAXlMs4mxDoU5LMtNtHOM5pMV3Ow00Q/X8YMVjM8wmYfuAgpzIOFMy5Fu3UXHieKFnwjmG/g+MGmGMJALUVe0JkddpDueAiA/+yvp6yd58MYEbUTYuEfx/Q8IZ/5APQWoP75d/TO3hFY0cPo7BZKQZNZoH85r/b6XVFtfF/WhJ1S+Mifk5eRVPPuhqi8+r+orB9V78a6QFF05q3hjLAdg5AGDu3iGgWNvIxUhuUH5TUPyzcckO3bR2VnAIsD/26p7+ktYzaOeCMpdMPsb3TPzEFbpjIxiyTy2uQqAXVxARvhcgWTLGEraBAsLQEAabsCqleKu/w0C39uH8RmK8iRbxzBBAFEeEEFyHyvfJLx2AQy0nnkZsjbBcoPeb9+DgSLJ2BBoETd3C0vBEVyeobCU0dqzn2TiOYJ7dzDNiM6BoywPR+R+/5nolwWIh0dUG9iox059JSPJPrir8qenVf76nJwk1NK6IxOqV2IRb9quuD6sWu1ZVT6ZVm4tBpLc0pz63zmsWrWueNOITDy0Tf+d32Z50vFxVks5ZAzRnVncpRuoUAI8jwCwmjsQ7S95kwAAAABJRU5ErkJggg==",
            7: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAAB7klEQVR4nHWTu2uTURiHn/d8t1waNGk7GIlGKuJgoTpYVLyUokNxcKqToyi4+0c4iiC4CFLcBAfBKApFqIhVUlxEoiKo0MVLTL4m+S7ndWitX4r+4Ezn4TnPcqRWn1DpdJFU+fcEUDA5XNEJujeuslYNQBVEhjlRwOB9voeLlonOzNKv/Ef8Z81lpFafVFvbgfVNxiyoxJioTPf6TX4d8Bm/OI8LPZzWW5xssnGg8xNOX6Y3OUrw8i75xyu4YNBCcfhJYzFaI7xyidhEjN1aQHo+BgBr/x4R6HTQqVO0j9dx3i+Sf/YGWypswNmpRdKA/vkLxD6U7ixgfgCebIHFgSiE3YfpnjuEtN9RaLxGcwWwdgvsKNJVktmz9LY75B/dx2t9R/MuWM3AIhDHyLYqa/NzKDHFB0/QINi8z5gNxD3s3iP0Do7irL4gWPmI+jkkiSBNMrADEkIyc4yBgVzjOeZLCB4kI2PYkQruZkIyQMpV+idmgIR88yk4RcwgJJyaQx1vA0ZgEKO79tCfHkfCD/iLX9GcQb0ixebDTLMIpAl2/0kiX/E+LeH022A8QMGmmWYBSVOS6SppkuIvtTDfIvAEdEO2bhaQCNKdxPuOgutiVrsQu6gMf4j1ZitQUPzb16g0PIJXy2gpj6R2CP4NTh/AKVyLFCsAAAAASUVORK5CYII=",
            8: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAACoUlEQVR4nE2RTWwUZQCGn++bnZ3durBTqOx2229mF7pdCIpsFAHRaPxJjB4VYsIBDx44eTIh0RsHuHAxxqDxhxsmJiSeTLgRQmpCC9QDieVHgiXGYkjt7nbb7szO6wFifJP39lze5zWuPi2shbUuZkuD5KU2iW/AiGDhBt6N31F5M2QZuO075aqRogPvK5y7KyuJJ/WX7mrsxFFF1Uhu+07h4oai6f0anfvrMbAwq/K336v881VZSSZdUuWd/YoqDeFGxzV59Iw8SbnfLsntaSkeCVXfMq3qlxdlJI1cOK2oMi5rTEDabDOUKP3wNfaPFYb1BsN8h+DCd/gS6829kM9jsUDJA4HpAL6PGSZg85AKMoAMBJZsg9z8DNYa+h+8hfxVTKeP7XRJX3yN1DMUF2YxgwG4ekNxfZ9GrywKDbXpp7OqvfmKqp+dVaGfyWwsqvruvicDd+ySq0wobh/W5nvL/2lDEoNljZ04rDickJvaJUuaYIKtrH18jH4lxOs8pPjrPMH9h1g/pPfeMZK9W6GfQDRWU+3Tc7KS/FuXVXv7kOKwonjqZW07PyMkBVfOybmaiOPXVb7ZFdkjVY8cVLRpQq71rJybVDx+SOG1R0JdbfvwDVk902atWcK7PUdu9h56OoSNdQjKaHCH4PocUGKt+QJWlTyZL8zKAFYBKx5HYMEkA5AQFmturZDvGYZ7WmS7y5hOgoIi0gBDlaS5G4zBS3tYc/sXCtf+REGTzvGPoNDBW1wkt2HoFYr8M5Zi6FO8fpVcpiVGvvmK1VdP0jvyCWn8HIWbD8jcND3fkNVHKf34BfnL98E1WnLjThPHT+mpO3/L/O8UT+sqn/9cbsekXL0l4+otYYHlLqbZZvD8FAnCWIP/YIH8zDxZMQRP/AvTwVfSeIF1TAAAAABJRU5ErkJggg==",
            9: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAACmElEQVR4nC2ST4iUdRzGP993fvNnZ1+d3Z1d3T/+ZnZnWnc3Dyplh1gLOghSKJR2qEMRIgTRIYgugRcvhRdJrFiDLh0SuhRBJIobJB10EUvFtnKlxcXZJnd12n3nnZn36bD7nD/wwPN58GMT8qNPqDQ0qaEPP1dYa8gkISl//aKGDk2rtG1MvjopfHWnSoOjGjz1jdwm5Nb/k4sTISn1z28a3r9HpeGK8AMj8gffVVYS8WP1ffy+/PiE/P6X1XvlbyEpPP+RSsURUR4oa/vZy0KJ8j+cUqm/T748KV/sV/n54+palWzllkaerSgg10W8rwJA/qufMEJIG/QW4eYs3VfmUWGcaN9uAtk4ne5+oImttyAwkEAB4hGpxb9AjlZhlADaYAmQgo6B2IgFYAkWt8Ag6ckRWHKH1MMlUJrWU2VorqFUGinC2j20q1UAkqkuAq13yP78B2bQOHac+LmdpJZruJUO7aPvsHJgaqMp68CPeJX3vqLwfrSxcf2utn76iQpfX5KTlK7/q0BS/twJ4auT8v1eO14/oXy9ITbFIClz43ttn/lWJik8+YEcnQQK3diFGYpHfiV88QVaaQiiOt3nPqP53hcIcNEqDoBOAuFW+P0auauz5DGUDiAZoF2ZAtZIL93ehDEww3J5mi7LWLVCMUwx92eH6OlRbPkamV/uEWAGSQtbWUWJcM5Rr91n8fo8yRtvsdYH+dkfcbWYgDiC4Srxq4exVgNXe0C09IgHLx1j9e2jqFVny5ffIcviiNexHVPUz54mePM1sssNksIg0fQe2kDP6ZNk5u6hsIAjk4PFBXLzD3n8zDTNTduuvkDvzBm2nDmPsgVQB/OVCbHWxipPEu/ytBFmRmbhFm7uDklY2PiO4H+wekGJP70ZggAAAABJRU5ErkJggg==",
        }
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
        response = self.session.get(url, headers=headers)
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
        num = 0
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
            response = self.session.post(url, headers=self.headers, data=payload)
            self.cookies.update(response.cookies.get_dict())
            data = response.json()
            sign = self.js.call("getSign", data["key"], data["j_key"], data["keep_style"])
            htmlText = data["info"].replace(f"img_number ", "")
            for k,v in self.replaceMap.items():
                htmlText = htmlText.replace(f'src="{v}"', f"value={k}")
            doc = etree.HTML(htmlText)
            tds = doc.xpath(f"//td")
            for td in tds:
                imgs = td.xpath(f"./img[@class!='{sign}']")
                s = {}
                for img in imgs:
                    lr, px = img.get("style").replace("px", "").split(":")
                    px = int(int(px) / 11)
                    s[len(s) + px] = img.get("value")
                num += int("".join([s[k] for k in sorted(s.keys())]))
        print(num)


Spider().main()
