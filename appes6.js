class Book{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class UI{
    addBookToList(book)
    {
        
    const list=document.getElementById("book-list");
    //Create tr element
    const row=document.createElement("tr"); 
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
   // console.log(row)
    }
    showAlert(message,className){
        const div=document.createElement("div");
     //Add classes
     div.className=`alert ${className}`;
     //add text
     div.appendChild(document.createTextNode(message));
     //get parent
     const container =document.querySelector(".container");
     //get form
     const form=document.querySelector("#book-form");
     //Insert Alert
      container.insertBefore(div,form);
      //disapper test after 3 sec
      setTimeout(function()
      {
          document.querySelector(".alert").remove();
      },2000);
    }
    deleteBook(target){
        if(target.className==="delete")
        {
        target.parentElement.parentElement.remove(); 
        }
    }
    clearFields(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("isbn").value="";
    }
}
//Local Storgae class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null)books=[];
        else{
            books=JSON.parse(localStorage.getItem("books"))  ;
        }return books;
    }
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach(function(book)
        {
            const ui=new UI();
            //Add book to UI
            ui.addBookToList(book);
        });
    } 
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach(function(book,index)
        {
            if(book.isbn===isbn)
            {
                books.splice(index,1);
            }
            
        });localStorage.setItem("books",JSON.stringify(books));
    }
}
//DOM load Event
document.addEventListener("DOMContentLoaded",Store.displayBooks());
//Event Listener for adding book
document.getElementById('book-form').addEventListener("submit",function(event)
{
    //console.log("test");
    //Get Form Values
    const title=document.getElementById("title").value,
    author=document.getElementById("author").value,
    isbn=document.getElementById("isbn").value;
    //instantiating book
    const book=new Book(title,author,isbn);
    //Instatiate UI object
    const ui =new UI();
    //validate
    if(title==="" || author===""|| isbn==="")
    //error alert
    {ui.showAlert("Please fill in all fields","error");}
    else
    {
    ui.addBookToList(book);
    //Add to local Storage
    Store.addBook(book);  
    //clear fields
    ui.clearFields();
    //sucees message
    ui.showAlert("Successfully added","success");
}
   // console.log(book);
    event.preventDefault();
});
//event listener for delete
document.getElementById("book-list").addEventListener("click",function(event)
{
    const ui=new UI();
    ui.deleteBook(event.target);
     //Remove From LS
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);
    //show alert
    ui.showAlert("Book Removed","success");
    event.preventDefault();
})