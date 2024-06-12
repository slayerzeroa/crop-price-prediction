import sys
import os

# 현재 파일의 디렉토리 경로를 얻음
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(os.path.dirname(current_dir))
# 상위 디렉토리를 sys.path에 추가
sys.path.append(parent_dir)

import api.kamis_api as kamis
import api.weather_api as weather
import crawling.nongnet as nongnet
import crawling.bigkinds as bigkinds
import datetime

import pymysql
import pandas as pd

import time

import model.crop_price.predict as predict 


# db_env 가져오기
def get_db_env():
    with open('env/db/db_env.txt', 'r') as f:
        host = f.readline().strip()
        user = f.readline().strip()
        password = f.readline().strip()
        db = f.readline().strip()
    return host, user, password, db

def get_api_data(date: datetime.datetime = datetime.datetime.now()-datetime.timedelta(days=2), pred=0):
    # print(date)
    result = []
    result.extend(kamis.get_item_price_at_date(date=date))
    result.extend(weather.main_location_mean(date=date)[:-1])
    result.append('napa_cabbage')
    result.append(pred)
    return result

def insert_row(data: list):
    host, user, password, db = get_db_env()
    # DB 연결
    conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8') 
    curs = conn.cursor()

    # 데이터 가져오기
    df = pd.DataFrame(data).T
    df.columns = ['ymd', 'price', 'dayAvgRhm', 'dayAvgTa', 'dayAvgWs', 'dayMaxTa', 'dayMinRhm', 'dayMinTa', 'daySumRn', 'daySumSs', 'type', 'pred']

    # 데이터 저장
    for i in range(len(df)):
        sql = f"INSERT INTO crop VALUES ('{df['ymd'][i]}', '{df['type'][i]}', '{df['price'][i]}', '{df['dayAvgRhm'][i]}', '{df['dayAvgTa'][i]}', '{df['dayAvgWs'][i]}', '{df['dayMaxTa'][i]}', '{df['dayMinTa'][i]}', '{df['daySumRn'][i]}', '{df['daySumSs'][i]}', '{df['pred'][i]}')"
        curs.execute(sql)
    conn.commit()

    # DB 연결 종료
    conn.close()


# example input: '2024-05-17'
def del_row(date: str):
    host, user, password, db = get_db_env()
    # 마리아 DB 데이터 행 삭제하기
    conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8')
    curs = conn.cursor()

    sql = f"DELETE FROM crop WHERE ymd = '{date}'"
    curs.execute(sql)

    conn.commit()
    conn.close()

def str_to_date(date: str):
    return datetime.datetime.strptime(date, '%Y-%m-%d')


def insert_nongnet():
    host, user, password, db = get_db_env()
    # DB 연결
    conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8') 
    curs = conn.cursor()

    # 데이터 가져오기
    data = nongnet.get_topics()
    # json to dataframe
    df = pd.DataFrame(data)
    df['ymd'] = datetime.datetime.now().strftime('%Y-%m-%d')
    '''
    ymd: 년월일
    pdltNm: 작물명
    curSlsAmt: 현재 소비트렌드 수치
    bfSlsAmt: 이전 소비트렌드 수치 (전년동기)
    pumCd: 작물코드
    '''
    df = df[['ymd', 'pdltNm', 'curSlsAmt', 'bfSlsAmt', 'pumCd']]
    print(df)

    # 데이터 저장
    for i in range(len(df)):
        sql = f"INSERT INTO nongnet VALUES ('{df['ymd'][i]}', '{df['pdltNm'][i]}', '{df['curSlsAmt'][i]}', '{df['bfSlsAmt'][i]}', '{df['pumCd'][i]}')"
        curs.execute(sql)
    conn.commit()

    # DB 연결 종료
    conn.close()

