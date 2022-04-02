const colorValidator = (v) => { 
  if(v == null) return true;
  return (/^#([0-9a-f]{8})$/i).test(v);
}

module.exports = {colorValidator}