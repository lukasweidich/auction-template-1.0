const createHtmlFromItem = (item) => {
    return `<p>${item.title}</p>
        <div>
        <b>${item.price.value} ${item.price.currency}</b>
        </div>
        <img width=500 src='${item.image.imageUrl}'/>`
}

module.exports = { createHtmlFromItem }