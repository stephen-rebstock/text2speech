chrome.commands.onCommand.addListener(function(command) {
    if (command === "activate_text_to_speech") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: generateSpeech
        });
      });
    }
  });


  async function generateSpeech() {

  async function playSpeech(text) {
    const OPENAI_API_KEY= "sk-<YOUR_API KEY>";
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: "alloy",
        speed: 1.5,
        response_format: "mp3"
      })
    });
  
    if (!response.ok) {
      alert("Speech generation failed:", response.statusText);
      return;
    }
  
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = function() {
      alert("Audio playback finished");
    };
    await audio.play().catch(error => {
      alert("Error playing audio:", error);
    });
  }// Resolve the promise when audio playback is finished.
    


    let text = window.getSelection().toString();
    
    if (!text) {
      alert("No text selected.");
      return;
    }
    await playSpeech(text); 
    
  }
  
