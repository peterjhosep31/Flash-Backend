let useful = {};

useful.availability = (data) => {
  if (data == 1) {
    return 'available';
  } else if (data == 0) {
    return 'exhausted';
  }
}

useful.isEmpty = (data) => {
  if (data == null || data == undefined) {
    return true;
  } else {
    return false;
  }
}


export default useful;