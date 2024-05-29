import requests
import datetime

def get_topics():
    start = datetime.datetime.strftime(datetime.datetime.now() - datetime.timedelta(days=90), "%Y-%m-%d")
    end = datetime.datetime.strftime(datetime.datetime.now() - datetime.timedelta(days=1), "%Y-%m-%d")
    # 요청 URL
    url = 'https://www.bigkinds.or.kr/api/analysis/relationalWords.do'

    # 요청 헤더
    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,pt;q=0.5',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json;charset=UTF-8',
        'Origin': 'https://www.bigkinds.or.kr',
        'Referer': 'https://www.bigkinds.or.kr/v2/news/index.do',
        'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }

    # 요청 쿠키
    cookies = {
        '_gid': 'GA1.3.1383958358.1715933659',
        '_ga_QWY27BS8JM': 'GS1.1.1715933658.1.1.1715933818.60.0.0',
        '_ga': 'GA1.3.1902313269.1715933659',
        'Bigkinds': '51A6DD5F22073EAA978569DB3B146F45',
        '_gat': '1'
    }

    # 전송할 데이터
    payload = {
        "indexName": "news",
        "searchKey": "배추",
        "searchKeys": [{}],
        "byLine": "",
        "searchFilterType": "1",
        "analysisType": "relational_word",
        "categoryCodes": [],
        "dateCodes": [],
        "editorialIs": False,
        "endDate": f"{end}",
        "incidentCodes": [],
        "interval": 2,
        "isNotTmUsable": False,
        "isTmUsable": True,
        "mainTodayPersonYn": "",
        "maxNewsCount": 100,
        "networkNodeType": "",
        "newsIds": [],
        "providerCodes": [],
        "realURI": "/api/news/previewData.do",
        "resultNumber": 100,
        "searchScopeType": "1",
        "searchSortType": "date",
        "sectionDiv": "1000",
        "sortMethod": "date",
        "startDate": f"{start}",
        "startNo": 1,
        "topicOrigin": ""
    }

    # POST 요청 보내기
    response = requests.post(url, headers=headers, cookies=cookies, json=payload)


    # 응답 상태 코드 확인
    if response.status_code == 200:
        # 응답 본문을 JSON 형식으로 파싱
        data = response.json()
        topics = data['topics']['data']    
    else:
        print(f"Error: {response.status_code}")

    return topics
