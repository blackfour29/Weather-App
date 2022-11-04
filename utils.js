const Utils = (() => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getTimeFromDate(time) {
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return pad(hours) + ':' + pad(minutes);
  }

  function pad(num) {
    return ('0' + num).slice(-2);
  }

  return { capitalizeFirstLetter, getTimeFromDate };
})();

export default Utils;
