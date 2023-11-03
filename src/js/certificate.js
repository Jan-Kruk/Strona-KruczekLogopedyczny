const certificateItem = document.querySelectorAll('.certificate-item')

    certificateItem.forEach((item) => {
        item.addEventListener("mouseover", () => {
        const nextItem = item.nextElementSibling;
        if(nextItem) {
            nextItem.classList.remove("timeline-cetrificate-nonvisible")
    }})})
    certificateItem.forEach((item) => {
        item.addEventListener("mouseout", () => {
        const nextItem = item.nextElementSibling;
        if(nextItem) {
            nextItem.classList.add("timeline-cetrificate-nonvisible")
    }})})



