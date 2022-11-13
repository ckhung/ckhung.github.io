import argparse, json, sys

parser = argparse.ArgumentParser(
    description='owid covid summary',
    formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument('-d', '--ndays', type=int, default=14,
    help='# of top death days')
parser.add_argument('file', help='owid covid json file')
args = parser.parse_args()

with open(args.file, 'r') as jsf:
    data = json.load(jsf)
# json.dump(data, sys.stdout, indent=2)

print('country,stringency_index,new_deaths')
for country in sorted(data.keys()):
    new_deaths = []
    stringency_index = 0
    for day in data[country]['data']:
        nd = day['new_deaths'] if 'new_deaths' in day else 0
        si = day['stringency_index'] if 'stringency_index' in day else 0
        new_deaths.append(nd)
        stringency_index += si
    stringency_index /= len(data[country]['data'])
    new_deaths = sorted(new_deaths)[-args.ndays:]
    new_deaths = sum(new_deaths) / args.ndays
    print('{},{:.2f},{:.2f}'.format(country, stringency_index, new_deaths))

