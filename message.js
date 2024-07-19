class Message {
   // Write code here!
   constructor(name){
   this.name = name;
   if (!name) {
      throw Error('name required.');
    }
   }
};

module.exports = Message;