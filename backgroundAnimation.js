const icons = document.querySelectorAll(".backgroundIcon")

document.addEventListener("mousemove", parallax)

const animateIcon = function(e) {
    const icon = this
    const { offsetX: x, offsetY: y } = e
    const { offsetWidth: width, offsetHeight: height } = icon

    const move = 50
    const xMove = (x / width) * ((move * 2) - move)
    const yMove = (y / height) * ((move * 2) - move)

    const scaleValue = 1.3
    const resetScaleValue = 1

    icon.style.transform = `translate(${xMove}px, ${yMove}px) scale(${scaleValue})`

    if (e.type === "mouseleave") {
        icon.style.transform = `translate(${xMove}px, ${yMove}px) scale(${resetScaleValue})`
    }
}

function parallax(e) {
    const mouseX = e.clientX
    const mouseY = e.clientY
    
    icons.forEach(icon => {
        const speed = parseFloat(icon.getAttribute("data-speed"))
        const x = (window.innerWidth - mouseX * speed) / 40
        const y = (window.innerHeight - mouseY * speed) / 40
        
        icon.style.setProperty("--parallax-translate-x", `${x}px`)
        icon.style.setProperty("--parallax-translate-y", `${y}px`)
    })
}

icons.forEach(icon => {
    icon.addEventListener("mousemove", animateIcon)
    icon.addEventListener("mouseleave", animateIcon)
})