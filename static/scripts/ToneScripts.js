let isPlaying = false;
let meter = new Tone.Meter("level");
let fft = new Tone.Analyser("fft", 32);
let waveform = new Tone.Analyser("waveform", 32);

let audioSrc = "https://jgilliam.com/documents/toro.mp3";
let player = new Tone.Player({
    playbackRate: 1,
    loop: false,
    autostart: false,
    reverse: false
}).connect(meter).fan(fft, waveform).toMaster();

function playSound() {

    if (!isPlaying) {
        isPlaying = true;
        player.load(audioSrc,
            function() {
                player.start();
                setTimeout(function() { playSound(audioSrc) }, player.buffer.duration * 1000);
                loop();
            });
    }
    else {
        isPlaying = false;
        player.stop();
    }
}

// // Fft Functions
// function getFftValues() {
//     console.log(fft.getValue());
// }

// function printFftValue() {
//     document.getElementById("FftValue").innerHTML = getFftValues();
// }

// // Waveform Functions
// function getWaveformValues() {
//     console.log(waveform.getValue());
// }

// function printWaveFormValue() {
//     document.getElementById("WaveformValue").innerHTML = getWaveFormValues();
// }

// Meter Functions
function getMeterValue() {
    let meterValue = Math.abs(meter.getValue() * 1000);
    console.log(meterValue);
    return meterValue;
}

let lastValue = 1;
function animateMeterValue() {
    let widthValue = getMeterValue();
    // widthValue = (widthValue - lastValue)/10;

    console.log(getMeterValue())
    anime({
        targets: '.meterAnimation',
        // scale: getValues(),
        // borderRadius: ['0%', getValues()],
        width: widthValue,
        easing: 'steps(10)',
        duration: 175
    });

    lastValue = widthValue;
}

function loop() {
    requestAnimationFrame(loop);
    animateMeterValue();
}