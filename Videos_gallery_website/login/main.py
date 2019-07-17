#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python36_64\python.exe
print('Content-Type: text/html')
print()
import cgi,os,face_recognition,pickle

form = cgi.FieldStorage()

filee=form['imgg']
fn = os.path.basename(filee.filename)
open('images/' + fn, 'wb').write(filee.file.read())

print('step1', end='')

path = 'C:/xampp/htdocs/website/login/'

imgtoverify=face_recognition.load_image_file(path+'images/notrealname.jpg')
toverify = face_recognition.face_encodings(imgtoverify)[0]

db_encs = os.listdir(path+'encodings/')
print('step2', end='')

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
		name = db_enc[:(db_enc.index('.')-1)]
		if result[0] == True:
			names.append(name)

print('step3', end='')
#most common name
if names:
	person = most_common(names)
	if(person!='Unknown'):
		print('photo_matched_as'+person,end='')
else:
	print('no_match_found_',end='')
print('_finalstep', end='')