
function findAuthorById(authors, id) {
  return authors.find((author)=>id===author.id)
}

function findBookById(books, id) {
  return books.find(book=>id==book.id)
}

function partitionBooksByBorrowedStatus(books) {
 return books.reduce((acc, book)=>{
   const [borrowed, returned]= acc
   const recent = book.borrows[0]
   if(recent.returned){
     returned.push(book)
   }else{
     borrowed.push(book)
   }
   return acc
 },[[],[]])
}

function getBorrowersForBook(book, accounts) {
  const {borrows}=book;

  return borrows.reduce((acc,borrow)=>{
    if(!acc.some(ids=>ids.id==borrow.id))acc.push({id:borrow['id'], returned : borrow['returned']});
    return acc;
  },[]).reduce((acc,accId)=>{
    const temp = accounts.find(account=>account.id===accId.id);
    temp.returned = accId.returned;
    acc.push(temp);
    return acc;
    },[])
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
