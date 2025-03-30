import pygame 

pygame.init()

x = 720
y = 480

x0 = x/2
y0 = y/2

r = 120

acol = (148, 20, 0)
bcol = (231, 91, 16)
ccol = (246, 189, 4)

acenter = (260,240)
bcenter = (360,240)
ccenter = (460,240)

colr = '#1c1c1c'

cnv = pygame.display.set_mode([x,y])

running = True
while running:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    cnv.fill((24, 24, 24))

    pygame.draw.circle(cnv, acol, acenter, r)
    pygame.draw.circle(cnv, bcol, bcenter, r)
    pygame.draw.circle(cnv, ccol, ccenter, r)

    pygame.display.flip()


pygame.image.save(cnv,'cedartreelogo.png')
pygame.quit()