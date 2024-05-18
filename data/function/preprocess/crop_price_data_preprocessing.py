## get every json file in the folder
## using glob

import glob
import os
import pandas as pd
import json

def get_all_json_files(path):
    return glob.glob(path + "/*.json")

def get_all_csv_files(path):
    return glob.glob(path + "/*.csv")


## 가격 데이터 전처리
csv_list = get_all_csv_files("./raw/target")

result = pd.DataFrame()

for csv in csv_list:
    sample = pd.read_csv(csv, encoding="cp949")
    result = pd.concat([result, sample])

result.sort_values(by=["INQ_YMD", "PDLT_CODE"], inplace=True)

result.to_csv("./preprocessed/target/target.csv", index=False, encoding="cp949")

# ## input 데이터 전처리
# json_list = get_all_json_files("./raw/input")
#
#
# def json2list(json_file: json, get_key=False)->(list, list):
#     with open(json_file, "r") as f:
#         sample = json.load(f)
#         key_list = []
#         value_list = []
#         for key in sample.keys():
#             if key == "ANNOTATIONS":
#                 key_list.extend(sample[key][0].keys())
#                 value_list.extend(sample[key][0].values())
#             else:
#                 key_list.extend(sample[key].keys())
#                 value_list.extend(sample[key].values())
#     if get_key:
#         return key_list, value_list
#     else:
#         return value_list
#
# for idx, json_file in enumerate(json_list):
#     if idx == 0:
#         key_list, value_list = json2list(json_file, get_key=True)
#         df = pd.DataFrame([value_list], columns=key_list)
#     else:
#         value_list = json2list(json_file)
#         df = pd.concat([df, pd.DataFrame([value_list], columns=key_list)])
#     print(idx)
#
#
#
# df.to_csv("./preprocessed/input/input.csv", index=False, encoding="cp949")

# for json_file in json_list:
#     with open(json_file, "r") as f:
#         sample = json.load(f)
#         print(sample)