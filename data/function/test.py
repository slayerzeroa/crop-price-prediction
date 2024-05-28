import api.kamis_api as kamis
import api.weather_api as weather
import datetime


# def get_api_data(date: datetime.datetime = datetime.datetime.now()-datetime.timedelta(days=2)):
#     # print(date)
#     result = []
#     result.extend(kamis.get_item_price_at_date(date=date))
#     result.extend(weather.main_location_mean(date=date)[:-1])
#     return result

# # print(get_api_data())


# '''
# ymd: 날짜
# price: 가격
# dayAvgRhm: 평균 상대습도
# dayAvgTa: 평균 기온
# dayAvgWs: 평균 풍속
# dayMaxTa: 최고 기온
# dayMinRhm: 최저 상대습도
# dayMinTa: 최저 기온
# daySumRn: 일강수량
# daySumSs: 누적일조시간
# '''


# # MariaDB에 데이터 저장하기
# import pymysql
# import pandas as pd


# def insert_row(data: list):
#     # DB 연결
#     conn = pymysql.connect(host='localhost', user='root', password='1234', db='aicapstone', charset='utf8')
#     curs = conn.cursor()

#     # 데이터 가져오기
#     df = pd.DataFrame(data).T
#     df.columns = ['ymd', 'price', 'dayAvgRhm', 'dayAvgTa', 'dayAvgWs', 'dayMaxTa', 'dayMinRhm', 'dayMinTa', 'daySumRn', 'daySumSs']

#     # 데이터 저장
#     for i in range(len(df)):
#         sql = f"INSERT INTO crop VALUES ('{df['ymd'][i]}', {df['price'][i]}, {df['dayAvgRhm'][i]}, {df['dayAvgTa'][i]}, {df['dayAvgWs'][i]}, {df['dayMaxTa'][i]}, {df['dayMinRhm'][i]}, {df['dayMinTa'][i]}, {df['daySumRn'][i]}, {df['daySumSs'][i]})"
#         curs.execute(sql)
#     conn.commit()

#     # DB 연결 종료
#     conn.close()


# # example input: '2024-05-17'
# def del_row(date: str):
#     # 마리아 DB 데이터 행 삭제하기
#     conn = pymysql.connect(host='localhost', user='root', password='1234', db='aicapstone', charset='utf8')
#     curs = conn.cursor()

#     sql = f"DELETE FROM crop WHERE ymd = '{date}'"
#     curs.execute(sql)

#     conn.commit()
#     conn.close()

# def str_to_date(date: str):
#     return datetime.datetime.strptime(date, '%Y-%m-%d')

# date = datetime.datetime.now()
# date -= datetime.timedelta(days=2)

# insert_row(get_api_data(date))

# for i in range(1, 365):
#     try:
#         insert_row(get_api_data(date))
#     except:
#         pass
#     date -= datetime.timedelta(days=1)


print(kamis.get_item_price_at_date(datetime.datetime.now()-datetime.timedelta(days=1)))