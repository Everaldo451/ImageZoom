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

    calculateTranslatePercent(zoom, percent) {
        const axisZoom = (zoom-1)*50
        const radianos = percent * Math.PI
        console.log(axisZoom)
        console.log(radianos)
        const cosseno = Math.cos(radianos)

        const translatePercent = cosseno*axisZoom
        return translatePercent
    }

    onImageMouseMoveMaker() {
        const calculateTranslatePercent = this.calculateTranslatePercent
        const zoom = this.zoom
        return (e) => {
            const image = e.currentTarget
            const imagemWidth = image.clientWidth
            const imagemHeight = image.clientHeight
            const widthPercent = e.offsetX/imagemWidth
            const heightPercent = e.offsetY/imagemHeight
            const widthTranslatePercent = calculateTranslatePercent(zoom, widthPercent)
            const heightTranslatePercent = calculateTranslatePercent(zoom, heightPercent)
            image.style.transform = `translate(${(widthTranslatePercent)}%, ${(heightTranslatePercent)}%) scale(${zoom})`
        }
    }

    onImageMouseLeaveMaker() {

        return (e) => {
            const image = e.currentTarget
            image.style.transform = "none"
        }
    }

    render(parentElement) {
        const imagemContainer = document.createElement("div")
        imagemContainer.style.overflow = "hidden"
        const imagem = this.createImage()

        imagem.addEventListener("mousemove", this.onImageMouseMoveMaker())
        imagem.addEventListener("mouseleave", this.onImageMouseLeaveMaker())

        imagemContainer.appendChild(imagem)
        parentElement.appendChild(imagemContainer)
    }
}