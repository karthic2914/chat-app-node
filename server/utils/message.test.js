var expect = require('expect');

var {generateMessage} = require('./message');

//test case for message
describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Maha';
    var text = 'Some message';
    var message = generateMessage(from, text);

    //expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
//test case for map
describe('generateLocationMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Deva';
    const latitude = 15;
    const longitude = 19;
    const url = `https://www.google.com/maps?=15,19`;
    const message = generateLocationMessage(from, latitude, longitude);

    //expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
