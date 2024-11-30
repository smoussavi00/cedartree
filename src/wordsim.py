import numpy as np
from scipy import interpolate
from matplotlib import pyplot as plt
import math
from pathlib import Path
import sys

import warnings
warnings.filterwarnings("ignore")

def get_dist(w1,w2):
        
        v = []

        with open("glove.6B.300d.txt") as f:
            for line in f:
                if line.split()[0] == w1 or line.split()[0] == w2:
                    v.append([float(x) for x in line.split()[1:]])
                    if len(v) == 2: break

        return math.dist(v[0],v[1])

sims = []

x = []
y = []

r = 4

n = int(sys.argv[1])
word = sys.argv[2]
syns = sys.argv[3:]

w = -2
h = -2.4

anno_conv = {0:(0,h/2), 1:(0,0), 2:(w/2,0), 3:(w,0), 4:(w,h/2), 5:(w,h), 6:(w/2,h), 7:(0,h)}
anno_x = [anno_conv[round(8*i/n)%8][0] + 8.5*math.cos(i*2*math.pi/n) for i in range(n)]
anno_y = [anno_conv[round(8*i/n)%8][1] + 8.5*math.sin(i*2*math.pi/n) for i in range(n)]


for i in range(n):
# CONVERT WORD SIMILARITIES INTO SCALING FOR THE DIAGRAM 
    sim = get_dist(word, syns[i])

    if sim <= 3: sims.append(1.8)
    elif sim <= 4: sims.append(1.8)
    elif sim <= 5: sims.append(1.8)
    elif sim <= 5.5: sims.append(1.75)
    elif sim <= 6: sims.append(1.7)
    elif sim <= 6.5: sims.append(1.6)
    elif sim <= 7: sims.append(1.5)
    elif sim <= 7.5: sims.append(1.4)
    elif sim <= 8: sims.append(1.3)
    elif sim <= 9: sims.append(1.25)
    else: sims.append(1)

for i in range(n):

    y.append(r*math.sin((i-0.3)*2*math.pi/n))
    x.append(r*math.cos((i-0.3)*2*math.pi/n))
    x[-1] *= (1+sims[i])/2
    y[-1] *= (1+sims[i])/2

    y.append(r*math.sin(i*2*math.pi/n))
    x.append(r*math.cos(i*2*math.pi/n))
    x[-1] *= sims[i]
    y[-1] *= sims[i]

    y.append(r*math.sin((i+0.3)*2*math.pi/n))
    x.append(r*math.cos((i+0.3)*2*math.pi/n))
    x[-1] *= (1+sims[i])/2
    y[-1] *= (1+sims[i])/2

x = np.array(x)
y = np.array(y)

x = np.r_[x, x[0]]
y = np.r_[y, y[0]]

tck, u = interpolate.splprep([x, y], s=0, per=True)

xi, yi = interpolate.splev(np.linspace(0, 1, 2000), tck)

fig, ax = plt.subplots(1, 1)

ax.set_facecolor('#1C1C1C')
fig.patch.set_facecolor('#1C1C1C')

ax.plot(xi, yi, '-b', color='#FEFFFB', linewidth=4)
#ax.plot([x[i] for i in range(1,3*n,3)], [y[i] for i in range(1,3*n,3)], 'or', color='#FEFFFB')

circle = plt.Circle((0, 0), 8, color='#FEFFFB', fill=False, linewidth=4)
ax.add_patch(circle)

fpath = Path("./EudoxusSans-ExtraBold.ttf")

txt = 'ABCDEFGH'
for i in range(n):
    ax.annotate(txt[i], (anno_x[i], anno_y[i]), color="#FEFFFB", font=fpath, size=30)

plt.xlim(-12, 12)
plt.ylim(-12, 12)

ax = plt.gca()
ax.set_aspect('equal', adjustable='box')
plt.axis('off')

plt.savefig('diagram.png')
print('diagram.png saved')
