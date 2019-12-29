//Book Constructor
function Book(title,author,isbn)
{
    this.author=author;
    this.title=title;
    this.isbn=isbn;
}
//UI COnstructor
function UI()
{}
//Add book to list
UI.prototype.addBookToList=function(book)
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
//clear fields
UI.prototype.clearFields=function()
{
    document.getElementById("title").value="";
    document.getElementById("author").value="";
    document.getElementById("isbn").value="";
    
}  
//show alert
UI.prototype.showAlert=function(message,className)
{
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
//delete book
UI.prototype.deleteBook=function(target)
{
    if(target.className==="delete")
    {
        target.parentElement.parentElement.remove(); 
    }
}
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
    //show alert
    ui.showAlert("Book Removed","success");
    event.preventDefault();
})