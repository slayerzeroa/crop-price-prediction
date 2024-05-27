import requests

def get_topics():
    # 요청 URL
    url = 'https://www.nongnet.or.kr/front/posdata/getConsumptionTrendList.action'

    # 요청 헤더
    headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,pt;q=0.5',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'SCOUTER=z3s38th596vj82; KHANUSER=x3q7181ecuk6re; _ga=GA1.1.381377629.1713184964; _fbp=fb.2.1713184964457.1613432057; ppClose1=Y; JSESSIONID=yqVpBCKKGdAvy6tPDtqUXUPG3mwMpHO1qUnBciPuqlrMVfe5z5Vf8wGwAM7Z6A2S.amV1c19kb21haW4vTm9uZ25ldF8yMDI0XzI=; _ga_1C6GSRP5Z8=GS1.1.1716781791.5.1.1716781819.0.0.0; _ga_PZB7RD39VW=GS1.1.1716781791.5.1.1716781819.32.0.0',
        'Host': 'www.nongnet.or.kr',
        'Origin': 'https://www.nongnet.or.kr',
        'Referer': 'https://www.nongnet.or.kr/',
        'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }

    # 전송할 데이터
    payload = {
        'categoryCd': '',
        'spcsNm': '전체',
        'mrktChnlNm': '전채널',
        'regionNm': '전지역',
        'beginYW': '202418',
        'endYW': '202419',
        'compareYear': '-1'
    }

    # POST 요청 보내기
    response = requests.post(url, headers=headers, data=payload)

    # 응답 상태 코드 및 내용 확인
    print(f"Status Code: {response.status_code}")
    # print(f"Response Text: {response.text}")

    try:
        data = response.json()
        return data['resultData']['allMarket']
    except ValueError as e:
        print(f"Error decoding JSON: {e}")

'''
ymd: 년월일
pdltNm: 작물명
curSlsAmt: 현재 소비트렌드 수치
bfSlsAmt: 이전 소비트렌드 수치 (전년동기)
pumCd: 작물코드
'''