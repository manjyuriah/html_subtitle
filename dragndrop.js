const dragArea=document.querySelector(".drag_area");
const dargText=document.querySelector(".header");

let button=document.querySelector('.button');
let input =document.getElementById("file");
let file;

button.onclick=()=>{
    input.click();
};
//브라우저에서 선택
input.addEventListener('change',function(){
    file=this.files[0];
    dragArea.classList.add('active')
    displayFile();
})


//파일이 드래그박스 안에 있을때
dragArea.addEventListener('dragover',(event)=>{
    event.preventDefault();
    dargText.textContent='Realease to Upload'
    dragArea.classList.add('active');
})
//파일이 드래그 박스밖으로 갈때
dragArea.addEventListener('dragleave',(event)=>{
    dargText.textContent='Drag & Drop'
    dragArea.classList.remove('active');

})

//파일이 드래그박스에 들어갔을때
dragArea.addEventListener('drop',(event)=>{
    event.preventDefault();
    file=event.dataTransfer.files[0];
    displayFile();

});

function displayFile(){
    let fileType=file.type;
    let validExtensions=['video/webm','video/mp4','video/mkv','video/*','video/x-m4v']
    if(validExtensions.includes(fileType)){//파일이 드래그 드롭 됐을때

        const inputFile = document.getElementById("file");
        const video = document.getElementById("video");
        //const file = inputFile.files[0];
        const videourl = URL.createObjectURL(file);
        video.setAttribute("src", videourl);
        video.play();

        let fileReader=new FileReader();
        fileReader.onload=()=>{
            let fileURL=fileReader.result;
        };
        fileReader.readAsDataURL(file);
        video.style.display = 'block';
    }
    else{
        alert("파일 확장자를 확인하세요!")
        dragArea.classList.remove('active')
    }
}