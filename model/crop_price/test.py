import pandas as pd
import numpy as np

pd.set_option('display.max_columns', None)

df = pd.read_csv("../../data/crop_price/weather/data.csv", encoding="cp949")

# data scaling
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
scale_cols = ['rain', 'temp', 'htemp', 'ltemp', 'humid', 'ss', 'sr', 'wind']
df_scaled = scaler.fit_transform(df[scale_cols])
df_scaled = pd.DataFrame(df_scaled)
df_scaled['price'] = df['price']
df_scaled['price_t1'] = df['price'].shift(1)
df_scaled['price_t2'] = df['price'].shift(2)
df_scaled['price_t3'] = df['price'].shift(3)
df_scaled['price_t4'] = df['price'].shift(4)
df_scaled['price_t5'] = df['price'].shift(5)
df_scaled.columns = scale_cols + ['price', 'price_t1', 'price_t2', 'price_t3', 'price_t4', 'price_t5']

# 60일 뒤 가격 예측
df_scaled['target'] = df['price'].shift(-30)
print(df_scaled)
df_scaled = df_scaled.dropna()

# train, test split
from sklearn.model_selection import train_test_split

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
#
# # train the boosting model
# from xgboost import XGBRegressor
#
# model = XGBRegressor(n_estimators=40000, learning_rate=0.1, max_depth=3)
# model.fit(train_x, train_y, early_stopping_rounds=10, eval_set=[(test_x, test_y)], verbose=1)
#
# # predict
# pred = model.predict(test_x)
#
# # evaluate
# from sklearn.metrics import mean_squared_error
#
# print(mean_squared_error(test_y, pred))
#
#
# import matplotlib.pyplot as plt
# plt.plot(test_y, label='actual')
# plt.plot(pred, label='prediction')
# plt.xticks(np.arange(0, len(test_y), step=100), test_date[::100])
# plt.legend()
# plt.show()
#



# FFNN prediction
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

train_x = torch.tensor(train_x, dtype=torch.float32).to(device)
train_y = torch.tensor(train_y, dtype=torch.float32).to(device)
test_x = torch.tensor(test_x, dtype=torch.float32).to(device)
test_y = torch.tensor(test_y, dtype=torch.float32).to(device)

train_dataset = TensorDataset(train_x, train_y)
train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)

class FFNN(nn.Module):
    def __init__(self):
        super(FFNN, self).__init__()
        self.fc1 = nn.Linear(14, 64)
        self.fc2 = nn.Linear(64, 64)
        self.fc3 = nn.Linear(64, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = FFNN().to(device)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

model.train()

for epoch in range(1000):
    for x, y in train_loader:
        optimizer.zero_grad()
        output = model(x)
        loss = criterion(output, y)
        loss.backward()
        optimizer.step()
    if epoch % 100 == 0:
        # 진행상황 출력
        print(f"epoch: {epoch}", f"loss: {loss.item()}")

model.eval()
output = model(test_x)
print(criterion(output, test_y).item())

import matplotlib.pyplot as plt
plt.plot(test_y.cpu().numpy(), label='actual')
plt.plot(output.cpu().detach().numpy(), label='prediction')
plt.xticks(np.arange(0, len(test_y), step=100), test_date[::100])
plt.legend()

plt.show()
