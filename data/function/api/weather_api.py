import requests
import pandas as pd
import datetime

def only_date(data):
    return data.split(' ')[0]


def main_location_mean(date: datetime.datetime = datetime.datetime.now()-datetime.timedelta(days=2)):
    f = open('env/datago_weather_api_key.txt', 'r')
    api_key = f.read()

    start = datetime.datetime.strftime(date, "%Y%m%d")
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

    result_df = pd.DataFrame()
    col_list = ['areaId', 'areaName', 'dayAvgRhm', 'dayAvgTa', 'dayAvgWs', 'dayMaxTa', 'dayMinRhm', 'dayMinTa', 'daySumRn', 'daySumSs', 'paCropName', 'paCropSpeId', 'paCropSpeName', 'wrnCd', 'wrnCount', 'ymd']

    # areaIds, cropId 조합 만들기
    for areaId in areaIds:
        try:
            params['AREA_ID'] = areaId
            params['PA_CROP_SPE_ID'] = cropId
            response = requests.get(url, params=params)
            contents = response.json()
            value = contents['response']['body']['items']['item'][0].values()
            result_df = pd.concat([result_df, pd.DataFrame(value).T], axis=0)
        except:
            pass

    result_df.columns = col_list
    result_df['ymd'] = result_df['ymd'].apply(only_date)


    part_df = result_df[['dayAvgRhm', 'dayAvgTa', 'dayAvgWs', 'dayMaxTa', 'dayMinRhm', 'dayMinTa', 'daySumRn', 'daySumSs']]
    mean_df = part_df.mean()
    mean_df['ymd'] = result_df['ymd'].iloc[0]


    '''
    ymd: 날짜
    dayAvgRhm: 평균 상대습도
    dayAvgTa: 평균 기온
    dayAvgWs: 평균 풍속
    dayMaxTa: 최고 기온
    dayMinRhm: 최저 상대습도
    dayMinTa: 최저 기온
    daySumRn: 일강수량
    daySumSs: 누적일조시간
    '''

    return (mean_df.tolist())