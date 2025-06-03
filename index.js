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
        return image
    }

    onImageMouseEnter(e) {
        const image = e.currentTarget
        const imagemWidth = image.clientWidth
        const imagemHeight = image.clientHeight
        const widthPercent = (e.offsetX/imagemWidth)*100
        const heightPercent = (e.offsetY/imagemHeight)*100
        const widthTranslatePercent = this.calculateTranslatePercent(widthPercent)
        const heightTranslatePercent = this.calculateTranslatePercent(heightPercent)
        image.style.transform = `translate(${(widthTranslatePercent)}%, ${(50-heightTranslatePercent)}%) scale(${this.zoom})`
    }

    onImageMouseLeave(e) {
        const image = e.currentTarget
        image.style.transform = "none"
    }

    calculateTranslatePercent(percent) {
        const axisZoom = (this.zoom-1)*50
        const translatePercent = (50-percent)*axisZoom/50
        return translatePercent
    }

    render(parentElement) {
        const imagemContainer = document.createElement("div")
        const imagem = this.createImage()

        imagem.addEventListener("mousemove", this.onImageMouseEnter)
        imagem.addEventListener("mouseleave", this.onImageMouseLeave)

        imagemContainer.appendChild(imagem)
        parentElement.appendChild(imagemContainer)
    }
}