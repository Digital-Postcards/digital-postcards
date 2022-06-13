# This script is for extracting all possible locations of postcards and tradecards from google drive (Digital Postcard > Info Spreadsheet).

import pandas
import re

input_file = "raw_locations.csv"
output_file = "locations_extracted.txt"
column_name = "Location - Map" # column name for location in Info Spreadsheet

df = pandas.read_csv(input_file)
locations = df[column_name]


def processString(loc):
    loc.replace('\"', "")   # remove quotes if present
    loc = loc.strip()   # remove whitespace if present

    # if two locations are separated with ';', take the first one (believe to be place of origin)
    x = re.search("^.*;", loc)
    if x:
        loc = x.group().replace(";", "")
    return loc

locations_set = []  # store the extracted locations

with open(output_file, "w") as f:
    for loc in locations:
        if (type(loc) == str and "?" not in loc):   # Currently, locations containing '?' are ignored.
            loc = processString(loc)
            if loc not in locations_set:
                f.write(loc + "\n")
                locations_set.append(loc)   # add to extracted locations
print(len(locations_set))

