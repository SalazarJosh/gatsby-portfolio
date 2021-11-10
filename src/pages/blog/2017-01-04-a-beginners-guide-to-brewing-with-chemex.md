---
templateKey: blog-post
title: Recreating GitHub's Globe
date: 2021-07-01
featuredpost: false
featuredimage: /img/github-globe.png
description: Three.js is pretty cool. GitHub took it to the next level with their homepage design. In this post I share how I recreated the GitHub globe with WebGL.
tags:
  - JavaScript
  - Dev blog
---
**Hey there!** Just so you know, I am not affiliated with GitHub. This was a fun project that I created after reading GitHub's blog post series on their home page redesign. Here's how I recreated it.

WebGL only draws points, lines, and triangles. Everything else is up to the developer. This is where Three.js comes in. It takes the basics of WebGL and creates a higher-level library for developers.

I was experimenting with Three.js when I stumbled on GitHub's blog post series on their homepage redesign. I thought recreating the globe would be a fun and challenging project. They do share some details of how their globe was built. I did my best to fill in the blanks.


### Scene Setup
To start, I needed to setup the scene. I won't share the details of how I did this given there's nothing unintuitive in my approach to scene setup. If you're new to Three.js, I'd recommend starting with the [creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) page in their docs.

The initial globe layer and lighting was the first challenge in capturing the essence of the globe. I spent a lot of time moving the lights around and changing the values until I was happy with the results. I ended up with three lights in the scene. A light-blue key light to illuminate most of the globe, a lighter blue light for the highlighted upper-left edge, and a purple light for the right side of the globe.

<pre style="background-color: #eee; padding: 15px;">
<code>//SETUP lights
var light1 = new THREE.PointLight(0x5a54ff, 0.75);
light1.position.set(-150, 150, -50);

var light2 = new THREE.PointLight(0x4158f6, 0.75);
light2.position.set(-400, 200, 150);

var light3 = new THREE.PointLight(0x803bff, 0.7);
light3.position.set(100, 250, -100);

scene.add(light1, light2, light3);</code></pre>

And here are the results ...

<iframe height="300" style="width: 100%;" scrolling="no" title="GitHub Globe 2" src="https://codepen.io/joshsalazar/embed/mdMwWPP?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/joshsalazar/pen/mdMwWPP">
  GitHub Globe 2</a> by Joshua Salazar (<a href="https://codepen.io/joshsalazar">@joshsalazar</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Atmosphere
The atmosphere was probably the hardest part to recreate. On their post they mentioned they used a slightly offset sphere with a custom shader to get the atmospheric effect. I've never created a custom shader in three.js so it took some time to figure that out and get it looking right.

#### Atmosphere Shader
<pre style="background-color: #eee; padding: 15px;">
<code>const atmosphereShader = {
  'atmosphere': {
    uniforms: {},
    vertexShader: [
      'varying vec3 vNormal;',
      'void main() {',
      'vNormal = normalize( normalMatrix * normal );',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying vec3 vNormal;',
      'void main() {',
      'float intensity = pow( 0.99 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 6.0 );',
      'gl_FragColor = vec4( .28, .48, 1.0, 1.0 ) * intensity;',
      '}'
    ].join('\n')
  }
}</code></pre>

#### Atmosphere Mesh
Then I added the shader to a ShaderMaterial and applied that to a slightly offset and slightly larger SphereGeometry.

<iframe height="300" style="width: 100%;" scrolling="no" title="GitHub Globe Pt.2" src="https://codepen.io/joshsalazar/embed/mdMKQoV?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/joshsalazar/pen/mdMKQoV">
  GitHub Globe Pt.2</a> by Joshua Salazar (<a href="https://codepen.io/joshsalazar">@joshsalazar</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<pre style="background-color: #eee; padding: 15px;">
<code>const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0xeeeeee
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);</code></pre>

Once the atmosphere was set, I wanted to quickly recreate the dots for the land. Instead of rendering an individual mesh for each dot and calculating the spherical offset position, I ended up applying a transparent texture to another, slightly larger, sphere. On GitHub's globe I noticed the dots glow even in the shadowed regions of earth. To mimic this I made the texture ignore light and shadow.

Finally, I wrote a script to get the mouse movement within the canvas while the mouse button is pressed. I took the difference of movement on the x axis to calculate the rotation of the sphere on its global y axis. GitHub's globe allows for rotation on the x and y axis and has some smoothing applied, but I had to move along after getting just the x axis working.

