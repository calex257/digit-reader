import numpy as np
import math
import tensorflow as tf
from tensorflow import keras
from keras import layers
from keras.models import Sequential
from keras.layers import Dense
from keras.activations import linear, relu, sigmoid
import matplotlib.pyplot as plt
import PIL
from PIL import Image
from tkinter import *
import tkinter as tk
import cv2
from skimage import io, exposure, data

# function to display an image
def draw(n):
    plt.imshow(n,cmap=plt.cm.binary)
    plt.show()

def get_digit(file_name):
    # load trained model
    model = keras.models.load_model('new_try.h5')

    # open jpg and convert to png
    image = PIL.Image.open(file_name)
    image.save(file_name, format = "png")
    image = PIL.Image.open(file_name)

    # resize the image
    print("size initial" + str(image.size))
    image = image.resize((28, 28))
    print("Size 3: " + str(image.size))

    # grayscale
    image = np.array(image.convert('L'))

    # increase contrast
    percentiles = np.percentile(image, (3, 97))
    scaled = exposure.rescale_intensity(image, in_range=tuple(percentiles))
    im = PIL.Image.fromarray(scaled)
    im.save("c2.png")

    # get the updated image
    img = cv2.imread(f"c2.png")[:,:,0]
    print("Size 1: " + str(img.size))

    # invert (otherwise it won't work)
    img = np.invert(np.array([img.flatten()]))

    # predict and round
    pred = model.predict(img)
    np.set_printoptions(precision=3)
    # print(np.round_(pred * 100, decimals=2))
    return np.round_(pred * 100, decimals=2).argmax()

#get_digit("blb2.jpg")