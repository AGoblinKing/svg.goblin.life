<script lang="ts">
	import { tick } from 'src/state'
	import Stats from 'stats.js'
	import {
		AmbientLight,
		CylinderGeometry,
		DirectionalLight,
		DoubleSide,
		ExtrudeGeometry,
		Group,
		Mesh,
		MeshBasicMaterial,
		MeshToonMaterial,
		PCFSoftShadowMap,
		PerspectiveCamera,
		Scene,
		WebGLRenderer
	} from 'three'

	import 'src/SVGLoader'
	import 'src/OrbitControls'
	import Ground from './game/Ground.svelte'

	let canvas: HTMLCanvasElement

	const scene = new Scene()
	const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
	let renderer
	let controls

	$: {
		if (!renderer && canvas) {
			renderer = new WebGLRenderer({ canvas, antialias: true })
			renderer.shadowMap.enabled = true
			renderer.shadowMap.type = PCFSoftShadowMap // default THREE.PCFShadowMap

			controls = new OrbitControls(camera, renderer.domElement)
			ResizeCanvas()
		}
	}

	const stats = new Stats()
	stats.showPanel(0)
	document.body.appendChild(stats.dom)
	tick.on(() => {
		stats.begin()
		controls?.update()
		renderer?.render(scene, camera)
		stats.end()
	})

	function ResizeCanvas() {
		if (!renderer || !canvas) return

		renderer.setSize(canvas.clientWidth, canvas.clientHeight)
		camera.aspect = canvas.width / canvas.height
		camera.updateProjectionMatrix()
	}

	function Setup() {
		const light = new DirectionalLight(0xffffff, 0.5)
		light.castShadow = true
		light.shadow.mapSize.set(1024 * 4, 1024 * 4)
		light.shadow.camera.bottom = -100
		light.shadow.camera.top = 100
		light.shadow.camera.left = -100
		light.shadow.camera.right = 100
		light.position.set(-100, 100, -100)
		scene.add(light, new AmbientLight(0xffffff, 0.5))

		new SVGLoader().load('./svg/flower.svg', (data) => {
			const paths = data.paths
			const group = new Group()
			const treeGroup = new Group()
			const geometry = new CylinderGeometry(0.1, 0.3, 2, 6)
			const material = new MeshToonMaterial({ color: 'brown' })
			const cube = new Mesh(geometry, material)
			cube.castShadow = true
			treeGroup.add(cube)
			for (let i = 0; i < paths.length; i++) {
				const path = paths[i]

				const material = new MeshToonMaterial({
					color: path.color,
					side: DoubleSide
				})

				const shapes = SVGLoader.createShapes(path)

				let depth = 2
				if (path.color.g === path.color.r) {
					depth = 8
				} else {
					depth *= 1 / path.color.g
				}

				for (let j = 0; j < shapes.length; j++) {
					const shape = shapes[j]
					const geometry = new ExtrudeGeometry(shape, {
						steps: 2,
						depth,
						bevelEnabled: true
					})
					const mesh = new Mesh(geometry, material)
					mesh.position.z -= depth / 2
					mesh.castShadow = true
					group.add(mesh)
				}
			}

			// they're huge
			group.scale.multiplyScalar(0.02)
			group.rotateZ(Math.PI)
			group.position.set(0, 1, 0)

			const groupF = group.clone()
			groupF.position.set(0, 1, -0.5)
			groupF.scale.multiplyScalar(0.75)

			const groupB = groupF.clone()
			groupB.position.set(0, 1, 0.5)

			const group2 = group.clone()
			group2.rotateY(Math.PI / 2)

			const groupL = group2.clone()
			groupL.position.set(-0.5, 1, 0)
			groupL.scale.multiplyScalar(0.75)

			const groupR = groupL.clone()
			groupR.position.set(0.5, 1, 0)

			treeGroup.add(group, group2, groupF, groupB, groupL, groupR)

			scene.add(treeGroup)

			for (let i = 0; i < 20; i++) {
				const n = treeGroup.clone()
				n.position.set(Math.random() * 20 - 10, 0, Math.random() * 20 - 10)
				n.rotateY(Math.random() * Math.PI * 2)
				scene.add(n)
			}
		})

		camera.position.z = 5
	}

	Setup()

	let last = 0
</script>

<canvas bind:this={canvas} />

<Ground {scene} />

<svelte:window
	on:resize={() => {
		const now = Date.now()
		if (now - last > 100) {
			setTimeout(() => ResizeCanvas(), 1)
			last = now
		}
	}}
/>

<style>
	canvas {
		flex: 1;
	}
</style>
