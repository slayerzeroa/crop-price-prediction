import pandas as pd

df = pd.read_csv("C:/Users/slaye/VscodeProjects/crop_price_prediction/data/crop_price/crop_price.csv")

df = df[df['품종']=="배추(전체)"]
df = df[df['등급']=="상품"]
df = df[(df['거래단위']=="10kg(그물망 3포기)") | (df['거래단위']=="10kg")]

## 거래단위 == 10kg
df = df[['DATE', '품목', '평균가격']]
df.columns = ['date', 'crop', 'price']

