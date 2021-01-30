#import required libraries 
import numpy as np
import cv2
import base64
# import time
import sys
#load cascade classifier training file for haarcascade
haar_face_cascade = cv2.CascadeClassifier('python-scripts/data/haarcascade_frontalface_alt.xml')
#load test iamge
image_path = 'public/uploads/' + sys.argv[1]
# image_path = 'python-scripts/data/test1.jpg'
test1 = cv2.imread(image_path)
#convert the test image to gray image as opencv face detector expects gray images
gray_img = cv2.cvtColor(test1, cv2.COLOR_BGR2GRAY)
#display the gray image using OpenCV

# cv2.imshow('Test Image', gray_img) 
# cv2.waitKey(0)
# cv2.destroyAllWindows()

#let's detect multiscale (some images may be closer to camera than others) images
faces = haar_face_cascade.detectMultiScale(gray_img, scaleFactor=1.1, minNeighbors=5)
#print the number of faces found

# print('Faces found: ', len(faces))

if len(faces)==1:
    #resize_image=cv2.resize(test1,(150,150))
    # print('Image accepted')
    with open(image_path, "rb") as img_file:
        my_string = base64.b64encode(img_file.read())
    print(str(my_string)[2:-1])
# else:
#     print('Not a valid image to upload')