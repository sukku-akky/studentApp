let studentCount=0;
const studentCountElement=document.getElementById("studentCount");

function updateStudentCount(){
    studentCountElement.textContent=studentCount;
}
function handleFormSubmit(event){
    event.preventDefault();
    studentCount++;
    const studentDetails={
        name: event.target.studentName.value,
        mobile: event.target.mobile.value,
        address: event.target.address.value

    };
    axios.post("https://crudcrud.com/api/0298f4d35812478b8091de67c1eec495/students",
    studentDetails)
      .then((res)=>{displayStudentOnScreen(res.data);})
      .catch((err)=>{console.log(err);})
      document.getElementById("studentname").value = "";
      document.getElementById("mobile").value = "";
      document.getElementById("address").value = "";
      updateStudentCount();    
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/0298f4d35812478b8091de67c1eec495/students")
      .then((res)=>{
        for(let i=0;i<res.data.length;i++){
            displayStudentOnScreen(res.data[i]);
        }
      })
})

function displayStudentOnScreen(studentDetails){
    const studentItem=document.createElement("li");
    studentItem.appendChild(
        document.createTextNode(
            `${studentDetails.name} - ${studentDetails.mobile} - ${studentDetails.address}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    studentItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    studentItem.appendChild(editBtn);

    const studentList = document.querySelector("ul");
    studentList.appendChild(studentItem);

    deleteBtn.addEventListener("click",function(event){
        if(studentCount>0){
            studentCount--;
        }
        updateStudentCount();
        studentList.removeChild(event.target.parentElement);
        deleteStudent(studentDetails._id);
    });

    editBtn.addEventListener("click",function(event){
        studentList.removeChild(event.target.parentElement);
        document.getElementById("studentname").value=studentDetails.name;
        document.getElementById("mobile").value=studentDetails.mobile;
        document.getElementById("address").value=studentDetails.address;
    });
}

function deleteStudent(studentId){
    axios.delete(`https://crudcrud.com/api/0298f4d35812478b8091de67c1eec495/students/${studentId}`)
     .then((res)=>{ console.log(res)})
     .catch((err)=>{ console.log(err)});
}