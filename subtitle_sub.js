var app=new Vue({
    el:"#root",
    data:{
        tasks:""
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
        new_cc: function() { 
        /*자막 시간 숫자 확인
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
            */
            //data변수에 tasks 배열 이관
            var data=this.tasks
            var dynamicSubtitle=`WEBVTT`

            /*배열 순차적으로 읽고 실시간 적용
            data.map((item)=>{
                dynamicSubtitle=dynamicSubtitle+`\n ${item.start1+":"+item.start2+".000"} --> ${item.end1+":"+item.end2+".000"} \n ${"<v Roger Bingham>" + item.name} \n`
            })*/
        
            //vtt파일로 다운
            const trackBlob=new Blob ([dynamicSubtitle],{
            type:"text/plain;charset=utf=8"
            });
            const trackUrl=URL.createObjectURL(trackBlob);
            document.querySelector("#caption-track").src=trackUrl;
        },
        /*delItem: function (task) {//자막 삭제
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
//vtt변환후 미리보기 출력
function convert() {
    var input = document.getElementById("output");
    var output;
    var srt = input.value;
    var webvtt = srt2webvtt(srt);
  }
  function srt2webvtt(data) {
    // remove dos newlines
    var srt = data.replace(/\r+/g, '');
    srt = srt.replace(/^\s+|\s+$/g, '');
    var cuelist = srt.split('\n\n');
    var result = "";

    if (cuelist.length > 0) {
      result += "WEBVTT\n\n";
      for (var i = 0; i < cuelist.length; i=i+1) {
        result += convertSrtCue(cuelist[i]);
      }
    }
    return result;
  }
  function convertSrtCue(caption) {
    //srt = srt.replace(/<[a-zA-Z\/][^>]*>/g, '');
    var cue = "";
    var s = caption.split(/\n/);
    while (s.length > 3) {
        for (var i = 3; i < s.length; i++) {
            s[2] += "\n" + s[i]
        }
        s.splice(3, s.length - 3);
    }
    var line = 0;
    // detect identifier
    if (!s[0].match(/\d+:\d+:\d+/) && s[1].match(/\d+:\d+:\d+/)) {
      cue += s[0].match(/\w+/) + "\n";
      line += 1;
      console.log(caption)
      console.log(cue)
    //   let vtt=erase(caption,cue)
    //   console.log(vtt)
    }

    // get time strings
    if (s[line].match(/\d+:\d+:\d+/)) {
      // convert time string
      var m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
      if (m) {
        cue += m[1]+":"+m[2]+":"+m[3]+"."+m[4]+" --> "
              +m[5]+":"+m[6]+":"+m[7]+"."+m[8]+"\n";
        line += 1;
        
        var dynamicSubtitle=`WEBVTT`
        const trackBlob=new Blob ([dynamicSubtitle],{
        type:"text/plain;charset=utf=8"
        });
        const trackUrl=URL.createObjectURL(trackBlob);
        document.querySelector("#caption-track").src=trackUrl;
        
      } 
      else {// Unrecognized timestring
        return "";}
    } 
    else {// file format error or comment lines
      return "";}

    // get cue text
    if (s[line]) {
      cue += s[line] + "\n\n";
    }
    return cue;
  }