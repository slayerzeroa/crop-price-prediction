import pandas as pd
import numpy as np

from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor

# cat boost
from catboost import CatBoostRegressor, CatBoost
from xgboost import XGBRegressor

import pymysql

import joblib
import matplotlib.pyplot as plt

# db_env 가져오기
def get_db_env():
    with open('env/db/db_env.txt', 'r') as f:
        host = f.readline().strip()
        user = f.readline().strip()
        password = f.readline().strip()
        db = f.readline().strip()
    return host, user, password, db

def db_to_df():
    host, user, password, db = get_db_env()
    conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8')
    curs = conn.cursor()

    sql = "SELECT * FROM crop"
    curs.execute(sql)

    rows = curs.fetchall()
    columns = [desc[0] for desc in curs.description]

    df = pd.DataFrame(rows, columns=columns)

    conn.close()

    return df


def make_trainable_data(split_ratio=0.05):
    df = db_to_df()
    df2 = pd.read_csv("data/preprocessed/data.csv")
    df2.columns = ['ymd', 'type', 'price', 'dayAvgTa', 'dayMaxTa', 'dayMinTa', 'daySumRn', 'dayAvgWs', 'dayAvgRhm', 'daySumSs', 'sunlight', 'product', 'KRW/USD']
    df2 = df2.drop(['type', 'sunlight', 'product', 'KRW/USD'], axis=1)
    df = df[df2.columns]

    df = pd.concat([df2, df], axis=0)
    df = df.drop_duplicates(['ymd'], keep='last')
    df.reset_index(drop=True, inplace=True)

    '''
    ymd: 날짜
    price: 가격
    dayAvgRhm: 평균 상대습도
    dayAvgTa: 평균 기온
    dayAvgWs: 평균 풍속
    dayMaxTa: 최고 기온
    dayMinRhm: 최저 상대습도
    dayMinTa: 최저 기온
    daySumRn: 일강수량
    daySumSs: 누적일조시간
    '''
    scaler = StandardScaler()
    scale_cols = ['dayAvgTa', 'dayMaxTa', 'dayMinTa', 'daySumRn', 'dayAvgWs', 'dayAvgRhm', 'daySumSs']

    df['price_t1'] = df['price'].shift(1)
    df['price_t2'] = df['price'].shift(2)
    df['price_t3'] = df['price'].shift(3)
    df['price_t4'] = df['price'].shift(4)
    df['price_t5'] = df['price'].shift(5)
    df['target'] = df['price'].shift(-10)

    df = df.dropna()

    train, test = train_test_split(df, test_size=split_ratio, random_state=1234, shuffle=False)
    fitted_scaler = scaler.fit(train[scale_cols])

    train[scale_cols] = fitted_scaler.transform(train[scale_cols])
    test[scale_cols] = fitted_scaler.transform(test[scale_cols])

    train_x = train.drop(['ymd', 'target'], axis=1)
    train_y = train[['target']]

    test_x = test.drop(['ymd', 'target'], axis=1)
    test_y = test[['target']]

    train_x = train_x.values
    train_y = train_y.values

    test_x = test_x.values
    test_y = test_y.values

    return train_x, train_y, test_x, test_y, fitted_scaler

def models_save(train_x, train_y, test_x, test_y):
    # XGBoost
    xgb = XGBRegressor(n_estimators=40000, learning_rate=0.01, max_depth=5, random_state=1234)
    xgb.fit(train_x, train_y, eval_set=[(test_x, test_y)], early_stopping_rounds=10, verbose=10)
    # xgboost model save
    xgb.save_model("model/trained/xgboost_model.json")

    # Random Forest
    rf = RandomForestRegressor(n_estimators=100, random_state=1234)
    rf.fit(train_x, train_y)

    # random forest model save
    joblib.dump(rf, "model/trained/random_forest_model.pkl")

    # Catboost

    cat = CatBoostRegressor(n_estimators=40000, learning_rate=0.01, max_depth=15, random_state=1234)
    cat.fit(train_x, train_y, eval_set=[(test_x, test_y)], early_stopping_rounds=10, verbose=10)

    # 모델 저장
    cat.save_model("model/trained/catboost_model", format="cbm", export_parameters=None)


def models_load():
    # xgboost model load
    xgb = XGBRegressor()
    xgb.load_model("model/trained/xgboost_model.json")

    # random forest model load
    rf = joblib.load("model/trained/random_forest_model.pkl")

    # catboost model load
    cat = CatBoost()
    cat.load_model("model/trained/catboost_model")

    return xgb, rf, cat


def validation(xgb, rf, cat, test_x, test_y):
    # predict
    pred_xgb = xgb.predict(test_x)
    pred_rf = rf.predict(test_x)
    pred_cat = cat.predict(test_x)

    print("xgb mse:", mean_squared_error(test_y, pred_xgb))
    print("xgb r2:", r2_score(test_y, pred_xgb))

    print("random forest mse:", mean_squared_error(test_y, pred_rf))
    print("random forest r2:", r2_score(test_y, pred_rf))

    print("catboost mse:", mean_squared_error(test_y, pred_cat))
    print("catboost r2:", r2_score(test_y, pred_cat))

    valid = (pred_xgb + pred_rf + pred_cat) / 3

    print("ensemble mse:", mean_squared_error(test_y, valid))
    print("ensemble r2:", r2_score(test_y, valid))

    return valid

def predict(xgb, rf, cat, x):
    pred_xgb = xgb.predict(x)
    pred_rf = rf.predict(x)
    pred_cat = cat.predict(x)

    pred = (pred_xgb + pred_rf + pred_cat) / 3
    pred = pred[0]
    return pred


def get_last_row(scaler):
    df = db_to_df()
    scale_cols = ['dayAvgTa', 'dayMaxTa', 'dayMinTa', 'daySumRn', 'dayAvgWs', 'dayAvgRhm', 'daySumSs']

    df['price_t1'] = df['price'].shift(1)
    df['price_t2'] = df['price'].shift(2)
    df['price_t3'] = df['price'].shift(3)
    df['price_t4'] = df['price'].shift(4)
    df['price_t5'] = df['price'].shift(5)

    data = df.drop(['ymd', 'type', 'pred'], axis=1).iloc[-1, :]
    data[scale_cols] = scaler.transform(data[scale_cols].values.reshape(1, -1))[0]
    data = data.values.reshape(1, -1)

    return data


# train_x, train_y, test_x, test_y, fitted_scaler = make_trainable_data()

# models_save(train_x, train_y, test_x, test_y)

# xgb, rf, cat = models_load()


# # db 마지막 행 가져오기
# data = get_last_row(fitted_scaler)
# pred = predict(xgb, rf, cat, data)


def predict_update_price():
    # 데이터 전처리
    train_x, train_y, test_x, test_y, fitted_scaler = make_trainable_data()
    
    # 모델 재학습
    models_save(train_x, train_y, test_x, test_y)
    
    # 모델 로드
    xgb, rf, cat = models_load()

    # db 마지막 행 가져오기
    data = get_last_row(fitted_scaler)
    
    # 예측
    pred = predict(xgb, rf, cat, data)

    return pred