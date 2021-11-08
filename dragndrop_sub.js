let dragArea=document.querySelector(".drag_area");
let dragSub=document.querySelector(".drag_area_sub");
let dargText=document.querySelector(".header");
let dargText_sub=document.querySelector(".header_sub");

let button=document.querySelector('.button');
let button_sub=document.querySelector('.button_sub');
let input =document.getElementById("file");
let input_sub =document.getElementById("file_sub");

let file;

button.onclick=()=>{
    input.click();
};
button_sub.onclick=()=>{
    input_sub.click();
};
//브라우저에서 선택
input.addEventListener('change',function(){
    file=this.files[0];
    dragArea.classList.add('active')
    displayFile();
})
input_sub.addEventListener('change',function(){
    file=this.files[0];
    dragSub.classList.add('active')
    displayFile_sub();
})

//파일이 드래그박스 안에 있을때
dragArea.addEventListener('dragover',(event)=>{
    event.preventDefault();
    dargText.textContent='Realease to Upload'
    dragArea.classList.add('active');
})
dragSub.addEventListener('dragover',(event)=>{
    event.preventDefault();
    dargText_sub.textContent='Realease to Upload'
    dragSub.classList.add('active');
})
//파일이 드래그 박스밖으로 갈때
dragArea.addEventListener('dragleave',(event)=>{
    dargText.textContent='Drag & Drop'
    dragArea.classList.remove('active');
})
dragSub.addEventListener('dragleave',(event)=>{
    dargText_sub.textContent='Drag & Drop'
    dragSub.classList.remove('active');
})

//파일이 드래그박스에 들어갔을때
dragArea.addEventListener('drop',(event)=>{
    event.preventDefault();
    file=event.dataTransfer.files[0];
    displayFile();
});
dragSub.addEventListener('drop',(event)=>{
    event.preventDefault();
    file=event.dataTransfer.files[0];
    displayFile_sub();
});

//비디오 출력
function displayFile(){
    const fileType=file.type;
    let validExtensions=['video/webm','video/mp4','video/mkv','video/*','video/x-m4v']
    if(validExtensions.includes(fileType)){//파일이 드래그 드롭 됐을때
        const inputFile = document.getElementById("file");
        const video = document.getElementById("video");
        const videourl = URL.createObjectURL(file);
        video.setAttribute("src", videourl);
        video.load();
        //video.play();
        
        let fileReader=new FileReader();
        fileReader.onload=()=>{
            let fileURL=fileReader.result;
        };
        fileReader.readAsDataURL(file);
        dargText.textContent=file.name
        video.style.display = "block";
    }
    else{
        alert("파일 확장자를 확인하세요!")
        dragArea.classList.remove('active')
    }
}
//자막 출력
function displayFile_sub(){
    const fileType=file.type;
    let validExtensions=['text/plain','text/*']
    //console.log(fileType)
    if(validExtensions.includes(fileType)){//파일이 드래그 드롭 됐을때
        var input = document.createElement("input");
            processFile(file);
        input.click();
    }
    else{
        console.log("자막파일 확장자를 확인하세요!")
        dragSub.classList.remove('active')
    }
}
function processFile(file) {
    var reader = new FileReader();
    dargText_sub.textContent=file.name
    reader.onload = function () {
        reader.result=reader.result.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        output.innerHTML = reader.result;
        output.style.height = "1px";
        output.style.height = (12 + output.scrollHeight) + "px";
    };
    reader.readAsText(file,"euc-kr");
}