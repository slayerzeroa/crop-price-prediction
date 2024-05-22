import api.kamis_api as kamis
import api.weather_api as weather
import datetime

import pymysql
import pandas as pd


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
        sql = f"INSERT INTO crop VALUES ('{df['ymd'][i]}', {df['type'][i]}, {df['price'][i]}, {df['dayAvgRhm'][i]}, {df['dayAvgTa'][i]}, {df['dayAvgWs'][i]}, {df['dayMaxTa'][i]}, {df['dayMinTa'][i]}, {df['daySumRn'][i]}, {df['daySumSs'][i]}, {df['pred'][i]})"
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

def update_db(date: datetime.datetime = datetime.datetime.now()-datetime.timedelta(days=2)):
    insert_row(get_api_data(date))
    pred = predict.predict_update_price()

    # db 마지막 행 삭제
    del_row(date)
    # db에 예측값 추가
    insert_row(get_api_data(date), pred=pred)

# date = datetime.datetime.now()
# date -= datetime.timedelta(days=2)

# insert_row(get_api_data(date))


