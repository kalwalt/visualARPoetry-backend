class Color {
  constructor(r, g, b, a){
    if (r >= 0 && r <= 255) {
      this.r = r;
    } else {
      console.error('red value is not in range, should between 0-255')
    }
    if (g >= 0 && g <= 255) {
      this.g = g;
    } else {
      console.error('green value is not in range, should between 0-255')
    }
    if (b >= 0 && b <= 255) {
      this.b = b;
    } else {
      console.error('blue value is not in range, should between 0-255')
    }
    if (a >= 0 && a <= 255) {
      this.a = a;
    } else {
      console.error('alpha value is not in range, should between 0-255')
    }
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
    if (r >= 0 && r <= 255) {
      this.r = r;
    } else {
      console.error('red value is not in range, should between 0-255')
    }
    if (g >= 0 && g <= 255) {
      this.g = g;
    } else {
      console.error('green value is not in range, should between 0-255')
    }
    if (b >= 0 && b <= 255) {
      this.b = b;
    } else {
      console.error('blue value is not in range, should between 0-255')
    }
    if (a >= 0 && a <= 255) {
      this.a = a;
    } else {
      console.error('alpha value is not in range, should between 0-255')
    }
  }

  getGmColor() {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')'
  }

  static setGmColor(red, green, blue, alpha) {
    return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')'
  }
}

module.exports = Color
