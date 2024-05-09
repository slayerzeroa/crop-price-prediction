import pandas as pd

# df = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/raw/crop_price.csv")

# df = df[df['품종']=="배추(전체)"]
# df = df[df['등급']=="상품"]
# df = df[(df['거래단위']=="10kg(그물망 3포기)") | (df['거래단위']=="10kg")]

# ## 거래단위 == 10kg
# df = df[['DATE', '품목', '평균가격']]
# df.columns = ['date', 'crop', 'price']

# #price 열 쉼표 제거
# df['price'] = df['price'].str.replace(',', '').astype(int)

# df.to_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/crop_price.csv", index=False)


# # 출처: 통계청, 단위: 톤
# df = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/raw/crop_produce.csv", encoding="cp949")
# df['배추'] = df['배추'].str.replace(',', '').astype(int)
# df.columns = ['year', 'amount']

# print(df)


# df = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/raw/weather_for_farm.csv", encoding="cp949")

# # 같은 일시에 지점이 다른 경우 일시를 기준으로 열로 추가
# df = df.pivot(index='일시', columns='지점', values='평균 지면온도(°C)')
# print(df)


# df = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/raw/weather.csv")
# df = df.iloc[:, 2:]
# df = df.dropna()
# print(df)

# df.columns = ['date', 'temp', 'high_temp', 'low_temp', 'humidity', 'sunshine', 'sunlight', 'rain', 'wind']
# df = df[['date', 'temp', 'high_temp', 'low_temp', 'rain', 'wind', 'humidity', 'sunshine', 'sunlight']]

# df.to_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/weather.csv", index=False)


# price = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/crop_price.csv")
# produce = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/crop_produce.csv")
# weather = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/weather.csv")

# # print(price)
# # print(produce)
# # print(weather)


# # date 기준으로 merge

# price['date'] = pd.to_datetime(price['date'])
# weather['date'] = pd.to_datetime(weather['date'])

# df = pd.merge(price, weather, on='date', how='left')
# # # df = pd.merge(df, weather, on='date', how='left')

# # year이 같은 date에 대해 produce merge
# df['year'] = df['date'].dt.year
# df = df.dropna()
# print(df)

# year_list = []

# for i in df['year']:
#     produce_year = produce[produce['year']==i]
#     if not produce_year.empty:
#         year_list.append(produce_year.values[0][1])
#     else:
#         year_list.append(None)

# df['product'] = year_list

# # print(df.dropna())

# df = df.drop(['year'], axis=1)
# df = df.dropna()

# print(df)

# df.to_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/data.csv", index=False)


# df = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/data.csv")

# df.sort_values(by=["date"], inplace=True)

# df.to_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/data.csv", index=False)


df = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/data.csv")
print(df)

forex = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/raw/forex_data.csv")


df = pd.merge(df, forex, on='date', how='left')

df.to_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/preprocessed/data.csv", index=False)