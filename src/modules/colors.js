class Color {
  constructor(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  getColor() {
    var r, g, b, a;
    r = this.r;
    g = this.g;
    b = this.b;
    a = this.a;
    return {r, g, b, a}
  }

  setColor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  static setGmColor(red, green, blue, alpha) {
    return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')'
  }
}

module.exports = Color
