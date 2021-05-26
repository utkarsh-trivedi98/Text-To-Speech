//Init SpeechSynth Api
const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate =  document.querySelector('#rate');
const rateValue =  document.querySelector('#rate-value');
const pitch =  document.querySelector('#pitch');
const pitchValue =  document.querySelector('#pitch-value');

//init voices Array
let voices = [];
const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice =>{
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and Languages
    option.textContent = voice.name+ '('+ voice.lang +')';

    //set needed option  attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = getVoices;
}

//Speak
const speak = ()=>{
//check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if(textInput.value !== ''){
    //Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    //speak end
    speakText.onend = e => {
      console.log('Done Speaking...');
    };

    //speak error
    speakText.onerror = e =>{
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // loop through voices
    voices.forEach(voice => {
      if(voice.name === selectedVoice){
        speakText.voice = voice;
      }
    });

    //set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // speaking

    synth.speak(speakText);
  }
};

//Event Listner

// Text form Submit
textForm.addEventListener('submit', e =>{
  e.preventDefault();
  speak();
  textInput.blur();
});

//rate value change

rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// pitch value changes
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// voice select changes
voiceSelect.addEventListener('change', e => speak());
