class IDGenerator {
  id = 0;

  get next() {
    return this.id++;
  }

  reset() {
    this.id = 0;
  }
}

export default IDGenerator;
