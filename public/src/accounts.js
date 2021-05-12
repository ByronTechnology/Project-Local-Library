
function findAccountById(accounts, id) {
  return accounts.find((account)=>id==account["id"]);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2)=> acc1.name.last.toLowerCase()>acc2.name.last.toLowerCase()?1:-1) 
}

function getTotalNumberOfBorrows(account, books) {
 
  return results = books.reduce((acc,book)=>{
    const count = book.borrows.reduce((accBorrow, borrow)=>{
      return borrow.id === account.id?accBorrow+1:accBorrow;
    },0)
    return acc + count;
  },0)
}

function getBooksPossessedByAccount(account, books, authors) {
    const getBooksBorrowing = books.filter((book)=>{
      const writer = authors.find((author)=>author.id===book.authorId);
      book["author"]=writer;
      return book.borrows.some(borrow=>borrow.id==account.id&&borrow.returned == false)
    })
    return getBooksBorrowing
  }

  module.exports = { findAccountById, 
    sortAccountsByLastName, 
    getTotalNumberOfBorrows, 
    getBooksPossessedByAccount, };