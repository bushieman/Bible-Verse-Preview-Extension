export default function beautifyText(book) {
     // Split the reference into book + chapter:verse
  const [bookPart, ...rest] = book.split(" ");
  const remainder = rest.join(" ");

  let formatted;
    switch (bookPart) {
        case '1':
            formatted = '1ˢᵗ';
            break;
        case '2':
            formatted = '2ⁿᵈ';
            break;
        case '3':
            formatted = '3ʳᵈ';
            break;
        default:
            formatted = bookPart;
    } 
    return formatted + ' ' + remainder;
}
