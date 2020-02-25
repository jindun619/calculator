const calculate = {
  plus: function(a, b) {
    return a + b;
  },
  minus: function(a, b) {
    return a - b;
  },
  multiply: function(a, b) {
    return a * b;
  },
  divide: function(a, b) {
    return a / b;
  }
};

//gets button element, returns "num", "dot", "exp", "equal", "oper"
function typeOfBtn(param) {
  //if a "num"ber
  if (!isNaN(parseInt(param))) {
    return "num";
  }
  //if a "dot"
  else if (param == ".") {
    return "dot";
  }
  //if a mathematic "exp"ression
  else if (param == "/" || param == "*" || param == "-" || param == "+") {
    return "exp";
  }
  //if an equal sign
  else if (param == "=") {
    return "equal";
  }
  //if a calculator "oper"ation
  else if (param == "C") {
    return "oper";
  }
}

function numBtnClicked(event) {
  if (status == "resulted") {
    equation.innerHTML = ``;
    result.innerHTML = ``;
  }

  const name = event.target.getAttribute("name");
  equation.innerHTML = `${equation.innerHTML}${name}`;
  status = "writing_num";
}

function dotBtnClicked(event) {
  if (status == "resulted" || status == "clean") {
    equation.innerHTML = `0.`;
    result.innerHTML = "";
  } else if (status == "writing_exp") {
    equation.innerHTML = `${equation.innerHTML}0.`;
  } else if (status == "writing_num") {
    equation.innerHTML = `${equation.innerHTML}.`;
  }
  status = "writing_num";
}

function expBtnClicked(event) {
  if (status == "clean" || status == "writing_exp") {
    return;
  }
  if (status == "resulted") {
    equation.innerHTML = `${result.innerHTML}`;
    result.innerHTML = ``;
  }

  const name = event.target.getAttribute("name");
  equation.innerHTML = `${equation.innerHTML}${name}`;
  status = "writing_exp";
}

function equalBtnClicked(event) {
  if (status == "clean") {
    return;
  } else if (status == "writing_exp") {
    const equationLength = equation.innerHTML.length;
    equation.innerHTML = `${equation.innerHTML.substr(0, equationLength - 1)}`;
  }
  result.innerHTML = `${eval(equation.innerHTML)}`;
  equation.innerHTML = ``;
  status = "resulted";
}

function operBtnClicked(event) {
  const name = event.target.getAttribute("name");
  if (name == "C") {
    equation.innerHTML = "";
    result.innerHTML = "";
    status = "clean";
  }
}

function btnsEventHandler(param) {
  const name = param.getAttribute("name");
  if (typeOfBtn(name) == "num") {
    param.addEventListener("click", numBtnClicked);
  } else if (typeOfBtn(name) == "dot") {
    param.addEventListener("click", dotBtnClicked);
  } else if (typeOfBtn(name) == "exp") {
    param.addEventListener("click", expBtnClicked);
  } else if (typeOfBtn(name) == "equal") {
    param.addEventListener("click", equalBtnClicked);
  } else if (typeOfBtn(name) == "oper") {
    param.addEventListener("click", operBtnClicked);
  }
}

function showResult() {
  if (typeof eval(equation.innerHTML) == "number") {
    result.innerHTML = `${eval(equation.innerHTML)}`;
  }
}
