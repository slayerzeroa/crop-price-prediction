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
    with open('env/api/kamis_api_key.txt', 'r') as f:
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


def get_item_price(p_startday, p_endday):
    api_url = "http://www.kamis.or.kr/service/price/xml.do?action=periodProductList"
        
    # API 키와 아이디를 읽어오기
    with open('env/api/kamis_api_key.txt', 'r') as f:
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

    # GET 요청 보내기
    response = requests.get(api_url, params=params)

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

'''
* 소매가격 선택가능 지역 (1101:서울, 2100:부산, 2200:대구, 2300:인천, 2401:광주, 2501:대전, 2601:울산, 3111:수원, 3214:강릉, 3211:춘천, 3311:청주, 3511:전주, 3711:포항, 3911:제주, 3113:의정부, 3613:순천, 3714:안동, 3814:창원, 3145:용인, 2701:세종, 3112:성남, 3138:고양, 3411:천안, 3818:김해)
* 도매가격 선택가능 지역 (1101:서울, 2100:부산, 2200:대구, 2401:광주, 2501:대전)
default : 전체지역
'''

def mapping_local_code(local):
    if local == '서울':
        return '1101'
    elif local == '부산':
        return '2100'
    elif local == '대구':
        return '2200'
    elif local == '광주':
        return '2401'
    elif local == '대전':
        return '2501'

def inverse_mapping_local_code(local_code):
    if local_code == '1101':
        return '서울'
    elif local_code == '2100':
        return '부산'
    elif local_code == '2200':
        return '대구'
    elif local_code == '2401':
        return '광주'
    elif local_code == '2501':
        return '대전'



def fetch_prices(cert_key, cert_id, product_cls_code, date_str, country_code="1101", item_category_code="200"):
    BASE_URL = "http://www.kamis.or.kr/service/price/xml.do"
    params = {
        "action": "dailyPriceByCategoryList",
        "p_cert_key": cert_key,
        "p_cert_id": cert_id,
        "p_returntype": "json",
        "p_product_cls_code": product_cls_code,  # 소매 "01", 도매 "02"
        "p_item_category_code": item_category_code,  # 예: 채소류
        "p_country_code": country_code,  # 예: 서울
        "p_regday": date_str,  # 조회 날짜
        "p_convert_kg_yn": "Y"  # 단위 kg 변환 여부
    }
    response = requests.get(BASE_URL, params=params)
    return response.json()


def get_whole_retail_at_date(date=datetime.datetime.now()-datetime.timedelta(days=1)):
    local_list = ['1101','2100', '2200', '2401', '2501']
    date_str = date.strftime('%Y-%m-%d')
    with open('env/api/kamis_api_key.txt', 'r') as f:
        cert_key = f.readline().strip()
        cert_id = f.readline().strip()

    df = pd.DataFrame()
    for local_code in local_list:
        # 도매 가격 데이터 가져오기
        wholesale_data = fetch_prices(cert_key, cert_id, "02", date_str, country_code=local_code)
        # 소매 가격 데이터 가져오기
        retail_data = fetch_prices(cert_key, cert_id, "01", date_str, country_code=local_code)

        # 데이터 처리
        data_rows = []
        for wholesale, retail in zip(wholesale_data['data']['item'], retail_data['data']['item']):
            row = {
                'ymd': date_str,
                'type': wholesale['item_name'],
                'kind': wholesale['kind_name'],
                'rank': wholesale['rank'],
                'local': inverse_mapping_local_code(local_code),
                'wholesale_price': wholesale['dpr1'],
                'wholesale_price_1m_ago': wholesale['dpr5'],
                'wholesale_price_1y_ago': wholesale['dpr6'],
                'wholesale_price_avg': wholesale['dpr7'],
                'retail_price': retail['dpr1'],
                'retail_price_1m_ago': retail['dpr5'],
                'retail_price_1y_ago': retail['dpr6'],
                'retail_price_avg': retail['dpr7']
            }
            data_rows.append(row)

        # 결과 DataFrame 생성
        part_df = pd.DataFrame(data_rows)
        df = pd.concat([df, part_df])
    df = df.reset_index(drop=True)
    return df