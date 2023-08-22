const icons = document.querySelectorAll(".backgroundIcon")
const homeSection = document.getElementById("homeSection")

document.addEventListener("mousemove", parallax)

icons.forEach(icon => {
    icon.addEventListener("mousemove", animateIcon)
    icon.addEventListener("mouseleave", animateIcon)
})

function animateIcon(e) {
    const icon = this
    const { offsetX: x, offsetY: y } = e
    const { offsetWidth: width, offsetHeight: height } = icon

    const move = 50
    const xMove = (x / width) * (move * 2)
    const yMove = (y / height) * (move * 2)

    const scaleValue = 1.3

    icon.style.transform = `translate(${xMove}px, ${yMove}px) scale(${scaleValue})`

    if (e.type === "mouseleave") {
        setTimeout(() => {
            icon.style = ""
        }, 1000)
    } 
}

function parallax(e) {
    const mouseX = e.clientX
    const mouseY = e.clientY

    if (isCursorInElement(mouseX, mouseY, homeSection)) {
        icons.forEach((icon) => {
            const speed = parseFloat(icon.getAttribute("data-speed"))
            const x = (window.innerWidth - mouseX * speed) / 80
            const y = (window.innerHeight - mouseY * speed) / 80

            icon.style.setProperty("--parallax-translate-x", `${x}px`)
            icon.style.setProperty("--parallax-translate-y", `${y}px`)
        })
    } else {
        icons.forEach((icon) => {
            icon.style.setProperty("--parallax-translate-x", "0px")
            icon.style.setProperty("--parallax-translate-y", "0px")
        })
    }
}

function isCursorInElement(x, y, element) {
    const rect = element.getBoundingClientRect()
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}