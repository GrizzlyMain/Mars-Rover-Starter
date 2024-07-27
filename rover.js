const Message = require("./message");

class Rover {
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(inputMessage){
      let message = inputMessage.name;
      let results = [];
      for(let i = 0; i < inputMessage.commands.length; i++) {
         if(inputMessage.commands[i].commandType === "MOVE") {
           if(this.mode === "LOW_POWER") {
             results.push({completed: false});
           }else{
             results.push({completed: true});
             this.position = inputMessage.commands[i].value;
           }
         }else if(inputMessage.commands[i].commandType === "STATUS_CHECK") {
           results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
         }else if(inputMessage.commands[i].commandType === "MODE_CHANGE") {
           results.push({completed: true});
           this.mode = inputMessage.commands[i].value;
         }else{
           throw Error("Command Type undefinded.");
         }
       }
       let response = {message, results}
       return response;
   }
   
}


module.exports = Rover;