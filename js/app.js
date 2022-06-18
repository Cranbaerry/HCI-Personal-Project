function toggleNavigation() {
  const x = document.getElementById("navigation");
  if (x.className === "navbar-right") {
    x.className += " responsive";
  } else {
    x.className = "navbar-right";
  }
}

function validateEmail(str) {
  let atSymbol = str.indexOf("@");
  if (atSymbol < 1) return false;

  let dot = str.indexOf(".");
  if (dot <= atSymbol + 2) return false;

  if (dot === str.length - 1) return false;
  return true;
}

function containsNumber(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) >= '0' && str.charAt(i) <= '9') {
      return true;
    }
  }

  return false;
}

function validateOrigin(str) {
  const validOrigins = ["indonesia", "japan"];
  return validOrigins.includes(str);
}

function validateDestination(str) {
  const validDestinations = ["mars", "jupiter", "iss", "sun"];
  return validDestinations.includes(str);
}

function validateDepartDate(str) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(str) >= today;
}

function validateReturnDate(str, departDate) {
  let today = new Date(departDate);
  today.setHours(0, 0, 0, 0);

  return new Date(str) >= today;
}

function onSubmit(form) {
  let formData = new FormData(form);
  let departDate = null;
  for (let [key, val] of formData.entries()) {
    if (val.trim().length === 0) {
      alert("Field " + key + " cannot be empty! Please fill in all the fields!");
      return false;
    }

    switch (key) {
      case "name":
        if (containsNumber(val)) {
          alert("Name cannot contain numbers!");
          return false;
        }
        break;
      case "email":
        if (validateEmail(val) === false) {
          alert("Please enter a valid email address!");
          return false;
        }
        break;
      case "origin":
        if (validateOrigin(val) === false) {
          alert("Please enter a valid origin!");
          return false;
        }
        break;
      case "destination":
        if (validateDestination(val) === false) {
          alert("Please enter a valid destination!");
          return false;
        }
        break;
      case "country":
        if (containsNumber(val)) {
          alert("Country cannot contain numbers!");
          return false;
        }
        break;
      case "depart":
        if (validateDepartDate(val) === false) {
          alert("The depart date must be bigger or equal to today date.. unless you can travel back to the past!");
          return false;
        }

        departDate = val;
        break;
      case "return":
        if (validateReturnDate(val, departDate) === false) {
          alert("The return date must be bigger or equal to departure date.. unless you can travel back to the past!");
          return false;
        }
        break;
      default:
        break;
    }
  }

  if (!document.getElementById("terms").checked) {
    alert("Please agree to the terms and conditions!");
    return false;
  }

  alert("Congratulations! You have successfully booked a flight!");
  return true;
}