class ImageZoom {

    constructor(src, zoom) {
        this.src = src
        this.zoom = zoom
    }

    createImage() {
        const image = document.createElement("img")
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
        const imagem = document.createElement("img")

        imagem.addEventListener("mousemove", (e) => {
            const image = e.currentTarget
            const imagemWidth = image.clientWidth
            const imagemHeight = image.clientHeight
            const widthPercent = (e.offsetX/imagemWidth)*100
            const heightPercent = (e.offsetY/imagemHeight)*100
            image.style.transform = `translate(${(50-widthPercent)}%, ${(50-heightPercent)}%) scale(2)`
        })

        imagem.addEventListener("mouseleave", (e) => {
            const image = e.currentTarget
            image.style.transform = "none"
        })

        imagem.src = this.imagemCamisa
        imagemContainer.appendChild(imagem)
        parentElement.appendChild(imagemContainer)
    }
}