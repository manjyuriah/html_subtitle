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

        new_cc: function() { 
            //자막 시간 숫자 확인
            let start1=document.getElementById("start1").value;
            let start2=document.getElementById("start2").value;
            let end1=document.getElementById("end1").value;
            let end2=document.getElementById("end2").value;
        if(isNaN(start1)==true||isNaN(start2)==true||isNaN(end1)==true||isNaN(end2)==true){
                alert("자막 출력 시간은 숫자만 입력하세요!")
        }
        else if(start1+start2>end1+end2){
                 alert("자막 시작시간과 끝나는 시간을 확인해 주세요!")
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
            document.querySelector("#save").href=trackUrl;
            
        },
        
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
        },
        
        delItem: function (task) {//자막 삭제
                this.tasks.splice(this.tasks.indexOf(task), 1)
        }
    }
});