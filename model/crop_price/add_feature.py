import pandas as pd
import numpy as np

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# train the boosting model
from xgboost import XGBRegressor

import matplotlib.pyplot as plt

# # FFNN prediction
# import torch
# import torch.nn as nn
# import torch.optim as optim
# from torch.utils.data import DataLoader, TensorDataset

pd.set_option('display.max_columns', None)

df = pd.read_csv("data/preprocessed/data.csv")

# print(df)


scaler = MinMaxScaler()
scale_cols = ['temp', 'high_temp', 'low_temp', 'rain', 'wind', 'humidity', 'sunshine', 'sunlight', 'product']

df_scaled = scaler.fit_transform(df[scale_cols])
df_scaled = pd.DataFrame(df_scaled)
df_scaled['price'] = df['price']
df_scaled['price_t1'] = df['price'].shift(1)
df_scaled['price_t2'] = df['price'].shift(2)
df_scaled['price_t3'] = df['price'].shift(3)
df_scaled['price_t4'] = df['price'].shift(4)
df_scaled['price_t5'] = df['price'].shift(5)
df_scaled.columns = scale_cols + ['price', 'price_t1', 'price_t2', 'price_t3', 'price_t4', 'price_t5']

# 계절 추가
df_scaled['season'] = df['date'].apply(lambda x: (int(x.split('-')[1]) % 12) // 3)
# print(df_scaled['season'].unique())

df_scaled['KRW/USD'] = df['KRW/USD']

print(df_scaled)

delay=30

# 60일 뒤 가격 예측
df_scaled['target'] = df['price'].shift(-delay)
df_scaled = df_scaled.dropna()

train, test = train_test_split(df_scaled, test_size=0.2, random_state=1234, shuffle=False)

train_x = train.drop('target', axis=1)
train_y = train[['target']]
test_x = test.drop('target', axis=1)
test_y = test[['target']]
date_list = df['date'].tolist()
train_date = date_list[:int(len(date_list) * 0.8)]
test_date = date_list[int(len(date_list) * 0.8):]

train_x = train_x.values
train_y = train_y.values
test_x = test_x.values
test_y = test_y.values

model = XGBRegressor(n_estimators=40000, learning_rate=0.001, max_depth=10, minchildweight=1, colsamplebytree=0.8, colsamplebylevel=0.8, random_state=1234)
model.fit(train_x, train_y, early_stopping_rounds=10, eval_set=[(test_x, test_y)], verbose=1)

# predict
pred = model.predict(test_x)


print(mean_squared_error(test_y, pred))
print(r2_score(test_y, pred))


plt.plot(test_y, label='actual')
plt.plot(pred, label='prediction')
plt.xticks(np.arange(0, len(test_y), step=100), test_date[::100])
plt.legend()
plt.title(f"XGBoost price prediction {delay} days later")
plt.show()