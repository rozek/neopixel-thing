import Thing from "../../../src/lib/thing"

export default class neopixel extends Thing {
  async setRGB (R:number, G:number, B:number):Promise<void> {
    const LED_R = Math.floor(65535 * Math.max(0,Math.min(R,1)))
    const LED_G = Math.floor(65535 * Math.max(0,Math.min(G,1)))
    const LED_B = Math.floor(65535 * Math.max(0,Math.min(B,1)))

    const Datagram = new Uint8Array([
      LED_R & 0xFF, (LED_R >> 8) & 0xFF,
      LED_G & 0xFF, (LED_G >> 8) & 0xFF,
      LED_B & 0xFF, (LED_B >> 8) & 0xFF,
    ])
    await this.send('setRGB',Datagram)
  }

/**** WS2812 Control ****/

  async setLength (Length:number):Promise<void> {
    Length = Math.floor(Math.max(0,Math.min(Length,1024)))
    await this.send('setLength',new Uint8Array([
      Length & 0xFF, Length >> 8 & 0xFF
    ]))
  }

  async clear ():Promise<void> {
    await this.send('clear',new Uint8Array([]))
  }

  async setPixel (Pixel:number, R:number,G:number,B:number):Promise<void> {
    Pixel = Math.floor(Pixel)
    if ((Pixel < 0) || (Pixel >= 1024)) { return }
      R = Math.floor(Math.max(0,Math.min(R*255,255)))
      G = Math.floor(Math.max(0,Math.min(G*255,255)))
      B = Math.floor(Math.max(0,Math.min(B*255,255)))
    await this.send('setPixel',new Uint8Array([Pixel,R,G,B]))
  }

  async loadPixels (RGBList:number[]):Promise<void> {
    RGBList = RGBList.map(
      (Value:number) => Math.floor(Math.max(0,Math.min(Value*255,255)))
    )
    await this.send('loadPixels',new Uint8Array(RGBList))
  }

/**** API Specification ****/

  public api = [{
    name: 'setRGB',
    args: [
      'R: 0 to 1',
      'G: 0 to 1',
      'B: 0 to 1'
    ]
  },{
    name:  'getDigital',
    args:  [ 'port: 0 to 3' ],
    return:'true or false'
  },{
    name:  'setDigital',
    args:  [ 'port: 0 to 2', 'value: true or false' ]
  },{
    name:  'getAnalog',
    args:  [ 'port: 0 to 1' ],
    return:'0 to 1'
  },{
    name:  'setAnalog',
    args:  [ 'port: 0 to 1', 'value: 0 to 1' ]
  },{
    name: 'setLength',
    args: [ 'length: 0 to 1024' ]
  },{
    name: 'clear',
    args: []
  },{
    name: 'setPixel',
    args: [ 'pixel: 0 to 1023', 'r: 0 to 1', 'g: 0 to 1', 'b: 0 to 1' ]
  },{
    name: 'loadPixels',
    args: [ 'rgb-list: list of 0 to 1, three values per pixel' ]
  }]
}
