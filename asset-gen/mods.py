import pygame
import math

def gen():
    pygame.init()
    screen = pygame.display.set_mode((640, 640), pygame.SRCALPHA)  

    transparent_surface = pygame.Surface((640, 640), pygame.SRCALPHA)
    transparent_surface.fill((0, 0, 0, 0)) 

    d = 240
    r = 64

    gap = math.sqrt(d**2/2)/2

    a = d/(2*math.sqrt(3))
    b = d/math.sqrt(3)

    diff = (b-a)/2

    c1pos = (320,320-b+diff)
    c2pos = (320-(d/2),320+a+diff)
    c3pos = (320+(d/2),320+a+diff)

    c4pos = (320-gap,320+gap)
    c5pos = (320+gap,320-gap)

    clr = (214, 213, 205)
    clr2= (18,18,17)

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        pygame.draw.circle(transparent_surface, clr2, (320,320), r)

        screen.blit(transparent_surface, (0, 0))
        pygame.display.update()

    pygame.image.save(transparent_surface,'mode-1b.png')
    pygame.quit()

gen()