  const Graph = ForceGraph3D()
    (document.getElementById('3d-graph'))
        .jsonUrl('assets/friends.json')
        .nodeLabel('id')
        .nodeAutoColorBy('group')
        .linkDirectionalParticles("value")
        .linkDirectionalParticleSpeed(d => d.value * 0.001);