def insert_dosomae(date: datetime.datetime = datetime.datetime.now()-datetime.timedelta(days=1)):
    host, user, password, db = get_db_env()
    # DB 연결
    conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8') 
    curs = conn.cursor()

    # 데이터 가져오기
    df = kamis.get_whole_retail_at_date(date=date)

    # , 제거
    df['wholesale_price'] = df['wholesale_price'].str.replace(',', '')
    df['wholesale_price_1m_ago'] = df['wholesale_price_1m_ago'].str.replace(',', '')
    df['wholesale_price_1y_ago'] = df['wholesale_price_1y_ago'].str.replace(',', '')
    df['wholesale_price_avg'] = df['wholesale_price_avg'].str.replace(',', '')
    df['retail_price'] = df['retail_price'].str.replace(',', '')
    df['retail_price_1m_ago'] = df['retail_price_1m_ago'].str.replace(',', '')
    df['retail_price_1y_ago'] = df['retail_price_1y_ago'].str.replace(',', '')
    df['retail_price_avg'] = df['retail_price_avg'].str.replace(',', '')

    # -1은 NaN값을 의미
    df.replace('-', None, inplace=True)
    df.fillna(-1, inplace=True)

    '''
    ymd: 년월일
    type: 작물명
    kind: 작물상세분류
    rank: 상품등급
    local: 지역명
    wholesale_price: 도매가
    retail_price: 소매가
    '''

    # 데이터 저장
    for i in range(len(df)):
        sql = f"INSERT INTO dosomae VALUES ('{df['ymd'][i]}', '{df['type'][i]}', '{df['kind'][i]}', '{df['rank'][i]}', '{df['local'][i]}', '{df['wholesale_price'][i]}', '{df['wholesale_price_1m_ago'][i]}',  '{df['wholesale_price_1y_ago'][i]}',  '{df['wholesale_price_avg'][i]}', '{df['retail_price'][i]}', '{df['retail_price_1m_ago'][i]}', '{df['retail_price_1y_ago'][i]}','{df['retail_price_avg'][i]}')"
        curs.execute(sql)
    conn.commit()

    # DB 연결 종료
    conn.close()

def insert_bigkinds():

    host, user, password, db = get_db_env()
    # DB 연결
    conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8') 
    curs = conn.cursor()

    df = pd.DataFrame(bigkinds.get_topics())
    df['ymd'] = datetime.datetime.now().strftime('%Y-%m-%d')
    df = df[['ymd', 'id', 'level', 'name', 'weight']]

    # 데이터 저장
    for i in range(len(df)):
        sql = f"INSERT INTO bigkinds VALUES ('{df['ymd'][i]}', '{df['id'][i]}', '{df['level'][i]}', '{df['name'][i]}', '{df['weight'][i]}')"
        curs.execute(sql)
    conn.commit() 
    conn.close()



def update_db(date: datetime.datetime = datetime.datetime.now()-datetime.timedelta(days=2)):
     # nongnet table 데이터 추가
    insert_nongnet()

    insert_bigkinds()
 
    insert_row(get_api_data(date))
    pred = predict.predict_update_price()

    print(f'pred: {pred}')

    # db 마지막 행 삭제
    del_row(datetime.datetime.strftime(date, '%Y-%m-%d'))
    # db에 예측값 추가
    insert_row(get_api_data(date, pred=pred))

# update_db(datetime.datetime.now()-datetime.timedelta(days=6))
# update_db(datetime.datetime.now()-datetime.timedelta(days=5))
# update_db(datetime.datetime.now()-datetime.timedelta(days=4))
# update_db(datetime.datetime.now()-datetime.timedelta(days=3))


update_db(datetime.datetime.now()-datetime.timedelta(days=1))

while True:
    ## 매일 00시 01분에 실행
    now = datetime.datetime.now()
    if now.hour == 0 and now.minute == 1:
        try:
            update_db()
            print('DB update success')
        except Exception as e:
            print(e)


# host, user, password, db = get_db_env()
# # DB 연결
# conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8') 
# curs = conn.cursor()
# sql = "ALTER TABLE bigkinds CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
# curs.execute(sql)
# conn.commit()
# conn.close()


