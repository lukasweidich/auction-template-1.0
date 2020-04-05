const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const mapItemsFromSellerToComboboxFormat = (sellersItems) => {
    let arr = [];
    sellersItems.forEach(item =>
        arr.push({ "value": item["itemId"]["_text"], "text": item["title"]["_text"] })
    );
    return arr;
}

export default { copyToClipboard, mapItemsFromSellerToComboboxFormat }
