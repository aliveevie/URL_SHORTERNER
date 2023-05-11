function isUrlValid(urlString) {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  }


  const dns = require('dns');

  function isHostnameValid(hostname) {
    // Regular expression to match a valid hostname
    const hostnameRegex = /^[a-zA-Z0-9.-]+$/;
  
    if (!hostnameRegex.test(hostname)) {
      return false;
    }
  
    // Check if the hostname resolves to an IP address
    return new Promise((resolve, reject) => {
      dns.lookup(hostname, (err) => {
        if (err && err.code === 'ENOTFOUND') {
          resolve(false);
        } else if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
  
  // Example usage
  
  

module.exports = {
    isUrlValid,
    isHostnameValid
}
  