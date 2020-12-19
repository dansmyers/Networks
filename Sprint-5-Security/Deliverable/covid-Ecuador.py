"""
Covid cases in Quito, Ecuador
"""

import matplotlib
matplotlib.use("Agg")
from matplotlib import pyplot as plt
import numpy as np 
import pandas as pd 
import seaborn as sns 
import csv 


#Open a locations file to read

f = open('locations.csv', 'r')


#Creat empty list for locations
quito_locations = []

#Use for loop to iterate in line of file
for line in f:
    line = line.strip() #get rid of extra line between data values

    #append only locations in Quito form file to data list
    if line.startswith("QUITO,"):
         #Append only the parish name, which is the second word in each line
            quito_locations.append(line[6:])
            
print(quito_locations)

#Open data file to read
fi = open('vchan.csv', 'r')

#create empty list for covid cases in each parish in Quito only
quito_covid_cases = []
quito_parishes = []

#Use for loop to iterate in line of file
for line in fi:
    line = line.strip() #get rid of extra line between data values
    
    #I need only the parished from Quito, so I need to look for the cities in my last list
    #quito_parishes = [line.split(',')[0] for line in fi]
    
    #if the parish is found in quito_locations, then add data into quito_covid_casess
    for i in range(0,len(quito_locations)):
        if line.startswith(quito_locations[i]):
            quito_covid_cases.append([line]) 
            
#Now I want to create a csv file with only Quito data            
with open('quito_data.csv', 'wb') as myfile:
     wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
     wr.writerow(quito_covid_cases)
    
print(quito_covid_cases)

















