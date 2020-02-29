const createHtmlFromItem = (item) => {
    return `<p>${item.title}</p>
        <div>
        <b>${item.price.value} ${item.price.currency}</b>
        </div>
        <img width=500 src='${item.image.imageUrl}'/>
        <img width=500 src='${item.additionalImages[0].imageUrl}'/>
        <img width=500 src='${item.additionalImages[1].imageUrl}'/>
        <img width=500 src='${item.additionalImages[2].imageUrl}'/>`
}

module.exports = { createHtmlFromItem }
