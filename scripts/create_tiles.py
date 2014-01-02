
fd = open('localisation_accidents_corporels_france_metropole.csv', 'r')
accidents = []
for l in fd.readlines():
    #org,com,gps,lat,long,dep,catr,voie,v1,v2,pr,pr1,ttue,tbg,tbl,tindm,typenumero,numero,distancemetre,libellevoie,coderivoli,grav
    arr = l.rstrip('\n').split(',')
    try:
	com = int(arr[1])
    except:
	com = 0
    try:
	lat = float(arr[3]) / 100000
    except:
	lat = 0.0
    try:
	lng = float(arr[4]) / 100000
    except:
	lng = 0.0
    try:
	dep = int(arr[5]) / 10
    except:
	dep = 0
    cat = arr[6]
    try:
	grv = float(arr[21])
    except:
	grv = 0.0

    if grv < 1.0:
	grv = '#f6ff00'
    elif grv < 100.0:
	grv = '#ffae00'
    else:
	grv = '#ff0000'
    if lat != 0.0:
        accidents.append((lat, lng, grv))
fd.close()
 
for _lat in range(38, 53):
    for _lng in range(-6, 11):
        lat_min = _lat
        lat_max = _lat + 1
        lng_min = _lng
        lng_max = _lng + 1

        f = open('accidents.%d.%d.json' % (lat_min, lng_min), 'w')
        print >> f, "{ \"accidents\" : ["
        for (lat, lng, grv) in accidents:
            if lat >= lat_min and lat < lat_max and lng >= lng_min and lng < lng_max:
                print >> f, '{ "lat": %f, "lng": %f, "grv": "%s" },' % (lat, lng, grv)
        print >> f, '{} ] }'
        f.close()

