<script lang="ts">
	import {
		DoubleSide,
		ExtrudeGeometry,
		Group,
		Mesh,
		MeshToonMaterial,
		PlaneGeometry,
		Scene
	} from 'three'
	import 'src/SVGLoader'
	export let scene: Scene

	const ground = new Mesh(new PlaneGeometry(20, 20, 1, 1), new MeshToonMaterial({ color: 'green' }))
	ground.receiveShadow = true
	ground.rotateX(-Math.PI / 2)
	ground.position.set(1, -1, 1)
	scene.add(ground)

	new SVGLoader().load('./svg/grass.svg', (data) => {
		const paths = data.paths
		const fullGroup = new Group()
		const group = new Group()

		for (let i = 0; i < paths.length; i++) {
			const path = paths[i]

			const material = new MeshToonMaterial({
				color: path.color,
				side: DoubleSide
			})

			const shapes = SVGLoader.createShapes(path)

			let depth = 0.05

			for (let j = 0; j < shapes.length; j++) {
				const shape = shapes[j]
				const geometry = new ExtrudeGeometry(shape, {
					steps: 2,
					depth,
					bevelEnabled: false
				})

				const mesh = new Mesh(geometry, material)
				mesh.position.z -= depth / 2

				group.add(mesh)
			}
		}
		group.rotateX(Math.PI)
		group.position.set(1, -1, 1)
		const other = group.clone()
		other.rotateY(Math.PI / 2)

		fullGroup.add(group, other)

		scene.add(fullGroup)

		for (let i = 0; i < 500; i++) {
			const n = fullGroup.clone()
			n.position.set(Math.random() * 20 - 10, 0, Math.random() * 20 - 10)
			n.rotateY(Math.random() * Math.PI * 2)
			scene.add(n)
		}
	})
</script>
