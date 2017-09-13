export const mainHeightMixin = {
  mounted() {
    let h = 0;
    if (this.$refs.footer) {
      h += 60;
    }
    if (this.$refs.header) {
      h += 45;
    }
    if (this.$refs.main) {
      this.$refs.main.style.height = `${window.innerHeight - h}px`;
    }
  }
}

