//Helper function to configure styling in the stylesheet
let configureStylesheet = () => {
    if(settings.styling !== undefined) {
      //Set configured title of the page
      document.getElementsByTagName("title")[0].innerHTML = settings.title;
      let header = document.getElementById("header");
      if(header !== null) header.innerHTML = settings.title;
  
      //Set configured prompt
      let prompt = document.getElementById("prompt");
      if(prompt !== null) prompt.innerHTML = settings.prompt;
  
      let stylingData = document.querySelector(':root').style;
  
      //Configure styling settings
      Object.keys(settings.styling).forEach((key, i) => {
        stylingData.setProperty("--" + key, settings.styling[key]);
      });
    } else console.warn("Config did not include styling data. This may be fine, but it may mean you are using an outdated configuration file. Recommend ensuring you have the latest version of the code!")
  }
  
  configureStylesheet();
  
  //A helper function to make generating random values easier
  let rand = (min, max) => { //Inclusive, exclusive
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function shuffleArray(parent) {
  
      var string = JSON.stringify(parent);
      var copy = JSON.parse(string);
      var result = [];
  
      while (copy.length) {
          let c = copy.splice(rand(0, copy.length), 1)
          result.push(c[0]);
      }
  
      return result;
  }