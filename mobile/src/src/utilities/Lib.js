export default Lib = {
  showError(error) {
    console.error(error);
    setTimeout(() => {
      alert(error);
    }, 500);
  },
  delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  },
  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
},
  shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  },
  sortContactList(contactList) {
    return contactList.sort((a, b) =>
      a.name > b.name
        ? 1
        : a.name === b.name
        ? a.email > b.email
          ? 1
          : -1
        : -1
    );
  },
};
