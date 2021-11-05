var app=new Vue({
    el:"#root",
    data:{
        tasks: []
    },
    methods:{
        // 비디오 업로드
        uploadVideo: function(){
            const inputFile = document.getElementById("file");
            const video = document.getElementById("video");
            const file = inputFile.files[0];
            const videourl = URL.createObjectURL(file);
            video.setAttribute("src", videourl);
            video.play();
        },
        uploadSrt(){
            const inputFile = document.getElementById("file_sub");
            const srt = document.getElementById("srt");
            const file = inputFile.files[0];
            const srturl = URL.createObjectURL(file);
            srt.setAttribute("src", srturl);
        },
        /*new_cc: function() { 
            //자막 시간 숫자 확인
            let start1=document.getElementById("start1").value;
            let start2=document.getElementById("start2").value;
            let end1=document.getElementById("end1").value;
            let end2=document.getElementById("end2").value;
        if(start1==""|| start2==""||end1==""||end2==""){//미입력시
            alert("모든조건을 입력해주세요!")
        }      
        else if(isNaN(start1)==true||isNaN(start2)==true||isNaN(end1)==true||isNaN(end2)==true){//숫자만 입력
            alert("자막 출력 시간은 숫자만 입력하세요!")
        }
        else if(start1+start2>end1+end2 || start1>=60|| start2>=60||end1>=60||end2>=60){//시작시간 < 끝시간 조건
                 alert("자막 시작시간과 끝나는 시간을 확인해 주세요!")
        }
        else if(start1.length<2||start2.length<2||end1.length<2||end2.length<2){//숫자 입력 2자리로
            console.log(start1.length,start2.length,end1.length,end2.length)
            alert("자막 시간을 두자리로 입력하세요!")
        }
        else if (!this.tasks.name && !this.tasks.start && !this.tasks.end) {
                 return
        }
        else{
            //자동 배열 추가
            this.tasks.push ( {
                name: this.tasks.name,
                start1: this.tasks.start1,
                start2: this.tasks.start2,
                end1: this.tasks.end1,
                end2: this.tasks.end2,
                del: ''
            });

            //추가 후 입력창 값 비우기
            this.tasks.name = "";this.tasks.start1 = "";this.tasks.start2 = "";
            this.tasks.end1 = "";this.tasks.end2 = "";

            //data변수에 tasks 배열 이관
            var data=this.tasks
            var dynamicSubtitle=`WEBVTT`

            //배열 순차적으로 읽고 실시간 적용
            data.map((item)=>{
                dynamicSubtitle=dynamicSubtitle+`\n ${item.start1+":"+item.start2+".000"} --> ${item.end1+":"+item.end2+".000"} \n ${"<v Roger Bingham>" + item.name} \n`
            })
        }
            //vtt파일로 다운
            const trackBlob=new Blob ([dynamicSubtitle],{
            type:"text/plain;charset=utf=8"
            });
            const trackUrl=URL.createObjectURL(trackBlob);
            document.querySelector("#caption-track").src=trackUrl;
        },
        delItem: function (task) {//자막 삭제
                this.tasks.splice(this.tasks.indexOf(task), 1)
        }*/
        server:function(){//srt파일로 변환 및 저장
            var data=this.tasks
            var dynamicSubtitle="";
            data.map((item,index)=>{
               dynamicSubtitle = dynamicSubtitle + `${index+1}\n ${"00:"+item.start1+":"+item.start2+",000"} --> ${"00:"+item.end1+":"+item.end2+",000"} \n ${ item.name} \n\n`
            })
            //srt파일로 다운
            const trackBlob=new Blob ([dynamicSubtitle],{
            type:"text/plain;charset=utf-8"
            });
            const trackUrl=URL.createObjectURL(trackBlob);
            document.querySelector("#caption-track").src=trackUrl;
            document.querySelector("#save").href=trackUrl;
        }
    }
});
// function uploadSrt() {
//     var input = document.createElement("input");
//     input.type = "file";
//     input.accept = "text/plain,.srt,.txt"; 
//     input.onchange = function (event) {
//         processFile(event.target.files[0]);

//     };
//     //input.click();
// }
// function processFile(file) {
//     var reader = new FileReader();
//     dargText_sub.textContent=file.name
//     reader.onload = function () {
//         output.innerText = reader.result;
//     };
//     reader.readAsText(file,"euc-kr");
    
// }
