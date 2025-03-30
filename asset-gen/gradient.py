from colour import Color

def interpolate_colors(color1, color2, factor):
    return Color(
        red=color1.red + factor * (color2.red - color1.red),
        green=color1.green + factor * (color2.green - color1.green),
        blue=color1.blue + factor * (color2.blue - color1.blue)
    )

def generate_gradient(colors, steps):
    gradient = []
    segments = len(colors) - 1
    
    for i in range(steps-1):
        t = i / (steps - 1)
        segment = int(t * segments)
        local_t = (t * segments) - segment
        gradient.append(interpolate_colors(colors[segment], colors[segment + 1], local_t).hex_l)
    gradient.append(colors[-1].hex_l)
    return gradient

colors = [Color("#1e1e1d"), Color("#941400"), Color("#e75b10"), Color("#f6bd04"), Color("#d6d5cd")]
steps = 100

print(generate_gradient(colors, steps))

