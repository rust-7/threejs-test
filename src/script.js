import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading Textures
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug Panel
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7 //En gros c'est la brilance du "material"
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color('skyblue')

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
const light1 = gui.addFolder('Light 1')
scene.add(pointLight)

const pointLight1 = new THREE.PointLight(0xff0000, 2)
pointLight1.position.set(-1.86, 1, -1.65)
pointLight1.intensity = 10
scene.add(pointLight1)


// --- Light Spot : 1 --- 
light1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01)


const light1Color = {
    color: 0xff000
}

light1.addColor(light1Color, 'color').onChange(() => {
    pointLight1.color.set(light1Color.color)
})

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1)
// scene.add(pointLightHelper1)


// --- Light Spot : 2 --- 
const pointLight2 = new THREE.PointLight(0x0000ff, 2)
pointLight2.position.set(1.99, -3, -1.98)
pointLight2.intensity = 3.8

const light2 = gui.addFolder('Light 2')

scene.add(pointLight2)

light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff000
}

light2.addColor(light2Color, 'color').onChange(() => {
    pointLight2.color.set(light2Color.color)
})

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)


// OPTIONNAL : --- Light Spot : 3 --- 
// const pointLight3 = new THREE.PointLight(0xff0000, 2)
// pointLight3.position.set(-1.86, 1, -1.65)
// pointLight3.intensity = 10
// const light3 = gui.addFolder('Light 3')
// scene.add(pointLight3)

// light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// const light3Color = {
//     color: 0xff000
// }

// light3.addColor(light3Color, 'color').onChange(() => {
//     pointLight3.color.set(light3Color.color)
// })

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Animate
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove (event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .01
    targetY = mouseY * .01
    
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += .09 * (targetY - sphere.rotation.x)
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()