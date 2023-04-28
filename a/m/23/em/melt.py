import pandas as pd
data = pd.read_csv('electricity-mix-leaves.csv')
data = data.melt(id_vars =['code', 'continent', 'Entity', 'Year'], var_name='source')
data.to_csv('electricity-mix-melted.csv', index=False)
