#!/usr/bin/python3

import argparse, csv, re

parser = argparse.ArgumentParser(
    description='整理 covid 資料',
    formatter_class=argparse.ArgumentDefaultsHelpFormatter)
parser.add_argument('-c', '--country_list', type=str, default='G20.csv',
    help='有興趣的國名列表')
parser.add_argument('covid_file', help='covid 資料檔')
args = parser.parse_args()

countries = {}
with open(args.country_list) as f:
    for line in csv.reader(f):
        countries[line[0]] = line[1]

with open(args.covid_file) as f:
    header = next(csv.reader(f))
    header.insert(1, 'zh_name')
    print(','.join(header))
    for line in csv.reader(f):
        if not line[0] in countries: continue
        out = [ x if x else '0' for x in line ]
        out.insert(1, countries[line[0]])
        print(','.join(out))
