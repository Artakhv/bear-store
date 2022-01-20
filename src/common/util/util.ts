export function toValidDateForRequest(date: string) {
    let validDate = new Date(date);
    return `${validDate.getMonth() + 1}-${validDate.getFullYear()}`
}