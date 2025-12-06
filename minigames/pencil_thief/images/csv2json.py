import csv
import json
import dinput

csvfile = open('src.csv', 'r')
jsonfile = open('dict.json', 'w')

fieldnames = ("src","text")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
	json.dump(row, jsonfile)
	jsonfile.write('\n')
