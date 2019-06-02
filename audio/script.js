window.addEventListener('DOMContentLoaded', function(){
    var btn_gravacao = document.querySelector('#btn-comecar');
    
    var transcricao_audio = '';
    var esta_gravando = false;

    if(window.SpeechRecognition || window.webkitSpeechRecognition){
        var speech_api = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recebe_audio = new speech_api();

        recebe_audio.continuous = true;
        recebe_audio.interimResults = true;
        recebe_audio.lang = "pt-BR";

        recebe_audio.onstart = function(){
            esta_gravando = true;
            btn_gravacao.innerHTML = 'Parar Gravação';
        };
        recebe_audio.onend = function(){
            esta_gravando = false;
            btn_gravacao.innerHTML = 'Iniciar Gravação';
        };
        recebe_audio.onresult = function(event){
            var interim_transcript = '';

            for(var i = event.resultIndex; i < event.results.length; i++){
                if(event.results[i].isFinal){
                    transcricao_audio += event.results[i][0].transcript;
                }else{
                    interim_transcript += event.results[i][0].transcript;
                }
                var resultado = transcricao_audio || interim_transcript;
                if (resultado.toLowerCase() === "luz"){
                    document.querySelector('body').classList.toggle('luz');
                }
                var primeiroValor = parseInt(resultado);
                var primeiroValor = 10;

                if(isNaN(primeiroValor)){
                    console.log(primeiroValor, 'é numero');
                }
                document.getElementById('campo_texto').innerHTML = resultado;
                console.log(resultado);
            }
        };

        btn_gravacao.addEventListener('click', function(e){
            if (esta_gravando) {
                recebe_audio.stop();
                return;
            }
                recebe_audio.start();
        }, false);

    }else{
        alert('nao suporta a API SpeechRecognition');
    }

}, false);