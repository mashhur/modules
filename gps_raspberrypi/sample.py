# Copyright 2015 by Mashhur Sattorov
# MIT License

import serial
import string

gps = serial.Serial('/dev/ttyUSB0', 4800, timeout=1)
file = '/tmp/nmea.kml'

print "Serving data"

latitude = 0
longitude = 0
speed = 0
heading = 0
altitude = 0
range = 1000
tilt = 30

while 1:
	line = gps.readline()
	datablock = line.split(',') 

	if line[0:6] == '$GPRMC':
		latitude_in = string.atof(datablock[3])
		longitude_in = string.atof(datablock[5])
		altitude = string.atof(datablock[8])
		speed_in = string.atof(datablock[7])
		heading = string.atof(datablock[8])

		if datablock[4] == 'S':
                         latitude_in = -latitude_in
                if datablock[6] == 'W':
                         longitude_in = -longitude_in

                latitude_degrees = int(latitude_in/100)
                latitude_minutes = latitude_in - latitude_degrees*100

                longitude_degrees = int(longitude_in/100)
                longitude_minutes = longitude_in - longitude_degrees*100

                latitude = latitude_degrees + (latitude_minutes/60)
                longitude = longitude_degrees + (longitude_minutes/60)

		speed = int(speed_in * 1.852)
		range = ( ( speed / 100  ) * 350 ) + 650
		tilt = ( ( speed / 120 ) * 43 ) + 30

		if speed < 10:
			range = 200
			tilt = 30
			heading = 0

		output = """<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.0">
	<Placemark>
		<name>%s km/h</name>
		<description>^</description>
		<LookAt>
			<longitude>%s</longitude>
			<latitude>%s</latitude>
			<range>%s</range>
			<tilt>%s</tilt>
			<heading>%s</heading>
		</LookAt>
		<Point>
			<coordinates>%s,%s,%s</coordinates>
		</Point>
	</Placemark>
</kml>""" % (speed,longitude,latitude,range,tilt,heading,longitude,latitude,altitude)

		f=open(file, 'w')
		f.write(output)
		f.close()

ser.close()