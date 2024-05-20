# weather data prerpocessing

import pandas as pd
import numpy as np


# pd.set_option('display.max_columns', None)
#
# # Load Data
# data = pd.read_csv("weather/weather_preprocessed.csv")
#
# data = data.sort_values(by=["일시"])
# data = data.reset_index(drop=True)
#
# # data = data.drop()
# data = data[data.columns[2:]]
# # 일자,평균강수, 평균기온, 평균최고기온, 평균최저기온, 평균상대습도, 합계일조시간, 합계일사량, 평균풍속
# data.columns = ['date', 'rain', 'temp', 'htemp', 'ltemp', 'humid', 'ss', 'sr', 'wind']
#
#
# target = pd.read_csv("./weather/target.csv", encoding="cp949")
# target = target[target["PDLT_NM"] == "배추"]
# target = target[['INQ_YMD', 'RTSL_DAIL_PRCE']]
#
# target.columns = ['date', 'price']
# # data = pd.merge(data, target, on="date", how="left")
#
# data['date'] = pd.to_datetime(data['date'], format='%Y-%m-%d')
# target['date'] = pd.to_datetime(target['date'], format='%Y%m%d')
#
# data = pd.merge(data, target, on="date", how="left")
#
# data = data.fillna(method='ffill')
#
# data.to_csv("./weather/data.csv", index=False, encoding="cp949")

#
# df = pd.read_csv("./weather/배추생산량.csv", encoding="cp949")
# df.columns = ['year', 'amount']
#
# print(df)
#
# data = pd.read_csv("./weather/data.csv", encoding="cp949")
# print(data)
#
# amount_list = []
# date = data['date'].tolist()
# for i in date:
#     year = i[:4]
#     df['year'] = df['year'].astype(str)
#     amount = df[df['year'] == str(year)]['amount'].values
#     if len(amount) != 0:
#         amount_list.append(int(amount[0].replace(',', '')))
#     else:
#         # append NaN
#         amount_list.append(None)
#
# data['amount'] = amount_list
#
# data = data.dropna()
# data.to_csv("./weather/data.csv", index=False, encoding="cp949")

df = pd.read_csv("./weather/data.csv", encoding="cp949")
# print(df.columns)
df = df[['date', 'rain', 'temp', 'htemp', 'ltemp', 'humid', 'ss', 'sr', 'wind', 'amount', 'price']]
df.to_csv("./weather/data.csv", index=False, encoding="cp949")