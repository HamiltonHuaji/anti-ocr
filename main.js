    function $(id) {
        return document.getElementById(id);
    }
    function textToImg() {
        var len = $('len').value || 30;
        var i = 0;
        var fontSize = $('fontSize').value || 15;
        var fontWeight = $('fontWeight').value || 'normal';
        var txt = $("txt").value;
        var canvas = $('canvas');
        if (txt == '') {
            alert('請輸入文字');
            $("txt").focus();
        }
        if (len > txt.length) {
            len = txt.length;
        }
        canvas.width = fontSize * len + 20;
        canvas.height = fontSize * (3 / 2)
                * (Math.ceil(txt.length / len)) + txt.split("\n").length * fontSize;
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = $("backcolor").innerHTML;
        context.fillRect(0,0,canvas.width,canvas.height);
        context.fillStyle = $("fontcolor").innerHTML;
        context.strokeStyle = $("fontcolor").innerHTML;
        
	n = txt.length/4;
        n2 = Math.pow(txt.length,1.5)*1.5;
        for (var i = 0; i < n2; i++) {
            x = random(0,canvas.width);
            y = random(0,canvas.height);
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x+random(-4,4), y+random(-4,4));//隨機畫點
            context.closePath();
            context.stroke();
        }
        for (var i = 0; i < n; i++) {
            x = random(0,canvas.width);
            y = random(0,canvas.height);
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x+random(-10,10), y+random(-10,10));//隨機畫點
            context.closePath();
            context.stroke();
        }
        for (var i = 0; i < n/1.2; i++) {
            x = random(0,canvas.width);
            y = random(0,canvas.height);
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x+random(-30,30), y+random(-30,30));//隨機畫點
            context.closePath();
            context.stroke();
        }
        for (var i = 0; i < n/4; i++) {
            x = random(0,canvas.width);
            y = random(0,canvas.height);
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x+random(-40,40), y+random(-40,40));//隨機畫點
            context.closePath();
            context.stroke();
        }
        // i = 0;
        // for (var i = 0; i < n; i++) {
        //     x = random(0,canvas.width);
        //     y = random(0,canvas.height);
        //     context.lineWidth = 1;
        //     context.beginPath();
        //     context.moveTo(x, y);
        //     context.lineTo(x+random(-random(0,canvas.width/3),random(0,canvas.width/3)), y+random(-random(0,canvas.width/3),random(0,canvas.width/3)));//隨機畫線
        //     context.closePath();
        //     context.stroke();
        // }
        // i = 0;
        // for (var i = 0; i < n; i++) {
        //     x = random(0, canvas.width);
        //     y = random(0, canvas.height);
        //     context.linewidth = 1;
        //     context.beginpath();
        //     context.moveto(x, y);
        //     context.lineto(x + random(-random(0, 20), random(0, 20)), y + random(-random(0, 20), random(0, 20)));//隨機畫線
        //     context.closepath();
        //     context.stroke();
        // }
        i = 0;

        context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
        context.textBaseline = 'top';
        canvas.style.display = 'none';
        function fillTxt(text) {
            while (text.length > len) {
                var txtLine = text.substring(0, len);
                text = text.substring(len);
                var r = random(-1,1)/random(50,100);
                context.rotate(r);//隨機旋轉每一行文字
                context.fillText(txtLine, 10, 5 + fontSize * (3 / 2) * i++,
                        canvas.width);
                context.rotate(r * -1);
            }
            context.fillText(text, 0, fontSize * (3 / 2) * i, canvas.width);
        }
        var txtArray = txt.split("\n");
        for ( var j = 0; j < txtArray.length; j++) {
            fillTxt(txtArray[j]);
            context.fillText('\n', 0, fontSize * (3 / 2) * i++, canvas.width);
        }
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        var i = 0;
        for (var y = 0; y < canvas.height; y++){
            for (var x = 0; x < canvas.width; x++)
            {
                var alpha=random(150,255)/200;
                var beta=random(150,255)/200;
                var gamma=random(150,255)/200;
                pixels[i++] *= alpha;
                pixels[i++] *= beta;
                pixels[i++] *= gamma;
                // pixels[i++] = Math.sqrt(random(200*200,255*255));
                pixels[i++] = 255;
            }
        }
        context.putImageData(imageData, 0, 0);
        var img = $("img");
        img.src = canvas.toDataURL("image/png");
    }
    function changeColor(name) {
        var c = $(name+"_c");
        var ctx = c.getContext("2d");
        var red = $(name+"_red");
        var green = $(name+"_green");
        var blue = $(name+"_blue");
        ctx.fillStyle = "rgb(" + red.value + "," + green.value + ","
                + blue.value + ")";
        $(name).innerHTML = ctx.fillStyle;
        ctx.fillRect(0, 0, 100, 100);
        //$('canvas').getContext('2d').fillStyle=$("fontcolor").innerHTML;
    }
    function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
    }
