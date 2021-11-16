const functionMap = {
  // import and add your functions here
};

const callFunction = (msg, callback) => {
  const fn = functionMap[msg.functionName];
  fn(msg, callback);
};

module.exports = { callFunction };
