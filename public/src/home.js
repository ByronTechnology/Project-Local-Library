function findingAuthorsById(authors, id) {
  return authors.find((author)=>id===author.id)
}

function getTotalBooksCount(books) {
return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const booksOut  = books.filter(book=>book.borrows[0].returned===false) 
  return booksOut.length
}

function getMostCommonGenres(books) {
  const topGenres = books.reduce((acc, bookGenre)=>{
     if(!acc[bookGenre.genre]){
      acc[bookGenre.genre] = 1
     }else{
      acc[bookGenre.genre] = acc[bookGenre.genre]+1
     }
     return acc;
    },{})

   return Object.keys(topGenres).reduce((acc,genre)=>{
     acc.push({
       name: genre,
       count: topGenres[genre]
     })
     return acc
   }, []).sort((first, second)=>first.count<second.count?1:-1).slice(0,5)
}

function getMostPopularBooks(books) {
  return books.reduce((acc,book)=>{
    acc.push({name:book.title,count:book.borrows.length})
    return acc
  },[]).sort((book1,book2)=>book1.count<book2.count?1:-1).slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  return books.reduce((acc,book)=>{
    const bookAuthor = findingAuthorsById(authors, book.authorId);
    const authorName = `${bookAuthor.name.first} ${bookAuthor.name.last}`;
    bookAuthor['count']=books.reduce((bAcc,book)=>{
      if(book.authorId===bookAuthor.id)bAcc+=book.borrows.length;
      return bAcc;
    },0)
    if(!acc.some(temp=>temp.name===authorName)){acc.push({name:authorName, count: bookAuthor.count})};
    return acc;
  },[]).sort((author1,author2)=>author1.count<author2.count?1:-1).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
