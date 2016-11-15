from flask import Flask, render_template, request, current_app, send_from_directory, jsonify
import json
import tensorflow as tf
import numpy as np

app = Flask(__name__)

@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('', path)

@app.route("/")
def fontColorPage():
    return send_from_directory('', 'index.html')

@app.route("/learning", methods=['POST'])
def learning():
    data = request.json
    xy = np.array(data['data'])
    x_data = np.transpose(xy[:,:-1])
    y_data = xy[:,-1]

    X = tf.placeholder(tf.float32)
    Y = tf.placeholder(tf.float32)

    W = tf.Variable(tf.random_uniform([1, len(x_data)], -1.0, 1.0))

    h = tf.matmul(W, X)
    hypothesis = tf.div(1., 1. + tf.exp(-h))

    cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))

    rate = tf.Variable(2.0)
    optimizer = tf.train.GradientDescentOptimizer(rate)
    train = optimizer.minimize(cost)

    init = tf.initialize_all_variables()

    sess = tf.Session()
    sess.run(init)

    for step in range(2001):
        sess.run(train, feed_dict={X: x_data, Y: y_data})
        if step % 20 == 0:
            print(step, sess.run(cost, feed_dict={X: x_data, Y: y_data}), sess.run(W))

    result = sess.run(W);
    return json.dumps({'weights' : result[0].tolist()})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
