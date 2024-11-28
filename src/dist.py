import sys
import math

v = []

def main():
    with open("glove.6B.300d.txt") as f:
        for line in f:
            if line.split()[0] == sys.argv[1] or line.split()[0] == sys.argv[2]:
                v.append([float(x) for x in line.split()[1:]])
                if len(v) == 2: break
    
    print(math.dist(v[0],v[1]))


if __name__ == "__main__":
    main()