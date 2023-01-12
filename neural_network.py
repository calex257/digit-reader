import numpy as np
import math
import tensorflow as tf
from tensorflow import keras
from keras import layers
from keras.models import Sequential
from keras.layers import Dense
from keras.activations import linear, relu, sigmoid
import matplotlib.pyplot as plt
from PIL import ImageGrab, Image

from keras.datasets import mnist
(X_train, y_train), (X_test, y_test) = mnist.load_data()
print(X_train.shape, y_train.shape)
#print('The first element of X is: ', X_train[0])

# flatten every given input from a matrix into a simple array

X_train_final = np.zeros((X_train.shape[0], X_train.shape[1] * X_train.shape[2]))
print(X_train_final.shape)

for i in range(X_train.shape[0]):
   X_train_final[i] = np.array(X_train[i].flatten())

print(X_train_final[59999])

# print(X_train_final[5])
print(X_train_final[5].shape)

# same for the test inputs
X_test_final = np.zeros((X_test.shape[0], X_test.shape[1] * X_test.shape[2]))

for i in range(X_test.shape[0]):
   X_test_final[i] = np.array(X_test[i].flatten())

# design the model architecture
tf.random.set_seed(1234) # for consistent results
model = Sequential(
    [               
        tf.keras.Input(shape = (784,)),
        layers.Dense(128, activation="relu", name="layer1"),
        layers.Dense(256, activation="relu", name="layer2"),
        layers.Dense(256, activation="relu", name="layer3"),
        layers.Dense(10, activation="softmax", name="layer4"),
    ], name = "model" 
)

# make it show on screen
model.summary()

# save layers
[layer1, layer2, layer3, layer4] = model.layers
#### Examine Weights shapes
W1,b1 = layer1.get_weights()
W2,b2 = layer2.get_weights()
W3,b3 = layer3.get_weights()
W4,b4 = layer4.get_weights()

# while loading, set the way it calculates loss and the gradient rate
model.compile(
    loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.001),
    metrics = ['accuracy']
)

# fit the test sets into the model
print("shape X_train: " + str(X_train_final.shape))
model.fit(X_train_final, y_train, epochs = 10)

# evaluate and print on screen how accurate the model is
accuracy, loss = model.evaluate(X_test_final, y_test)
print(accuracy)
print(loss)

# save the model
model.save('new_try.h5')