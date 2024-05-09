import pandas_datareader as pdr

# df = pdr.get_data_fred("DEXKOUS")
# rate = df["DEXKOUS"][-1]

# start: 2014-01-01 end: 2024-01-01

df = pdr.get_data_fred("DEXKOUS", start="2014-01-01", end="2024-01-01")

print(df.dropna())

df.reset_index(inplace=True)
df.columns = [['date', 'KRW/USD']]
df = df.dropna()
df.to_csv("data/raw/forex_data.csv", index=False)