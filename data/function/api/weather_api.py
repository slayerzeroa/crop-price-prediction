import requests
import pandas as pd
import datetime

f = open('env/datago_weather_api_key.txt', 'r')
api_key = f.read()

start = datetime.datetime.strftime(datetime.datetime.now() - datetime.timedelta(days=3), "%Y%m%d")
end = start

url = 'http://apis.data.go.kr/1360000/FmlandWthrInfoService/getDayStatistics'
params ={'serviceKey' : api_key, 'pageNo' : '1', 'numOfRows' : '100', 'dataType' : 'JSON', 'ST_YMD' : f'{start}', 'ED_YMD' : f'{end}', 'AREA_ID' : '4122000000', 'PA_CROP_SPE_ID' : 'PA130201' }

# 배추: PA170401
cropId = 'PA170401'
areaIds = pd.read_csv('data/function/api/documents/weather_api/weather_api.csv', encoding='utf-8')

# 지역 아이디, 지역명, 작물 아이디, 작물 소분류, 작물 대분류
areaIds.columns = ['areaId', 'areaName', 'cropId', 'cropSmall', 'cropBig']
areaIds = areaIds[areaIds['cropId'] == cropId]
areaIds = areaIds['areaId'].unique()

# print(areaIds)

# areaIds, cropId 조합 만들기
for areaId in areaIds:
    params['AREA_ID'] = areaId
    params['PA_CROP_SPE_ID'] = cropId
    response = requests.get(url, params=params)
    contents = response.json()
    print(contents)



# response = requests.get(url, params=params)
# contents = response.json()

# print(contents)