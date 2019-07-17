import os,face_recognition,pickle

path = 'C:/xampp/htdocs/website/login/pytest/'

imgtoverify=face_recognition.load_image_file(path+'my.jpg')
toverify = face_recognition.face_encodings(imgtoverify)[0]

db_encs = os.listdir(path+'encodings/')
print(db_encs)

img_num = 1
names = []
person = 'Unknown'

def most_common(lst):
    return max(set(lst), key=lst.count)

for db_enc in db_encs:
	if db_enc.endswith('.enc'):
		enc_file = open(path+'encodings/'+db_enc,'rb')
		enc = pickle.load(enc_file)
		enc_file.close()
		result = face_recognition.compare_faces([enc], toverify, tolerance=0.4)
		print(result)
		name = db_enc[:(db_enc.index('.')-1)]
		if result[0] == True:
			names.append(name)

print (names)
#most common name
if names:
	person = most_common(names)
	if(person!='Unknown'):
		print('photo matched as '+person)
else:
	print('no match found')
