import requests


f = open('env/datago_weather_api_key.txt', 'r')
api_key = f.read()
url = 'http://apis.data.go.kr/1360000/FmlandWthrInfoService/getDayStatistics'
params ={'serviceKey' : api_key, 'pageNo' : '1', 'numOfRows' : '10', 'dataType' : 'JSON', 'ST_YMD' : '20231201', 'ED_YMD' : '20161201', 'AREA_ID' : '4122000000', 'PA_CROP_SPE_ID' : 'PA130201' }

response = requests.get(url, params=params)
print(response.content)
