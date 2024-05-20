import requests
import json
import pandas as pd
import datetime

# 품목 코드 파일을 읽어오기
codes = pd.read_csv('data/function/api/documents/kamis_api/crop_code.csv', encoding='utf-8')

# NaN 열 제거
codes = codes.dropna(axis=1)

# '배추' 품목 코드 추출
code = str(codes[codes['품목명'] == '배추']['품목코드'].iloc[0])

def get_daily_sales_list():
    # 요청을 보낼 URL
    api_url = "http://www.kamis.co.kr/service/price/xml.do?action=dailySalesList"
    
    # API 키와 아이디를 읽어오기
    with open('env/kamis_api_key.txt', 'r') as f:
        cert_key = f.readline().strip()
        cert_id = f.readline().strip()
        
    return_type = "json"  # 응답 형식 지정 (json 또는 xml)

    # 요청 매개변수 설정
    params = {
        "p_cert_key": cert_key,
        "p_cert_id": cert_id,
        "p_returntype": return_type,
    }
    
    # 디버깅을 위한 출력
    print("Request URL:", api_url)
    print("Request Parameters:", params)

    # GET 요청 보내기
    response = requests.get(api_url, params=params)
    
    # 응답 코드 확인
    print(f"Response Code: {response.status_code}")
    
    # 응답 내용 읽기
    if response.status_code == 200:
        data = response.json()
        result = data.get("price", [])
    else:
        print("Error: Unable to fetch data")
        # print("Response Content:", response.content)
    return result

# print(get_daily_sales_list())


def get_item_price(p_startday, p_endday):
    api_url = "http://www.kamis.or.kr/service/price/xml.do?action=periodProductList"
        
    # API 키와 아이디를 읽어오기
    with open('env/kamis_api_key.txt', 'r') as f:
        cert_key = f.readline().strip()
        cert_id = f.readline().strip()

    return_type = "json"  # 응답 형식 지정 (json 또는 xml)
    p_startday = p_startday  # 시작 일자
    p_endday = p_endday  # 종료 일자
    p_itemcategorycode	= "200"  # 품목 분류 코드 (200: 채소)
    p_itemcode = code  # 품목 코드

    params = {
        "p_cert_key": cert_key,
        "p_cert_id": cert_id,
        "p_returntype": return_type,
        "p_startday": p_startday,
        "p_endday": p_endday,
        "p_itemcategorycode": p_itemcategorycode,
        "p_itemcode": p_itemcode,
    }

    # # 디버깅을 위한 출력
    # print("Request URL:", api_url)
    # print("Request Parameters:", params)

    # GET 요청 보내기
    response = requests.get(api_url, params=params)

    # # 응답 코드 확인
    # print(f"Response Code: {response.status_code}")

    return response.json()


def get_item_price_at_date(date: datetime.datetime = datetime.datetime.now()-datetime.timedelta(days=2)):
    date = datetime.datetime.strftime(date, "%Y-%m-%d")
    data = get_item_price(date, date)['data']['item']
    for i in data:
        if i['countyname'] != '평균':
            continue
        else:
            # 가격 , 없애기
            i['price'] = i['price'].replace(',', '')
            price = int(i['price'])
            return[date, price]
        