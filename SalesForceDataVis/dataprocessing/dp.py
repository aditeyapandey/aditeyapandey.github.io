import pandas as pd

df=pd.read_csv("acs2015_county_data.csv")
print df
statedf=df.groupby(['State'])
print statedf