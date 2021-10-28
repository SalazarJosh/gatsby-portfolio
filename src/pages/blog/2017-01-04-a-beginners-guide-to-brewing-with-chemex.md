---
templateKey: blog-post
title: Recreating GitHub's Globe
date: 2021-07-01
featuredpost: false
featuredimage: /img/github-globe.png
description: Brewing with a Chemex probably seems like a complicated, time-consuming ordeal, but once you get used to the process, it becomes a soothing ritual that's worth the effort every time.
tags:
  - brewing
  - chemex
---
![chemex](/img/chemex.jpg)

**Hey there!** Just so you know, I am not affiliated with GitHub. This was a fun project that I created after reading GitHub's blog post series on their home page redesign.

Earlier this year GitHub launched their new homepage design

In that series they share some details of how they built the globe in the first article of the 5 part series. I couldn't get over how cool this post was and, like I said before, I really wanted to stand out. So I thought I would do my best to use the same JavaScript three.js library to recreate their globe with the time I had.

The hardest part was recreating the atmosphere. On their post they mentioned they used a slightly offset sphere with a custom shader to get the atmospheric effect. I've never created a custom shader in three.js so it took some time to figure that out and get it looking right.

```
const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0xeeeeee
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);
```

Once the atmosphere was set, I wanted to quickly recreate the dots for the land. Instead of rendering an individual mesh for each dot and calculating the spherical offset position, I ended up applying a transparent texture to another, slightly larger, sphere. On GitHub's globe I noticed the dots glow even in the shadowed regions of earth. To mimic this I made the texture ignore light and shadow.

Finally, I wrote a script to get the mouse movement within the canvas while the mouse button is pressed. I took the difference of movement on the x axis to calculate the rotation of the sphere on its global y axis. GitHub's globe allows for rotation on the x and y axis and has some smoothing applied, but I had to move along after getting just the x axis working.

## The little secrets of Chemex brewing

The Chemex Coffeemaker consists of an hourglass-shaped glass flask with a conical funnel-like neck (rather than the cylindrical neck of an Erlenmeyer flask) and uses proprietary filters, made of bonded paper (thicker-gauge paper than the standard paper filters for a drip-method coffeemaker) that removes most of the coffee oils, brewing coffee with a taste that is different than coffee brewed in other coffee-making systems; also, the thicker paper of the Chemex coffee filters may assist in removing cafestol, a cholesterol-containing compound found in coffee oils. Here’s three important tips newbies forget about:

1. Always buy dedicated Chemex filters.
2. Use a scale, don’t try to eyeball it.
3. Never skip preheating the glass.
4. Timing is key, don’t forget the clock.

The most visually distinctive feature of the Chemex is the heatproof wooden collar around the neck, allowing it to be handled and poured when full of hot water. This is turned, then split in two to allow it to fit around the glass neck. The two pieces are held loosely in place by a tied leather thong. The pieces are not tied tightly and can still move slightly, retained by the shape of the conical glass.

For a design piece that became popular post-war at a time of Modernism and precision manufacture, this juxtaposition of natural wood and the organic nature of a hand-tied knot with the laboratory nature of glassware was a distinctive feature of its appearance.
