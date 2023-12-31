const icons = document.querySelectorAll(".backgroundIcon")
const homeSection = document.getElementById("homeSection")
const disableParallaxBtn = document.getElementById("disableParallaxBtn")
const parallaxStateMessage = document.getElementById("parallaxStateMessage")
const h2TxtContent = document.getElementById("h2TxtContent")

let disableParallaxBtnClicked = false

disableParallaxBtn.innerHTML = "disable Parallax"
h2TxtContent.innerHTML = "backgroud parallax effect"

document.addEventListener("mousemove", parallax)

disableParallaxBtn.addEventListener("click", function() {
    disableParallaxBtnClicked = !disableParallaxBtnClicked

    if (disableParallaxBtnClicked) {
        disableParallaxBtn.innerHTML = "enable Parallax"
        parallaxStateMessage.innerHTML = "the parallax effect is disabled !"
        h2TxtContent.innerHTML = 'Background parallax effect = "Off"'
    } else {
        disableParallaxBtn.innerHTML = "disable Parallax"
        parallaxStateMessage.innerHTML = "the parallax effect is activated !"
        h2TxtContent.innerHTML = 'Background parallax effect = "On"'
    }

    setTimeout(() => {
        parallaxStateMessage.innerHTML = ""
    }, 5000)
})

icons.forEach(icon => {
    icon.addEventListener("mouseenter", animateIcon)
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

    if (disableParallaxBtnClicked === true) {
        return
    } else {
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
}

function isCursorInElement(x, y, element) {
    const rect = element.getBoundingClientRect()
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}