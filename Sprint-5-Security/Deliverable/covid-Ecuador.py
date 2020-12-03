"""
Covid cases in Quito, Ecuador
"""

import matplotlib
matplotlib.use("Agg")
from matplotlib import pyplot as plt

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
        if line.find(',RURAL'):
            index = line.find(',RURAL') #stores the index of a substring or char
            quito_locations.append(line[6:index])
            
        elif line.find(',URBANA'):
            index2 = line.find(',URBANA')
            quito_locations.append(line[6:index2])
    
print(quito_locations)

#Open data file to read
fi = open('vchan.csv', 'r')

#create empty list for covid cases in each parish in Quito only
quito_covid_cases = []

#Use for loop to iterate in line of file
for line in fi:
    line = line.strip() #get rid of extra line between data values
    
    #I need only the parished from Quito, so I need to look for the cities my last list
    quito_parishes = [line.split(',')[0] for line in fi]
    
    #if the parish is found in quito_locations, then add data into quito_covid_casess
    for i in range(0,len(quito_locations)):
        if quito_parishes == quito_locations[i]:
            quito_covid_cases.append(line) 
    
print(quito_covid_cases)















