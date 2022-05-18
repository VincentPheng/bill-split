export function saveTable(data, payees) {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem('payees', JSON.stringify(payees));
}

export function saveTotal(total) {
    localStorage.setItem("total", JSON.stringify(total));
}