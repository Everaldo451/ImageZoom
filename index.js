class ImageZoom {

    constructor(src, zoom) {
        this.src = src
        this.zoom = zoom
    }

    createImage() {
        const image = document.createElement("img")
        image.src = this.src
        image.style.width = "100%"
        image.style.height = "100%"
        image.style.objectFit = "cover"
        image.style.objectPosition = "center"
        image.style.transition = "all 0.2s"
        return image
    }

    calculateTranslatePercent(zoom, axisPercent) {
        const halfAxisZoom = (zoom-1)*50
        const radians = axisPercent * Math.PI
        const translatePercent = Math.cos(radians)*halfAxisZoom
        return translatePercent
    }

    createImageMouseMoveListener() {
        const calculateTranslatePercent = this.calculateTranslatePercent
        const zoom = this.zoom
        return (e) => {
            const image = e.currentTarget
            const translatePercentXAxis = calculateTranslatePercent(zoom, e.offsetX/image.clientWidth)
            const translatePercentYAxis = calculateTranslatePercent(zoom, e.offsetY/image.clientHeight)
            image.style.transform = `translate(${(translatePercentXAxis)}%, ${(translatePercentYAxis)}%) scale(${zoom})`
        }
    }

    createImageMouseLeaveListener() {

        return (e) => {
            const image = e.currentTarget
            image.style.transform = "none"
        }
    }

    render(parentElement) {
        const imageContainer = document.createElement("div")
        imageContainer.style.overflow = "hidden"
        const image = this.createImage()

        image.addEventListener("mousemove", this.createImageMouseMoveListener())
        image.addEventListener("mouseleave", this.createImageMouseLeaveListener())

        imageContainer.appendChild(image)
        parentElement.appendChild(imageContainer)
    }
}